"use client";

import React, { useState, useRef } from "react";
import { ProjectSection } from "@/data/projects";
import FadeIn from "./motion/FadeIn";
import { cn } from "@/lib/utils";

interface ProjectAccordionProps {
  sections: ProjectSection[];
}

export default function ProjectAccordion({ sections }: ProjectAccordionProps) {
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSectionId(prev => prev === id ? null : id);
  };

  return (
    <div className="w-full border-t border-white/10 mt-16 md:mt-32">
      {sections.map((section, index) => (
        <AccordionRow 
          key={section.id} 
          section={section} 
          isOpen={openSectionId === section.id}
          onToggle={() => toggleSection(section.id)}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}

function AccordionRow({ 
  section, 
  isOpen, 
  onToggle,
  delay
}: { 
  section: ProjectSection; 
  isOpen: boolean; 
  onToggle: () => void;
  delay: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  return (
    <FadeIn delay={delay} className="border-b border-white/10">
      <button 
        onClick={onToggle}
        className="w-full py-8 md:py-12 flex justify-between items-center group text-left interactive outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-expanded={isOpen}
      >
        <div className="flex gap-8 md:gap-16 items-baseline">
          <span className="font-mono text-sm md:text-base text-zinc-600 w-6 transition-colors group-hover:text-zinc-400">{section.number}</span>
          <h3 className="font-display text-[clamp(1.5rem,3vw,3rem)] tracking-tight uppercase group-hover:translate-x-2 transition-transform duration-500">
            {section.title}
          </h3>
        </div>
        
        <div className="font-mono text-2xl md:text-4xl text-zinc-600 w-8 flex justify-center items-center font-light">
           <span className={cn(
             "transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center",
             isOpen ? "rotate-45 text-white" : "rotate-0 group-hover:text-white"
           )}>
             +
           </span>
        </div>
      </button>

      {/* Expandable Content Area using CSS Grid trick for smooth height animation */}
      <div 
        className={cn(
          "grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div ref={contentRef} className={cn(
            "pb-12 md:pb-20 pt-4 md:pl-8 lg:pl-24 transition-opacity duration-700 delay-100",
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          )}>
            
            {/* Render Body Paragraphs */}
            {section.body && (
              <div className="flex flex-col gap-6 max-w-3xl">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="font-sans text-lg md:text-xl text-zinc-400 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Render Components List */}
            {section.components && (
              <div className="mt-8 max-w-4xl border-t border-white/5">
                {section.components.map((comp, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-white/5 gap-2 sm:gap-10">
                    <span className="font-mono text-sm tracking-widest text-white uppercase">{comp.name}</span>
                    <span className="font-sans text-sm md:text-base text-zinc-500">{comp.role}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Render Testing Table */}
            {section.testing && (
              <div className="mt-8 max-w-4xl border-t border-white/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-white/10 gap-2 sm:gap-10 text-xs font-mono tracking-widest text-zinc-600 uppercase">
                  <span>TEST CONDITION</span>
                  <span>RESULT</span>
                </div>
                {section.testing.map((test, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-white/5 gap-2 sm:gap-10">
                    <span className="font-sans text-base text-zinc-300">{test.condition}</span>
                    <span className="font-mono text-sm tracking-widest text-emerald-400/90">{test.result}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Render Diagram Flow */}
            {section.diagram && section.diagram.type === "flow" && section.diagram.content && (
              <div className="mt-12 flex flex-col items-center justify-center gap-4 border border-white/5 bg-[#0a0a0a] p-10 md:p-20 rounded-sm">
                {section.diagram.content.map((step, i) => (
                  <React.Fragment key={i}>
                    <div className="border border-white/10 bg-[#111] px-6 py-4 font-mono text-xs md:text-sm tracking-widest text-zinc-300 uppercase text-center w-full max-w-sm hover:border-white/30 transition-colors">
                      {step}
                    </div>
                    {i < section.diagram!.content!.length - 1 && (
                      <div className="text-zinc-600 font-mono text-lg">↓</div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Render Image/Architecture Placeholder */}
            {section.diagram && section.diagram.type === "image" && (
              <div className="mt-12 w-full max-w-4xl aspect-video border border-white/5 bg-[#0a0a0a] flex flex-col items-center justify-center gap-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 to-transparent pointer-events-none" />
                <div className="font-mono text-sm tracking-widest text-zinc-600 uppercase">
                  SYS_MEDIA_PENDING
                </div>
                <div className="w-16 h-[1px] bg-zinc-800" />
                <div className="font-mono text-[10px] tracking-widest text-zinc-700 uppercase">
                  AWAITING ENGINEERING ASSETS
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </FadeIn>
  );
}
