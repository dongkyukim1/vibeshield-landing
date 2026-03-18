"use client";

import { motion } from "framer-motion";

const STEPS = [
  { num: "01", title: "Install", desc: "npm i -g vibeshield", active: false },
  { num: "02", title: "Write", desc: "AI로 코드 작성", active: false },
  { num: "03", title: "Scan", desc: "저장 즉시 AST 분석", active: true },
  { num: "04", title: "Fix", desc: "원클릭 자동 수정", active: false },
  { num: "05", title: "Ship", desc: "검증된 코드 배포", active: false },
] as const;

const LOCAL_FEATURES = [
  "Security Engine — AST 분석 + 패턴 매칭",
  "IDE Plugin — VSCode / Cursor / JetBrains",
  "Git Hooks — pre-commit / pre-push 차단",
  "Auto-Fix — 취약 코드 → 안전한 코드 변환",
] as const;

const CLOUD_FEATURES = [
  "Rule Updates — 최신 취약점 패턴 자동 업데이트",
  "Team Dashboard — 팀 보안 스코어 모니터링",
  "License Server — 구독 인증 및 관리",
] as const;

function StepNode({
  step,
  index,
  isLast,
}: {
  step: (typeof STEPS)[number];
  index: number;
  isLast: boolean;
}) {
  const circleBase =
    "w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-medium shrink-0 relative z-10";
  const circleClass = step.active
    ? `${circleBase} bg-accent/20 border-2 border-accent text-accent shadow-[0_0_24px_rgba(0,255,136,0.3)]`
    : `${circleBase} bg-surface-2 border border-light/[0.12] text-light/50`;

  return (
    <>
      {/* Desktop: horizontal node */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="hidden md:flex flex-col items-center flex-1"
      >
        <div className={circleClass}>
          {step.num}
        </div>
        <span
          className={`text-sm font-medium mt-3 ${
            step.active ? "text-accent" : "text-light/80"
          }`}
        >
          {step.title}
        </span>
        <span className="text-[11px] text-light/40 mt-1 text-center">
          {step.desc}
        </span>
      </motion.div>

      {/* Desktop: connecting line */}
      {!isLast && (
        <div className="hidden md:block flex-1 max-w-[80px] h-[2px] bg-gradient-to-r from-accent/20 to-accent/20 self-start mt-6 -mx-2" />
      )}

      {/* Mobile: vertical node */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="flex md:hidden items-start gap-4 relative"
      >
        {/* Vertical connecting line */}
        {!isLast && (
          <div className="absolute left-6 top-12 w-[2px] h-[calc(100%+16px)] bg-gradient-to-b from-accent/20 to-accent/10" />
        )}
        <div className={circleClass}>
          {step.num}
        </div>
        <div className="pt-2">
          <span
            className={`text-sm font-medium ${
              step.active ? "text-accent" : "text-light/80"
            }`}
          >
            {step.title}
          </span>
          <span className="text-[11px] text-light/40 block mt-0.5">
            {step.desc}
          </span>
        </div>
      </motion.div>
    </>
  );
}

export default function ArchSection() {
  return (
    <section id="how" className="relative py-24 md:py-32 px-4 md:px-16 bg-dark">
      <div className="section-line mb-16" />

      <span className="font-mono text-[8px] uppercase tracking-widest text-light/30 block mb-4">
        Fig 5
      </span>

      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl md:text-4xl font-medium mb-16"
      >
        이렇게 작동합니다.
      </motion.h2>

      {/* Flow steps - Desktop: horizontal connected nodes */}
      <div className="hidden md:flex items-start mb-20">
        {STEPS.map((step, i) => (
          <StepNode
            key={step.num}
            step={step}
            index={i}
            isLast={i === STEPS.length - 1}
          />
        ))}
      </div>

      {/* Flow steps - Mobile: vertical connected nodes */}
      <div className="flex md:hidden flex-col gap-4 mb-20">
        {STEPS.map((step, i) => (
          <StepNode
            key={step.num}
            step={step}
            index={i}
            isLast={i === STEPS.length - 1}
          />
        ))}
      </div>

      {/* Architecture diagram */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Local card - glass-card-accent */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[rgba(0,255,136,0.03)] backdrop-blur-xl border border-accent/[0.12] rounded-2xl p-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-mono text-xs uppercase tracking-wider text-accent">
              Local — 개발자 머신
            </span>
          </div>
          <div className="space-y-4">
            {LOCAL_FEATURES.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="font-mono text-[10px] text-accent/40 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-light/70">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cloud card - glass-card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="bg-[rgba(30,30,30,0.6)] backdrop-blur-xl border border-light/[0.08] rounded-2xl p-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-light/40" />
            <span className="font-mono text-xs uppercase tracking-wider text-light/50">
              Cloud — 선택적 연결
            </span>
          </div>
          <div className="space-y-4">
            {CLOUD_FEATURES.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="font-mono text-[10px] text-light/20 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-light/50">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <p className="font-mono text-[10px] text-light/30 text-center mt-8">
        모든 분석은 로컬에서 실행. 코드가 외부로 전송되지 않습니다.
      </p>
      <p className="font-mono text-[10px] text-light/20 text-center mt-2">
        Electron 기반 데스크톱 앱 · 크로스 플랫폼 (Windows, macOS, Linux)
      </p>
    </section>
  );
}
