import React from 'react';

export default function CardImage({ caseKey = 'mercedes' }) {
  const renderPattern = () => {
    if (caseKey === 'figma') {
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="rgba(242, 78, 30, 0.05)" strokeWidth="0.85" className="absolute inset-0 w-full h-full object-cover mix-blend-screen scale-125 z-0 pointer-events-none select-none">
          <line x1="10" y1="0" x2="10" y2="100" />
          <line x1="30" y1="0" x2="30" y2="100" />
          <line x1="50" y1="0" x2="50" y2="100" />
          <line x1="70" y1="0" x2="70" y2="100" />
          <line x1="90" y1="0" x2="90" y2="100" />
          <line x1="0" y1="20" x2="100" y2="20" />
          <line x1="0" y1="40" x2="100" y2="40" />
          <line x1="0" y1="60" x2="100" y2="60" />
          <line x1="0" y1="80" x2="100" y2="80" />
        </svg>
      );
    }
    if (caseKey === 'mercedes') {
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="rgba(88, 166, 255, 0.06)" strokeWidth="0.75" className="absolute inset-0 w-full h-full object-cover mix-blend-screen scale-110 z-0 pointer-events-none select-none">
          <circle cx="50" cy="50" r="12" />
          <circle cx="50" cy="50" r="28" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="44" />
          <circle cx="50" cy="50" r="60" strokeDasharray="5 5" />
          <line x1="0" y1="50" x2="100" y2="50" />
          <line x1="50" y1="0" x2="50" y2="100" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke="rgba(241, 196, 15, 0.05)" strokeWidth="0.8" className="absolute inset-0 w-full h-full object-cover mix-blend-screen scale-120 z-0 pointer-events-none select-none">
        <path d="M10,10 Q50,90 90,10" />
        <path d="M10,90 Q50,10 90,90" />
        <path d="M10,50 Q50,50 90,50" />
        <path d="M50,10 Q50,50 50,90" />
      </svg>
    );
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl select-none">
      {renderPattern()}
      {/* Dark Mask Overlay and Blur */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/85 via-transparent to-[#161B22]/15 z-0" />
    </div>
  );
}
export { CardImage };
