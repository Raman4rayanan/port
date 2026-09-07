"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { resetAllToDefaults } from "@/lib/store";

// Dynamic imports to ensure all tabs are client-only
const ProjectsTab = dynamic(() => import("./components/ProjectsTab"), { ssr: false });
const CertificationsTab = dynamic(() => import("./components/CertificationsTab"), { ssr: false });
const InnovationsTab = dynamic(() => import("./components/InnovationsTab"), { ssr: false });
const SiteConfigTab = dynamic(() => import("./components/SiteConfigTab"), { ssr: false });

type Tab = "projects" | "certifications" | "innovations" | "config";

const TABS: { id: Tab; label: string; index: string }[] = [
  { id: "projects", label: "PROJECTS", index: "01" },
  { id: "certifications", label: "CERTIFICATIONS", index: "02" },
  { id: "innovations", label: "INNOVATIONS", index: "03" },
  { id: "config", label: "SITE CONFIG", index: "04" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [saveCount, setSaveCount] = useState(0); // bumped to force re-render
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [globalToast, setGlobalToast] = useState("");

  function handleSave() { setSaveCount(c => c + 1); }

  function handleReset() {
    resetAllToDefaults();
    setShowResetConfirm(false);
    setGlobalToast("ALL DATA RESET TO DEFAULTS");
    setTimeout(() => setGlobalToast(""), 3000);
    setSaveCount(c => c + 1);
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">
      {/* Global Toast */}
      {globalToast && (
        <div className="fixed top-6 right-6 z-[80] bg-amber-500 text-black font-mono text-xs tracking-widest uppercase px-6 py-3">
          ! {globalToast}
        </div>
      )}

      {/* Top Bar */}
      <header className="border-b border-white/10 px-6 md:px-10 py-5 flex justify-between items-center shrink-0 bg-[#0a0a0a]">
        <div className="flex items-center gap-6">
          <div className="font-mono text-xs tracking-widest text-zinc-400 uppercase">RG / ADMIN</div>
          <div className="w-px h-4 bg-white/10" />
          <div className="font-mono text-[10px] tracking-widest text-emerald-400 uppercase">SYSTEM ONLINE</div>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-widest text-zinc-500 hover:text-white transition-colors uppercase">
            VIEW SITE ↗
          </a>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="font-mono text-[10px] tracking-widest text-red-400/70 hover:text-red-400 transition-colors uppercase"
          >
            RESET DEFAULTS
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 bg-[#0a0a0a] border-r border-white/10 flex flex-col py-8 px-4">
          <div className="font-mono text-[9px] tracking-widest text-zinc-600 uppercase px-3 mb-6">CONTENT MANAGER</div>
          <nav className="flex flex-col gap-1">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3 py-3 text-left transition-colors rounded-sm ${
                  activeTab === tab.id
                    ? "bg-white text-black"
                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className={`font-mono text-[9px] ${activeTab === tab.id ? "text-black/50" : "text-zinc-600"}`}>{tab.index}</span>
                <span className="font-mono text-[10px] tracking-widest uppercase">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-white/10 px-3">
            <div className="font-mono text-[9px] text-zinc-700 uppercase tracking-widest leading-relaxed">
              DATA STORED IN<br />LOCALSTORAGE<br />—<br />BACKUP BEFORE<br />CLEARING BROWSER
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8 md:p-10">
          {activeTab === "projects" && <ProjectsTab key={`projects-${saveCount}`} onSave={handleSave} />}
          {activeTab === "certifications" && <CertificationsTab key={`certs-${saveCount}`} onSave={handleSave} />}
          {activeTab === "innovations" && <InnovationsTab key={`inv-${saveCount}`} onSave={handleSave} />}
          {activeTab === "config" && <SiteConfigTab key={`config-${saveCount}`} onSave={handleSave} />}
        </main>
      </div>

      {/* Reset Confirm Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowResetConfirm(false)} />
          <div className="relative bg-[#111] border border-red-500/20 p-8 max-w-md w-full mx-4">
            <div className="font-mono text-[10px] tracking-widest text-red-400 uppercase mb-4">[ ⚠ RESET ALL DATA ]</div>
            <p className="font-sans text-white mb-2">Reset everything to factory defaults?</p>
            <p className="font-mono text-xs text-zinc-500 mb-8">All custom changes stored in localStorage will be erased. The static source files are not affected.</p>
            <div className="flex gap-4">
              <button onClick={handleReset} className="font-mono text-xs tracking-widest uppercase px-6 py-3 bg-red-500 text-white hover:bg-red-600 transition-colors">
                YES, RESET
              </button>
              <button onClick={() => setShowResetConfirm(false)} className="font-mono text-xs tracking-widest uppercase px-6 py-3 border border-white/20 text-zinc-400 hover:text-white transition-colors">
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
