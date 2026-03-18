"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-surface-1/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      {scrolled && (
        <div
          className="absolute bottom-0 left-0 w-full h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,255,136,0.3), rgba(99,102,241,0.25), transparent)",
          }}
        />
      )}

      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M8 1L1 4V9C1 13 4 16.5 8 17C12 16.5 15 13 15 9V4L8 1Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent"
              />
            </svg>
            <span className="font-mono text-xs tracking-widest uppercase text-light/60">
              VibeShield
            </span>
          </div>
          <span className="badge badge-accent">Beta</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="nav-link text-xs uppercase tracking-wider text-light/50 hover:text-accent transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#cta"
          className="btn-glow text-xs uppercase tracking-wider bg-accent/10 text-accent px-4 py-2 rounded-full hover:bg-accent hover:text-dark hover:font-medium transition-all"
        >
          Get Early Access
        </a>
      </div>

      <style jsx>{`
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      `}</style>
    </header>
  );
}
