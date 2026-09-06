"use client";

import { siteConfig } from "@/data/site";
import Link from "next/link";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

export default function SocialOrbit() {
  const socials = [
    { name: "LINKEDIN", icon: LinkedinIcon, url: siteConfig.contact.linkedin },
    { name: "GITHUB", icon: GithubIcon, url: siteConfig.contact.github },
    { name: "INSTAGRAM", icon: InstagramIcon, url: siteConfig.contact.instagram },
  ];

  return (
    <div className="relative flex flex-col pointer-events-auto">
      {/* Circuit Tree Line */}
      <div className="absolute left-[5px] top-[14px] bottom-[14px] w-[1px] bg-[var(--foreground)]/10" />

      {socials.map((social, index) => (
        <a 
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center h-7 interactive"
          data-cursor-text="VISIT"
        >
          {/* Node and Branch */}
          <div className="relative flex items-center h-full">
            {/* Tree Branch Horizontal Line */}
            {index > 0 && <div className="absolute left-[5px] top-1/2 w-[10px] h-[1px] bg-[var(--foreground)]/10 group-hover:bg-[var(--foreground)]/40 transition-colors duration-500" />}
            
            {/* Main Node */}
            <div className="relative z-10 w-[11px] h-[11px] rounded-full border border-[var(--foreground)]/20 group-hover:border-[var(--foreground)]/60 bg-[var(--background)] flex items-center justify-center transition-colors duration-500">
               <div className="w-[3px] h-[3px] rounded-full bg-[var(--foreground)]/40 group-hover:bg-[var(--foreground)] transition-colors duration-500" />
            </div>
          </div>
          
          <div className="ml-5 flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-[var(--foreground)]">
              <social.icon />
            </span>
            <span className="font-mono text-[9px] text-[var(--foreground)] tracking-[0.15em] uppercase">
              {social.name}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
