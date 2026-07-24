import React from 'react';
import useMousePosition from '../../hooks/useMousePosition';

export default function MouseGlow() {
  const { x, y } = useMousePosition();

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-15 mix-blend-screen hidden lg:block"
      style={{
        background: `radial-gradient(500px circle at ${x}px ${y}px, rgba(124, 58, 237, 0.05), rgba(88, 166, 255, 0.03) 50%, transparent 80%)`
      }}
    />
  );
}
export { MouseGlow };
