"use client";

import Image from "next/image";
import Link from "next/link";
import TextReveal from "@/components/motion/TextReveal";
import SplitText from "@/components/motion/SplitText";
import FadeIn from "@/components/motion/FadeIn";
import ParallaxImage from "@/components/motion/ParallaxImage";
import MagneticLink from "@/components/motion/MagneticLink";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[var(--background)]">
      
      {/* 
        ========================================
        HERO SECTION
        ========================================
      */}
      <section className="relative min-h-[100svh] w-full flex flex-col justify-between pt-32 pb-10 px-6 md:px-10 overflow-hidden">
        
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
             style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            <h1 className="font-display text-4xl md:text-7xl lg:text-[7rem] leading-[0.85] font-black tracking-tighter uppercase">
              <TextReveal delay={0.1}>Ramanarayanan</TextReveal>
            </h1>
            
            <FadeIn delay={0.3} className="max-w-md font-sans text-sm md:text-base text-[var(--muted)] leading-relaxed mt-4 uppercase tracking-widest">
              Electronics & Communication Engineering <br/>
              Engineer / Builder / Innovator
            </FadeIn>
          </div>

          {/* Profile Image (Asymmetrical placement) */}
          <div className="w-full md:w-5/12 h-[50vh] md:h-[70vh] relative group interactive" data-cursor-text="EXPLORE">
            <Link href="/about" className="block w-full h-full">
              <ParallaxImage 
                src="/profile.png" 
                alt="Ramanarayanan - Profile" 
                speed={0.15}
                className="rounded-sm"
                imageClassName="group-hover:scale-[1.25] transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
              />
              {/* Engineering Metadata */}
              <div className="absolute -bottom-6 -left-6 font-mono text-[10px] text-[var(--muted)] rotate-[-90deg] origin-top-left tracking-widest uppercase">
                IMG_01 / SYS.ACT
              </div>
            </Link>
          </div>
        </div>

        <FadeIn delay={0.6} className="relative z-10 flex justify-between items-end mt-20 w-full border-t border-[var(--foreground)]/10 pt-6">
          <MagneticLink>
            <Link href="/about" className="font-mono text-sm tracking-widest uppercase hover:text-[var(--accent)] transition-colors interactive">
              ABOUT ME &rarr;
            </Link>
          </MagneticLink>
          
          <div className="font-mono text-xs text-[var(--muted)] flex gap-4">
            <span>SCROLL</span>
            <span className="animate-bounce">&darr;</span>
          </div>
        </FadeIn>
      </section>

      {/* 
        ========================================
        ABOUT PREVIEW
        ========================================
      */}
      <section className="relative min-h-[100svh] w-full py-20 px-6 md:px-10 border-t border-[var(--foreground)]/10 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 justify-between items-start">
          <FadeIn className="font-mono text-xs tracking-widest text-[var(--muted)] w-full md:w-1/4">
            [ 01 / IDENTITY ]
          </FadeIn>
          <div className="w-full md:w-3/4">
            <h2 className="font-display text-3xl md:text-5xl lg:text-7xl leading-tight font-medium tracking-tight">
              <SplitText text="I am a builder focused on bridging hardware engineering with digital product development." />
            </h2>
            <div className="mt-16">
              <MagneticLink>
                <Link href="/about" className="group font-sans text-lg md:text-xl border-b border-[var(--foreground)] pb-1 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors interactive">
                  Read Full Story <span className="inline-block transition-transform group-hover:translate-x-2">&rarr;</span>
                </Link>
              </MagneticLink>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        WORK PREVIEW
        ========================================
      */}
      <section className="relative min-h-[100svh] w-full py-20 px-6 md:px-10 bg-[#09090B] text-[#FAFAFA] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <FadeIn className="font-mono text-xs tracking-widest text-zinc-500 mb-20">
            [ 02 / FEATURED BUILDS ]
          </FadeIn>

          <div className="flex flex-col gap-0 border-t border-zinc-800">
            {/* Project 1 */}
            <Link href="/work/gas-leak-protection-system" className="group interactive" data-cursor-text="VIEW">
              <div className="py-10 md:py-16 border-b border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
                <div className="relative z-10 font-mono text-sm md:text-base text-zinc-500 group-hover:text-zinc-400 transition-colors">01</div>
                <h3 className="relative z-10 font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter w-full md:w-1/2 group-hover:-translate-y-2 transition-transform duration-500">
                  Gas Leak<br/>Protection System
                </h3>
                <div className="relative z-10 font-sans text-sm md:text-base text-zinc-400 w-full md:w-1/4 group-hover:text-zinc-200 transition-colors">
                  Embedded Systems / IoT / Product Development
                </div>
              </div>
            </Link>

            {/* Project 2 Placeholder */}
            <Link href="/work/project-two" className="group interactive" data-cursor-text="VIEW">
              <div className="py-10 md:py-16 border-b border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
                <div className="relative z-10 font-mono text-sm md:text-base text-zinc-500 group-hover:text-zinc-400 transition-colors">02</div>
                <h3 className="relative z-10 font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter w-full md:w-1/2 group-hover:-translate-y-2 transition-transform duration-500">
                  Autonomous<br/>Navigation Bot
                </h3>
                <div className="relative z-10 font-sans text-sm md:text-base text-zinc-400 w-full md:w-1/4 group-hover:text-zinc-200 transition-colors">
                  Robotics / C++ / Hardware
                </div>
              </div>
            </Link>
          </div>

          <FadeIn className="mt-20 flex justify-end">
            <MagneticLink>
              <Link href="/work" className="group font-sans text-lg md:text-xl hover:text-[var(--accent)] transition-colors interactive">
                View All Work <span className="inline-block transition-transform group-hover:translate-x-2">&rarr;</span>
              </Link>
            </MagneticLink>
          </FadeIn>
        </div>
      </section>

      {/* 
        ========================================
        SKILLS
        ========================================
      */}
      <section className="relative min-h-[100svh] w-full py-20 px-6 md:px-10 overflow-hidden flex flex-col justify-center">
        <div className="max-w-7xl mx-auto flex flex-col gap-40 w-full">
          
          <div className="w-full">
            <FadeIn className="font-mono text-xs tracking-widest text-[var(--muted)] mb-10">
              [ 03 / CAPABILITIES ]
            </FadeIn>
            <div className="flex flex-col font-display text-4xl md:text-7xl lg:text-[6.5rem] leading-[0.95] font-black uppercase tracking-tighter text-[var(--foreground)]/10">
              <Link href="/skills#embedded-systems" className="block w-fit hover:text-[var(--foreground)] transition-colors duration-500 interactive" data-cursor-text="VIEW">EMBEDDED SYSTEMS</Link>
              <Link href="/skills#iot" className="block w-fit hover:text-[var(--foreground)] transition-colors duration-500 ml-0 md:ml-12 interactive" data-cursor-text="VIEW">IOT ARCHITECTURE</Link>
              <Link href="/skills#hardware" className="block w-fit hover:text-[var(--foreground)] transition-colors duration-500 interactive" data-cursor-text="VIEW">HARDWARE DESIGN</Link>
              <Link href="/skills#software" className="block w-fit hover:text-[var(--foreground)] transition-colors duration-500 ml-0 md:ml-24 interactive" data-cursor-text="VIEW">SOFTWARE DEV</Link>
              <Link href="/skills#web" className="block w-fit hover:text-[var(--foreground)] transition-colors duration-500 interactive" data-cursor-text="VIEW">WEB TECHNOLOGIES</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        RESUME & INNOVATIONS
        ========================================
      */}
      <section className="relative min-h-[100svh] w-full py-20 px-6 md:px-10 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="w-full flex flex-col md:flex-row justify-between items-start gap-10 border-t border-[var(--foreground)]/10 pt-20">
            <div className="w-full md:w-3/5">
              <FadeIn className="font-mono text-xs tracking-widest text-[var(--muted)] mb-10">
                [ 04 / RESUME & INNOVATION ]
              </FadeIn>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="group inline-block interactive" data-cursor-text="READ RESUME">
                <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight leading-tight group-hover:text-[var(--accent)] transition-colors">
                  Pushing boundaries in <br/>
                  <span className="italic">applied electronics.</span>
                </h2>
                <div className="mt-6 flex items-center gap-4 text-sm font-mono tracking-widest text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                  DOWNLOAD CV <span className="animate-pulse">↓</span>
                </div>
              </a>
            </div>
            
            <div className="w-full md:w-2/5 md:text-right mt-10 md:mt-0">
              <FadeIn delay={0.2} className="flex flex-col gap-6 md:items-end">
                <p className="font-sans text-[var(--muted)] max-w-sm">
                  Exploring new frontiers in patent-pending hardware systems and technological innovations.
                </p>
                <MagneticLink>
                  <Link href="/innovations" className="group font-sans text-lg md:text-xl border-b border-[var(--foreground)] pb-1 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors interactive">
                    Explore Patents <span className="inline-block transition-transform group-hover:translate-x-2">&rarr;</span>
                  </Link>
                </MagneticLink>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        CONTACT
        ========================================
      */}
      <Link href="/contact" className="block w-full min-h-[100svh] interactive group" data-cursor-text="CONTACT ME">
        <section className="relative w-full min-h-[100svh] flex flex-col justify-center items-center py-20 px-6 md:px-10 bg-[var(--foreground)] text-[var(--background)] transition-colors duration-700 group-hover:bg-[var(--accent)]">
          <FadeIn className="font-mono text-xs tracking-widest text-white/50 mb-10 text-center">
            [ 05 / INITIATE ]
          </FadeIn>
          <h2 className="font-display text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter text-center leading-[0.85] text-white">
            <TextReveal>Have an</TextReveal><br/>
            <TextReveal delay={0.1}>Idea?</TextReveal>
          </h2>
          
          <FadeIn delay={0.3} className="mt-10 font-sans text-xl md:text-2xl text-white/70 text-center">
            Let&apos;s build it.
          </FadeIn>
        </section>
      </Link>

    </main>
  );
}
