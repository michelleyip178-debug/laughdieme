import { useState } from "react";
import { Card, Avatar, Tag, Button, SearchBar, Tabs, EmptyState } from "./primitives";
import { PEOPLE, AGENCIES, Person } from "./data";

function PersonCard({ person, connected, onConnect, onMessage }: {
  person: Person; connected: boolean;
  onConnect: (id: string) => void; onMessage: (p: Person) => void;
}) {
  return (
    <Card style={{ padding: 22, display: "flex", flexDirection: "column", gap: 13 }}>
      <div style={{ display: "flex", gap: 13, alignItems: "center" }}>
        <Avatar initials={person.initials} size={52} color={AGENCIES[person.agency]?.color} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1330" }}>{person.name}</div>
          <div style={{ fontSize: 13, color: "rgba(26,19,48,.6)" }}>{person.role} · {person.agency}</div>
          <div style={{ fontSize: 12, color: "rgba(26,19,48,.45)", marginTop: 2 }}>{person.mutuals} mutual connections</div>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "rgba(26,19,48,.7)" }}>{person.blurb}</p>
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
        {person.skills.map((s) => <Tag key={s}>{s}</Tag>)}
      </div>
      <div style={{ display: "flex", gap: 9, marginTop: 2 }}>
        {connected
          ? <Button variant="outline" size="sm" full onClick={() => onMessage(person)}>💬 Message</Button>
          : <Button variant="primary" size="sm" full onClick={() => onConnect(person.id)}>🤝 Connect</Button>}
        {connected && <Button variant="ghost" size="sm" onClick={() => onConnect(person.id)}>✓ Connected</Button>}
      </div>
    </Card>
  );
}

export function People({ connectedIds, onConnect, onMessage }: {
  connectedIds: string[];
  onConnect: (id: string) => void;
  onMessage: (p: Person) => void;
}) {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("all");
  const tabs = [
    { id: "all",       label: "All officers" },
    { id: "connected", label: "Connected" },
    { id: "suggested", label: "Suggested" },
  ];

  let list = PEOPLE.slice();
  if (tab === "connected") list = list.filter((p) => connectedIds.includes(p.id));
  if (tab === "suggested") list = list.filter((p) => !connectedIds.includes(p.id));
  if (q.trim()) {
    const t = q.toLowerCase();
    list = list.filter((p) => (p.name + p.role + p.agency + p.skills.join(" ")).toLowerCase().includes(t));
  }

  return (
    <div style={{ maxWidth: 880, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: "clamp(26px,4vw,34px)", fontWeight: 900, letterSpacing: "-0.025em", color: "#1a1330" }}>People</h1>
        <p style={{ margin: "8px 0 0", fontSize: 16, color: "rgba(26,19,48,.66)" }}>Find mentors, collaborators, and teams across every agency.</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <Tabs tabs={tabs} active={tab} onChange={setTab} />
        <SearchBar value={q} onChange={setQ} placeholder="Search people or skills…" width={280} />
      </div>
      {list.length === 0 ? (
        <Card><EmptyState emoji="🧑‍🤝‍🧑" title="No one here yet" sub="Try another tab or search." /></Card>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {list.map((p) => (
            <PersonCard key={p.id} person={p} connected={connectedIds.includes(p.id)} onConnect={onConnect} onMessage={onMessage} />
          ))}
        </div>
      )}
    </div>
  );
}
