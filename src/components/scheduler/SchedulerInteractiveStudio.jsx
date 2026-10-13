import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
  Shield,
  Clock,
  BookOpen,
  User,
  Sparkles,
  Wifi,
  Battery,
  Layers,
  Zap,
  Play,
  CheckCircle2,
} from 'lucide-react';
import OptimizedImage from '../ui/OptimizedImage';

export const SCHEDULER_SCREENS = [
  {
    id: 'signin-portal',
    num: '01',
    tabLabel: 'SIGN-IN HUB',
    title: 'Student Sign-In Hub',
    subtitle: 'SCHEDULER Student Examination & Timetable Hub',
    src: '/screenshots/scheduler-login.png',
    tag: 'Matric & Email Auth',
    tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    description: 'Dark-themed examination and timetable authentication portal with student email and institutional matric number regex verification.',
    techBadge: 'Supabase Auth • AES Token Cache',
    stats: { authSpeed: '< 180ms', security: 'Encrypted', theme: 'Midnight Cyan' },
  },
  {
    id: 'lecture-stream',
    num: '02',
    tabLabel: 'LECTURE STREAM',
    title: 'BIO102 Lecture Stream',
    subtitle: 'FULafia E-Learning Video Player & Handouts',
    src: '/screenshots/scheduler-lecture.png',
    tag: 'E-Learning & Video',
    tagColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
    description: 'Campus video player interface featuring BIO102 General Biology stream, live audio equalizer visualizer, and synchronized PDF handouts.',
    techBadge: 'Adaptive HLS • Handout Cache • Audio Visualizer',
    stats: { bufferSpeed: 'Realtime', videoRes: '1080p HD', handouts: '5 Synced' },
  },
  {
    id: 'student-profile',
    num: '03',
    tabLabel: 'PROFILE & METRICS',
    title: 'Student Profile & Metrics',
    subtitle: 'ICH 100L Regular Student Dashboard',
    src: '/screenshots/scheduler-profile.png',
    tag: 'Syllabus & Telemetry',
    tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    description: 'Comprehensive student profile tracking 38 total classes, 18 announcements, push alert reminders, and Midnight Cyan theme toggling.',
    techBadge: 'Riverpod 2.0 State • Hive Offline Storage',
    stats: { totalClasses: '38', broadcasts: '18', frameRate: '60.0 FPS' },
  },
];

export default function SchedulerInteractiveStudio({
  isMobile = false,
  onOpenModal,
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const activeScreen = SCHEDULER_SCREENS[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % SCHEDULER_SCREENS.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + SCHEDULER_SCREENS.length) % SCHEDULER_SCREENS.length);
  };

  // Keyboard navigation when focused
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none overflow-hidden font-sans">
      {/* Dynamic Midnight Cyan Lighting & Radial Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-[#00d2ff]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-cyan-500/10 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full bg-blue-600/10 blur-[60px] pointer-events-none" />

      {/* Top Multi-Screen Tab Switcher */}
      <div className="relative z-20 bg-[#070e17]/95 px-2 py-1.5 border-b border-cyan-500/20 backdrop-blur-md flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-1 overflow-x-auto py-0.5 no-scrollbar">
          {SCHEDULER_SCREENS.map((screen, idx) => {
            const isActive = currentIdx === idx;
            return (
              <button
                key={screen.id}
                onClick={() => setCurrentIdx(idx)}
                className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center space-x-1 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_12px_rgba(0,210,255,0.5)] border border-cyan-400/40'
                    : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span>{screen.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {onOpenModal && (
          <button
            onClick={() => onOpenModal(activeScreen)}
            title="Inspect full screen"
            className="p-1 rounded text-cyan-400/80 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors ml-1 cursor-pointer shrink-0"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Phone Screen Display Area */}
      <div className="relative flex-1 w-full overflow-hidden bg-black flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative w-full h-full group"
          >
            <OptimizedImage
              src={activeScreen.src}
              alt={activeScreen.title}
              className="object-top"
            />

            {/* Left Carousel Navigation Trigger */}
            <button
              onClick={handlePrev}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/75 border border-cyan-500/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-500 hover:text-black cursor-pointer z-30 shadow-lg"
              aria-label="Previous screen"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Right Carousel Navigation Trigger */}
            <button
              onClick={handleNext}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/75 border border-cyan-500/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-500 hover:text-black cursor-pointer z-30 shadow-lg"
              aria-label="Next screen"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Screen Telemetry Floating Badge */}
            <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-lg bg-[#070e17]/90 border border-cyan-500/30 backdrop-blur-md flex items-center justify-between text-[8px] font-mono pointer-events-none shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              <div className="flex items-center space-x-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#00d2ff]" />
                <span className="text-white font-bold truncate">{activeScreen.title}</span>
              </div>
              <span className="text-cyan-400 shrink-0 uppercase tracking-widest text-[7px] bg-cyan-500/10 px-1 py-0.5 rounded border border-cyan-500/20">
                {activeScreen.tag}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Bar: Indicators & Flutter Platform Telemetry */}
      <div className="bg-[#070e17]/95 px-2.5 py-1 border-t border-cyan-500/20 flex items-center justify-between text-[7px] font-mono text-white/50 shrink-0 z-20">
        <div className="flex items-center space-x-1">
          {SCHEDULER_SCREENS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentIdx(dotIdx)}
              className={`h-1 rounded-full transition-all cursor-pointer ${
                currentIdx === dotIdx ? 'bg-cyan-400 w-3' : 'bg-white/30 w-1 hover:bg-white/50'
              }`}
              aria-label={`Go to screen ${dotIdx + 1}`}
            />
          ))}
        </div>

        <span className="text-cyan-400/90 font-bold uppercase tracking-wider">
          FLUTTER 3.X • RIVERPOD • 60 FPS
        </span>
      </div>
    </div>
  );
}
