import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles, CheckCircle2, ChevronRight, Layers, Maximize2 } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { getProjectTheme } from '../data/projectThemes';
import SectionBadge from '../components/ui/SectionBadge';
import HUDCorners from '../components/ui/HUDCorners';
import DeviceViewports from '../components/ui/DeviceViewports';
import SchedulerModal from '../components/scheduler/SchedulerModal';

/**
 * Project Nodes Showcase Section (Verified Deployments)
 * Features interactive Dual-Mode Viewports (Smartphone / Desktop),
 * tailored brand glows, live launch buttons, GitHub source triggers,
 * and clean project telemetry dynamically mapped from portfolioData store.
 */
export default function ProjectNodes() {
  const { projects } = usePortfolioData();
  const [schedulerModalOpen, setSchedulerModalOpen] = useState(false);
  const [schedulerModalIdx, setSchedulerModalIdx] = useState(0);

  // Filter projects with active visual screenshot assets (hides hasVisuals: false)
  const visibleProjects = projects.filter((project) => {
    if (project.hasVisuals === false || project.featured === false) return false;
    if (project.hasVisuals === true || project.featured === true) return true;
    return Boolean(project.screenshots);
  });

  return (
    <section
      id="projects"
      className="relative py-28 bg-obsidian overflow-hidden border-b border-white/5"
    >
      {/* Background Ambient Layers */}
      <div className="absolute inset-0 cyber-grid opacity-[0.14] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-amber-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-cyan-600/10 blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <SectionBadge>Featured Work • {visibleProjects.length} Verified Deployments</SectionBadge>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display">
            FEATURED PROJECTS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60 max-w-2xl font-sans">
            Explore full-stack web platforms, mobile applications, and localized offline engines built with React, Next.js, Flutter, and PostgreSQL.
          </p>
          <div className="w-24 h-[3px] bg-gradient-to-r from-amber-500 via-cyan-400 to-emerald-400 mt-4 rounded-full" />
        </div>
      </div>

      {/* Project Cards Grid / Stacking Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {visibleProjects.map((project, index) => {
          const isScheduler = project.id === 'scheduler-mobile' || project.previewType === 'scheduler';
          const theme = getProjectTheme(project.id);
          const tags = project.stackTags || project.techStack || [];
          const featuresList = project.features || [];
          const metricsList = project.hudMetrics || [];
          const displayNodeNum = String(index + 1).padStart(2, '0');

          return (
            <div
              key={project.id}
              className="sticky top-24 w-full"
              style={{
                marginTop: index > 0 ? `${index * 8}px` : '0px',
                zIndex: 10 + index,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`w-full glass-heavy rounded-2xl overflow-hidden border ${theme.cardBorder} ${theme.cardShadow} group relative transition-all duration-300`}
              >
                {/* Tactical HUD Corners */}
                <HUDCorners size="md" />

                {/* Dynamic Brand Hover Glow Edge */}
                <div
                  className={`absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none bg-gradient-to-r ${theme.glowGradient}`}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 relative">
                  {/* Left Column: Interactive Dual-Mode Viewport Mockup */}
                  <div className="lg:col-span-5 bg-black/40 border-b lg:border-b-0 lg:border-r border-white/10 flex items-center justify-center">
                    <DeviceViewports project={project} />
                  </div>

                  {/* Right Column: Project Specifications & Telemetry */}
                  <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-left">
                    <div>
                      {/* Header Row */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span
                            className={`font-mono text-sm font-bold px-2.5 py-0.5 rounded border ${theme.nodeBadge}`}
                          >
                            PROJECT {displayNodeNum}
                          </span>
                          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                            {project.category || project.subtitle}
                          </span>
                        </div>

                        <div
                          className={`flex items-center space-x-1.5 text-[9px] font-mono ${theme.statusText}`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full animate-pulse ${theme.statusDot}`}
                          />
                          <span>{project.liveUrl ? 'LIVE PRODUCTION' : 'ENTERPRISE SYSTEM'}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-2xl sm:text-3xl font-bold text-white font-display tracking-tight mb-3 transition-colors ${theme.titleHover}`}
                      >
                        {project.title}
                      </h3>

                      {/* Narrative Description */}
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-5 font-sans">
                        {project.description}
                      </p>

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {tags.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded transition-colors ${theme.techBadge}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Core Features List */}
                      {featuresList.length > 0 && (
                        <div className="space-y-1.5 mb-5">
                          {featuresList.slice(0, 4).map((feature, i) => (
                            <div
                              key={i}
                              className="flex items-start space-x-2 text-xs text-white/60 font-sans"
                            >
                              <span
                                className={`mt-0.5 font-bold ${theme.bullet}`}
                              >
                                ▸
                              </span>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Engineering Challenge & Architecture */}
                      {project.challenge && (
                        <div
                          className={`p-3 rounded-lg border mb-6 text-[11px] font-mono leading-relaxed ${theme.archBox}`}
                        >
                          <span
                            className={`font-bold uppercase block mb-1 ${theme.archTitle}`}
                          >
                            ARCHITECTURAL HIGHLIGHT
                          </span>
                          {project.challenge}
                        </div>
                      )}
                    </div>

                    {/* Action Triggers & HUD Metrics */}
                    <div>
                      {/* Action Triggers */}
                      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 mb-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-4 py-2.5 rounded-lg font-mono font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${theme.liveButton}`}
                          >
                            <span>LAUNCH LIVE APP</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <a
                          href={project.githubUrl || 'https://github.com/ESCANOR-dev-afro'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-4 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${theme.githubButton}`}
                        >
                          <Github
                            className={`w-3.5 h-3.5 ${theme.iconColor}`}
                          />
                          <span>VIEW SOURCE CODE</span>
                          <ExternalLink className="w-3 h-3 text-white/40" />
                        </a>

                        {isScheduler && (
                          <button
                            onClick={() => {
                              setSchedulerModalIdx(0);
                              setSchedulerModalOpen(true);
                            }}
                            className="px-4 py-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>INSPECT FLUTTER SCREENS</span>
                          </button>
                        )}
                      </div>

                      {/* HUD Metrics Grid */}
                      {metricsList.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {metricsList.map((metric, i) => (
                            <div
                              key={i}
                              className={`text-center py-2 px-1 rounded bg-white/[0.02] border ${theme.metricBox.split(' ')[0]}`}
                            >
                              <span
                                className={`text-[9px] font-mono uppercase tracking-wider block truncate ${theme.metricBox.split(' ')[1] || 'text-white/70'}`}
                              >
                                {metric}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Scheduler Interactive Lightbox Modal */}
      <SchedulerModal
        isOpen={schedulerModalOpen}
        onClose={() => setSchedulerModalOpen(false)}
        initialScreenIdx={schedulerModalIdx}
      />
    </section>
  );
}
