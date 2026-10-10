import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Terminal,
  Workflow,
  Database,
  Layers,
  RefreshCw,
  ShieldCheck,
  GraduationCap,
  Briefcase,
} from 'lucide-react';
import SectionBadge from '../components/ui/SectionBadge';
import { usePortfolioData } from '../context/PortfolioDataContext';

const defaultTerminalLines = [
  'Starting developer console...',
  'Checking core tools: React, Next.js, Flutter, Supabase... Ready',
  'Loading TASFUED Marketplace (Campus Commerce)... Online',
  'Loading SCHEDULER Mobile (Flutter + Supabase)... Online',
  'Loading AWBA CBT (Offline Exam System)... Ready',
  'Connecting to PostgreSQL & Supabase database... Connected',
  'Database query latency: < 20ms (Fast response)',
  'All featured project applications active.',
  'Available for new software engineering roles and projects.',
];

const tabs = [
  { id: 'terminal', label: 'LIVE CONSOLE', icon: Terminal },
  { id: 'api', label: 'FULL-STACK FLOW', icon: Workflow },
  { id: 'database', label: 'DATABASE SCHEMA', icon: Database },
  { id: 'blueprint', label: 'SYSTEM OVERVIEW', icon: Layers },
];

/**
 * About Section with bio text and interactive 4-tab developer console.
 */
