"use client";

import { useState } from "react";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { label: "X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
  ];

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // User closed the share sheet — fall through to copying.
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pill =
    "rounded-full border border-ink-line bg-ink-soft px-4 py-2.5 text-[0.66rem] uppercase tracking-[0.18em] text-cream-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-cream";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={share} className={pill}>
        {copied ? "Link copied" : "Share"}
      </button>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={pill}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
