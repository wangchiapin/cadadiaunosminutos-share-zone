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
   - 每個遊戲還要加 `cat`（分類）：`vocab` 單字與漢字、`listen` 聽力、`grammar` 文法與句子、`life` 生活情境。要新增分類就改 `CONFIG.gameCats`。沒填 `cat` 的遊戲會被放進最後面的「其他」，主控台也會提醒。
4. 到 `stats.html` 的卡片開關清單加上 `game-<id>`。
5. **如果這個遊戲也加進老師管理中心**：到 `stats.html#sub`「老師管理中心遊戲開關」的清單（`CS`）加一列，id 要跟 profesor 的 `GAME_IDS` 一致（寫入 `portalStatus/center-<id>`）。新遊戲還沒做好時，先勾維修中。

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
| ba | 把 | practica-de-ba-oracion |
| bei | 被 | practica-de-bei-oracion |
| agarrar | 我要放哪裡？ | que-voy-a-agarrar |
| perdido | 問路小達人 | Me-he-perdido |
| hora | 練習時間 | timegame |
| rayo | 天打雷劈 | Cuidado-con-el-rayo |
| come | 吃字小籠包 | -come-caracteres |
| dron | 量詞空戰 | dron-clasificadores |
| tonos | 聲調偵探 | detective-de-tonos |

## Instagram Reel 腳本

`reels/` 資料夾放每款遊戲的 Instagram Reel 腳本與貼文（見 `reels/README.md`）。遊戲改版後，對應的腳本也要重新核對。

## 問題回報（stats.html#reports）

學生在遊戲每題答完後按「🚩 這題怪怪的」，回報會集中在後台「🚩 問題回報」分頁（在「遊玩紀錄」右邊）。

- **比比看**：存在中央專案（subscription-48d3c）的 `bbk_reports`。
- **把、被**：存在同一個中央專案的 `game_reports`，用 `game` 欄位分遊戲（`ba`＝把、`bei`＝被）。回報裡會帶題目句、正確答案、學生選的答案，以及當題的圖（SVG 字串，後台只用 `<img>` 顯示，不會執行）。
- **聲調偵探**：也存在 `game_reports`（`game:'tonos'`），欄位和把、被不同：`id`（句子編號，例 A1-001）、`lv`（A1／A2／B1）、`mode`（read＝看句子、listen＝聽句子）、`han`（漢字）、`py`（無聲調拼音）、`ans`（標準答案）、`pick`（玩家答案）。原因：`wrong`＝標準答案好像不對、`voice`＝機器唸的聲音怪怪的（只有聽力模式）、`text`＝拼音或句子有錯、`other`＝其他。沒有圖。
- 分頁上方有各遊戲的總覽和下拉選單可篩選；可標記已處理、刪除、匯出 CSV。
- **新遊戲要加進問題回報**：遊戲端把回報寫進 `game_reports`（`game` 用新的代號），再到 `stats.html` 的 `REP_GAMES` 加一行；Firestore 規則的 `game` 清單也要加上新代號。
- 回報只有管理員（a2224907@gmail.com）讀得到、能改、能刪；任何登入（含匿名）的人可以送出，欄位長度有限制。

## 老師管理中心遊戲開關（stats.html#sub）
- 「🔧 老師管理中心遊戲開關」分頁：勾選＝該遊戲在老師管理中心維修中，一般老師看不到卡片。
- 寫入 Firestore `portalStatus/center-<corre|colores|bbk|dragon>`，`{off:true}`；沒有文件＝開放。只有 a2224907@gmail.com 能寫（沿用現有規則）。
- 管理者自己的管理中心不受影響，照常使用。
