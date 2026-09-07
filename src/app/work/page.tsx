"use client";

import { useState, useEffect } from "react";
import TextReveal from "@/components/motion/TextReveal";
import FadeIn from "@/components/motion/FadeIn";
import Link from "next/link";
import { type Project } from "@/data/projects";
import { getProjects } from "@/lib/store";

export default function WorkPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => { setProjects(getProjects()); }, []); // eslint-disable-line react-hooks/set-state-in-effect
  return (
    <main className="w-full min-h-screen bg-[#0a0a0a] text-[#FAFAFA] pt-40 pb-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        <FadeIn className="font-mono text-xs tracking-widest text-zinc-500 mb-8 uppercase">
          [ ARCHIVE ]
        </FadeIn>
        
        <h1 className="font-display text-[clamp(4rem,8vw,8rem)] leading-[0.9] font-black uppercase tracking-tighter mb-20">
          <TextReveal>THE BUILDS</TextReveal>
        </h1>
        
        <div className="flex flex-col border-t border-white/10 mt-10">
          {projects.map((project, index) => (
            <FadeIn key={project.id} delay={0.1 + (index * 0.1)}>
              <Link href={`/work/${project.id}`} className="group block interactive w-full" data-cursor-text="VIEW">
                <div className="py-12 border-b border-white/10 flex flex-col justify-center relative">
                  
                  {/* Title & Arrow Row */}
                  <div className="flex justify-between items-center w-full relative z-10">
                    <div className="flex items-center gap-6 md:gap-10">
                      <span className="font-mono text-xs text-zinc-600 hidden md:block">0{index + 1}</span>
                      <h2 className="font-display text-[clamp(2rem,4vw,4rem)] uppercase font-bold text-zinc-400 group-hover:text-white transition-colors duration-500 leading-none">
                        {project.title}
                      </h2>
                    </div>
                    <span className="font-mono text-sm text-zinc-600 group-hover:text-[var(--accent)] group-hover:-rotate-45 transition-all duration-500">&rarr;</span>
                  </div>

                  {/* Hover Technologies Expandable Area */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
                    <div className="overflow-hidden">
                      <div className="flex flex-wrap gap-2 md:gap-3 pt-6 md:pl-16">
                        {project.technologies.map((tech, i) => (
                          <span 
                            key={tech} 
                            className="font-mono text-[9px] md:text-xs text-zinc-400 border border-white/10 px-3 py-1.5 rounded-sm bg-white/5 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                            style={{ transitionDelay: `${i * 50}ms` }}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.status && (
                          <span className="font-mono text-[9px] md:text-xs text-emerald-400 border border-emerald-400/20 px-3 py-1.5 rounded-sm bg-emerald-400/10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2" style={{ transitionDelay: `${project.technologies.length * 50}ms` }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {project.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

      </div>
    </main>
  );
}
