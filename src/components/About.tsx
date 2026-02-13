"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const aboutDetails = [
  { label: "Location", value: "United Kingdom" },
  { label: "Degree", value: "MSc Machine Learning" },
  { label: "Focus", value: "ML & Frontend" },
  { label: "Publication", value: "IJCRT Journal" },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-8 md:px-6 bg-cream-dark relative overflow-hidden"
    >
      {/* Background Image */}
      {/* <div className="absolute inset-0 pointer-events-none" style={{ transform: "scaleX(-1)" }}>
        <Image
          src="/bg.png"
          alt=""
          fill
          className="object-cover"
        />
      </div> */}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-lg tracking-[0.3em] text-pink-medium font-[family-name:var(--font-cormorant)] font-bold text-4xl md:text-5xl">
            About Me
          </h2>
          
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Profile Image with Blob Frame */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96">
              <Image
                src="/profile.png"
                alt="Niharika Patil"
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </div>
          </div>

          {/* Text Content */}
          <div
            className={`transition-all duration-700 delay-200 overflow-hidden max-w-full ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-text-dark mb-6">
              Stressed, blessed, and coffee obsessed ☕
            </h3>

            <p className="text-text-light mb-4 leading-relaxed break-words">
             Hey, I&apos;m Nicks — a software engineer who happens to have two ML degrees but would rather
             build a sick website than train another model. I love turning ideas into real, working
             products — whether that&apos;s a real-time chat app, a risk analysis platform, or a pastry
             shop website (yes, really). I&apos;m the kind of person who&apos;ll learn a whole new tech stack
             over the weekend just to ship something cool. Currently looking for my next adventure in the UK.
            </p>
            <p className="text-text-light mb-4 leading-relaxed break-words">
              I don&apos;t just write code — I design the experience, stress about the spacing,
              then rewrite the whole thing at 2am because I thought of a better way.
            </p>

         
          </div>
        </div>
      </div>
    </section>
  );
}
