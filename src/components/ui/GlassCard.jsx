import HUDCorners from './HUDCorners';

/**
 * Glassmorphism card with HUD corner brackets.
 * Used as the base for skill cards, project cards, etc.
 */
export default function GlassCard({
  children,
  className = '',
  hoverGlow = true,
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={`
        relative glass rounded-xl overflow-hidden transition-all duration-300
        ${hoverGlow ? 'hover:border-cyber-orange/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_-6px_rgba(255,106,0,0.25)]' : ''}
        ${className}
      `}
      {...props}
    >
      <HUDCorners />
      {children}
    </Component>
  );
}
