import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Maximize2,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import HUDCorners from './ui/HUDCorners';

/**
 * High-Res Certificate Inspection & Details Modal
 * Allows interactive inspection of official Claude Academy diplomas and skills.
 */
export default function CertificateLightboxModal({
  isOpen,
  onClose,
  certificate,
  onPrev,
  onNext,
  hasMultiple = true,
}) {
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState(false);

  // Keyboard navigation listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!certificate) return null;

  const handleCopyBadge = () => {
    navigator.clipboard.writeText(`${certificate.title} | Verified Anthropic Claude Credential [${certificate.badgeId}] - Samuel Imole Patrick`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const skillsList = certificate.skills || certificate.stackTags || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg transition-opacity"
          />

          {/* Modal Shell */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ type: 'spring', damping: 26, stiffness: 240 }}
            className="relative w-full max-w-5xl my-auto max-h-[92vh] bg-[#0A0C10] border border-cyber-orange/30 rounded-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95),0_0_45px_rgba(255,106,0,0.18)] flex flex-col z-10 text-left"
          >
            {/* Top Amber Accent Line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyber-orange to-transparent opacity-90 shadow-[0_0_10px_var(--color-cyber-orange)]" />

            {/* Tactical HUD Corner Brackets */}
            <HUDCorners size="md" />

            {/* Header Bar */}
            <div className="bg-[#10141C] px-5 sm:px-7 py-3.5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-cyber-orange/10 border border-cyber-orange/30 flex items-center justify-center text-cyber-orange shrink-0 shadow-[0_0_10px_rgba(255,106,0,0.2)]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono text-cyber-orange bg-cyber-orange/10 px-2 py-0.5 rounded border border-cyber-orange/30 uppercase tracking-wider">
                      CERTIFICATE {certificate.nodeNumber} • {certificate.category}
                    </span>
                    <span className="hidden sm:inline-block text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      OFFICIAL CREDENTIAL
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-white tracking-wide mt-0.5">
                    {certificate.title}
                  </h3>
                </div>
              </div>

              {/* Action Buttons & Close */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyBadge}
                  title="Copy Credential Details"
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-cyber-orange transition-all text-xs font-mono flex items-center space-x-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-cyber-orange" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="hidden md:inline">{copied ? 'CREDENTIAL COPIED' : 'COPY DETAILS'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-all cursor-pointer ml-1"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body Container */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto hud-scrollbar grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: High-Res Certificate Preview */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
                <div
                  onClick={() => setZoom(!zoom)}
                  className={`relative w-full rounded-xl overflow-hidden border border-white/15 bg-black/60 shadow-[0_15px_40px_rgba(0,0,0,0.8)] group cursor-zoom-in transition-all duration-300 ${
                    zoom ? 'ring-2 ring-cyber-orange scale-[1.02]' : 'hover:border-cyber-orange/50'
                  }`}
                >
                  {/* Scanline Layer */}
                  <div className="absolute inset-0 hud-scanline opacity-[0.08] pointer-events-none z-10" />

                  {/* Certificate Image */}
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-full h-auto object-contain block transition-transform duration-500 group-hover:scale-[1.01]"
                    loading="eager"
                  />

                  {/* Zoom Badge */}
                  <div className="absolute bottom-3 right-3 z-20 px-2 py-1 rounded bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/70 flex items-center space-x-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3 h-3 text-cyber-orange" />
                    <span>{zoom ? 'Click to Reset Zoom' : 'Click to Zoom'}</span>
                  </div>

                  {/* Watermark Badge */}
                  <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-cyber-orange/30 text-[9px] font-mono text-cyber-bright flex items-center space-x-1.5 shadow-lg">
                    <ShieldCheck className="w-3 h-3 text-cyber-orange" />
                    <span>ANTHROPIC CLAUDE ACADEMY • {certificate.badgeId}</span>
                  </div>
                </div>

                {/* Carousel Navigation */}
                {hasMultiple && (
                  <div className="flex items-center justify-between w-full mt-3 px-1">
                    <button
                      onClick={onPrev}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyber-orange/15 border border-white/10 hover:border-cyber-orange/40 text-white/70 hover:text-white text-xs font-mono flex items-center space-x-1 cursor-pointer transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>PREVIOUS</span>
                    </button>
                    <span className="text-[10px] font-mono text-white/40">
                      USE [←] [→] KEYS TO NAVIGATE
                    </span>
                    <button
                      onClick={onNext}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyber-orange/15 border border-white/10 hover:border-cyber-orange/40 text-white/70 hover:text-white text-xs font-mono flex items-center space-x-1 cursor-pointer transition-all"
                    >
                      <span>NEXT</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Verified Details & Skills */}
              <div className="lg:col-span-5 space-y-4 text-xs font-sans text-white/80">
                {/* Overview Header */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyber-orange uppercase font-bold tracking-wider">
                      CREDENTIAL OVERVIEW
                    </span>
                    <span className="text-[10px] font-mono text-white/40">
                      ID: {certificate.badgeId}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">
                    {certificate.summary || certificate.subtitle}
                  </h4>
                  <p className="text-white/60 text-xs leading-relaxed">
                    {certificate.description}
                  </p>
                </div>

                {/* Telemetry Matrix Grid */}
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-white/40 text-[9px] block">ISSUED BY:</span>
                    <span className="text-white font-semibold flex items-center space-x-1 mt-0.5">
                      <Sparkles className="w-3 h-3 text-cyber-orange" />
                      <span>{certificate.issuer}</span>
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-white/40 text-[9px] block">SPECIALIZATION:</span>
                    <span className="text-white font-semibold mt-0.5 block truncate">
                      {certificate.metrics?.domain || certificate.category}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-white/40 text-[9px] block">EXPERTISE LEVEL:</span>
                    <span className="text-cyber-bright font-semibold mt-0.5 block">
                      {certificate.metrics?.level || 'Specialist'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-white/40 text-[9px] block">STATUS:</span>
                    <span className="text-emerald-400 font-semibold mt-0.5 block">
                      Official &amp; Verified
                    </span>
                  </div>
                </div>

                {/* Validated Skills */}
                {skillsList.length > 0 && (
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5">
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-cyber-bright uppercase font-bold tracking-wider">
                      <Cpu className="w-3.5 h-3.5 text-cyber-orange" />
                      <span>KEY SKILLS &amp; TOPICS COVERED</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsList.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded bg-cyber-orange/10 border border-cyber-orange/30 text-white/90 font-mono text-[10px] flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-cyber-orange" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verification Authority Footer */}
                <div className="p-3 rounded-lg bg-gradient-to-r from-cyber-orange/10 to-transparent border-l-2 border-cyber-orange text-[10px] font-mono text-white/60 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-cyber-orange shrink-0" />
                  <span>
                    Official certification issued by Anthropic Claude Academy to Samuel Imole Patrick.
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Bottom Status Bar */}
            <div className="px-5 sm:px-7 py-3 bg-[#10141C] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>CREDENTIAL ID: {certificate.badgeId}</span>
              </div>
              <span className="text-cyber-orange font-bold">
                ANTHROPIC CLAUDE ACADEMY CERTIFIED DEVELOPER
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
