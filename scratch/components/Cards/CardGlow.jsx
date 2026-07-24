import React from 'react';

export default function CardGlow({ caseKey = 'mercedes' }) {
  const glowMap = {
    figma: 'from-orange-500/12 to-red-500/12',
    mercedes: 'from-[#58a6ff]/18 to-[#bc8cff]/18',
    mercado: 'from-amber-500/12 to-yellow-500/12',
  };

  const glowGradient = glowMap[caseKey] || 'from-purple-500/10 to-blue-500/10';

  return (
    <>
      {/* Top-Left Ambient Orb */}
      <div className={`absolute top-[-20%] left-[-20%] w-48 h-48 rounded-full bg-gradient-to-tr ${glowGradient} blur-[40px] opacity-70 pointer-events-none z-0`} />
      {/* Bottom-Right Sub-Orb */}
      <div className="absolute bottom-[-15%] right-[-15%] w-44 h-44 rounded-full bg-blue-500/5 blur-[35px] opacity-50 pointer-events-none z-0" />
      {/* Center Soft Blur */}
      <div className="absolute top-[35%] left-[35%] w-24 h-24 rounded-full bg-white/[0.02] blur-[20px] pointer-events-none z-0" />
    </>
  );
}
export { CardGlow };
