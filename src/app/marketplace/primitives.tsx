import { useState, CSSProperties, ReactNode } from "react";
import { AGENCIES, TYPE_STYLES } from "./data";

// -------------------------------------------------------------- Button
export function Button({
  children, variant = "primary", size = "md", onClick, full, type = "button",
}: {
  children: ReactNode; variant?: "primary"|"coral"|"ghost"|"outline";
  size?: "sm"|"md"|"lg"; onClick?: () => void; full?: boolean; type?: "button"|"submit";
}) {
  const [h, setH] = useState(false), [p, setP] = useState(false);
  const sizes = {
    sm: { padding: "8px 18px",  fontSize: 14 },
    md: { padding: "11px 22px", fontSize: 15 },
    lg: { padding: "14px 28px", fontSize: 16 },
  };
  const variants = {
    primary: { bg: "#6d28d9", hov: "#5b21b6", fg: "#fff", border: "none" },
    coral:   { bg: "#ff5d73", hov: "#ec5067", fg: "#fff", border: "none" },
    ghost:   { bg: "transparent", hov: "#f4f0ff", fg: "#6d28d9", border: "none" },
    outline: { bg: "#fff", hov: "#f4f0ff", fg: "#5b21b6", border: "2px solid #e9e0ff" },
  };
  const v = variants[variant];
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => { setH(false); setP(false); }}
      onMouseDown={() => setP(true)}
      onMouseUp={() => setP(false)}
      style={{
        ...sizes[size], width: full ? "100%" : "auto",
        background: h ? v.hov : v.bg, color: v.fg, border: v.border,
        borderRadius: 9999, fontWeight: 700, fontFamily: "inherit", cursor: "pointer",
        transition: "all .18s cubic-bezier(.4,0,.2,1)", transform: p ? "scale(0.96)" : "scale(1)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        gap: 8, whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

// -------------------------------------------------------------- Avatar
export function Avatar({ initials, size = 40, color = "#6d28d9", ring = false }: {
  initials: string; size?: number; color?: string; ring?: boolean;
}) {
  return (
    <span style={{
      width: size, height: size, borderRadius: 9999, background: color, color: "#fff",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontWeight: 800, fontSize: size * 0.38, flex: "none", letterSpacing: "-0.01em",
      boxShadow: ring ? "0 0 0 3px #fff, 0 0 0 5px #e9e0ff" : "none",
    }}>
      {initials}
    </span>
  );
}

// -------------------------------------------------------------- Agency mark
export function AgencyMark({ agency, size = 40 }: { agency: string; size?: number }) {
  const a = AGENCIES[agency] || { color: "#6d28d9", short: agency };
  return (
    <span style={{
      width: size, height: size, borderRadius: 12, background: a.color,
      color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontWeight: 800, fontSize: size * 0.3, flex: "none",
    }}>
      {a.short}
    </span>
  );
}

// -------------------------------------------------------------- Type badge
export function TypeBadge({ type, withEmoji = true }: { type: string; withEmoji?: boolean }) {
  const t = TYPE_STYLES[type] || { bg: "#e9e0ff", fg: "#5b21b6", emoji: "" };
  return (
    <span style={{
      background: t.bg, color: t.fg, fontWeight: 700, fontSize: 12.5,
      padding: "4px 12px", borderRadius: 9999,
      display: "inline-flex", alignItems: "center", gap: 5,
    }}>
      {withEmoji && <span style={{ fontSize: 12 }}>{t.emoji}</span>}{type}
    </span>
  );
}

// -------------------------------------------------------------- Skill tag
export function Tag({ children, active, onClick }: {
  children: ReactNode; active?: boolean; onClick?: () => void;
}) {
  return (
    <span
      onClick={onClick}
      style={{
        background: active ? "#6d28d9" : "#fff", color: active ? "#fff" : "#1a1330",
        border: `2px solid ${active ? "#6d28d9" : "rgba(26,19,48,.08)"}`,
        fontWeight: 600, fontSize: 13, padding: "5px 13px", borderRadius: 9999,
        cursor: onClick ? "pointer" : "default", userSelect: "none",
        transition: "all .15s", display: "inline-flex", alignItems: "center", whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

// -------------------------------------------------------------- Card
export function Card({ children, hover, onClick, style }: {
  children: ReactNode; hover?: boolean; onClick?: () => void; style?: CSSProperties;
}) {
  const [h, setH] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: "#fff", border: "2px solid rgba(26,19,48,.05)", borderRadius: 24, padding: 24,
        boxShadow: hover && h
          ? "0 10px 25px -5px rgba(26,19,48,.10), 0 8px 10px -6px rgba(26,19,48,.06)"
          : "0 1px 2px rgba(26,19,48,.06)",
        transform: hover && h ? "translateY(-4px)" : "none",
        transition: "all .18s cubic-bezier(.4,0,.2,1)", cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// -------------------------------------------------------------- Toggle
export function Toggle({ on, onChange, label }: {
  on: boolean; onChange: (v: boolean) => void; label?: string;
}) {
  return (
    <button
      type="button" onClick={() => onChange(!on)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        background: "none", border: 0, cursor: "pointer", fontFamily: "inherit", padding: 0,
      }}
    >
      <span style={{
        width: 46, height: 27, borderRadius: 9999,
        background: on ? "#2dd4bf" : "#dde1e2",
        position: "relative", transition: "background .18s", flex: "none",
      }}>
        <span style={{
          position: "absolute", top: 3, left: on ? 22 : 3,
          width: 21, height: 21, borderRadius: 9999,
          background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", transition: "left .18s",
        }} />
      </span>
      {label && <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1330" }}>{label}</span>}
    </button>
  );
}

// -------------------------------------------------------------- SaveButton
export function SaveButton({ saved, onClick, size = 38 }: {
  saved: boolean; onClick: () => void; size?: number;
}) {
  const [h, setH] = useState(false);
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      title={saved ? "Saved" : "Save"}
      style={{
        width: size, height: size, borderRadius: 9999, flex: "none",
        border: `2px solid ${saved ? "#6d28d9" : "rgba(26,19,48,.10)"}`,
        background: saved ? "#f4f0ff" : h ? "#f4f0ff" : "#fff",
        cursor: "pointer", fontSize: size * 0.44, lineHeight: 1,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        transition: "all .15s", padding: 0,
      }}
    >
      {saved ? "🔖" : "🏷️"}
    </button>
  );
}

// -------------------------------------------------------------- SearchBar
export function SearchBar({ placeholder = "Search gigs, skills, agencies…", value, onChange, width = 360 }: {
  placeholder?: string; value?: string; onChange?: (v: string) => void; width?: number | string;
}) {
  const [f, setF] = useState(false);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 9, width, maxWidth: "100%",
      background: "#fff", borderRadius: 9999, padding: "10px 18px",
      border: `2px solid ${f ? "#7c3aed" : "rgba(26,19,48,.08)"}`,
      boxShadow: f ? "0 0 0 4px rgba(124,58,237,.12)" : "none", transition: "all .15s",
    }}>
      <span style={{ fontSize: 15 }}>🔎</span>
      <input
        value={value} onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setF(true)} onBlur={() => setF(false)}
        placeholder={placeholder}
        style={{
          border: 0, outline: 0, flex: 1, minWidth: 0, fontFamily: "inherit",
          fontSize: 14.5, color: "#1a1330", background: "transparent",
        }}
      />
    </div>
  );
}

// -------------------------------------------------------------- Meta row item
export function Meta({ emoji, children }: { emoji: string; children: ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, color: "rgba(26,19,48,.62)", fontWeight: 500 }}>
      <span style={{ fontSize: 13 }}>{emoji}</span>{children}
    </span>
  );
}

