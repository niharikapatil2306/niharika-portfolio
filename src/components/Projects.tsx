"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const projects = [
  {
    title: "InvestX",
    date: "Nov 2025 - Jan 2026",
    description:
      "Quantitative risk analysis platform processing 61 UK equities with 6 risk models including Monte Carlo simulation, VaR, and EWMA forecasting. Built with FastAPI achieving 7s response time.",
    tags: ["Python", "FastAPI", "Monte Carlo", "Finance"],
    image: "/investx.jpeg", // placeholder
  },
  {
    title: "Autonomous Driving",
    date: "Mar 2025 - May 2025",
    description:
      "CNN-based steering model trained on 17,647 images achieving 35.8% improvement in prediction accuracy. Deployed real-time inference on Raspberry Pi with 180-200ms latency.",
    tags: ["CNN", "OpenCV", "Raspberry Pi", "Deep Learning"],
    image: "/car.jpeg",
  },
  {
    title: "SMOTE on Spark",
    date: "Mar 2025 - May 2025",
    description:
      "Distributed SMOTE pipelines in PySpark handling extreme class imbalance (578:1 ratio). Achieved 91.49% balanced accuracy for fraud detection while reducing execution time by 49%.",
    tags: ["PySpark", "Databricks", "Big Data", "ML"],
    image: "/smote.png", // placeholder
  },
  {
    title: "BlinkChat",
    date: "Jun 2024 - Dec 2024",
    description:
      "Real-time chat application with React and Firebase supporting 10+ concurrent users. Minimized latency to under 200ms and reduced bundle size by 35% using Vite.",
    tags: ["React", "Firebase", "Vite", "Real-time"],
    image: "/blink_chat.jpeg",
  },
  {
    title: "DessertLove",
    date: "Dec 2023 - Jun 2024",
    description:
      "Responsive pastry shop website with online ordering, reservations, and blog features. Increased page load speed by 40% with lazy loading and optimized checkout by 25%.",
    tags: ["React", "Firebase", "UI/UX", "E-commerce"],
    image: "/dessert-love.jpeg",
  },
  {
    title: "Text-to-SQL RAG",
    date: "Jan 2024 - May 2024",
    description:
      "AI assistant translating natural language to SQL queries using LangChain and Mistral-7B. Implemented FAISS vector store achieving 95% accuracy on test set.",
    tags: ["LangChain", "RAG", "NLP", "FAISS"],
    image: "/textsql.jpg", // placeholder
  },
];

export default function Projects() {
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

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section id="projects" className="py-24 px-6 bg-cream-dark">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-lg tracking-[0.3em] text-pink-medium font-[family-name:var(--font-cormorant)] font-bold text-4xl md:text-5xl">
            Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={`bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(255,165,184,0.1)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(255,165,184,0.2)] ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative w-full h-48 bg-gradient-to-br from-pink-light to-pink-soft">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-white/80 font-mono">
                      {project.title.split(' ').map(w => w[0]).join('')}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title & Date */}
                <h3 className="font-[family-name:var(--font-cormorant)] font-bold text-2xl text-text-dark mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-pink-accent mb-4">{project.date}</p>

                {/* Description */}
                <p className="text-text-light text-[0.9rem] leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
