import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '', variant = 'hud' }) {
  const { theme, isDark, toggleTheme } = useTheme();

  if (variant === 'simple') {
    return (
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
        title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
        className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
          isDark
            ? 'bg-white/5 hover:bg-orange-500/20 text-white/70 hover:text-orange-400 border border-white/10'
            : 'bg-slate-100 hover:bg-amber-500/20 text-slate-700 hover:text-amber-600 border border-slate-200 shadow-sm'
        } ${className}`}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-800" />}
        </motion.div>
      </button>
    );
  }

  // HUD Variant for Navigation Bar
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Toggle Theme Mode (Current: ${isDark ? 'Dark' : 'Light'})`}
      title={`Switch to ${isDark ? 'Light Corporate View' : 'Dark Cyber View'}`}
      className={`relative flex items-center justify-center p-1.5 xs:p-2 sm:px-2.5 rounded-lg transition-all cursor-pointer group ${
        isDark
          ? 'bg-black/60 hover:bg-orange-500/15 border border-white/10 hover:border-orange-500/40 text-white/70 hover:text-orange-400'
          : 'bg-slate-100 hover:bg-amber-500/15 border border-slate-300 hover:border-amber-500/40 text-slate-700 hover:text-amber-600 shadow-sm'
      } ${className}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -180, scale: 0.7, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 180, scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex items-center space-x-1.5"
      >
        {isDark ? (
          <>
            <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
            <span className="hidden md:inline font-mono text-[9px] font-bold text-amber-300 tracking-wider uppercase">
              LIGHT
            </span>
          </>
        ) : (
          <>
            <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-800 drop-shadow-[0_0_4px_rgba(0,0,0,0.3)]" />
            <span className="hidden md:inline font-mono text-[9px] font-bold text-slate-800 tracking-wider uppercase">
              DARK
            </span>
          </>
        )}
      </motion.div>
    </button>
  );
}
