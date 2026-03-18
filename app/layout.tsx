import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VibeShield — Vibe Coding 시대의 보안 가드레일",
  description:
    "AI가 코드를 쓰는 시대, 보안도 AI의 속도로. 로컬에서 실행되는 실시간 보안 스캐너.",
  openGraph: {
    title: "VibeShield",
    description: "Your local security guardrail for vibe coding.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
