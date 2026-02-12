"use client";

import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Python", "JavaScript", "TypeScript", "SQL", "R", "Java", "HTML/CSS"],
  },
  {
    title: "Frontend & Frameworks",
    skills: [
      "React.js",
      "Node.js",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "Electron.js",
      "FastAPI",
      "Django",
      "Flask",
    ],
  },
  {
    title: "ML/AI & Data Science",
    skills: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "OpenCV",
      "LangChain",
      "NLP",
      "Deep Learning",
      "CNNs",
    ],
  },
  {
    title: "Cloud & Big Data",
    skills: [
      "AWS SageMaker",
      "AWS Lex",
      "AWS Rekognition",
      "Firebase",
      "Apache Spark",
      "PySpark",
      "Databricks",
      "MongoDB",
    ],
  },
];

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

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-lg tracking-[0.3em] text-pink-medium font-[family-name:var(--font-cormorant)] font-bold text-4xl md:text-5xl">
            Skills
          </h2>
        </div>

        {/* Skills Categories */}
        <div className="space-y-12">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              ref={(el) => { categoryRefs.current[index] = el; }}
              className={`transition-all duration-700 ${
                visibleCategories.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="font-[family-name:var(--font-cormorant)] font-bold text-2xl text-text-dark mb-3 pb-1 border-b-2 border-pink-light">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className="px-6 py-2 bg-pink-light/50 rounded-full text-text-dark font-medium shadow-[0_5px_20px_rgba(255,165,184,0.5)] border border-transparent hover:border-pink-medium hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,165,184,0.2)] transition-all duration-300 cursor-default"
                    style={{
                      transitionDelay: visibleCategories.includes(index)
                        ? `${skillIndex * 50}ms`
                        : "0ms",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
