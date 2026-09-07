"use client";

import { useState, useEffect } from "react";
import { getProjects, saveProjects, slugify } from "@/lib/store";
import { type Project } from "@/data/projects";
import SlideOver from "./SlideOver";
import { FormField, FormSelect, AdminButton, ConfirmDelete } from "./AdminUI";

const EMPTY: Omit<Project, "id" | "sections"> = {
  title: "",
  category: "",
  shortDescription: "",
  technologies: [],
  status: "PROTOTYPE",
  year: new Date().getFullYear().toString(),
  type: "HARDWARE",
  domain: "",
  image: "",
  mobileImage: "",
};

const STATUS_OPTS = ["PROTOTYPE", "TESTING", "ACTIVE", "DEPLOYED", "COMPLETED"];
const TYPE_OPTS = ["HARDWARE", "SOFTWARE", "IOT", "EMBEDDED", "MIXED"];

export default function ProjectsTab({ onSave }: { onSave: () => void }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [toast, setToast] = useState("");

  // Form state
  const [form, setForm] = useState({ ...EMPTY, techStr: "", });

  useEffect(() => { setProjects(getProjects()); }, []); // eslint-disable-line react-hooks/set-state-in-effect

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  function openAdd() {
    setEditing(null);
    setForm({ ...EMPTY, techStr: "" });
    setDrawerOpen(true);
  }

  function openEdit(p: Project) {
    setEditing(p);
    setForm({
      title: p.title,
      category: p.category,
      shortDescription: p.shortDescription,
      technologies: p.technologies,
      status: p.status,
      year: p.year,
      type: p.type,
      domain: p.domain,
      image: p.image ?? "",
      mobileImage: p.mobileImage ?? "",
      techStr: p.technologies.join(", "),
    });
    setDrawerOpen(true);
  }

  function handleSave() {
    const techs = form.techStr.split(",").map(t => t.trim().toUpperCase()).filter(Boolean);
    const id = (editing?.id ?? slugify(form.title)) || `project-${Date.now()}`;
    const updated: Project = {
      id,
      title: form.title.toUpperCase(),
      category: form.category.toUpperCase(),
      shortDescription: form.shortDescription,
      technologies: techs,
      status: form.status,
      year: form.year,
      type: form.type,
      domain: form.domain.toUpperCase(),
      image: form.image || undefined,
      mobileImage: form.mobileImage || undefined,
      sections: editing?.sections ?? [],
    };
    const newList = editing
      ? projects.map(p => p.id === editing.id ? updated : p)
      : [...projects, updated];
    setProjects(newList);
    saveProjects(newList);
    setDrawerOpen(false);
    showToast(editing ? "PROJECT UPDATED" : "PROJECT ADDED");
    onSave();
  }

  function handleDelete() {
    if (!deleteTarget) return;
    const newList = projects.filter(p => p.id !== deleteTarget.id);
    setProjects(newList);
    saveProjects(newList);
    setDeleteTarget(null);
    showToast("PROJECT DELETED");
    onSave();
  }

  const f = (key: keyof typeof form) => (v: string) => setForm(prev => ({ ...prev, [key]: v }));

  return (
    <div className="flex flex-col h-full">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-[70] bg-emerald-500 text-black font-mono text-xs tracking-widest uppercase px-6 py-3">
          ✓ {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-1">[ 01 / PROJECTS ]</div>
          <h2 className="font-display text-2xl font-bold uppercase">{projects.length} PROJECT{projects.length !== 1 ? "S" : ""}</h2>
        </div>
        <AdminButton onClick={openAdd}>+ ADD PROJECT</AdminButton>
      </div>

      {/* List */}
      <div className="flex flex-col border-t border-white/10 flex-1 overflow-y-auto">
        {projects.map((p, i) => (
          <div key={p.id} className="group flex justify-between items-center py-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-6 min-w-0">
              <span className="font-mono text-xs text-zinc-600 shrink-0">0{i + 1}</span>
              <div className="min-w-0">
                <div className="font-display text-lg font-bold uppercase truncate">{p.title}</div>
                <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase flex gap-4 mt-1">
                  <span>{p.status}</span>
                  <span className="text-zinc-700">&bull;</span>
                  <span>{p.year}</span>
                  <span className="text-zinc-700">&bull;</span>
                  <span>{p.type}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <AdminButton variant="ghost" onClick={() => openEdit(p)}>EDIT</AdminButton>
              <AdminButton variant="danger" onClick={() => setDeleteTarget(p)}>DEL</AdminButton>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="py-20 text-center font-mono text-xs text-zinc-600 uppercase tracking-widest">NO PROJECTS — ADD ONE ABOVE</div>
        )}
      </div>

      {/* Drawer */}
      <SlideOver isOpen={drawerOpen} title={editing ? "EDIT PROJECT" : "ADD PROJECT"} onClose={() => setDrawerOpen(false)}>
        <div className="flex flex-col gap-8">
          <FormField label="Title" value={form.title} onChange={f("title")} placeholder="INVISIBLE SECURITY SYSTEM" />
          <FormField label="Category" value={form.category} onChange={f("category")} placeholder="SECURITY / EMBEDDED / ELECTRONICS" />
          <FormField label="Short Description" value={form.shortDescription} onChange={f("shortDescription")} placeholder="One-sentence summary..." multiline rows={3} />
          <FormField label="Technologies (comma-separated)" value={form.techStr} onChange={f("techStr")} placeholder="EMBEDDED, SENSORS, ELECTRONICS" hint="Will be uppercased automatically" />
          <div className="grid grid-cols-2 gap-6">
            <FormSelect label="Status" value={form.status} onChange={f("status")} options={STATUS_OPTS} />
            <FormSelect label="Type" value={form.type} onChange={f("type")} options={TYPE_OPTS} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FormField label="Year" value={form.year} onChange={f("year")} placeholder="2026" />
            <FormField label="Domain" value={form.domain} onChange={f("domain")} placeholder="SECURITY / EMBEDDED" />
          </div>
          <FormField label="Desktop Image Path" value={form.image || ""} onChange={f("image")} placeholder="/my_project_desk.png" hint="Place images in /public/" />
          <FormField label="Mobile Image Path" value={form.mobileImage || ""} onChange={f("mobileImage")} placeholder="/my_project_mobile.png" />

          <div className="pt-4 flex gap-4 border-t border-white/10">
            <AdminButton onClick={handleSave} disabled={!form.title.trim()}>{editing ? "SAVE CHANGES" : "ADD PROJECT"}</AdminButton>
            <AdminButton variant="ghost" onClick={() => setDrawerOpen(false)}>CANCEL</AdminButton>
          </div>
        </div>
      </SlideOver>

      {deleteTarget && (
        <ConfirmDelete itemName={deleteTarget.title} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}
