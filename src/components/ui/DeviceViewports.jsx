import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Monitor,
  Wifi,
  Battery,
  Search,
  Clock,
  CreditCard,
  Wine,
  Lock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
} from 'lucide-react';
import VehicleTurntable from '../sarkin-mota/VehicleTurntable';
import SchedulerInteractiveStudio from '../scheduler/SchedulerInteractiveStudio';
import OptimizedImage from './OptimizedImage';

/**
 * Custom Project Simulated Screen Content (Fallback when screenshots are not available)
 */
function ProjectScreenContent({ project, isMobile }) {
  const type = project.previewType;

  // 1. TASFUED MARKETPLACE (Fallback if no screenshot)
  if (type === 'marketplace') {
    return (
      <div className="h-full flex flex-col justify-between text-left p-3 font-sans text-xs">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-display font-bold text-orange-400 text-xs tracking-wider">
              TASFUED MART
            </span>
            <div className="flex items-center space-x-1.5 text-[9px] text-orange-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_#ff5722]" />
              <span>LIVE FEED</span>
            </div>
          </div>

          <div className="mt-2.5 p-1.5 bg-white/5 rounded-md flex items-center space-x-2 text-[10px] text-white/50 border border-white/5">
            <Search className="w-3 h-3 text-orange-400" />
            <span>Search textbooks, hostels, gadgets...</span>
          </div>

          <div className="mt-3 space-y-2">
            {[
              { name: 'MacBook Pro M2 (Student Clean)', price: '₦450,000', tag: 'Gadgets', verified: true },
              { name: 'Engineering Math Vol 4', price: '₦4,500', tag: 'Books', verified: true },
              { name: 'Self-Con Hostel @ Campus Gate', price: '₦180,000/yr', tag: 'Hostels', verified: false },
            ].slice(0, isMobile ? 3 : 2).map((item, i) => (
              <div
                key={i}
                className="p-2 rounded-lg bg-obsidian/90 border border-white/5 hover:border-orange-500/30 transition-all flex items-center justify-between"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-white text-[11px] truncate">{item.name}</span>
                    {item.verified && (
                      <span className="text-[8px] bg-orange-500/20 text-orange-400 px-1 rounded font-mono">
                        VERIFIED
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] text-white/40 block mt-0.5">{item.tag}</span>
                </div>
                <span className="font-mono font-bold text-orange-400 text-[11px] shrink-0">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-white/40">
          <span>Active Merchants: 500+</span>
          <span className="text-orange-400 font-semibold">PostgreSQL: Sub-Sec</span>
        </div>
      </div>
    );
  }

  // 2. SCHEDULER (AUTHENTIC MOBILE & WEB APP SHOWCASE)
  if (type === 'scheduler') {
    return <SchedulerInteractiveStudio isMobile={isMobile} />;
  }

  // 4. FINTECH PLATFORM
  if (type === 'fintech') {
    return (
      <div className="h-full flex flex-col justify-between text-left p-3 font-sans text-xs">
        <div>
          <div className="p-3 rounded-xl bg-gradient-to-tr from-obsidian via-graphite to-charcoal border border-orange-500/30 shadow-[0_4px_20px_rgba(255,87,34,0.2)] relative overflow-hidden">
            <div className="flex justify-between items-center text-[9px] font-mono text-orange-400">
              <span>ESCANOR SECURE VAULT</span>
              <CreditCard className="w-3.5 h-3.5" />
            </div>
            <div className="mt-2 text-white font-mono text-base font-bold tracking-wider">
              ₦2,840,500.00
            </div>
            <div className="mt-2 flex justify-between items-center text-[8px] font-mono text-white/50">
              <span>SAMUEL I. PATRICK</span>
              <span>EXP: 09/29</span>
            </div>
          </div>

          <div className="mt-2.5 space-y-1.5">
            <div className="flex justify-between text-[8px] font-mono text-white/40 px-1">
              <span>RECENT TRANSACTIONS</span>
              <span>STATUS: SETTLED</span>
            </div>
            {[
              { desc: 'Inflow: Software Contract Milestone', amt: '+₦450,000.00', plus: true },
              { desc: 'Outflow: Cloud Infrastructure AWS/GCP', amt: '-₦35,400.00', plus: false },
            ].map((tx, i) => (
              <div key={i} className="p-1.5 rounded bg-black/40 border border-white/5 flex justify-between items-center">
                <span className="text-white text-[10px] truncate max-w-[130px]">{tx.desc}</span>
                <span className={`font-mono text-[10px] font-bold ${tx.plus ? 'text-orange-400' : 'text-white/60'}`}>
                  {tx.amt}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[9px] font-mono text-center text-white/30 pt-1">
          BIOMETRIC AUTH • DOUBLE-LEDGER 100%
        </div>
      </div>
    );
  }

  // 5. SARKIN MOTA GROUP (Authentic Turntable & Specification Studio)
  if (type === 'automotive') {
    return <VehicleTurntable isMobile={isMobile} />;
  }

  // 6. THE GILDED TABLE (MOBILE)
  if (type === 'gilded-mobile') {
    return (
      <div className="h-full flex flex-col justify-between text-left p-3 font-sans text-xs">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-display font-bold text-orange-400 text-xs">THE GILDED TABLE</span>
            <span className="text-[9px] font-mono text-amber-400">TABLE 07 RESERVED</span>
          </div>

          <div className="mt-2.5 p-2.5 rounded-lg bg-obsidian/90 border border-orange-500/30 space-y-1.5">
            <div className="flex justify-between items-center text-[10px]">
              <span className="font-bold text-white">Chef's 7-Course Tasting Menu</span>
              <span className="font-mono text-orange-400">₦120,000/p</span>
            </div>
            <p className="text-[9px] text-white/60 leading-relaxed">
              Wagyu A5 • Black Winter Truffle • Grand Cru Bordeaux Pairing
            </p>
            <div className="flex items-center space-x-2 pt-1 text-[8px] font-mono text-amber-400">
              <Wine className="w-3 h-3" />
              <span>Sommelier Pairing: 2015 Château Margaux</span>
            </div>
          </div>
        </div>

        <div className="p-1.5 rounded bg-orange-500/10 border border-orange-500/30 text-[9px] font-mono text-orange-400 text-center font-bold">
          VIP CONCIERGE CONFIRMED • 60 FPS
        </div>
      </div>
    );
  }

  // 7. THE GILDED TABLE (WEB APP)
  return (
    <div className="h-full flex flex-col justify-between text-left p-3 font-sans text-xs">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <span className="font-display font-bold text-white text-xs">CULINARY COMMAND TOWER</span>
          <span className="text-[9px] font-mono text-orange-400 bg-orange-500/10 px-1.5 rounded">
            DINING ROOM: 94% OCCUPIED
          </span>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2 text-[10px] font-mono">
          <div className="p-2 rounded bg-obsidian border border-white/5">
            <span className="text-white/40 block text-[8px]">ACTIVE COVERS</span>
            <span className="text-white font-bold text-sm">48 / 52</span>
          </div>
          <div className="p-2 rounded bg-obsidian border border-white/5">
            <span className="text-white/40 block text-[8px]">KITCHEN QUEUE</span>
            <span className="text-orange-400 font-bold text-sm">6 Orders • In Queue</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[9px] font-mono text-white/40">
        <span>SOMMELIER CELLAR: 1,240 BTL</span>
        <span className="text-orange-400">LATENCY: &lt;15ms</span>
      </div>
    </div>
  );
}

/**
 * Interactive Dual-Mode Device Viewport Frame
 * Renders verified screenshots (with multi-view carousel/tabs) or custom simulated UI screens.
 */
export default function DeviceViewports({ project }) {
  const isScheduler = project.id === 'scheduler-mobile' || project.previewType === 'scheduler';
  const [viewMode, setViewMode] = useState(isScheduler ? 'mobile' : 'desktop'); // 'mobile' | 'desktop'
  const hasScreenshots = !!project.screenshots;
  const [selectedDesktopIdx, setSelectedDesktopIdx] = useState(0);
  const [selectedMobileIdx, setSelectedMobileIdx] = useState(0);

  const desktopGallery = project.screenshots?.desktopGallery || [];
  const mobileGallery = project.screenshots?.mobileGallery || (project.screenshots?.mobile ? [{ id: 'mobile-main', label: 'MOBILE VIEW', src: project.screenshots.mobile }] : []);

  const currentDesktopScreenshot =
    desktopGallery.length > 0
      ? desktopGallery[selectedDesktopIdx]?.src || desktopGallery[0]?.src
      : project.screenshots?.desktop;
  const isDesktopInteractive = desktopGallery[selectedDesktopIdx]?.isInteractive;

  const currentMobileScreenshot =
    mobileGallery.length > 0
      ? mobileGallery[selectedMobileIdx]?.src || mobileGallery[0]?.src
      : project.screenshots?.mobile;
  const isMobileInteractive = mobileGallery[selectedMobileIdx]?.isInteractive;

  const nextDesktop = () => {
    if (desktopGallery.length > 1) {
      setSelectedDesktopIdx((prev) => (prev + 1) % desktopGallery.length);
    }
  };

  const prevDesktop = () => {
    if (desktopGallery.length > 1) {
      setSelectedDesktopIdx((prev) => (prev - 1 + desktopGallery.length) % desktopGallery.length);
    }
  };

  const nextMobile = () => {
    if (mobileGallery.length > 1) {
      setSelectedMobileIdx((prev) => (prev + 1) % mobileGallery.length);
    }
  };

  const prevMobile = () => {
    if (mobileGallery.length > 1) {
      setSelectedMobileIdx((prev) => (prev - 1 + mobileGallery.length) % mobileGallery.length);
    }
  };

  const activeBtnGradient = isScheduler
    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(0,210,255,0.5)]'
    : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_12px_rgba(255,87,34,0.5)]';

  const activeTabGradient = isScheduler
    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_10px_rgba(0,210,255,0.4)]'
    : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-[0_0_10px_rgba(255,87,34,0.4)]';

  const hoverArrowBg = isScheduler
    ? 'hover:bg-cyan-400 hover:text-black'
    : 'hover:bg-orange-500 hover:text-white';

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 sm:p-6 select-none">
      {/* Viewport Switcher Controls */}
      <div className="inline-flex items-center p-1 rounded-xl bg-obsidian/90 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.6)] mb-4 z-20">
        <button
          onClick={() => setViewMode('desktop')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider transition-all cursor-pointer ${
            viewMode === 'desktop'
              ? activeBtnGradient
              : 'text-white/50 hover:text-white hover:bg-white/5'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>DESKTOP VIEW</span>
        </button>

        <button
          onClick={() => setViewMode('mobile')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider transition-all cursor-pointer ${
            viewMode === 'mobile'
              ? activeBtnGradient
              : 'text-white/50 hover:text-white hover:bg-white/5'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>MOBILE VIEW</span>
        </button>
      </div>

      {/* Frame Container */}
      <div className="w-full max-w-sm sm:max-w-md h-[370px] sm:h-[410px] flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          {viewMode === 'mobile' ? (
            /* === SMARTPHONE BEZEL MOCKUP === */
            <motion.div
              key="mobile-frame"
              initial={{ scale: 0.94, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`w-[195px] sm:w-[215px] h-[360px] sm:h-[400px] bg-obsidian rounded-[38px] border-[6px] border-[#18181b] flex flex-col justify-between overflow-hidden relative group ${
                isScheduler
                  ? 'shadow-[0_18px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(0,210,255,0.2)]'
                  : 'shadow-[0_18px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(255,87,34,0.2)]'
              }`}
            >
              {/* Rim accent line */}
              <div
                className={`absolute inset-0 rounded-[32px] border pointer-events-none z-30 ${
                  isScheduler ? 'border-cyan-500/30' : 'border-orange-500/25'
                }`}
              />

              {/* Top Notch & Status Bar */}
              <div className="pt-2 px-3 pb-1 flex items-center justify-between text-[8px] font-mono text-white/60 z-30 shrink-0 bg-obsidian/85 backdrop-blur-md border-b border-white/5">
                <span className="font-bold">{isScheduler ? '5:05' : '09:41'}</span>
                {/* Dynamic Island Notch */}
                <div className="w-14 h-2.5 bg-black rounded-full flex items-center justify-center space-x-1 border border-white/10 shadow-inner">
                  <div
                    className={`w-1 h-1 rounded-full ${
                      isScheduler ? 'bg-cyan-400' : 'bg-orange-500'
                    }`}
                  />
                  <div className="w-0.5 h-0.5 rounded-full bg-white/40" />
                </div>
                <div className="flex items-center space-x-1">
                  <Wifi className="w-2.5 h-2.5 text-white/80" />
                  <Battery
                    className={`w-2.5 h-2.5 ${
                      isScheduler ? 'text-cyan-400' : 'text-orange-400'
                    }`}
                  />
                </div>
              </div>

              {/* Mobile Multi-View Switcher Pill (if multiple mobile screenshots exist) */}
              {hasScreenshots && mobileGallery.length > 1 && (
                <div className="bg-black/90 px-2 py-1 border-b border-white/5 flex items-center justify-center space-x-1 overflow-x-auto shrink-0 z-20">
                  {mobileGallery.map((tab, idx) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedMobileIdx(idx)}
                      className={`px-1.5 py-0.5 rounded text-[7px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        selectedMobileIdx === idx
                          ? activeTabGradient
                          : 'text-white/40 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Screen Content: Real Screenshot or Custom Mock / Interactive */}
              <div className="flex-1 overflow-hidden relative z-10 bg-black">
                {hasScreenshots && currentMobileScreenshot && !isMobileInteractive ? (
                  <div className="relative w-full h-full">
                    <OptimizedImage
                      src={currentMobileScreenshot}
                      alt={`${project.title} Mobile View`}
                      className="object-top"
                      fallbackSrc={project.image}
                    />

                    {/* Left/Right Mobile Carousel Controls */}
                    {mobileGallery.length > 1 && (
                      <>
                        <button
                          onClick={prevMobile}
                          className={`absolute left-1 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer z-20 ${hoverArrowBg}`}
                          aria-label="Previous view"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={nextMobile}
                          className={`absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer z-20 ${hoverArrowBg}`}
                          aria-label="Next view"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <ProjectScreenContent project={project} isMobile={true} />
                )}
              </div>

              {/* Bottom Home Indicator Bar & Dots */}
              <div className="pb-1.5 pt-1 flex flex-col items-center justify-center space-y-1 shrink-0 z-30 bg-obsidian/85 border-t border-white/5">
                {hasScreenshots && mobileGallery.length > 1 && (
                  <div className="flex items-center space-x-1">
                    {mobileGallery.map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        className={`w-1 h-1 rounded-full transition-all ${
                          selectedMobileIdx === dotIdx
                            ? isScheduler
                              ? 'bg-cyan-400 w-2'
                              : 'bg-orange-500 w-2'
                            : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                )}
                <div className="w-16 h-1 bg-white/40 rounded-full" />
              </div>
            </motion.div>
          ) : (
            /* === BROWSER WINDOW MOCKUP === */
            <motion.div
              key="desktop-frame"
              initial={{ scale: 0.94, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`w-full h-[340px] sm:h-[380px] bg-obsidian rounded-xl border border-white/15 flex flex-col overflow-hidden relative group ${
                isScheduler
                  ? 'shadow-[0_18px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(0,210,255,0.18)]'
                  : 'shadow-[0_18px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(255,87,34,0.15)]'
              }`}
            >
              {/* Browser Window Chrome */}
              <div className="bg-graphite/95 px-3 py-2 border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-status-error/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-status-warning/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-status-success/80" />
                </div>

                {/* Simulated URL Bar */}
                <div className="flex-1 max-w-[210px] mx-2 px-2 py-0.5 rounded bg-black/60 border border-white/10 flex items-center space-x-1.5 text-[9px] font-mono text-white/60 truncate">
                  <Lock
                    className={`w-2.5 h-2.5 shrink-0 ${
                      isScheduler ? 'text-cyan-400' : 'text-orange-400'
                    }`}
                  />
                  <span className="truncate">http://{project.mockDetails?.url || 'escanor.dev'}</span>
                </div>

                <div
                  className={`text-[8px] font-mono font-bold hidden sm:inline ${
                    isScheduler ? 'text-cyan-400/90' : 'text-orange-400/90'
                  }`}
                >
                  {project.liveUrl ? 'ONLINE' : 'LOCAL LAN'}
                </div>
              </div>

              {/* Desktop Screenshot Gallery Tabs (if available) */}
              {hasScreenshots && desktopGallery.length > 1 && (
                <div className="bg-black/70 px-2.5 py-1.5 border-b border-white/5 flex items-center space-x-1.5 overflow-x-auto shrink-0 z-20">
                  {desktopGallery.map((tab, idx) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedDesktopIdx(idx)}
                      className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                        selectedDesktopIdx === idx
                          ? activeTabGradient
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Desktop Screen Content: Real Screenshot or Custom Mock / Interactive */}
              <div className="flex-1 overflow-hidden relative bg-black">
                {hasScreenshots && currentDesktopScreenshot && !isDesktopInteractive ? (
                  <div className="relative w-full h-full">
                    <OptimizedImage
                      src={currentDesktopScreenshot}
                      alt={`${project.title} Desktop View`}
                      className="object-top transition-transform duration-500 group-hover:scale-[1.01]"
                      fallbackSrc={project.mobileImage}
                    />

                    {/* Carousel Nav Arrows on Desktop */}
                    {desktopGallery.length > 1 && (
                      <>
                        <button
                          onClick={prevDesktop}
                          className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer z-20 shadow-lg ${hoverArrowBg}`}
                          aria-label="Previous screenshot"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={nextDesktop}
                          className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer z-20 shadow-lg ${hoverArrowBg}`}
                          aria-label="Next screenshot"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {/* Caption Badge */}
                    <div
                      className={`absolute bottom-2 right-2 px-2 py-0.5 rounded bg-obsidian/90 border border-white/10 text-[8px] font-mono backdrop-blur-sm pointer-events-none max-w-[80%] truncate ${
                        isScheduler ? 'text-cyan-400' : 'text-orange-400'
                      }`}
                    >
                      {desktopGallery[selectedDesktopIdx]?.caption || 'VERIFIED PRODUCTION SCREEN'}
                    </div>
                  </div>
                ) : (
                  <ProjectScreenContent project={project} isMobile={false} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


