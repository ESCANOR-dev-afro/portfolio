import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Copy,
  Check,
  Download,
  FileCode,
  Sparkles,
  Info,
  Terminal,
} from 'lucide-react';
import HUDCorners from '../ui/HUDCorners';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export default function DataExportModal({ isOpen, onClose }) {
  const { exportAsJavaScript, exportAsJSON, projects, certificates } = usePortfolioData();
  const [copied, setCopied] = useState(false);
  const [activeFormat, setActiveFormat] = useState('js'); // 'js' | 'json'

  if (!isOpen) return null;

  const codeContent = activeFormat === 'js' ? exportAsJavaScript() : exportAsJSON();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const filename = activeFormat === 'js' ? 'portfolioData.js' : 'portfolioData.json';
    const mimeType = activeFormat === 'js' ? 'application/javascript' : 'application/json';
    const blob = new Blob([codeContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="w-full max-w-4xl glass-heavy rounded-2xl border border-orange-500/30 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] my-8 text-left relative flex flex-col max-h-[90vh]"
      >
        <HUDCorners size="md" />

        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 bg-graphite/60 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                EXPORT DATA STORE &amp; CODE SYNC
              </h2>
              <p className="text-xs text-white/50 font-mono mt-0.5">
                Export current state with {projects.length} Projects and {certificates.length} Credentials.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Control Bar */}
        <div className="p-4 bg-black/40 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="inline-flex p-1 rounded-xl bg-obsidian border border-white/10 font-mono text-xs">
            <button
              onClick={() => setActiveFormat('js')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                activeFormat === 'js'
                  ? 'bg-orange-500 text-white shadow-[0_0_10px_rgba(255,87,34,0.4)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              portfolioData.js (JavaScript)
            </button>
            <button
              onClick={() => setActiveFormat('json')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                activeFormat === 'json'
                  ? 'bg-orange-500 text-white shadow-[0_0_10px_rgba(255,87,34,0.4)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              JSON Data Backup
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-xl border font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                  : 'bg-white/5 border-white/15 hover:border-orange-500/50 hover:bg-orange-500/10 text-white'
              }`}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-orange-400" />}
              <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY CODE'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-[0_0_15px_rgba(255,87,34,0.3)] transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD FILE</span>
            </button>
          </div>
        </div>

        {/* Code Content Box */}
        <div className="flex-1 overflow-hidden p-6 bg-black/80 flex flex-col">
          <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-xs font-mono text-white/80 flex items-center space-x-2 mb-4 shrink-0">
            <Info className="w-4 h-4 text-orange-400 shrink-0" />
            <span>
              <strong>Auto-Sync Active:</strong> Your browser local storage is already updating the live portfolio in real-time. To commit these changes permanently to git, replace the contents of <code>src/data/portfolioData.js</code> with this generated code.
            </span>
          </div>

          <div className="flex-1 overflow-auto rounded-xl border border-white/10 bg-black/90 p-4 font-mono text-xs text-white/90 select-text hud-scrollbar">
            <pre className="whitespace-pre">{codeContent}</pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-graphite/40 flex items-center justify-between text-[11px] font-mono text-white/50 shrink-0">
          <span>Target File: <code>src/data/portfolioData.js</code></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </motion.div>
    </div>
  );
}
