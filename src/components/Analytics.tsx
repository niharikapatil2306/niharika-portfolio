"use client";

import { useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CONSENT_KEY = "analytics-consent";

type Consent = "granted" | "denied" | null;

const listeners = new Set<() => void>();
let memoryConsent: Consent = null;

function readConsent(): Consent {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : memoryConsent;
  } catch {
    return memoryConsent;
  }
}

function writeConsent(value: "granted" | "denied") {
  memoryConsent = value;
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked: honour the choice for this visit only.
  }
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  return () => listeners.delete(notify);
}

// Google Analytics only loads after the visitor accepts cookies (UK GDPR/PECR).
export default function Analytics() {
  // "unset" on the server so the banner never flashes before we know the choice.
  const consent = useSyncExternalStore(
    subscribe,
    readConsent,
    () => "unset" as const
  );

  if (!GA_ID || consent === "unset") return null;
  const choose = writeConsent;

  if (consent === "granted") return <GoogleAnalytics gaId={GA_ID} />;
  if (consent === "denied") return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-2xl bg-card p-5 text-card-ink shadow-[0_20px_60px_rgba(0,0,0,0.6)] sm:left-auto sm:right-6 sm:bottom-6"
    >
      <p className="font-[family-name:var(--font-cormorant)] text-xl font-semibold">
        A little bird told me…
      </p>
      <p className="mt-1.5 text-[0.82rem] leading-relaxed text-card-dim">
        …you might be okay with analytics cookies. They just tell me how people
        find this site. Nothing is shared or sold.
      </p>
      <div className="mt-4 flex gap-2.5">
        <button
          onClick={() => choose("granted")}
          className="rounded-full bg-card-ink px-5 py-2.5 text-[0.66rem] font-medium uppercase tracking-[0.16em] text-card transition-colors hover:bg-coral"
        >
          Accept
        </button>
        <button
          onClick={() => choose("denied")}
          className="rounded-full border border-card-ink/25 px-5 py-2.5 text-[0.66rem] font-medium uppercase tracking-[0.16em] transition-colors hover:border-card-ink"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
