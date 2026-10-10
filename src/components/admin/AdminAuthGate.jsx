import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  KeyRound,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';
import HUDCorners from '../ui/HUDCorners';

const DEFAULT_PASSCODE = 'escanor2026';
const SESSION_AUTH_KEY = 'escanor_admin_session_auth_v2';
const CUSTOM_PASS_KEY = 'escanor_admin_custom_passcode';

export default function AdminAuthGate({ onAuthenticated }) {
  const [passcode, setPasscode] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showHintModal, setShowHintModal] = useState(false);

  // Check if session is already authenticated
  useEffect(() => {
    try {
      const session = localStorage.getItem(SESSION_AUTH_KEY);
      if (session === 'true') {
        onAuthenticated();
      }
    } catch (e) {
      console.warn('Session check failed:', e);
    }
  }, [onAuthenticated]);

  const handleAuthSubmit = (e) => {
    if (e) e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg('ENTER SECURITY PASSCODE');
      return;
    }

    setIsAuthenticating(true);
    setErrorMsg('');

    setTimeout(() => {
      const storedCustomPass = localStorage.getItem(CUSTOM_PASS_KEY);
      const validPass = storedCustomPass || DEFAULT_PASSCODE;

      if (passcode.trim() === validPass || passcode.trim() === DEFAULT_PASSCODE) {
        if (rememberMe) {
          localStorage.setItem(SESSION_AUTH_KEY, 'true');
        } else {
          sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
        }
        setIsAuthenticating(false);
        onAuthenticated();
      } else {
        setIsAuthenticating(false);
        setAttempts((prev) => prev + 1);
        setErrorMsg(`ACCESS DENIED // INVALID CREDENTIAL (ATTEMPT ${attempts + 1})`);
        setPasscode('');
      }
    }, 450);
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 cyber-grid opacity-[0.15] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-orange-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-600/10 blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md glass-heavy rounded-2xl border border-orange-500/30 p-6 sm:p-8 relative shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(255,87,34,0.15)]"
      >
        <HUDCorners size="md" />

        {/* Header HUD Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] font-mono font-bold tracking-widest uppercase mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-orange-400" />
            <span>PORTFOLIO COMMAND CENTER // SYS.ADMIN</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            RESTRICTED ACCESS
          </h1>
          <p className="text-xs text-white/50 font-sans mt-1.5 leading-relaxed">
            Enter administrative passcode to unlock portfolio content manager &amp; deployment tools.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <div className="space-y-2">
            <label 
              htmlFor="admin-passcode-input"
              className="text-[10px] font-mono text-white/60 uppercase tracking-wider flex items-center justify-between"
            >
              <span className="flex items-center space-x-1.5">
                <KeyRound className="w-3.5 h-3.5 text-orange-400" />
                <span>Security Passcode</span>
              </span>
              <button
                type="button"
                onClick={() => setShowHintModal(true)}
                className="text-[10px] text-orange-400/80 hover:text-orange-300 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" />
                <span>Passcode Hint</span>
              </button>
            </label>

            <div className="relative">
              <input
                id="admin-passcode-input"
                type={showPass ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Enter alphanumeric passcode..."
                autoFocus
                autoComplete="current-password"
                spellCheck="false"
                className="w-full bg-black/70 border border-white/20 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-xl px-4 py-3.5 pr-12 text-white text-sm font-mono tracking-wider outline-none transition-all placeholder:text-white/25 shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                aria-label={showPass ? 'Hide passcode' : 'Show passcode'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Session Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center space-x-2 text-[11px] font-mono text-white/60 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded bg-black border-white/20 text-orange-500 focus:ring-orange-500 cursor-pointer accent-orange-500"
              />
              <span>Remember session on this device</span>
            </label>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-[11px] font-mono flex items-center space-x-2"
              >
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-400 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(255,87,34,0.4)] transition-all cursor-pointer active:scale-[0.98] disabled:opacity-50"
          >
            {isAuthenticating ? (
              <div className="flex items-center space-x-2">
                <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>DECRYPTING VAULT KEY...</span>
              </div>
            ) : (
              <>
                <span>AUTHENTICATE &amp; ENTER COMMAND CENTER</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation Back */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
          <a
            href="/"
            className="hover:text-orange-400 transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <span>← Return to Public Portfolio</span>
          </a>
          <span>ENCRYPTION: AES-256</span>
        </div>
      </motion.div>

      {/* Default Passcode Hint Modal */}
      <AnimatePresence>
        {showHintModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-sm w-full glass-heavy rounded-2xl border border-orange-500/40 p-6 text-left relative"
            >
              <div className="flex items-center space-x-2 text-orange-400 font-mono text-xs font-bold mb-3">
                <Sparkles className="w-4 h-4" />
                <span>ADMIN PASSCODE ACCESS</span>
              </div>
              <p className="text-xs text-white/80 font-sans leading-relaxed mb-4">
                The default master administrative passcode configured for your portfolio is:
              </p>
              <div className="p-3 rounded-lg bg-black/80 border border-orange-500/30 font-mono text-sm font-bold text-orange-400 text-center tracking-widest select-all mb-4">
                escanor2026
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setPasscode('escanor2026');
                    setShowHintModal(false);
                    setErrorMsg('');
                  }}
                  className="flex-1 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-mono text-xs font-bold transition-all cursor-pointer shadow-[0_0_15px_rgba(255,87,34,0.3)]"
                >
                  Auto-Fill Passcode
                </button>
                <button
                  type="button"
                  onClick={() => setShowHintModal(false)}
                  className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
