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
            {/* Top Left System to MCU */}
            <path d="M 5% 15% H 15% V 10% H 33% V 15% H 40%" />
            {/* Top Right System */}
            <path d="M 46% 15% H 55% L 60% 20% H 75%" />
            
            {/* Social connection to SENSOR */}
            <path d="M 10% 25% H 20% V 35% H 28% V 60% H 12%" />
            <path d="M 12% 60% H 8% V 80% H 15% V 85% H 25%" />
            
            {/* SENSOR to text block links */}
            <path d="M 8% 66% H 12%" />
            <path d="M 8% 68% H 12%" />
            
            {/* MCU Box and Pins */}
            <rect x="40%" y="12%" width="6%" height="8%" strokeDasharray="1" />
            <path d="M 41% 12% V 10% M 43% 12% V 10% M 45% 12% V 10%" /> {/* Top Pins */}
            <path d="M 41% 20% V 22% M 43% 20% V 22% M 45% 20% V 22%" /> {/* Bot Pins */}
            <path d="M 40% 14% H 38% M 40% 16% H 38% M 40% 18% H 38%" /> {/* Left Pins */}
            <path d="M 46% 14% H 48% M 46% 16% H 48% M 46% 18% H 48%" /> {/* Right Pins */}
            
            {/* I/O wrapper and traces (right side framing the portrait) */}
            <path d="M 80% 30% H 85% V 38% H 95%" />
            <path d="M 85% 38% V 48% H 95%" />
            <rect x="90%" y="30%" width="5%" height="18%" strokeDasharray="2 2" />
            <path d="M 85% 50% L 82% 55% H 75%" />

            {/* Top Right Waveform */}
            <path d="M 75% 15% Q 76% 10% 77% 15% T 79% 15% T 81% 15% T 83% 15% T 85% 15%" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            
            {/* Bottom Right Box */}
            <rect x="75%" y="90%" width="20%" height="5%" strokeDasharray="1 3" />
            <path d="M 77% 92% H 78% M 77% 93% H 78%" />
            
            {/* Main sweeping trace behind typography */}
            <path d="M 28% 40% H 40% V 65% H 60% V 80% H 70%" />

            {/* Junction Nodes */}
            <circle cx="15%" cy="10%" r="1.5" />
            <circle cx="20%" cy="35%" r="1.5" />
            <circle cx="28%" cy="60%" r="1.5" />
            <circle cx="8%" cy="80%" r="1.5" />
            <circle cx="60%" cy="20%" r="1.5" />
            <circle cx="85%" cy="38%" r="1.5" />
         </g>

         {/* Important Traces (Slightly brighter) */}
         <g stroke="rgba(255,255,255,0.15)" fill="none" strokeWidth="1">
            <path d="M 15% 10% H 20%" />
            <path d="M 60% 20% H 65%" />
            <circle cx="20%" cy="10%" r="2" fill="rgba(255,255,255,0.15)" />
            <circle cx="65%" cy="20%" r="2" fill="rgba(255,255,255,0.15)" />
            <circle cx="28%" cy="40%" r="2" fill="rgba(255,255,255,0.15)" />
         </g>

         {/* Interactive/Glowing nodes */}
         <g>
            <InteractiveNode cx="15%" cy="10%" mouse={mousePos} />
            <InteractiveNode cx="20%" cy="35%" mouse={mousePos} />
            <InteractiveNode cx="28%" cy="60%" mouse={mousePos} />
            <InteractiveNode cx="8%" cy="80%" mouse={mousePos} />
            <InteractiveNode cx="60%" cy="20%" mouse={mousePos} />
            <InteractiveNode cx="85%" cy="38%" mouse={mousePos} />
            <InteractiveNode cx="82%" cy="55%" mouse={mousePos} />
            <InteractiveNode cx="28%" cy="40%" mouse={mousePos} />
         </g>
         
         {/* Animated Signal Flow Traces */}
         <g stroke="rgba(255,255,255,0.45)" fill="none" strokeWidth="1.5" filter="url(#circuit-glow)">
            <path 
              d="M 5% 15% H 15% V 10% H 33% V 15% H 40%" 
              strokeDasharray="20 1800"
              className="animate-[signal-flow_12s_linear_infinite]"
            />
            <path 
              d="M 10% 25% H 20% V 35% H 28% V 60% H 12%" 
              strokeDasharray="15 1000"
              className="animate-[signal-flow_9s_linear_infinite]"
            />
            <path 
              d="M 46% 15% H 55% L 60% 20% H 75%" 
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
    const opacity = active ? Math.min(0.7, Math.max(0.1, 0.7 - (dist / 200) * 0.6)) : 0.1;
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
      style={{ opacity: 0.1, transition: "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)" }} 
    />
  );
}
