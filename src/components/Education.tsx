"use client";

import { useEffect, useRef, useState } from "react";

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
  const [pubVisible, setPubVisible] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pubRef = useRef<HTMLDivElement>(null);

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

    // Publication observer
    const pubObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPubVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (pubRef.current) {
      pubObserver.observe(pubRef.current);
    }

    return () => {
      observers.forEach((observer) => observer?.disconnect());
      pubObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Education Section */}
      <section id="education" className="py-24 px-6 bg-cream-dark">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-lg tracking-[0.3em] text-pink-medium font-[family-name:var(--font-cormorant)] font-bold text-4xl md:text-5xl">
              Education
            </h2>
    
          </div>

          {/* Education Cards */}
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`bg-cream rounded-3xl p-8 shadow-[0_10px_40px_rgba(255,165,184,0.1)] flex flex-col md:flex-row gap-8 items-center transition-all duration-700 ${
                  visibleCards.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Year Badge */}
                <div className="bg-pink-light/50 p-6 rounded-2xl text-center min-w-[140px]">
                  <p className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-text-dark">
                    {edu.years}
                  </p>
                </div>

                {/* Content */}
                <div className="text-center md:text-left">
                  <h3 className="font-[family-name:var(--font-cormorant)] font-bold text-2xl text-text-dark mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-text-light mb-3">{edu.school}</p>
                  <span className="inline-block px-4 py-1.5 bg-pink-light/50 rounded-full text-sm font-medium text-text-dark">
                    {edu.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publication Section */}
      
    </>
  );
}