// -------------------------------------------------------------- Modal
export function Modal({ open, onClose, children, maxWidth = 520 }: {
  open: boolean; onClose: () => void; children: ReactNode; maxWidth?: number;
}) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100, background: "rgba(26,19,48,.45)",
        backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20, animation: "ldFade .16s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth, maxHeight: "88vh", overflowY: "auto", background: "#fff",
          borderRadius: 28, padding: 30, boxShadow: "0 32px 64px -16px rgba(26,19,48,.4)",
          animation: "ldPop .2s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// -------------------------------------------------------------- Tabs
export function Tabs({ tabs, active, onChange }: {
  tabs: { id: string; label: string; count?: number }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div style={{
      display: "flex", gap: 4, background: "#f2f0f7", padding: 4,
      borderRadius: 9999, width: "fit-content", maxWidth: "100%", overflowX: "auto",
    }}>
      {tabs.map((t) => {
        const on = active === t.id;
        return (
          <button key={t.id} type="button" onClick={() => onChange(t.id)} style={{
            border: 0, cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 700,
            padding: "8px 16px", borderRadius: 9999, whiteSpace: "nowrap",
            background: on ? "#fff" : "transparent", color: on ? "#5b21b6" : "rgba(26,19,48,.6)",
            boxShadow: on ? "0 1px 3px rgba(26,19,48,.12)" : "none", transition: "all .15s",
          }}>
            {t.label}{typeof t.count === "number" ? ` ${t.count}` : ""}
          </button>
        );
      })}
    </div>
  );
}

// -------------------------------------------------------------- StatusPill
export function StatusPill({ status, map }: {
  status: string; map?: Record<string, { color: string; bg: string; emoji: string }>;
}) {
  const s = (map && map[status]) || { color: "#5b21b6", bg: "#f4f0ff", emoji: "•" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, background: s.bg, color: s.color,
      fontWeight: 700, fontSize: 12.5, padding: "4px 12px", borderRadius: 9999, whiteSpace: "nowrap",
    }}>
      <span>{s.emoji}</span>{status}
    </span>
  );
}

// -------------------------------------------------------------- EmptyState
export function EmptyState({ emoji = "🗂️", title, sub }: {
  emoji?: string; title: string; sub?: string;
}) {
  return (
    <div style={{ textAlign: "center", padding: "48px 24px" }}>
      <div style={{ fontSize: 40 }}>{emoji}</div>
      <p style={{ margin: "12px 0 0", fontSize: 16.5, fontWeight: 700, color: "#1a1330" }}>{title}</p>
      {sub && <p style={{ margin: "6px 0 0", fontSize: 14.5, color: "rgba(26,19,48,.6)" }}>{sub}</p>}
    </div>
  );
}
