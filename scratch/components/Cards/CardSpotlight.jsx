import React, { useRef, useState } from 'react';

export default function CardSpotlight({ children, className = "" }) {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
      style={{
        '--mouse-x': `${coords.x}px`,
        '--mouse-y': `${coords.y}px`
      }}
    >
      {/* Primary Glowing Radial Spotlight follows cursor */}
      <div 
        className="absolute pointer-events-none transition-opacity duration-300 z-20 rounded-full mix-blend-screen"
        style={{
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(88, 166, 255, 0.20) 0%, rgba(163, 113, 247, 0.08) 45%, transparent 70%)',
          left: `${coords.x - 175}px`,
          top: `${coords.y - 175}px`,
          opacity: opacity
        }}
      />
      
      {/* Secondary Soft Ambient Glow Follower */}
      <div 
        className="absolute pointer-events-none transition-opacity duration-500 z-15 rounded-full filter blur-xl"
        style={{
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 80%)',
          left: `${coords.x - 100}px`,
          top: `${coords.y - 100}px`,
          opacity: opacity
        }}
      />
      {children}
    </div>
  );
}
export { CardSpotlight };
