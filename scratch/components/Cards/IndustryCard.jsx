import React from 'react';
import CardSpotlight from './CardSpotlight';
import CardBackground from './CardBackground';
import CardGlow from './CardGlow';
import CardBorder from './CardBorder';
import CTAButton from './CTAButton';
import CardAnimation from './CardAnimation';
import CardImage from './CardImage';

export default function IndustryCard({ 
  caseKey, 
  company, 
  badge, 
  category, 
  title, 
  description, 
  isActive = false 
}) {
  
  // Custom vector SVG logos
  const renderLogo = () => {
    if (caseKey === 'figma') {
      return (
        <svg viewBox="0 0 100 150" fill="none" className="w-6 h-9 shrink-0 select-none drop-shadow-[0_0_10px_rgba(242,78,30,0.3)]">
          <path d="M25 25C25 11.2 36.2 0 50 0C63.8 0 75 11.2 75 25C75 38.8 63.8 50 50 50H25V25Z" fill="#F24E1E"/>
          <path d="M25 75C25 61.2 36.2 50 50 50C63.8 50 75 61.2 75 75C75 88.8 63.8 100 50 100H25V75Z" fill="#A259FF"/>
          <path d="M25 125C25 111.2 36.2 100 50 100C63.8 100 75 111.2 75 125C75 138.8 63.8 150 25 138.8 25 125Z" fill="#0ACF83"/>
          <circle cx="75" cy="125" r="25" fill="#1ABCFE"/>
        </svg>
      );
    }
    if (caseKey === 'mercedes') {
      return (
        <svg viewBox="0 0 100 100" stroke="#FFFFFF" strokeWidth="6" fill="none" className="w-9 h-9 shrink-0 select-none drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
          <circle cx="50" cy="50" r="41"/>
          <line x1="50" y1="50" x2="50" y2="11"/>
          <line x1="50" y1="50" x2="16" y2="70"/>
          <line x1="50" y1="50" x2="84" y2="70"/>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 100 100" fill="none" className="w-10 h-10 shrink-0 select-none drop-shadow-[0_0_10px_rgba(88,166,255,0.4)]">
        <path d="M20 55 C35 60 65 60 80 55" stroke="#F1C40F" strokeWidth="8.5" strokeLinecap="round"/>
        <path d="M30 40 C40 30 60 30 70 40" stroke="#58A6FF" strokeWidth="6.5" strokeLinecap="round"/>
      </svg>
    );
  };

  return (
    <CardAnimation>
      <CardSpotlight className={`group flex w-full relative rounded-2xl transition-all duration-500 h-full ${
        isActive 
          ? 'md:scale-[1.02] shadow-[0_15px_50px_rgba(88,166,255,0.25)] z-10' 
          : 'hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)]'
      }`}>
        <CardBorder isActive={isActive}>
          <div className="relative w-full h-full p-8 min-h-[380px] flex flex-col justify-between overflow-hidden rounded-2xl z-10 bg-[#161B22]/80 backdrop-blur-md">
            
            {/* Unique Background pattern & 3-stop gradient */}
            <CardBackground caseKey={caseKey} />
            <CardImage caseKey={caseKey} />
            <CardGlow caseKey={caseKey} />
            
            {/* Top section: Dark Glass Badge & Logo */}
            <div className="space-y-5 relative z-10">
              <div className="flex justify-between items-center gap-4">
                {/* Dark Glass Badge with Blue Tint & Hover Animation */}
                <span className="text-[12px] font-bold tracking-wider text-[#58A6FF] uppercase bg-[#0D1117]/80 border border-[#58A6FF]/30 px-3.5 py-1 rounded-full backdrop-blur-md transition-all duration-300 group-hover:border-[#58A6FF]/70 group-hover:shadow-[0_0_12px_rgba(88,166,255,0.3)] group-hover:scale-105">
                  {badge}
                </span>
                <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {renderLogo()}
                </div>
              </div>

              <div className="space-y-2 pt-1">
                {/* Category: 12px, Uppercase, Letter spacing, #8B949E */}
                <span className="text-[12px] font-bold text-[#8B949E] tracking-widest uppercase block">
                  {category}
                </span>
                
                {/* Heading: 24px, Bold, #FFFFFF */}
                <h4 className="text-[22px] sm:text-[24px] font-bold text-white leading-tight transition-colors duration-300 group-hover:text-[#79C0FF]">
                  {title}
                </h4>
              </div>
            </div>

            {/* Bottom section: Description & CTA */}
            <div className="pt-6 relative z-10 space-y-5 border-t border-[rgba(88,166,255,0.15)] mt-6">
              {/* Description: 16px, Gray #C9D1D9, Line height 1.7 */}
              <p className="text-[15px] sm:text-[16px] text-[#C9D1D9] font-normal leading-[1.7]">
                {description}
              </p>

              {/* Card Footer */}
              <div className="pt-1">
                <CTAButton text={`Read ${company} Case Study`} />
              </div>
            </div>

          </div>
        </CardBorder>
      </CardSpotlight>
    </CardAnimation>
  );
}
export { IndustryCard };
