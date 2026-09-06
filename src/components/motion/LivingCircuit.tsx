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
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen hidden md:block">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
         <defs>
           <filter id="circuit-glow" x="-20%" y="-20%" width="140%" height="140%">
             <feGaussianBlur stdDeviation="3" result="blur" />
             <feComposite in="SourceGraphic" in2="blur" operator="over" />
           </filter>
         </defs>
         
         {/* Static Base Traces */}
         <g stroke="rgba(255,255,255,0.08)" fill="none" strokeWidth="1">
            {/* Top Left System to Social Orbit */}
            <path d="M 5% 15% H 12% V 25% H 20%" />
            {/* Main spanning trace running behind typography */}
            <path d="M 0 45% H 30% V 60% H 55% V 80% H 100%" />
            {/* Right side technical tree */}
            <path d="M 75% 20% V 30% H 85% V 50% H 95%" />
            <path d="M 85% 30% H 90% V 20%" />
            {/* Bottom left tree */}
            <path d="M 10% 90% V 75% H 25% V 65% H 40%" />
            
            {/* Decorative components (Vias, capacitors) */}
            <circle cx="12%" cy="15%" r="1.5" />
            <circle cx="12%" cy="25%" r="1.5" />
            <circle cx="30%" cy="45%" r="2" />
            <circle cx="30%" cy="60%" r="2" />
            <circle cx="55%" cy="60%" r="2" />
            <circle cx="55%" cy="80%" r="2" />
            
            {/* Component pads */}
            <rect x="73%" y="18%" width="4%" height="4%" strokeDasharray="2 2" />
            <path d="M 23% 63% H 27% M 23% 67% H 27%" />
         </g>

         {/* Important Traces (Slightly brighter) */}
         <g stroke="rgba(255,255,255,0.12)" fill="none" strokeWidth="1">
            <path d="M 12% 25% H 20%" />
            <path d="M 75% 20% H 80%" />
            <circle cx="20%" cy="25%" r="2" fill="rgba(255,255,255,0.12)" />
            <circle cx="75%" cy="20%" r="2" fill="rgba(255,255,255,0.12)" />
         </g>

         {/* Interactive/Glowing nodes */}
         <g>
            <InteractiveNode cx="12%" cy="15%" mouse={mousePos} />
            <InteractiveNode cx="30%" cy="45%" mouse={mousePos} />
            <InteractiveNode cx="55%" cy="60%" mouse={mousePos} />
            <InteractiveNode cx="85%" cy="30%" mouse={mousePos} />
            <InteractiveNode cx="25%" cy="75%" mouse={mousePos} />
         </g>
         
         {/* Animated Signal Flow Traces */}
         <g stroke="rgba(255,255,255,0.45)" fill="none" strokeWidth="1.5" filter="url(#circuit-glow)">
            <path 
              d="M 0 45% H 30% V 60% H 55% V 80% H 100%" 
              strokeDasharray="20 1800"
              className="animate-[signal-flow_12s_linear_infinite]"
            />
            <path 
              d="M 75% 20% V 30% H 85% V 50% H 95%" 
              strokeDasharray="15 1000"
              className="animate-[signal-flow_9s_linear_infinite]"
            />
            <path 
              d="M 10% 90% V 75% H 25% V 65% H 40%" 
              strokeDasharray="10 800"
              className="animate-[signal-flow_15s_linear_infinite]"
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
    
    const active = dist < 200; 
    const opacity = active ? Math.min(0.6, Math.max(0.08, 0.6 - (dist / 200) * 0.52)) : 0.08;
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
      style={{ opacity: 0.08, transition: "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)" }} 
    />
  );
}
