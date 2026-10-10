import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  GraduationCap,
  Briefcase,
  Code2,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';
import SectionBadge from '../components/ui/SectionBadge';
import GoldButton from '../components/ui/GoldButton';
import HUDCorners from '../components/ui/HUDCorners';
import MasterCVModal from '../components/MasterCVModal';
import { usePortfolioData } from '../context/PortfolioDataContext';

/**
 * Dedicated Master CV & Professional Background Section
 * Highlights Samuel Patrick's Computer Science degree at TASFUED,
 * SIWES internship experience at InfoSystem Consulting, and downloadable resume.
 */
export default function MasterCVSection({ onContactClick }) {
  const { siteContent, downloadActiveCV, projects } = usePortfolioData();
  const contact = siteContent?.contact || {};
  const cv = siteContent?.cv || {};

  const [showCVModal, setShowCVModal] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    downloadActiveCV(cv.documentName || 'Samuel_Patrick_Master_CV.doc');
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3500);
  };

  return (
    <section
      id="cv-dossier"
      className="relative py-28 bg-surface overflow-hidden border-b border-white/5 select-none"
    >
      {/* Ambient Grid & Glow */}
      <div className="absolute inset-0 cyber-grid opacity-[0.12] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-orange-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-amber-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <SectionBadge>Curriculum Vitae • Experience &amp; Education</SectionBadge>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display">
            CURRICULUM VITAE
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60 max-w-2xl font-sans">
            {contact.title || 'Full-Stack Software Engineer'} • TASFUED Computer Science • InfoSystem Consulting Intern
          </p>
          <div className="w-24 h-[3px] bg-gradient-to-r from-orange-500 to-amber-500 mt-4 rounded-full" />
        </div>

        {/* Master CV Container Card */}
        <div className="max-w-5xl mx-auto glass-heavy rounded-2xl border border-orange-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-6 sm:p-10 relative overflow-hidden text-left">
          <HUDCorners size="lg" />

          {/* Top Profile Summary Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_#ff5722] animate-pulse" />
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  {contact.name || 'Samuel Imole Patrick'}
                </h3>
                <span className="text-xs font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/30">
                  {contact.codename || 'ESCANOR'}
                </span>
              </div>
              <p className="text-white/70 font-mono text-xs sm:text-sm mt-1">
                {contact.title || 'Full-Stack Web & Mobile Application Developer'}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] font-mono text-white/50">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>{contact.location || 'Mowe, Ogun State, Nigeria'}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5 text-orange-400" />
                  <a href={`mailto:${contact.email || 'samuelimolepatrick@gmail.com'}`} className="hover:underline text-white/80 hover:text-orange-400">
                    {contact.email || 'samuelimolepatrick@gmail.com'}
                  </a>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  <a href={`tel:${contact.phone || '+2348149224954'}`} className="hover:underline text-white/80 hover:text-orange-400">
                    {contact.phone || '+234 814 922 4954'}
                  </a>
                </span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <GoldButton
                onClick={() => setShowCVModal(true)}
                icon={FileText}
                className="px-5 py-3 text-xs tracking-wider"
              >
                VIEW FULL RESUME
              </GoldButton>

              <GoldButton
                variant="ghost"
                onClick={handleDownload}
                icon={Download}
                className="px-5 py-3 text-xs tracking-wider"
              >
                {downloaded ? 'RESUME DOWNLOADED!' : cv.customDocName ? `DOWNLOAD (${cv.customDocName.split('.').pop().toUpperCase()})` : 'DOWNLOAD WORD (.DOC)'}
              </GoldButton>
            </div>
          </div>

          {/* Three Key Pillar Cards (Education, SIWES, Tech Vector) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {/* Pillar 1: Education */}
            <div className="p-5 rounded-xl bg-obsidian/80 border border-white/10 flex flex-col justify-between hover:border-orange-500/40 transition-all">
              <div>
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-orange-400 uppercase font-bold tracking-wider">
                  TERTIARY EDUCATION
                </span>
                <h4 className="font-display font-bold text-base text-white mt-1">
                  TASFUED Computer Science
                </h4>
                <p className="text-white/60 text-xs mt-2 font-sans leading-relaxed">
                  Tai Solarin Federal University of Education, Ogun State. Strong academic standing with coursework in data structures, algorithms, relational databases, and full-stack software development.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-orange-400 font-bold">
                STRONG ACADEMIC RECORD • ENROLLED
              </div>
            </div>

            {/* Pillar 2: SIWES Industrial Training */}
            <div className="p-5 rounded-xl bg-obsidian/80 border border-white/10 flex flex-col justify-between hover:border-orange-500/40 transition-all">
              <div>
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                  PROFESSIONAL INTERNSHIP
                </span>
                <h4 className="font-display font-bold text-base text-white mt-1">
                  InfoSystem Consulting
                </h4>
                <p className="text-white/60 text-xs mt-2 font-sans leading-relaxed">
                  Completed an intensive 3-month Industrial Training program (SIWES) building the offline-first AWBA CBT examination software, local database sync, and student auth tools.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-amber-400 font-bold">
                OFFLINE-FIRST SYSTEMS • COMPLETED
              </div>
            </div>

            {/* Pillar 3: Technical Stack */}
            <div className="p-5 rounded-xl bg-obsidian/80 border border-white/10 flex flex-col justify-between hover:border-orange-500/40 transition-all">
              <div>
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4">
                  <Code2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-orange-400 uppercase font-bold tracking-wider">
                  CORE TECHNICAL STACK
                </span>
                <h4 className="font-display font-bold text-base text-white mt-1">
                  Web, Mobile &amp; Databases
                </h4>
                <p className="text-white/60 text-xs mt-2 font-sans leading-relaxed">
                  React, Next.js, TypeScript, JavaScript, Tailwind CSS, Flutter, Dart, Supabase, PostgreSQL, Firebase, Node.js, and Electron.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-white/50">
                {projects?.length || 7} FEATURED DEPLOYMENTS
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-white/40">
            <span>RESUME SUMMARY • {contact.name?.toUpperCase() || 'SAMUEL IMOLE PATRICK'} ({contact.codename || 'ESCANOR'})</span>
            <button
              onClick={onContactClick}
              className="text-orange-400 hover:text-amber-400 hover:underline cursor-pointer flex items-center space-x-1"
            >
              <span>Get in Touch for Technical Roles</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Master CV Modal */}
      <MasterCVModal
        isOpen={showCVModal}
        onClose={() => setShowCVModal(false)}
      />
    </section>
  );
}
