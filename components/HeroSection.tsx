"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TerminalGraphic from "./TerminalGraphic";

const TYPING_LINES = [
  "AI가 코드를 쓰는 시대,",
  "보안은 누가 지키는가?",
];

const TRUST_BADGES = [
  {
    label: "OWASP Top 10",
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 1L1.5 3.5V6C1.5 8.5 3.4 10.7 6 11.5C8.6 10.7 10.5 8.5 10.5 6V3.5L6 1Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "CWE Top 25",
    icon: null,
  },
  {
    label: "100% 로컬",
    icon: null,
  },
];

export default function HeroSection() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (currentLine >= TYPING_LINES.length) {
      setIsTypingDone(true);
      return;
    }

    const line = TYPING_LINES[currentLine];
    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = line.slice(0, currentChar + 1);
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }, 300);
    return () => clearTimeout(timeout);
  }, [currentLine, currentChar]);

  return (
    <section className="relative min-h-screen flex items-center px-4 md:px-16 grid-pattern overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark to-dark/95 pointer-events-none" />

      {/* Large blurred accent circle in top-right */}
      <div className="absolute w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -top-20 -right-20 pointer-events-none" />

      {/* Decorative corner labels */}
      <div className="absolute top-6 left-4 md:left-16">
        <span className="font-mono text-[8px] uppercase tracking-widest text-light/30">
          VibeShield v1.0
        </span>
      </div>
      <div className="absolute top-6 right-4 md:right-16">
        <span className="font-mono text-[8px] uppercase tracking-widest text-light/30">
          AST-Powered Security
        </span>
      </div>

      {/* Two-column layout */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-32">
        {/* Left: Text */}
        <div>
          <div className="mb-8">
            {displayedLines.map((line, i) => (
              <h1
                key={i}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight tracking-tight"
              >
                {line}
                {i === currentLine && !isTypingDone && (
                  <span className="cursor-blink" />
                )}
              </h1>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTypingDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-base md:text-lg text-light/60 max-w-md leading-relaxed mb-10">
              9가지 바이브코딩 취약점을 AST 레벨에서 잡아냅니다.
              <br />
              코드는 절대 머신 밖으로 나가지 않습니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#cta"
                className="btn-glow inline-flex items-center justify-center gap-2 bg-accent text-dark px-8 py-3 rounded-lg font-medium hover:bg-accent-dim transition-colors"
              >
                <span>Get Started</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="rotate-[225deg]"
                >
                  <path
                    d="M1 13L13 1M13 1H1M13 1V13"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </a>
              <a
                href="#how"
                className="inline-flex items-center justify-center gap-2 border border-light/20 text-light/80 px-8 py-3 rounded-lg hover:border-light/40 transition-colors"
              >
                기술 소개
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mt-8">
              {TRUST_BADGES.map((badge) => (
                <span key={badge.label} className="badge badge-accent">
                  {badge.icon}
                  {badge.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Terminal */}
        <div className="hidden lg:block">
          <TerminalGraphic />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-light/30" />
      </motion.div>
    </section>
  );
}
