"use client";

import Image from "next/image";
import Link from "next/link";

const sidebarLinks = [
  {
    href: "#about",
    label: "about",
    blurb: "Who I am, and why fashion needs good data.",
    color: "text-blue",
  },
  {
    href: "#experience",
    label: "experience",
    blurb: "Campaigns, internships, research and retail.",
    color: "text-coral",
  },
  {
    href: "#projects",
    label: "projects",
    blurb: "Dashboards, apps and data work, start to finish.",
    color: "text-gold",
  },
  {
    href: "#skills",
    label: "skills",
    blurb: "SQL, Python, Power BI — and four languages.",
    color: "text-rose",
  },
  {
    href: "#education",
    label: "education",
    blurb: "An MSc from Nottingham and a published paper.",
    color: "text-blue",
  },
  {
    href: "/blog",
    label: "blog",
    blurb: "Notes on fashion, marketing and the numbers behind them.",
    color: "text-gold",
  },
  {
    href: "#contact",
    label: "contact",
    blurb: "The fastest way to reach me.",
    color: "text-coral",
  },
];

export default function Hero() {
  return (
    // Exactly one screen tall on desktop, so the whole home view fits without scrolling.
    <section className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-ink px-5 pt-20 pb-8 sm:px-8 lg:h-svh lg:min-h-[40rem]">
      <div className="bokeh pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,transparent_0%,rgba(10,10,11,0.55)_45%,rgba(10,10,11,0.94)_80%)]" />

      {/* Wordmark */}
      <header className="animate-fade-in shrink-0 text-center">
        <h1 className="font-[family-name:var(--font-jost)] text-[clamp(2.75rem,min(12vw,15vh),9.5rem)] font-extralight lowercase leading-[0.85] tracking-[-0.01em] text-cream">
          niharika patil
        </h1>
        <p className="mt-[1.6vh] font-[family-name:var(--font-jost)] text-[0.7rem] uppercase tracking-[0.42em] text-cream-dim sm:text-sm">
          Marketing &amp; Customer Insight Analyst
        </p>
      </header>

      <div className="mx-auto mt-[4vh] flex min-h-0 w-full max-w-5xl justify-center gap-16 lg:flex-1">
        {/* Sidebar index — spreads to the photo's height */}
        <nav className="animate-fade-in-up animate-delay-200 hidden w-60 shrink-0 flex-col justify-between lg:flex">
          {sidebarLinks.map((link) => (
            <Link key={link.href} href={link.href} className="group block">
              <h2
                className={`font-[family-name:var(--font-jost)] text-[clamp(1.1rem,2.7vh,1.5rem)] leading-tight font-light lowercase tracking-wide transition-colors ${link.color} group-hover:text-cream`}
              >
                {link.label}
              </h2>
              <p className="mt-0.5 max-w-[15rem] text-[clamp(0.68rem,1.45vh,0.8rem)] leading-snug text-cream-dim">
                {link.blurb}
              </p>
            </Link>
          ))}
        </nav>

        {/* The photo is the card */}
        <article className="animate-fade-in-up animate-delay-400 glass relative aspect-[4/5] w-full max-w-lg self-start sm:aspect-square overflow-hidden rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.6)] lg:h-full lg:w-auto lg:max-w-none">
          <Image
            src="/profile.png"
            alt="Niharika Patil"
            fill
            priority
            quality={100}
            sizes="(max-width: 1024px) 90vw, 70vh"
            className="object-cover object-top"
          />

          <div className="absolute inset-x-0 bottom-0 flex gap-2.5 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-5 pt-16 sm:p-6 sm:pt-20">
            <Link
              href="#projects"
              className="rounded-full bg-cream px-4 py-2.5 text-[0.62rem] font-medium uppercase tracking-[0.16em] whitespace-nowrap sm:px-6 sm:py-3 sm:text-[0.72rem] sm:tracking-[0.18em] text-ink transition-colors hover:bg-coral"
            >
              View My Work
            </Link>
            <Link
              href="#contact"
              className="rounded-full border border-gold/60 bg-ink/30 px-4 py-2.5 text-[0.62rem] font-medium uppercase tracking-[0.16em] whitespace-nowrap sm:px-6 sm:py-3 sm:text-[0.72rem] sm:tracking-[0.18em] text-cream backdrop-blur-sm transition-colors hover:border-cream hover:bg-cream hover:text-ink"
            >
              Get In Touch
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
