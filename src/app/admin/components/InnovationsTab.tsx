"use client";

import { useState, useEffect } from "react";
import { getInnovations, saveInnovations, slugify } from "@/lib/store";
import { type Innovation } from "@/data/milestones";
import { getProjects } from "@/lib/store";
import SlideOver from "./SlideOver";
import { FormField, FormSelect, AdminButton, ConfirmDelete } from "./AdminUI";

const STATUS_OPTS = ["PROTOTYPE", "TESTING", "ACTIVE", "DEPLOYED", "COMPLETED", "CONCEPT"];

const EMPTY: Innovation = {
  id: "", title: "", description: "", year: new Date().getFullYear().toString(),
  domain: "", status: "PROTOTYPE", projectSlug: "", recognition: "", documentationUrl: "",
};

export default function InnovationsTab({ onSave }: { onSave: () => void }) {
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [slugOptions, setSlugOptions] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Innovation | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Innovation | null>(null);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ ...EMPTY });

  useEffect(() => {
    setInnovations(getInnovations()); // eslint-disable-line react-hooks/set-state-in-effect
    setSlugOptions(getProjects().map(p => p.id));
  }, []);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 2500); }

  function openAdd() { setEditing(null); setForm({ ...EMPTY }); setDrawerOpen(true); }
  function openEdit(inv: Innovation) { setEditing(inv); setForm({ ...inv, recognition: inv.recognition ?? "", documentationUrl: inv.documentationUrl ?? "" }); setDrawerOpen(true); }

  function handleSave() {
    const id = editing?.id || slugify(form.title) || `inv-${Date.now()}`;
    const updated: Innovation = { ...form, id, title: form.title.toUpperCase(), domain: form.domain.toUpperCase(), recognition: form.recognition || undefined, documentationUrl: form.documentationUrl || undefined };
    const newList = editing ? innovations.map(i => i.id === editing.id ? updated : i) : [...innovations, updated];
    setInnovations(newList);
    saveInnovations(newList);
    setDrawerOpen(false);
    showToast(editing ? "INNOVATION UPDATED" : "INNOVATION ADDED");
    onSave();
  }

  function handleDelete() {
    if (!deleteTarget) return;
    const newList = innovations.filter(i => i.id !== deleteTarget.id);
    setInnovations(newList);
    saveInnovations(newList);
    setDeleteTarget(null);
    showToast("INNOVATION DELETED");
    onSave();
  }

  const f = (key: keyof typeof form) => (v: string) => setForm(prev => ({ ...prev, [key]: v }));

  return (
    <div className="flex flex-col h-full">
      {toast && <div className="fixed top-6 right-6 z-[70] bg-emerald-500 text-black font-mono text-xs tracking-widest uppercase px-6 py-3">✓ {toast}</div>}

      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-1">[ 03 / INNOVATIONS ]</div>
          <h2 className="font-display text-2xl font-bold uppercase">{innovations.length} INNOVATION{innovations.length !== 1 ? "S" : ""}</h2>
        </div>
        <AdminButton onClick={openAdd}>+ ADD INNOVATION</AdminButton>
      </div>

      <div className="flex flex-col border-t border-white/10 flex-1 overflow-y-auto">
        {innovations.map((inv, i) => (
          <div key={inv.id} className="flex justify-between items-center py-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-6 min-w-0">
              <span className="font-mono text-xs text-zinc-600 shrink-0">0{i + 1}</span>
              <div className="min-w-0">
                <div className="font-display text-base font-bold uppercase truncate">{inv.title}</div>
                <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase flex gap-4 mt-1">
                  <span>{inv.domain}</span>
                  <span className="text-zinc-700">&bull;</span>
                  <span className={inv.status === "DEPLOYED" ? "text-emerald-400" : "text-zinc-400"}>{inv.status}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <AdminButton variant="ghost" onClick={() => openEdit(inv)}>EDIT</AdminButton>
              <AdminButton variant="danger" onClick={() => setDeleteTarget(inv)}>DEL</AdminButton>
            </div>
          </div>
        ))}
        {innovations.length === 0 && <div className="py-20 text-center font-mono text-xs text-zinc-600 uppercase tracking-widest">NO INNOVATIONS</div>}
      </div>

      <SlideOver isOpen={drawerOpen} title={editing ? "EDIT INNOVATION" : "ADD INNOVATION"} onClose={() => setDrawerOpen(false)}>
        <div className="flex flex-col gap-8">
          <FormField label="Title" value={form.title} onChange={f("title")} placeholder="INVISIBLE SECURITY SYSTEM" />
          <FormField label="Description" value={form.description} onChange={f("description")} multiline rows={4} placeholder="What makes this original and significant..." />
          <div className="grid grid-cols-2 gap-6">
            <FormField label="Year" value={form.year} onChange={f("year")} placeholder="2026" />
            <FormSelect label="Status" value={form.status} onChange={f("status")} options={STATUS_OPTS} />
          </div>
          <FormField label="Domain" value={form.domain} onChange={f("domain")} placeholder="SECURITY / EMBEDDED" />
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">Project Slug (links to work page)</label>
            <select value={form.projectSlug} onChange={e => f("projectSlug")(e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 text-white font-mono text-xs tracking-widest uppercase p-3 outline-none focus:border-white/30 transition-colors">
              <option value="">— NONE —</option>
              {slugOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <FormField label="Recognition / Awards (optional)" value={form.recognition || ""} onChange={f("recognition")} placeholder="Best Engineering Project 2026" />
          <FormField label="Documentation URL (optional)" value={form.documentationUrl || ""} onChange={f("documentationUrl")} placeholder="https://..." type="url" />

          <div className="pt-4 flex gap-4 border-t border-white/10">
            <AdminButton onClick={handleSave} disabled={!form.title.trim()}>{editing ? "SAVE CHANGES" : "ADD INNOVATION"}</AdminButton>
            <AdminButton variant="ghost" onClick={() => setDrawerOpen(false)}>CANCEL</AdminButton>
          </div>
        </div>
      </SlideOver>

      {deleteTarget && <ConfirmDelete itemName={deleteTarget.title} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
    </div>
  );
}
