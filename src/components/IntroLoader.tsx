"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { siteConfig } from "@/data/site";

const STATUS_LINES = [
  { label: "ARCHIVE", dots: "........" },
  { label: "BUILDS", dots: "........." },
  { label: "MILESTONES", dots: "....." },
  { label: "PROFILE", dots: "........." },
];

export default function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerLeftRef = useRef<HTMLDivElement>(null);
  const headerRightRef = useRef<HTMLDivElement>(null);
  const sysLabelRef = useRef<HTMLDivElement>(null);
  const statusLinesRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Guard: only run in the browser
    if (typeof window === "undefined") return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Just show briefly and exit
      const t = setTimeout(() => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete,
        });
      }, 500);
      return () => clearTimeout(t);
    }

    // Prevent scrolling while loader is active
    document.documentElement.style.overflow = "hidden";

    const statusItems = statusLinesRef.current?.querySelectorAll(".status-item") ?? [];

    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        onComplete();
      },
    });

    // Start — all invisible
    gsap.set(
      [headerLeftRef.current, headerRightRef.current, sysLabelRef.current, footerRef.current],
      { opacity: 0, y: 8 }
    );
    gsap.set(identityRef.current, { opacity: 0, y: 30 });
    gsap.set(subtitleRef.current, { opacity: 0 });
    gsap.set(statusItems, { opacity: 0, y: 12 });

    tl
      // 0s — header
      .to([headerLeftRef.current, headerRightRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.05,
      }, 0)
      // 0.25s — sys label
      .to(sysLabelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      }, 0.25)
      // 0.45s — status lines stagger
      .to(statusItems, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power3.out",
        stagger: 0.13,
      }, 0.45)
      // 1.2s — identity reveal
      .to(identityRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power4.out",
      }, 1.2)
      // 1.6s — subtitle + footer
      .to(subtitleRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }, 1.6)
      .to(footerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      }, 1.65)
      // 2.3s — exit: fade and scale out
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.65,
        ease: "power2.inOut",
      }, 2.3);

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-[#080808] flex flex-col pointer-events-auto"
      aria-hidden="true"
    >
      {/* TOP METADATA BAR */}
      <div className="flex justify-between items-start px-6 md:px-10 pt-8 md:pt-10">
        <div ref={headerLeftRef} className="font-mono text-[10px] md:text-xs tracking-widest text-zinc-400 uppercase">
          {siteConfig.initials} / {siteConfig.name}
        </div>
        <div ref={headerRightRef} className="font-mono text-[10px] md:text-xs tracking-widest text-zinc-500 uppercase">
          001 / INITIALIZATION
        </div>
      </div>

      {/* MAIN CENTERED CONTENT */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        
        {/* System label */}
        <div ref={sysLabelRef} className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-zinc-600 uppercase mb-10 border border-zinc-800 px-4 py-2">
          [ SYSTEM INITIALIZATION ]
        </div>

        {/* Status lines */}
        <div ref={statusLinesRef} className="font-mono text-[11px] md:text-xs tracking-widest text-zinc-500 uppercase flex flex-col gap-3 mb-16 items-start">
          {STATUS_LINES.map((line) => (
            <div key={line.label} className="status-item flex items-center gap-3">
              <span className="text-zinc-400 w-28 text-left">{line.label}</span>
              <span className="text-zinc-700 tracking-[0.35em]">{line.dots}</span>
              <span className="text-emerald-400">READY</span>
            </div>
          ))}
        </div>

        {/* Identity reveal — visual climax */}
        <div
          ref={identityRef}
          className="font-display font-black uppercase tracking-tighter leading-[0.85] text-white text-[clamp(2.5rem,9vw,7.5rem)] w-full max-w-5xl"
        >
          {siteConfig.shortName}
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mt-6 font-mono text-[10px] md:text-xs tracking-[0.25em] text-zinc-500 uppercase">
          {siteConfig.identity.primary}
        </div>
      </div>

      {/* FOOTER */}
      <div ref={footerRef} className="flex justify-center items-end px-6 md:px-10 pb-8 md:pb-10">
        <div className="font-mono text-[10px] md:text-xs tracking-widest text-zinc-600 uppercase">
          2026 / ONLINE
        </div>
      </div>
    </div>
  );
}
