import { useState, lazy, Suspense } from 'react';
import TelemetryHUD from '../components/TelemetryHUD';
import HeroSection from '../sections/HeroSection';
import TransmissionFooter from '../components/TransmissionFooter';
import ContactModal from '../components/ContactModal';

/* ---------- Lazy-Loaded Below-Fold Modular Sections ---------- */
const SkillsMatrix = lazy(() => import('../sections/SkillsMatrix'));
const AICredentialVault = lazy(() => import('../sections/AICredentialVault'));
const AboutTerminal = lazy(() => import('../sections/AboutTerminal'));
const ProjectNodes = lazy(() => import('../sections/ProjectNodes'));
const MasterCVSection = lazy(() => import('../sections/MasterCVSection'));

/**
 * Minimalist Loading Fallback — Prevents Cumulative Layout Shift (CLS)
 */
function SectionFallback() {
  return (
    <div className="w-full py-32 flex items-center justify-center bg-obsidian">
      <div className="flex items-center space-x-3 text-white/40 font-mono text-xs tracking-wider">
        <div className="w-4 h-4 border-2 border-t-transparent border-orange-500 rounded-full animate-spin" />
        <span>LOADING SECTION...</span>
      </div>
    </div>
  );
}

/**
 * Portfolio Home Landing Page
 * Orchestrates eager above-fold rendering and lazy-loaded modular sections
 */
export default function PortfolioHome() {
  const [showContact, setShowContact] = useState(false);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative min-h-screen bg-obsidian text-ivory overflow-x-hidden selection:bg-orange-500/30 selection:text-ivory">
      {/* Fixed Telemetry HUD Header */}
      <TelemetryHUD onContactClick={() => setShowContact(true)} />

      {/* Main Page Container */}
      <main id="main-content" className="w-full max-w-full overflow-x-hidden">
        {/* Hero Section — Eagerly Loaded for Immediate FCP */}
        <HeroSection
          onProjectsClick={scrollToProjects}
          onContactClick={() => setShowContact(true)}
        />

        {/* Below-Fold Modular Sections with Suspense Splitting */}
        <Suspense fallback={<SectionFallback />}>
          <SkillsMatrix />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <AICredentialVault />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <AboutTerminal />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ProjectNodes />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <MasterCVSection onContactClick={() => setShowContact(true)} />
        </Suspense>
      </main>

      {/* Interactive HUD Transmission Footer */}
      <TransmissionFooter onContactClick={() => setShowContact(true)} />

      {/* Direct Transmission / Contact Modal */}
      <ContactModal
        isOpen={showContact}
        onClose={() => setShowContact(false)}
      />
    </div>
  );
}
