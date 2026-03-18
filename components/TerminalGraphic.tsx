"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalLine {
  text: string;
  type: "command" | "info" | "warning" | "success" | "error" | "dim";
  delay: number;
}

const TERMINAL_LINES: TerminalLine[] = [
  { text: "$ vibeshield scan ./src", type: "command", delay: 0 },
  { text: "", type: "dim", delay: 300 },
  { text: "Scanning 127 files across 9 rule engines...", type: "info", delay: 600 },
  { text: "", type: "dim", delay: 800 },
  { text: "src/api/users.ts:14", type: "dim", delay: 1000 },
  { text: "  CRITICAL  SQL Injection \u2014 unsanitized query input", type: "error", delay: 1200 },
  { text: "", type: "dim", delay: 1400 },
  { text: "src/api/admin.ts:8", type: "dim", delay: 1500 },
  { text: "  CRITICAL  Missing Auth \u2014 no middleware on /api/admin", type: "error", delay: 1700 },
  { text: "", type: "dim", delay: 1900 },
  { text: "src/lib/supabase.ts:5", type: "dim", delay: 2000 },
  { text: "  HIGH  RLS Disabled \u2014 client-side anon query without RLS", type: "error", delay: 2200 },
  { text: "", type: "dim", delay: 2400 },
  { text: "src/config/stripe.ts:3", type: "dim", delay: 2500 },
  { text: "  HIGH  Secret Exposed \u2014 hardcoded API key in source", type: "error", delay: 2700 },
  { text: "", type: "dim", delay: 2900 },
  { text: "src/components/Comment.tsx:22", type: "dim", delay: 3000 },
  { text: "  MEDIUM  XSS \u2014 dangerouslySetInnerHTML without sanitize", type: "error", delay: 3200 },
  { text: "", type: "dim", delay: 3400 },
  { text: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", type: "dim", delay: 3600 },
  { text: "", type: "dim", delay: 3700 },
  { text: "  5 vulnerabilities (2 critical, 2 high, 1 medium)", type: "info", delay: 3800 },
  { text: "  5 auto-fixes available", type: "success", delay: 4100 },
  { text: "", type: "dim", delay: 4300 },
  { text: "$ vibeshield fix --apply", type: "command", delay: 4500 },
  { text: "", type: "dim", delay: 4700 },
  { text: "  \u2713 All 5 vulnerabilities fixed", type: "success", delay: 5000 },
  { text: "  \u2713 Safe to commit", type: "success", delay: 5300 },
];

const TYPE_COLORS: Record<TerminalLine["type"], string> = {
  command: "text-accent",
  info: "text-light/70",
  warning: "text-yellow-400/80",
  success: "text-accent",
  error: "text-danger",
  dim: "text-light/20",
};

export default function TerminalGraphic() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    TERMINAL_LINES.forEach((line, i) => {
      const timeout = setTimeout(() => {
        setVisibleCount(i + 1);
      }, line.delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const isComplete = visibleCount >= TERMINAL_LINES.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative"
    >
      {/* Gradient glow effect behind terminal */}
      <div
        className="absolute -inset-4 rounded-3xl blur-2xl"
        style={{
          background: "linear-gradient(to right, rgba(0,255,136,0.05), rgba(99,102,241,0.05), rgba(0,255,136,0.05))",
        }}
      />

      {/* Terminal window */}
      <div className="relative bg-[#0D0D0D] border border-light/10 rounded-xl overflow-hidden shadow-2xl shadow-dark/80">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-light/5 bg-[#141414]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="font-mono text-[10px] text-light/30">
            vibeshield — ~/my-project
          </span>
          <div className="w-16" />
        </div>

        {/* Terminal content */}
        <div className="p-4 md:p-5 font-mono text-[11px] md:text-xs leading-relaxed h-[400px] md:h-[440px] overflow-hidden">
          <AnimatePresence>
            {TERMINAL_LINES.slice(0, visibleCount).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={`${TYPE_COLORS[line.type]} ${
                  line.text === "" ? "h-3" : ""
                }`}
              >
                {line.text}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Blinking cursor at the end */}
          {isComplete && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="cursor-blink text-accent"
            />
          )}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-light/5 bg-[#141414]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  isComplete
                    ? "bg-accent"
                    : "bg-yellow-400 animate-pulse"
                }`}
              />
              <span className="font-mono text-[9px] text-light/30">
                {isComplete ? "SECURE" : "SCANNING"}
              </span>
            </div>
            <span className="font-mono text-[9px] text-light/20">
              9 ENGINES
            </span>
          </div>
          <span className="font-mono text-[9px] text-light/20">
            local · no data sent
          </span>
        </div>
      </div>
    </motion.div>
  );
}
