import { useState, useRef, useEffect } from "react";
import { Card, Avatar, Button, EmptyState } from "./primitives";
import { CONVERSATIONS, PEOPLE, AGENCIES, Message, Conversation } from "./data";

const personById = (id: string) => PEOPLE.find((p) => p.id === id);

function ConversationList({ convos, activeId, onPick }: {
  convos: Conversation[]; activeId: string | null; onPick: (id: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {convos.map((c) => {
        const p = personById(c.personId);
        const on = activeId === c.id;
        return (
          <button key={c.id} type="button" onClick={() => onPick(c.id)} style={{
            display: "flex", gap: 12, alignItems: "center", textAlign: "left", width: "100%",
            border: 0, cursor: "pointer", fontFamily: "inherit", padding: "12px 13px", borderRadius: 16,
            background: on ? "#f4f0ff" : "transparent", transition: "background .15s",
          }}>
            <Avatar initials={p?.initials ?? "?"} size={44} color={AGENCIES[p?.agency ?? ""]?.color} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14.5, fontWeight: 700, color: "#1a1330", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p?.name}</span>
                <span style={{ fontSize: 11.5, color: "rgba(26,19,48,.45)", flex: "none" }}>{c.lastWhen}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                <span style={{ fontSize: 13, color: "rgba(26,19,48,.6)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.preview}</span>
                {c.unread > 0 && (
                  <span style={{ flex: "none", minWidth: 18, height: 18, borderRadius: 9999, background: "#ff5d73", color: "#fff", fontSize: 11, fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 5px" }}>{c.unread}</span>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function Bubble({ msg }: { msg: Message }) {
  const mine = msg.from === "me";
  return (
    <div style={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start" }}>
      <div style={{
        maxWidth: "76%", padding: "10px 15px", borderRadius: 20, fontSize: 14.5, lineHeight: 1.45,
        background: mine ? "#6d28d9" : "#fff", color: mine ? "#fff" : "#1a1330",
        border: mine ? "none" : "2px solid rgba(26,19,48,.06)",
        borderBottomRightRadius: mine ? 6 : 20, borderBottomLeftRadius: mine ? 20 : 6,
      }}>
        {msg.text}
      </div>
    </div>
  );
}

function Thread({ convo, onBack }: { convo: Conversation; onBack: () => void }) {
  const p = personById(convo.personId);
  const [msgs, setMsgs] = useState<Message[]>(convo.messages);
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMsgs(convo.messages); }, [convo.id]);
  useEffect(() => {
    if (endRef.current) endRef.current.parentElement!.scrollTop = endRef.current.offsetTop;
  }, [msgs]);

  const send = () => {
    if (!draft.trim()) return;
    setMsgs((m) => [...m, { from: "me", text: draft.trim(), when: "Now" }]);
    setDraft("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderBottom: "1px solid rgba(26,19,48,.07)" }}>
        <button type="button" onClick={onBack} className="ld-thread-back" style={{ background: "none", border: 0, cursor: "pointer", fontSize: 20, color: "#6d28d9", display: "none" }}>←</button>
        <Avatar initials={p?.initials ?? "?"} size={40} color={AGENCIES[p?.agency ?? ""]?.color} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 15.5, fontWeight: 700, color: "#1a1330" }}>{p?.name}</div>
          <div style={{ fontSize: 12.5, color: "rgba(26,19,48,.6)" }}>{p?.role} · {p?.agency}</div>
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 10, background: "#fbfaff" }}>
        {msgs.map((m, i) => <Bubble key={i} msg={m} />)}
        <div ref={endRef} />
      </div>
      <div style={{ display: "flex", gap: 10, padding: 14, borderTop: "1px solid rgba(26,19,48,.07)", alignItems: "center" }}>
        <input
          value={draft} onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Write a message…"
          style={{ flex: 1, minWidth: 0, border: "2px solid #e9e0ff", borderRadius: 9999, padding: "11px 18px", fontFamily: "inherit", fontSize: 14.5, color: "#1a1330", outline: "none" }}
        />
        <Button variant="primary" onClick={send}>Send</Button>
      </div>
    </div>
  );
}

export function Messages() {
  const [activeId, setActiveId] = useState<string | null>(CONVERSATIONS[0]?.id ?? null);
  const [mobileThread, setMobileThread] = useState(false);
  const convo = CONVERSATIONS.find((c) => c.id === activeId);

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18, height: "calc(100vh - 140px)", minHeight: 460 }}>
      <h1 style={{ margin: 0, fontSize: "clamp(26px,4vw,34px)", fontWeight: 900, letterSpacing: "-0.025em", color: "#1a1330", flex: "none" }}>Messages</h1>
      <Card style={{ padding: 0, overflow: "hidden", flex: 1, minHeight: 0, display: "flex" }}>
        <div className={"ld-inbox" + (mobileThread ? " thread-open" : "")} style={{ width: 320, flex: "none", borderRight: "1px solid rgba(26,19,48,.07)", overflowY: "auto", padding: 10 }}>
          <ConversationList convos={CONVERSATIONS} activeId={activeId} onPick={(id) => { setActiveId(id); setMobileThread(true); }} />
        </div>
        <div className={"ld-thread" + (mobileThread ? " thread-open" : "")} style={{ flex: 1, minWidth: 0 }}>
          {convo ? <Thread convo={convo} onBack={() => setMobileThread(false)} /> : <EmptyState emoji="💬" title="Pick a conversation" />}
        </div>
      </Card>
    </div>
  );
}
