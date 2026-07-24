import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTAButton({ text = "Read Case Study", href = "#" }) {
  return (
    <a 
      href={href} 
      className="inline-flex items-center gap-2 text-sm font-bold text-[#58A6FF] hover:text-[#79C0FF] transition-colors group/cta cursor-pointer select-none"
    >
      <span className="relative py-0.5">
        {text}
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#58A6FF] shadow-[0_0_8px_#58A6FF] transition-all duration-300 group-hover:w-full group-hover/cta:w-full" />
      </span>
      <ArrowRight size={15} className="transform transition-all duration-300 group-hover:translate-x-1.5 group-hover/cta:translate-x-1.5 text-[#58A6FF]" />
    </a>
  );
}
export { CTAButton };
