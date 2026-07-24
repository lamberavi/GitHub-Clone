import React from 'react';
import GlobalGradient from './GlobalGradient';
import GlowLayer from './GlowLayer';
import ParticleLayer from './ParticleLayer';
import NoiseLayer from './NoiseLayer';
import StarsLayer from './StarsLayer';

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 w-full h-full overflow-hidden">
      {/* 1. Base Gradient Canvas */}
      <GlobalGradient />

      {/* 2. Stars Layer */}
      <StarsLayer />

      {/* 3. Purple & Blue Glow Orbs + Aurora Layer */}
      <GlowLayer />

      {/* 4. Moving Grid Lines Layer */}
      <div className="absolute inset-0 opacity-15 pointer-events-none z-0">
        <div 
          className="w-full h-full animate-pulse-slow"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(88, 166, 255, 0.08) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(88, 166, 255, 0.08) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* 5. Animated Blur & Light Rays Overlay */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-gradient-to-b from-[#58A6FF]/15 via-[#A371F7]/10 to-transparent blur-[120px] rounded-full pointer-events-none z-0 animate-pulse-slow" />

      {/* 6. Floating Particles Layer */}
      <ParticleLayer />

      {/* 7. Noise Texture Overlay */}
      <NoiseLayer />
    </div>
  );
}
export { BackgroundAnimation };
