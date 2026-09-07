"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 500, damping: 28, mass: 0.5 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      const timer = setTimeout(() => setIsTouchDevice(true), 0);
      return () => clearTimeout(timer);
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleLinkHoverStart = (e: Event) => {
      setHovered(true);
      const target = e.target as HTMLElement;
      if (target.dataset.cursorText) {
        setHoverText(target.dataset.cursorText);
      }
    };

    const handleLinkHoverEnd = () => {
      setHovered(false);
      setHoverText("");
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const setupInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll("a, button, .interactive");
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleLinkHoverStart);
        el.addEventListener("mouseleave", handleLinkHoverEnd);
      });
    };

    setupInteractiveElements();

    // Setup mutation observer to attach events to dynamically added elements
    const observer = new MutationObserver(setupInteractiveElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] flex items-center justify-center pointer-events-none mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: hovered ? (hoverText ? 3 : 1.5) : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
        <div 
          className={`bg-white rounded-full transition-all duration-300 ease-out ${
            hovered && hoverText ? "w-16 h-16" : hovered ? "w-8 h-8" : "w-4 h-4"
          }`}
        />
        {hoverText && hovered && (
          <span className="absolute text-black text-[8px] font-mono tracking-widest uppercase pointer-events-none">
            {hoverText}
          </span>
        )}
      </div>
    </motion.div>
  );
}
