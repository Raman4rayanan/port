"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import so it never runs on the server
const IntroLoader = dynamic(() => import("@/components/IntroLoader"), { ssr: false });

const SESSION_KEY = "rg_intro_seen";

function shouldShowIntro(): boolean {
  if (typeof window === "undefined") return false;
  return !sessionStorage.getItem(SESSION_KEY);
}

export default function IntroController() {
  // Lazy initializer — reads sessionStorage once, synchronously, before first render.
  // No effect needed, so no setState-in-effect lint issue.
  const [showLoader] = useState<boolean>(shouldShowIntro);

  const handleComplete = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    // Force a re-render to unmount the loader. We use location reload-free approach:
    // Since we initialized with useState (no setter needed after complete),
    // the overlay fades out via GSAP and simply disappears; we just mark the key.
  };

  if (!showLoader) return null;
  return <IntroLoader onComplete={handleComplete} />;
}
