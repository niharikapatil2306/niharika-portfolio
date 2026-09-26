"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";

const skillCategories = [
  {
    title: "Data & BI",
    skills: [
      "Power BI",
      "Excel",
      "Dashboard design",
      "Data cleaning & analysis",
      "Stakeholder reporting",
      "pandas",
      "NumPy",
      "Matplotlib",
    ],
  },
  {
    title: "Databases",
    skills: ["SQL", "PostgreSQL", "Query & schema design", "pgvector"],
  },
  {
    title: "Programming",
    skills: ["Python", "SQL", "JavaScript", "TypeScript", "Java", "C++"],
  },
  {
    title: "Web & CMS",
    skills: [
      "WordPress",
      "React",
      "Next.js",
      "Vue.js",
      "Tailwind",
      "HTML/CSS",
      "Landing pages",
      "UI design",
    ],
  },
  {
    title: "ML & AI",
    skills: [
      "PyTorch",
      "LangChain",
      "RAG",
      "LLMs",
      "NLP",
      "Reinforcement learning",
    ],
  },
  {
    title: "Cloud & Tools",
    skills: ["Microsoft Azure", "AWS", "Docker", "Git & GitHub", "Agile & Scrum"],
  },
];

const spokenLanguages = ["English", "French", "German", "Korean"];

export default function Skills() {
  const [visibleCategories, setVisibleCategories] = useState<number[]>([]);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = categoryRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCategories((prev) => [...new Set([...prev, index])]);
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
      id="skills"
      className="border-t border-ink-line bg-ink px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading label="skills" accent="text-rose" />

        <div className="space-y-11">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              ref={(el) => {
                categoryRefs.current[index] = el;
              }}
              className={`transition-all duration-700 ${
                visibleCategories.includes(index)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="mb-4 font-[family-name:var(--font-jost)] text-[0.68rem] uppercase tracking-[0.28em] text-cream-dim">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="cursor-default rounded-full border border-ink-line bg-ink-soft px-5 py-2 text-sm text-cream transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:text-gold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="mb-5 font-[family-name:var(--font-jost)] text-[0.68rem] uppercase tracking-[0.28em] text-cream-dim">
            Languages I speak
          </h3>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {spokenLanguages.map((language) => (
              <li
                key={language}
                className="rounded-xl bg-card px-5 py-4 text-center font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-card-ink shadow-[0_12px_36px_rgba(0,0,0,0.45)]"
              >
                {language}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
