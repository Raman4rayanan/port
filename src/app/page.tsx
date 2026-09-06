"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import TextReveal from "@/components/motion/TextReveal";
import SplitText from "@/components/motion/SplitText";
import FadeIn from "@/components/motion/FadeIn";
import ParallaxImage from "@/components/motion/ParallaxImage";
import MagneticLink from "@/components/motion/MagneticLink";
import { siteConfig } from "@/data/site";
import { featuredProjects } from "@/data/projects";
import { capabilities } from "@/data/skills";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LivingCircuit from "@/components/motion/LivingCircuit";
import SocialOrbit from "@/components/motion/SocialOrbit";

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>('.parallax-layer');
      
      layers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed') || '0');
        if (speed === 0) return;
        
        gsap.to(layer, {
          y: () => -(window.innerHeight * speed),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <>
      <main ref={containerRef} className="relative z-10 bg-[var(--background)] mb-[100svh] shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
        
        {/* 
          ========================================
          HERO SECTION (STICKY)
          ========================================
        */}
        <div className="sticky top-0 h-[100svh] w-full z-0 overflow-hidden bg-[var(--background)]">
          
          {/* GHOST TYPOGRAPHY LAYER */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden parallax-layer" data-speed="0.05">
            <div className="font-display font-black text-[30vw] leading-none tracking-tighter text-[var(--foreground)] opacity-[0.03] select-none mix-blend-overlay">
              SYSTEM
            </div>
          </div>

          {/* LIVING CIRCUIT LAYER */}
          <div className="absolute inset-0 pointer-events-none z-10 parallax-layer" data-speed="0.15">
            <LivingCircuit />
          </div>

          {/* ABSTRACT HARDWARE / METADATA LAYER (Layer 3) */}
          <div 
            className="absolute inset-0 pointer-events-none z-10 parallax-layer"
            data-speed="0.04"
          >
            {/* Top Left Metadata */}
            <div className="absolute top-[8%] left-[2%] font-mono text-[8px] text-[var(--muted)] tracking-widest uppercase flex gap-2 items-center hidden lg:flex">
              <span className="text-[var(--foreground)]">+ 45.002</span> / Y.AXIS
            </div>

            {/* Top Center: MCU Block */}
            <div className="absolute top-[12%] left-[43%] font-mono text-[8px] text-[var(--muted)] tracking-widest uppercase hidden lg:flex flex-col items-center">
              <span className="text-[var(--foreground)] text-[10px] mb-1">MCU</span>
              <span>ESP32</span>
              <span>SYS/01</span>
            </div>

            {/* Top Right Metadata */}
            <div className="absolute top-[10%] left-[60%] font-mono text-[8px] text-[var(--muted)] tracking-widest uppercase hidden lg:flex flex-col gap-1">
              <div>FIELD / ELECTRONICS</div>
              <div>MODE / BUILD</div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#00FF66] rounded-full" />
                STATE / ACTIVE
              </div>
            </div>

            {/* Far Top Right Signal Block */}
            <div className="absolute top-[15%] right-[5%] font-mono text-[8px] text-[var(--muted)] tracking-widest uppercase hidden lg:flex flex-col gap-1">
              <div>SIGNAL / 03</div>
              <div>FREQ / 1.2 kHz</div>
              <div>MODE / ACTIVE</div>
            </div>

            {/* Center Left Ideas List */}
            <div className="absolute top-[25%] left-[32%] font-mono text-[8px] text-[var(--muted)] opacity-60 tracking-widest uppercase hidden lg:flex flex-col gap-1">
              <div>IDEAS</div>
              <div>CIRCUITS</div>
              <div>CODE</div>
              <div>PROTOTYPES</div>
              <div>REAL-WORLD IMPACT</div>
            </div>

            {/* Center Left Sensor Block */}
            <div className="absolute top-[62%] left-[5%] font-mono text-[8px] text-[var(--muted)] tracking-widest uppercase hidden lg:flex flex-col gap-1">
              <div className="text-[var(--foreground)] mb-2">SENSOR</div>
              <div>MQ-5</div>
              <div>GAS</div>
              <div>TEMP</div>
              <div>ENV</div>
            </div>

            {/* Center Right I/O Block */}
            <div className="absolute top-[30%] right-[5%] font-mono text-[8px] text-[var(--muted)] tracking-widest uppercase hidden lg:flex flex-col gap-1">
              <div className="text-[var(--foreground)] text-[10px] mb-2">I/O</div>
              <div>GPIO / 17</div>
              <div>TX / RX</div>
              <div>ADC / 01</div>
            </div>

            {/* Far Right Vertical Text */}
            <div className="absolute top-[45%] right-[2%] font-mono text-[8px] text-[var(--muted)] tracking-widest uppercase hidden lg:block origin-center rotate-90">
              SYSTEM / ACTIVE / 001
            </div>

            {/* Bottom Right Workflow */}
            <div className="absolute bottom-[15%] right-[5%] font-mono text-[8px] text-[var(--muted)] tracking-widest uppercase hidden lg:flex flex-col gap-1">
              <div>PROTOTYPE</div>
              <div>TEST</div>
              <div>ITERATE</div>
              <div>DEPLOY</div>
            </div>

            {/* Bottom Right Coordinates */}
            <div className="absolute bottom-[5%] right-[15%] font-mono text-[8px] text-[var(--muted)] tracking-widest uppercase hidden lg:flex items-center gap-4">
              <div className="text-[var(--foreground)] opacity-60">+</div>
              <div className="flex flex-col gap-1">
                <div>98.011 / X.AXIS</div>
                <div>-12.442 / Y.AXIS</div>
              </div>
            </div>

            {/* Bottom Left Power Block */}
            <div className="absolute bottom-[5%] left-[5%] font-mono text-[8px] text-[var(--muted)] tracking-widest uppercase hidden lg:flex gap-4">
              <div className="flex flex-col gap-1 items-center justify-center text-[var(--foreground)] opacity-40">
                <div className="w-1 h-1 rounded-full bg-current" />
                <div className="w-1 h-1 rounded-full bg-current" />
                <div className="w-1 h-1 rounded-full bg-current" />
              </div>
              <div className="flex flex-col gap-1">
                <div>NODE / 004</div>
                <div>VCC / 3V3</div>
                <div>GND</div>
              </div>
            </div>
          </div>

          <section className="relative h-full w-full flex flex-col justify-between pt-32 pb-10 px-6 md:px-10">
            
            {/* Vertical Social Orbit — z-50, pointer-events fully enabled */}
            <div className="absolute top-[20%] left-[2%] z-50 hidden lg:block">
              {/* SVG connector trace from social orbit into main circuit */}
              <svg 
                className="absolute -right-8 top-[20px] pointer-events-none" 
                width="40" height="120" 
                overflow="visible"
              >
                <path 
                  d="M 0 0 H 20 V 80 H 40" 
                  stroke="rgba(255,255,255,0.10)" 
                  fill="none" 
                  strokeWidth="1"
                />
                <circle cx="0" cy="0" r="2" fill="rgba(255,255,255,0.2)" />
                <circle cx="40" cy="80" r="2" fill="rgba(255,255,255,0.2)" />
              </svg>
              <SocialOrbit />
            </div>

            {/* VERTICAL SYSTEM LABEL */}
            <div className="absolute top-1/2 right-[4%] md:right-[6%] -translate-y-1/2 flex items-center justify-center z-10 parallax-layer hidden md:flex" data-speed="0.25">
              <div className="font-mono text-[10px] text-[var(--muted)] tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                SYSTEM / ACTIVE / 001
              </div>
            </div>

            <div className="relative z-20 w-full h-full flex flex-col md:flex-row justify-between items-center md:items-end gap-10 flex-1 px-0 md:px-12 lg:px-20 pb-20">
              
              {/* Typography Layer */}
              <div className="flex flex-col gap-6 w-full md:w-1/2 parallax-layer z-30 pb-10 md:pb-24" data-speed="0.4">
                <h1 className="font-display text-[clamp(3.5rem,7.5vw,9rem)] leading-[0.8] font-black tracking-tighter uppercase relative">
                  <TextReveal delay={0.1}>{siteConfig.shortName}</TextReveal>
                </h1>
                
                <FadeIn delay={0.3} className="font-sans text-[10px] md:text-xs text-[var(--muted)] leading-relaxed mt-2 uppercase tracking-[0.2em]">
                  {siteConfig.identity.field} <br/>
                  {siteConfig.identity.primary}
                </FadeIn>

                {/* Motto */}
                <FadeIn delay={0.4} className="mt-8 md:mt-12 font-serif text-[clamp(1.5rem,3vw,2.5rem)] text-[var(--foreground)] max-w-lg leading-[1.3] flex flex-col gap-3 relative z-30">
                  <span className="opacity-50">Curious by default.</span>
                  <span className="opacity-100 font-semibold">Building by choice.</span>
                </FadeIn>
              </div>

              {/* Profile Image Layer (Larger scale, anchors composition) */}
              <div className="w-full md:w-5/12 h-[55vh] md:h-[75vh] relative group interactive parallax-layer z-20" data-cursor-text="EXPLORE" data-speed="0.2">
                <Link href="/about" className="block w-full h-full relative">
                  <ParallaxImage 
                    src="/profile.png" 
                    alt={`${siteConfig.name} - Profile`} 
                    speed={0.1}
                    className="rounded-sm"
                    imageClassName="group-hover:scale-[1.05] transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] scale-[1.12] origin-bottom"
                  />
                  
                  {/* Image Metadata */}
                  <div className="absolute -bottom-8 -left-8 font-mono text-[10px] text-[var(--muted)] rotate-[-90deg] origin-top-left tracking-widest uppercase px-2 bg-[var(--background)]">
                    IMG_01 / SYS.ACTIVE
                  </div>
                </Link>
              </div>
            </div>

            {/* Bottom bar & Scroll indicator */}
            <FadeIn delay={0.6} className="relative z-30 flex justify-between items-end mt-16 w-full pt-6">
              
              {/* Animated Scroll Indicator */}
              <div className="flex flex-col items-center gap-4 parallax-layer" data-speed="0.1">
                <div className="font-mono text-[9px] text-[var(--muted)] uppercase tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  SCROLL TO EXPLORE
                </div>
                <div className="w-[1px] h-12 bg-[var(--foreground)]/10 relative overflow-hidden">
                  <div className="w-full h-full bg-[var(--foreground)] absolute top-0 left-0 animate-[scroll-line_2s_ease-in-out_infinite]" />
                </div>
              </div>
              
            </FadeIn>
          </section>
        </div>

        {/* 
          ========================================
          SOLID CONTENT OVERLAY
          ========================================
        */}
        <div className="relative z-10 bg-[var(--background)]">
          
          {/* IDENTITY SECTION */}
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

          {/* FEATURED BUILDS */}
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

          {/* CURRENTLY BUILDING */}
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

          {/* CAPABILITIES */}
          <section className="relative min-h-[50svh] w-full py-32 overflow-hidden flex flex-col justify-center border-t border-[var(--foreground)]/10 bg-[#040405] text-[#FAFAFA]">
            <FadeIn className="font-mono text-xs tracking-widest text-zinc-500 mb-10 px-6 md:px-10 uppercase absolute top-10 left-0">
              [ 03 / CAPABILITIES ]
            </FadeIn>
            
            <div className="relative flex overflow-x-hidden group w-full mt-20">
              <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
                {/* We map capabilities 3 times so the marquee has plenty of width to seamlessly loop back at -50% */}
                {[...capabilities, ...capabilities, ...capabilities].map((cap, i) => (
                  <Link key={`${cap.id}-${i}`} href={`/skills#${cap.id}`} className="mx-8 text-[clamp(4rem,10vw,10rem)] font-display font-black uppercase tracking-tighter text-zinc-800 hover:text-white transition-colors duration-500 interactive" data-cursor-text="VIEW">
                    {cap.label} <span className="text-zinc-800 mx-8 opacity-50">&bull;</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* INNOVATIONS */}
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

          {/* ABOUT / ARCHIVE */}
          <section className="relative min-h-screen w-full py-20 px-6 md:px-10 flex flex-col justify-center border-t border-[var(--foreground)]/10">
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-10">
              
              {/* Archive Header / 3D Resume Preview */}
              <div className="w-full md:w-1/3 flex flex-col gap-10">
                <FadeIn className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase">
                  [ 05 / ARCHIVE ]
                </FadeIn>
                
                <FadeIn delay={0.2} className="relative w-full max-w-[280px] aspect-[1/1.4] group hidden md:block" style={{ perspective: '1000px' }}>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="block w-full h-full relative transition-transform duration-700 transform-style-3d group-hover:rotate-y-[-10deg] group-hover:rotate-x-[5deg] group-hover:scale-105 interactive" data-cursor-text="OPEN RESUME">
                    
                    {/* 3D Paper Document Effect */}
                    <div className="absolute inset-0 bg-white shadow-[20px_20px_40px_rgba(0,0,0,0.1)] border border-zinc-200 p-6 flex flex-col opacity-90 group-hover:opacity-100 transition-all duration-700 bg-[linear-gradient(to_bottom,transparent_0px,transparent_calc(100%_-_1px),#f4f4f5_calc(100%_-_1px))] bg-[length:100%_16px]">
                      
                      {/* Fake resume skeleton */}
                      <div className="w-full border-b-2 border-zinc-900 pb-2 mb-4">
                        <div className="w-2/3 h-4 bg-zinc-900 mb-2 rounded-sm"></div>
                        <div className="w-1/3 h-2 bg-zinc-400 rounded-sm"></div>
                      </div>
                      
                      <div className="w-1/2 h-3 bg-zinc-300 mb-4 rounded-sm"></div>
                      <div className="w-full h-2 bg-zinc-200 mb-2 rounded-sm"></div>
                      <div className="w-full h-2 bg-zinc-200 mb-2 rounded-sm"></div>
                      <div className="w-4/5 h-2 bg-zinc-200 mb-6 rounded-sm"></div>
                      
                      <div className="w-1/3 h-3 bg-zinc-300 mb-4 rounded-sm"></div>
                      <div className="w-full h-2 bg-zinc-200 mb-2 rounded-sm"></div>
                      <div className="w-11/12 h-2 bg-zinc-200 mb-2 rounded-sm"></div>
                      <div className="w-full h-2 bg-zinc-200 mb-2 rounded-sm"></div>
                    </div>
                    
                    <div className="absolute -bottom-4 -right-4 bg-[var(--foreground)] text-[var(--background)] font-mono text-[10px] px-3 py-1 uppercase tracking-widest shadow-xl transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2">
                      VIEW RESUME &nearr;
                    </div>
                  </a>
                </FadeIn>
              </div>

              <div className="w-full md:w-2/3 md:pl-10">
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
                  <Link href="/innovations" className="hover:text-[var(--accent)] transition-colors interactive">INNOVATIONS &rarr;</Link>
                </FadeIn>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* 
        ========================================
        FOOTER REVEAL (CONTACT)
        ========================================
      */}
      <div className="fixed bottom-0 left-0 w-full h-[100svh] z-0 pointer-events-none">
        <section className="relative w-full h-full flex flex-col justify-center items-center py-20 px-6 md:px-10 bg-[#FAFAFA] text-[#09090B] pointer-events-auto border-t border-[var(--foreground)]/10">
          <FadeIn className="font-mono text-xs tracking-widest text-zinc-500 mb-10 text-center uppercase">
            [ 06 / INITIATE ]
          </FadeIn>
          <h2 className="font-display text-[clamp(4rem,10vw,12rem)] font-black uppercase tracking-tighter text-center leading-[0.85] text-[#09090B] w-full max-w-6xl">
            <TextReveal>HAVE AN IDEA?</TextReveal><br/>
            <TextReveal delay={0.1}>LET&apos;S BUILD IT.</TextReveal>
          </h2>
          
          <FadeIn delay={0.3} className="mt-16 font-sans text-xl md:text-2xl text-[#09090B]/70 text-center max-w-xl">
            Have a project, technical idea, collaboration or problem worth exploring? Let&apos;s talk.
          </FadeIn>

          <FadeIn delay={0.4} className="mt-16 flex flex-col items-center gap-8">
            <MagneticLink>
              <Link href="/contact" className="group px-8 py-4 bg-[#09090B] text-white font-mono text-sm uppercase tracking-widest hover:bg-[var(--accent)] hover:text-white transition-colors interactive" data-cursor-text="ENTER">
                GET IN TOUCH &rarr;
              </Link>
            </MagneticLink>

            <div className="flex flex-wrap justify-center gap-8 font-mono text-xs tracking-widest text-zinc-500 uppercase mt-10">
              {siteConfig.contact.linkedin && (
                <a href={siteConfig.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#09090B] transition-colors interactive">LINKEDIN &nearr;</a>
              )}
              {siteConfig.contact.github && (
                <a href={siteConfig.contact.github} target="_blank" rel="noreferrer" className="hover:text-[#09090B] transition-colors interactive">GITHUB &nearr;</a>
              )}
              {siteConfig.contact.email && (
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#09090B] transition-colors interactive">EMAIL &nearr;</a>
              )}
            </div>
          </FadeIn>
        </section>
      </div>
    </>
  );
}
