"use client";

import { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/motion/FadeIn";
import TextReveal from "@/components/motion/TextReveal";
import MagneticLink from "@/components/motion/MagneticLink";
import { siteConfig } from "@/data/site";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "ready">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("ready");
    // Mock success state. In the future, integrate backend/email API here.
    setTimeout(() => setFormStatus("idle"), 3000);
  };

  const socialLinks = [
    { name: "LINKEDIN", url: siteConfig.contact.linkedin },
    { name: "GITHUB", url: siteConfig.contact.github },
    { name: "INSTAGRAM", url: "https://instagram.com/placeholder" } // using placeholder if not in config
  ].filter(link => link.url);

  const emailToUse = siteConfig.contact.email || "ramanarayanan@gmail.com";

  return (
    <main className="w-full min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 selection:bg-white selection:text-black">
      
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* HERO SECTION */}
        <section className="mb-32 md:mb-48 border-b border-white/10 pb-20">
          <FadeIn className="font-mono text-xs tracking-widest text-zinc-500 mb-12 uppercase">
            [ 06 / CONTACT ]
          </FadeIn>
          
          <h1 className="font-display text-[clamp(4rem,10vw,12rem)] leading-[0.85] font-black uppercase tracking-tighter w-full mb-12">
            <TextReveal>LET&apos;S</TextReveal><br />
            <TextReveal delay={0.1}>BUILD</TextReveal><br />
            <TextReveal delay={0.2}>SOMETHING.</TextReveal>
          </h1>
          
          <FadeIn delay={0.3} className="font-sans text-xl md:text-3xl text-zinc-400 max-w-3xl leading-relaxed">
            Have a project, technical idea, collaboration or problem worth exploring? Let&apos;s talk.
          </FadeIn>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 mb-32 md:mb-48">
          
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-20">
            {/* PRIMARY CONTACT */}
            <section>
              <FadeIn className="font-mono text-[10px] tracking-widest text-[var(--accent)] mb-8 uppercase">
                [ PRIMARY ]
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="flex flex-col gap-6 items-start">
                  <div className="font-sans text-xl md:text-3xl text-white">
                    {emailToUse}
                  </div>
                  <MagneticLink>
                    <a href={`mailto:${emailToUse}`} className="font-mono text-xs text-zinc-400 tracking-widest uppercase border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-colors interactive">
                      EMAIL ME &rarr;
                    </a>
                  </MagneticLink>
                </div>
              </FadeIn>
            </section>

            {/* SOCIAL LINKS */}
            <section>
              <FadeIn className="font-mono text-[10px] tracking-widest text-[var(--accent)] mb-8 uppercase">
                [ NETWORK ]
              </FadeIn>
              <div className="flex flex-col border-t border-white/10">
                {socialLinks.map((link, index) => (
                  <FadeIn key={link.name} delay={0.1 * index} className="border-b border-white/10">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="group flex justify-between items-center py-6 md:py-8 interactive" data-cursor-text="VISIT">
                      <div className="flex items-center gap-6">
                        <span className="font-mono text-[10px] text-zinc-500">0{index + 1}</span>
                        <span className="font-display text-2xl md:text-4xl font-bold uppercase tracking-tight text-white group-hover:translate-x-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                          {link.name}
                        </span>
                      </div>
                      <span className="text-2xl text-zinc-500 group-hover:text-white transition-colors">↗</span>
                    </a>
                  </FadeIn>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-20">
            {/* OPTIONAL FORM */}
            <section>
              <FadeIn className="font-mono text-[10px] tracking-widest text-[var(--accent)] mb-8 uppercase">
                [ START A CONVERSATION ]
              </FadeIn>
              <FadeIn delay={0.2}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                  
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">NAME</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-4 pt-2 font-sans text-lg text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-colors rounded-none" 
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">EMAIL</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-4 pt-2 font-sans text-lg text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-colors rounded-none" 
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">MESSAGE</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-transparent border-b border-white/20 pb-4 pt-2 font-sans text-lg text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-colors resize-none rounded-none" 
                      placeholder="How can we work together?"
                    />
                  </div>

                  <div className="pt-4 flex">
                    <button type="submit" className="font-mono text-xs tracking-widest uppercase border border-white/20 px-8 py-4 text-white hover:bg-white hover:text-black transition-colors interactive">
                      {formStatus === "ready" ? "MESSAGE READY \u2713" : "SEND MESSAGE \u2192"}
                    </button>
                  </div>

                </form>
              </FadeIn>
            </section>

            {/* STATUS / AVAILABILITY GRID */}
            <section>
              <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                <FadeIn delay={0.3} className="flex flex-col gap-4">
                  <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">[ STATUS ]</div>
                  <div className="font-mono text-xs tracking-widest text-emerald-400 uppercase leading-relaxed">OPEN TO<br/>COLLABORATION</div>
                </FadeIn>
                <FadeIn delay={0.4} className="flex flex-col gap-4">
                  <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">[ BASED ]</div>
                  <div className="font-mono text-xs tracking-widest text-white uppercase leading-relaxed">INDIA</div>
                </FadeIn>
                <FadeIn delay={0.5} className="flex flex-col gap-4 col-span-2 md:col-span-1">
                  <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">[ FOCUS ]</div>
                  <div className="font-mono text-xs tracking-widest text-white uppercase leading-relaxed">HARDWARE / EMBEDDED<br/>IOT / SOFTWARE</div>
                </FadeIn>
                <FadeIn delay={0.6} className="flex flex-col gap-4 col-span-2 md:col-span-1">
                  <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">[ RESPONSE ]</div>
                  <div className="font-mono text-xs tracking-widest text-white uppercase leading-relaxed">USUALLY WITHIN<br/>24&ndash;48 HOURS</div>
                </FadeIn>
              </div>
            </section>
          </div>

        </div>

        {/* CLOSING STATEMENT */}
        <section className="pt-20 md:pt-32 border-t border-white/10 flex flex-col items-center justify-center text-center">
          <h2 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.9] font-black uppercase tracking-tighter mb-20">
            <TextReveal>HAVE AN IDEA?</TextReveal><br />
            <TextReveal delay={0.1}>LET&apos;S MAKE IT REAL.</TextReveal>
          </h2>

          <div className="flex flex-wrap justify-center gap-12 font-mono text-xs tracking-widest text-zinc-500 uppercase">
            <FadeIn delay={0.2}>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors interactive pb-1 border-b border-transparent hover:border-white">
                BACK TO TOP &uarr;
              </button>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Link href="/" className="hover:text-white transition-colors interactive pb-1 border-b border-transparent hover:border-white">
                &larr; BACK HOME
              </Link>
            </FadeIn>
          </div>
        </section>

      </div>
    </main>
  );
}
