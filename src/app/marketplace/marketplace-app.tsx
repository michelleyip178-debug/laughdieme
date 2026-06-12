"use client";

import { useState, useCallback } from "react";
import { Sidebar, TopBar } from "./shell";
import { Feed } from "./screen-home";
import { OpportunityDetail } from "./screen-opportunity";
import { Applications } from "./screen-applications";
import { Messages } from "./screen-messages";
import { People } from "./screen-people";
import { Profile } from "./screen-profile";
import { Onboarding } from "./screen-onboarding";
import { UploadOpportunities } from "./screen-upload";
import { PEOPLE, Opportunity, Person } from "./data";

let toastTimer: ReturnType<typeof setTimeout>;

function showToast(msg: string) {
  if (typeof document === "undefined") return;
  const t = document.getElementById("ld-toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("ld-toast-show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("ld-toast-show"), 2800);
}

const TABS = ["home", "browse", "applications", "messages", "people", "saved", "profile"];

export function MarketplaceApp() {
  const [view, setView] = useState("home");
  const [opp, setOpp] = useState<Opportunity | null>(null);
  const [onboarding, setOnboarding] = useState(false);
  const [savedIds, setSavedIds] = useState(["o1"]);
  const [appliedIds, setAppliedIds] = useState(["o3", "o1", "o5", "o2"]);
  const [connectedIds, setConnectedIds] = useState(PEOPLE.filter((p) => p.connected).map((p) => p.id));

  const toggleSave = useCallback((id: string) => {
    setSavedIds((s) => {
      const has = s.includes(id);
      showToast(has ? "Removed from saved" : "🔖 Saved to your list");
      return has ? s.filter((x) => x !== id) : [...s, id];
    });
  }, []);

  const apply = useCallback((o: Opportunity) => {
    if (!appliedIds.includes(o.id)) setAppliedIds((a) => [...a, o.id]);
  }, [appliedIds]);

  const connect = useCallback((id: string) => {
    setConnectedIds((c) => {
      if (c.includes(id)) return c;
      const p = PEOPLE.find((x) => x.id === id);
      showToast("🤝 Connection request sent to " + (p ? p.name : "officer"));
      return [...c, id];
    });
  }, []);

  const openOpp = useCallback((o: Opportunity) => {
    setOpp(o);
    window.scrollTo({ top: 0 });
  }, []);

  const nav = useCallback((v: string) => {
    setOpp(null);
    setView(v);
    window.scrollTo({ top: 0 });
  }, []);

  const goMessages = useCallback(() => nav("messages"), [nav]);

  if (onboarding) {
    return (
      <>
        <Onboarding onDone={() => { setOnboarding(false); nav("home"); showToast("Profile updated 🎉"); }} />
        <Toast />
      </>
    );
  }

  const badges: Record<string, number> = { messages: 2, applications: 1 };

  let main;
  if (opp) {
    main = (
      <OpportunityDetail
        opp={opp}
        saved={savedIds.includes(opp.id)}
        applied={appliedIds.includes(opp.id)}
        onSave={() => toggleSave(opp.id)}
        onApply={apply}
        onBack={() => setOpp(null)}
        onConnectLead={() => connect("lead-" + opp.id)}
      />
    );
  } else if (view === "profile") {
    main = <Profile onEdit={() => setOnboarding(true)} />;
  } else if (view === "applications") {
    main = <Applications onOpen={openOpp} />;
  } else if (view === "messages") {
    main = <Messages />;
  } else if (view === "people") {
    main = <People connectedIds={connectedIds} onConnect={connect} onMessage={goMessages} />;
  } else if (view === "upload") {
    main = <UploadOpportunities onNav={nav} />;
  } else {
    main = (
      <Feed
        mode={view}
        savedIds={savedIds}
        onSave={toggleSave}
        onOpen={openOpp}
        onNav={nav}
        onConnect={connect}
        connectedIds={connectedIds}
      />
    );
  }

  return (
    <>
      <style>{`
        html, body { margin: 0; padding: 0; }
        html, body, #__next { min-height: 100%; }
        html { background: #fffdf7; }
        body {
          background: #fffdf7; color: #1a1330;
          font-family: "Geist", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        * { box-sizing: border-box; }
        button { font-family: inherit; }
        @keyframes ldFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ldPop { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }

        #ld-toast {
          position: fixed; left: 50%; bottom: 26px; transform: translate(-50%, 160%);
          background: #1a1330; color: #fff; font-size: 13.5px; font-weight: 600;
          padding: 12px 22px; border-radius: 9999px; box-shadow: 0 14px 30px -8px rgba(26,19,48,.4);
          transition: transform .32s cubic-bezier(.4,0,.2,1); z-index: 200; visibility: hidden; max-width: 90vw;
        }
        #ld-toast.ld-toast-show { transform: translate(-50%, 0); visibility: visible; }

        .ld-navitem {
          display: flex; align-items: center; gap: 12px; padding: 11px 14px; border-radius: 14px;
          border: 0; cursor: pointer; font-family: inherit; font-size: 15px; text-align: left;
          font-weight: 600; background: transparent; color: rgba(26,19,48,.72); transition: all .15s; width: 100%;
        }
        .ld-navitem:hover { background: #faf8ff; }
        .ld-navitem.is-active { background: #f4f0ff; color: #5b21b6; font-weight: 700; }

        @media (max-width: 920px) {
          .ld-sidebar { position: fixed !important; bottom: 0; top: auto !important; left: 0; right: 0; width: 100% !important; height: auto !important;
            flex-direction: row !important; border-right: 0 !important; border-top: 1px solid rgba(26,19,48,.1); z-index: 40;
            padding: 6px !important; gap: 2px !important; justify-content: space-around; }
          .ld-sidebar > div:first-child, .ld-side-cta { display: none !important; }
          .ld-sidebar nav { flex-direction: row !important; justify-content: space-around; width: 100%; gap: 0 !important; }
          .ld-navitem { flex-direction: column !important; gap: 2px !important; font-size: 10px !important; padding: 6px 3px !important; align-items: center !important; }
          .ld-navitem span:nth-child(2) { flex: none !important; }
          .ld-main { padding-bottom: 80px !important; }
          .detail-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 620px) {
          .ld-demo-pill { display: none !important; }
          .ld-topbar-name { display: none; }
          .ld-inbox { width: 100% !important; flex: 1 !important; }
          .ld-inbox.thread-open { display: none !important; }
          .ld-thread { display: none !important; }
          .ld-thread.thread-open { display: block !important; }
          .ld-thread-back { display: inline-block !important; }
        }
      `}</style>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar view={view} onNav={nav} onStartOnboarding={() => setOnboarding(true)} badges={badges} />
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <TopBar onNav={nav} onSearchFocusBrowse={() => nav("browse")} />
          <main className="ld-main" style={{ flex: 1, padding: "30px 28px 48px" }}>{main}</main>
        </div>
      </div>
      <Toast />
    </>
  );
}

function Toast() {
  return (
    <div id="ld-toast" />
  );
}
