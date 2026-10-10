/**
 * Decorative HUD corner brackets.
 * Two sizes: 'sm' (1.5px) and 'md' (3px).
 */
export default function HUDCorners({ size = 'sm' }) {
  const dim = size === 'sm' ? 'w-1.5 h-1.5' : 'w-3 h-3';
  const border = size === 'sm' ? 'border' : 'border-2';

  return (
    <>
      <span
        className={`absolute top-0 left-0 ${dim} ${border}-t ${border}-l border-cyber-orange pointer-events-none shadow-[0_0_6px_rgba(255,106,0,0.3)]`}
      />
      <span
        className={`absolute top-0 right-0 ${dim} ${border}-t ${border}-r border-cyber-orange pointer-events-none shadow-[0_0_6px_rgba(255,106,0,0.3)]`}
      />
      <span
        className={`absolute bottom-0 left-0 ${dim} ${border}-b ${border}-l border-cyber-orange pointer-events-none shadow-[0_0_6px_rgba(255,106,0,0.3)]`}
      />
      <span
        className={`absolute bottom-0 right-0 ${dim} ${border}-b ${border}-r border-cyber-orange pointer-events-none shadow-[0_0_6px_rgba(255,106,0,0.3)]`}
      />
    </>
  );
}
