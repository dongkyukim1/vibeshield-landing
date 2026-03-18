"use client";

import { motion } from "framer-motion";

interface Tier {
  readonly name: string;
  readonly price: string;
  readonly period: string;
  readonly target: string;
  readonly features: readonly string[];
  readonly cta: string;
  readonly highlighted: boolean;
}

const TIERS: readonly Tier[] = [
  {
    name: "Free",
    price: "$0",
    period: "",
    target: "개인 \u00B7 오픈소스",
    features: [
      "OWASP Top 10 기본 탐지",
      "Git Hook 연동",
      "월 1,000회 스캔",
      "커뮤니티 지원",
    ],
    cta: "Download Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/월",
    target: "개인 개발자 \u00B7 스타트업",
    features: [
      "9가지 취약점 전체 탐지",
      "CWE Top 25 + AI 패턴",
      "IDE 플러그인 (VSCode/Cursor)",
      "Codemod 자동 수정",
      "무제한 스캔",
      "실시간 규칙 업데이트",
      "이메일 지원",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "문의",
    period: "",
    target: "팀 \u00B7 기업",
    features: [
      "Pro 전체 기능 포함",
      "팀 대시보드 & 관리 콘솔",
      "커스텀 규칙 엔진",
      "컴플라이언스 리포트",
      "On-premise 라이선스 서버",
      "전담 지원 & SLA",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
] as const;

function TierCard({ tier, index }: { readonly tier: Tier; readonly index: number }) {
  const baseClasses = tier.highlighted
    ? "bg-[rgba(0,255,136,0.03)] backdrop-blur-xl border-2 border-accent/30 rounded-2xl p-8 relative gradient-border"
    : "bg-[rgba(30,30,30,0.6)] backdrop-blur-xl border border-light/[0.08] rounded-2xl p-8";

  const buttonClasses = tier.highlighted
    ? "bg-accent text-dark hover:bg-accent-dim font-medium"
    : "border border-light/20 text-light/70 hover:border-light/40";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`${baseClasses} flex flex-col`}
    >
      {tier.highlighted && (
        <span className="absolute -top-3 left-6 bg-accent text-dark text-[10px] font-mono uppercase tracking-wider px-4 py-1 rounded-full font-medium">
          Most Popular
        </span>
      )}

      <div className="mb-6">
        <span className="font-mono text-xs uppercase tracking-wider text-light/40">
          {tier.name}
        </span>
        <div className="flex items-baseline gap-1 mt-2">
          <span className="text-4xl font-medium">{tier.price}</span>
          {tier.period && (
            <span className="text-light/40 text-sm">{tier.period}</span>
          )}
        </div>
        <span className="text-xs text-light/30 mt-1 block">
          {tier.target}
        </span>
      </div>

      <ul className="space-y-3 flex-grow mb-8">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <span className="text-accent mt-0.5 shrink-0">{"\u2713"}</span>
            <span className="text-light/60">{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href="#cta"
        className={`text-center py-3 rounded-lg text-sm font-medium transition-colors ${buttonClasses}`}
      >
        {tier.cta}
      </a>
    </motion.div>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 md:py-40 px-4 md:px-16">
      <div className="section-line mb-16" />

      <span className="font-mono text-[8px] uppercase tracking-widest text-light/30 block mb-4">
        Pricing
      </span>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl md:text-4xl font-medium mb-4"
      >
        요금제
      </motion.h2>
      <p className="text-light/40 text-sm mb-16">
        보안에 투자하는 가장 합리적인 방법
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TIERS.map((tier, i) => (
          <TierCard key={tier.name} tier={tier} index={i} />
        ))}
      </div>

      {/* ROI callout */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 flex justify-center"
      >
        <div
          className="relative w-full max-w-2xl rounded-2xl p-8 text-center"
          style={{
            background: "rgba(30, 30, 30, 0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(232, 228, 224, 0.08)",
            boxShadow: "0 0 80px rgba(0, 255, 136, 0.05)",
          }}
        >
          <div className="inline-flex items-center gap-6 md:gap-12">
            <div>
              <span className="text-2xl md:text-3xl font-medium text-accent">
                ~$200/월
              </span>
              <span className="block text-xs text-light/40 mt-1">
                예방 비용
              </span>
            </div>
            <span className="text-light/20 text-xl">vs</span>
            <div>
              <span className="text-2xl md:text-3xl font-medium text-danger">
                $4.9M
              </span>
              <span className="block text-xs text-light/40 mt-1">
                사고 비용 (1건당)
              </span>
            </div>
          </div>
          <p className="font-mono text-[10px] text-light/30 mt-4">
            보안 사고 한 건만 막아도 24,500배 ROI
          </p>
        </div>
      </motion.div>
    </section>
  );
}
