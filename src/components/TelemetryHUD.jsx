import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Send } from 'lucide-react';
import ThemeToggle from './ui/ThemeToggle';

/* =========================================================================
   CUSTOM CYBER-HUD SVG ICONS (Pixel-Matched to Control Deck Reference)
   ========================================================================= */

// Castle Battlement / Triple-Crown Glyph Framing [ESCANOR]
function CrownGlyph({ className = 'w-3 h-3 text-white/90' }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M1 13h14v-2H1v2zm0-4h3.2V5.5H1V9zm5.4 0h3.2V3.5H6.4V9zm5.4 0H15V5.5h-3.2V9z" />
    </svg>
  );
}

// 1. HOME ICON (Clean Roof & Wall Outline)
function HomeNavIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 20v-9.5z" />
      <path d="M9 21v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7" />
    </svg>
  );
}

// 2. ABOUT ICON (User Head & Torso Arc)
function AboutNavIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 20.5a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

// 3. PROJECTS ICON (Hardware Module / Server Chassis with Triple Vents)
function ProjectsNavIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M8 6V3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5V6" />
      <line x1="8" y1="10.5" x2="8" y2="15.5" />
      <line x1="12" y1="10.5" x2="12" y2="15.5" />
      <line x1="16" y1="10.5" x2="16" y2="15.5" />
    </svg>
  );
}

// 4. SKILLS ICON (45-degree Angled Cyber Spanner / Wrench)
function SkillsNavIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

// 5. JOURNEY ICON (Curved Telemetry Route / Loop Milestone)
function JourneyNavIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="17.5" cy="5.5" r="2.5" />
      <circle cx="6.5" cy="18.5" r="2.5" />
      <path d="M6.5 16V9a3.5 3.5 0 0 1 3.5-3.5h4a3.5 3.5 0 0 1 3.5 3.5v7" />
    </svg>
  );
}

// 6. AI VAULT / CERTIFICATES ICON (Shield / Verified Badge)
function VaultNavIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2l8 4v6c0 5.25-3.5 10-8 11-4.5-1-8-5.75-8-11V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

// 7. CONTACT ICON (Terminal Prompt >_)
function ContactNavIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="4 6 10 12 4 18" />
      <line x1="12" y1="18" x2="20" y2="18" />
    </svg>
  );
}

// TikTok SVG Icon for Mobile Menu
function TikTokIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01-.01 2.62.02 5.24-.02 7.86-.09 1.74-.7 3.47-1.84 4.79-1.39 1.63-3.48 2.63-5.64 2.63-2.58 0-5.06-1.37-6.28-3.64-1.38-2.52-1.12-5.78.68-8.02 1.51-1.92 3.9-2.97 6.32-2.73.02 1.37-.03 2.74.02 4.11-1.32-.15-2.71.37-3.47 1.48-.82 1.13-.77 2.75.12 3.82.79.97 2.12 1.45 3.34 1.2 1.25-.22 2.27-1.25 2.5-2.48.16-.83.15-1.68.15-2.52V.02z" />
    </svg>
  );
}

/* =========================================================================
   NAVIGATION CHANNEL CONFIGURATION
   ========================================================================= */
const navItems = [
  { id: 'hero', label: 'HOME', icon: HomeNavIcon },
  { id: 'about', label: 'ABOUT', icon: AboutNavIcon },
  { id: 'projects', label: 'PROJECTS', icon: ProjectsNavIcon },
  { id: 'tech-stack', label: 'SKILLS', icon: SkillsNavIcon },
  { id: 'ai-vault', label: 'AI VAULT', icon: VaultNavIcon },
  { id: 'cv-dossier', label: 'JOURNEY', icon: JourneyNavIcon },
  { id: 'contact', label: 'CONTACT', icon: ContactNavIcon, isAction: true },
];

/**
 * Segmented Sci-Fi Cyber-HUD Header Navigation
/**
 * Segmented Sci-Fi Cyber-HUD Header Navigation (Unified Desktop & Mobile Architecture)
 * Monolithic 3-part Control Deck layout preserving exact clipped-corner geometry on all viewports:
 * 1. Left Pod: Angled polygon chevron with green glowing ONLINE indicator & [ESCANOR] brand with crown battlements.
 * 2. Middle Channel: Continuous obsidian metallic deck with horizontally scalable icon/label links & active crescent arc.
 * 3. Right Pod: Matching angular clipped-corner action pod framing the [LET'S BUILD] button.
 */
