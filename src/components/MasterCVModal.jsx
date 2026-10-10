import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  Copy,
  Check,
  X,
  GraduationCap,
  Briefcase,
  Code2,
  Layers,
  Sparkles,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Globe,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

import { masterCVText, downloadMasterCVDoc, downloadMasterCVPdf } from '../utils/cvDocGenerator';
import HUDCorners from './ui/HUDCorners';

/**
 * Master CV Preview Modal
 * Features interactive tabs for Profile Summary, Education & Experience,
 * Technical Skills, Featured Projects, and Plain-Text Resume,
 * with direct Word (.doc) and PDF download handlers.
 */
export default function MasterCVModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [docDownloaded, setDocDownloaded] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(masterCVText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadDoc = (e) => {
    e?.preventDefault?.();
    downloadMasterCVDoc('Samuel_Patrick_Master_CV.doc');
    setDocDownloaded(true);
    setTimeout(() => setDocDownloaded(false), 3500);
  };

  const handleDownloadPdf = (e) => {
    e?.preventDefault?.();
    downloadMasterCVPdf('Samuel_Patrick_Software_Engineer_CV.pdf');
    setPdfDownloaded(true);
    setTimeout(() => setPdfDownloaded(false), 3500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-4xl my-auto max-h-[90vh] bg-[#0C0E12] border border-white/10 rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_35px_rgba(255,106,0,0.12)] flex flex-col z-10 text-left"
          >
            {/* Top Amber Accent Line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyber-orange to-transparent opacity-80" />

            {/* Tactical HUD Corners */}
            <HUDCorners size="sm" />

            {/* Header Telemetry Bar */}
            <div className="bg-[#12151B] px-5 sm:px-7 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-cyber-orange/10 border border-cyber-orange/20 flex items-center justify-center text-cyber-orange shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-white tracking-wide uppercase">
                    CURRICULUM VITAE • SAMUEL IMOLE PATRICK
                  </h3>
                  <span className="text-[10px] font-mono text-white/50 block">
                    Full-Stack Software Engineer • Mobile &amp; Web Developer • TASFUED Computer Science
                  </span>
                </div>
              </div>

              {/* Action Buttons & Close */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopy}
                  title="Copy Plain Text"
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-cyber-orange transition-all text-xs font-mono flex items-center space-x-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-cyber-orange" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="hidden md:inline">{copied ? 'COPIED' : 'COPY TEXT'}</span>
                </button>

                {/* Direct High-Contrast Download Button */}
                <a
                  href="/Samuel_Patrick_Master_CV.doc"
                  download="Samuel_Patrick_Master_CV.doc"
                  onClick={handleDownloadDoc}
                  title="Download Microsoft Word (.doc) Document"
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyber-orange to-cyber-crimson hover:from-[#FF7F11] hover:to-[#D90429] text-white font-mono font-bold text-xs flex items-center space-x-1.5 shadow-[0_0_15px_rgba(255,106,0,0.4)] hover:shadow-[0_0_20px_rgba(255,106,0,0.6)] transition-all cursor-pointer border border-cyber-bright/30"
                >
                  {docDownloaded ? <Check className="w-3.5 h-3.5 text-white" /> : <Download className="w-3.5 h-3.5" />}
                  <span>{docDownloaded ? 'DOWNLOADED .DOC!' : 'DOWNLOAD WORD (.DOC)'}</span>
                </a>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-all cursor-pointer ml-1"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-1 px-5 pt-3 bg-black/40 border-b border-white/5 overflow-x-auto">
              {[
                { id: 'overview', label: 'PROFILE SUMMARY', icon: Sparkles },
                { id: 'education', label: 'EDUCATION & SIWES', icon: GraduationCap },
                { id: 'skills', label: 'TECHNICAL SKILLS', icon: Code2 },
                { id: 'deployments', label: 'FEATURED PROJECTS', icon: Layers },
                { id: 'raw', label: 'PLAIN-TEXT RESUME', icon: FileText },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-2 rounded-t-lg text-[11px] font-mono font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer shrink-0 ${
                      activeTab === tab.id
                        ? 'bg-[#12151B] text-cyber-orange border-t-2 border-cyber-orange'
                        : 'text-white/40 hover:text-white/80 hover:bg-white/[0.02]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Body Content Area */}
            <div className="flex-1 p-5 sm:p-7 overflow-y-auto hud-scrollbar font-sans text-xs leading-relaxed text-white/90 select-text">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Top Profile Card */}
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-cyber-orange animate-pulse" />
                        <h4 className="font-display font-bold text-xl text-white">Samuel Imole Patrick</h4>
                        <span className="text-[10px] font-mono text-cyber-orange bg-cyber-orange/10 px-2 py-0.5 rounded border border-cyber-orange/30">
                          ESCANOR
                        </span>
                      </div>
                      <p className="text-white/70 font-mono text-xs mt-1">
                        Full-Stack Software Engineer • Mobile &amp; Web Developer
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] font-mono text-white/50">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-cyber-orange" />
                          <span>Mowe, Ogun State, Nigeria</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Mail className="w-3.5 h-3.5 text-cyber-orange" />
                          <a href="mailto:samuelimolepatrick@gmail.com" className="hover:underline text-white/80 hover:text-cyber-bright">samuelimolepatrick@gmail.com</a>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Phone className="w-3.5 h-3.5 text-cyber-orange" />
                          <a href="tel:+2348149224954" className="hover:underline text-white/80 hover:text-cyber-bright">+234 814 922 4954</a>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      <a
                        href="/Samuel_Patrick_Master_CV.doc"
                        download="Samuel_Patrick_Master_CV.doc"
                        onClick={handleDownloadDoc}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyber-orange to-cyber-crimson hover:from-[#FF7F11] hover:to-[#D90429] text-white text-xs font-semibold flex items-center space-x-2 transition-all shadow-[0_0_12px_rgba(255,106,0,0.3)] cursor-pointer"
                      >
                        {docDownloaded ? <Check className="w-3.5 h-3.5 text-white" /> : <Download className="w-3.5 h-3.5" />}
                        <span>{docDownloaded ? 'Word Downloaded!' : 'Download Word (.doc)'}</span>
                      </a>
                      <a
                        href="/Samuel_Patrick_Software_Engineer_CV.pdf"
                        download="Samuel_Patrick_Software_Engineer_CV.pdf"
                        onClick={handleDownloadPdf}
                        className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyber-orange/40 text-white/80 hover:text-white text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer"
                      >
                        {pdfDownloaded ? <Check className="w-3.5 h-3.5 text-cyber-orange" /> : <Download className="w-3.5 h-3.5 text-cyber-orange" />}
                        <span>{pdfDownloaded ? 'PDF Downloaded!' : 'PDF'}</span>
                      </a>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-3 text-white/80 text-sm leading-relaxed">
                    <h5 className="font-mono text-xs font-bold text-cyber-orange uppercase tracking-widest">
                      PROFESSIONAL SUMMARY
                    </h5>
                    <p>
                      Results-oriented Full-Stack Software Engineer with proven experience engineering reliable, production-ready applications across mobile, web, and cloud backends. Combines deep Computer Science fundamentals with modern full-stack development to deliver fast, secure, and user-friendly digital systems.
                    </p>
                    <p>
                      Strong track record building smooth native mobile apps with Flutter and Dart, responsive web applications with React, Next.js, and TypeScript, and scalable databases powered by PostgreSQL and Supabase.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: EDUCATION & SIWES */}
              {activeTab === 'education' && (
                <div className="space-y-5">
                  {/* University */}
                  <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-cyber-orange uppercase font-bold tracking-wider">
                          ACADEMIC DEGREE PROGRAM
                        </span>
                        <h4 className="font-display font-bold text-base text-white mt-0.5">
                          Tai Solarin Federal University of Education (TASFUED)
                        </h4>
                        <p className="text-white/60 font-mono text-xs">
                          Bachelor of Science (B.Sc.) in Computer Science • Ogun State, Nigeria
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-cyber-orange/10 border border-cyber-orange/30 text-cyber-orange text-[10px] font-mono font-bold">
                        STRONG ACADEMIC RECORD
                      </span>
                    </div>
                    <p className="text-white/70 text-xs mt-2 leading-relaxed">
                      Comprehensive coursework in algorithms, data structures, relational database architecture, system concurrency, operating systems, and object-oriented software engineering.
                    </p>
                  </div>

                  {/* SIWES Experience */}
                  <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-cyber-bright uppercase font-bold tracking-wider">
                          INDUSTRIAL TRAINING (SIWES)
                        </span>
                        <h4 className="font-display font-bold text-base text-white mt-0.5">
                          InfoSystem Consulting
                        </h4>
                        <p className="text-white/60 font-mono text-xs">
                          Software Engineering &amp; Database Intern (3-Month Intensive Program)
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                        COMPLETED
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-white/70 text-xs list-disc list-inside mt-2 leading-relaxed">
                      <li>Engineered a secure, offline-first exam and grading system for the AWBA CBT platform.</li>
                      <li>Implemented local SQLite and IndexedDB sync so exams continue uninterrupted during power or network outages.</li>
                      <li>Built real-time supervisor student monitoring tools and anti-cheat exam safeguards.</li>
                      <li>Designed normalized database schemas and fast server endpoints for seamless test management.</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 3: TECHNICAL SKILLS */}
              {activeTab === 'skills' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      category: 'Mobile App Engineering',
                      items: ['Flutter', 'Dart', 'Riverpod', 'GoRouter', 'Firebase Firestore', 'Supabase Auth', 'Offline Caching'],
                    },
                    {
                      category: 'Frontend Web Stack',
                      items: ['React.js', 'Next.js (App Router)', 'JavaScript (ES6+)', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5 / CSS3'],
                    },
                    {
                      category: 'Backend, Desktop & Databases',
                      items: ['Node.js', 'Electron Desktop', 'Supabase', 'PostgreSQL', 'IndexedDB / SQLite', 'REST APIs'],
                    },
                    {
                      category: 'Architecture & Developer Tools',
                      items: ['Clean Architecture', 'Double-Entry Ledgers', 'Git / GitHub', 'Cursor AI', 'VS Code', 'Figma', 'Postman'],
                    },
                  ].map((skillBlock, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                      <span className="font-mono text-xs font-bold text-cyber-orange block">
                        • {skillBlock.category}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {skillBlock.items.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80 font-mono text-[10px]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: FEATURED PROJECTS */}
              {activeTab === 'deployments' && (
                <div className="space-y-3">
                  {[
                    {
                      num: '01',
                      name: 'TASFUED Marketplace',
                      url: 'https://tasfuedmarketplace.com.ng',
                      tech: 'React, Vite, Tailwind CSS, Supabase, PostgreSQL',
                      desc: 'Campus marketplace connecting students for peer-to-peer buying and selling, featuring merchant verification badges, direct in-app chat, and fast product search.',
                    },
                    {
                      num: '02',
                      name: 'SCHEDULER (Mobile & Web)',
                      url: 'https://scheduler.nexlify.com.ng',
                      tech: 'Flutter, Dart, Supabase, Riverpod Architecture',
                      desc: 'Academic scheduling and lecture companion mobile app with offline timetable sync, automated lecture reminders, and built-in lecture video streaming.',
                    },
                    {
                      num: '03',
                      name: 'AWBA CBT Platform',
                      url: 'InfoSystem SIWES Project',
                      tech: 'React, Node.js, Electron, IndexedDB, SQLite, Tailwind CSS',
                      desc: 'Offline-first computer-based examination system engineered during my SIWES internship at InfoSystem Consulting. Features local SQLite database sync, automated instant grading, and anti-cheat exam security.',
                    },
                    {
                      num: '04',
                      name: 'FinTech Wallet & Payments',
                      url: 'Banking App Core',
                      tech: 'Flutter, Firebase Firestore, Node.js, Riverpod',
                      desc: 'Digital wallet and mobile banking app built with double-entry accounting ledger bookkeeping, peer-to-peer money transfers, and biometric PIN security.',
                    },
                    {
                      num: '05',
                      name: 'Sarkin Mota Group',
                      url: 'Luxury Showroom',
                      tech: 'Next.js, TypeScript, Tailwind CSS, GSAP',
                      desc: 'Modern web showroom for high-end luxury vehicles with dynamic car inventory filters, test drive booking workflows, and interactive 360° vehicle turntable inspection.',
                    },
                    {
                      num: '06',
                      name: 'The Gilded Table (Mobile)',
                      url: 'Dining Companion',
                      tech: 'Flutter, Dart, Supabase Auth, PostgreSQL',
                      desc: 'Fine dining companion app providing interactive real-time table reservations on a visual floor plan, digital multi-course tasting menus, and guest profiles.',
                    },
                    {
                      num: '07',
                      name: 'The Gilded Table (Web)',
                      url: 'Restaurant Dashboard',
                      tech: 'Next.js, TypeScript, Supabase, Tailwind CSS, PostgreSQL',
                      desc: 'Restaurant operations management dashboard featuring live dining room occupancy maps, kitchen order display (KDS), and revenue analytics.',
                    },
                  ].map((node) => (
                    <div key={node.num} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start space-x-3 hover:border-cyber-orange/30 transition-colors">
                      <span className="font-mono font-bold text-cyber-orange text-xs bg-cyber-orange/10 px-2 py-0.5 rounded shrink-0 border border-cyber-orange/30">
                        {node.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white text-sm">{node.name}</span>
                          {node.url.startsWith('http') ? (
                            <a
                              href={node.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[9px] font-mono text-cyber-bright hover:underline flex items-center space-x-0.5"
                            >
                              <span>{node.url.replace('https://', '')}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          ) : (
                            <span className="text-[9px] font-mono text-white/40 bg-white/5 px-1.5 rounded">{node.url}</span>
                          )}
                        </div>
                        <div className="text-[10px] font-mono text-cyber-orange mt-0.5">{node.tech}</div>
                        <p className="text-white/60 text-xs mt-1 leading-relaxed">{node.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: RAW PLAIN TEXT */}
              {activeTab === 'raw' && (
                <pre className="font-mono text-[11px] leading-relaxed text-white/80 whitespace-pre-wrap bg-black/60 p-4 rounded-xl border border-white/10">
                  {masterCVText}
                </pre>
              )}
            </div>

            {/* Bottom Modal Action Footer */}
            <div className="px-5 sm:px-7 py-3.5 bg-[#12151B] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-[11px] font-mono text-white/40">
                <ShieldCheck className="w-4 h-4 text-cyber-orange shrink-0" />
                <span>Official Resume &amp; Portfolio • Samuel Imole Patrick</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <a
                  href="/Samuel_Patrick_Master_CV.doc"
                  download="Samuel_Patrick_Master_CV.doc"
                  onClick={handleDownloadDoc}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-orange to-cyber-crimson hover:from-[#FF7F11] hover:to-[#D90429] text-white font-semibold text-xs tracking-wide shadow-[0_0_15px_rgba(255,106,0,0.35)] flex items-center justify-center space-x-2 cursor-pointer transition-all"
                >
                  {docDownloaded ? <Check className="w-4 h-4 text-white" /> : <Download className="w-4 h-4" />}
                  <span>{docDownloaded ? 'MS WORD CV DOWNLOADED!' : 'DOWNLOAD MS WORD CV (.DOC)'}</span>
                </a>

                <a
                  href="/Samuel_Patrick_Software_Engineer_CV.pdf"
                  download="Samuel_Patrick_Software_Engineer_CV.pdf"
                  onClick={handleDownloadPdf}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white font-semibold text-xs tracking-wide flex items-center justify-center space-x-2 cursor-pointer transition-all"
                >
                  {pdfDownloaded ? <Check className="w-4 h-4 text-cyber-orange" /> : <Download className="w-4 h-4 text-cyber-orange" />}
                  <span>{pdfDownloaded ? 'PDF DOWNLOADED!' : 'DOWNLOAD PDF'}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
