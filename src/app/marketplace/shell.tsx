import { useState, useRef, useEffect, ReactNode } from "react";
import { Avatar, SearchBar, Button } from "./primitives";
import { NAV, NOTIFICATIONS, ME, AGENCIES } from "./data";

export function Sidebar({ view, onNav, onStartOnboarding, badges }: {
  view: string;
  onNav: (v: string) => void;
  onStartOnboarding: () => void;
  badges?: Record<string, number>;
}) {
  return (
    <aside className="ld-sidebar" style={{
      width: 248, flex: "none", background: "#fff", borderRight: "1px solid rgba(26,19,48,.07)",
      display: "flex", flexDirection: "column", padding: "22px 16px", boxSizing: "border-box",
      position: "sticky", top: 0, height: "100vh",
    }}>
      <div style={{ padding: "4px 10px 22px" }}>
        <span style={{ fontWeight: 900, letterSpacing: "-0.025em", textTransform: "lowercase", fontSize: 24, color: "#5b21b6" }}>laughdieme</span>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        {NAV.map((item) => {
          const active = view === item.id;
          const badge = badges?.[item.id];
          return (
            <button key={item.id} type="button" onClick={() => onNav(item.id)}
              className={"ld-navitem" + (active ? " is-active" : "")}>
              <span style={{ fontSize: 18, width: 22, textAlign: "center", flex: "none" }}>{item.emoji}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {badge ? (
                <span style={{
                  flex: "none", minWidth: 20, height: 20, borderRadius: 9999,
                  background: "#ff5d73", color: "#fff", fontSize: 11.5, fontWeight: 800,
                  display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 6px",
                }}>{badge}</span>
              ) : null}
            </button>
          );
        })}
      </nav>
      <div style={{ background: "#6d28d9", borderRadius: 20, padding: 18, marginTop: 12 }} className="ld-side-cta">
        <div style={{ fontSize: 22 }}>🚀</div>
        <div style={{ fontSize: 14.5, fontWeight: 800, color: "#fff", marginTop: 8, lineHeight: 1.3 }}>Keep your profile sharp</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,.8)", marginTop: 3, lineHeight: 1.4 }}>Update your skills so agencies can find you.</div>
        <div style={{ marginTop: 12 }}>
          <Button variant="coral" size="sm" full onClick={onStartOnboarding}>Edit profile</Button>
        </div>
      </div>
    </aside>
  );
}

function NotifMenu({ items, onClose }: {
  items: typeof NOTIFICATIONS; onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  return (
    <div ref={ref} style={{
      position: "absolute", right: 0, top: "calc(100% + 10px)", width: 340, maxWidth: "86vw",
      background: "#fff", borderRadius: 20, border: "2px solid rgba(26,19,48,.06)",
      boxShadow: "0 24px 48px -12px rgba(26,19,48,.28)", zIndex: 60, overflow: "hidden",
    }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(26,19,48,.07)", fontSize: 15, fontWeight: 800, color: "#1a1330" }}>Notifications</div>
      <div style={{ maxHeight: 360, overflowY: "auto" }}>
        {items.map((n) => (
          <div key={n.id} style={{
            display: "flex", gap: 12, padding: "13px 18px",
            borderBottom: "1px solid rgba(26,19,48,.05)",
            background: n.unread ? "#faf8ff" : "#fff",
          }}>
            <span style={{ fontSize: 18, flex: "none" }}>{n.emoji}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13.5, lineHeight: 1.4, color: "#1a1330" }}>{n.text}</div>
              <div style={{ fontSize: 12, color: "rgba(26,19,48,.45)", marginTop: 2 }}>{n.when} ago</div>
            </div>
            {n.unread && (
              <span style={{ flex: "none", width: 8, height: 8, borderRadius: 9999, background: "#ff5d73", marginTop: 5 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TopBar({ onNav, onSearchFocusBrowse }: {
  onNav: (v: string) => void;
  onSearchFocusBrowse: () => void;
}) {
  const agencyColor = AGENCIES[ME.agency]?.color ?? "#6d28d9";
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <header style={{
      display: "flex", alignItems: "center", gap: 14, padding: "14px 28px",
      borderBottom: "1px solid rgba(26,19,48,.07)", background: "rgba(255,253,247,.85)",
      backdropFilter: "blur(8px)", position: "sticky", top: 0, zIndex: 30,
    }}>
      <div style={{ flex: 1, maxWidth: 380 }} onClick={onSearchFocusBrowse}>
        <SearchBar width="100%" />
      </div>
      <div style={{ flex: 1 }} />
      <span
        title="All listings, profiles and agencies in this app are illustrative placeholders — not real government opportunities."
        className="ld-demo-pill"
        style={{
          display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700,
          color: "#98590c", background: "#fdf6e9", border: "1.5px solid #f3dca6",
          padding: "5px 12px", borderRadius: 9999, whiteSpace: "nowrap", cursor: "default",
        }}
      >✦ Sample data</span>
      <div style={{ position: "relative" }}>
        <button
          type="button" title="Notifications"
          onClick={() => setNotifOpen((o) => !o)}
          style={{
            position: "relative", width: 42, height: 42, borderRadius: 9999,
            border: "2px solid rgba(26,19,48,.08)",
            background: notifOpen ? "#f4f0ff" : "#fff", cursor: "pointer", fontSize: 17,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}
        >
          🔔
          {unread > 0 && (
            <span style={{
              position: "absolute", top: -3, right: -3, minWidth: 18, height: 18,
              borderRadius: 9999, background: "#ff5d73", color: "#fff", fontSize: 10.5,
              fontWeight: 800, display: "inline-flex", alignItems: "center",
              justifyContent: "center", padding: "0 5px", border: "2px solid #fffdf7",
            }}>{unread}</span>
          )}
        </button>
        {notifOpen && <NotifMenu items={NOTIFICATIONS} onClose={() => setNotifOpen(false)} />}
      </div>
      <button
        type="button" onClick={() => onNav("profile")}
        style={{
          display: "flex", alignItems: "center", gap: 10, background: "#fff",
          border: "2px solid rgba(26,19,48,.08)", borderRadius: 9999,
          padding: "5px 14px 5px 5px", cursor: "pointer", fontFamily: "inherit",
        }}
      >
        <Avatar initials={ME.initials} size={32} color={agencyColor} />
        <span className="ld-topbar-name" style={{ fontSize: 14, fontWeight: 700, color: "#1a1330" }}>
          {ME.name.split(" ")[0]}
        </span>
      </button>
    </header>
  );
}
