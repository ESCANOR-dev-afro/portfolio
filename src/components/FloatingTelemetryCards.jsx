import { motion } from 'framer-motion';
import {
  Layers,
  Database,
  Binary,
  Award,
  ShieldCheck,
  CodeXml,
  Smartphone,
  Sparkles,
} from 'lucide-react';

export const floatingTelemetryCards = [
  {
    id: 'projects',
    icon: <Layers className="w-4 h-4 text-cyber-orange" />,
    label: 'FEATURED WORK',
    value: '7 Live Applications',
    positionClass: 'top-[25%] left-[5%] md:left-[8%]',
    delay: 0.1,
  },
  {
    id: 'techstack',
    icon: <Database className="w-4 h-4 text-cyber-bright" />,
    label: 'CORE STACK',
    value: 'Flutter • React • Supabase',
    positionClass: 'top-[42%] right-[4%] md:right-[6%]',
    delay: 0.25,
  },
  {
    id: 'architecture',
    icon: <Binary className="w-4 h-4 text-[#FF7F11]" />,
    label: 'STATE MANAGEMENT',
    value: 'Riverpod & Clean Code',
    positionClass: 'bottom-[22%] left-[4%] md:left-[10%]',
    delay: 0.4,
  },
  {
    id: 'awba',
    icon: <Award className="w-4 h-4 text-cyber-crimson" />,
    label: 'SIWES INTERNSHIP',
    value: 'AWBA Offline CBT System',
    positionClass: 'top-[68%] right-[8%] md:right-[12%]',
    delay: 0.15,
  },
  {
    id: 'fintech',
    icon: <ShieldCheck className="w-4 h-4 text-[#D90429]" />,
    label: 'FINTECH APP',
    value: 'Double-Entry Mobile Wallet',
    positionClass: 'top-[15%] right-[12%] md:right-[15%]',
    delay: 0.35,
  },
  {
    id: 'student',
    icon: <CodeXml className="w-4 h-4 text-white/80" />,
    label: 'COMPUTER SCIENCE',
    value: 'TASFUED University',
    positionClass: 'bottom-[38%] left-[2%] md:left-[5%]',
    delay: 0.5,
  },
  {
    id: 'fullstack',
    icon: <Smartphone className="w-4 h-4 text-cyber-bright" />,
    label: 'PLATFORMS',
    value: 'Web, Mobile & Desktop',
    positionClass: 'bottom-[12%] right-[6%] md:right-[10%]',
    delay: 0.2,
  },
  {
    id: 'ai',
    icon: <Sparkles className="w-4 h-4 text-cyber-orange animate-pulse" />,
    label: 'AI CREDENTIALS',
    value: '6 Anthropic Diplomas',
    positionClass: 'top-[58%] left-[6%] md:left-[12%]',
    delay: 0.3,
  },
];

/**
 * FloatingTelemetryCards Component
 * Clean, glassmorphism floating badges surrounding the hero section.
 */
export default function FloatingTelemetryCards() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {floatingTelemetryCards.map((card) => (
        <motion.div
          key={card.id}
          className={`absolute ${card.positionClass} hidden sm:block pointer-events-auto group`}
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, delay: card.delay }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 4 + card.delay * 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex items-center space-x-3.5 px-4 py-3 rounded-md bg-glass border border-white/10 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.5)] group-hover:border-cyber-orange/40 hover:bg-[#202A36]/60 transition-all duration-300 relative backdrop-blur-md"
          >
            {/* HUD Corner brackets */}
            <div className="absolute -top-[1.5px] -left-[1.5px] w-1.5 h-1.5 border-t border-l border-cyber-orange/60 pointer-events-none" />
            <div className="absolute -bottom-[1.5px] -right-[1.5px] w-1.5 h-1.5 border-b border-r border-cyber-orange/60 pointer-events-none" />
            <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-cyber-bright/40 group-hover:bg-cyber-orange group-hover:animate-ping transition-all pointer-events-none" />

            {/* Left vertical gradient accent line */}
            <div className="w-[3px] self-stretch bg-gradient-to-b from-cyber-orange to-cyber-crimson rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />

            {/* Icon & Label/Value Telemetry */}
            <div className="flex items-center space-x-3">
              <div className="p-1.5 rounded bg-white/5 border border-white/5 transition-all group-hover:bg-cyber-orange/10 group-hover:border-cyber-orange/20 flex items-center justify-center shrink-0">
                {card.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-mono text-[9px] tracking-[0.15em] text-white/50 group-hover:text-cyber-bright transition-colors uppercase leading-none mb-1">
                  {card.label}
                </span>
                <span className="text-sm font-semibold text-white/95 tracking-wide group-hover:text-white transition-colors font-sans whitespace-nowrap">
                  {card.value}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
