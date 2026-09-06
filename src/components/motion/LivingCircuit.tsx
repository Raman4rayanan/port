"use client";

import { useEffect, useRef, useState } from "react";

export default function LivingCircuit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    if (prefersReducedMotion || isMobile) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40 mix-blend-screen hidden md:block">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
         <defs>
           <filter id="circuit-glow" x="-20%" y="-20%" width="140%" height="140%">
             <feGaussianBlur stdDeviation="3" result="blur" />
             <feComposite in="SourceGraphic" in2="blur" operator="over" />
           </filter>
         </defs>
         
         {/* Static Base Traces */}
         <g stroke="rgba(255,255,255,0.04)" fill="none" strokeWidth="1">
            {/* Top Left to Bottom Right */}
            <path d="M 10%,10% L 25%,10% L 30%,15% L 30%,40% L 40%,50% L 80%,50%" />
            <path d="M 80%,20% L 70%,20% L 65%,25% L 65%,45%" />
            {/* Bottom Left */}
            <path d="M 5%,70% L 20%,70% L 25%,65% L 50%,65% L 55%,60%" />
            <path d="M 10%,80% L 20%,80% L 25%,75% L 40%,75%" />
            {/* Top Right */}
            <path d="M 85%,10% L 75%,10% L 70%,15% L 70%,40%" />
            {/* Bottom Right */}
            <path d="M 60%,90% L 70%,90% L 75%,85% L 85%,85% L 85%,75%" />
            <path d="M 90%,60% L 80%,60% L 75%,55%" />

            {/* Junction Nodes */}
            <circle cx="10%" cy="10%" r="2" />
            <circle cx="80%" cy="50%" r="2" />
            <circle cx="80%" cy="20%" r="2" />
            <circle cx="5%" cy="70%" r="2" />
            
            {/* Hardware symbols (e.g. MCU outline) */}
            <rect x="70%" y="20%" width="80" height="80" strokeDasharray="2, 4" />
            <rect x="25%" y="65%" width="40" height="40" />
            <rect x="75%" y="85%" width="20" height="20" />
         </g>

         {/* Interactive/Glowing nodes */}
         <g>
            <InteractiveNode cx="30%" cy="15%" mouse={mousePos} />
            <InteractiveNode cx="40%" cy="50%" mouse={mousePos} />
            <InteractiveNode cx="65%" cy="25%" mouse={mousePos} />
            <InteractiveNode cx="70%" cy="15%" mouse={mousePos} />
            <InteractiveNode cx="20%" cy="70%" mouse={mousePos} />
            <InteractiveNode cx="25%" cy="75%" mouse={mousePos} />
            <InteractiveNode cx="75%" cy="10%" mouse={mousePos} />
            <InteractiveNode cx="70%" cy="90%" mouse={mousePos} />
            <InteractiveNode cx="80%" cy="60%" mouse={mousePos} />
         </g>
         
         {/* Animated Signal Flow Traces */}
         <g stroke="rgba(255,255,255,0.4)" fill="none" strokeWidth="1" filter="url(#circuit-glow)">
            <path 
              d="M 10%,10% L 25%,10% L 30%,15% L 30%,40% L 40%,50% L 80%,50%" 
              strokeDasharray="20 1500"
              className="animate-[signal-flow_15s_linear_infinite]"
            />
            <path 
              d="M 5%,70% L 20%,70% L 25%,65% L 50%,65% L 55%,60%" 
              strokeDasharray="10 1200"
              className="animate-[signal-flow_12s_linear_infinite]"
            />
            <path 
              d="M 85%,10% L 75%,10% L 70%,15% L 70%,40%" 
              strokeDasharray="15 800"
              className="animate-[signal-flow_10s_linear_infinite]"
            />
            <path 
              d="M 60%,90% L 70%,90% L 75%,85% L 85%,85% L 85%,75%" 
              strokeDasharray="5 1000"
              className="animate-[signal-flow_14s_linear_infinite]"
            />
         </g>
      </svg>
    </div>
  );
}

function InteractiveNode({ cx, cy, mouse }: { cx: string, cy: string, mouse: { x: number, y: number } }) {
  const nodeRef = useRef<SVGCircleElement>(null);
  
  useEffect(() => {
    if (!nodeRef.current) return;
    const rect = nodeRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const dist = Math.hypot(mouse.x - x, mouse.y - y);
    
    const active = dist < 200; // 200px radius for interaction
    const opacity = active ? Math.max(0.1, 1 - dist / 200) : 0.04;
    const r = active ? 4 : 2;
    
    nodeRef.current.style.opacity = opacity.toString();
    nodeRef.current.setAttribute("r", r.toString());
  }, [mouse]);

  return (
    <circle 
      ref={nodeRef} 
      cx={cx} 
      cy={cy} 
      r="2" 
      fill="#FAFAFA" 
      style={{ opacity: 0.04, transition: "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)" }} 
    />
  );
}
