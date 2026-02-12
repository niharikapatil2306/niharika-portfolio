"use client";

import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    date: "May 2025 - Sept 2025",
    title: "AI Researcher",
    company: "University of Nottingham",
    description: [
      "Developed the first systematic AI framework combining diffusion models with evolutionary insights for thermostable RuBisCO variants",
      "Curated dataset of 36,000+ annotated sequences and 17,000 extremophilic proteins for multi-task learning",
      "Achieved TM-scores of 0.91-0.98 validated via AlphaFold with preserved catalytic activity at 40-60°C",
    ],
  },
  {
    date: "Dec 2022 - Feb 2023",
    title: "ML Intern",
    company: "AWS Academy, Pune, India",
    description: [
      "Built AWS Lex chatbot handling 10+ conversation intents with sub-2 second response times",
      "Developed SageMaker ML models achieving 85%+ accuracy for mental health sentiment analysis",
      "Integrated AWS Rekognition for image processing, improving workflow efficiency by 25%",
    ],
  },
];

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

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-lg tracking-[0.3em] text-pink-medium font-[family-name:var(--font-cormorant)] font-bold text-4xl md:text-5xl">
            Experience
          </h2>
  
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-light to-pink-accent" />

          {/* Timeline Items */}
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => { itemRefs.current[index] = el; }}
              className={`relative pl-12 pb-12 transition-all duration-700 ${
                visibleItems.includes(index)
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-5"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-6px] top-0 w-3.5 h-3.5 rounded-full bg-pink-accent border-[3px] border-cream" />

              <p className="text-sm font-medium text-pink-accent mb-2">{exp.date}</p>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-text-dark mb-1">
                {exp.title}
              </h3>
              <p className="text-text-light mb-4">{exp.company}</p>

              <ul className="space-y-2">
                {exp.description.map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-6 text-text-light text-[0.95rem] leading-relaxed"
                  >
                    <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-pink-soft" />
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
