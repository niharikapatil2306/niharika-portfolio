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
    <section className="relative isolate overflow-hidden bg-ink pt-28 pb-20 sm:pt-32">
      <div className="bokeh pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,transparent_0%,rgba(10,10,11,0.55)_45%,rgba(10,10,11,0.94)_80%)]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Wordmark */}
        <header className="animate-fade-in text-center">
          <h1 className="font-[family-name:var(--font-jost)] text-[clamp(2.75rem,12vw,9.5rem)] font-extralight lowercase leading-[0.85] tracking-[-0.01em] text-cream">
            niharika patil
          </h1>
          <p className="mt-5 font-[family-name:var(--font-jost)] text-[0.7rem] uppercase tracking-[0.42em] text-cream-dim sm:text-sm">
            Marketing &amp; Customer Insight Analyst
          </p>
        </header>

        <div className="mt-14 grid gap-12 lg:mx-auto lg:max-w-5xl lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
          {/* Sidebar index */}
          <nav className="animate-fade-in-up animate-delay-200 order-2 space-y-6 lg:order-1">
            {sidebarLinks.map((link) => (
              <Link key={link.href} href={link.href} className="group block">
                <h2
                  className={`font-[family-name:var(--font-jost)] text-2xl font-light lowercase tracking-wide transition-colors ${link.color} group-hover:text-cream`}
                >
                  {link.label}
                </h2>
                <p className="mt-1 max-w-[16rem] text-[0.8rem] leading-snug text-cream-dim">
                  {link.blurb}
                </p>
              </Link>
            ))}
          </nav>

          {/* The post card */}
          <article className="animate-fade-in-up animate-delay-400 order-1 mx-auto w-full max-w-lg rounded-2xl glass p-5 text-card-ink shadow-[0_24px_70px_rgba(0,0,0,0.6)] sm:p-7 lg:order-2">
            <p className="font-[family-name:var(--font-cormorant)] text-xl font-semibold sm:text-2xl">
              Currently: open to marketing analyst roles in fashion &amp; retail, UK
            </p>

            <div className="relative mt-5 aspect-[4/3] w-full overflow-hidden rounded-xl bg-ink-soft">
              <Image
                src="/profile.png"
                alt="Niharika Patil"
                fill
                priority
                quality={100}
                sizes="(max-width: 1024px) 90vw, 512px"
                className="object-cover object-top"
              />
            </div>

            <p className="mt-5 text-[0.92rem] leading-relaxed text-card-dim">
              I turn data into decisions people actually act on — SQL, Python and
              Power BI, with dashboards built for people who don&apos;t read code.
              Two degrees in machine learning, a marketing lead role, retail
              experience at John Lewis, and a soft spot for fashion.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#projects"
                className="rounded-full bg-card-ink px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-card transition-colors hover:bg-coral"
              >
                View My Work
              </Link>
              <Link
                href="#contact"
                className="rounded-full border border-gold/45 px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-card-ink transition-colors hover:border-card-ink hover:bg-card-ink hover:text-card"
              >
                Get In Touch
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
