import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RotateCcw,
  Sparkles,
  Layers,
  Car,
  Image as ImageIcon,
  ShieldCheck,
  Compass,
  ArrowUpRight,
} from 'lucide-react';
import SarkinMotaLogo from './SarkinMotaLogo';
import VehicleTurntable from './VehicleTurntable';
import { SARKIN_MOTA_FLEET } from '../../data/sarkinMotaVehicles';

export default function ShowroomStudio({ isMobile = false }) {
  const [viewMode, setViewMode] = useState('turntable'); // 'turntable' | 'gallery' | 'specs'

  return (
    <div className="w-full h-full flex flex-col bg-obsidian text-white overflow-hidden font-sans">
      {/* View Switcher Sub-Bar */}
      <div className="z-20 px-3 py-1.5 bg-black/60 border-b border-white/5 flex items-center justify-between text-[10px] font-mono">
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => setViewMode('turntable')}
            className={`px-2.5 py-1 rounded transition-all flex items-center space-x-1.5 ${
              viewMode === 'turntable'
                ? 'bg-amber-400 text-black font-bold shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <RotateCcw className="w-3 h-3" />
            <span>TURNTABLE PRESENTATION</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('gallery')}
            className={`px-2.5 py-1 rounded transition-all flex items-center space-x-1.5 ${
              viewMode === 'gallery'
                ? 'bg-amber-400 text-black font-bold shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <ImageIcon className="w-3 h-3" />
            <span>CINEMATIC GARAGE</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center space-x-1 text-amber-400/80">
          <ShieldCheck className="w-3 h-3" />
          <span>VERIFIED SARKIN MOTA ASSETS</span>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 relative overflow-y-auto">
        {viewMode === 'turntable' ? (
          <VehicleTurntable isMobile={isMobile} />
        ) : (
          /* CINEMATIC GARAGE / FLEET GALLERY */
          <div className="p-4 space-y-4 text-left">
            <div className="relative rounded-xl overflow-hidden border border-amber-500/30 group">
              <img
                src="/screenshots/sarkin-mota/sarkin-landing-desktop.png"
                alt="Sarkin Mota Group Hero Showroom"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-4">
                <span className="text-[9px] font-mono text-amber-400 tracking-widest uppercase">
                  EXECUTIVE ARCHITECTURAL HANGAR
                </span>
                <h4 className="text-white font-display font-bold text-lg">
                  Automotive Excellence. Redefined.
                </h4>
                <p className="text-xs text-white/70 max-w-md mt-1">
                  Private showcase hangar featuring mid-engine American performance and ultra-luxury bespoke client commissions.
                </p>
              </div>
            </div>

            {/* Grid of Authentic Showroom Captures */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg overflow-hidden border border-white/10 bg-white/[0.02] p-2">
                <img
                  src="/screenshots/sarkin-mota/sarkin-ferrari-296gtb-turntable.png"
                  alt="Ferrari 296 GTB Turntable"
                  className="w-full h-40 object-cover rounded"
                />
                <div className="mt-2 flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Ferrari 296 GTB Assetto Fiorano</span>
                  <span className="font-mono text-amber-400 font-bold">₦580,000,000</span>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden border border-white/10 bg-white/[0.02] p-2">
                <img
                  src="/screenshots/sarkin-mota/sarkin-cybertruck-turntable.png"
                  alt="Tesla Cybertruck Cyberbeast"
                  className="w-full h-40 object-cover rounded"
                />
                <div className="mt-2 flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Tesla Cybertruck Cyberbeast</span>
                  <span className="font-mono text-amber-400 font-bold">₦290,000,000</span>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden border border-white/10 bg-white/[0.02] p-2">
                <img
                  src="/screenshots/sarkin-mota/sarkin-urus-turntable.png"
                  alt="Lamborghini Urus Performante"
                  className="w-full h-40 object-cover rounded"
                />
                <div className="mt-2 flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Lamborghini Urus Performante</span>
                  <span className="font-mono text-amber-400 font-bold">₦450,000,000</span>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden border border-white/10 bg-white/[0.02] p-2">
                <img
                  src="/screenshots/sarkin-mota/sarkin-bmw-760i-mobile.png"
                  alt="BMW 760i xDrive Excellence"
                  className="w-full h-40 object-cover rounded"
                />
                <div className="mt-2 flex justify-between items-center text-xs">
                  <span className="font-bold text-white">BMW 760i xDrive Excellence</span>
                  <span className="font-mono text-amber-400 font-bold">₦260,000,000</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
