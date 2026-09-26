"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";

const aboutDetails = [
  { label: "Location", value: "Nottingham, UK — open to relocate" },
  { label: "Focus", value: "Marketing & Customer Insight" },
  { label: "Right to work", value: "UK Graduate Visa, to Jan 2028" },
  { label: "Languages", value: "English · French · German · Korean" },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="border-t border-ink-line bg-ink px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading label="about" accent="text-blue" />

        <div className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:gap-14">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <h3 className="mb-6 font-[family-name:var(--font-cormorant)] text-2xl text-cream md:text-3xl">
              Stressed, blessed, and coffee obsessed
            </h3>

            <p className="mb-4 leading-relaxed text-cream-dim">
              Hey, I&apos;m Nicks — an analyst with an MSc in Machine Learning from
              the University of Nottingham, now pointing all of it at marketing.
              I work in SQL, Python and Power BI, query databases directly, and
              build dashboards that make sense to people who will never open a
              notebook. The goal is always the same: data that turns into a
              decision someone actually acts on.
            </p>
            <p className="mb-4 leading-relaxed text-cream-dim">
              I&apos;ve run recruitment campaigns as a club marketing lead, built
              client landing pages to a brief, and worked the shop floor at John
              Lewis — so I&apos;ve seen the customer from both sides of the
              spreadsheet.
            </p>
            <p className="leading-relaxed text-cream-dim">
              Where I want to be: a marketing or customer insight team in fashion
              and retail, figuring out who buys what, why, and what to do about
              it. Available immediately, anywhere in the UK.
            </p>
          </div>

          <dl
            className={`h-fit rounded-2xl glass p-7 text-card-ink shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all delay-200 duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            {aboutDetails.map((detail, index) => (
              <div
                key={detail.label}
                className={`py-3 ${
                  index !== aboutDetails.length - 1
                    ? "border-b border-card-ink/12"
                    : ""
                }`}
              >
                <dt className="text-[0.62rem] uppercase tracking-[0.22em] text-card-dim">
                  {detail.label}
                </dt>
                <dd className="mt-1.5 font-[family-name:var(--font-cormorant)] text-xl font-semibold">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
