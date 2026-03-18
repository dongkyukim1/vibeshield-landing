"use client";

import { motion } from "framer-motion";

const STATS = [
  {
    value: "40%",
    label: "AI가 생성한 코드 중\n보안 취약점을 포함하는 비율",
    source: "Stanford University, 2025",
  },
  {
    value: "72%",
    label: "AI 생성 코드를\n리뷰 없이 그대로 사용하는 개발자",
    source: "GitHub Developer Survey, 2025",
  },
  {
    value: "$4.9M",
    label: "데이터 유출 사고 1건의\n평균 피해 비용",
    source: "IBM Cost of a Data Breach, 2025",
  },
];

export default function StatsSection() {
  return (
    <section
      id="problem"
      className="relative py-24 md:py-40 px-4 md:px-16 dot-pattern"
    >
      <div className="section-line mb-16" />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xl md:text-2xl text-light/60 max-w-2xl mb-20 leading-relaxed"
      >
        빠르게 만들고, 아무도 검증하지 않는다.
        <br />
        <span className="text-light">
          이것이 Vibe Coding의 치명적인 맹점입니다.
        </span>
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.value}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="glass-card p-8 relative overflow-hidden"
          >
            {/* Gradient accent line at top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/50 to-transparent" />

            <span className="font-mono text-[8px] uppercase tracking-widest text-light/20 block mb-4">
              Fig {i + 2}
            </span>
            <div className="text-5xl md:text-6xl lg:text-7xl font-medium text-accent stat-glow mb-4 tracking-tight">
              {stat.value}
            </div>
            <p className="text-sm md:text-base text-light/60 whitespace-pre-line leading-relaxed mb-2">
              {stat.label}
            </p>
            <span className="font-mono text-[10px] text-light/30 uppercase tracking-wider">
              {stat.source}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