export default function TelemetryHUD({ onContactClick }) {
  const [activeSection, setActiveSection] = useState('hero');

  // Active section scroll tracking
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'tech-stack', 'ai-vault', 'cv-dossier'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (sectionId) => {
    if (sectionId === 'contact') {
      onContactClick?.();
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-1.5 sm:top-3 inset-x-0 z-50 select-none pointer-events-none px-1.5 sm:px-4 max-w-[1240px] mx-auto">
      <div className="flex items-center justify-center w-full">
        <div className="flex items-center space-x-1.5 sm:space-x-2.5 w-full max-w-[1140px] relative pointer-events-auto">
          {/* =========================================================================
              UNIFIED CONTROL DECK CONTAINER (Mobile, Tablet, Desktop)
              Interlocking 3-segment geometry with 0 gaps, matching heights & continuous rails
              ========================================================================= */}
          <div className="flex items-stretch flex-1 h-[46px] xs:h-[48px] sm:h-[54px] relative filter drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
            {/* -----------------------------------------------------------------------
                1. LEFT POD: BRAND & LIVE TELEMETRY ([ESCANOR] + ONLINE)
                Polygon: Left apex point (<), top straight, right angled slant (/)
                ----------------------------------------------------------------------- */}
            <div
              onClick={() => scrollTo('hero')}
              style={{
                clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 10px 100%, 0 50%)',
              }}
              className="relative shrink-0 w-[92px] xs:w-[118px] sm:w-[175px] md:w-[220px] h-full bg-gradient-to-b from-[#4a4f58] via-[#242730] to-[#12141a] p-[1.5px] cursor-pointer z-30 group"
            >
              {/* Middle Orange Border Layer */}
              <div
                style={{
                  clipPath: 'polygon(9px 0, 100% 0, calc(100% - 10px) 100%, 9px 100%, 1px 50%)',
                }}
                className="w-full h-full bg-gradient-to-r from-cyber-orange via-cyber-bright to-cyber-orange p-[1.5px]"
              >
                {/* Inner Obsidian Core */}
                <div
                  style={{
                    clipPath: 'polygon(8px 0, 100% 0, calc(100% - 10px) 100%, 8px 100%, 2px 50%)',
                  }}
                  className="w-full h-full bg-gradient-to-r from-[#0c0e12] via-[#12151c] to-[#0f1117] pl-2 xs:pl-3 sm:pl-5 pr-1.5 sm:pr-3 py-1 sm:py-1.5 flex flex-col justify-center relative"
                >
                  {/* Subtle Ambient Orange Glow Texture */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyber-orange/20 via-transparent to-transparent pointer-events-none" />

                  {/* Top Row: Green Glowing ONLINE Beacon */}
                  <div className="flex items-center space-x-1 sm:space-x-1.5 relative z-10 leading-none mb-0.5">
                    <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 items-center justify-center shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF66] opacity-75" />
                      <span className="relative inline-flex rounded-full h-1 w-1 sm:h-1.5 sm:w-1.5 bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
                    </span>
                    <span className="font-mono text-[6.5px] xs:text-[7.5px] sm:text-[9px] font-extrabold text-[#00FF66] tracking-[0.12em] sm:tracking-[0.18em] uppercase drop-shadow-[0_0_6px_rgba(0,255,102,0.6)]">
                      ONLINE
                    </span>
                    <span className="text-[6.5px] sm:text-[8px] font-mono text-white/40 hidden sm:inline">
                      • 100%
                    </span>
                  </div>

                  {/* Bottom Row: -= [ESCANOR] =- with Restored Telemetry Framing & Crown Battlements */}
                  <div className="flex items-center space-x-0.5 xs:space-x-1 sm:space-x-1.5 relative z-10 leading-none">
                    <CrownGlyph className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-cyber-orange drop-shadow-[0_0_6px_rgba(255,106,0,0.85)] shrink-0 hidden xs:inline" />
                    <span className="font-mono text-[7px] xs:text-[8.5px] sm:text-[10.5px] font-black text-cyber-orange drop-shadow-[0_0_6px_rgba(255,106,0,0.8)] select-none">
                      -=
                    </span>
                    <span className="font-display font-black text-[8px] xs:text-[9.5px] sm:text-xs md:text-[13px] tracking-[0.05em] sm:tracking-[0.12em] text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] truncate group-hover:text-cyber-bright transition-colors">
                      [ESCANOR]
                    </span>
                    <span className="font-mono text-[7px] xs:text-[8.5px] sm:text-[10.5px] font-black text-cyber-orange drop-shadow-[0_0_6px_rgba(255,106,0,0.8)] select-none">
                      =-
                    </span>
                    <CrownGlyph className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-cyber-orange drop-shadow-[0_0_6px_rgba(255,106,0,0.85)] shrink-0 hidden xs:inline" />
                  </div>
                </div>
              </div>
            </div>

            {/* -----------------------------------------------------------------------
                2. MIDDLE CHANNEL: NAVIGATION DECK
                Seamless interlock with Left Pod (-ml-[10px] sm:-ml-[14px]) and Right Pod (-mr-[10px] sm:-mr-[14px])
                Polygon: Slanted left seam (/), top rail, slanted right seam (/)
                ----------------------------------------------------------------------- */}
            <nav
              style={{
                clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
              }}
              className="relative flex-1 -ml-[10px] sm:-ml-[14px] -mr-[10px] sm:-mr-[14px] h-full bg-[#090b0f] z-20 border-y border-cyber-orange/40 overflow-hidden"
            >
              {/* Top Continuous Laser Border (Aligned with Pods) */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyber-orange via-cyber-bright to-cyber-orange shadow-[0_0_10px_var(--color-cyber-orange)] z-30" />
              
              {/* Bottom Dark Guide Rail with Subtle Cyber-Orange Accent */}
              <div className="absolute bottom-0 inset-x-0 h-[2px] sm:h-[2.5px] bg-[#1a1d24] border-t border-cyber-orange/40 shadow-[0_0_6px_rgba(255,106,0,0.25)] z-30" />

              {/* Nav Items Container (Responsive Flex + Smooth Scroll on Narrow Screens) */}
              <div className="w-full h-full flex items-center justify-between sm:justify-around px-2 xs:px-3 sm:px-5 overflow-x-auto no-scrollbar">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`relative flex flex-col items-center justify-center h-full px-1 xs:px-1.5 sm:px-3 lg:px-4 transition-all cursor-pointer shrink-0 group/item ${
                        isActive
                          ? 'text-cyber-bright'
                          : 'text-[#a1a1aa] hover:text-cyber-bright'
                      }`}
                    >
                      {/* Icon */}
                      <Icon
                        className={`w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover/item:scale-110 mb-0.5 ${
                          isActive
                            ? 'text-cyber-bright drop-shadow-[0_0_8px_rgba(255,106,0,0.9)] stroke-[2.2]'
                            : 'text-[#a1a1aa] group-hover/item:text-cyber-bright group-hover/item:drop-shadow-[0_0_6px_rgba(255,127,17,0.7)]'
                        }`}
                      />

                      {/* Label */}
                      <span
                        className={`font-mono text-[6.5px] xs:text-[7.5px] sm:text-[9px] lg:text-[10px] font-black tracking-[0.08em] sm:tracking-[0.14em] uppercase transition-colors leading-none ${
                          isActive
                            ? 'text-cyber-bright glow-orange'
                            : 'text-[#a1a1aa] group-hover/item:text-white'
                        }`}
                      >
                        {item.label}
                      </span>

                      {/* Active State: Glowing Curved Arc / Crescent Flare Under Active Item */}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavArc"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 xs:w-10 sm:w-12 h-2 sm:h-2.5 flex items-end justify-center pointer-events-none z-40"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        >
                          {/* Luminous Curved Lens Arc */}
                          <svg viewBox="0 0 48 10" className="w-8 xs:w-10 sm:w-12 h-2 sm:h-2.5 text-cyber-orange drop-shadow-[0_0_8px_#ff6a00]">
                            <path
                              d="M2 9.5 Q 24 1.5 46 9.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* -----------------------------------------------------------------------
                3. RIGHT POD: ACTION POD ([LET'S BUILD])
                Polygon: Slanted left seam (/), chamfered top-right and bottom-right edges
                ----------------------------------------------------------------------- */}
            <div
              style={{
                clipPath: 'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)',
              }}
              className="relative shrink-0 w-[74px] xs:w-[90px] sm:w-[135px] md:w-[170px] h-full bg-gradient-to-b from-[#4a4f58] via-[#242730] to-[#12141a] p-[1.5px] z-30 group"
            >
              {/* Middle Orange Border Layer */}
              <div
                style={{
                  clipPath: 'polygon(9px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)',
                }}
                className="w-full h-full bg-gradient-to-r from-cyber-orange via-cyber-bright to-cyber-orange p-[1.5px]"
              >
                {/* Inner Dark Obsidian Core & Interactive Button */}
                <button
                  onClick={onContactClick}
                  style={{
                    clipPath: 'polygon(8px 0, calc(100% - 9px) 0, 100% 9px, 100% calc(100% - 9px), calc(100% - 9px) 100%, 0 100%)',
                  }}
                  className="w-full h-full bg-gradient-to-r from-[#0d0f14] via-[#141720] to-[#0c0e12] hover:from-[#181b24] hover:to-[#12141b] px-1.5 xs:px-2.5 sm:px-4 flex items-center justify-center cursor-pointer transition-all duration-300 relative group/btn"
                >
                  {/* Subtle Orange Hover Ambient Backing */}
                  <div className="absolute inset-0 bg-cyber-orange/0 group-hover/btn:bg-cyber-orange/15 transition-colors pointer-events-none" />

                  {/* Inner Dark Button Capsule framing LET'S BUILD */}
                  <div className="relative z-10 px-1.5 xs:px-2.5 sm:px-3 py-1 sm:py-1.5 rounded bg-black/85 border border-white/10 group-hover/btn:border-cyber-orange/60 shadow-inner">
                    <span className="font-display font-black text-[7.5px] xs:text-[9px] sm:text-xs tracking-[0.06em] sm:tracking-[0.14em] text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] group-hover/btn:text-cyber-bright group-hover/btn:drop-shadow-[0_0_8px_rgba(255,106,0,0.8)] transition-all whitespace-nowrap">
                      <span className="hidden xs:inline">LET'S </span>BUILD
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* 4. THEME TOGGLE (Sun / Moon Switcher) */}
          <div className="shrink-0 h-[46px] xs:h-[48px] sm:h-[54px] flex items-center">
            <ThemeToggle className="h-full" />
          </div>
        </div>
      </div>
    </header>
  );
}

