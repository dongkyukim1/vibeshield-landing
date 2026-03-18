"use client";

import { useState, useCallback, type FormEvent } from "react";
import { motion } from "framer-motion";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [cardStyle, setCardStyle] = useState({ rotateX: 0, rotateY: 0 });

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!email || !email.includes("@")) {
        setStatus("error");
        return;
      }
      setStatus("success");
      setEmail("");
    },
    [email]
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      setStatus("idle");
    },
    []
  );

  const handleCardMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setCardStyle({ rotateX: y * -4, rotateY: x * 4 });
    },
    []
  );

  const handleCardMouseLeave = useCallback(() => {
    setCardStyle({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <section
      id="cta"
      className="relative py-24 md:py-40 px-4 md:px-16 grid-pattern"
    >
      <div className="section-line mb-16" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left: CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-[8px] uppercase tracking-widest text-accent/60 block mb-4">
            Early Access
          </span>
          <h2 className="text-3xl md:text-5xl font-medium leading-tight mb-6">
            AI가 코드를 쓰는 시대,
            <br />
            <span className="text-accent">보안도 AI의 속도로.</span>
          </h2>
          <p className="text-light/50 mb-4 max-w-md">
            VibeShield를 시작합시다. 이메일을 남겨주시면 얼리 엑세스를
            안내해드립니다.
          </p>
          <p className="text-accent/80 text-sm font-medium mb-8 max-w-md">
            선착순 100명 Founding Member — 전 기능 무료 이용
          </p>

          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
            <div className="flex-grow relative">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className={`w-full bg-[#1E1E1E] rounded-lg px-4 py-3 text-sm text-light outline-none transition-colors placeholder:text-light/30 ${
                  status === "error"
                    ? "border border-danger"
                    : "border border-light/10 focus:border-accent/40"
                }`}
              />
            </div>
            <button
              type="submit"
              className="shrink-0 bg-accent text-dark rounded-lg px-6 py-3 text-sm font-medium transition-colors hover:bg-accent-dim"
            >
              Submit
            </button>
          </form>

          {status === "success" && (
            <p className="text-accent text-xs mt-3 font-mono">
              Thank you! We&apos;ll be in touch.
            </p>
          )}
          {status === "error" && (
            <p className="text-danger text-xs mt-3 font-mono">
              Please enter a valid email.
            </p>
          )}
        </motion.div>

        {/* Right: Membership card with 3D tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
          style={{ perspective: "1000px" }}
        >
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="relative w-full max-w-sm aspect-[512/320] rounded-2xl overflow-hidden shadow-2xl shadow-dark/50 shimmer"
            style={{
              transform: `rotateX(${cardStyle.rotateX}deg) rotateY(${cardStyle.rotateY}deg)`,
              transition: "transform 0.15s ease-out",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Card background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-dark to-dark border border-accent/20 rounded-2xl" />
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 40%, rgba(0,255,136,0.3) 0%, transparent 60%)",
              }}
            />

            {/* Card content */}
            <div className="relative h-full flex flex-col justify-between p-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="font-mono text-[8px] uppercase tracking-widest text-light/40">
                    Early Access
                  </span>
                </div>
                <h3 className="text-lg font-medium text-light">VibeShield</h3>
              </div>

              {/* Shield icon - larger and more prominent */}
              <div className="flex justify-center my-4">
                <svg
                  width="64"
                  height="74"
                  viewBox="0 0 48 56"
                  fill="none"
                  className="text-accent/30"
                >
                  <path
                    d="M24 2L4 12V26C4 40 14 50 24 54C34 50 44 40 44 26V12L24 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M16 28L22 34L34 22"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <span className="font-mono text-[8px] text-light/30 block">
                    Member
                  </span>
                  <span className="font-mono text-xs text-light/60">
                    Founding Member
                  </span>
                  <span className="font-mono text-[9px] text-accent/50 block mt-0.5">
                    선착순 100명
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[8px] text-light/30 block">
                    No.
                  </span>
                  <span className="font-mono text-xs text-light/60">
                    000.001
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fig label */}
      <div className="mt-8">
        <span className="font-mono text-[8px] uppercase tracking-widest text-light/20">
          Fig 6
        </span>
        <span className="font-mono text-[10px] text-light/30 ml-4">
          Be among the first to try VibeShield.
        </span>
      </div>
    </section>
  );
}
