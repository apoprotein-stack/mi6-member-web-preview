# MI6 Member Experience｜App × LINE LIFF Web Preview

`mi6-member-web-preview` 是 MI6 會員入口的互動式 Web 展示版本，用單一頁面並列呈現兩種入口：左側為長期追蹤導向的會員 App 控制室，右側為從 LINE 進入的一分鐘快速觀察流程。專案主要用於產品概念、資訊架構、視覺語言與互動流程驗證。

> 本 repository 是展示／原型專案，不是正式會員 App，也沒有在目前程式中完成 LINE LIFF 登入、會員 API、資料庫或長期資料同步。所有自評互動應視為當次瀏覽工作階段的展示資料。

## 展示內容

| 入口 | 目前可展示的流程 |
| --- | --- |
| App／Control Room | 儀表板、四項主觀自評、分數儲存、近期趨勢與一般健康資訊助理介面。 |
| LINE LIFF Entry | 快速自評、完成結果、近期狀態與回到入口的互動流程。 |
| Preview mode | `BOTH`、`APP`、`LIFF` 三種檢視模式，可在桌面版切換展示範圍。 |
| Responsive layout | 桌面左右雙欄、行動裝置上下堆疊，搭配兩種手機模擬器外框。 |

四項自評訊號目前為睡眠、體力、發炎體感與皮膚，數值屬於使用者主觀觀察，不代表醫療檢驗、診斷或治療結果。

## 技術棧

- React 19
- TypeScript
- Vite 7
- Express 靜態伺服器
- Tailwind CSS 4 與自訂 CSS
- Wouter
- Vitest
- pnpm lockfile（`pnpm-lock.yaml`）

## 本機開發

需要 Node.js 與 pnpm：

```bash
pnpm install
pnpm dev
```

常用指令如下：

```bash
pnpm check       # TypeScript 型別檢查
pnpm build       # 建立前端與 server bundle
pnpm preview     # 預覽 Vite 建置結果
pnpm start       # 啟動 production bundle
pnpm format      # 以 Prettier 格式化檔案
```

`pnpm dev` 會以可供區網預覽的方式啟動 Vite。若只需要檢查靜態互動，優先使用 `pnpm dev`；若要驗證 production 輸出，請依序執行 `pnpm build` 與 `pnpm start`。

## 專案結構

```text
mi6-member-web-preview/
├── client/
│   ├── index.html
│   └── src/
│       ├── pages/Home.tsx       # Dual Chamber 主要展示頁
│       ├── App.tsx              # React 路由與錯誤邊界
│       └── index.css             # 版面、色彩與響應式樣式
├── server/index.ts               # production 靜態伺服器與 SPA fallback
├── shared/                       # 共用常數與型別
├── ideas.md                      # 視覺與互動設計決策
├── verification.md               # 已完成的展示驗證紀錄
└── package.json
```

## 驗證重點

目前驗證紀錄涵蓋首頁雙欄展示、`BOTH／APP／LIFF` 模式切換、App 端四項分數更新與儲存狀態、LIFF 快速自評完成畫面，以及桌面／行動版版面。修改互動或樣式後，請重新檢查手機模擬器內的底部分頁、分數平均值、空狀態、鍵盤焦點與狹窄螢幕的溢位情況。

## 正式整合前的工作

若要把展示版演進為正式產品，仍需另行完成 LINE LIFF SDK 與登入流程、會員身分與受保護 API、長期資料儲存、隱私告知與同意流程、錯誤追蹤，以及 App／LINE 入口之間的資料同步。健康資訊助理也必須維持一般健康教育的安全邊界，不提供診斷、治療、檢驗判讀或個人醫囑。

## 內容與授權提醒

MI6 品牌、視覺資產、產品名稱與健康相關文案應依權利人授權及產品法規使用。repository 目前未附獨立 LICENSE；若要重用程式碼或素材，請先確認授權範圍。正式發布前請再審核所有產品與健康聲稱，並以實際核准資料為準。
