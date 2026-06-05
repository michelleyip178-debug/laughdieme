import { useState, ReactNode } from "react";
import { Button, Tag, Toggle, Avatar } from "./primitives";

const SKILL_BANK = ["Policy Analysis", "UX Research", "Data Analysis", "Writing", "Project Management", "Stakeholder Engagement", "Software Engineering", "Service Design", "Facilitation", "Comms", "Finance", "Legal"];
const LOOKING_FOR = [
  { id: "gig",        emoji: "⚡", label: "Short gigs",    sub: "A few hours a week" },
  { id: "secondment", emoji: "🔁", label: "Secondments",   sub: "Full-time, fixed term" },
  { id: "project",    emoji: "🚀", label: "Projects",      sub: "Cross-agency teams" },
  { id: "mentorship", emoji: "🤝", label: "Mentorship",    sub: "Give or get guidance" },
];

const inputStyle: React.CSSProperties = {
  border: "2px solid #e9e0ff", borderRadius: 14, padding: "12px 16px",
  fontFamily: "inherit", fontSize: 15, color: "#1a1330", outline: "none",
  width: "100%", boxSizing: "border-box", background: "#fff",
};

function StepDots({ step }: { step: number }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{
          height: 7, borderRadius: 9999, width: i === step ? 26 : 7,
          background: i <= step ? "#6d28d9" : "#dde1e2", transition: "all .25s",
        }} />
      ))}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1330" }}>{label}</span>
      {children}
    </label>
  );
}

export function Onboarding({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [agency, setAgency] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [looking, setLooking] = useState<string[]>([]);
  const [open, setOpen] = useState(true);

  const toggle = <T,>(arr: T[], set: (v: T[]) => void, v: T) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const stepN = ["01", "02", "03"][step];
  const titles = ["Create your profile", "Add your skills", "What are you looking for?"];
  const subs = [
    "Tell agencies who you are. This travels with you across government.",
    "Pick the skills you want to be found for. You can refine these later.",
    "Choose the kinds of opportunities you'd like to see.",
  ];
  const canNext = step === 0 ? name && role && agency : step === 1 ? skills.length > 0 : looking.length > 0;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 20px", gap: 16 }}>
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700,
        color: "#98590c", background: "#fdf6e9", border: "1.5px solid #f3dca6",
        padding: "5px 12px", borderRadius: 9999,
      }}>✦ Sample data — illustrative only</span>
      <div style={{
        width: "100%", maxWidth: 560, background: "#fff", border: "2px solid rgba(26,19,48,.05)",
        borderRadius: 28, padding: "34px 36px", boxShadow: "0 24px 48px -12px rgba(109,40,217,.18)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-0.025em", color: "#c2a8ff", lineHeight: 1 }}>{stepN}</span>
          <StepDots step={step} />
        </div>
        <h1 style={{ margin: "16px 0 0", fontSize: 27, fontWeight: 900, letterSpacing: "-0.025em", color: "#1a1330" }}>{titles[step]}</h1>
        <p style={{ margin: "8px 0 0", fontSize: 15.5, lineHeight: 1.5, color: "rgba(26,19,48,.66)" }}>{subs[step]}</p>

        <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 18 }}>
          {step === 0 && (
            <>
              <Field label="Full name"><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Mei Ling Chua" /></Field>
              <Field label="Current role"><input style={inputStyle} value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Senior Policy Officer" /></Field>
              <Field label="Agency"><input style={inputStyle} value={agency} onChange={(e) => setAgency(e.target.value)} placeholder="e.g. URA" /></Field>
            </>
          )}
          {step === 1 && (
            <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
              {SKILL_BANK.map((s) => (
                <Tag key={s} active={skills.includes(s)} onClick={() => toggle(skills, setSkills, s)}>
                  {skills.includes(s) ? "✓ " : ""}{s}
                </Tag>
              ))}
            </div>
          )}
          {step === 2 && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {LOOKING_FOR.map((o) => {
                  const on = looking.includes(o.id);
                  return (
                    <button key={o.id} type="button" onClick={() => toggle(looking, setLooking, o.id)} style={{
                      textAlign: "left", cursor: "pointer", fontFamily: "inherit",
                      background: on ? "#f4f0ff" : "#fff",
                      border: `2px solid ${on ? "#6d28d9" : "rgba(26,19,48,.08)"}`,
                      borderRadius: 18, padding: 16, transition: "all .15s",
                    }}>
                      <div style={{ fontSize: 24 }}>{o.emoji}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1330", marginTop: 8 }}>{o.label}</div>
                      <div style={{ fontSize: 13, color: "rgba(26,19,48,.6)", marginTop: 2 }}>{o.sub}</div>
                    </button>
                  );
                })}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", background: "#effcf4", borderRadius: 16, border: "2px solid #b4eccb" }}>
                <span style={{ flex: 1, fontSize: 14.5, fontWeight: 600, color: "#1a1330" }}>Show agencies I&apos;m open to gigs</span>
                <Toggle on={open} onChange={setOpen} />
              </div>
            </>
          )}
        </div>

        <div style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          {step > 0
            ? <Button variant="ghost" onClick={() => setStep(step - 1)}>← Back</Button>
            : <span />}
          {step < 2
            ? <Button onClick={() => canNext && setStep(step + 1)} variant={canNext ? "primary" : "outline"}>Continue →</Button>
            : <Button variant="coral" onClick={onDone}>🎉 Finish &amp; explore</Button>}
        </div>
      </div>
    </div>
  );
}
