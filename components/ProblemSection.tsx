"use client";

import { motion } from "framer-motion";

type Severity = "CRITICAL" | "HIGH" | "MEDIUM";

interface Vulnerability {
  readonly title: string;
  readonly cwe: string;
  readonly severity: Severity;
  readonly desc: string;
}

interface ToolComparison {
  readonly tool: string;
  readonly limitation: string;
  readonly vs: string;
}

const VULNERABILITIES: readonly Vulnerability[] = [
  { title: "SQL Injection", cwe: "CWE-89", severity: "CRITICAL", desc: "AI가 쿼리를 생성하면서 사용자 입력을 직접 삽입" },
  { title: "접근 권한 누락", cwe: "CWE-862", severity: "CRITICAL", desc: "인증 미들웨어 없이 API 라우트를 생성" },
  { title: "RLS 미활성화", cwe: "CWE-732", severity: "HIGH", desc: "Supabase 테이블에 Row Level Security 누락" },
  { title: "Secret Key 노출", cwe: "CWE-798", severity: "HIGH", desc: "API 키를 코드에 하드코딩하여 Git에 커밋" },
  { title: "결제 로직 노출", cwe: "CWE-602", severity: "HIGH", desc: "결제 금액을 클라이언트 state로 관리" },
  { title: "XSS", cwe: "CWE-79", severity: "MEDIUM", desc: "사용자 입력을 검증 없이 HTML에 직접 렌더링" },
  { title: "콘솔 데이터 노출", cwe: "CWE-532", severity: "MEDIUM", desc: "민감한 데이터를 console.log로 출력" },
  { title: "클라이언트 인증", cwe: "CWE-602", severity: "MEDIUM", desc: "권한 체크를 localStorage/useState로 구현" },
  { title: "패키지 환각", cwe: "CWE-829", severity: "HIGH", desc: "AI가 존재하지 않는 npm 패키지를 추천" },
];

const TOOL_COMPARISON: readonly ToolComparison[] = [
  { tool: "ESLint / SonarQube", limitation: "AI 코드 패턴 미인식", vs: "9가지 AI 패턴 전용 탐지" },
  { tool: "Snyk / Dependabot", limitation: "코드 로직 분석 불가", vs: "AST + Taint 추적 분석" },
  { tool: "SAST 도구", limitation: "느리고 오탐 투성이", vs: "저장 즉시 실시간 분석" },
  { tool: "수동 코드 리뷰", limitation: "Vibe Coding 속도 못따라감", vs: "파일 저장 즉시 자동 스캔" },
  { tool: "LLM 기반 리뷰", limitation: "비결정적 + 코드 외부 전송", vs: "규칙 기반 100% 결정적 + 로컬" },
];

const SEVERITY_STYLES: Record<Severity, string> = {
  CRITICAL: "bg-danger/10 border border-danger/20 text-danger",
  HIGH: "bg-amber-500/10 border border-amber-500/20 text-amber-500",
  MEDIUM: "bg-yellow-400/10 border border-yellow-400/20 text-yellow-400",
};

function SeverityBadge({ severity }: { readonly severity: Severity }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider ${SEVERITY_STYLES[severity]}`}
    >
      {severity}
    </span>
  );
}

function VulnerabilityCard({
  vuln,
  index,
}: {
  readonly vuln: Vulnerability;
  readonly index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="bg-[rgba(30,30,30,0.6)] backdrop-blur-xl border border-light/[0.08] rounded-2xl p-5 flex flex-col gap-3 hover:border-light/[0.15] transition-colors"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] text-light/30 uppercase tracking-wider">
          {vuln.cwe}
        </span>
        <SeverityBadge severity={vuln.severity} />
      </div>
      <h4 className="text-sm font-medium text-light">{vuln.title}</h4>
      <p className="text-xs text-light/50 leading-relaxed">{vuln.desc}</p>
    </motion.div>
  );
}

function ComparisonTable() {
  return (
    <div className="w-full overflow-x-auto">
      {/* Header */}
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 py-3 border-b border-light/10 min-w-[600px]">
        <span className="font-mono text-[10px] uppercase tracking-widest text-light/30">
          Tool
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-light/30">
          Problem
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent/60">
          VibeShield
        </span>
      </div>

      {/* Rows */}
      {TOOL_COMPARISON.map((row, i) => (
        <motion.div
          key={row.tool}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="grid grid-cols-[1fr_1fr_1fr] gap-4 py-4 border-b border-light/5 min-w-[600px]"
        >
          <span className="text-sm text-light/60">{row.tool}</span>
          <span className="text-sm text-light/40">{row.limitation}</span>
          <span className="text-sm text-accent">{row.vs}</span>
        </motion.div>
      ))}

      {/* VibeShield summary row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-[1fr_1fr_1fr] gap-4 py-4 border-t border-accent/20 mt-2 min-w-[600px]"
      >
        <span className="text-sm font-medium text-accent flex items-center gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="shrink-0"
          >
            <circle cx="7" cy="7" r="7" fill="rgba(0,255,136,0.15)" />
            <path
              d="M4 7l2 2 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          VibeShield
        </span>
        <span className="text-sm text-light/40">
          All problems solved
        </span>
        <span className="text-sm text-accent font-medium">
          Vibe Coding 전용 보안 엔진
        </span>
      </motion.div>

      {/* Bottom divider */}
      <div className="h-px bg-gradient-to-r from-accent/20 via-accent/10 to-transparent mt-2" />
    </div>
  );
}

export default function ProblemSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 md:px-16 bg-dark">
      <div className="section-line mb-16" />

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-2xl md:text-4xl font-medium mb-3">
          지금, 실제로 일어나고 있는 일.
        </h2>
        <p className="text-sm md:text-base text-light/40">
          AI 코드 생성 도구가 만드는 9가지 보안 취약점
        </p>
      </motion.div>

      {/* 3x3 vulnerability grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
        {VULNERABILITIES.map((vuln, i) => (
          <VulnerabilityCard key={vuln.cwe + vuln.title} vuln={vuln} index={i} />
        ))}
      </div>

      {/* Tool comparison */}
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xl md:text-2xl font-medium mb-8 text-light/80"
      >
        기존 보안 도구들은?{" "}
        <span className="text-light/40">Vibe Coding을 따라가지 못합니다.</span>
      </motion.h3>

      <ComparisonTable />
    </section>
  );
}