export default function AboutTerminal() {
  const { siteContent, projects } = usePortfolioData();
  const about = siteContent?.about || {};

  const [activeTab, setActiveTab] = useState('terminal');
  const [lines, setLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [typing, setTyping] = useState('');

  const terminalLines = [
    'Starting developer console...',
    'Checking core tools: React, Next.js, Flutter, Supabase... Ready',
    'Loading TASFUED Marketplace (Campus Commerce)... Online',
    'Loading SCHEDULER Mobile (Flutter + Supabase)... Online',
    'Loading AWBA CBT (Offline Exam System)... Ready',
    'Connecting to PostgreSQL & Supabase database... Connected',
    'Database query latency: < 20ms (Fast response)',
    `All ${projects?.length || 7} featured project applications active.`,
    'Available for new software engineering roles and projects.',
  ];

  /* Terminal typing effect */
  useEffect(() => {
    if (activeTab !== 'terminal') return;

    if (lineIndex < terminalLines.length) {
      const line = terminalLines[lineIndex];
      let charIdx = 0;
      setTyping('');

      const interval = setInterval(() => {
        if (charIdx < line.length) {
          setTyping((prev) => prev + line.charAt(charIdx));
          charIdx++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setLines((prev) => [...prev, line]);
            setTyping('');
            setLineIndex((prev) => prev + 1);
          }, 600);
        }
      }, 35);

      return () => clearInterval(interval);
    } else {
      const timeout = setTimeout(() => {
        setLines([]);
        setLineIndex(0);
        setTyping('');
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex, activeTab]);

  const resetTerminal = () => {
    setLines([]);
    setLineIndex(0);
    setTyping('');
  };

  return (
    <section
      id="about"
      className="relative py-28 bg-surface overflow-hidden border-b border-white/5 select-none"
    >
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-[0.1] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-orange-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* === Bio Column === */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <SectionBadge>{about.badge || 'About Me • Background & Experience'}</SectionBadge>

            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-display">
              {about.title || 'About Samuel Patrick'}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mt-4 mb-8 rounded-full" />

            <div className="space-y-5 text-white/80 font-sans text-sm leading-relaxed">
              <p>
                {about.paragraph1 ||
                  'I am a Full-Stack Web and Mobile Application Developer studying Computer Science at Tai Solarin Federal University of Education (TASFUED) in Ogun State, Nigeria.'}
              </p>
              <p>
                {about.paragraph2 ||
                  'During my 3-month Industrial Training (SIWES) at InfoSystem Consulting, I engineered core offline database structures, authentication middleware, and localized testing systems like the AWBA CBT platform.'}
              </p>
              <p>
                {about.paragraph3 ||
                  'My core toolset spans React, Next.js, TypeScript, Flutter, Dart, Supabase, PostgreSQL, and Firebase. I combine solid computer science fundamentals and database optimization with clean design to build software that performs reliably at scale.'}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10 font-mono text-left">
              <div>
                <span className="block text-2xl font-bold text-orange-400">
                  {about.stat1Value || `${projects?.length || 7} Apps`}
                </span>
                <span className="text-[10px] uppercase text-white/40 tracking-wider">
                  {about.stat1Label || 'FEATURED PROJECTS'}
                </span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-amber-400">
                  {about.stat2Value || 'TASFUED'}
                </span>
                <span className="text-[10px] uppercase text-white/40 tracking-wider">
                  {about.stat2Label || 'COMPUTER SCIENCE'}
                </span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-white">
                  {about.stat3Value || 'SIWES'}
                </span>
                <span className="text-[10px] uppercase text-white/40 tracking-wider">
                  {about.stat3Label || 'INFOSYSTEM INTERN'}
                </span>
              </div>
            </div>
          </div>

          {/* === Terminal Column === */}
          <div className="lg:col-span-7">
            <div className="relative rounded-xl border border-orange-500/30 bg-obsidian/90 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.6)] glass">
              {/* HUD corners */}
              <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-orange-500" />
              <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-orange-500" />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-orange-500" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-orange-500" />

              {/* Terminal Header */}
              <div className="bg-graphite/55 px-5 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-600/50" />
                  <span className="ml-2 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                    DEVELOPER CONSOLE • {tabs.find((t) => t.id === activeTab)?.label || activeTab.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-[9px] font-mono text-orange-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_#ff5722]" />
                  <span>SUPABASE ONLINE</span>
                </div>
              </div>

              {/* Tab Sidebar + Content */}
              <div className="grid grid-cols-1 sm:grid-cols-4 min-h-[350px]">
                {/* Sidebar */}
                <div className="sm:col-span-1 border-r border-white/5 bg-black/20 flex sm:flex-col overflow-x-auto sm:overflow-x-visible">
                  {tabs.map((tab) => {
                    const TabIcon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 sm:flex-none flex items-center justify-center sm:justify-start space-x-2 px-4 py-3.5 font-mono text-[10px] tracking-wider transition-all border-b sm:border-b-0 sm:border-r-[2px] cursor-pointer text-left ${
                          activeTab === tab.id
                            ? 'bg-white/5 border-orange-500 text-orange-400 font-bold'
                            : 'border-transparent text-white/50 hover:text-white/80 hover:bg-white/[0.02]'
                        }`}
                      >
                        <TabIcon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Content Area */}
                <div className="sm:col-span-3 p-5 font-mono text-xs overflow-y-auto max-h-[380px] bg-black/10 hud-scrollbar select-text relative text-left">
                  {/* Terminal Tab */}
                  {activeTab === 'terminal' && (
                    <div className="space-y-2">
                      <div className="text-white/30 text-[10px] mb-2 flex items-center justify-between select-none">
                        <span>Console active: {new Date().toLocaleTimeString()}</span>
                        <button
                          onClick={resetTerminal}
                          className="hover:text-orange-400 p-0.5 cursor-pointer"
                          title="Restart Console"
                        >
                          <RefreshCw className="w-3 h-3" />
                        </button>
                      </div>

                      {lines.map((line, i) => (
                        <div key={i} className="flex items-start space-x-2">
                          <span className="text-orange-400 select-none">{'>'}</span>
                          <span
                            className={
                              line.includes('Online') ||
                              line.includes('Ready') ||
                              line.includes('Connected') ||
                              line.includes('active')
                                ? 'text-orange-400'
                                : 'text-white/90'
                            }
                          >
                            {line}
                          </span>
                        </div>
                      ))}

                      {typing && (
                        <div className="flex items-start space-x-2">
                          <span className="text-orange-400 select-none">{'>'}</span>
                          <span className="text-white/90">{typing}</span>
                          <span className="w-1.5 h-3 bg-orange-400 animate-pulse ml-0.5 inline-block" />
                        </div>
                      )}

                      {lines.length === terminalLines.length && (
                        <div className="mt-4 pt-4 border-t border-white/5 text-white/40 text-[10px] flex items-center space-x-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                          <span>ALL {projects?.length || 7} APPLICATIONS ONLINE • READY FOR REVIEW</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* API & Supabase Tab */}
                  {activeTab === 'api' && (
                    <div className="h-full flex flex-col justify-between">
                      <div className="text-white/40 text-[10px] mb-4 uppercase tracking-wider">
                        FULL-STACK ARCHITECTURE FLOW
                      </div>
                      <div className="flex flex-col items-center justify-center space-y-5 py-3 relative">
                        <div className="z-10 px-4 py-2 rounded bg-graphite/90 border border-white/10 flex items-center space-x-2 text-white">
                          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_#ff5722]" />
                          <span className="font-bold text-[10px]">FRONTEND APPS (REACT / NEXT.JS / FLUTTER)</span>
                        </div>
                        <div className="z-10 px-4 py-2 rounded bg-orange-500/10 border border-orange-500/40 flex items-center space-x-2 text-orange-400">
                          <span className="w-2 h-2 rounded-full bg-orange-500" />
                          <span className="font-bold text-[10px]">SUPABASE &amp; REST APIS</span>
                        </div>
                        <div className="z-10 px-4 py-2 rounded bg-obsidian border border-white/15 flex items-center space-x-2 text-white">
                          <span className="w-2 h-2 rounded-full bg-amber-600" />
                          <span className="font-bold text-[10px]">POSTGRESQL DATABASE &amp; AUTH</span>
                        </div>
                      </div>
                      <div className="text-[9px] text-white/40 text-center mt-2 font-mono">
                        FAST QUERY PERFORMANCE • SECURE ROW-LEVEL ACCESS POLICIES
                      </div>
                    </div>
                  )}

                  {/* PostgreSQL Database Tab */}
                  {activeTab === 'database' && (
                    <div>
                      <div className="text-white/40 text-[10px] mb-4 uppercase tracking-wider">
                        POSTGRESQL RELATIONAL SCHEMA SPECIFICATION
                      </div>
                      <div className="space-y-3">
                        <div className="border border-white/5 rounded p-3 bg-white/[0.02] hover:border-orange-500/20 transition-all">
                          <span className="text-orange-400 font-bold text-[10px]">
                            {'TABLE marketplace_listings ('}
                          </span>
                          <div className="pl-4 space-y-1 mt-1 text-white/70 text-[11px]">
                            <div>id: <span className="text-orange-400">UUID PRIMARY KEY</span>,</div>
                            <div>title: <span className="text-orange-400">VARCHAR(255) NOT NULL</span>,</div>
                            <div>price_ngn: <span className="text-amber-400">NUMERIC(12, 2) NOT NULL</span>,</div>
                            <div>merchant_id: <span className="text-orange-400">UUID REFERENCES auth.users</span></div>
                          </div>
                          <span className="text-orange-400 font-bold text-[10px]">');'</span>
                        </div>

                        <div className="border border-white/5 rounded p-3 bg-white/[0.02] hover:border-orange-500/20 transition-all">
                          <span className="text-orange-400 font-bold text-[10px]">
                            {'TABLE academic_schedules ('}
                          </span>
                          <div className="pl-4 space-y-1 mt-1 text-white/70 text-[11px]">
                            <div>schedule_id: <span className="text-orange-400">UUID PRIMARY KEY</span>,</div>
                            <div>course_code: <span className="text-orange-400">VARCHAR(20)</span>,</div>
                            <div>start_time: <span className="text-amber-400">TIMESTAMPTZ</span></div>
                          </div>
                          <span className="text-orange-400 font-bold text-[10px]">');'</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Architecture Tab */}
                  {activeTab === 'blueprint' && (
                    <div className="h-full flex flex-col items-center justify-center py-4">
                      <div className="relative w-40 h-40 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-0 rounded-full border-2 border-dashed border-orange-500/25"
                        />
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-2 rounded-full border border-amber-600/35 border-t-2"
                        />
                        <div className="text-center z-10 pointer-events-none">
                          <div className="text-[14px] font-bold text-white tracking-widest">
                            FULL-STACK
                          </div>
                          <div className="text-[9px] text-orange-400 tracking-widest font-mono">
                            ENGINEERING
                          </div>
                          <div className="text-[8px] text-white/40 mt-1 uppercase font-mono">
                            React • Flutter • Supabase
                          </div>
                        </div>
                      </div>
                      <div className="text-[9px] text-white/40 mt-6 font-mono text-center">
                        {projects?.length || 7} PRODUCTION DEPLOYMENTS • FAST DATABASE PERFORMANCE
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
