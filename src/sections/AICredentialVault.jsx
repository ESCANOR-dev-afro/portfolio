import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Award,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Cpu,
  Layers,
  CheckCircle2,
  Filter,
  Terminal,
  Grid,
  SlidersHorizontal,
} from 'lucide-react';
import SectionBadge from '../components/ui/SectionBadge';
import HUDCorners from '../components/ui/HUDCorners';
import CertificateLightboxModal from '../components/CertificateLightboxModal';
import OptimizedImage from '../components/ui/OptimizedImage';
import { usePortfolioData } from '../context/PortfolioDataContext';

/**
 * AICredentialVault — Claude Certification Showcase Section
 * Displays verified Anthropic Claude Academy diplomas and specializations
 * with interactive filters, grid/carousel views, and high-res lightbox.
 */
export default function AICredentialVault() {
  const { certificates, certificateCategories } = usePortfolioData();
  const [selectedCategory, setSelectedCategory] = useState('ALL CREDENTIALS');
  const [activeCertIndex, setActiveCertIndex] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'carousel'
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Filtered certificates based on selected category
  const filteredCertificates = selectedCategory === 'ALL CREDENTIALS'
    ? certificates
    : certificates.filter((cert) => cert.category === selectedCategory);

  // Lightbox handlers
  const openLightbox = (certId) => {
    const idx = certificates.findIndex((c) => c.id === certId);
    if (idx !== -1) {
      setActiveCertIndex(idx);
    }
  };

  const closeLightbox = () => {
    setActiveCertIndex(null);
  };

  const handlePrevCert = () => {
    if (activeCertIndex === null) return;
    setActiveCertIndex((prev) => (prev > 0 ? prev - 1 : certificates.length - 1));
  };

  const handleNextCert = () => {
    if (activeCertIndex === null) return;
    setActiveCertIndex((prev) => (prev < certificates.length - 1 ? prev + 1 : 0));
  };

  // Carousel handlers
  const handleCarouselPrev = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : filteredCertificates.length - 1));
  };

  const handleCarouselNext = () => {
    setCarouselIndex((prev) => (prev < filteredCertificates.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="ai-vault"
      className="relative py-28 bg-[#090B0E] overflow-hidden border-b border-white/5 select-none"
    >
      {/* Ambient Grid & Glow Orbs */}
      <div className="absolute inset-0 cyber-grid opacity-[0.14] pointer-events-none" />
      <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] rounded-full bg-cyber-orange/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <SectionBadge>Anthropic Claude Academy • Official Certifications</SectionBadge>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display uppercase mt-1">
            AI &amp; CLAUDE CERTIFICATIONS
          </h2>

          <p className="mt-3 text-sm sm:text-base text-white/60 max-w-2xl font-sans leading-relaxed">
            Official certifications awarded by Anthropic Claude Academy covering autonomous coding with Claude Code CLI, tool integration via Model Context Protocol (MCP), full-stack AI development, and multimodal intelligence.
          </p>

          <div className="w-24 h-[3px] bg-gradient-to-r from-cyber-orange via-amber-500 to-cyber-crimson mt-4 rounded-full shadow-[0_0_12px_rgba(255,106,0,0.5)]" />

          {/* Status Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 px-4 py-2 rounded-full bg-white/[0.02] border border-white/10 font-mono text-[11px] text-white/60 shadow-lg">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
              <span className="text-white font-semibold">STATUS: {certificates.length}/{certificates.length} VERIFIED CREDENTIALS</span>
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyber-orange" />
              <span>ISSUER: ANTHROPIC PBC</span>
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center space-x-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyber-bright" />
              <span>SPECIALTY: CLAUDE CODE CLI &amp; MCP</span>
            </span>
          </div>
        </div>

        {/* Filter & View Mode Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-white/5">
          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full pb-2 md:pb-0 hud-scrollbar select-none">
            {certificateCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCarouselIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyber-orange to-amber-600 text-white shadow-[0_0_15px_rgba(255,106,0,0.35)] border border-cyber-bright/30'
                    : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Mode Toggle (Grid vs Carousel) */}
          <div className="flex items-center space-x-1.5 bg-white/5 p-1 rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-cyber-orange text-white font-bold shadow-[0_0_10px_rgba(255,106,0,0.4)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GRID VIEW</span>
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              title="Carousel View"
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-all cursor-pointer ${
                viewMode === 'carousel'
                  ? 'bg-cyber-orange text-white font-bold shadow-[0_0_10px_rgba(255,106,0,0.4)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CAROUSEL</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            VIEW 1: GRID VIEW
            ========================================================================= */}
        {viewMode === 'grid' && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCertificates.map((cert, index) => {
              const skillsList = cert.skills || cert.stackTags || [];

              return (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onClick={() => openLightbox(cert.id)}
                  className="group relative rounded-2xl bg-gradient-to-b from-[#11141A] to-[#0D0F14] border border-white/10 hover:border-cyber-orange/60 transition-all duration-300 shadow-[0_15px_45px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_60px_rgba(255,106,0,0.22)] overflow-hidden flex flex-col justify-between cursor-pointer"
                >
                  {/* Tactical HUD Corner Marks */}
                  <HUDCorners size="sm" />

                  {/* Top Subtle Amber Ambient Line */}
                  <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyber-orange/40 group-hover:via-cyber-orange to-transparent transition-all duration-300" />

                  {/* Card Top: Certificate Thumbnail & Overlays */}
                  <div className="p-4 pb-0">
                    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-black/60 border border-white/10 group-hover:border-cyber-orange/40 transition-colors">
                      {/* Image Preview */}
                      <OptimizedImage
                        src={cert.image}
                        alt={cert.title}
                        className="object-center transform group-hover:scale-105 transition-transform duration-500"
                        wrapperClassName="w-full h-full"
                      />

                      {/* Category Chip Badge */}
                      <div className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-[9px] font-mono font-bold text-cyber-orange uppercase tracking-wider shadow">
                        CERTIFICATE {cert.nodeNumber} • {cert.category}
                      </div>

                      {/* Verified Status Pill */}
                      <div className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded-md bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-[9px] font-mono font-bold text-emerald-300 flex items-center space-x-1 shadow">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>VERIFIED</span>
                      </div>

                      {/* Hover Inspect Icon Overlay */}
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                        <div className="px-3 py-1.5 rounded-xl bg-cyber-orange text-white font-mono text-xs font-bold flex items-center space-x-1.5 shadow-[0_0_20px_rgba(255,106,0,0.6)] transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>INSPECT CREDENTIAL</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content & Metadata */}
                  <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display font-bold text-lg text-white group-hover:text-cyber-bright transition-colors">
                          {cert.title}
                        </h3>
                        <span className="text-[10px] font-mono text-white/40 shrink-0 mt-1">
                          {cert.badgeId}
                        </span>
                      </div>

                      <p className="text-white/70 font-sans text-xs mt-1 line-clamp-2 leading-relaxed">
                        {cert.summary || cert.description}
                      </p>
                    </div>

                    {/* Validated Skills Chips */}
                    {skillsList.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-white/5">
                        <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">
                          VALIDATED SKILLS &amp; TOPICS:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {skillsList.slice(0, 3).map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/80"
                            >
                              {skill}
                            </span>
                          ))}
                          {skillsList.length > 3 && (
                            <span className="px-1.5 py-0.5 rounded bg-cyber-orange/10 border border-cyber-orange/30 text-[10px] font-mono text-cyber-orange font-bold">
                              +{skillsList.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Bottom Action Footer */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-white/40">{cert.issuer}</span>
                      <span className="text-cyber-orange font-bold group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                        <span>OPEN FULL VIEW</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* =========================================================================
            VIEW 2: CAROUSEL VIEW
            ========================================================================= */}
        {viewMode === 'carousel' && filteredCertificates.length > 0 && (
          <div className="relative max-w-4xl mx-auto">
            {/* Active Carousel Card */}
            {(() => {
              const activeCert = filteredCertificates[carouselIndex] || filteredCertificates[0];
              const activeSkills = activeCert.skills || activeCert.stackTags || [];

              return (
                <div className="relative rounded-2xl bg-gradient-to-b from-[#11141A] to-[#0A0C10] border border-cyber-orange/40 p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(255,106,0,0.18)]">
                  <HUDCorners size="md" />

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    {/* Left: Certificate Image with Zoom trigger */}
                    <div
                      onClick={() => openLightbox(activeCert.id)}
                      className="md:col-span-7 relative rounded-xl overflow-hidden border border-white/15 bg-black/80 shadow-2xl group cursor-pointer"
                    >
                      <OptimizedImage
                        src={activeCert.image}
                        alt={activeCert.title}
                        objectFit="contain"
                        className="group-hover:scale-105 transition-transform duration-500"
                        wrapperClassName="w-full h-auto min-h-[220px]"
                      />
                      <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-cyber-orange/30 text-[10px] font-mono text-cyber-orange font-bold">
                        CERTIFICATE {activeCert.nodeNumber} • {activeCert.category}
                      </div>
                      <div className="absolute bottom-3 right-3 z-20 px-3 py-1.5 rounded-xl bg-cyber-orange text-white font-mono text-xs font-bold flex items-center space-x-1.5 shadow-[0_0_15px_rgba(255,106,0,0.6)]">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>FULLSCREEN VIEW</span>
                      </div>
                    </div>

                    {/* Right: Details & Description */}
                    <div className="md:col-span-5 space-y-4 text-left">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                          STATUS: VERIFIED CREDENTIAL
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-2xl text-white">
                        {activeCert.title}
                      </h3>

                      <p className="text-white/70 font-sans text-xs leading-relaxed">
                        {activeCert.description}
                      </p>

                      {activeSkills.length > 0 && (
                        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                          <span className="text-[10px] font-mono text-cyber-orange uppercase font-bold tracking-wider block">
                            VALIDATED SKILLS:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {activeSkills.map((s, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded bg-cyber-orange/10 border border-cyber-orange/30 text-white/90 font-mono text-[10px] flex items-center space-x-1"
                              >
                                <CheckCircle2 className="w-2.5 h-2.5 text-cyber-orange" />
                                <span>{s}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-2 flex items-center justify-between text-xs font-mono">
                        <span className="text-white/40">{activeCert.issuer}</span>
                        <button
                          onClick={() => openLightbox(activeCert.id)}
                          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-cyber-orange/10 border border-white/10 hover:border-cyber-orange/40 text-cyber-bright hover:text-white font-bold transition-all cursor-pointer flex items-center space-x-1.5"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>EXPAND CREDENTIAL</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Carousel Controls */}
            <div className="flex items-center justify-between mt-6 px-2">
              <button
                onClick={handleCarouselPrev}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-cyber-orange/15 border border-white/10 hover:border-cyber-orange/40 text-white text-xs font-mono font-bold flex items-center space-x-1.5 cursor-pointer transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREVIOUS</span>
              </button>

              {/* Dots Indicator */}
              <div className="flex items-center space-x-2">
                {filteredCertificates.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      carouselIndex === i
                        ? 'w-8 bg-cyber-orange shadow-[0_0_8px_var(--color-cyber-orange)]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleCarouselNext}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-cyber-orange/15 border border-white/10 hover:border-cyber-orange/40 text-white text-xs font-mono font-bold flex items-center space-x-1.5 cursor-pointer transition-all"
              >
                <span>NEXT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Bottom Verification Stamp */}
        <div className="mt-16 p-5 rounded-2xl bg-gradient-to-r from-obsidian via-[#12151B] to-obsidian border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyber-orange/10 border border-cyber-orange/30 flex items-center justify-center text-cyber-orange shrink-0 shadow-[0_0_15px_rgba(255,106,0,0.25)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm sm:text-base text-white">
                ANTHROPIC CLAUDE ACADEMY CERTIFIED DEVELOPER
              </h4>
              <p className="text-[11px] font-mono text-white/50 mt-0.5">
                All {certificates.length} Claude Academy certificates are officially accredited for Samuel Imole Patrick.
              </p>
            </div>
          </div>

          <button
            onClick={() => openLightbox('claude-code-101')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-cyber-orange/10 border border-white/10 hover:border-cyber-orange/40 text-white font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer shrink-0"
          >
            <Maximize2 className="w-3.5 h-3.5 text-cyber-orange" />
            <span>VIEW ALL CERTIFICATES</span>
          </button>
        </div>
      </div>

      {/* Fullscreen High-Res Lightbox Modal */}
      <CertificateLightboxModal
        isOpen={activeCertIndex !== null}
        onClose={closeLightbox}
        certificate={activeCertIndex !== null ? certificates[activeCertIndex] : null}
        onPrev={handlePrevCert}
        onNext={handleNextCert}
        hasMultiple={certificates.length > 1}
      />
    </section>
  );
}
