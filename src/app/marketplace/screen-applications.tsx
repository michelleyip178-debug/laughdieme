import { useState } from "react";
import { Card, AgencyMark, TypeBadge, Tabs, StatusPill, EmptyState, Meta } from "./primitives";
import { APPLICATIONS, APP_STATUS, OPPORTUNITIES, Opportunity } from "./data";

const oppById = (id: string) => OPPORTUNITIES.find((o) => o.id === id);

function ApplicationRow({ app, onOpen }: { app: typeof APPLICATIONS[0]; onOpen: (o: Opportunity) => void }) {
  const opp = oppById(app.oppId);
  if (!opp) return null;
  return (
    <Card hover onClick={() => onOpen(opp)} style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 15, alignItems: "flex-start" }}>
        <AgencyMark agency={opp.agency} size={46} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <TypeBadge type={opp.type} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(26,19,48,.55)" }}>{opp.agency}</span>
          </div>
          <h3 style={{ margin: "8px 0 0", fontSize: 17, fontWeight: 700, color: "#1a1330", lineHeight: 1.3 }}>{opp.title}</h3>
          <p style={{ margin: "5px 0 0", fontSize: 13.5, color: "rgba(26,19,48,.6)" }}>{app.note}</p>
          <div style={{ marginTop: 10 }}><Meta emoji="🗓️">Applied {app.appliedOn}</Meta></div>
        </div>
        <div style={{ flex: "none" }}><StatusPill status={app.status} map={APP_STATUS} /></div>
      </div>
    </Card>
  );
}

export function Applications({ onOpen }: { onOpen: (o: Opportunity) => void }) {
  const counts = APPLICATIONS.reduce<Record<string, number>>((m, a) => {
    m[a.status] = (m[a.status] || 0) + 1; return m;
  }, {});
  const tabs = [
    { id: "all",          label: "All",         count: APPLICATIONS.length },
    { id: "Shortlisted",  label: "Shortlisted",  count: counts["Shortlisted"]  || 0 },
    { id: "In review",    label: "In review",    count: counts["In review"]    || 0 },
    { id: "Submitted",    label: "Submitted",    count: counts["Submitted"]    || 0 },
    { id: "Closed",       label: "Closed",       count: counts["Closed"]       || 0 },
  ];
  const [tab, setTab] = useState("all");
  const list = tab === "all" ? APPLICATIONS : APPLICATIONS.filter((a) => a.status === tab);

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: "clamp(26px,4vw,34px)", fontWeight: 900, letterSpacing: "-0.025em", color: "#1a1330" }}>Your applications</h1>
        <p style={{ margin: "8px 0 0", fontSize: 16, color: "rgba(26,19,48,.66)" }}>Track everything you&apos;ve applied to across government, in one place.</p>
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      {list.length === 0 ? (
        <Card><EmptyState emoji="📭" title="Nothing here yet" sub="Applications with this status will show up here." /></Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {list.map((a) => <ApplicationRow key={a.id} app={a} onOpen={onOpen} />)}
        </div>
      )}
    </div>
  );
}
