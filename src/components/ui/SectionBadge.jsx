import { motion } from 'framer-motion';

/**
 * Reusable HUD-style section badge with pulsing indicator dot.
 * Used at the top of each section to label the module.
 */
export default function SectionBadge({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-cyber-navy/60 border border-cyber-orange/30 text-[10px] font-mono uppercase tracking-widest text-cyber-bright mb-4 w-fit shadow-[0_0_12px_rgba(255,106,0,0.18)]"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-cyber-orange shadow-[0_0_6px_var(--color-cyber-orange)] animate-pulse" />
      <span>{children}</span>
    </motion.div>
  );
}
