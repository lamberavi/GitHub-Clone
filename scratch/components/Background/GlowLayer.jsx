import React from 'react';

export default function GlowLayer() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div className="glow-orb glow-orb-purple w-[65vw] h-[65vw] top-[-10%] left-[-15%] animate-pulse-premium animate-drift-premium" />
      <div className="glow-orb glow-orb-blue w-[55vw] h-[55vw] top-[5%] right-[-15%] animate-pulse-premium animate-rotate-premium" />
      <div className="glow-orb glow-orb-pink w-[50vw] h-[50vw] top-[28%] left-[-10%] animate-pulse-premium animate-drift-premium" />
      <div className="glow-orb glow-orb-orange w-[45vw] h-[45vw] top-[52%] right-[-10%] animate-pulse-premium" />
      <div className="glow-orb glow-orb-blue w-[55vw] h-[55vw] top-[74%] left-[-12%] animate-pulse-premium animate-drift-premium" />
      <div className="glow-orb glow-orb-purple w-[60vw] h-[60vw] bottom-[-5%] right-[-5%] animate-pulse-premium animate-rotate-premium" />
    </div>
  );
}
export { GlowLayer };
