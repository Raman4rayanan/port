"use client";

import TextReveal from "@/components/motion/TextReveal";
import FadeIn from "@/components/motion/FadeIn";
import Link from "next/link";

export default function WorkPage() {
  return (
    <main className="w-full min-h-screen bg-[#09090B] text-[#FAFAFA] pt-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-6xl md:text-8xl font-black uppercase tracking-tighter">
          <TextReveal>Selected Work</TextReveal>
        </h1>
        <FadeIn delay={0.2} className="mt-20">
          <Link href="/work/gas-leak-protection-system" className="group font-sans text-xl interactive">
            <div className="py-10 border-b border-zinc-800 flex justify-between items-center group-hover:text-[var(--accent)] transition-colors">
              <span className="font-display text-4xl">Gas Leak Protection System</span>
              <span className="font-mono text-sm">&rarr;</span>
            </div>
          </Link>
        </FadeIn>
      </div>
    </main>
  );
}
