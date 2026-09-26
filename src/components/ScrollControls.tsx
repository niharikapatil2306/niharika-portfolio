"use client";

import { useEffect, useState } from "react";

export default function ScrollControls() {
  const [showTop, setShowTop] = useState(false);

  // A refresh always lands on the home screen, not wherever you'd scrolled
  // to or whichever #section was last in the address bar.
  useEffect(() => {
    const [nav] = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];
    if (nav?.type !== "reload") return;

    history.scrollRestoration = "manual";
    if (location.hash) {
      history.replaceState(null, "", location.pathname + location.search);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`glass fixed right-5 bottom-5 z-40 flex h-11 w-11 items-center justify-center rounded-full text-cream shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:text-gold sm:right-8 sm:bottom-8 ${
        showTop ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
