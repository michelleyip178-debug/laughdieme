import { useState } from "react";
import { Card, AgencyMark, TypeBadge, Tag, Button, SaveButton, Avatar, Meta, SearchBar, EmptyState } from "./primitives";
import { OPPORTUNITIES, FILTERS, SORTS, PEOPLE, ME, AGENCIES, Opportunity, Person } from "./data";

// -------------------------------------------------------------- OpportunityCard
export function OpportunityCard({ opp, saved, onSave, onOpen }: {
  opp: Opportunity; saved: boolean; onSave: () => void; onOpen: (o: Opportunity) => void;
}) {
  return (
    <Card hover onClick={() => onOpen(opp)} style={{ padding: 22 }}>
      <div style={{ display: "flex", gap: 16 }}>
        <AgencyMark agency={opp.agency} size={48} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <TypeBadge type={opp.type} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(26,19,48,.55)" }}>{opp.agency}</span>
          </div>
          <h3 style={{ margin: "9px 0 0", fontSize: 18.5, fontWeight: 700, color: "#1a1330", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
            {opp.title}
          </h3>
          <p style={{ margin: "6px 0 0", fontSize: 14.5, lineHeight: 1.5, color: "rgba(26,19,48,.66)" }}>{opp.summary}</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 13 }}>
            <Meta emoji="⏳">{opp.duration}</Meta>
            <Meta emoji="📍">{opp.location}</Meta>
            <Meta emoji="👥">{opp.applicants} applied</Meta>
          </div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 14 }}>
            {opp.skills.slice(0, 4).map((s) => <Tag key={s}>{s}</Tag>)}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
          <SaveButton saved={saved} onClick={onSave} />
          <span style={{ fontSize: 12, color: "rgba(26,19,48,.45)", fontWeight: 500, whiteSpace: "nowrap" }}>{opp.posted}</span>
        </div>
      </div>
    </Card>
  );
}

