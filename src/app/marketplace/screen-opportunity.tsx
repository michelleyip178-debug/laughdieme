import { useState, useEffect } from "react";
import { Card, AgencyMark, TypeBadge, Tag, Button, SaveButton, Avatar, Meta, Modal } from "./primitives";
import { AGENCIES, ME, Opportunity } from "./data";

function DetailRow({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 0", borderBottom: "1px solid rgba(26,19,48,.06)" }}>
      <span style={{ width: 30, height: 30, borderRadius: 9, background: "#f4f0ff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 15, flex: "none" }}>{emoji}</span>
      <span style={{ fontSize: 13.5, color: "rgba(26,19,48,.55)", fontWeight: 600, width: 92, flex: "none" }}>{label}</span>
      <span style={{ fontSize: 14.5, color: "#1a1330", fontWeight: 600 }}>{value}</span>
    </div>
  );
}

function ApplyModal({ opp, open, onClose, onSubmit }: {
  opp: Opportunity; open: boolean; onClose: () => void; onSubmit: (note: string) => void;
}) {
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  useEffect(() => { if (open) { setNote(""); setSent(false); } }, [open]);

  return (
    <Modal open={open} onClose={onClose} maxWidth={520}>
      {sent ? (
        <div style={{ textAlign: "center", padding: "10px 6px" }}>
          <div style={{ fontSize: 48 }}>🎉</div>
          <h2 style={{ margin: "12px 0 0", fontSize: 23, fontWeight: 900, letterSpacing: "-0.02em", color: "#1a1330" }}>Application sent!</h2>
          <p style={{ margin: "8px 0 0", fontSize: 15.5, lineHeight: 1.55, color: "rgba(26,19,48,.66)" }}>
            {opp.lead.name.split(" ")[0]} at {opp.agency} will see your profile and note. You can track this under <strong>Applications</strong>.
          </p>
          <div style={{ marginTop: 22 }}><Button variant="primary" size="lg" full onClick={onClose}>Done</Button></div>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <AgencyMark agency={opp.agency} size={46} />
            <div style={{ minWidth: 0 }}>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 900, letterSpacing: "-0.02em", color: "#1a1330", lineHeight: 1.2 }}>Apply to this {opp.type.toLowerCase()}</h2>
              <p style={{ margin: "3px 0 0", fontSize: 14, color: "rgba(26,19,48,.6)" }}>{opp.title}</p>
            </div>
          </div>

          <div style={{ marginTop: 20, background: "#faf8ff", border: "2px solid #eee6ff", borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar initials={ME.initials} size={40} color="#6d28d9" />
            <div style={{ fontSize: 14, lineHeight: 1.4 }}>
              <div style={{ fontWeight: 700, color: "#1a1330" }}>{ME.name}</div>
              <div style={{ color: "rgba(26,19,48,.6)", fontSize: 13 }}>{ME.role} · {ME.agency}</div>
            </div>
            <span style={{ marginLeft: "auto", fontSize: 12.5, fontWeight: 700, color: "#5b21b6" }}>Profile attached ✓</span>
          </div>

          <label style={{ display: "block", marginTop: 18 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1330" }}>Add a note <span style={{ color: "rgba(26,19,48,.45)", fontWeight: 500 }}>(optional)</span></span>
            <textarea
              value={note} onChange={(e) => setNote(e.target.value)} rows={4}
              placeholder={`Hi ${opp.lead.name.split(" ")[0]} — here's why this caught my eye…`}
              style={{
                marginTop: 7, width: "100%", boxSizing: "border-box", resize: "vertical",
                border: "2px solid #e9e0ff", borderRadius: 16, padding: "12px 16px",
                fontFamily: "inherit", fontSize: 15, color: "#1a1330", outline: "none", lineHeight: 1.5,
              }}
            />
          </label>

          <div style={{ display: "flex", gap: 10, marginTop: 18, justifyContent: "flex-end" }}>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button variant="coral" size="lg" onClick={() => { setSent(true); onSubmit(note); }}>Send application 🚀</Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export function OpportunityDetail({ opp, saved, onSave, onBack, onApply, applied, onConnectLead }: {
  opp: Opportunity; saved: boolean; onSave: () => void; onBack: () => void;
  onApply: (o: Opportunity) => void; applied: boolean; onConnectLead: () => void;
}) {
  const [applyOpen, setApplyOpen] = useState(false);

  return (
    <div style={{ maxWidth: 880, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
      <ApplyModal opp={opp} open={applyOpen} onClose={() => setApplyOpen(false)} onSubmit={() => onApply(opp)} />
      <button onClick={onBack} style={{ alignSelf: "flex-start", background: "none", border: 0, cursor: "pointer", fontFamily: "inherit", fontSize: 14.5, fontWeight: 700, color: "#6d28d9", display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 0" }}>
        <span style={{ fontSize: 16 }}>←</span> Back to opportunities
      </button>

      <Card style={{ padding: 30 }}>
        <div style={{ display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap" }}>
          <AgencyMark agency={opp.agency} size={60} />
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <TypeBadge type={opp.type} />
              <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(26,19,48,.55)" }}>{opp.agency} · posted {opp.posted}</span>
            </div>
            <h1 style={{ margin: "12px 0 0", fontSize: "clamp(24px,3.4vw,32px)", fontWeight: 900, letterSpacing: "-0.025em", color: "#1a1330", lineHeight: 1.12 }}>
              {opp.title}
            </h1>
            <p style={{ margin: "10px 0 0", fontSize: 16.5, lineHeight: 1.55, color: "rgba(26,19,48,.7)" }}>{opp.summary}</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap", alignItems: "center" }}>
          <Button variant="coral" size="lg" onClick={() => applied ? undefined : setApplyOpen(true)}>
            {applied ? "✓ Application sent" : "Apply now"}
          </Button>
          <Button variant="outline" size="lg" onClick={onSave}>{saved ? "🔖 Saved" : "🏷️ Save"}</Button>
          <span style={{ fontSize: 13.5, color: "rgba(26,19,48,.5)", fontWeight: 500, marginLeft: 2 }}>{opp.applicants} officers applied</span>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.7fr) minmax(220px,1fr)", gap: 20, alignItems: "start" }} className="detail-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card style={{ padding: 26 }}>
            <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: "#1a1330", letterSpacing: "-0.01em" }}>About this opportunity</h2>
            <p style={{ margin: "12px 0 0", fontSize: 15.5, lineHeight: 1.65, color: "rgba(26,19,48,.74)" }}>{opp.about}</p>
            <h3 style={{ margin: "22px 0 0", fontSize: 15.5, fontWeight: 800, color: "#1a1330" }}>What you&apos;ll do</h3>
            <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 11 }}>
              {opp.responsibilities.map((r, i) => (
                <li key={i} style={{ display: "flex", gap: 11, fontSize: 15, lineHeight: 1.5, color: "rgba(26,19,48,.74)" }}>
                  <span style={{ color: "#6d28d9", fontWeight: 900, flex: "none" }}>›</span>{r}
                </li>
              ))}
            </ul>
          </Card>
          <Card style={{ padding: 26 }}>
            <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: "#1a1330", letterSpacing: "-0.01em" }}>Skills</h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
              {opp.skills.map((s) => <Tag key={s}>{s}</Tag>)}
            </div>
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card style={{ padding: 22 }}>
            <DetailRow emoji="⚡" label="Type" value={opp.type} />
            <DetailRow emoji="⏳" label="Duration" value={opp.duration} />
            <DetailRow emoji="🕒" label="Commitment" value={opp.commitment} />
            <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 0" }}>
              <span style={{ width: 30, height: 30, borderRadius: 9, background: "#f4f0ff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 15, flex: "none" }}>📍</span>
              <span style={{ fontSize: 13.5, color: "rgba(26,19,48,.55)", fontWeight: 600, width: 92, flex: "none" }}>Location</span>
              <span style={{ fontSize: 14.5, color: "#1a1330", fontWeight: 600 }}>{opp.location}</span>
            </div>
          </Card>
          <Card style={{ padding: 22 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "rgba(26,19,48,.5)", textTransform: "uppercase", letterSpacing: ".05em" }}>Posted by</span>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 13 }}>
              <Avatar
                initials={opp.lead.name.split(" ").map((p) => p[0]).join("")}
                size={44}
                color={AGENCIES[opp.agency]?.color ?? "#6d28d9"}
              />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1330" }}>{opp.lead.name}</div>
                <div style={{ fontSize: 13, color: "rgba(26,19,48,.6)" }}>{opp.lead.role}</div>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <Button variant="ghost" size="sm" full onClick={onConnectLead}>🤝 Connect</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
