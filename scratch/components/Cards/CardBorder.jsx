import React from 'react';

export default function CardBorder({ children, isActive = false }) {
  return (
    <div className={`w-full h-full rounded-2xl transition-all duration-500 border ${
      isActive 
        ? 'border-[#58A6FF]/60 shadow-[0_0_30px_rgba(88,166,255,0.3)]' 
        : 'border-[rgba(88,166,255,0.15)] group-hover:border-[rgba(88,166,255,0.50)] group-hover:shadow-[0_0_30px_rgba(88,166,255,0.22)]'
    }`}>
      {children}
    </div>
  );
}
export { CardBorder };
