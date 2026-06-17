import { useState } from "react";
import { Card, AgencyMark, TypeBadge, Tag, Button, SaveButton, Avatar, Meta, SearchBar, EmptyState } from "./primitives";
import { OPPORTUNITIES, FILTERS, SORTS, PEOPLE, ME, AGENCIES, Opportunity } from "./data";

// -------------------------------------------------------------- OpportunityCard (vertical feed, home/saved)
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
            <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(17,24,39,.55)" }}>{opp.agency}</span>
          </div>
          <h3 style={{ margin: "9px 0 0", fontSize: 18.5, fontWeight: 700, color: "#111827", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
            {opp.title}
          </h3>
          <p style={{ margin: "6px 0 0", fontSize: 14.5, lineHeight: 1.5, color: "rgba(17,24,39,.66)" }}>{opp.summary}</p>
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
          <span style={{ fontSize: 12, color: "rgba(17,24,39,.45)", fontWeight: 500, whiteSpace: "nowrap" }}>{opp.posted}</span>
        </div>
      </div>
    </Card>
  );
}

// -------------------------------------------------------------- OpportunityCardGrid (compact, browse 3-col)
function OpportunityCardGrid({ opp, saved, onSave, onOpen }: {
  opp: Opportunity; saved: boolean; onSave: () => void; onOpen: (o: Opportunity) => void;
}) {
  const [h, setH] = useState(false);
  const matched = Math.min(opp.skills.length, 4);
  const total = opp.skills.length + 2;
  const closingSoon = opp.applicants > 10;

  return (
    <div
      onClick={() => onOpen(opp)}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 16,
        boxShadow: h ? "0 8px 20px -4px rgba(17,24,39,.10)" : "0 1px 3px rgba(17,24,39,.06)",
        transform: h ? "translateY(-3px)" : "none",
        transition: "all .18s cubic-bezier(.4,0,.2,1)", cursor: "pointer",
        display: "flex", flexDirection: "column", gap: 8,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <TypeBadge type={opp.type} withEmoji={true} />
        <SaveButton saved={saved} onClick={onSave} size={30} />
      </div>
      <div style={{
        fontSize: 15, fontWeight: 700, color: "#111827", lineHeight: 1.35,
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
      }}>
        {opp.title}
      </div>
      <div style={{ fontSize: 12, color: "#6b7280" }}>{opp.agency}</div>
      <div style={{ fontSize: 12, color: "#6b7280" }}>⏰ {opp.commitment}</div>
      <div style={{ fontSize: 12, color: "#1558b0", fontWeight: 600 }}>
        {matched}/{total} competencies matched
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ fontSize: 11, color: "#9ca3af" }}>{opp.posted}</span>
        {closingSoon && (
          <span style={{
            fontSize: 11, fontWeight: 700, color: "#c53030", background: "#fff5f5",
            border: "1px solid #fed7d7", borderRadius: 9999, padding: "2px 8px",
          }}>Closing soon</span>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------- BrowseSidebar
function BrowseSidebar({ activeType, setActiveType, activeAgency, setActiveAgency, sort, setSort }: {
  activeType: string | null; setActiveType: (v: string | null) => void;
  activeAgency: string | null; setActiveAgency: (v: string | null) => void;
  sort: string; setSort: (v: string) => void;
}) {
  const labelStyle: React.CSSProperties = { fontSize: 13, color: "#374151", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", userSelect: "none" };
  const headingStyle: React.CSSProperties = { fontSize: 11, textTransform: "uppercase" as const, letterSpacing: ".06em", fontWeight: 700, color: "#6b7280", marginBottom: 8 };

  return (
    <div style={{ width: 240, flex: "none", display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>Filters</span>
        <button
          type="button"
          onClick={() => { setActiveType(null); setActiveAgency(null); setSort(SORTS[0]); }}
          style={{ background: "none", border: 0, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#1558b0", padding: 0, fontFamily: "inherit" }}
        >Clear</button>
      </div>

      <div>
        <div style={headingStyle}>Sort by</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {["Posted date", "Closing date"].map((s) => (
            <label key={s} style={labelStyle}>
              <input
                type="radio" name="browse-sort" value={s}
                checked={sort === s}
                onChange={() => setSort(s)}
                style={{ accentColor: "#1558b0" }}
              />
              {s}
            </label>
          ))}
        </div>
      </div>

      <div>
        <div style={headingStyle}>Type</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {FILTERS.type.map((t) => (
            <label key={t} style={labelStyle}>
              <input
                type="checkbox"
                checked={activeType === t}
                onChange={() => setActiveType(activeType === t ? null : t)}
                style={{ accentColor: "#1558b0" }}
              />
              {t}
            </label>
          ))}
        </div>
      </div>

      <div>
        <div style={headingStyle}>Agency</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {FILTERS.agency.map((a) => (
            <label key={a} style={labelStyle}>
              <input
                type="checkbox"
                checked={activeAgency === a}
                onChange={() => setActiveAgency(activeAgency === a ? null : a)}
                style={{ accentColor: "#1558b0" }}
              />
              {a}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------- FilterChips (kept for export compatibility)
export function FilterChips({ activeType, setActiveType, activeAgency, setActiveAgency }: {
  activeType: string|null; setActiveType: (v: string|null) => void;
  activeAgency: string|null; setActiveAgency: (v: string|null) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: "rgba(17,24,39,.5)", textTransform: "uppercase", letterSpacing: ".05em", marginRight: 2 }}>Type</span>
        {FILTERS.type.map((t) => (
          <Tag key={t} active={activeType === t} onClick={() => setActiveType(activeType === t ? null : t)}>{t}</Tag>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: "rgba(17,24,39,.5)", textTransform: "uppercase", letterSpacing: ".05em", marginRight: 2 }}>Agency</span>
        {FILTERS.agency.map((a) => (
          <Tag key={a} active={activeAgency === a} onClick={() => setActiveAgency(activeAgency === a ? null : a)}>{a}</Tag>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------- QuickStats
export function QuickStats({ onNav }: { onNav: (v: string) => void }) {
  const items = [
    { emoji: "📨", n: ME.stats.applications, label: "Applications", tint: "#e8f0fe", go: "applications" },
    { emoji: "🔖", n: ME.stats.saved,         label: "Saved",        tint: "#d6f7f1", go: "saved" },
    { emoji: "🤝", n: ME.stats.connections,   label: "Connections",  tint: "#ffe5d0", go: "people" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14 }}>
      {items.map((it) => (
        <Card key={it.label} hover onClick={() => onNav(it.go)} style={{ padding: 18, display: "flex", alignItems: "center", gap: 13 }}>
          <span style={{ width: 44, height: 44, borderRadius: 14, background: it.tint, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 21, flex: "none" }}>{it.emoji}</span>
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: "#111827", letterSpacing: "-0.02em", lineHeight: 1 }}>{it.n}</span>
            <span style={{ fontSize: 13, color: "rgba(17,24,39,.6)", fontWeight: 600, marginTop: 3 }}>{it.label}</span>
          </span>
        </Card>
      ))}
    </div>
  );
}

// -------------------------------------------------------------- PeopleRail
export function PeopleRail({ onConnect, connectedIds, onNav }: {
  onConnect: (id: string) => void; connectedIds: string[]; onNav: (v: string) => void;
}) {
  const picks = PEOPLE.filter((p) => !p.connected).slice(0, 3);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, letterSpacing: "-0.02em", color: "#111827" }}>People you should meet</h2>
        <button type="button" onClick={() => onNav("people")} style={{ background: "none", border: 0, cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 700, color: "#1558b0" }}>See all →</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14 }}>
        {picks.map((p) => {
          const connected = connectedIds.includes(p.id);
          return (
            <Card key={p.id} style={{ padding: 18, textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Avatar initials={p.initials} size={52} color={AGENCIES[p.agency]?.color} />
              </div>
              <div style={{ fontSize: 15.5, fontWeight: 800, color: "#111827", marginTop: 10 }}>{p.name}</div>
              <div style={{ fontSize: 13, color: "rgba(17,24,39,.6)", marginTop: 2 }}>{p.role} · {p.agency}</div>
              <div style={{ fontSize: 12, color: "rgba(17,24,39,.45)", marginTop: 5 }}>{p.mutuals} mutual connections</div>
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
  const isBrowse = mode === "browse";
  const firstName = ME.name.split(" ")[0];

  if (isBrowse) {
    return (
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <BrowseSidebar
          activeType={activeType} setActiveType={setActiveType}
          activeAgency={activeAgency} setActiveAgency={setActiveAgency}
          sort={sort} setSort={setSort}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, letterSpacing: "-0.02em", color: "#111827" }}>Browse opportunities</h2>
            <SearchBar value={q} onChange={setQ} width={280} />
          </div>
          {list.length === 0 ? (
            <Card>
              <EmptyState emoji="🗂️" title="No matches" sub="Try clearing a filter or two." />
            </Card>
          ) : (
            <div className="browse-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {list.map((o) => (
                <OpportunityCardGrid key={o.id} opp={o} saved={savedIds.includes(o.id)} onSave={() => onSave(o.id)} onOpen={onOpen} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 760, margin: "0 auto" }}>
      {isHome && (
        <div>
          <h1 style={{ margin: 0, fontSize: "clamp(28px,4vw,38px)", fontWeight: 900, letterSpacing: "-0.025em", color: "#111827" }}>
            Good morning, {firstName} <span style={{ fontWeight: 400 }}>👋</span>
          </h1>
          <p style={{ margin: "8px 0 0", fontSize: 16.5, color: "rgba(17,24,39,.66)" }}>
            {ME.openToGigs ? "You're open to gigs — here's what's moving across government." : "Here's what's moving across government."}
          </p>
        </div>
      )}

      {isHome && <QuickStats onNav={onNav} />}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, letterSpacing: "-0.02em", color: "#111827" }}>
            {mode === "saved" ? "Saved opportunities" : "Opportunities for you"}
          </h2>
          {!isHome && <SearchBar value={q} onChange={setQ} width={300} />}
        </div>
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
