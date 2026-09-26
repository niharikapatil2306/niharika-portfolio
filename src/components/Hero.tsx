"use client";

import Image from "next/image";
import Link from "next/link";

const sidebarLinks = [
  {
    href: "#about",
    label: "about",
    blurb: "Spotted: an analyst with a soft spot for fashion.",
    color: "text-blue",
  },
  {
    href: "#projects",
    label: "projects",
    blurb: "The work everyone's talking about.",
    color: "text-gold",
  },
  {
    href: "/blog",
    label: "blog",
    blurb: "The latest 411 on fashion and the numbers.",
    color: "text-rose",
  },
  {
    href: "#contact",
    label: "contact",
    blurb: "Your invitation. Don't lose it in the mail.",
    color: "text-coral",
  },
];

export default function Hero() {
  return (
    // Always exactly one visible screen tall (svh excludes browser toolbars);
    // everything inside scales to the leftover height so nothing needs scrolling.
    <section className="relative isolate flex h-svh min-h-[30rem] flex-col overflow-hidden bg-ink px-5 pt-[4.75rem] pb-[max(1rem,3vh)] sm:px-8">
      <div className="bokeh pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,transparent_0%,rgba(10,10,11,0.55)_45%,rgba(10,10,11,0.94)_80%)]" />

      {/* Wordmark */}
      <header className="animate-fade-in shrink-0 text-center">
        <h1 className="font-[family-name:var(--font-jost)] text-[clamp(2.4rem,min(12vw,13vh),9.5rem)] font-extralight lowercase leading-[0.85] tracking-[-0.01em] text-cream">
          niharika patil
        </h1>
        <p className="mt-[1.2vh] font-[family-name:var(--font-jost)] text-[clamp(0.6rem,1.5vh,0.875rem)] uppercase tracking-[0.42em] text-cream-dim">
          Marketing &amp; Customer Insight Analyst
        </p>
      </header>

      <div className="mx-auto mt-[3vh] flex min-h-0 w-full max-w-6xl flex-1 items-center justify-center gap-16 [container-type:size]">
        {/* A few links beside the photo; the navbar has the full list */}
        <nav className="animate-fade-in-up animate-delay-200 hidden w-[17rem] shrink-0 flex-col justify-center gap-[4.5vh] lg:flex">
          {sidebarLinks.map((link) => (
            <Link key={link.href} href={link.href} className="group block">
              <h2
                className={`font-[family-name:var(--font-jost)] text-[clamp(1.4rem,3.8vh,2.1rem)] leading-tight font-light lowercase tracking-wide transition-colors ${link.color} group-hover:text-cream`}
              >
                {link.label}
              </h2>
              <p className="mt-1 max-w-[16rem] text-[clamp(0.72rem,1.6vh,0.85rem)] leading-snug text-cream-dim [@media(max-height:560px)]:hidden">
                {link.blurb}
              </p>
            </Link>
          ))}
        </nav>

        {/* The photo is the card: always square like the photo, as big as the free space allows */}
        <article className="animate-fade-in-up animate-delay-400 glass relative aspect-square w-[min(100cqw,100cqh)] shrink-0 overflow-hidden lg:w-[min(100cqh,calc(100cqw-21rem))] rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.6)]">
          <Image
            src="/profile.png"
            alt="Niharika Patil"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 75vh"
            className="object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 flex gap-2.5 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-[clamp(0.9rem,2.2vh,1.5rem)] pt-16">
            <Link
              href="#projects"
              className="whitespace-nowrap rounded-full bg-cream px-[clamp(1rem,1.6vw,1.5rem)] py-[clamp(0.55rem,1.3vh,0.75rem)] text-[clamp(0.6rem,1.3vh,0.72rem)] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-coral"
            >
              View My Work
            </Link>
            <Link
              href="#contact"
              className="whitespace-nowrap rounded-full border border-gold/60 bg-ink/30 px-[clamp(1rem,1.6vw,1.5rem)] py-[clamp(0.55rem,1.3vh,0.75rem)] text-[clamp(0.6rem,1.3vh,0.72rem)] font-medium uppercase tracking-[0.16em] text-cream backdrop-blur-sm transition-colors hover:border-cream hover:bg-cream hover:text-ink"
            >
              Get In Touch
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
