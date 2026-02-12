"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const codeSnippets = [
  "const life = () => code();",
  "import { dreams } from 'future';",
  "while(alive) { learn(); }",
  "if (coffee) { code(); }",
  "npm install success",
  "git commit -m 'magic'",
  "async function dream() {}",
  "export default Me;",
  "<Hello world />",
  "console.log('Hi!');",
  "return awesome;",
  "const skills = ['ML', 'React'];",
  "await future.build();",
  "pip install intelligence",
  "model.fit(passion, data)",
  "torch.nn.Linear(in, out)",
  "SELECT * FROM skills;",
  "docker run success",
  "python train.py",
  "class Engineer extends Human {}",
];

interface FallingCode {
  id: number;
  text: string;
  left: number;
  delay: number;
  duration: number;
}

export default function Hero() {
  const [phase, setPhase] = useState<"code" | "error" | "hello" | "content">("code");
  const [typedText, setTypedText] = useState("");
  const [fallingCodes, setFallingCodes] = useState<FallingCode[]>([]);

  const fullText = "A Software Engineer & ML Enthusiast";

  // Generate falling code - more on the sides, less in center (umbrella effect)
  const generateFallingCode = useCallback(() => {
    const codes: FallingCode[] = [];
    for (let i = 0; i < 40; i++) {
      // Push code to edges - avoid center 30-70% range more often
      let leftPos = Math.random() * 100;
      if (Math.random() > 0.3) {
        // 70% chance to be on the sides
        leftPos = Math.random() > 0.5
          ? Math.random() * 25  // Left side 0-25%
          : 75 + Math.random() * 25; // Right side 75-100%
      }

      codes.push({
        id: i,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        left: leftPos,
        delay: Math.random() * 6,
        duration: 4 + Math.random() * 5,
      });
    }
    setFallingCodes(codes);
  }, []);

  useEffect(() => {
    generateFallingCode();

    // Phase transitions
    const errorTimer = setTimeout(() => setPhase("error"), 4000);
    const helloTimer = setTimeout(() => setPhase("hello"), 6000);
    const contentTimer = setTimeout(() => setPhase("content"), 8000);

    return () => {
      clearTimeout(errorTimer);
      clearTimeout(helloTimer);
      clearTimeout(contentTimer);
    };
  }, [generateFallingCode]);

  // Typing effect for subtitle
  useEffect(() => {
    if (phase === "content") {
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index <= fullText.length) {
          setTypedText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
      return () => clearInterval(typingInterval);
    }
  }, [phase]);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-16 relative overflow-hidden bg-cream">

      {/* Falling Code - Always visible, falls around content */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {fallingCodes.map((code) => (
          <div
            key={code.id}
            className={`absolute font-mono text-sm whitespace-nowrap animate-fall text-transparent ${
              phase === "content" ? "opacity-30" : ""
            }`}
            style={{
              left: `${code.left}%`,
              animationDelay: `${code.delay}s`,
              animationDuration: `${code.duration}s`,
            }}
          >
            {code.text}
          </div>
        ))}
      </div>

      {/* Phase 2: 404 Error */}
      {phase === "error" && (
        <div className="text-center z-10 animate-glitch">
          <h1 className="font-mono text-8xl md:text-9xl font-bold text-text-dark mb-4">
            404
          </h1>
          <p className="font-mono text-xl text-text-dark">
            developer_not_found...
          </p>
          <p className="font-mono text-sm text-text-light mt-2 animate-pulse">
            just kidding, loading...
          </p>
        </div>
      )}

      {/* Phase 3: Hello World */}
      {phase === "hello" && (
        <div className="text-center z-10">
          <div className="font-mono text-4xl md:text-6xl text-text-dark animate-pulse">
            <span className="text-pink-medium">{">"}</span> Hello, World!
            <span className="animate-blink">_</span>
          </div>
        </div>
      )}

      {/* Phase 4: Actual Content */}
      {phase === "content" && (
        <>

          <div className="text-center max-w-3xl animate-fade-in relative z-20 bg-cream/80 backdrop-blur-sm rounded-3xl p-10 shadow-[0_0_80px_40px_rgba(250,244,230,0.9)]">
            <p className="text-2xl tracking-[0.3em] font-bold uppercase text-text-dark mb-4">
              Hello, I&apos;m
            </p>

            <h1 className="font-[family-name:var(--font-cormorant)] text-5xl sm:text-6xl md:text-7xl font-semibold text-text-dark mb-4">
              Niharika Patil
            </h1>

            <p className="text-xl md:text-2xl text-text-light font-normal mb-6 font-mono">
              {typedText}
              <span className="animate-blink">|</span>
            </p>

            {/* <p className="text-md text-text-light max-w-xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in-up animate-delay-400">
              Master&apos;s student in Machine Learning with expertise in building scalable frontend
              applications and production-grade ML systems. Passionate about creating elegant
              solutions that bridge technology and user experience.
            </p> */}

            <div className="flex gap-4 justify-center flex-wrap opacity-0 animate-fade-in-up animate-delay-600">
              <Link
                href="#projects"
                className="px-8 py-4 rounded-full border-2 border-pink-medium text-text-dark font-medium tracking-wide hover:bg-pink-light hover:-translate-y-1 transition-all duration-300"
              >
                View My Work
              </Link>
              <Link
                href="#contact"
                className="px-8 py-4 rounded-full border-2 border-pink-medium text-text-dark font-medium tracking-wide hover:bg-pink-light hover:-translate-y-1 transition-all duration-300"
              >
                Get In Touch
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-soft">
            <svg
              className="w-8 h-8 text-pink-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </>
      )}
    </section>
  );
}
