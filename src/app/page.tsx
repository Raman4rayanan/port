"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import TextReveal from "@/components/motion/TextReveal";
import SplitText from "@/components/motion/SplitText";
import FadeIn from "@/components/motion/FadeIn";
import ParallaxImage from "@/components/motion/ParallaxImage";
import MagneticLink from "@/components/motion/MagneticLink";
import { siteConfig } from "@/data/site";
import FeaturedBuilds from "@/components/FeaturedBuilds";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden" >
            <div className="font-display font-black text-[30vw] leading-none tracking-tighter text-[var(--foreground)] opacity-[0.03] select-none">
              SYSTEM
            </div>
          </div>

          {/* TOP LEFT METADATA */}
          <div className="absolute top-[8%] left-[3%] font-mono text-[8px] text-[var(--muted)] tracking-widest uppercase hidden lg:block">
            + 45.002 / Y.AXIS
          </div>

          <section className="relative h-full w-full flex flex-col justify-between pt-20 md:pt-28 pb-6 md:pb-10 px-6 md:px-10">

            {/* Social Links — top left, fully clickable */}
            <div className="absolute top-[18%] left-[3%] z-50 hidden lg:block">
              <SocialOrbit />
            </div>


            <div className="relative z-20 w-full h-full flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-10 flex-1 px-0 md:px-12 lg:px-20 pb-10 md:pb-20">

              {/* Typography Layer */}
              <div className="flex flex-col gap-4 md:gap-6 w-full md:w-1/2 parallax-layer z-30 pb-2 md:pb-24" data-speed="0.4">
                <h1 className="font-display text-[clamp(1.75rem,10.5vw,9rem)] leading-[0.85] md:leading-[0.8] font-black tracking-tighter uppercase relative w-full">
                  <TextReveal delay={0.1}>{siteConfig.shortName}</TextReveal>
                </h1>

                <FadeIn delay={0.3} className="font-sans text-[10px] md:text-xs text-[var(--muted)] leading-relaxed mt-1 md:mt-2 uppercase tracking-[0.2em]">
                  {siteConfig.identity.field} <br />
                  {siteConfig.identity.primary}
                </FadeIn>

                {/* Motto */}
                <FadeIn delay={0.4} className="mt-4 md:mt-12 font-serif text-[clamp(1.5rem,3vw,2.5rem)] text-[var(--foreground)] max-w-lg leading-[1.3] flex flex-col gap-2 md:gap-3 relative z-30">
                  <span className="opacity-50">Curious by default.</span>
                  <span className="opacity-100 font-semibold">Building by choice.</span>
                </FadeIn>
              </div>

              {/* Profile Image Layer (Larger scale, anchors composition) */}
              <div className="w-full md:w-5/12 h-[40vh] md:h-[75vh] relative group interactive parallax-layer z-20 mt-4 md:mt-0" data-cursor-text="EXPLORE" data-speed="0.2">
                <Link href="/about" className="block w-full h-full relative">
                  <ParallaxImage
                    src="/profile.png"
                    alt={`${siteConfig.name} - Profile`}
                    speed={0.1}
                    className="rounded-sm"
                    imageClassName="group-hover:scale-[1.05] transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] scale-[1.12] origin-bottom object-contain md:object-cover object-bottom md:object-center"
                  />
                </Link>
              </div>
            </div>

            {/* Bottom bar & Scroll indicator */}
            <FadeIn delay={0.6} className="relative z-30 flex justify-between items-end mt-4 md:mt-16 w-full pt-4 md:pt-6">

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
                  <SplitText text="CURIOUS ENOUGH TO BUILD." />
                </h2>
                <div className="mt-10 md:mt-16 flex flex-col gap-6 max-w-2xl font-sans text-lg md:text-xl text-[var(--muted)]">
                  <FadeIn delay={0.2}>
                    I’m Ramanarayanan G, an Electronics & Communication Engineering student exploring the space between electronics, software and physical products.
                  </FadeIn>
                  <FadeIn delay={0.3}>
                    I’m drawn to understanding what happens behind the surface — how things work, why they behave the way they do, and what happens when I try to build them myself.
                  </FadeIn>
                  <FadeIn delay={0.4}>
                    I don’t have everything figured out yet. I’m exploring, learning and building my way toward the kind of engineer I want to become.
                  </FadeIn>
                </div>
                <div className="mt-10 md:mt-16">
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
          <FeaturedBuilds />






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
          <h2 className="font-display text-[clamp(2.5rem,10vw,12rem)] font-black uppercase tracking-tighter text-center leading-[0.85] text-[#09090B] w-full max-w-6xl">
            <TextReveal>HAVE AN IDEA?</TextReveal><br />
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
