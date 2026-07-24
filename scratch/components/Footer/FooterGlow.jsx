import React from 'react';

export default function FooterGlow() {
  return (
    <div 
      className="absolute bottom-[-10%] left-[25%] w-[65vw] h-[45vw] rounded-full bg-gradient-to-tr from-purple-500/10 to-blue-500/5 blur-[90px] pointer-events-none z-0"
    />
  );
}
export { FooterGlow };
