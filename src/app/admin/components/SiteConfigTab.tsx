"use client";

import { useState, useEffect } from "react";
import { getSiteConfig, saveSiteConfig, type SiteConfigType } from "@/lib/store";
import { FormField, AdminButton } from "./AdminUI";

export default function SiteConfigTab({ onSave }: { onSave: () => void }) {
  const [config, setConfig] = useState<SiteConfigType | null>(null);
  const [toast, setToast] = useState("");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setConfig(getSiteConfig()); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 2500); }

  function update(path: string[], value: string) {
    if (!config) return;
    const updated = JSON.parse(JSON.stringify(config)) as SiteConfigType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let obj: any = updated;
    for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
    obj[path[path.length - 1]] = value;
    setConfig(updated);
    setDirty(true);
  }

  function handleSave() {
    if (!config) return;
    saveSiteConfig(config);
    setDirty(false);
    showToast("SITE CONFIG SAVED");
    onSave();
  }

  if (!config) return <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest py-20 text-center">LOADING...</div>;

  const u = (path: string[]) => (v: string) => update(path, v);

  return (
    <div className="flex flex-col gap-10">
      {toast && <div className="fixed top-6 right-6 z-[70] bg-emerald-500 text-black font-mono text-xs tracking-widest uppercase px-6 py-3">✓ {toast}</div>}

      <div className="flex justify-between items-start">
        <div>
          <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-1">[ 04 / SITE CONFIG ]</div>
          <h2 className="font-display text-2xl font-bold uppercase">Identity &amp; Contact</h2>
        </div>
      </div>

      {/* Identity */}
      <div className="flex flex-col gap-6">
        <div className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase border-b border-white/10 pb-3">IDENTITY</div>
        <FormField label="Full Name" value={config.name} onChange={u(["name"])} placeholder="Ramanarayanan G" />
        <FormField label="Short Name" value={config.shortName} onChange={u(["shortName"])} placeholder="Ramanarayanan" />
        <FormField label="Initials" value={config.initials} onChange={u(["initials"])} placeholder="RG" />
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-6">
        <div className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase border-b border-white/10 pb-3">PROFESSIONAL IDENTITY</div>
        <FormField label="Field / Degree" value={config.identity.field} onChange={u(["identity", "field"])} placeholder="Electronics & Communication Engineering" />
        <FormField label="Primary Tagline" value={config.identity.primary} onChange={u(["identity", "primary"])} placeholder="Engineer / Builder / Innovator" />
        <FormField label="Statement (shown in Hero)" value={config.identity.statement} onChange={u(["identity", "statement"])} placeholder="Curious by default.\nBuilding by choice." multiline rows={3} />
      </div>

      {/* Contact */}
      <div className="flex flex-col gap-6">
        <div className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase border-b border-white/10 pb-3">CONTACT DETAILS</div>
        <FormField label="Email Address" value={config.contact.email} onChange={u(["contact", "email"])} placeholder="hello@example.com" type="email" />
        <FormField label="LinkedIn URL" value={config.contact.linkedin} onChange={u(["contact", "linkedin"])} placeholder="https://linkedin.com/in/..." type="url" />
        <FormField label="GitHub URL" value={config.contact.github} onChange={u(["contact", "github"])} placeholder="https://github.com/..." type="url" />
        <FormField label="Instagram URL" value={config.contact.instagram} onChange={u(["contact", "instagram"])} placeholder="https://instagram.com/..." type="url" />
      </div>

      <div className="pt-4 flex gap-4 border-t border-white/10">
        <AdminButton onClick={handleSave} disabled={!dirty}>SAVE CONFIG</AdminButton>
        {dirty && <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest self-center">UNSAVED CHANGES</span>}
      </div>
    </div>
  );
}
