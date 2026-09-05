"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;

    gsap.fromTo(
      text,
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1.2,
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

  return (
    <div ref={containerRef} className={cn("overflow-hidden relative inline-block", className)}>
      <div ref={textRef} className="will-change-transform inline-block">
        {children}
      </div>
    </div>
  );
}
