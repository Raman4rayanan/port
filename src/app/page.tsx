"use client";

import Link from "next/link";
import TextReveal from "@/components/motion/TextReveal";
import SplitText from "@/components/motion/SplitText";
import FadeIn from "@/components/motion/FadeIn";
import ParallaxImage from "@/components/motion/ParallaxImage";
import MagneticLink from "@/components/motion/MagneticLink";
import { siteConfig } from "@/data/site";
import { featuredProjects } from "@/data/projects";
import { capabilities } from "@/data/skills";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[var(--background)]">
      
      {/* 
        ========================================
        HERO SECTION
        ========================================
      */}
      <section className="relative min-h-[100svh] w-full flex flex-col justify-between pt-32 pb-10 px-6 md:px-10 overflow-hidden">
        
        {/* Background Layer (~0.15 relative depth via CSS parallax or fixed bg if needed, here we keep it subtle) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
             style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />

        {/* Decorative Grid Elements (~1.10 relative depth) */}
        <div className="absolute top-1/4 right-1/4 w-[1px] h-32 bg-[var(--foreground)]/10 z-0 hidden md:block" />
        <div className="absolute bottom-1/3 left-1/4 w-32 h-[1px] bg-[var(--foreground)]/10 z-0 hidden md:block" />

        <div className="relative z-10 w-full h-full flex flex-col md:flex-row justify-between items-start md:items-end gap-10 flex-1">
          
          {/* Typography Layer (~0.90 depth) */}
          <div className="flex flex-col gap-4 w-full md:w-1/2 z-20">
            <h1 className="font-display text-[clamp(3.5rem,8vw,9rem)] leading-[0.85] font-black tracking-tighter uppercase">
              <TextReveal delay={0.1}>{siteConfig.shortName}</TextReveal>
              <br/>
              <TextReveal delay={0.2}>{siteConfig.initials}</TextReveal>
            </h1>
            
            <FadeIn delay={0.3} className="max-w-md font-sans text-sm md:text-base text-[var(--muted)] leading-relaxed mt-4 uppercase tracking-widest">
              {siteConfig.identity.field} <br/>
              {siteConfig.identity.primary}
            </FadeIn>

            <FadeIn delay={0.4} className="mt-8 font-serif text-[clamp(1.2rem,2.5vw,2rem)] italic text-[var(--foreground)]/80">
              &quot;{siteConfig.identity.statement}&quot;
            </FadeIn>
          </div>

          {/* Profile Image Layer (~0.65 depth) */}
          <div className="w-full md:w-5/12 h-[50vh] md:h-[65vh] relative group interactive z-10 mt-10 md:mt-0" data-cursor-text="EXPLORE">
            <Link href="/about" className="block w-full h-full relative">
              <ParallaxImage 
                src="/profile.png" 
                alt={`${siteConfig.name} - Profile`} 
                speed={0.15}
                className="rounded-sm"
                imageClassName="group-hover:scale-[1.05] transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
              />
              
              {/* Metadata Layer (~0.35 depth) */}
              <div className="absolute -bottom-6 -left-6 font-mono text-[10px] text-[var(--muted)] rotate-[-90deg] origin-top-left tracking-widest uppercase bg-[var(--background)] px-2">
                IMG_01 / SYS.ACTIVE
              </div>
            </Link>
          </div>
        </div>

        <FadeIn delay={0.6} className="relative z-30 flex justify-between items-end mt-16 w-full border-t border-[var(--foreground)]/10 pt-6">
          <MagneticLink>
            <Link href="/about" className="font-mono text-xs md:text-sm tracking-widest uppercase hover:text-[var(--accent)] transition-colors interactive">
              ABOUT ME &rarr;
            </Link>
          </MagneticLink>
          
          <div className="font-mono text-[10px] md:text-xs text-[var(--muted)] flex gap-4 uppercase tracking-widest">
            <span className="hidden md:inline">{siteConfig.identity.tags.join(" / ")}</span>
            <span className="animate-bounce md:ml-4">&darr;</span>
          </div>
        </FadeIn>
      </section>
      
      {/* 
        ========================================
        IDENTITY SECTION
        ========================================
      */}
      <section className="relative min-h-screen w-full py-20 px-6 md:px-10 border-t border-[var(--foreground)]/10 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 justify-between items-start w-full">
          <FadeIn className="font-mono text-xs tracking-widest text-[var(--muted)] w-full md:w-1/4 uppercase">
            [ 01 / IDENTITY ]
          </FadeIn>
          <div className="w-full md:w-3/4">
            <h2 className="font-display text-[clamp(2rem,5vw,5rem)] leading-[1.1] font-medium tracking-tight">
              <SplitText text="I BUILD THINGS THAT TURN IDEAS INTO WORKING SYSTEMS." />
            </h2>
            <div className="mt-16 flex flex-col gap-6 max-w-2xl font-sans text-lg md:text-xl text-[var(--muted)]">
              <FadeIn delay={0.2}>
                I’m Ramanarayanan G, an Electronics & Communication Engineering student interested in the space where hardware, software and ideas become real products.
              </FadeIn>
              <FadeIn delay={0.3}>
                I enjoy taking an idea from a rough concept, breaking the problem down, experimenting with different approaches and gradually turning it into something that actually works.
              </FadeIn>
              <FadeIn delay={0.4}>
                My work sits across embedded systems, IoT, electronics, software, robotics and product development.
              </FadeIn>
            </div>
            <div className="mt-16">
              <MagneticLink>
                <Link href="/about" className="group font-sans text-lg md:text-xl border-b border-[var(--foreground)] pb-1 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors interactive" data-cursor-text="READ">
                  READ FULL STORY <span className="inline-block transition-transform group-hover:translate-x-2">&rarr;</span>
                </Link>
              </MagneticLink>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        FEATURED BUILDS
        ========================================
      */}
      <section className="relative min-h-screen w-full py-20 px-6 md:px-10 bg-[#09090B] text-[#FAFAFA] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <FadeIn className="font-mono text-xs tracking-widest text-zinc-500 mb-20 uppercase">
            [ 02 / FEATURED BUILDS ]
          </FadeIn>
          <h2 className="font-display text-[clamp(2.5rem,6vw,6rem)] font-black uppercase tracking-tighter mb-20 text-zinc-800">
            SELECTED BUILDS
          </h2>

          <div className="flex flex-col gap-0 border-t border-zinc-800">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="py-16 md:py-24 border-b border-zinc-800 flex flex-col md:flex-row justify-between items-start gap-10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
                
                <div className="relative z-10 font-mono text-sm text-zinc-500 w-full md:w-auto">
                  0{index + 1}
                </div>
                
                <div className="relative z-10 flex flex-col gap-6 w-full md:w-1/2">
                  <h3 className="font-display text-[clamp(2rem,4vw,4rem)] font-bold uppercase tracking-tighter leading-none">
                    {project.title.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
                  </h3>
                  <p className="font-mono text-xs text-zinc-400 tracking-widest uppercase">
                    {project.category}
                  </p>
                  <p className="font-sans text-sm md:text-base text-zinc-400 max-w-md">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map(tech => (
                      <span key={tech} className="font-mono text-[10px] px-3 py-1 border border-zinc-800 rounded-sm text-zinc-500">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 w-full md:w-1/4 flex justify-end md:items-end h-full mt-10 md:mt-0">
                  <MagneticLink>
                    <Link href={`/work/${project.id}`} className="font-mono text-sm uppercase tracking-widest text-zinc-400 hover:text-white transition-colors interactive" data-cursor-text="VIEW PROJECT">
                      EXPLORE PROJECT &rarr;
                    </Link>
                  </MagneticLink>
                </div>
              </div>
            ))}

            {/* ARCHIVE IN PROGRESS */}
            <div className="py-16 md:py-24 border-b border-zinc-800 flex flex-col md:flex-row justify-between items-start gap-10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-zinc-900/50 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
                
                <div className="relative z-10 font-mono text-sm text-zinc-600 w-full md:w-auto">
                  03 / EXPERIMENTS
                </div>
                
                <div className="relative z-10 flex flex-col gap-6 w-full md:w-1/2">
                  <p className="font-sans text-xl text-zinc-500 italic max-w-md">
                    A growing archive of smaller electronics experiments, prototypes and technical explorations.
                  </p>
                </div>

                <div className="relative z-10 w-full md:w-1/4 flex justify-end md:items-end h-full mt-10 md:mt-0">
                  <MagneticLink>
                    <Link href="/work" className="font-mono text-sm uppercase tracking-widest text-zinc-500 hover:text-white transition-colors interactive">
                      ARCHIVE IN PROGRESS &rarr;
                    </Link>
                  </MagneticLink>
                </div>
              </div>
          </div>

          <FadeIn className="mt-20 flex justify-end">
            <MagneticLink>
              <Link href="/work" className="group font-sans text-lg md:text-xl hover:text-[var(--accent)] transition-colors interactive">
                VIEW ALL WORK <span className="inline-block transition-transform group-hover:translate-x-2">&rarr;</span>
              </Link>
            </MagneticLink>
          </FadeIn>
        </div>
      </section>

      {/* 
        ========================================
        CURRENTLY BUILDING
        ========================================
      */}
      <section className="relative w-full py-32 px-6 md:px-10 border-t border-[var(--foreground)]/10 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between gap-10">
          <div className="w-full md:w-1/3">
            <FadeIn className="font-mono text-xs tracking-widest text-[var(--muted)] mb-10 uppercase">
              [ CURRENTLY / BUILDING ]
            </FadeIn>
            <div className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest flex flex-col gap-3">
              <span className="flex items-center gap-3 text-green-600/80"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> STATUS / ACTIVE</span>
              <span>MODE / EXPERIMENTAL</span>
              <span>FOCUS / HARDWARE + SOFTWARE</span>
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="font-display text-[clamp(2rem,4vw,4rem)] font-medium tracking-tight mb-8">
              WHAT I&apos;M BUILDING NOW
            </h2>
            <div className="font-sans text-lg md:text-xl text-[var(--muted)] max-w-2xl flex flex-col gap-6">
              <p>
                I’m currently exploring ideas around intelligent hardware systems, embedded automation, connected devices and practical product development.
              </p>
              <p className="font-mono text-sm uppercase tracking-widest text-[var(--foreground)]">
                The goal is simple:<br/><br/>
                Build. Test. Break. Improve. Repeat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        CAPABILITIES
        ========================================
      */}
      <section className="relative min-h-screen w-full py-20 px-6 md:px-10 overflow-hidden flex flex-col justify-center border-t border-[var(--foreground)]/10 bg-[#040405] text-[#FAFAFA]">
        <div className="max-w-7xl mx-auto flex flex-col gap-20 w-full">
          
          <div className="w-full">
            <FadeIn className="font-mono text-xs tracking-widest text-zinc-500 mb-10 uppercase">
              [ 03 / CAPABILITIES ]
            </FadeIn>
            <h2 className="font-sans text-sm md:text-base text-zinc-400 tracking-widest uppercase mb-16">
              WHAT I WORK WITH
            </h2>
            
            <div className="flex flex-col font-display text-[clamp(2rem,5.5vw,6.5rem)] leading-[0.95] font-black uppercase tracking-tighter text-zinc-800">
              {capabilities.map((cap, i) => (
                <Link key={cap.id} href={`/skills#${cap.id}`} className="block w-fit hover:text-white transition-colors duration-500 interactive" data-cursor-text="VIEW" style={{ marginLeft: `${(i % 3) * 5}vw` }}>
                  {cap.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        INNOVATIONS
        ========================================
      */}
      <section className="relative min-h-screen w-full py-20 px-6 md:px-10 flex flex-col justify-center border-t border-[var(--foreground)]/10 overflow-hidden">
        {/* Subtle schematic grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0" 
             style={{ backgroundImage: 'linear-gradient(to right, #000 2px, transparent 2px), linear-gradient(to bottom, #000 2px, transparent 2px)', backgroundSize: '100px 100px' }} 
        />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="w-full flex flex-col md:flex-row justify-between items-start gap-10">
            <div className="w-full md:w-3/5">
              <FadeIn className="font-mono text-xs tracking-widest text-[var(--muted)] mb-10 uppercase">
                [ 04 / INNOVATION ]
              </FadeIn>
              <h2 className="font-display text-[clamp(3rem,6vw,6rem)] font-medium tracking-tight leading-tight">
                BUILDING BEYOND <br/>
                <span className="italic text-[var(--muted)]">THE OBVIOUS.</span>
              </h2>
            </div>
            
            <div className="w-full md:w-2/5 mt-10 md:mt-0 flex flex-col gap-6">
              <FadeIn delay={0.2}>
                <p className="font-sans text-[var(--muted)] text-lg">
                  I’m interested in engineering ideas that solve practical problems rather than existing only as demonstrations.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="font-sans text-[var(--muted)] text-lg">
                  My innovation work focuses on turning engineering concepts into functional systems through prototyping, testing and iteration.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--foreground)] border-l-2 border-[var(--accent)] pl-4 py-2 mt-4">
                  PATENT / RESEARCH / PRODUCT DEVELOPMENT
                </p>
              </FadeIn>
              <FadeIn delay={0.5} className="mt-8">
                <MagneticLink>
                  <Link href="/innovations" className="group font-sans text-lg md:text-xl border-b border-[var(--foreground)] pb-1 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors interactive">
                    EXPLORE INNOVATIONS <span className="inline-block transition-transform group-hover:translate-x-2">&rarr;</span>
                  </Link>
                </MagneticLink>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        ABOUT / ARCHIVE
        ========================================
      */}
      <section className="relative min-h-screen w-full py-20 px-6 md:px-10 flex flex-col justify-center border-t border-[var(--foreground)]/10">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/3">
            <FadeIn className="font-mono text-xs tracking-widest text-[var(--muted)] mb-10 uppercase">
              [ 05 / ARCHIVE ]
            </FadeIn>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-medium tracking-tight leading-[1.1] mb-10">
              <SplitText text="ENGINEERING IS A CONTINUOUS EXPERIMENT." />
            </h2>
            <div className="font-sans text-lg md:text-xl text-[var(--muted)] max-w-2xl flex flex-col gap-6 mb-16">
              <FadeIn delay={0.2}>
                Every project is an opportunity to understand something I didn&apos;t know before.
              </FadeIn>
              <FadeIn delay={0.3}>
                From electronics and embedded systems to software and product development, I’m constantly experimenting with how different technologies can work together.
              </FadeIn>
            </div>
            
            <FadeIn delay={0.4} className="flex flex-col md:flex-row gap-8 font-mono text-sm tracking-widest uppercase">
              <Link href="/about" className="hover:text-[var(--accent)] transition-colors interactive">ABOUT ME &rarr;</Link>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors interactive" data-cursor-text="OPEN">RESUME &darr;</a>
              <Link href="/innovations" className="hover:text-[var(--accent)] transition-colors interactive">INNOVATIONS &rarr;</Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        CONTACT
        ========================================
      */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center py-20 px-6 md:px-10 bg-[var(--foreground)] text-[var(--background)] transition-colors duration-700">
        <FadeIn className="font-mono text-xs tracking-widest text-white/50 mb-10 text-center uppercase">
          [ 06 / INITIATE ]
        </FadeIn>
        <h2 className="font-display text-[clamp(4rem,10vw,12rem)] font-black uppercase tracking-tighter text-center leading-[0.85] text-white w-full max-w-6xl">
          <TextReveal>HAVE AN IDEA?</TextReveal><br/>
          <TextReveal delay={0.1}>LET&apos;S BUILD IT.</TextReveal>
        </h2>
        
        <FadeIn delay={0.3} className="mt-16 font-sans text-xl md:text-2xl text-white/70 text-center max-w-xl">
          Have a project, technical idea, collaboration or problem worth exploring? Let&apos;s talk.
        </FadeIn>

        <FadeIn delay={0.4} className="mt-16 flex flex-col items-center gap-8">
          <MagneticLink>
            <Link href="/contact" className="group px-8 py-4 bg-[var(--background)] text-[var(--foreground)] font-mono text-sm uppercase tracking-widest hover:bg-[var(--accent)] hover:text-white transition-colors interactive" data-cursor-text="ENTER">
              GET IN TOUCH &rarr;
            </Link>
          </MagneticLink>

          <div className="flex flex-wrap justify-center gap-8 font-mono text-xs tracking-widest text-white/50 uppercase mt-10">
            {siteConfig.contact.linkedin && (
              <a href={siteConfig.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors interactive">LINKEDIN &nearr;</a>
            )}
            {siteConfig.contact.github && (
              <a href={siteConfig.contact.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors interactive">GITHUB &nearr;</a>
            )}
            {siteConfig.contact.email && (
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors interactive">EMAIL &nearr;</a>
            )}
          </div>
        </FadeIn>
      </section>

    </main>
  );
}
