"use client";

import TextReveal from "@/components/motion/TextReveal";
import FadeIn from "@/components/motion/FadeIn";

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-[var(--background)] pt-40 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-display text-6xl md:text-8xl font-black uppercase tracking-tighter">
          <TextReveal>About Me</TextReveal>
        </h1>
        <FadeIn delay={0.2} className="mt-10 font-sans text-xl text-[var(--muted)] max-w-2xl">
          I am Ramanarayanan G, an Electronics & Communication Engineering student with a passion for building hardware and software systems.
        </FadeIn>
      </div>
    </main>
  );
}
