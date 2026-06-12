import { useState, useRef } from "react";
import { Card, Button, Tabs } from "./primitives";
import { TYPE_STYLES } from "./data";

// ── Sample OTG rows ──────────────────────────────────────────────────────────
const OTG_ROWS = [
  { id: "OTG-3821", title: "Digital Transformation Lead",    agency: "MOF",     type: "Secondment", duration: "6 months",  commitment: "Full-time",      location: "Hybrid · Treasury Building",       rf_agencies: ["GovTech", "IMDA", "MOF"], rf_grades: "" },
  { id: "OTG-3822", title: "Data Analyst — Budget Insights", agency: "MOF",     type: "Gig",        duration: "6 weeks",   commitment: "~8 hrs/week",    location: "Remote",                           rf_agencies: [], rf_grades: "" },
  { id: "OTG-3823", title: "Cybersecurity Analyst",          agency: "CSA",     type: "Project",    duration: "4 months",  commitment: "Part-time",      location: "On-site · Mapletree Business City",rf_agencies: [], rf_grades: "MX13 and above" },
  { id: "OTG-3824", title: "UX Researcher — HealthHub",      agency: "MOH",     type: "Gig",        duration: "8 weeks",   commitment: "~10 hrs/week",   location: "Remote",                           rf_agencies: [], rf_grades: "" },
  { id: "OTG-3825", title: "Policy Advisor — Green Plan",    agency: "MSF",     type: "Secondment", duration: "5 months",  commitment: "Full-time",      location: "Hybrid · MSF Building",            rf_agencies: [], rf_grades: "" },
  { id: "OTG-3826", title: "Frontend Engineer",              agency: "GovTech", type: "Project",    duration: "3 months",  commitment: "Full-time",      location: "On-site · Mapletree Business City",rf_agencies: [], rf_grades: "" },
  { id: "OTG-3827", title: "Public Communications Manager",  agency: "MCI",     type: "Gig",        duration: "6 weeks",   commitment: "~12 hrs/week",   location: "Hybrid",                           rf_agencies: ["MCI", "MOE"], rf_grades: "" },
  { id: "OTG-3828", title: "Mentorship — Data Career Pivot", agency: "IRAS",    type: "Mentorship", duration: "Ongoing",   commitment: "1 hr/fortnight", location: "Remote",                           rf_agencies: [], rf_grades: "" },
];

interface OtgRow {
  id: string; title: string; agency: string; type: string;
  duration: string; commitment: string; location: string;
  rf_agencies: string[]; rf_grades: string;
  selected?: boolean;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function StatChip({ emoji, label, bg, fg }: { emoji: string; label: string; bg: string; fg: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7, background: bg, color: fg, fontWeight: 700, fontSize: 13.5, padding: "7px 16px", borderRadius: 9999 }}>
      {emoji} {label}
    </span>
  );
}

