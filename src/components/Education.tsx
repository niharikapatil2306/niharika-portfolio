"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";

const education = [
  {
    years: "2024 - 2025",
    degree: "Masters in Machine Learning in Science",
    school: "University of Nottingham, United Kingdom",
    grade: "Merit (2:1) | GPA: 3.4/4.0",
  },
  {
    years: "2020 - 2024",
    degree: "Bachelor of Engineering in AI & Machine Learning",
    school: "Savitribai Phule Pune University, India",
    grade: "First-Class with Distinction | GPA: 3.53/4.0",
  },
];

const publication = {
  title:
    "AI-Driven Talent Matching: Empowering HR Professionals with Reinforcement Learning",
  journal: "International Journal of Creative Research Thoughts (IJCRT), 11(24)",
  description:
    "Co-developed a reinforcement learning-based platform to enhance HR hiring by refining candidate recommendations through recruiter feedback, improving the talent matching process.",
};

export default function Education() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );

      observer.observe(ref);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  return (
    <section
      id="education"
      className="border-t border-ink-line bg-ink px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading label="education" accent="text-blue" />

        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={edu.degree}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`flex flex-col gap-6 rounded-2xl bg-card p-7 text-card-ink shadow-[0_18px_50px_rgba(0,0,0,0.45)] transition-all duration-700 sm:flex-row sm:items-center ${
                visibleCards.includes(index)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <p className="shrink-0 font-[family-name:var(--font-jost)] text-[0.68rem] uppercase tracking-[0.22em] text-card-dim sm:w-32">
                {edu.years}
              </p>

              <div className="sm:border-l sm:border-card-ink/15 sm:pl-6">
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold">
                  {edu.degree}
                </h3>
                <p className="mt-1 text-sm text-card-dim">{edu.school}</p>
                <p className="mt-3 text-[0.7rem] uppercase tracking-[0.14em] text-card-ink/70">
                  {edu.grade}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="mb-5 font-[family-name:var(--font-jost)] text-[0.68rem] uppercase tracking-[0.28em] text-cream-dim">
            Publication
          </h3>
          <div className="rounded-2xl border border-ink-line bg-ink-soft p-7">
            <p className="font-[family-name:var(--font-cormorant)] text-xl leading-snug text-cream md:text-2xl">
              {publication.title}
            </p>
            <p className="mt-2 text-sm text-gold">{publication.journal}</p>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-cream-dim">
              {publication.description}
            </p>
          </div>
        </div>

        <div className="mt-14">
          <h3 className="mb-5 font-[family-name:var(--font-jost)] text-[0.68rem] uppercase tracking-[0.28em] text-cream-dim">
            Extracurricular &amp; Leadership
          </h3>
          <div className="rounded-2xl border border-ink-line bg-ink-soft p-7">
            <p className="font-[family-name:var(--font-cormorant)] text-xl leading-snug text-cream md:text-2xl">
              Committee Member, Intercollegiate Drama Competition
            </p>
            <p className="mt-2 text-sm text-gold">6 months</p>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-cream-dim">
              Co-organised a multi-university drama competition, managing
              logistics and coordination across participating teams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
