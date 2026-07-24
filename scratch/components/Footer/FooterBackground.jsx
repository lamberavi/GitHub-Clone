import React from 'react';

export default function FooterBackground() {
  return (
    <>
      {/* Transparent Glass Background Layer */}
      <div className="absolute inset-0 bg-[#0D1117]/40 backdrop-blur-md pointer-events-none z-0" />
      {/* Subtle Noise Layer */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </>
  );
}
export { FooterBackground };
