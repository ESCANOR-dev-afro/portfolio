import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Smartphone,
  Sparkles,
  Layers,
  Zap,
  CheckCircle2,
  Maximize2,
} from 'lucide-react';
import HUDCorners from '../ui/HUDCorners';
import SchedulerInteractiveStudio from './SchedulerInteractiveStudio';
import SchedulerModal from './SchedulerModal';

export default function SchedulerCard({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalScreenIdx, setModalScreenIdx] = useState(0);

  const handleOpenModal = (screen) => {
    if (screen && screen.num) {
      setModalScreenIdx(parseInt(screen.num, 10) - 1);
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-full glass-heavy border border-cyan-500/30 hover:border-cyan-500/50 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(0,210,255,0.15)] group relative transition-colors duration-300 text-left">
        {/* HUD Corners */}
        <HUDCorners size="md" />

        {/* Ambient Cyan Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/15 via-blue-600/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 relative">
          {/* Left Column: Interactive Mobile Mockup Viewport */}
          <div className="lg:col-span-5 bg-black/40 border-b lg:border-b-0 lg:border-r border-white/10 flex items-center justify-center p-4">
            <div className="w-full max-w-[240px] h-[410px] bg-[#070e17] rounded-[38px] border-[6px] border-[#182334] shadow-[0_18px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(0,210,255,0.25)] flex flex-col justify-between overflow-hidden relative">
              <div className="absolute inset-0 rounded-[32px] border border-cyan-500/30 pointer-events-none z-30" />
              <SchedulerInteractiveStudio onOpenModal={handleOpenModal} />
            </div>
          </div>

          {/* Right Column: Project Specifications & Telemetry */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Header Row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-cyan-400 font-mono text-sm font-bold bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/30">
                    NODE_02
                  </span>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    Productivity & Academic Schedule Systems
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 text-[9px] font-mono text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00d2ff]" />
                  <span>LIVE PRODUCTION</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight mb-3 group-hover:text-cyan-400 transition-colors">
                SCHEDULER (MOBILE & WEB)
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-5 font-sans">
                Role-based academic timetable, lecture stream, and examination scheduling mobile ecosystem with instant matriculation auth, background alarms, and real-time offline synchronization.
              </p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['Flutter', 'Dart', 'Supabase Auth', 'Riverpod 2.0', 'PostgreSQL', 'Midnight Cyan UI'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-300 hover:border-cyan-500/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Core Features */}
              <div className="space-y-1.5 mb-5">
                {[
                  'Student Examination & Timetable Hub with Instant Matriculation Authentication',
                  'Campus E-Learning Video Lecture Stream Player with Synchronized Handouts & Audio Visualizer',
                  'Student Profile & Activity Metrics Dashboard Tracking 38 Classes, 18 Broadcasts, and Midnight Cyan Theme',
                  'Dynamic Lecture & Lab Timetable Synchronization with Smart Conflict Detection',
                ].map((feature, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-white/60 font-sans">
                    <span className="text-cyan-400 mt-0.5 font-bold">▸</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Architectural Challenge */}
              <div className="p-3 rounded-lg bg-black/40 border border-cyan-500/20 mb-6 text-[11px] font-mono text-white/60 leading-relaxed">
                <span className="text-cyan-400 font-bold uppercase block mb-1">
                  ARCHITECTURAL HIGHLIGHT
                </span>
                Role-based academic timetable, lecture stream player, and examination hub engineered with Flutter, Dart, Supabase Auth, and Riverpod 2.0 with sub-10ms query speeds and 60 FPS cross-platform performance.
              </div>
            </div>

            {/* Actions & Metrics */}
            <div>
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 mb-4">
                <a
                  href="https://scheduler.nexlify.com.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all cursor-pointer"
                >
                  <span>LAUNCH LIVE DEPLOYMENT</span>
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
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>INSPECT SCREENS</span>
                </button>
              </div>

              {/* HUD Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  'Flutter + Dart',
                  'Supabase Auth',
                  'Riverpod 2.0',
                  'Midnight Cyan UI',
                ].map((metric, i) => (
                  <div
                    key={i}
                    className="text-center py-2 px-1 rounded bg-white/[0.02] border border-cyan-500/20"
                  >
                    <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider block truncate">
                      {metric}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Resolution Modal */}
      <SchedulerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialScreenIdx={modalScreenIdx}
      />
    </>
  );
}
