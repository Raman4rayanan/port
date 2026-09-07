"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/motion/TextReveal";
import FadeIn from "@/components/motion/FadeIn";
import SplitText from "@/components/motion/SplitText";
import MagneticLink from "@/components/motion/MagneticLink";
import {
  aboutIdentity,
  profileRows,
  engineeringProfile,
  currentlyBuilding,
  timeline,
  principles,
  closing
} from "@/data/about";

export default function AboutPage() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeRow, setActiveRow] = useState<string | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Image Parallax (Currently Building)
      const parallaxImgs = gsap.utils.toArray<HTMLElement>('.parallax-img');
      parallaxImgs.forEach(img => {
        const speed = parseFloat(img.getAttribute('data-speed') || '0.1');
        gsap.to(img, {
          y: () => (window.innerHeight * speed),
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });

      // 2. Timeline Nodes Scroll Reveal
      const timelineNodes = gsap.utils.toArray<HTMLElement>('.timeline-node');
      timelineNodes.forEach(node => {
        const dot = node.querySelector('.timeline-dot');

        ScrollTrigger.create({
          trigger: node,
          start: "top 75%",
          onEnter: () => {
            gsap.to(node, { opacity: 1, duration: 0.8, ease: "power2.out" });
            if (dot) gsap.to(dot, { scale: 1, duration: 0.6, ease: "back.out(2)" });
          },
          // Optional: reverse on scroll back up
          onLeaveBack: () => {
            gsap.to(node, { opacity: 0.2, duration: 0.5 });
            if (dot) gsap.to(dot, { scale: 0, duration: 0.5 });
          }
        });
      });

      // 3. Principles Scroll Reveal
      const principleStatements = gsap.utils.toArray<HTMLElement>('.principle-statement');
      principleStatements.forEach(statement => {
        gsap.to(statement, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statement,
            start: "top 80%",
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="w-full relative bg-[var(--background)]">

      {/* 
        ==================================================
        SECTION 01 — IDENTITY
        ==================================================
      */}
      <section className="relative min-h-[100svh] w-full pt-32 pb-20 px-6 md:px-10 flex flex-col justify-center border-b border-[var(--foreground)]/10 overflow-hidden">

        {/* Subtle grid background for the dossier feel */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0"
          style={{ backgroundImage: 'linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)', backgroundSize: '50px 50px' }}
        />

        <FadeIn className="font-mono text-xs tracking-widest text-[var(--muted)] mb-10 md:mb-20 uppercase relative z-10 md:absolute md:top-32 md:left-10">
          [ 01 / ABOUT ]
        </FadeIn>

        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-20 relative z-10">

          {/* Left Column */}
          <div className="w-full lg:w-1/2 flex flex-col gap-10">
            <h1 className="font-display text-[clamp(4.5rem,10vw,12rem)] leading-[0.8] font-black uppercase tracking-tighter">
              <TextReveal delay={0.1}>{aboutIdentity.headline.split(' ')[0]}</TextReveal><br />
              <TextReveal delay={0.2}>{aboutIdentity.headline.split(' ')[1]}</TextReveal>
            </h1>

            <div className="font-mono text-xs md:text-sm text-[var(--foreground)] uppercase tracking-widest leading-loose border-l border-[var(--foreground)]/20 pl-6 py-2 mt-4">
              {aboutIdentity.statement.split('\n').map((line, i) => <div key={i}>{line}</div>)}
            </div>

            <FadeIn delay={0.4} className="font-sans text-lg md:text-xl text-[var(--muted)] max-w-md mt-6">
              {aboutIdentity.description}
            </FadeIn>
          </div>

          {/* Right Column: Rectangular Editorial Frame */}
          <div className="w-full lg:w-5/12 relative aspect-[3/4] group mt-10 lg:mt-0">
            {/* Frame wrapper */}
            <div className="absolute inset-0 border border-[var(--foreground)]/20 p-2 md:p-4 transition-colors duration-700 group-hover:border-[var(--foreground)]/40 z-10 pointer-events-none" />

            {/* Image Container with subtle parallax scale */}
            <div className="relative w-full h-full overflow-hidden z-0">
              {/* Note: We use a standard img tag here instead of next/image for simpler GSAP manipulation if needed later, though standard tailwind transitions work great too. */}
              <img 
                src="/ram_2.png" 
                alt="Ramanarayanan G" 
                className="w-full h-full object-cover object-top transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 filter grayscale-[50%] group-hover:grayscale-0"
              />
            </div>

            {/* Metadata */}
            <div className="absolute -left-12 bottom-12 font-mono text-[9px] text-[var(--muted)] rotate-[-90deg] origin-bottom-left tracking-widest uppercase hidden md:block">
              {aboutIdentity.metadata.id}
            </div>
            <div className="absolute -right-12 top-12 font-mono text-[9px] text-[var(--muted)] rotate-[90deg] origin-top-right tracking-widest uppercase text-right hidden md:block">
              {aboutIdentity.metadata.field} <br />
              {aboutIdentity.metadata.status}
            </div>
          </div>

        </div>
      </section>

      {/* 
        ==================================================
        SECTION 02 — PROFILE
        ==================================================
      */}
      <section className="relative w-full py-32 px-6 md:px-10 border-b border-[var(--foreground)]/10">
        <FadeIn className="font-mono text-xs tracking-widest text-[var(--muted)] mb-20 uppercase max-w-7xl mx-auto w-full block">
          [ 02 / PROFILE ]
        </FadeIn>

        <div className="max-w-7xl mx-auto w-full flex flex-col border-t border-[var(--foreground)]/10">
          {profileRows.map((row) => (
            <div
              key={row.id}
              className="w-full border-b border-[var(--foreground)]/10 overflow-hidden cursor-pointer group interactive"
              data-cursor-text="VIEW"
              onClick={() => setActiveRow(activeRow === row.id ? null : row.id)}
            >
              <div className="py-8 md:py-12 flex items-center justify-between transition-transform duration-500 group-hover:translate-x-4">
                <div className="flex items-center gap-6 md:gap-10">
                  <span className="font-mono text-xs text-[var(--muted)] transition-opacity duration-500 group-hover:opacity-50">
                    {row.id}
                  </span>
                  <h3 className="font-display text-2xl md:text-5xl font-medium tracking-tight uppercase">
                    {row.title}
                  </h3>
                </div>
                <span className="font-mono text-xl md:text-2xl text-[var(--muted)] transition-transform duration-500" style={{ transform: activeRow === row.id ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                  +
                </span>
              </div>

              <AnimatePresence>
                {activeRow === row.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <div className="pb-12 pl-[3.5rem] md:pl-[6.5rem] pr-6 font-sans text-lg md:text-xl text-[var(--muted)] max-w-3xl leading-relaxed flex flex-col gap-1">
                      {row.content.split('\n').map((line, i) => (
                        line === '' 
                          ? <br key={i} />
                          : <span key={i}>{line}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 
        ==================================================
        SECTION 03 — ENGINEERING PROFILE
        ==================================================
      */}
      <section className="relative w-full py-32 px-6 md:px-10 border-b border-[var(--foreground)]/10 bg-[#09090B] text-[#FAFAFA]">
        <FadeIn className="font-mono text-xs tracking-widest text-zinc-500 mb-20 uppercase max-w-7xl mx-auto w-full block">
          [ 03 / ENGINEERING PROFILE ]
        </FadeIn>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
          {engineeringProfile.map((col, idx) => (
            <div key={idx} className="flex flex-col gap-10">
              <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-4">
                {col.category}
              </h4>
              <ul className="flex flex-col gap-6">
                {col.items.map((item, i) => (
                  <li key={i} className="relative group w-fit">
                    <span className="font-display text-2xl md:text-3xl font-medium tracking-tight transition-colors duration-300 group-hover:text-white text-zinc-400">
                      {item.name}
                    </span>

                    {/* Hover annotation absolute positioned */}
                    <div className="absolute left-0 -bottom-6 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 whitespace-nowrap translate-y-2 group-hover:translate-y-0">
                      <span className="font-mono text-[8px] md:text-[9px] bg-white text-[#09090B] px-2 py-1 uppercase tracking-widest">
                        {item.annotation}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 
        ==================================================
        SECTION 04 — CURRENTLY BUILDING
        ==================================================
      */}
      <section className="relative w-full border-b border-[var(--foreground)]/10 overflow-hidden bg-[#0a0a0a]">
        {/* Full-bleed image */}
        <div className="relative w-full aspect-video md:aspect-auto md:h-[85vh] overflow-hidden">
          <img
            src={currentlyBuilding.image}
            alt="Currently Building"
            className="w-full h-full object-cover parallax-img"
            data-speed="0.08"
          />
        </div>

        {/* BOTTOM FEATURE BAR */}
        <div className="flex flex-col md:flex-row items-stretch border-t border-white/10">
          {currentlyBuilding.features.map((feature, i) => (
            <div
              key={i}
              className={`flex-1 flex items-center gap-4 px-6 py-5 ${i < currentlyBuilding.features.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''}`}
            >
              {/* Minimal icon */}
              <div className="text-white/30 flex-shrink-0">
                {feature.icon === 'search' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                )}
                {feature.icon === 'shield' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                )}
                {feature.icon === 'bell' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                )}
                {feature.icon === 'home' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
                )}
              </div>
              <span className="font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase whitespace-pre-line leading-relaxed">
                {feature.label}
              </span>
            </div>
          ))}

        </div>
      </section>

      {/* 
        ==================================================
        SECTION 05 — THE PATH SO FAR
        ==================================================
      */}
      <section className="relative w-full py-32 px-6 md:px-10 border-b border-[var(--foreground)]/10">
        <FadeIn className="font-mono text-xs tracking-widest text-[var(--muted)] mb-32 uppercase max-w-4xl mx-auto w-full block">
          [ 05 / THE PATH SO FAR ]
        </FadeIn>

        <div className="max-w-4xl mx-auto w-full relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-[20%] md:left-[15%] w-[1px] bg-[var(--foreground)]/10 z-0" />

          <div className="flex flex-col gap-24 md:gap-32 relative z-10">
            {timeline.map((node, i) => (
              <div key={i} className="flex items-start gap-8 md:gap-16 timeline-node opacity-20">
                <div className="w-[20%] md:w-[15%] pt-1 text-right">
                  <span className="font-mono text-sm md:text-base tracking-widest font-medium text-[var(--foreground)]">{node.year}</span>
                </div>

                <div className="relative pt-2 w-[80%] md:w-[85%] border-t border-[var(--foreground)]/20">
                  {/* Node marker */}
                  <div className="absolute top-0 left-0 w-2 h-2 bg-[var(--foreground)] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_10px_var(--foreground)] timeline-dot scale-0" />

                  <div className="mt-6 font-sans text-lg md:text-xl text-[var(--muted)] max-w-lg leading-relaxed">
                    {node.event}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ==================================================
        SECTION 06 — PRINCIPLES
        ==================================================
      */}
      <section className="relative w-full py-40 px-6 md:px-10 border-b border-[var(--foreground)]/10 bg-[#09090B] text-[#FAFAFA] overflow-hidden">
        {/* Decorative structural background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{ backgroundImage: 'linear-gradient(to right, #FFF 1px, transparent 1px), linear-gradient(to bottom, #FFF 1px, transparent 1px)', backgroundSize: '20vh 20vh' }}
        />

        <FadeIn className="font-mono text-xs tracking-widest text-zinc-500 mb-32 uppercase text-center relative z-10">
          [ 06 / PRINCIPLES ]
        </FadeIn>

        <div className="max-w-5xl mx-auto w-full flex flex-col gap-40 text-center relative z-10">
          {principles.map((principle, i) => (
            <div key={i} className="principle-statement opacity-0 translate-y-10">
              <h2 className="font-display text-[clamp(2.5rem,8vw,8rem)] font-black uppercase tracking-tighter leading-[0.85] whitespace-pre-line text-white">
                {principle}
              </h2>
            </div>
          ))}
        </div>
      </section>

      {/* 
        ==================================================
        SECTION 07 — CLOSING
        ==================================================
      */}
      <section className="relative w-full min-h-[80svh] flex flex-col justify-center items-center py-20 px-6 md:px-10 bg-[#040405] text-[#FAFAFA] overflow-hidden group">

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="font-display text-[clamp(3.5rem,9vw,12rem)] font-black uppercase tracking-tighter leading-[0.8] mb-10 text-white/10 group-hover:text-white transition-colors duration-1000">
            <SplitText text={closing.mantra} />
          </div>

          <div className="font-sans text-lg md:text-xl text-white/40 max-w-sm whitespace-pre-line mb-20 transition-opacity duration-1000 group-hover:opacity-0">
            {closing.subtext}
          </div>

          <MagneticLink>
            <Link href={closing.linkHref} className="relative z-20 font-mono text-sm uppercase tracking-widest border border-white/20 px-8 py-4 hover:bg-white hover:text-[#040405] transition-colors interactive block" data-cursor-text="ENTER">
              {closing.linkText}
            </Link>
          </MagneticLink>
        </div>

        {/* Background hover preview */}
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-[0.15] transition-opacity duration-[2s] pointer-events-none">
          {/* Using placeholder. Image filter gives it a dark atmospheric look */}
          <img src={closing.previewImage} alt="Work Preview" className="w-full h-full object-cover filter grayscale blur-[2px] scale-110 group-hover:scale-100 transition-transform duration-[5s] ease-out" />
        </div>

      </section>

    </main>
  );
}
