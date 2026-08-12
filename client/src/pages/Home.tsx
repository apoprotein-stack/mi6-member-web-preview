// Style direction: Dual Chamber — keep the dark App chamber and warm LIFF chamber visually distinct while sharing antique-gold interaction language.
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  Check,
  CircleHelp,
  Home as HomeIcon,
  LayoutGrid,
  MessageCircle,
  Plus,
} from "lucide-react";

const OBSIDIAN_TEXTURE = "/manus-storage/mi6-obsidian-texture_159d1537.png";
const IVORY_TEXTURE = "/manus-storage/mi6-ivory-paper_aa291aed.png";
const GOLD_ORBIT = "/manus-storage/mi6-gold-orbit_01dfd101.png";
const MI6_SYMBOL = "/manus-storage/mi6-symbol_6cfb54df.png";

type MetricKey = "sleep" | "energy" | "inflammation" | "skin";
type Scores = Record<MetricKey, number>;
type PreviewMode = "both" | "app" | "liff";
type AppTab = "dashboard" | "checkin" | "progress" | "advisor";
type LiffView = "home" | "checkin" | "success" | "status";

const metrics: Array<{ key: MetricKey; label: string; code: string; copy: string }> = [
  { key: "sleep", label: "睡眠", code: "SLEEP", copy: "起床時的恢復感" },
  { key: "energy", label: "體力", code: "ENERGY", copy: "精神與持續專注" },
  { key: "inflammation", label: "發炎體感", code: "INFLAMMATION", copy: "僵硬、疲憊或不適" },
  { key: "skin", label: "皮膚", code: "SKIN", copy: "乾燥與整體穩定度" },
];

const defaultScores: Scores = { sleep: 7, energy: 7, inflammation: 7, skin: 7 };

const appNav: Array<{ id: AppTab; label: string; icon: LucideIcon }> = [
  { id: "dashboard", label: "控制室", icon: LayoutGrid },
  { id: "checkin", label: "今日自評", icon: Plus },
  { id: "progress", label: "趨勢", icon: Activity },
  { id: "advisor", label: "助理", icon: MessageCircle },
];

function average(scores: Scores) {
  return ((scores.sleep + scores.energy + scores.inflammation + scores.skin) / 4).toFixed(1);
}

function adjustScore(scores: Scores, key: MetricKey, delta: number): Scores {
  return { ...scores, [key]: Math.max(1, Math.min(10, scores[key] + delta)) };
}

function SectionLabel({ children, tone = "gold" }: { children: React.ReactNode; tone?: "gold" | "muted" }) {
  return <span className={`section-label section-label-${tone}`}>{children}</span>;
}

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <div className={`brand-mark ${light ? "brand-mark-light" : ""}`}>
      <img src={MI6_SYMBOL} alt="MI6" />
      <div>
        <div className="wordmark">MI <strong>6</strong></div>
        <div className="wordmark-sub">GENOMIC MAINTENANCE</div>
      </div>
    </div>
  );
}

function PhoneFrame({ children, tone, label }: { children: React.ReactNode; tone: "dark" | "light"; label: string }) {
  return (
    <article className={`phone-frame phone-frame-${tone}`}>
      <div className="phone-chrome">
        <span className="phone-time">9:41</span>
        <span className="phone-notch" />
        <span className="phone-signal">● ● ▪</span>
      </div>
      <div className="phone-caption"><span>{label}</span><span>PREVIEW</span></div>
      <div className="phone-screen">{children}</div>
      <div className="phone-home-indicator" />
    </article>
  );
}

