"use client";

import { motion } from "framer-motion";

type RoadmapStatus = "current" | "next" | "planned";

interface RoadmapItem {
  readonly version: string;
  readonly title: string;
  readonly status: RoadmapStatus;
  readonly date: string;
  readonly features: readonly string[];
}

const ROADMAP: readonly RoadmapItem[] = [
  {
    version: "v1.0",
    title: "Core Scanner",
    status: "current",
    date: "2026 Q2",
    features: [
      "9가지 취약점 AST 분석",
      "프로젝트 전체 스캔",
      "파일 와처 + 데스크톱 알림",
      "Git Hook 차단",
    ],
  },
  {
    version: "v1.1",
    title: "Auto-Fix Engine",
    status: "next",
    date: "2026 Q3",
    features: ["Codemod 원클릭 자동 수정", "취약 \u2192 안전 코드 변환"],
  },
  {
    version: "v1.2",
    title: "IDE Integration",
    status: "planned",
    date: "2026 Q3",
    features: ["VSCode Extension (LSP)", "Cursor / JetBrains 지원"],
  },
  {
    version: "v2.0",
    title: "AI-Powered",
    status: "planned",
    date: "2026 Q4",
    features: ["LLM 연동 수정 코드 생성", "커스텀 규칙 GUI"],
  },
  {
    version: "v3.0",
    title: "Lightweight",
    status: "planned",
    date: "2027 Q1",
    features: ["Tauri 마이그레이션 (~10MB)", "멀티 언어 (Python, Go)"],
  },
] as const;

function getStatusStyles(status: RoadmapStatus) {
  switch (status) {
    case "current":
      return {
        border: "border-accent",
        dot: "bg-accent",
        badge: "현재",
        badgeClass: "bg-accent/10 border border-accent/30 text-accent",
        textColor: "text-light/80",
      };
    case "next":
      return {
        border: "border-accent/50",
        dot: "border-2 border-accent/50 bg-transparent",
        badge: "다음",
        badgeClass: "bg-accent/5 border border-accent/20 text-accent/70",
        textColor: "text-light/60",
      };
    case "planned":
      return {
        border: "border-light/20",
        dot: "bg-light/20",
        badge: "",
        badgeClass: "",
        textColor: "text-light/40",
      };
  }
}

function RoadmapNode({
  item,
  index,
}: {
  readonly item: RoadmapItem;
  readonly index: number;
}) {
  const styles = getStatusStyles(item.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex flex-col items-center min-w-0 flex-1"
    >
      {/* Dot */}
      <div className={`w-3 h-3 rounded-full ${styles.dot} shrink-0 z-10`} />

      {/* Content card */}
      <div
        className={`mt-4 rounded-xl ${styles.border} border p-4 w-full bg-[rgba(30,30,30,0.4)] backdrop-blur-sm`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[10px] text-accent/60">
            {item.version}
          </span>
          {styles.badge && (
            <span
              className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full ${styles.badgeClass}`}
            >
              {styles.badge}
            </span>
          )}
        </div>

        <h4 className={`text-sm font-medium ${styles.textColor} mb-1`}>
          {item.title}
        </h4>
        <span className="font-mono text-[10px] text-light/30 block mb-3">
          {item.date}
        </span>

        <ul className="space-y-1.5">
          {item.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-1.5 text-[11px] text-light/40"
            >
              <span className="text-accent/40 mt-0.5 shrink-0 text-[8px]">
                {"\u25CF"}
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function RoadmapNodeMobile({
  item,
  index,
}: {
  readonly item: RoadmapItem;
  readonly index: number;
}) {
  const styles = getStatusStyles(item.status);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex gap-4"
    >
      {/* Dot + vertical line */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-3 h-3 rounded-full ${styles.dot} z-10`} />
        <div className="w-px flex-1 bg-gradient-to-b from-accent/20 to-light/10" />
      </div>

      {/* Content card */}
      <div
        className={`rounded-xl ${styles.border} border p-4 mb-4 flex-1 bg-[rgba(30,30,30,0.4)] backdrop-blur-sm`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[10px] text-accent/60">
            {item.version}
          </span>
          {styles.badge && (
            <span
              className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full ${styles.badgeClass}`}
            >
              {styles.badge}
            </span>
          )}
        </div>

        <h4 className={`text-sm font-medium ${styles.textColor} mb-1`}>
          {item.title}
        </h4>
        <span className="font-mono text-[10px] text-light/30 block mb-3">
          {item.date}
        </span>

        <ul className="space-y-1.5">
          {item.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-1.5 text-[11px] text-light/40"
            >
              <span className="text-accent/40 mt-0.5 shrink-0 text-[8px]">
                {"\u25CF"}
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="relative py-24 md:py-40 px-4 md:px-16">
      <div className="section-line mb-16" />

      <span className="font-mono text-[8px] uppercase tracking-widest text-light/30 block mb-4">
        Roadmap
      </span>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl md:text-4xl font-medium mb-4"
      >
        제품 로드맵
      </motion.h2>
      <p className="text-light/40 text-sm mb-16">
        지금 가입하면 Founding Member로 전체 로드맵 무료 이용
      </p>

      {/* Desktop: horizontal timeline */}
      <div className="hidden md:block">
        {/* Connecting line */}
        <div className="relative">
          <div
            className="absolute top-[5px] left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, var(--accent), rgba(0,255,136,0.3) 40%, rgba(232,228,224,0.1) 100%)",
            }}
          />
          <div className="grid grid-cols-5 gap-4">
            {ROADMAP.map((item, i) => (
              <RoadmapNode key={item.version} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden">
        {ROADMAP.map((item, i) => (
          <RoadmapNodeMobile key={item.version} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
