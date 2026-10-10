import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Key,
  RotateCcw,
  Sparkles,
  Zap,
  Gauge,
  Compass,
  MessageSquare,
  ArrowRight,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import SarkinMotaLogo from './SarkinMotaLogo';
import { SARKIN_MOTA_FLEET } from '../../data/sarkinMotaVehicles';

export default function VehicleTurntable({ isMobile = false }) {
  const [currentIndex, setCurrentIndex] = useState(8); // Default to Ferrari 296 GTB (09/10) as in main reference
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'heritage' | 'customizer'
  const [inquireModal, setInquireModal] = useState(false);

  const vehicle = SARKIN_MOTA_FLEET[currentIndex] || SARKIN_MOTA_FLEET[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SARKIN_MOTA_FLEET.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SARKIN_MOTA_FLEET.length) % SARKIN_MOTA_FLEET.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[580px] bg-radial-gradient from-charcoal/80 via-obsidian to-black text-white overflow-hidden flex flex-col justify-between font-sans select-none">
      {/* Background Architectural Lighting & Radial Studio Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-amber-500/10 rounded-full blur-[110px] pointer-events-none z-0" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[280px] h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none z-0" />

      {/* TOP HEADER / LOGO BAR */}
      <header className="relative z-20 px-4 pt-3 pb-2 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-md">
        {/* Left / Back indicator */}
        <div className="flex items-center space-x-2 text-[10px] font-mono text-amber-400/90 tracking-wider">
          <button
            type="button"
            onClick={handlePrev}
            className="flex items-center space-x-1 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">BACK TO SHOWROOM</span>
          </button>
        </div>

        {/* Center / Brand Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1">
          <SarkinMotaLogo size={isMobile ? 'sm' : 'md'} />
        </div>

        {/* Right / Telemetry & Counter */}
        <div className="flex items-center space-x-2 text-[10px] font-mono">
          <span className="text-amber-400 font-bold">
            {vehicle.num} <span className="text-white/40">/ 10</span>
          </span>
          <span className="hidden md:inline-block px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-[9px] text-amber-300">
            {vehicle.category}
          </span>
        </div>
      </header>

      {/* CENTER / TURNTABLE STAGE */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-2 my-auto">
        {/* Colorway Tag Pill */}
        <motion.div
          key={`color-${vehicle.id}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-1 inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded border border-amber-500/40 bg-black/60 backdrop-blur text-[9px] font-mono tracking-widest text-amber-300 uppercase shadow-[0_0_15px_rgba(212,175,55,0.15)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>{vehicle.colorway}</span>
        </motion.div>

        {/* 3D Turntable Platform & Vehicle Display */}
        <div className="relative w-full max-w-lg aspect-[16/9] flex items-center justify-center">
          {/* Circular Pedestal Turntable Base */}
          <div className="absolute bottom-1 w-[85%] h-[40%] rounded-[100%] border border-amber-500/30 bg-gradient-to-b from-white/5 to-black/90 shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_1px_10px_rgba(212,175,55,0.3)] flex items-center justify-center">
            {/* Turntable Groove Lines */}
            <div className="w-[88%] h-[75%] rounded-[100%] border border-white/10" />
            <div className="absolute w-[65%] h-[55%] rounded-[100%] border border-amber-400/20" />
          </div>

          {/* Vehicle Animated Image Render */}
          <AnimatePresence mode="wait">
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full h-full flex items-center justify-center p-2"
            >
              <img
                src={vehicle.images.turntable}
                alt={vehicle.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:scale-[1.03]"
                onError={(e) => {
                  // Graceful fallback to full capture if single cropped asset misses
                  e.currentTarget.src = vehicle.images.fullCapture;
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Studio Stage Label */}
          <div className="absolute bottom-0 text-[8px] font-mono tracking-[0.25em] text-amber-400/60 uppercase">
            SARKIN MOTA GROUP • 360° TURNTABLE PRESENTATION
          </div>
        </div>
      </div>

      {/* LOWER SPECIFICATION & PRICING PANEL */}
      <div className="relative z-20 px-4 pb-3 pt-2 bg-gradient-to-t from-black via-obsidian/95 to-transparent border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          {/* Header metadata row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pb-2.5 border-b border-white/10">
            <div className="text-left">
              {/* Category & Year Tag */}
              <div className="text-[9px] font-mono tracking-widest text-amber-400 uppercase flex items-center space-x-1.5 mb-0.5">
                <span>{vehicle.brand}</span>
                <span>•</span>
                <span>{vehicle.year}</span>
              </div>
              {/* Vehicle Title */}
              <h3 className="font-display font-bold text-white text-base md:text-xl tracking-wide leading-tight">
                {vehicle.name}
              </h3>
              <p className="text-[10px] md:text-xs text-white/70 max-w-xl mt-0.5 line-clamp-1">
                {vehicle.tagline}
              </p>
            </div>

            {/* Price block */}
            <div className="text-left md:text-right shrink-0">
              <span className="text-[8px] font-mono uppercase tracking-widest text-white/40 block">
                ACQUISITION PRICE
              </span>
              <span className="font-mono font-bold text-white text-lg md:text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
                {vehicle.price}
              </span>
              <div className="flex items-center md:justify-end space-x-1 text-[8px] font-mono text-amber-400/80 mt-0.5">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                <span>Bespoke client concierge advisory included</span>
              </div>
            </div>
          </div>

          {/* Vehicle Specifications Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-2.5 text-left">
            {/* 1. Engine */}
            <div className="p-2 rounded bg-white/[0.03] border border-white/5 backdrop-blur">
              <span className="text-[8px] font-mono uppercase tracking-wider text-white/40 block">
                ENGINE
              </span>
              <span className="font-mono font-bold text-white text-[10px] md:text-xs truncate block mt-0.5">
                {vehicle.specs.engine}
              </span>
            </div>

            {/* 2. Horsepower */}
            <div className="p-2 rounded bg-white/[0.03] border border-white/5 backdrop-blur">
              <span className="text-[8px] font-mono uppercase tracking-wider text-white/40 block">
                HORSEPOWER
              </span>
              <span className="font-mono font-bold text-amber-400 text-[10px] md:text-xs truncate block mt-0.5">
                {vehicle.specs.horsepower}
              </span>
            </div>

            {/* 3. Drivetrain */}
            <div className="p-2 rounded bg-white/[0.03] border border-white/5 backdrop-blur">
              <span className="text-[8px] font-mono uppercase tracking-wider text-white/40 block">
                DRIVETRAIN
              </span>
              <span className="font-mono font-bold text-white text-[10px] md:text-xs truncate block mt-0.5">
                {vehicle.specs.drivetrain}
              </span>
            </div>

            {/* 4. Fuel System / Transmission */}
            <div className="p-2 rounded bg-white/[0.03] border border-white/5 backdrop-blur">
              <span className="text-[8px] font-mono uppercase tracking-wider text-white/40 block">
                FUEL SYSTEM
              </span>
              <span className="font-mono font-bold text-white text-[10px] md:text-xs truncate block mt-0.5">
                {vehicle.specs.fuelSystem}
              </span>
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <button
              type="button"
              onClick={() => setInquireModal(true)}
              className="flex-1 min-w-[160px] py-2 px-3 rounded bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-mono font-bold text-xs tracking-wider flex items-center justify-center space-x-1.5 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 text-black" />
              <span>ENQUIRE ABOUT THIS VEHICLE</span>
            </button>

            <button
              type="button"
              onClick={() => setInquireModal(true)}
              className="py-2 px-3.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs tracking-wider flex items-center justify-center space-x-1.5 transition-all"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">PRIVATE VIEWING</span>
            </button>
          </div>

          {/* Sequential 01 to 10 Fleet Pagination */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-1">
            {/* Counter */}
            <div className="font-mono text-xs font-bold text-amber-400 hidden sm:block shrink-0">
              {vehicle.num} <span className="text-white/30 font-normal">/ 10</span>
            </div>

            {/* Numeric pills 01 to 10 */}
            <div className="flex items-center space-x-1 overflow-x-auto py-1 scrollbar-none">
              {SARKIN_MOTA_FLEET.map((car, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={car.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`px-2 py-1 rounded font-mono text-[10px] font-bold transition-all ${
                      isActive
                        ? 'bg-amber-400 text-black shadow-[0_0_12px_rgba(212,175,55,0.6)] scale-105'
                        : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/5'
                    }`}
                  >
                    {car.num}
                  </button>
                );
              })}
            </div>

            {/* Next / Prev Controls */}
            <div className="flex items-center space-x-1 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono text-white/80 hover:text-white flex items-center space-x-0.5"
              >
                <ChevronLeft className="w-3 h-3" />
                <span className="hidden md:inline">PREV</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono text-amber-400 hover:text-white flex items-center space-x-0.5"
              >
                <span className="hidden md:inline">NEXT</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* INQUIRY MODAL OVERLAY */}
      <AnimatePresence>
        {inquireModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              className="w-full max-w-md p-5 rounded-2xl bg-gradient-to-b from-charcoal to-obsidian border border-amber-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-left font-sans"
            >
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <SarkinMotaLogo size="sm" />
                </div>
                <button
                  type="button"
                  onClick={() => setInquireModal(false)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-mono"
                >
                  ✕
                </button>
              </div>

              <div className="mt-3">
                <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest block">
                  BESPOKE ACQUISITION CONCIERGE
                </span>
                <h4 className="font-display font-bold text-white text-base mt-0.5">
                  {vehicle.name}
                </h4>
                <div className="font-mono text-amber-300 font-bold text-sm mt-1">
                  Listed Price: {vehicle.price}
                </div>
                <p className="text-xs text-white/60 mt-2 leading-relaxed">
                  Direct inquiry channeled to Sarkin Mota Group executive sales division. Private test drives and armoring specifications available upon appointment.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setInquireModal(false)}
                  className="px-4 py-2 rounded bg-amber-400 text-black font-mono font-bold text-xs hover:bg-amber-300 transition-colors"
                >
                  DISPATCH TO CONCIERGE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
