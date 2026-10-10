import { Github, Linkedin, Mail, Phone, ExternalLink } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';

function TikTokIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01-.01 2.62.02 5.24-.02 7.86-.09 1.74-.7 3.47-1.84 4.79-1.39 1.63-3.48 2.63-5.64 2.63-2.58 0-5.06-1.37-6.28-3.64-1.38-2.52-1.12-5.78.68-8.02 1.51-1.92 3.9-2.97 6.32-2.73.02 1.37-.03 2.74.02 4.11-1.32-.15-2.71.37-3.47 1.48-.82 1.13-.77 2.75.12 3.82.79.97 2.12 1.45 3.34 1.2 1.25-.22 2.27-1.25 2.5-2.48.16-.83.15-1.68.15-2.52V.02z" />
    </svg>
  );
}

/**
 * Transmission Footer with HUD telemetry aesthetic and Samuel Patrick's direct channels.
 */
export default function TransmissionFooter({ onContactClick }) {
  const { siteContent } = usePortfolioData();
  const contact = siteContent?.contact || {};
  const currentYear = new Date().getFullYear();

  const emailAddr = contact.email || 'samuelimolepatrick@gmail.com';
  const phoneNum = contact.phone || '+234 814 922 4954';
  const githubUrl = contact.github || 'https://github.com/ESCANOR-dev-afro';
  const linkedinUrl = contact.linkedin || 'https://www.linkedin.com/in/samuel-patrick-722b82423';

  return (
    <footer className="relative bg-obsidian border-t border-white/10 select-none">
      {/* Top Orange Accent Line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Engineer Telemetry */}
          <div className="md:col-span-5 flex flex-col space-y-4 text-left">
            <div className="flex items-center space-x-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_#ff5722] animate-pulse" />
              <span className="font-display font-bold text-lg tracking-[0.2em] text-orange-500 uppercase glow-orange">
                {contact.name || 'SAMUEL PATRICK'}
              </span>
              <span className="text-[10px] font-mono text-white/40">• {contact.codename || 'ESCANOR'}</span>
            </div>
            <p className="text-xs text-white/60 font-mono leading-relaxed max-w-sm">
              {contact.title || 'Software Engineer specializing in Flutter, Firebase, React, and modern web & mobile architecture. Transforming complex ideas into scalable digital products.'}
            </p>
            <div className="pt-2 text-xs font-mono text-white/50 space-y-1">
              <div>EMAIL: <a href={`mailto:${emailAddr}`} className="text-orange-400 hover:underline">{emailAddr}</a></div>
              <div>TEL: <a href={`tel:${phoneNum.replace(/\s+/g, '')}`} className="text-orange-400 hover:underline">{phoneNum}</a></div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 flex flex-col space-y-3 text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-orange-400 font-bold">
              QUICK NAVIGATION
            </span>
            {[
              { label: 'Home / Overview', id: 'hero' },
              { label: 'Skills & Tech Stack', id: 'tech-stack' },
              { label: 'AI Certificates', id: 'ai-vault' },
              { label: 'About Samuel', id: 'about' },
              { label: 'Featured Projects', id: 'projects' },
              { label: 'Resume & Career', id: 'cv-dossier' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() =>
                  document
                    .getElementById(link.id)
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="text-left text-xs text-white/50 hover:text-orange-400 transition-colors font-mono cursor-pointer"
              >
                &gt; {link.label}
              </button>
            ))}
            <button
              onClick={onContactClick}
              className="text-left text-xs text-orange-400 hover:text-amber-400 transition-colors font-mono font-semibold cursor-pointer pt-1"
            >
              &gt; Get in Touch / Hire
            </button>
          </div>

          {/* External Social & Contact Channels */}
          <div className="md:col-span-4 flex flex-col space-y-4 text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-orange-400 font-bold">
              CONNECT &amp; SOCIALS
            </span>
            <div className="flex flex-wrap gap-2.5">
              {[
                { Icon: Github, href: githubUrl, label: 'GitHub' },
                { Icon: Linkedin, href: linkedinUrl, label: 'LinkedIn' },
                { Icon: TikTokIcon, href: 'https://www.tiktok.com/@sammy.dev1', label: 'TikTok (@sammy.dev1)' },
                { Icon: Mail, href: `mailto:${emailAddr}`, label: 'Email' },
                { Icon: Phone, href: `tel:${phoneNum.replace(/\s+/g, '')}`, label: 'Phone' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="p-2.5 rounded-lg bg-obsidian/80 border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/10 text-white/60 hover:text-orange-400 transition-all flex items-center space-x-1.5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Live System Diagnostics */}
            <div className="mt-auto pt-4 space-y-1.5 text-[10px] font-mono text-white/30 bg-black/20 p-3 rounded-lg border border-white/5">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>ENVIRONMENT: PRODUCTION (NETLIFY)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{contact.location?.toUpperCase() || 'LOCATION: NIGERIA / REMOTE WORLDWIDE'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & System Status */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/30">
          <div className="flex items-center space-x-3">
            <span>
              © {currentYear} {contact.name?.toUpperCase() || 'SAMUEL PATRICK'} ({contact.codename || 'ESCANOR'}). ALL RIGHTS RESERVED.
            </span>
            <span>•</span>
            <a
              href="/admin"
              className="text-white/40 hover:text-orange-400 transition-colors uppercase tracking-wider flex items-center space-x-1"
            >
              <span>[ ADMIN CONSOLE ]</span>
            </a>
          </div>
          <div className="flex items-center space-x-2 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            <span>AVAILABLE FOR HIRE &amp; FREELANCE PROJECTS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
