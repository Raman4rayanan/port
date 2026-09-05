"use client";

import TextReveal from "@/components/motion/TextReveal";
import FadeIn from "@/components/motion/FadeIn";

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-[var(--foreground)] text-[var(--background)] pt-40 px-6 md:px-10">
      <div className="max-w-5xl mx-auto flex flex-col justify-center items-center text-center">
        <h1 className="font-display text-6xl md:text-8xl font-black uppercase tracking-tighter">
          <TextReveal>Contact</TextReveal>
        </h1>
        <FadeIn delay={0.2} className="mt-10 font-sans text-xl text-zinc-400">
          hello@example.com
        </FadeIn>
      </div>
    </main>
  );
}
