"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";

const experiences = [
  {
    date: "1 yr",
    title: "Marketing Lead",
    company: "Robotics Club, Savitribai Phule Pune University",
    description: [
      "Led recruitment marketing for the club, growing membership 150% (8 to 20 members) through sign-up campaigns and events that raised turnout.",
      "Ran an experiential marketing event where attendees built and tested robots hands-on, promoted with printed materials across campus.",
      "Pitched the project to external companies and secured 2 sponsors, managing the event budget against their funding.",
    ],
  },
  {
    date: "Jun 2023 - Jul 2024",
    title: "Software Developer Intern",
    company: "Tech R",
    description: [
      "Built a scoring and ranking system that surfaced all 3–4 target candidates within its top shortlist from a 60-candidate pool, replacing a full day of manual screening and cutting screening time by 25%.",
      "Added a reinforcement-learning feedback loop that refined match thresholds from user behaviour, lifting accuracy 30% over static keyword scoring — the same class of technique behind personalisation and propensity models.",
      "Worked directly with the recruiters using the system and translated their requirements into product decisions across 16+ reusable components.",
    ],
  },
  {
    date: "May 2025 - Sept 2025",
    title: "Research Assistant",
    company: "University of Nottingham",
    description: [
      "Built an automated, reproducible data pipeline processing 37,000 protein structures, containerised with multi-GPU training on HPC.",
      "Designed and trained a 41M-parameter model with an automated validation pipeline, reaching TM-scores of 0.91–0.98.",
    ],
  },
  {
    date: "11 mos",
    title: "Web Developer Intern",
    company: "Bracket Lab",
    description: [
      "Worked in the client-facing team on live commercial websites, changing how products and services were presented against each client's brief.",
      "Built a new client's landing page from a supplied design, translating the mockup into responsive HTML, CSS and JavaScript across devices and browsers.",
    ],
  },
  {
    date: "Current",
    title: "Customer Service",
    company: "John Lewis (7 mos) & Benugo",
    description: [
      "Front-of-house customer service in fast-paced, high-volume retail and catering — seeing first-hand what shoppers ask for, compare and walk away from.",
    ],
  },
];

const dotColors = ["bg-coral", "bg-gold", "bg-blue"];

export default function Experience() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])]);
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
      id="experience"
      className="border-t border-ink-line bg-ink px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading label="experience" accent="text-coral" />

        <div className="relative">
          <div className="absolute top-2 bottom-2 left-0 w-px bg-ink-line" />

          {experiences.map((exp, index) => (
            <div
              key={exp.title}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`relative pb-12 pl-8 transition-all duration-700 last:pb-0 sm:pl-12 ${
                visibleItems.includes(index)
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              }`}
            >
              <span
                className={`absolute top-2 left-[-4px] h-2 w-2 rounded-full ${dotColors[index % dotColors.length]}`}
              />

              <p className="mb-2 font-[family-name:var(--font-jost)] text-[0.68rem] uppercase tracking-[0.22em] text-cream-dim">
                {exp.date}
              </p>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-cream">
                {exp.title}
              </h3>
              <p className="mb-5 text-sm text-gold">{exp.company}</p>

              <ul className="space-y-2.5">
                {exp.description.map((item) => (
                  <li
                    key={item}
                    className="relative pl-5 text-[0.92rem] leading-relaxed text-cream-dim"
                  >
                    <span className="absolute top-[0.6rem] left-0 h-1 w-1 rounded-full bg-cream-dim/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
