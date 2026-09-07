"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// ssr: false so Next.js never renders IntroLoader on the server
const IntroLoader = dynamic(() => import("@/components/IntroLoader"), { ssr: false });

const SESSION_KEY = "rg_intro_seen";

export default function IntroController() {
  // MUST start as false so the server and initial client render agree (no hydration mismatch).
  // sessionStorage is checked AFTER hydration in the effect below.
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(SESSION_KEY)) {
      setShowLoader(true); // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setShowLoader(false);
  };

  if (!showLoader) return null;
  return <IntroLoader onComplete={handleComplete} />;
}
