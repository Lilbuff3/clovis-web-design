import { useState, useCallback } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TheLedger from "./components/TheLedger";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import TheReceipt from "./components/TheReceipt";
import TheRecipe from "./components/TheRecipe";
import FAQ from "./components/FAQ";
import BookingCalculator from "./components/BookingCalculator";
import CaseStudyDrawer from "./components/CaseStudyDrawer";
import BriefDialog from "./components/BriefDialog";
import StickyMobileCall from "./components/StickyMobileCall";
import Footer from "./components/Footer";
import { useRevealObserver } from "./hooks/useRevealObserver";
import type { ScopeTier, RetainerTier } from "./types";

interface BriefConfig {
  tier?: ScopeTier;
  retainer?: RetainerTier;
  addons?: string[];
  setupTotal?: number;
  monthlyTotal?: number;
}

export default function App() {
  useRevealObserver();

  const [briefOpen, setBriefOpen] = useState(false);
  const [briefConfig, setBriefConfig] = useState<BriefConfig | null>(null);
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(null);

  const handleOpenBrief = useCallback((config?: BriefConfig) => {
    if (config) {
      setBriefConfig(config);
    }
    setBriefOpen(true);
  }, []);

  const handleOpenCaseStudy = useCallback((id: string) => {
    setActiveCaseStudyId(id);
  }, []);

  const handleCloseCaseStudy = useCallback(() => {
    setActiveCaseStudyId(null);
  }, []);

  return (
    <div className="relative min-h-screen bg-paper text-ink selection:bg-clay selection:text-linen">
      {/* Skip to Content Accessible Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-medium focus:text-ink focus:shadow-xl focus:ring-2 focus:ring-clay"
      >
        Skip to main content
      </a>

      {/* Floating Pill Navigation */}
      <Nav onOpenBrief={() => handleOpenBrief()} />

      <main id="main-content" data-landmarks="hero, case-studies, calculator, services, ledger, receipt, recipe, faq">
        {/* Hero & Identity Section */}
        <Hero onOpenBrief={() => handleOpenBrief()} />

        {/* Proof first: two real builds */}
        <CaseStudies onOpenCaseStudy={handleOpenCaseStudy} />

        {/* Then the price, while they still have the proof in mind */}
        <BookingCalculator onOpenBrief={handleOpenBrief} />

        {/* Three Core Services Section */}
        <Services />

        {/* The Anti-Agency Ledger Comparison Section */}
        <TheLedger />

        {/* The Receipt (100/100 Core Web Vitals) Section */}
        <TheReceipt />

        {/* The Recipe Craftsman 4-Stage Process Section */}
        <TheRecipe />

        {/* Objection-Crushing FAQ Section */}
        <FAQ />
      </main>

      {/* Studio Footer with bottom padding on mobile for sticky bar */}
      <div className="pb-16 md:pb-0">
        <Footer
          onOpenCaseStudy={handleOpenCaseStudy}
          onOpenBrief={() => handleOpenBrief()}
        />
      </div>

      {/* Sticky Mobile Call & Contact Bar */}
      <StickyMobileCall
        onOpenCalculator={() => {
          const el = document.getElementById("calculator");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Case Study Deep Sliding Drawer Modal */}
      <CaseStudyDrawer
        isOpen={Boolean(activeCaseStudyId)}
        activeCaseStudyId={activeCaseStudyId}
        onClose={handleCloseCaseStudy}
        onOpenCalculator={() => {
          const el = document.getElementById("calculator");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Prospect Self-Qualification Brief Dialog Modal */}
      <BriefDialog
        isOpen={briefOpen}
        onClose={() => setBriefOpen(false)}
        initialConfig={briefConfig}
      />
    </div>
  );
}
