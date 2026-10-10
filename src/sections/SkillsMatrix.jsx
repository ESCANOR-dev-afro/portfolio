import { primarySkills, secondarySkills } from '../data/portfolioData';
import SectionBadge from '../components/ui/SectionBadge';

/**
 * SkillCard — inline component for the marquee rows.
 * Renders the tech icon as a colored SVG based on skill data.
 */
function SkillIcon({ name, color }) {
  const strokeProps = { fill: 'none', strokeWidth: 1.5, stroke: color };

  const icons = {
    React: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" {...strokeProps}>
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill={color} />
      </svg>
    ),
    'Next.js': (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 16V8l8 10V8" />
      </svg>
    ),
    Flutter: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" {...strokeProps}>
        <path d="M14 2L2 14l3.5 3.5L21 4z" />
        <path d="M21 13.5L17.5 10 14 13.5l3.5 3.5z" />
      </svg>
    ),
    Dart: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" {...strokeProps}>
        <path d="M12 2L2 12l3.5 3.5L20 10.5z" />
        <path d="M12 22l10-10-3.5-3.5L8.5 18.5z" />
      </svg>
    ),
    Supabase: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill={color}>
        <path d="M11.95 2.14a1.5 1.5 0 0 0-2.45 1.16v8.2h-6.2a1.5 1.5 0 0 0-1.22 2.37l9.55 12.83a1.5 1.5 0 0 0 2.45-1.16v-8.2h6.2a1.5 1.5 0 0 0 1.22-2.37L11.95 2.14z" />
      </svg>
    ),
    'Tailwind CSS': (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M6 12c.5-2.5 2.5-4 5-4 3.5 0 4 2.5 5.5 3.5 1.5 1 3 1.5 4.5.5-1 2.5-2.5 4-5 4-3.5 0-4-2.5-5.5-3.5C9 11.5 7.5 11 6 12z" />
        <path d="M1.5 16.5c.5-2.5 2.5-4 5-4 3.5 0 4 2.5 5.5 3.5 1.5 1 3 1.5 4.5.5-1 2.5-2.5 4-5 4-3.5 0-4-2.5-5.5-3.5-1.5-1-3-1.5-4.5-.5z" />
      </svg>
    ),
    TypeScript: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" {...strokeProps}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 10h4M11 10v8" />
      </svg>
    ),
    'Node.js': (
      <svg viewBox="0 0 24 24" className="w-8 h-8" {...strokeProps}>
        <path d="M12 2L3 7v10l9 5 9-5V7z" />
        <path d="M12 2v20M3 7l9 5 9-5" />
      </svg>
    ),
    PostgreSQL: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" {...strokeProps}>
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    ),
    Riverpod: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" {...strokeProps}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    Firebase: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" {...strokeProps}>
        <path d="M3.89 15.55L11.13 2.37a.89.89 0 0 1 1.62.15l2.09 11.23z" />
        <path d="M3.25 18h17.5a.75.75 0 0 0 .54-1.28l-8.62-8.5a.75.75 0 0 0-1.07 0L3 16.72a.75.75 0 0 0 .25 1.28z" />
      </svg>
    ),
    Vite: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" {...strokeProps}>
        <path d="M12 2L2 20h20z" />
        <path d="M12 6l-3 7h5l-3 6" stroke="#FFD600" />
      </svg>
    ),
  };

  return icons[name] || null;
}

function SkillCard({ skill }) {
  return (
    <div
      className="group/card w-[290px] sm:w-[320px] shrink-0 p-5 rounded-xl glass transition-all duration-300 relative hover:border-cyber-orange/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_-6px_rgba(255,106,0,0.35)] flex items-center space-x-4 cursor-pointer gpu"
      style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}
    >
      {/* Corner brackets */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/10 group-hover/card:border-cyber-orange transition-colors" />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/10 group-hover/card:border-cyber-orange transition-colors" />

      {/* Icon */}
      <div className="p-3.5 rounded-lg bg-cyber-black/80 border border-white/5 flex items-center justify-center shrink-0 group-hover/card:border-cyber-orange/30 group-hover/card:shadow-[0_0_15px_rgba(255,106,0,0.2)] transition-all">
        <SkillIcon name={skill.name} color={skill.color} />
      </div>

      {/* Text */}
      <div className="flex flex-col min-w-0">
        <span className="text-base font-bold text-white tracking-wide group-hover/card:text-cyber-bright transition-colors truncate">
          {skill.name}
        </span>
        <span className="text-xs text-white/50 group-hover/card:text-white/70 transition-colors mt-0.5 leading-snug line-clamp-2">
          {skill.specialization}
        </span>
      </div>
    </div>
  );
}

/**
 * Skills Matrix Section with dual-row infinite marquee.
 * Uses CSS-only animations (GPU-promoted) with 2x duplication.
 */
export default function SkillsMatrix() {
  return (
    <section
      id="tech-stack"
      className="relative py-24 bg-cyber-black overflow-hidden border-b border-white/5 select-none"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 cyber-grid opacity-[0.15] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyber-orange/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyber-crimson/20 to-transparent" />

      {/* Floating dots */}
      <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-cyber-orange/40 animate-ping" />
      <div className="absolute bottom-1/3 right-12 w-1.5 h-1.5 rounded-full bg-cyber-bright/30" />
      <div className="absolute top-1/2 right-[15%] w-1 h-1 rounded-full bg-cyber-orange/50 animate-pulse" />

      {/* Side guide lines (desktop) */}
      <div className="absolute left-[8%] top-0 bottom-0 w-px bg-white/[0.03] hidden lg:block" />
      <div className="absolute right-[8%] top-0 bottom-0 w-px bg-white/[0.03] hidden lg:block" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <SectionBadge>Core Technical Arsenal</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
            SKILLS &amp; TECHNOLOGIES
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60 max-w-2xl font-sans">
            Languages, frameworks, databases, and developer tools I use daily to engineer clean web apps, fluid mobile applications, and reliable backend systems.
          </p>
          <div className="w-20 h-[3px] bg-gradient-to-r from-cyber-orange to-cyber-crimson mt-4 rounded-full" />
        </div>
      </div>

      {/* Marquee Rows */}
      <div className="relative z-10 flex flex-col gap-6 py-4 overflow-hidden w-full group">
        {/* Row 1 — Left scroll */}
        <div className="flex w-full overflow-hidden relative">
          <div className="marquee-track marquee-left flex gap-6 py-2">
            {[...primarySkills, ...primarySkills].map((skill, i) => (
              <SkillCard key={`${skill.name}-r1-${i}`} skill={skill} />
            ))}
          </div>
        </div>

        {/* Row 2 — Right scroll */}
        <div className="flex w-full overflow-hidden relative">
          <div className="marquee-track marquee-right flex gap-6 py-2">
            {[...secondarySkills, ...secondarySkills].map((skill, i) => (
              <SkillCard key={`${skill.name}-r2-${i}`} skill={skill} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decorative lines */}
      <div className="absolute bottom-6 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
      <div className="absolute top-6 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
    </section>
  );
}
