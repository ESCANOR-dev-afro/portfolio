import React from 'react';

/**
 * Official Sarkin Mota Group Gold-Accented Crown Logo Component
 * High-fidelity vector rendering with metallic gold gradients and authentic typography.
 */
export default function SarkinMotaLogo({ className = '', size = 'md' }) {
  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  return (
    <div className={`flex flex-col items-center select-none text-center ${className}`}>
      {/* Crown / M Emblem */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 100 64"
          className={`${isSmall ? 'w-8 h-5' : isLarge ? 'w-16 h-10' : 'w-11 h-7'} drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldCrownLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="30%" stopColor="#E5C07B" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8A6417" />
            </linearGradient>
            <linearGradient id="goldCrownDark" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E5C07B" />
              <stop offset="50%" stopColor="#C99827" />
              <stop offset="100%" stopColor="#5E430B" />
            </linearGradient>
            <linearGradient id="goldCrownCenter" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B3801C" />
              <stop offset="50%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>

          {/* Left Wing */}
          <polygon
            points="10,4 32,4 32,54 20,44 10,48"
            fill="url(#goldCrownLight)"
          />
          {/* Right Wing */}
          <polygon
            points="90,4 68,4 68,54 80,44 90,48"
            fill="url(#goldCrownDark)"
          />
          {/* Central Peak / V */}
          <polygon
            points="32,4 50,42 68,4 54,4 50,22 46,4"
            fill="url(#goldCrownCenter)"
          />
          {/* Base facets */}
          <polygon
            points="20,44 32,54 50,60 50,42"
            fill="url(#goldCrownDark)"
          />
          <polygon
            points="80,44 68,54 50,60 50,42"
            fill="url(#goldCrownLight)"
          />
        </svg>
      </div>

      {/* Brand Title */}
      <div className="mt-1 flex flex-col items-center">
        <span
          className={`font-display font-extrabold tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 leading-tight uppercase ${
            isSmall ? 'text-[9px]' : isLarge ? 'text-base' : 'text-[11px]'
          }`}
        >
          SARKIN MOTA
        </span>
        <div className="flex items-center space-x-1.5 w-full justify-center mt-0.5 opacity-90">
          <div className="h-[0.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent flex-1 max-w-[20px]" />
          <span
            className={`font-mono font-medium tracking-[0.35em] text-amber-300/80 uppercase ${
              isSmall ? 'text-[6.5px]' : isLarge ? 'text-[10px]' : 'text-[7.5px]'
            }`}
          >
            GROUP
          </span>
          <div className="h-[0.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent flex-1 max-w-[20px]" />
        </div>
      </div>
    </div>
  );
}
