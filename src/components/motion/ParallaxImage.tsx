"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  speed?: number; // 0 to 1, higher is faster parallax
}

export default function ParallaxImage({ 
  src, 
  alt, 
  className, 
  imageClassName,
  speed = 0.5 
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const yVal = speed * 100;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.fromTo(
      image,
      { y: -yVal },
      { y: yVal, ease: "none" }
    );

    return () => {
      tl.kill();
    };
  }, [speed]);

  return (
    <div 
      ref={containerRef} 
      className={cn("relative overflow-hidden w-full h-full", className)}
    >
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        fill
        className={cn("object-cover scale-[1.2] will-change-transform", imageClassName)}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
    </div>
  );
}
