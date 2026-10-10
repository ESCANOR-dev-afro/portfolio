import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Sparkles,
  Shield,
  Layers,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  Clock,
  Play,
  User,
  Bell,
  Smartphone,
} from 'lucide-react';
import HUDCorners from '../ui/HUDCorners';
import { SCHEDULER_SCREENS } from './SchedulerInteractiveStudio';

export default function SchedulerModal({
  isOpen,
  onClose,
  initialScreenIdx = 0,
}) {
  const [selectedIdx, setSelectedIdx] = useState(initialScreenIdx);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSelectedIdx(initialScreenIdx);
  }, [initialScreenIdx, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        setSelectedIdx((prev) => (prev - 1 + SCHEDULER_SCREENS.length) % SCHEDULER_SCREENS.length);
      }
      if (e.key === 'ArrowRight') {
        setSelectedIdx((prev) => (prev + 1) % SCHEDULER_SCREENS.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentScreen = SCHEDULER_SCREENS[selectedIdx] || SCHEDULER_SCREENS[0];

  const handleCopySpec = () => {
    navigator.clipboard.writeText(
      `SCHEDULER Mobile Application | Flutter + Dart + Supabase + Riverpod | Live at https://scheduler.nexlify.com.ng`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none overflow-y-auto">
        {/* Deep Cyber Cyan Blur Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Shell */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 24 }}
          transition={{ type: 'spring', damping: 26, stiffness: 240 }}
          className="relative w-full max-w-5xl my-auto max-h-[92vh] bg-[#070e17] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95),0_0_50px_rgba(0,210,255,0.2)] flex flex-col z-10 text-left"
        >
          {/* Top Cyan Accent Line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-90 shadow-[0_0_12px_#00d2ff]" />

          {/* Tactical HUD Corners */}
          <HUDCorners size="md" />

          {/* Header Bar */}
          <div className="bg-[#0b1726] px-5 sm:px-7 py-3.5 border-b border-cyan-500/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_10px_rgba(0,210,255,0.25)]">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30 uppercase tracking-wider">
                    NODE 02 • FLUTTER CROSS-PLATFORM
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    LIVE PRODUCTION APP
                  </span>
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-white tracking-wide mt-0.5">
                  SCHEDULER — Academic Timetable & Lecture Streaming Ecosystem
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-7 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Device Frame Display */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-[210px] sm:w-[240px] h-[430px] sm:h-[480px] bg-[#0a1120] rounded-[40px] border-[7px] border-[#131d2e] shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(0,210,255,0.25)] flex flex-col justify-between overflow-hidden relative group">
                {/* Cyan Rim Accent */}
                <div className="absolute inset-0 rounded-[34px] border border-cyan-500/30 pointer-events-none z-30" />

                {/* Status Bar */}
                <div className="pt-2 px-3 pb-1 flex items-center justify-between text-[8px] font-mono text-white/70 z-30 shrink-0 bg-[#070e17]/90 backdrop-blur-md border-b border-white/5">
                  <span className="font-bold">5:05</span>
                  {/* Dynamic Island */}
                  <div className="w-14 h-2.5 bg-black rounded-full flex items-center justify-center space-x-1 border border-cyan-500/20 shadow-inner">
                    <div className="w-1 h-1 rounded-full bg-cyan-400" />
                    <div className="w-0.5 h-0.5 rounded-full bg-white/40" />
                  </div>
                  <span className="text-cyan-400 font-bold">62% ⚡</span>
                </div>

                {/* Active Screen Shot */}
                <div className="flex-1 overflow-hidden relative bg-black">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentScreen.id}
                      src={currentScreen.src}
                      alt={currentScreen.title}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full object-cover object-top"
                    />
                  </AnimatePresence>

                  {/* Nav Arrows inside frame */}
                  <button
                    onClick={() =>
                      setSelectedIdx(
                        (prev) => (prev - 1 + SCHEDULER_SCREENS.length) % SCHEDULER_SCREENS.length
                      )
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/80 border border-cyan-500/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-500 hover:text-black cursor-pointer z-30 shadow-lg"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedIdx((prev) => (prev + 1) % SCHEDULER_SCREENS.length)
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/80 border border-cyan-500/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-500 hover:text-black cursor-pointer z-30 shadow-lg"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Bar */}
                <div className="py-1.5 flex flex-col items-center justify-center space-y-1 shrink-0 z-30 bg-[#070e17]/90 border-t border-white/5">
                  <div className="w-16 h-1 bg-white/40 rounded-full" />
                </div>
              </div>
            </div>

            {/* Right: Technical Spec Dossier & Screen Selector */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              {/* Screen Selector Cards */}
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-2">
                  VERIFIED APPLICATION VIEWS ({selectedIdx + 1}/3)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {SCHEDULER_SCREENS.map((screen, idx) => {
                    const isSelected = selectedIdx === idx;
                    return (
                      <button
                        key={screen.id}
                        onClick={() => setSelectedIdx(idx)}
                        className={`p-2 rounded-xl text-left transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-b from-cyan-950/60 to-[#070e17] border-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.3)]'
                            : 'bg-black/40 border-white/10 hover:border-cyan-500/30 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-mono text-cyan-400 font-bold">
                            {screen.num}
                          </span>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                        </div>
                        <div className="text-[11px] font-bold text-white truncate">
                          {screen.tabLabel}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Screen Architectural Breakdown */}
              <div className="p-4 rounded-xl bg-black/50 border border-cyan-500/20 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${currentScreen.tagColor}`}>
                    {currentScreen.tag}
                  </span>
                  <span className="text-[9px] font-mono text-white/40">
                    {currentScreen.techBadge}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white font-display mb-1 text-cyan-300">
                  {currentScreen.title}
                </h4>
                <p className="text-xs text-white/70 leading-relaxed font-sans mb-3">
                  {currentScreen.description}
                </p>

                {/* Telemetry Stats */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 font-mono text-left">
                  {Object.entries(currentScreen.stats).map(([key, val]) => (
                    <div key={key} className="p-2 rounded bg-white/[0.03] border border-white/5">
                      <span className="text-[8px] text-white/40 uppercase block">{key}</span>
                      <span className="text-xs font-bold text-cyan-400">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architectural Highlights */}
              <div className="space-y-1.5 text-xs text-white/70 font-sans">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Flutter 3.x cross-platform engine with 60 FPS smooth animations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Supabase PostgreSQL backend with instant biometric & matric authentication</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Offline timetable caching with Riverpod 2.0 reactive dependency injection</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                <a
                  href="https://scheduler.nexlify.com.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all cursor-pointer"
                >
                  <span>LAUNCH LIVE SCHEDULER</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://github.com/ESCANOR-dev-afro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/15 hover:border-cyan-500/40 hover:bg-cyan-500/10 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5 text-cyan-400" />
                  <span>GITHUB SOURCE</span>
                </a>

                <button
                  onClick={handleCopySpec}
                  className="px-3 py-2.5 rounded-lg bg-white/5 border border-white/15 hover:bg-white/10 text-white/70 hover:text-white font-mono text-xs flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED!' : 'COPY SPEC'}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
