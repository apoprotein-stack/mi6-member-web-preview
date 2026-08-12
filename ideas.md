# MI6 Member Experience — Web Preview Design

## 三個視覺方向

**A. Obsidian Codex（概率 0.07）**
深黑背景、金色細線框架、Serif 顯示標題，強調秩序感與精密感。Art Deco 的幾何語言加上現代極簡的留白節奏。

**B. Ivory Signal（概率 0.04）**
暖象牙白底色、深棕文字、金色強調，呈現高端健康品牌的溫潤質感。類似高端診所或精品保健品牌的視覺語言。

**C. Dual Chamber（概率 0.08）**
左側深黑 App 控制室、右側暖白 LIFF 入口，在同一個畫面中對比呈現兩種使用情境。

---

## 選定方向：**Dual Chamber**

這個展示版的核心目的是讓人同時看到 App 與 LIFF 的差異與互補關係，因此採用「雙腔室」佈局最能傳達產品定位。

### Design Movement
Art Deco Functional Dualism — 精密儀器面板的秩序感，結合行動裝置的觸控溫度。

### Core Principles
1. 左深右淺：App 端用深黑面板，LIFF 端用暖象牙白，視覺上清楚區隔兩種入口
2. 金色作為共同語言：兩側都使用同一套金色系，強調品牌一致性
3. 行動裝置框架：兩側都以手機外框包覆，讓使用者理解這是行動體驗
4. 互動即時回饋：分數調整、狀態切換都有即時視覺反應

### Color Philosophy
- App 端：`#0E0C0A`（深黑）、`#F3EBDE`（象牙白）、`#A87535`（金）、`#6B5A3E`（深金）
- LIFF 端：`#F0E8D9`（暖米白）、`#171411`（深棕）、`#A87535`（金）
- 共用強調：金色 `#A87535` 作為唯一跨越兩側的視覺錨點

### Layout Paradigm
桌面版：左右分欄，各自包含一個手機外框模擬器。行動版：上下堆疊，各自全寬顯示。頂部有品牌標頭與切換說明。

### Signature Elements
1. 手機外框模擬器（rounded-[2.5rem] 外框，含頂部瀏海與底部 Home Bar）
2. 金色細線分隔與 Section Label（全大寫、寬字距）
3. 右上角 MEMBER SESSION 狀態指示燈（金色脈衝動畫）

### Interaction Philosophy
所有分數調整、狀態切換與頁面導覽都在手機模擬器內完成，不跳出外框。兩側模擬器獨立運作，互不干擾。

### Animation
- 手機外框進場：`translateY(20px) opacity(0)` → 正常，180ms ease-out，左右各錯開 80ms
- 分數變化：數字以 `scale(1.08)` 彈出後回正，120ms
- 狀態切換：`opacity` 淡入淡出，150ms
- 狀態指示燈：`pulse` 動畫，2s 循環

### Typography System
- 顯示標題：`Playfair Display`（Serif，品牌感）
- 介面文字：`DM Sans`（Sans Serif，清晰可讀）
- 數字與代碼：`DM Mono`（等寬，精密感）

### Brand Essence
MI6 — 為認真對待自身健康的人設計的長期觀察工具。**精準、克制、可持續。**

### Brand Voice
標題：「今天，先聽見自己的狀態。」、「把感受，留給未來的自己。」
禁止：「歡迎使用」、「立即開始」、任何誇大健康效果的措辭。

### Wordmark & Logo
「MI 6」— Serif 字體，字母間距 4px，「6」以金色強調。

### Signature Brand Color
`#A87535` — 深沉的暖金，不是亮黃金，是歲月沉澱的金。

## Style Decisions
- 手機模擬器外框使用 `border-[#2A2420]`（深黑）與 `shadow-2xl`，增加立體感
- Section Label 統一使用 `text-[9px] tracking-[1.8px] uppercase`
- 所有 CTA 按鈕不使用圓角，保持 Art Deco 的直角幾何感
