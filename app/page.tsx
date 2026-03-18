import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ConsoleSection from "@/components/ConsoleSection";
import StatsSection from "@/components/StatsSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ArchSection from "@/components/ArchSection";
import RoadmapSection from "@/components/RoadmapSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <ConsoleSection />
      <StatsSection />
      <ProblemSection />
      <SolutionSection />
      <ArchSection />
      <RoadmapSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
