/**
 * 訂閱中心：收到「已付款」申請時，寄一封信給你（含付款截圖），並把截圖存進 Google 雲端硬碟。
 *
 * 部署步驟（只做一次）：
 *  1. 開 https://script.google.com ，用 a2224907@gmail.com 登入 → 「新專案」
 *  2. 刪掉原本內容，把這整個檔案貼上，按 💾 存檔（專案名稱可取「訂閱中心通知」）
 *  3. 右上「部署」→「新增部署作業」→ 齒輪選「網頁應用程式」
 *       執行身分：我（你的帳號）
 *       誰可以存取：所有人
 *     按「部署」→ 「授權存取」→ 選你的帳號 →（出現「Google 尚未驗證」就按「進階」→「前往…(不安全)」）→ 允許
 *  4. 複製「網頁應用程式網址」（https://script.google.com/macros/s/…/exec）
 *  5. 把網址貼到 index.html 裡的  const SITE_NOTIFY_URL = "";  兩個引號中間
 *  之後若改了這份程式，要「部署 → 管理部署作業 → 編輯 → 版本：新版本」才會生效，網址不變。
 */

const MAX_IMG_BYTES = 6 * 1024 * 1024;   // 截圖上限（網頁端已先縮圖，通常 < 500KB）
const FOLDER_NAME = "訂閱中心付款截圖";
const RATE_LIMIT_PER_10MIN = 20;          // 全站 10 分鐘最多收幾封，防洗版

function doGet() {
  return ContentService.createTextOutput("site-notify ok");
}

function doPost(e) {
  const out = o => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.hp) return out({ ok: true });                       // 蜜罐：機器人才會填，假裝成功
    const s = (v, n) => String(v == null ? "" : v).slice(0, n);

    const cache = CacheService.getScriptCache();
    const n = Number(cache.get("rate") || 0);
    if (n >= RATE_LIMIT_PER_10MIN) return out({ ok: false, error: "rate" });
    cache.put("rate", String(n + 1), 600);

    const plan = s(d.plan, 10), method = s(d.method, 10), currency = s(d.currency, 5);
    if (["month", "year"].indexOf(plan) < 0 || ["paypal", "twd", "linepay", "mxn"].indexOf(method) < 0) return out({ ok: false, error: "bad" });

    const info = {
      id: s(d.id, 40).slice(0, 8).toUpperCase(), email: s(d.email, 120), plan: plan, method: method,
      currency: currency, amount: s(d.amount, 20), ref: s(d.ref, 80), paidAt: s(d.paidAt, 32), note: s(d.note, 300)
    };

    const attachments = [];
    let driveLink = "";
    const sh = d.screenshot;
    if (sh && sh.data && /^image\/(jpeg|png|webp)$/.test(sh.mime)) {
      const bytes = Utilities.base64Decode(sh.data);
      if (bytes.length <= MAX_IMG_BYTES) {
        const ext = sh.mime === "image/png" ? "png" : sh.mime === "image/webp" ? "webp" : "jpg";
        const blob = Utilities.newBlob(bytes, sh.mime, "付款截圖_" + info.id + "." + ext);
        attachments.push(blob);
        try {
          const it = DriveApp.getFoldersByName(FOLDER_NAME);
          const folder = it.hasNext() ? it.next() : DriveApp.createFolder(FOLDER_NAME);
          driveLink = folder.createFile(blob).getUrl();
        } catch (err) { /* 存雲端失敗不影響寄信 */ }
      }
    }

    const planZh = plan === "month" ? "月訂" : "年訂";
    const body = [
      "有人送出了訂閱付款申請（申請編號 " + info.id + "）",
      "",
      "會員：" + info.email,
      "方案：" + planZh + "　幣別：" + currency + (info.amount ? "　金額：" + info.amount : ""),
      "付款方式：" + method,
      "付款編號／帳號後5碼：" + info.ref,
      "付款時間：" + (info.paidAt || "（未填）"),
      "備註：" + (info.note || "（無）"),
      "截圖：" + (attachments.length ? "已附在這封信" + (driveLink ? "，也存到雲端：" + driveLink : "") : "（沒有附）"),
      "",
      "→ 核對收款後，到統計頁 → 訂閱管理 → 「確認收款並開通」。"
    ].join("\n");

    MailApp.sendEmail({
      to: Session.getEffectiveUser().getEmail(),
      subject: "【訂閱申請】" + info.email + "・" + planZh + "・" + info.id,
      body: body,
      attachments: attachments
    });
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: "server" });
  }
}