// -------------------------------------------------------------- FilterChips
function FilterChips({ activeType, setActiveType, activeAgency, setActiveAgency }: {
  activeType: string|null; setActiveType: (v: string|null) => void;
  activeAgency: string|null; setActiveAgency: (v: string|null) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: "rgba(26,19,48,.5)", textTransform: "uppercase", letterSpacing: ".05em", marginRight: 2 }}>Type</span>
        {FILTERS.type.map((t) => (
          <Tag key={t} active={activeType === t} onClick={() => setActiveType(activeType === t ? null : t)}>{t}</Tag>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: "rgba(26,19,48,.5)", textTransform: "uppercase", letterSpacing: ".05em", marginRight: 2 }}>Agency</span>
        {FILTERS.agency.map((a) => (
          <Tag key={a} active={activeAgency === a} onClick={() => setActiveAgency(activeAgency === a ? null : a)}>{a}</Tag>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------- QuickStats
function QuickStats({ onNav }: { onNav: (v: string) => void }) {
  const items = [
    { emoji: "📨", n: ME.stats.applications, label: "Applications", tint: "#e9e0ff", go: "applications" },
    { emoji: "🔖", n: ME.stats.saved,         label: "Saved",        tint: "#d6f7f1", go: "saved" },
    { emoji: "🤝", n: ME.stats.connections,   label: "Connections",  tint: "#ffe5d0", go: "people" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14 }}>
      {items.map((it) => (
        <Card key={it.label} hover onClick={() => onNav(it.go)} style={{ padding: 18, display: "flex", alignItems: "center", gap: 13 }}>
          <span style={{ width: 44, height: 44, borderRadius: 14, background: it.tint, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 21, flex: "none" }}>{it.emoji}</span>
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: "#1a1330", letterSpacing: "-0.02em", lineHeight: 1 }}>{it.n}</span>
            <span style={{ fontSize: 13, color: "rgba(26,19,48,.6)", fontWeight: 600, marginTop: 3 }}>{it.label}</span>
          </span>
        </Card>
      ))}
    </div>
  );
}

// -------------------------------------------------------------- PeopleRail
function PeopleRail({ onConnect, connectedIds, onNav }: {
  onConnect: (id: string) => void; connectedIds: string[]; onNav: (v: string) => void;
}) {
  const picks = PEOPLE.filter((p) => !p.connected).slice(0, 3);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, letterSpacing: "-0.02em", color: "#1a1330" }}>People you should meet</h2>
        <button type="button" onClick={() => onNav("people")} style={{ background: "none", border: 0, cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 700, color: "#6d28d9" }}>See all →</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14 }}>
        {picks.map((p) => {
          const connected = connectedIds.includes(p.id);
          return (
            <Card key={p.id} style={{ padding: 18, textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Avatar initials={p.initials} size={52} color={AGENCIES[p.agency]?.color} />
              </div>
              <div style={{ fontSize: 15.5, fontWeight: 800, color: "#1a1330", marginTop: 10 }}>{p.name}</div>
              <div style={{ fontSize: 13, color: "rgba(26,19,48,.6)", marginTop: 2 }}>{p.role} · {p.agency}</div>
              <div style={{ fontSize: 12, color: "rgba(26,19,48,.45)", marginTop: 5 }}>{p.mutuals} mutual connections</div>
              <div style={{ marginTop: 13 }}>
                <Button variant={connected ? "outline" : "primary"} size="sm" full onClick={() => onConnect(p.id)}>
                  {connected ? "✓ Requested" : "🤝 Connect"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// -------------------------------------------------------------- Feed
export function Feed({ mode, savedIds, onSave, onOpen, onNav, onConnect, connectedIds }: {
  mode: string; savedIds: string[]; onSave: (id: string) => void;
  onOpen: (o: Opportunity) => void; onNav: (v: string) => void;
  onConnect: (id: string) => void; connectedIds: string[];
}) {
  const [q, setQ] = useState("");
  const [activeType, setActiveType] = useState<string|null>(null);
  const [activeAgency, setActiveAgency] = useState<string|null>(null);
  const [sort, setSort] = useState(SORTS[0]);

  let list = OPPORTUNITIES.slice();
  if (mode === "saved") list = list.filter((o) => savedIds.includes(o.id));
  if (activeType) list = list.filter((o) => o.type === activeType);
  if (activeAgency) list = list.filter((o) => o.agency === activeAgency);
  if (q.trim()) {
    const t = q.toLowerCase();
    list = list.filter((o) => (o.title + o.summary + o.agency + o.skills.join(" ")).toLowerCase().includes(t));
  }
  if (sort === "Fewest applicants") list.sort((a, b) => a.applicants - b.applicants);

  const isHome = mode === "home";
  const firstName = ME.name.split(" ")[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 760, margin: "0 auto" }}>
      {isHome && (
        <div>
          <h1 style={{ margin: 0, fontSize: "clamp(28px,4vw,38px)", fontWeight: 900, letterSpacing: "-0.025em", color: "#1a1330" }}>
            Good morning, {firstName} <span style={{ fontWeight: 400 }}>👋</span>
          </h1>
          <p style={{ margin: "8px 0 0", fontSize: 16.5, color: "rgba(26,19,48,.66)" }}>
            {ME.openToGigs ? "You're open to gigs — here's what's moving across government." : "Here's what's moving across government."}
          </p>
        </div>
      )}

      {isHome && <QuickStats onNav={onNav} />}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, letterSpacing: "-0.02em", color: "#1a1330" }}>
            {mode === "saved" ? "Saved opportunities" : isHome ? "Opportunities for you" : "Browse opportunities"}
          </h2>
          {!isHome && <SearchBar value={q} onChange={setQ} width={300} />}
        </div>
        {!isHome && (
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <FilterChips {...{ activeType, setActiveType, activeAgency, setActiveAgency }} />
            <label style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600, color: "rgba(26,19,48,.6)" }}>
              Sort
              <select value={sort} onChange={(e) => setSort(e.target.value)} style={{
                fontFamily: "inherit", fontSize: 13.5, fontWeight: 700, color: "#1a1330", cursor: "pointer",
                border: "2px solid rgba(26,19,48,.08)", borderRadius: 9999, padding: "7px 12px",
                background: "#fff", outline: "none",
              }}>
                {SORTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
          </div>
        )}
        {list.length === 0 ? (
          <Card>
            <EmptyState
              emoji="🗂️"
              title={mode === "saved" ? "Nothing saved yet" : "No matches"}
              sub={mode === "saved" ? "Tap the tag on any card to save it for later." : "Try clearing a filter or two."}
            />
          </Card>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {list.map((o) => (
              <OpportunityCard key={o.id} opp={o} saved={savedIds.includes(o.id)} onSave={() => onSave(o.id)} onOpen={onOpen} />
            ))}
          </div>
        )}
      </div>

      {isHome && <PeopleRail onConnect={onConnect} connectedIds={connectedIds} onNav={onNav} />}
    </div>
  );
}
