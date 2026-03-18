"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VulnDemo {
  readonly id: string;
  readonly label: string;
  readonly cwe: string;
  readonly severity: "CRITICAL" | "HIGH" | "MEDIUM";
  readonly vulnerable: string;
  readonly safe: string;
}

const DEMOS: readonly VulnDemo[] = [
  {
    id: "sql-injection",
    label: "SQL Injection",
    cwe: "CWE-89",
    severity: "CRITICAL",
    vulnerable: `// AI가 생성한 Express API
app.get('/users', (req, res) => {
  const query = \`SELECT * FROM users
    WHERE name = '\${req.query.name}'\`;
  db.query(query);
});`,
    safe: `// VibeShield 자동 수정
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users WHERE name = ?';
  db.query(query, [req.query.name]);
});`,
  },
  {
    id: "access-control",
    label: "접근 권한",
    cwe: "CWE-862",
    severity: "HIGH",
    vulnerable: `// AI가 미들웨어 없이 생성한 라우트
app.get('/api/admin/users', async (req, res) => {
  const users = await db.findAll();
  res.json(users);
});`,
    safe: `// 인증 + 인가 미들웨어 적용
app.get('/api/admin/users',
  requireAuth,
  requireRole('admin'),
  async (req, res) => {
    const users = await db.findAll();
    res.json(users);
  }
);`,
  },
  {
    id: "rls-missing",
    label: "Supabase RLS",
    cwe: "CWE-732",
    severity: "CRITICAL",
    vulnerable: `// 클라이언트에서 직접 쿼리 (RLS 없음)
'use client'
const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY
);
const { data } = await supabase
  .from('users').select('*');`,
    safe: `// Server Action + 서비스 키 사용
'use server'
const supabase = createServerClient();
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('id', session.user.id);`,
  },
  {
    id: "secret-exposure",
    label: "Secret 노출",
    cwe: "CWE-798",
    severity: "CRITICAL",
    vulnerable: `// AI가 하드코딩한 시크릿
const stripe = new Stripe(
  'sk_live_abc123xyz789'
);
console.log('Payment:', amount);`,
    safe: `// 환경변수 + 콘솔 제거
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);
// console.log removed by VibeShield`,
  },
  {
    id: "package-hallucination",
    label: "패키지 환각",
    cwe: "CWE-829",
    severity: "HIGH",
    vulnerable: `// AI가 존재하지 않는 패키지 추천
import { validate } from 'express-validator-pro';
import { sanitize } from 'html-purify-fast';
// npm registry에 존재하지 않는 패키지!`,
    safe: `// 검증된 실제 패키지로 교체
import { body } from 'express-validator';
import DOMPurify from 'dompurify';
// npm registry 실존 확인 완료`,
  },
] as const;

function severityColor(severity: VulnDemo["severity"]): string {
  switch (severity) {
    case "CRITICAL":
      return "text-danger";
    case "HIGH":
      return "text-amber";
    case "MEDIUM":
      return "text-light/60";
  }
}

function CodeLine({
  line,
  lineNumber,
  variant,
}: {
  readonly line: string;
  readonly lineNumber: number;
  readonly variant: "danger" | "safe";
}) {
  const commentIndex = line.indexOf("//");
  const hasComment = commentIndex !== -1;
  const commentColor =
    variant === "danger" ? "text-danger/80" : "text-accent/60";

  return (
    <span className="block">
      <span className="text-light/20 select-none mr-4 inline-block w-4 text-right">
        {lineNumber}
      </span>
      {hasComment ? (
        <>
          {line.slice(0, commentIndex)}
          <span className={commentColor}>{line.slice(commentIndex)}</span>
        </>
      ) : (
        line
      )}
    </span>
  );
}

function CodeBlock({
  code,
  variant,
}: {
  readonly code: string;
  readonly variant: "danger" | "safe";
}) {
  const lines = code.split("\n");
  const blockClass =
    variant === "danger" ? "code-block-danger" : "code-block";

  return (
    <div className={`${blockClass} p-6 overflow-x-auto h-full`}>
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`w-2 h-2 rounded-full ${
            variant === "danger"
              ? "bg-danger animate-pulse"
              : "bg-accent"
          }`}
        />
        <span
          className={`font-mono text-xs uppercase tracking-wider ${
            variant === "danger" ? "text-danger" : "text-accent"
          }`}
        >
          {variant === "danger" ? "Vulnerable" : "Protected"}
        </span>
      </div>
      <pre className="font-mono text-xs md:text-sm leading-relaxed text-light/70 whitespace-pre-wrap">
        {lines.map((line, i) => (
          <CodeLine
            key={i}
            line={line}
            lineNumber={i + 1}
            variant={variant}
          />
        ))}
      </pre>
    </div>
  );
}

function TabButton({
  demo,
  isActive,
  onClick,
}: {
  readonly demo: VulnDemo;
  readonly isActive: boolean;
  readonly onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-shrink-0 px-4 py-2 rounded-full font-mono text-xs
        border transition-all duration-200
        ${
          isActive
            ? "bg-accent/10 border-accent/30 text-accent"
            : "border-light/10 text-light/40 hover:text-light/60"
        }
      `}
    >
      {demo.label}
    </button>
  );
}

const contentVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function ConsoleSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDemo = DEMOS[activeIndex];

  return (
    <section className="relative py-24 md:py-32 px-4 md:px-16">
      <div className="section-line mb-16" />

      {/* Section header */}
      <div className="mb-12">
        <h2 className="font-mono text-2xl md:text-3xl font-semibold text-light mb-3">
          AI가 만드는 실제 취약점, 실시간 수정
        </h2>
        <p className="font-mono text-sm text-light/40">
          탭을 클릭해서 각 취약점의 탐지 &rarr; 수정 과정을 확인하세요
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {DEMOS.map((demo, index) => (
          <TabButton
            key={demo.id}
            demo={demo}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* Active demo metadata */}
      <div className="flex items-center gap-3 mb-6">
        <span className="badge badge-danger">{activeDemo.cwe}</span>
        <span
          className={`font-mono text-[10px] uppercase tracking-widest ${severityColor(activeDemo.severity)}`}
        >
          {activeDemo.severity}
        </span>
      </div>

      {/* Code comparison */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDemo.id}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <CodeBlock code={activeDemo.vulnerable} variant="danger" />
          <div className="relative">
            <span className="badge badge-accent absolute -top-3 right-4 z-10">
              Auto-fixed
            </span>
            <CodeBlock code={activeDemo.safe} variant="safe" />
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
