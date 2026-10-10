import { ArrowRight } from 'lucide-react';

/**
 * Primary CTA button with High-Voltage Cyber-Orange gradient and fiery neon glow.
 * Two variants: 'primary' (fiery gradient) and 'ghost' (dark glass with orange border).
 */
export default function GoldButton({
  children,
  onClick,
  variant = 'primary',
  icon: Icon,
  className = '',
  ...props
}) {
  const base =
    'group w-full sm:w-auto flex items-center justify-center space-x-2.5 px-8 py-4 font-bold rounded-full select-none cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 tracking-wide';

  const variants = {
    primary:
      'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:via-amber-400 hover:to-orange-500 text-white shadow-[0_0_25px_rgba(255,87,34,0.55)] hover:shadow-[0_0_35px_rgba(255,123,0,0.85)] border border-orange-400/40',
    ghost:
      'bg-black/60 hover:bg-orange-500/15 text-orange-400 hover:text-white border border-orange-500/30 hover:border-orange-400 shadow-[0_0_15px_rgba(255,87,34,0.15)] hover:shadow-[0_0_25px_rgba(255,87,34,0.35)]',
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span>{children}</span>
      {variant === 'primary' && (
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
      )}
    </button>
  );
}
