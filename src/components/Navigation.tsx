"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/work", label: "WORK" },
  { href: "/milestones", label: "MILESTONES" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      gsap.to(".nav-overlay", {
        y: "0%",
        duration: 0.8,
        ease: "power4.inOut",
      });
      gsap.fromTo(
        ".nav-link",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out", delay: 0.4 }
      );
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(".nav-overlay", {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.2,
      });
      gsap.to(".nav-link", {
        y: -50,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      });
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Close nav when route changes
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-[100] mix-blend-difference text-white">
        <Link href="/" className="text-sm font-mono tracking-widest interactive" data-cursor-text="HOME">
          RG / RAMANARAYANAN G
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm font-mono tracking-widest uppercase interactive group"
          data-cursor-text={isOpen ? "CLOSE" : "MENU"}
        >
          <div className="relative overflow-hidden h-[1lh]">
            <div className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
              {isOpen ? "CLOSE" : "MENU"}
            </div>
            <div className="absolute top-0 left-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0">
              {isOpen ? "CLOSE" : "MENU"}
            </div>
          </div>
        </button>
      </header>

      <div className="nav-overlay fixed inset-0 bg-[#09090B] text-[#FAFAFA] z-[90] flex items-center justify-center -translate-y-full will-change-transform">
        <nav className="flex flex-col items-center gap-6 md:gap-10">
          {navLinks.map((link) => (
            <div key={link.href} className="overflow-hidden">
              <Link
                href={link.href}
                className="nav-link block font-display text-5xl md:text-8xl font-black uppercase tracking-tighter hover:text-[var(--accent)] transition-colors duration-500 interactive"
                data-cursor-text="ENTER"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>
        
        {/* Subtle engineering aesthetic elements in nav */}
        <div className="absolute bottom-10 left-10 font-mono text-xs text-zinc-500 hidden md:block">
          <div>SYS.NAV.0{isOpen ? "1" : "0"}</div>
          <div>COORD: {new Date().getFullYear()}</div>
        </div>
      </div>
    </>
  );
}
