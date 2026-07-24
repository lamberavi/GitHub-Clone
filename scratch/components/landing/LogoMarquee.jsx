import React from 'react';

export default function LogoMarquee() {
  const brandLogos = ['Infosys', 'Spotify', 'Mercedes-Benz', 'Philips', 'Shopify'];
  const marqueeItems = [...brandLogos, ...brandLogos, ...brandLogos, ...brandLogos];

  return (
    <section className="py-12 border-y border-[#30363D]/45 overflow-hidden relative select-none bg-transparent">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <p className="text-[10px] uppercase font-black tracking-widest text-github-light-textMuted dark:text-github-dark-textMuted">
          Trusted by the world's most innovative enterprises
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="flex w-full relative">
        {/* Left & Right gradient overlays to fade edges to #0D1117 background */}
        <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#0d1117] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#0d1117] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-16 items-center animate-[marquee_25s_linear_infinite] whitespace-nowrap min-w-full hover:[animation-play-state:paused]">
          {marqueeItems.map((item, idx) => (
            <div 
              key={idx} 
              className="text-lg sm:text-xl font-black tracking-tight text-github-light-textMuted dark:text-github-dark-textMuted hover:text-github-dark-accent dark:hover:text-github-dark-accent hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
export { LogoMarquee };
