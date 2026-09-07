"use client";

import { useState, useEffect } from "react";
import { getCertifications, saveCertifications, slugify } from "@/lib/store";
import { type Certification } from "@/data/milestones";
import SlideOver from "./SlideOver";
import { FormField, AdminButton, ConfirmDelete } from "./AdminUI";

const EMPTY: Certification = { id: "", title: "", issuer: "", year: "", description: "", image: "", credentialUrl: "", tags: [] };

export default function CertificationsTab({ onSave }: { onSave: () => void }) {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Certification | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Certification | null>(null);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ ...EMPTY, tagsStr: "" });

  useEffect(() => { setCerts(getCertifications()); }, []); // eslint-disable-line react-hooks/set-state-in-effect

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 2500); }

  function openAdd() {
    setEditing(null);
    setForm({ ...EMPTY, tagsStr: "" });
    setDrawerOpen(true);
  }

  function openEdit(c: Certification) {
    setEditing(c);
    setForm({ ...c, description: c.description ?? "", credentialUrl: c.credentialUrl ?? "", tagsStr: (c.tags ?? []).join(", ") });
    setDrawerOpen(true);
  }

  function handleSave() {
    const tags = form.tagsStr.split(",").map(t => t.trim()).filter(Boolean);
    const id = editing?.id || slugify(form.title) || `cert-${Date.now()}`;
    const updated: Certification = { id, title: form.title, issuer: form.issuer, year: form.year, description: form.description, image: form.image, credentialUrl: form.credentialUrl || undefined, tags };
    const newList = editing ? certs.map(c => c.id === editing.id ? updated : c) : [...certs, updated];
    setCerts(newList);
    saveCertifications(newList);
    setDrawerOpen(false);
    showToast(editing ? "CERTIFICATION UPDATED" : "CERTIFICATION ADDED");
    onSave();
  }

  function handleDelete() {
    if (!deleteTarget) return;
    const newList = certs.filter(c => c.id !== deleteTarget.id);
    setCerts(newList);
    saveCertifications(newList);
    setDeleteTarget(null);
    showToast("CERTIFICATION DELETED");
    onSave();
  }

  const f = (key: keyof typeof form) => (v: string) => setForm(prev => ({ ...prev, [key]: v }));

  return (
    <div className="flex flex-col h-full">
      {toast && <div className="fixed top-6 right-6 z-[70] bg-emerald-500 text-black font-mono text-xs tracking-widest uppercase px-6 py-3">✓ {toast}</div>}

      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-1">[ 02 / CERTIFICATIONS ]</div>
          <h2 className="font-display text-2xl font-bold uppercase">{certs.length} CERTIFICATION{certs.length !== 1 ? "S" : ""}</h2>
        </div>
        <AdminButton onClick={openAdd}>+ ADD CERTIFICATION</AdminButton>
      </div>

      <div className="flex flex-col border-t border-white/10 flex-1 overflow-y-auto">
        {certs.map((c, i) => (
          <div key={c.id} className="flex justify-between items-center py-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-6 min-w-0">
              <span className="font-mono text-xs text-zinc-600 shrink-0">0{i + 1}</span>
              <div className="min-w-0">
                <div className="font-sans text-base font-semibold truncate">{c.title}</div>
                <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase flex gap-4 mt-1">
                  <span>{c.issuer}</span>
                  <span className="text-zinc-700">&bull;</span>
                  <span>{c.year}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <AdminButton variant="ghost" onClick={() => openEdit(c)}>EDIT</AdminButton>
              <AdminButton variant="danger" onClick={() => setDeleteTarget(c)}>DEL</AdminButton>
            </div>
          </div>
        ))}
        {certs.length === 0 && <div className="py-20 text-center font-mono text-xs text-zinc-600 uppercase tracking-widest">NO CERTIFICATIONS</div>}
      </div>

      <SlideOver isOpen={drawerOpen} title={editing ? "EDIT CERTIFICATION" : "ADD CERTIFICATION"} onClose={() => setDrawerOpen(false)}>
        <div className="flex flex-col gap-8">
          <FormField label="Title" value={form.title} onChange={f("title")} placeholder="Embedded Systems Fundamentals" />
          <FormField label="Issuer / Institution" value={form.issuer} onChange={f("issuer")} placeholder="Technical Learning Institute" />
          <FormField label="Year" value={form.year} onChange={f("year")} placeholder="2026" />
          <FormField label="Description" value={form.description || ""} onChange={f("description")} multiline rows={3} placeholder="What this certification covers..." />
          <FormField label="Certificate Image Path" value={form.image} onChange={f("image")} placeholder="/certificates/cert-01.jpg" hint="Place images in /public/certificates/" />
          <FormField label="Credential URL (optional)" value={form.credentialUrl || ""} onChange={f("credentialUrl")} placeholder="https://verify.example.com/..." type="url" />
          <FormField label="Tags (comma-separated)" value={form.tagsStr} onChange={f("tagsStr")} placeholder="C, Microcontrollers, RTOS" />

          <div className="pt-4 flex gap-4 border-t border-white/10">
            <AdminButton onClick={handleSave} disabled={!form.title.trim()}>{editing ? "SAVE CHANGES" : "ADD CERTIFICATION"}</AdminButton>
            <AdminButton variant="ghost" onClick={() => setDrawerOpen(false)}>CANCEL</AdminButton>
          </div>
        </div>
      </SlideOver>

      {deleteTarget && <ConfirmDelete itemName={deleteTarget.title} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
    </div>
  );
}
