import React from 'react';

export default function GlobalGradient() {
  return (
    <div 
      className="absolute inset-0 z-0 bg-[#0D1117] w-full h-full"
      style={{
        background: `linear-gradient(180deg, 
          #0D1117 0%, 
          #0D1117 22%, 
          #161B22 45%, 
          #0D1117 70%, 
          #161B22 100%)`
      }}
    />
  );
}
export { GlobalGradient };
