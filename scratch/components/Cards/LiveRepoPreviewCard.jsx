import React from 'react';
import { useAppearance } from '../../lib/context/AppearanceContext';
import { Star, GitFork, Eye, Lock, Sparkles, BookOpen } from 'lucide-react';

export default function LiveRepoPreviewCard() {
  const { appearance, AccentHexMap } = useAppearance();

  const accent = AccentHexMap[appearance.accentColor] || AccentHexMap.blue;

  return (
    <div className="w-full space-y-2 select-none">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold text-[#8B949E] uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles size={14} style={{ color: accent.hex }} />
          Live Interface Preview
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase bg-[#161B22] border border-[#30363D] text-[#8B949E]">
          Real-Time Sync
        </span>
      </div>

      {/* Live Preview Card */}
      <div 
        className="w-full p-6 transition-all duration-300 relative overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: appearance.cardStyle === 'flat' ? 'transparent' : 'var(--border-color)',
          borderWidth: appearance.cardStyle === 'flat' ? '0px' : '1px',
          borderRadius: 'var(--border-radius-base)',
          boxShadow: appearance.shadowIntensity === 'none' 
            ? 'none' 
            : appearance.shadowIntensity === 'glow' 
            ? `0 0 30px ${accent.glow}` 
            : appearance.shadowIntensity === 'strong' 
            ? '0 20px 40px rgba(0,0,0,0.7)' 
            : '0 10px 25px rgba(0,0,0,0.3)',
          backdropFilter: appearance.glassEffects ? `blur(${appearance.glassBlur}px)` : 'none'
        }}
      >
        {/* Top Header */}
        <div className="flex justify-between items-start gap-4 mb-3">
          <div className="flex items-center gap-2 font-bold" style={{ fontSize: 'var(--font-size-base)' }}>
            <BookOpen size={18} style={{ color: accent.hex }} />
            <span style={{ color: accent.hex }} className="hover:underline cursor-pointer">octocat</span>
            <span className="text-[#8B949E]">/</span>
            <span className="text-white hover:underline cursor-pointer font-black">hello-world</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#30363D] text-[#8B949E] font-medium ml-1">
              Public
            </span>
          </div>

          {/* Star Button */}
          <button 
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border border-[#30363D] bg-[#21262D] hover:bg-[#30363D] text-white transition-all cursor-pointer"
            style={{ borderRadius: 'calc(var(--border-radius-base) * 0.6)' }}
          >
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span>Star</span>
            <span className="px-1.5 py-0.2 bg-[#161B22] rounded-full text-[10px] text-[#8B949E]">1.2k</span>
          </button>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#C9D1D9] leading-relaxed mb-4 font-normal">
          My first repository on GitHub Antigravity! Demonstrating live theme styling, custom accent colors, typography, and card properties.
        </p>

        {/* Footer Info */}
        <div className="flex items-center gap-6 text-xs text-[#8B949E] font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: accent.hex }} />
            <span className="text-white font-bold">JavaScript</span>
          </div>

          <div className="flex items-center gap-1 hover:text-white cursor-pointer">
            <Star size={14} />
            <span>1,248</span>
          </div>

          <div className="flex items-center gap-1 hover:text-white cursor-pointer">
            <GitFork size={14} />
            <span>342</span>
          </div>

          <span className="text-[10px]">Updated 2 mins ago</span>
        </div>

      </div>
    </div>
  );
}
