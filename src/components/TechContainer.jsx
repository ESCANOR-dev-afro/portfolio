import { motion } from 'framer-motion';

/**
 * TechContainer Component
 * Displays the core technology pills below the hero action buttons
 * with custom interactive glow animations and status dots.
 */
export default function TechContainer() {
  const techs = [
    { name: 'Flutter', dotColor: 'bg-[#02569B]', glowColor: 'rgba(2, 86, 155, 0.4)' },
    { name: 'Firebase', dotColor: 'bg-[#FFCA28]', glowColor: 'rgba(255, 202, 40, 0.4)' },
    { name: 'Dart', dotColor: 'bg-[#0175C2]', glowColor: 'rgba(1, 117, 194, 0.4)' },
    { name: 'Riverpod', dotColor: 'bg-[#05a5dc]', glowColor: 'rgba(5, 165, 220, 0.4)' },
    { name: 'Firestore', dotColor: 'bg-[#FF7400]', glowColor: 'rgba(255, 116, 0, 0.4)' },
    { name: 'Go Router', dotColor: 'bg-[#00CFE8]', glowColor: 'rgba(0, 207, 232, 0.4)' },
    { name: 'GitHub', dotColor: 'bg-[#24292E]', glowColor: 'rgba(255, 255, 255, 0.2)' },
    { name: 'Supabase', dotColor: 'bg-[#3776AB]', glowColor: 'rgba(55, 118, 171, 0.4)' },
    { name: 'TypeScript', dotColor: 'bg-[#3178C6]', glowColor: 'rgba(49, 120, 198, 0.4)' },
    { name: 'React', dotColor: 'bg-[#61DAFB]', glowColor: 'rgba(97, 218, 251, 0.4)' },
  ];

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-3.5 mt-8 max-w-2xl mx-auto z-30 relative"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      {techs.map((tech, idx) => (
        <motion.div
          key={tech.name}
          className="px-4 py-2 rounded-full cursor-pointer bg-slate-950/40 border border-white/5 backdrop-blur-md shadow-sm hover:border-cyber-orange/40 flex items-center space-x-2.5 transition-all duration-300 group"
          whileHover={{
            y: -5,
            scale: 1.05,
            boxShadow: `0 8px 20px -5px ${tech.glowColor || 'rgba(255, 106, 0, 0.35)'}`,
            borderColor: 'rgba(255, 106, 0, 0.4)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 150, damping: 15, delay: 0.6 + idx * 0.04 }}
        >
          <span className={`w-2 h-2 rounded-full ${tech.dotColor} shadow-[0_0_8px_currentColor] animate-pulse`} />
          <span className="text-xs font-mono font-medium tracking-wide text-white/80 group-hover:text-white uppercase">
            {tech.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
