# 華語老師分享區（個人入口網站）

> 遊戲入口、GoodTeacher 字體下載、PayPal／轉帳支持、瀏覽與下載統計、回饋專區

- **網址：** https://wangchiapin.github.io/cadadiaunosminutos-share-zone/（統計頁：stats.html）
- **Firebase 專案：** subscription-48d3c
- **登入方式：** Google 登入（管理員統計頁）
- **狀態：** 使用中
- **備註：** 原 repo 名稱為 `wangchiapin.github.io`，改名後網址已變更。字體與 PDF 的下載來源是 `GoodTeacher` repo 的 Releases。

## 新增遊戲卡片的規則（必做）

每新增一張遊戲卡片（`index.html` 裡 `CONFIG.games`），都必須一起做好「詳細說明」：

1. 找到這個遊戲的 repo，**讀程式和 README**，照實際玩法寫，不要用猜的。
2. 在那個遊戲的設定裡加上 `guide`，中文、西文都要寫：
   - `learn` 練什麼
   - `level` 適合程度
   - `steps` 怎麼玩（一步一步；每一步可以加 `img: "img/xxx.jpg"` 截圖）
   - `features` 設定與功能（拼音、語言、難度、排行榜等）
   - `teacher` 給老師（老師管理中心、上課用法）
   - `tip` 小提醒（可省略）
   - 還沒上線的遊戲加 `soon: true`
3. 卡片上的簡短說明（`desc`）也要跟遊戲實際內容一致。
4. 到 `stats.html` 的卡片開關清單加上 `game-<id>`。

沒有 `guide` 的遊戲不會出現「詳細說明」按鈕，瀏覽器主控台會出現提醒。

### 遊戲與 repo 對照

| 卡片 id | 遊戲 | repo |
|---|---|---|
| memorama | 翻牌記憶 | Memorama |
| numeros | 數字聽力練習 | numeros |
| colores | 色數消消樂 | pop-colores-numeros |
| compara | 比比看 | compara-y-adivina |
| taiwan-life | 台灣生存日記 | taiwan-life |
| corre-hanzi | 跑吧！漢字 | corre |
| armario | 收納小達人 | Ordena-el-Armario |
| compras | 幫媽媽買東西 | irdecompras |
| perrito | 小狗找寶藏 | El-Perrito-Busca-el-Tesoro |
| jigsaw | 文字拼圖 | chinesejigsaw |
| dragon | 墨龍飛天 | el-dragon-de-tinta |
| topo | 打地鼠學中文 | atrapa-al-topo |
| ba | 把它放好 | practica-de-ba-oracion |
| agarrar | 我要拿什麼？ | que-voy-a-agarrar |
| perdido | 問路小達人 | Me-he-perdido |

## Instagram Reel 腳本

`reels/` 資料夾放每款遊戲的 Instagram Reel 腳本與貼文（見 `reels/README.md`）。遊戲改版後，對應的腳本也要重新核對。
