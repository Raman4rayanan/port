"use client";

import { useEffect } from "react";

interface SlideOverProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function SlideOver({ isOpen, title, onClose, children }: SlideOverProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative ml-auto w-full max-w-2xl h-full bg-[#111] border-l border-white/10 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 shrink-0">
          <div className="font-mono text-xs tracking-widest text-zinc-400 uppercase">{title}</div>
          <button onClick={onClose} className="font-mono text-[10px] tracking-widest text-zinc-500 hover:text-white transition-colors uppercase">[ ESC / CLOSE ]</button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
