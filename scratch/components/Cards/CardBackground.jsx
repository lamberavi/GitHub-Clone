import React from 'react';

export default function CardBackground({ caseKey }) {
  const renderPattern = () => {
    switch (caseKey) {
      case 'figma':
      case 'finance':
        // Grid Pattern
        return (
          <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#58A6FF" strokeWidth="0.75" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        );
      case 'mercedes':
      case 'healthcare':
        // Circular Radar Pattern
        return (
          <svg className="absolute -right-10 -bottom-10 w-64 h-64 opacity-20 pointer-events-none z-0" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="90" stroke="#58A6FF" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="65" stroke="#38BDF8" strokeWidth="1" />
            <circle cx="100" cy="100" r="40" stroke="#58A6FF" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="15" fill="#58A6FF" opacity="0.3" />
            <line x1="10" y1="100" x2="190" y2="100" stroke="#58A6FF" strokeWidth="0.5" opacity="0.5" />
            <line x1="100" y1="10" x2="100" y2="190" stroke="#58A6FF" strokeWidth="0.5" opacity="0.5" />
          </svg>
        );
      case 'mercado':
      case 'automotive':
        // Dynamic Lines Pattern
        return (
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0" viewBox="0 0 300 200" fill="none">
            <path d="M-50 150 Q 75 50, 200 180 T 400 50" stroke="#58A6FF" strokeWidth="1.5" fill="none" />
            <path d="M-50 170 Q 75 70, 200 200 T 400 70" stroke="#38BDF8" strokeWidth="1" opacity="0.6" fill="none" />
            <path d="M-50 130 Q 75 30, 200 160 T 400 30" stroke="#8B949E" strokeWidth="0.75" opacity="0.4" fill="none" />
          </svg>
        );
      default:
        // Circuit Design Pattern
        return (
          <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none z-0" viewBox="0 0 200 200" fill="none">
            <path d="M20 20 L80 20 L100 40 L160 40 L180 60" stroke="#58A6FF" strokeWidth="1.2" fill="none" />
            <circle cx="20" cy="20" r="3" fill="#58A6FF" />
            <circle cx="180" cy="60" r="3" fill="#38BDF8" />
            <path d="M40 160 L100 160 L120 140 L180 140" stroke="#38BDF8" strokeWidth="1" fill="none" />
            <circle cx="40" cy="160" r="3" fill="#38BDF8" />
          </svg>
        );
    }
  };

  return (
    <>
      {/* Dark 3-Stop Gradient Base */}
      <div 
        className="absolute inset-0 z-0 transition-all duration-500 group-hover:opacity-90"
        style={{
          background: 'linear-gradient(180deg, #161B22 0%, #1E2530 50%, #111827 100%)'
        }}
      />

      {/* Unique Procedural Background Pattern */}
      {renderPattern()}

      {/* Subtle Noise Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </>
  );
}
export { CardBackground };
