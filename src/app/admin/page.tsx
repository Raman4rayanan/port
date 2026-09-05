"use client";

import TextReveal from "@/components/motion/TextReveal";
import FadeIn from "@/components/motion/FadeIn";

export default function AdminPage() {
  return (
    <main className="w-full min-h-screen bg-[var(--background)] pt-40 px-6 md:px-10 flex flex-col justify-center items-center">
      <div className="max-w-2xl mx-auto text-center border border-[var(--foreground)]/10 p-10 md:p-20 rounded-sm bg-white shadow-xl">
        <h1 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
          <TextReveal>Admin Portal</TextReveal>
        </h1>
        <FadeIn delay={0.2} className="font-mono text-sm tracking-widest text-[var(--muted)] uppercase">
          [ AUTHENTICATION REQUIRED ]
        </FadeIn>
        
        <FadeIn delay={0.4} className="mt-10">
          <p className="font-sans text-[var(--muted)] mb-8">
            This route is currently a placeholder. Backend and authentication functionality will be implemented here later.
          </p>
          <button className="px-8 py-3 bg-[var(--foreground)] text-[var(--background)] font-sans font-medium uppercase tracking-widest hover:bg-[var(--accent)] transition-colors interactive">
            Sign In
          </button>
        </FadeIn>
      </div>
    </main>
  );
}