function AppShell({ activeTab, onChange, children }: { activeTab: AppTab; onChange: (tab: AppTab) => void; children: React.ReactNode }) {
  return (
    <div className="app-phone-content">
      <div className="mini-brand-row">
        <BrandMark />
        <span className="session-status"><i /> MEMBER SESSION</span>
      </div>
      <div className="app-phone-body">{children}</div>
      <nav className="phone-tabbar" aria-label="App navigation">
        {appNav.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.id} className={`phone-tab ${activeTab === item.id ? "is-active" : ""}`} onClick={() => onChange(item.id)}>
              <Icon size={14} strokeWidth={1.5} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function AppDashboard({ onStart, onProgress, saved, scores }: { onStart: () => void; onProgress: () => void; saved: boolean; scores: Scores }) {
  return (
    <div className="phone-scroll app-dashboard">
      <div className="eyebrow-row"><SectionLabel>MEMBER CONTROL ROOM</SectionLabel><span className="phone-index">{saved ? "01 / UPDATED" : "00 / OPEN"}</span></div>
      <h2 className="phone-heading">今天，先聽見<br />自己的狀態。</h2>
      <div className="app-hero-card" style={{ backgroundImage: `linear-gradient(115deg, rgba(16,13,11,.96) 0%, rgba(16,13,11,.72) 62%, rgba(16,13,11,.32)), url(${OBSIDIAN_TEXTURE})` }}>
        <div className="hero-card-top"><SectionLabel>MI6 / DAILY SIGNAL</SectionLabel><span>{saved ? "UPDATED" : "OPEN"}</span></div>
        <h3>{saved ? "你的今日紀錄，已經在這裡。" : "用一分鐘，留下第一個訊號。"}</h3>
        <p>{saved ? "回到你的感受，不急著解釋。持續的觀察會讓未來更容易看見變化。" : "從睡眠、體力、發炎體感與皮膚開始，建立日常觀察。"}</p>
        <button className="gold-button" onClick={onStart}> {saved ? "更新今日自評" : "開始今日自評"} <ArrowUpRight size={14} /></button>
        <img className="orbit-art" src={GOLD_ORBIT} alt="MI6 orbital signal" />
      </div>
      <div className="phone-section-heading"><SectionLabel tone="muted">TODAY AT A GLANCE</SectionLabel><span>{saved ? "1 次紀錄" : "尚未開始"}</span></div>
      <div className="score-card">
        <div className="score-orb"><strong>{saved ? average(scores) : "—"}</strong><span>/ 10</span></div>
        <div><h4>{saved ? "最近一次平均自評" : "準備記錄第一筆自評"}</h4><p>{saved ? "這是你的主觀紀錄，不是醫療檢測結果。" : "完成今日自評後，這裡會顯示工作階段摘要。"}</p></div>
      </div>
      <div className="metric-grid">{metrics.map((metric) => <div className="mini-metric" key={metric.key}><span>{metric.code}</span><b>{metric.label}</b><strong>{saved ? scores[metric.key] : "—"}</strong></div>)}</div>
      <button className="outline-card-button" onClick={onProgress}><span><SectionLabel tone="muted">LONGITUDINAL VIEW</SectionLabel><b>查看你的趨勢</b></span><ArrowUpRight size={15} /></button>
    </div>
  );
}

function AppCheckIn({ scores, setScores, saved, onSave }: { scores: Scores; setScores: (scores: Scores) => void; saved: boolean; onSave: () => void }) {
  return (
    <div className="phone-scroll app-checkin">
      <button className="back-link" onClick={() => setScores(scores)}><ArrowLeft size={13} /> 控制室</button>
      <div className="checkin-title-row"><div><SectionLabel>DAILY CHECK-IN</SectionLabel><h2 className="phone-heading">把感受，留給<br />未來的自己。</h2></div><div className="score-orb score-orb-small"><strong>{average(scores)}</strong><span>AVG</span></div></div>
      <p className="helper-text">四個問題，一分鐘完成。沒有正確答案。</p>
      <div className="checkin-list">{metrics.map((metric, index) => <div className="checkin-row" key={metric.key}><div className="checkin-info"><span className="metric-index">0{index + 1}</span><div><span className="metric-code">{metric.code}</span><b>{metric.label}</b><small>{metric.copy}</small></div></div><div className="stepper"><button onClick={() => setScores(adjustScore(scores, metric.key, -1))}>−</button><strong>{scores[metric.key]}</strong><button onClick={() => setScores(adjustScore(scores, metric.key, 1))}>＋</button></div></div>)}</div>
      <button className="gold-button full-button" onClick={onSave}><span>{saved ? "已記錄本次自評" : "記錄本次自評"}</span>{saved ? <Check size={14} /> : <ArrowUpRight size={14} />}</button>
      {saved && <div className="success-note"><Check size={15} /><span><b>CHECK-IN RECORDED</b><small>已加入目前工作階段的趨勢檢視。</small></span></div>}
    </div>
  );
}

function AppProgress({ scores, saved }: { scores: Scores; saved: boolean }) {
  return (
    <div className="phone-scroll app-progress"><SectionLabel>LONGITUDINAL VIEW</SectionLabel><h2 className="phone-heading">把今天放進<br />時間裡。</h2><div className="membership-card"><div><SectionLabel tone="muted">MEMBERSHIP STATUS</SectionLabel><h3>尚未連結會員方案</h3></div><span>NOT LINKED</span></div><div className="trend-card"><div className="trend-heading"><div><SectionLabel>YOUR SELF-REPORTED TREND</SectionLabel><h3>{saved ? "工作階段摘要" : "等待你的第一段資料"}</h3></div><div className="trend-average">{saved ? average(scores) : "—"}<small>AVG</small></div></div>{saved ? <div className="trend-bars">{metrics.map((metric) => <div key={metric.key}><span>{metric.label}</span><div className="bar-track"><i style={{ width: `${scores[metric.key] * 10}%` }} /></div><b>{scores[metric.key]}</b></div>)}</div> : <div className="empty-chart"><span>YOUR NEXT ENTRY WILL APPEAR HERE</span></div>}</div><div className="framework-card"><SectionLabel tone="muted">PROGRAM FRAMEWORK</SectionLabel><h3>不是單一分數，<br />而是持續的觀察。</h3><p>自評資料協助整理生活感受的脈絡，但並非醫療檢測結果。</p></div></div>
  );
}

function AppAdvisor() {
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="phone-scroll app-advisor"><SectionLabel>MI6 INFORMATION ASSISTANT</SectionLabel><h2 className="phone-heading">先把問題，<br />整理得更清楚。</h2><div className="advisor-intro"><SectionLabel>EDUCATION, NOT DIAGNOSIS</SectionLabel><h3>讓健康資訊回到可理解的語言。</h3><p>正式版本會在會員安全整合後，依你的授權整理一般健康教育資訊。</p></div><div className="guardrail"><CircleHelp size={16} /><span>不診斷疾病、不判讀檢驗結果、不提供藥物或劑量建議。</span></div><div className="assistant-window"><SectionLabel tone="muted">MEMBER QUESTION</SectionLabel>{sent ? <div className="assistant-sent"><Check size={15} /><span>MESSAGE RECORDED<small>你的問題已保留於本次工作階段。</small></span></div> : <p>從一個你真的想理解的問題開始。</p>}</div><textarea value={question} onChange={(event) => { setQuestion(event.target.value); setSent(false); }} placeholder="輸入你的問題……" /><button className="gold-button full-button" disabled={!question.trim()} onClick={() => setSent(true)}>保留問題 <ArrowUpRight size={14} /></button></div>
  );
}

function LiffShell({ view, setView, scores, setScores, saved, onSave }: { view: LiffView; setView: (view: LiffView) => void; scores: Scores; setScores: (scores: Scores) => void; saved: boolean; onSave: () => void }) {
  return (
    <div className="liff-phone-content">
      <div className="liff-brand-row"><BrandMark light /><span className="line-chip">LINE</span></div>
      <div className="liff-body">
        {view === "home" && <div className="phone-scroll liff-home"><SectionLabel>TODAY / 01</SectionLabel><h2 className="liff-title">今天，花一分鐘<br />記錄自己的狀態。</h2><p className="liff-lede">不用安裝 App。從 LINE 進入，完成一次簡單的日常觀察。</p><div className="liff-signal-card"><div className="liff-card-top"><SectionLabel>DAILY SIGNAL</SectionLabel><span>{saved ? "UPDATED" : "OPEN"}</span></div><h3>{saved ? "你的今日紀錄已存在。" : "準備開始今天的觀察？"}</h3><p>四個分數，沒有正確答案，只記錄此刻的感受。</p><button className="liff-primary" onClick={() => setView("checkin")}>{saved ? "更新今日自評" : "開始今日自評"} <ArrowUpRight size={14} /></button></div><div className="liff-quick-grid"><button onClick={() => setView("status")}><SectionLabel tone="muted">RECENT</SectionLabel><b>近期狀態</b><span>{saved ? "1 筆工作階段紀錄" : "完成第一筆紀錄"}</span></button><button onClick={() => setView("status")}><SectionLabel tone="muted">FULL APP</SectionLabel><b>完整控制室</b><span>查看完整趨勢與資訊</span></button></div><div className="liff-trust"><SectionLabel>A QUIET DAILY RITUAL</SectionLabel><p>自評是主觀觀察，不是醫療檢測結果。</p></div></div>}
        {view === "checkin" && <div className="phone-scroll liff-checkin"><button className="liff-back" onClick={() => setView("home")}><ArrowLeft size={13} /> 回到今日狀態</button><div className="liff-checkin-header"><div><SectionLabel>QUICK CHECK-IN</SectionLabel><h2 className="liff-title">此刻的你，<br />感覺如何？</h2></div><div className="liff-mini-score">{average(scores)}<small>AVG</small></div></div><p className="liff-helper">以 1–10 分記錄，1 是低，10 是高。</p><div className="liff-metrics">{metrics.map((metric, index) => <div className="liff-metric" key={metric.key}><div><span>0{index + 1}</span><b>{metric.label}</b><small>{metric.copy}</small></div><div className="liff-stepper"><button onClick={() => setScores(adjustScore(scores, metric.key, -1))}>−</button><strong>{scores[metric.key]}</strong><button onClick={() => setScores(adjustScore(scores, metric.key, 1))}>＋</button></div></div>)}</div><button className="liff-primary liff-submit" onClick={onSave}>完成今日自評 <ArrowUpRight size={14} /></button></div>}
        {view === "success" && <div className="phone-scroll liff-success"><div className="success-circle"><Check size={22} /></div><SectionLabel>CHECK-IN COMPLETE</SectionLabel><h2 className="liff-title">今天的狀態，<br />已經留下了。</h2><p className="liff-lede">謝謝你替未來的自己保留這一筆觀察。</p><div className="liff-result-card"><SectionLabel tone="muted">TODAY'S AVERAGE</SectionLabel><strong>{average(scores)} <small>/ 10</small></strong><p>這是你的主觀自評摘要，不代表醫療結果或診斷。</p></div><button className="liff-primary" onClick={() => setView("status")}>查看近期狀態 <ArrowUpRight size={14} /></button><button className="liff-secondary" onClick={() => setView("home")}>回到 LIFF 首頁</button></div>}
        {view === "status" && <div className="phone-scroll liff-status"><button className="liff-back" onClick={() => setView("home")}><ArrowLeft size={13} /> 回到今日狀態</button><SectionLabel>RECENT STATUS</SectionLabel><h2 className="liff-title">你的近期觀察。</h2><div className="liff-status-summary"><div><SectionLabel tone="muted">LATEST AVERAGE</SectionLabel><strong>{saved ? average(scores) : "—"}</strong></div><div><SectionLabel tone="muted">RECORDS</SectionLabel><strong>{saved ? "1" : "0"}</strong></div></div>{saved ? <div className="liff-latest-card"><SectionLabel tone="muted">LATEST ENTRY</SectionLabel>{metrics.map((metric) => <div className="liff-latest-row" key={metric.key}><span>{metric.label}</span><div><i style={{ width: `${scores[metric.key] * 10}%` }} /></div><b>{scores[metric.key]}</b></div>)}</div> : <div className="liff-empty"><h3>還沒有紀錄。</h3><p>完成第一次自評後，這裡會顯示你的近期狀態。</p></div>}<div className="liff-trust"><SectionLabel>MEMBER DATA BOUNDARY</SectionLabel><p>LIFF 先提供快速入口；完整歷史與方案進度會在會員安全整合後逐步開放。</p></div></div>}
      </div>
      <div className="liff-footer"><span>MI6 MEMBER EXPERIENCE / LIFF</span><i /></div>
    </div>
  );
}

export default function Home() {
  const [mode, setMode] = useState<PreviewMode>("both");
  const [appTab, setAppTab] = useState<AppTab>("dashboard");
  const [appScores, setAppScores] = useState<Scores>(defaultScores);
  const [appSaved, setAppSaved] = useState(false);
  const [liffView, setLiffView] = useState<LiffView>("home");
  const [liffScores, setLiffScores] = useState<Scores>(defaultScores);
  const [liffSaved, setLiffSaved] = useState(false);

  const modeCopy = useMemo(() => mode === "both" ? "TWO ENTRY POINTS / ONE MEMBER EXPERIENCE" : mode === "app" ? "FULL MEMBER CONTROL ROOM" : "LINE QUICK ENTRY" , [mode]);

  const saveApp = () => { setAppSaved(true); setAppTab("checkin"); };
  const saveLiff = () => { setLiffSaved(true); setLiffView("success"); };

  return (
    <main className="site-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <header className="site-header">
        <BrandMark />
        <div className="header-context"><span className="live-indicator"><i /> LIVE PREVIEW</span><span>MI6 MEMBER EXPERIENCE / 2026</span></div>
        <a className="header-link" href="#architecture">VIEW ARCHITECTURE <ArrowUpRight size={14} /></a>
      </header>
      <section className="hero-copy" id="architecture">
        <div className="hero-copy-main"><SectionLabel>MI6 / MEMBER EXPERIENCE</SectionLabel><h1>Two rhythms.<br /><em>One</em> continuous record.</h1><p>完整 App 與 LINE LIFF 的互動式展示。左側是長期會員控制室，右側是從 LINE 進入的一分鐘快速入口。</p></div>
        <div className="mode-switcher" role="group" aria-label="Preview mode"><span className="switcher-label">SHOW</span>{(["both", "app", "liff"] as PreviewMode[]).map((item) => <button key={item} className={mode === item ? "is-active" : ""} onClick={() => setMode(item)}>{item === "both" ? "BOTH" : item === "app" ? "APP" : "LIFF"}</button>)}</div>
      </section>
      <div className="preview-meta"><span>{modeCopy}</span><span className="meta-rule" /><span>INTERACTIVE / NO BACKEND</span></div>
      <section className={`preview-stage preview-stage-${mode}`}>
        {mode !== "liff" && <div className="preview-column app-column"><div className="column-heading"><span className="column-number">01</span><div><SectionLabel>FULL MEMBER APP</SectionLabel><p>長期追蹤、方案脈絡與完整控制室。</p></div></div><PhoneFrame tone="dark" label="APP / CONTROL ROOM"><AppShell activeTab={appTab} onChange={setAppTab}>{appTab === "dashboard" && <AppDashboard onStart={() => setAppTab("checkin")} onProgress={() => setAppTab("progress")} saved={appSaved} scores={appScores} />}{appTab === "checkin" && <AppCheckIn scores={appScores} setScores={setAppScores} saved={appSaved} onSave={saveApp} />}{appTab === "progress" && <AppProgress scores={appScores} saved={appSaved} />}{appTab === "advisor" && <AppAdvisor />}</AppShell></PhoneFrame></div>}
        {mode === "both" && <div className="stage-divider"><span>OR</span></div>}
        {mode !== "app" && <div className="preview-column liff-column"><div className="column-heading"><span className="column-number">02</span><div><SectionLabel tone="muted">LINE LIFF ENTRY</SectionLabel><p>從 LINE 開始的一分鐘快速觀察。</p></div></div><PhoneFrame tone="light" label="LIFF / QUICK ENTRY"><LiffShell view={liffView} setView={setLiffView} scores={liffScores} setScores={setLiffScores} saved={liffSaved} onSave={saveLiff} /></PhoneFrame></div>}
      </section>
      <section className="flow-strip"><div><SectionLabel>MEMBER FLOW</SectionLabel><h2>Open → Observe → Return</h2></div><div className="flow-steps"><div><span>01</span><b>OPEN</b><small>From App or LINE</small></div><div><span>02</span><b>OBSERVE</b><small>Four subjective signals</small></div><div><span>03</span><b>RETURN</b><small>Build a longer view</small></div></div></section>
      <footer className="site-footer"><BrandMark /><span>MI6 MEMBER EXPERIENCE PREVIEW</span><span>APP + LIFF / SESSION ONLY</span></footer>
    </main>
  );
}

