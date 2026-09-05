"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitText({ text, className, delay = 0 }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll(".split-word");

    gsap.fromTo(
      words,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power4.out",
        delay: delay,
        scrollTrigger: {
          trigger: container,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [delay]);

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
          <span className="split-word inline-block will-change-transform opacity-0">
            {word}
          </span>
        </span>
      ))}
    </div>
  );
}
