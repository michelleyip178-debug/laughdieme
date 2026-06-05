import { useState } from "react";
import { Card, Avatar, Tag, Button, Toggle, AgencyMark } from "./primitives";
import { ME, AGENCIES } from "./data";

export function Profile({ onEdit }: { onEdit: () => void }) {
  const [open, setOpen] = useState(ME.openToGigs);
  const agencyColor = AGENCIES[ME.agency]?.color ?? "#6d28d9";

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ height: 96, background: "#6d28d9", position: "relative", overflow: "hidden" }}>
          <span style={{ position: "absolute", right: 24, top: -10, fontSize: 64, opacity: 0.22 }}>🪪</span>
          <span style={{ position: "absolute", right: 96, top: 30, fontSize: 30, opacity: 0.18 }}>✨</span>
        </div>
        <div style={{ padding: "0 28px 26px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: -38, flexWrap: "wrap", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
              <Avatar initials={ME.initials} size={84} color={agencyColor} ring />
              <div style={{ paddingBottom: 4 }}>
                <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, letterSpacing: "-0.025em", color: "#1a1330" }}>{ME.name}</h1>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 5, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(26,19,48,.7)" }}>{ME.role}</span>
                  <span style={{ width: 4, height: 4, borderRadius: 9, background: "rgba(26,19,48,.3)" }} />
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, color: agencyColor }}>
                    <AgencyMark agency={ME.agency} size={20} /> {ME.agency}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onEdit}>✏️ Edit profile</Button>
          </div>
          <p style={{ margin: "16px 0 0", fontSize: 16, fontStyle: "italic", color: "rgba(26,19,48,.66)" }}>&ldquo;{ME.tagline}&rdquo;</p>

          <div style={{
            display: "flex", alignItems: "center", gap: 12, marginTop: 18, padding: "13px 16px",
            background: open ? "#effcf4" : "#f9f9f9", borderRadius: 16,
            border: `2px solid ${open ? "#b4eccb" : "rgba(26,19,48,.06)"}`, transition: "all .2s", flexWrap: "wrap",
          }}>
            <span style={{ fontSize: 20 }}>{open ? "🟢" : "⚪"}</span>
            <span style={{ flex: 1, minWidth: 160, fontSize: 14.5, fontWeight: 600, color: "#1a1330" }}>
              {open ? "Open to gigs & secondments" : "Not currently looking"}
              <span style={{ display: "block", fontSize: 13, fontWeight: 500, color: "rgba(26,19,48,.6)", marginTop: 2 }}>
                {open ? "Agencies across government can see you're available." : "Flip this on to appear in agency searches."}
              </span>
            </span>
            <Toggle on={open} onChange={setOpen} />
          </div>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {([["📨", ME.stats.applications, "Applications"], ["🔖", ME.stats.saved, "Saved"], ["🤝", ME.stats.connections, "Connections"]] as const).map(([e, n, l]) => (
          <Card key={l} style={{ padding: "18px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 19 }}>{e}</div>
            <div style={{ fontSize: 25, fontWeight: 900, color: "#1a1330", letterSpacing: "-0.02em", marginTop: 4 }}>{n}</div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(26,19,48,.6)", marginTop: 1 }}>{l}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.5fr) minmax(220px,1fr)", gap: 20, alignItems: "start" }} className="detail-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card style={{ padding: 26 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#1a1330" }}>About</h2>
            <p style={{ margin: "11px 0 0", fontSize: 15.5, lineHeight: 1.65, color: "rgba(26,19,48,.74)" }}>{ME.about}</p>
          </Card>
          <Card style={{ padding: 26 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#1a1330" }}>Skills</h2>
            <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "rgba(26,19,48,.55)" }}>These travel with you across every agency.</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
              {ME.skills.map((s) => <Tag key={s} active>{s}</Tag>)}
            </div>
          </Card>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card style={{ padding: 22 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#1a1330" }}>Interests</h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
              {ME.interests.map((s) => <Tag key={s}>{s}</Tag>)}
            </div>
          </Card>
          <Card style={{ padding: 22 }}>
            <h2 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 800, color: "#1a1330" }}>Recent activity</h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {ME.activity.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 11, padding: "11px 0", borderBottom: i < ME.activity.length - 1 ? "1px solid rgba(26,19,48,.06)" : "none" }}>
                  <span style={{ fontSize: 16, flex: "none" }}>{a.emoji}</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.4, color: "rgba(26,19,48,.74)" }}>
                    {a.text}
                    <span style={{ display: "block", fontSize: 12, color: "rgba(26,19,48,.45)", marginTop: 2 }}>{a.when}</span>
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
