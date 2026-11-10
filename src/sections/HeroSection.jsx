import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Pause,
  Play,
  ArrowRight,
} from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import FloatingTelemetryCards from '../components/FloatingTelemetryCards';
import TechContainer from '../components/TechContainer';

/**
 * Interactive Mouse Glow Layer
 */
function MouseGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    el.style.setProperty('--mouse-x', '-1000px');
    el.style.setProperty('--mouse-y', '-1000px');
    el.style.setProperty('--glow-opacity', '0');

    const handleMouseMove = (e) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleMouseEnter = () => {
      el.style.setProperty('--glow-opacity', '1');
    };

    const handleMouseLeave = () => {
      el.style.setProperty('--glow-opacity', '0');
    };

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
      style={{
        opacity: 'var(--glow-opacity, 0)',
        background:
          'radial-gradient(600px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(255, 106, 0, 0.08), transparent 80%)',
      }}
    />
  );
}

/**
 * Production-Aligned Hero Section
 * Crisp typography, engaging natural summary, floating badges, and clear action buttons.
 */
export default function HeroSection({ onProjectsClick, onContactClick }) {
  const { siteContent, downloadActiveCV } = usePortfolioData();
  const hero = siteContent?.hero || {};

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cvDownloaded, setCvDownloaded] = useState(false);

  /* Video Autoplay & Performance Optimization (Pause when offscreen/hidden) */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Detect low-bandwidth or battery saver preferences
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSlowConnection = connection?.saveData || (connection?.effectiveType && ['slow-2g', '2g', '3g'].includes(connection.effectiveType));
    const isMobileViewport = window.innerWidth < 640;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;

    // On slow 3G/2G or data saver mode, don't auto-download high-bandwidth stream eagerly
    if (isSlowConnection) {
      video.preload = 'none';
      return;
    } else if (isMobileViewport) {
      video.preload = 'metadata';
    } else {
      video.preload = 'auto';
    }

    const tryPlay = () => {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          const resume = () => {
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
            document.removeEventListener('click', resume);
            document.removeEventListener('touchstart', resume);
          };
          document.addEventListener('click', resume, { once: true });
          document.addEventListener('touchstart', resume, { once: true });
        });
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener('canplay', tryPlay, { once: true });
    }

    // IntersectionObserver: Pause video when scrolled out of viewport to save mobile CPU/GPU & battery
    const heroEl = document.getElementById('hero');
    let observer = null;
    if (heroEl && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              video.pause();
            } else if (isPlaying) {
              video.play().catch(() => {});
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(heroEl);
    }

    // Visibility Change: Pause when tab is backgrounded
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (isPlaying) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (observer) observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownloadCV = () => {
    downloadActiveCV('Samuel_Patrick_Master_CV.doc');
    setCvDownloaded(true);
    setTimeout(() => setCvDownloaded(false), 3500);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen hero-stage overflow-hidden select-none bg-cyber-black flex flex-col justify-between"
    >
      {/* === Layer 1: Subtle Ambient Overlays === */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none z-15 hud-scanline opacity-[0.12]" />
      <div className="absolute inset-0 cyber-grid opacity-[0.25] pointer-events-none z-15" />

      {/* Production-size ambient glow orbs */}
      <div className="absolute top-24 left-1/3 w-80 h-80 rounded-full bg-cyber-orange/10 blur-[120px] pointer-events-none z-15" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-cyber-crimson/10 blur-[130px] pointer-events-none z-15" />

      {/* === Layer 2: Video Stream Background === */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/60 hero-video-overlay pointer-events-none transition-colors duration-500" />
      </div>

      {/* === Layer 3: Mouse Interactive Glow === */}
      <MouseGlow />

      {/* === Layer 4: Floating Badges === */}
      <FloatingTelemetryCards />

      {/* === Layer 5: Main Content === */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative z-20 pt-32 pb-16 text-center">
        {/* Top Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center space-x-2.5 mb-5 px-4.5 py-1.5 rounded-full bg-[#202A36]/60 border border-cyber-orange/40 backdrop-blur-md shadow-[0_0_12px_rgba(255,106,0,0.15)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-bright animate-ping" />
          <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.25em] text-white filter drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            {hero.statusPill || 'SAMUEL PATRICK IMOLE (ESCANOR) • FULL-STACK & MOBILE DEVELOPER'}
          </span>
        </motion.div>

        {/* Main H1 Visible Heading Displaying Full Name */}
        <div className="relative select-text max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[82px] font-black leading-[1.05] tracking-tight text-white font-display select-text filter drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]"
          >
            Samuel Patrick Imole
          </motion.h1>

          {/* Subtext & Secondary Heading with Common Name Combinations */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
            className="mt-3.5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-white/90"
          >
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 shadow-sm">
              Also known as <strong className="text-cyber-bright">Samuel Patrick</strong>
            </span>
            <span className="text-cyber-orange">•</span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 shadow-sm">
              <strong className="text-cyber-bright">Samuel Imole</strong>
            </span>
            <span className="text-cyber-orange">•</span>
            <span className="px-3 py-1 rounded-md bg-cyber-orange/10 border border-cyber-orange/30 text-cyber-orange font-bold">
              Brand: ESCANOR
            </span>
          </motion.div>

          {/* Creative Tagline & Slogan */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-cyber-orange font-display mt-5 select-text filter drop-shadow-[0_2px_20px_rgba(255,106,0,0.35)]"
          >
            Engineering Ideas Into Reality.
          </motion.h2>
        </div>

        {/* Visible Introductory Text Explicitly Stating Full Professional Identity & Common Variations */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-6 text-base md:text-lg text-white/90 max-w-[760px] leading-relaxed select-text font-sans font-medium filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
        >
          {hero.bio ||
            'I am Samuel Patrick Imole (commonly searched as Samuel Patrick or Samuel Imole, professional brand ESCANOR) — Full-Stack Web & Cross-Platform Mobile Application Developer, CEO & Founder of TASFUED Marketplace, and 300-level Computer Science undergraduate at TASUED. I engineer offline-first architectures, high-performance CBT exam engines, and scalable enterprise applications with Next.js, React, and Flutter.'}
        </motion.p>

        {/* Production CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center gap-4.5 mt-10 z-30 relative"
        >
          {/* Primary: View Projects */}
          <button
            onClick={onProjectsClick}
            className="group w-full sm:w-auto flex items-center justify-center space-x-2.5 px-8 py-4 bg-gradient-to-r from-cyber-orange to-cyber-crimson hover:from-[#FF7F11] hover:to-[#D90429] text-white font-semibold rounded-full select-none cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_4px_25px_rgba(255,106,0,0.35)] hover:shadow-[0_4px_30px_rgba(255,106,0,0.55)] border border-cyber-bright/20"
          >
            <span>{hero.primaryCtaText || 'View Featured Projects'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Ghost: Download CV */}
          <button
            onClick={handleDownloadCV}
            className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-8 py-4 bg-[#202A36]/40 hover:bg-[#202A36]/70 text-white font-semibold rounded-full border border-white/20 hover:border-white/40 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg relative overflow-hidden group cursor-pointer"
          >
            <Download className="w-5 h-5 text-cyber-bright group-hover:animate-bounce" />
            <span>{cvDownloaded ? 'CV Downloaded!' : hero.secondaryCtaText || 'Download Resume (.DOC)'}</span>
          </button>
        </motion.div>

        {/* Tech Stack Pills Container */}
        <TechContainer />
      </div>

      {/* === Layer 6: Bottom Controls Bar === */}
      <footer className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 z-30 flex justify-between items-center text-xs text-white/40 font-mono">
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={toggleVideo}
            className="flex items-center space-x-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 hover:border-cyber-orange/40 text-white hover:text-cyber-bright transition-all cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-cyber-orange" />
                <span>Pause Background</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Play Background</span>
              </>
            )}
          </motion.button>
        </div>

        <div className="hidden sm:flex items-center space-x-6">
          <span>{hero.locationStatus || 'LOCATION: NIGERIA • REMOTE WORLDWIDE'}</span>
          <span className="text-emerald-400 font-semibold">
            {hero.availabilityStatus || 'AVAILABLE FOR NEW PROJECTS'}
          </span>
        </div>
      </footer>
    </section>
  );
}
