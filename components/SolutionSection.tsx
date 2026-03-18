"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    step: "01",
    title: "Detect",
    subtitle: "AST 기반 실시간 탐지",
    desc: "Babel/tree-sitter로 코드를 AST로 파싱하고, Visitor 패턴으로 9가지 취약 패턴을 매칭합니다. Taint Analysis로 사용자 입력의 데이터 흐름까지 추적합니다.",
    techs: ["AST Parsing", "Pattern Matching", "Taint Analysis"],
  },
  {
    step: "02",
    title: "Protect",
    subtitle: "실시간 감시 + 자동 차단",
    desc: "chokidar 파일 와처가 저장 즉시 재분석하고, 데스크톱 알림으로 즉시 경고합니다. Git Hook이 취약 코드의 커밋과 푸시를 자동 차단합니다.",
    techs: ["File Watcher", "Desktop Alert", "Git Hooks"],
  },
  {
    step: "03",
    title: "Heal",
    subtitle: "Codemod 자동 수정",
    desc: "취약한 코드를 안전한 코드로 AST 레벨에서 변환합니다. SQL → Parameterized Query, Hardcoded → env 변수, dangerouslySetInnerHTML → DOMPurify.",
    techs: ["Codemod", "Auto-Fix", "Safe Patterns"],
  },
] as const;

const PIPELINE = [
  { label: "소스 코드", sub: ".ts .tsx .js" },
  { label: "AST 파싱", sub: "Babel / tree-sitter" },
  { label: "스코프 분석", sub: "변수 · 임포트 추적" },
  { label: "패턴 매칭", sub: "9가지 취약점 룰" },
  { label: "Taint 추적", sub: "입력 → 위험함수" },
  { label: "결과 리포트", sub: "severity · auto-fix" },
] as const;

const LOCAL_POINTS = [
  {
    text: "코드는 절대 머신 밖으로 나가지 않습니다",
  },
  {
    text: "인터넷 없이도 완벽하게 작동합니다",
  },
  {
    text: "기업 보안 정책과 100% 호환됩니다",
  },
] as const;

export default function SolutionSection() {
  return (
    <section id="solution" className="relative py-24 md:py-40 px-4 md:px-16">
      <div className="section-line mb-16" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <span className="font-mono text-[8px] uppercase tracking-widest text-accent/60 block mb-4">
          Solution
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight max-w-3xl">
          만약 AI가 코드를 쓰는
          <br />
          바로 그 순간,
          <br />
          <span className="text-accent">보안도 함께 작동한다면?</span>
        </h2>
      </motion.div>

      {/* Three pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-24">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative bg-[rgba(30,30,30,0.6)] backdrop-blur-xl border border-light/[0.08] rounded-2xl p-8"
          >
            <span className="font-mono text-6xl md:text-7xl font-medium text-light/5 absolute -top-2 right-4 select-none pointer-events-none">
              {feature.step}
            </span>
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-medium text-accent mb-1">
                {feature.title}
              </h3>
              <span className="text-sm text-light/40 block mb-4">
                {feature.subtitle}
              </span>
              <p className="text-sm md:text-base text-light/60 leading-relaxed mb-6">
                {feature.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {feature.techs.map((tech) => (
                  <span
                    key={tech}
                    className="bg-accent/10 text-accent text-[10px] font-mono px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AST Pipeline Visualization */}
      <div className="mb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <span className="font-mono text-[8px] uppercase tracking-widest text-light/30 block mb-2">
            AST Analysis Pipeline
          </span>
          <h3 className="text-xl md:text-2xl font-medium">
            분석 파이프라인
          </h3>
        </motion.div>

        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex items-center gap-0 min-w-[900px] md:min-w-0">
            {PIPELINE.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-[rgba(30,30,30,0.6)] backdrop-blur-xl border border-light/[0.08] rounded-xl px-5 py-4 flex flex-col items-center text-center min-w-[130px]"
                >
                  <span className="font-mono text-[10px] text-accent/50 mb-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-light/90 mb-1">
                    {step.label}
                  </span>
                  <span className="text-[10px] text-light/40 font-mono">
                    {step.sub}
                  </span>
                </motion.div>

                {i < PIPELINE.length - 1 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 + 0.15 }}
                    className="text-accent/40 text-lg mx-2 shrink-0"
                  >
                    &rarr;
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why local */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-[rgba(0,255,136,0.03)] backdrop-blur-xl border border-accent/[0.12] rounded-2xl p-8 md:p-12"
      >
        <h3 className="text-xl md:text-2xl font-medium mb-6">
          왜 로컬인가?
        </h3>
        <p className="text-base text-light/50 mb-8 max-w-2xl">
          보안 도구가 코드를 클라우드로 보낸다? 그건 모순입니다.
          <br />
          금고가 안전한지 확인하겠다고 금고 열쇠를 택배로 보내는 것과 같습니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOCAL_POINTS.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span className="text-sm text-light/70">{item.text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
