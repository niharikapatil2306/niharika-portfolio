"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";

const projects = [
  {
    title: "InvestX",
    date: "Nov 2025 - Jan 2026",
    description:
      "Interactive risk dashboard across 60+ equities to support data-driven decisions. Automated pipeline ingests 250+ trading days per stock; 10 models incl. VaR and CVaR over 10,000 Monte Carlo runs.",
    tags: ["Python", "Dashboard", "Monte Carlo"],
    image: "/investx.jpeg",
    github: "https://github.com/niharikapatil2306/InvestX",
  },
  {
    title: "Movie Mate",
    date: "Feb 2026 – Mar 2026",
    description:
      "Designed the user journey so group consensus dropped from 100–200 swipes to 15–25, then built it end to end: React, a 13-endpoint REST API and a PostgreSQL database queried directly.",
    tags: ["User journey", "PostgreSQL", "React"],
    image: "/moviemate.png",
    github: "https://github.com/niharikapatil2306/moviemate",
    live: "https://moviemate-aihzm8t5w-niharikapatil2306s-projects.vercel.app/",
  },
  {
    title: "Autonomous Driving",
    date: "Mar 2025 - May 2025",
    description:
      "CNN-based steering model trained on 17,647 images achieving 35.8% improvement in prediction accuracy. Deployed real-time inference on Raspberry Pi with 180-200ms latency.",
    tags: ["CNN", "OpenCV", "Raspberry Pi", "Deep Learning"],
    image: "/car.jpeg",
    github: "https://github.com/niharikapatil2306/autonomous-driving",
  },
  {
    title: "SMOTE on Spark",
    date: "Mar 2025 - May 2025",
    description:
      "Distributed SMOTE pipelines in PySpark handling extreme class imbalance (578:1 ratio). Achieved 91.49% balanced accuracy for fraud detection while reducing execution time by 49%.",
    tags: ["PySpark", "Databricks", "Big Data", "ML"],
    image: "/smote.png",
  },
  {
    title: "BlinkChat",
    date: "Jun 2024 - Dec 2024",
    description:
      "Real-time chat application with React and Firebase supporting 10+ concurrent users. Minimized latency to under 200ms and reduced bundle size by 35% using Vite.",
    tags: ["React", "Firebase", "Vite", "Real-time"],
    image: "/blink_chat.jpeg",
    github: "https://github.com/niharikapatil2306/blink-chat",
    live: "https://blink-chat.netlify.app/",
  },
  {
    title: "DessertLove",
    date: "Dec 2023 - Jun 2024",
    description:
      "Responsive pastry shop website with online ordering, reservations, and blog features. Increased page load speed by 40% with lazy loading and optimized checkout by 25%.",
    tags: ["React", "Firebase", "UI/UX", "E-commerce"],
    image: "/dessert-love.jpeg",
    github: "https://github.com/niharikapatil2306/DessertLove",
    live: "https://dessert-love.netlify.app/",
  },
  {
    title: "Text-to-SQL RAG",
    date: "Jan 2024 - May 2024",
    description:
      "AI assistant translating natural language to SQL queries using LangChain and Mistral-7B. Implemented FAISS vector store achieving 95% accuracy on test set.",
    tags: ["LangChain", "RAG", "NLP", "FAISS"],
    image: "/textsql.jpg",
    github: "https://github.com/niharikapatil2306/Text2SQL",
  },
];

export default function Projects() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

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
      id="projects"
      className="border-t border-ink-line bg-ink px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="projects" accent="text-gold" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <article
              key={project.title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`flex flex-col overflow-hidden rounded-xl glass text-card-ink shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${
                visibleCards.includes(index)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="relative h-28 w-full bg-ink-soft">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-bold leading-tight">
                  {project.title}
                </h3>
                <p className="mt-0.5 text-[0.56rem] uppercase tracking-[0.18em] text-card-dim">
                  {project.date}
                </p>

                <p className="mt-2.5 line-clamp-4 text-[0.78rem] leading-relaxed text-card-dim">
                  {project.description}
                </p>

                <ul className="mt-3 flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-card-ink/20 px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.08em] text-card-dim"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-gold/45 px-3 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.14em] transition-colors hover:border-card-ink hover:bg-card-ink hover:text-card"
                    >
                      GitHub
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-card-ink px-3 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.14em] text-card transition-colors hover:bg-coral"
                    >
                      Live
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