function RingfenceBadge({ agencies, grades }: { agencies: string[]; grades: string }) {
  if (!agencies.length && !grades)
    return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#d1faf4", color: "#065f46", fontWeight: 700, fontSize: 12.5, padding: "4px 11px", borderRadius: 9999 }}>🌐 All officers</span>;
  if (agencies.length)
    return <span title={agencies.join(" · ")} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#fef3c7", color: "#92400e", fontWeight: 700, fontSize: 12.5, padding: "4px 11px", borderRadius: 9999 }}>🏛️ {agencies.length} {agencies.length === 1 ? "agency" : "agencies"}</span>;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#fff3e8", color: "#c2550a", fontWeight: 700, fontSize: 12.5, padding: "4px 11px", borderRadius: 9999 }}>📊 {grades}</span>;
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepNumbers({ current, labels }: { current: number; labels: string[] }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      {labels.map((lbl, i) => {
        const n = i + 1, done = n < current, active = n === current;
        return (
          <div key={n} style={{ display: "flex", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <span style={{
                width: 30, height: 30, borderRadius: 9999, display: "inline-flex", alignItems: "center",
                justifyContent: "center", fontWeight: 800, fontSize: 13, flex: "none",
                background: done ? "#2dd4bf" : active ? "#6d28d9" : "transparent",
                color: done || active ? "#fff" : "rgba(26,19,48,.3)",
                border: `2px solid ${done ? "#2dd4bf" : active ? "#6d28d9" : "rgba(26,19,48,.15)"}`,
              }}>
                {done ? "✓" : n}
              </span>
              <span style={{ fontSize: 12, fontWeight: active ? 700 : 500, color: active ? "#5b21b6" : "rgba(26,19,48,.42)", whiteSpace: "nowrap" }}>{lbl}</span>
            </div>
            {i < labels.length - 1 && (
              <div style={{ width: 48, height: 2, background: n < current ? "#2dd4bf" : "rgba(26,19,48,.10)", margin: "13px 6px 0", flexShrink: 0 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── STEP 1 — Upload ───────────────────────────────────────────────────────────

function StepUpload({ onNext }: { onNext: () => void }) {
  const [file, setFile] = useState<{ name: string; size?: number; isMock?: boolean } | null>(null);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = (f: File | null) => {
    if (f && f.name.endsWith(".csv")) setFile(f);
  };

  const handleNext = () => {
    if (!file || busy) return;
    setBusy(true);
    setTimeout(() => { setBusy(false); onNext(); }, 820);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div
        onClick={() => !file && inputRef.current?.click()}
        onDragEnter={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files[0]); }}
        style={{
          border: `2.5px dashed ${drag ? "#6d28d9" : file ? "#2dd4bf" : "rgba(26,19,48,.18)"}`,
          borderRadius: 24, padding: "52px 24px", textAlign: "center",
          background: drag ? "#f4f0ff" : file ? "#f0fdfb" : "#faf8ff",
          cursor: file ? "default" : "pointer", transition: "all .18s",
        }}
      >
        <input ref={inputRef} type="file" accept=".csv" style={{ display: "none" }} onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        {file ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 38 }}>✅</span>
            <span style={{ fontWeight: 800, fontSize: 17, color: "#1a1330" }}>{file.name}</span>
            <span style={{ fontSize: 13, color: "rgba(26,19,48,.5)" }}>Ready to parse · {file.isMock ? "~14 KB" : `${((file.size ?? 0) / 1024).toFixed(1)} KB`}</span>
            <button type="button" onClick={() => setFile(null)} style={{ background: "none", border: 0, cursor: "pointer", fontFamily: "inherit", fontSize: 13, color: "#ff5d73", fontWeight: 700 }}>Remove</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <span style={{ width: 56, height: 56, borderRadius: 16, background: "#e9e0ff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📤</span>
            <div>
              <p style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#1a1330" }}>Drop your OTG export here</p>
              <p style={{ margin: "5px 0 0", fontSize: 14, color: "rgba(26,19,48,.55)" }}>or click to browse</p>
            </div>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(26,19,48,.4)", background: "rgba(26,19,48,.05)", padding: "4px 14px", borderRadius: 9999 }}>.csv · OTG standard format</span>
          </div>
        )}
      </div>

      {!file && (
        <button type="button" onClick={() => setFile({ name: "OTG_export_June2026.csv", isMock: true })} style={{ background: "none", border: 0, cursor: "pointer", fontFamily: "inherit", fontSize: 13.5, color: "#6d28d9", fontWeight: 700, textDecoration: "underline", textDecorationStyle: "dotted", padding: 0, textAlign: "left" }}>
          ↗ Use sample OTG export to continue
        </button>
      )}

      <div style={{ background: "rgba(26,19,48,.03)", border: "1.5px solid rgba(26,19,48,.07)", borderRadius: 14, padding: "13px 18px" }}>
        <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(26,19,48,.36)" }}>Expected columns</p>
        <p style={{ margin: 0, fontFamily: "'Geist Mono','Courier New',monospace", fontSize: 12.5, color: "rgba(26,19,48,.6)", lineHeight: 1.75 }}>
          opportunity_id · title · agency · type · duration · commitment · location · competencies · ringfence_agencies · ringfence_grades
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 4 }}>
        <Button onClick={handleNext} size="lg" variant={file ? "primary" : "outline"}>
          {busy ? "Parsing…" : "Next →"}
        </Button>
      </div>
    </div>
  );
}

// ── STEP 2 — Preview & review ─────────────────────────────────────────────────

function StepPreview({ onBack, onConfirm }: { onBack: () => void; onConfirm: (count: number, ringfenced: number) => void }) {
  const [rows, setRows] = useState<OtgRow[]>(() => OTG_ROWS.map((r) => ({ ...r, selected: true })));
  const [tab, setTab] = useState("all");

  const toggle = (id: string) => setRows((prev) => prev.map((r) => r.id === id ? { ...r, selected: !r.selected } : r));
  const allChecked = rows.every((r) => r.selected);
  const toggleAll = () => setRows((prev) => prev.map((r) => ({ ...r, selected: !allChecked })));

  const open = rows.filter((r) => !r.rf_agencies.length && !r.rf_grades);
  const ringed = rows.filter((r) => r.rf_agencies.length || r.rf_grades);
  const selected = rows.filter((r) => r.selected);
  const visible = tab === "all" ? rows : tab === "open" ? open : ringed;

  const COL = "28px 108px 1fr 108px 84px 140px";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
        <StatChip emoji="📋" label={`${rows.length} rows`}         bg="#f4f0ff" fg="#5b21b6" />
        <StatChip emoji="🌐" label={`${open.length} open`}         bg="#d1faf4" fg="#065f46" />
        <StatChip emoji="🏛️" label={`${ringed.length} ringfenced`} bg="#fef3c7" fg="#92400e" />
        <StatChip emoji="✅" label="0 errors"                      bg="#f0fdf4" fg="#166534" />
      </div>

      <Tabs
        tabs={[
          { id: "all", label: "All", count: rows.length },
          { id: "open", label: "Open", count: open.length },
          { id: "ringfenced", label: "Ringfenced", count: ringed.length },
        ]}
        active={tab}
        onChange={setTab}
      />

      <div style={{ display: "grid", gridTemplateColumns: COL, gap: 10, padding: "0 14px", alignItems: "center" }}>
        <input type="checkbox" checked={allChecked} onChange={toggleAll} style={{ width: 15, height: 15, cursor: "pointer", accentColor: "#6d28d9" }} />
        {["ID", "Title & Agency", "Type", "Duration", "Ringfencing"].map((h) => (
          <span key={h} style={{ fontSize: 11, fontWeight: 700, color: "rgba(26,19,48,.36)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 7, maxHeight: "40vh", overflowY: "auto" }}>
        {visible.map((row) => {
          const ts = TYPE_STYLES[row.type] || { bg: "#e9e0ff", fg: "#5b21b6", emoji: "" };
          return (
            <div
              key={row.id}
              onClick={() => toggle(row.id)}
              style={{
                display: "grid", gridTemplateColumns: COL, gap: 10, padding: "13px 14px",
                borderRadius: 14, alignItems: "center", cursor: "pointer",
                background: row.selected ? "#fff" : "rgba(26,19,48,.025)",
                border: `2px solid ${row.selected ? "rgba(26,19,48,.07)" : "rgba(26,19,48,.04)"}`,
                opacity: row.selected ? 1 : 0.48, transition: "all .12s",
              }}
            >
              <input type="checkbox" checked={row.selected} onChange={() => {}} onClick={(e) => { e.stopPropagation(); toggle(row.id); }} style={{ width: 15, height: 15, cursor: "pointer", accentColor: "#6d28d9" }} />
              <span style={{ fontFamily: "'Geist Mono','Courier New',monospace", fontSize: 11.5, color: "rgba(26,19,48,.5)", fontWeight: 600 }}>{row.id}</span>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#1a1330", lineHeight: 1.25 }}>{row.title}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "rgba(26,19,48,.5)", fontWeight: 500 }}>{row.agency} · {row.location}</p>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: ts.bg, color: ts.fg, fontWeight: 700, fontSize: 12, padding: "3px 10px", borderRadius: 9999, whiteSpace: "nowrap" }}>{ts.emoji} {row.type}</span>
              <span style={{ fontSize: 13, color: "rgba(26,19,48,.62)", fontWeight: 500 }}>{row.duration}</span>
              <RingfenceBadge agencies={row.rf_agencies} grades={row.rf_grades} />
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8, borderTop: "1.5px solid rgba(26,19,48,.07)" }}>
        <Button onClick={onBack} variant="ghost">← Back</Button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: "rgba(26,19,48,.5)", fontWeight: 600 }}>{selected.length} selected</span>
          <Button
            onClick={() => onConfirm(selected.length, ringed.filter((r) => r.selected).length)}
            size="lg"
            variant={selected.length ? "primary" : "outline"}
          >
            Publish {selected.length} opportunities →
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── STEP 3 — Confirm ──────────────────────────────────────────────────────────

function StepConfirm({ count, ringfenced, onReset, onView }: {
  count: number; ringfenced: number; onReset: () => void; onView: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "36px 16px 24px", gap: 18 }}>
      <span style={{ width: 76, height: 76, borderRadius: 9999, background: "#d1faf4", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 38 }}>✅</span>
      <div>
        <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900, letterSpacing: "-0.025em", color: "#1a1330" }}>{count} opportunities published!</h2>
        <p style={{ margin: "8px 0 0", fontSize: 15.5, color: "rgba(26,19,48,.6)" }}>They&apos;re now live in the laughdieme marketplace.</p>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <StatChip emoji="🌐" label={`${count - ringfenced} open to all officers`} bg="#d1faf4" fg="#065f46" />
        <StatChip emoji="🏛️" label={`${ringfenced} ringfenced`} bg="#fef3c7" fg="#92400e" />
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
        <Button onClick={onView} size="lg">View in marketplace</Button>
        <Button onClick={onReset} variant="outline" size="lg">Upload another batch</Button>
      </div>
    </div>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export function UploadOpportunities({ onNav }: { onNav?: (v: string) => void }) {
  const [step, setStep] = useState(1);
  const [published, setPublished] = useState({ count: 0, ringfenced: 0 });

  const LABELS = ["Upload CSV", "Review data", "Confirm"];

  return (
    <div style={{ maxWidth: 940, margin: "0 auto" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, letterSpacing: "-0.025em", color: "#1a1330" }}>Upload OTG Opportunities</h1>
            <p style={{ margin: "6px 0 0", fontSize: 15, color: "rgba(26,19,48,.6)" }}>Import listings from One Talent Gateway via CSV export.</p>
          </div>
          <StepNumbers current={step} labels={LABELS} />
        </div>

        {step === 1 && <StepUpload onNext={() => setStep(2)} />}
        {step === 2 && (
          <StepPreview
            onBack={() => setStep(1)}
            onConfirm={(n, r) => { setPublished({ count: n, ringfenced: r }); setStep(3); }}
          />
        )}
        {step === 3 && (
          <StepConfirm
            count={published.count}
            ringfenced={published.ringfenced}
            onReset={() => setStep(1)}
            onView={() => onNav?.("home")}
          />
        )}
      </div>
    </div>
  );
}
