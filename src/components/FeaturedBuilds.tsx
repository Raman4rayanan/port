"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import ParallaxImage from "@/components/motion/ParallaxImage";
import MagneticLink from "@/components/motion/MagneticLink";
import { featuredProjects } from "@/data/projects";

export default function FeaturedBuilds() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReducedMotion) return; // Fallback to CSS flow if reduced motion

    const yOffset = isMobile ? 30 : 50; 
    
    // Initial State Setup
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      if (index === 0) {
        return; 
      }
      
      gsap.set(card, {
        scale: 1 - (index * 0.04),
        y: index * yOffset,
        autoAlpha: 1 - (index * 0.15),
      });
    });

    const totalScrollDuration = isMobile ? "+=200%" : "+=300%";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: totalScrollDuration,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      }
    });

    for (let i = 0; i < featuredProjects.length - 1; i++) {
      const activeCard = cardsRef.current[i];
      const nextCard = cardsRef.current[i + 1];
      const otherCards = cardsRef.current.slice(i + 2);

      const stepTl = gsap.timeline();

      // Active card peels away (up and fades)
      stepTl.to(activeCard, {
        y: -100 - (yOffset * 2),
        autoAlpha: 0,
        scale: 1.05,
        duration: 1,
        ease: "power2.inOut",
      }, 0);

      // Next card moves to front
      stepTl.to(nextCard, {
        y: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        ease: "power2.inOut",
      }, 0);

      // Other cards shift up one slot in the stack
      otherCards.forEach((card, offsetIndex) => {
        const newSlot = offsetIndex + 1; // position relative to new front card
        stepTl.to(card, {
          y: newSlot * yOffset,
          scale: 1 - (newSlot * 0.04),
          opacity: 1 - (newSlot * 0.15),
          duration: 1,
          ease: "power2.inOut",
        }, 0);
      });

      tl.add(stepTl);
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[100svh] bg-[#0a0a0a] overflow-hidden flex flex-col justify-center items-center px-4 md:px-10 border-t border-[var(--foreground)]/10">
      
      {/* Global Background Labels */}
      <div className="absolute top-10 left-6 right-6 md:top-20 md:left-10 md:right-10 flex flex-col md:flex-row justify-between items-start md:items-center z-10 pointer-events-none gap-6">
        <div className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
          [ 02 / FEATURED BUILDS ]
        </div>
        <div className="font-display text-[clamp(2.5rem,5vw,5rem)] font-black uppercase tracking-tighter text-zinc-800 leading-[0.85] md:text-right">
          BUILT TO<br className="hidden md:block" /> WORK.
        </div>
      </div>

      <div ref={containerRef} className="relative w-full max-w-5xl h-[70vh] md:h-[75vh] mt-16 md:mt-0 perspective-[1200px]">
        {featuredProjects.map((project, index) => {
          const zIndex = featuredProjects.length - index;
          
          return (
            <div 
              key={project.id} 
              ref={el => { cardsRef.current[index] = el; }}
              className="absolute inset-x-0 top-0 h-full w-full rounded-xl bg-[#111] border border-white/5 overflow-hidden flex flex-col shadow-2xl origin-top will-change-transform"
              style={{ zIndex }}
            >
               <Link href={`/work/${project.id}`} className="w-full h-full flex flex-col md:flex-row group interactive cursor-none" data-cursor-text="VIEW PROJECT">
                  
                  {/* Image Area */}
                  <div className="w-full h-[45%] md:w-1/2 md:h-full relative overflow-hidden bg-black flex items-center justify-center">
                    {project.image && (
                       <ParallaxImage 
                         src={project.image}
                         alt={project.title}
                         speed={0.05}
                         className={project.mobileImage ? "hidden md:block w-full h-full" : "w-full h-full"}
                         imageClassName="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                       />
                    )}
                    
                    {project.mobileImage && (
                       <ParallaxImage 
                         src={project.mobileImage}
                         alt={project.title}
                         speed={0.05}
                         className="block md:hidden w-full h-full"
                         imageClassName="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                       />
                    )}
                    
                    {!project.image && !project.mobileImage && (
                       <div className="absolute inset-0 bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 to-transparent flex items-center justify-center parallax-img" data-speed="0.05">
                         <div className="font-mono text-xs text-zinc-600 tracking-widest uppercase">SYS_IMG_PENDING</div>
                       </div>
                    )}
                    {/* Number Overlay */}
                    <div className="absolute top-6 left-6 font-display text-4xl md:text-6xl font-black text-white/50 z-10 mix-blend-overlay">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Text Area */}
                  <div className="w-full h-[55%] md:w-1/2 md:h-full p-6 md:p-12 lg:p-16 flex flex-col justify-between relative bg-[#131313]">
                    
                    <div className="flex flex-col gap-3 md:gap-6">
                      <p className="font-mono text-[9px] md:text-xs tracking-widest text-[var(--accent)] uppercase">
                        {project.category}
                      </p>
                      <h3 className="font-display text-[clamp(1.5rem,3vw,3rem)] leading-[0.9] font-black uppercase tracking-tighter text-white">
                        {project.title.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
                      </h3>
                      <p className="font-sans text-sm md:text-base text-zinc-400 max-w-sm mt-2 md:mt-4 leading-relaxed hidden sm:block">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 md:gap-6 mt-4 md:mt-8">
                      {project.status && (
                        <div className="font-mono text-[9px] md:text-[10px] text-emerald-400 tracking-widest flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {project.status}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-zinc-500 tracking-widest uppercase group-hover:text-white transition-colors duration-300">
                        EXPLORE PROJECT <span className="group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
                      </div>
                    </div>

                    {/* Progress Indicator inside card */}
                    <div className="absolute top-6 right-6 md:bottom-12 md:top-auto font-mono text-[10px] md:text-xs text-zinc-600 tracking-widest">
                      0{index + 1} / 04
                    </div>
                  </div>
               </Link>
            </div>
          )
        })}
      </div>

      {/* Global Background Footer */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-10 z-10 pointer-events-auto">
        <MagneticLink>
          <Link href="/work" className="group font-sans text-lg md:text-xl border-b border-white/50 pb-1 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors interactive text-white" data-cursor-text="VIEW">
            MY WORK <span className="inline-block transition-transform group-hover:translate-x-2">&rarr;</span>
          </Link>
        </MagneticLink>
      </div>
    </section>
  );
}
