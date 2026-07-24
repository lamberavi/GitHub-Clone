import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';

// Effects overlays
import PageLoader from '../../components/landing/PageLoader';
import BackgroundAnimation from '../../components/Background/BackgroundAnimation';
import MouseGlow from '../../components/landing/MouseGlow';

// Reveal & Marquee helpers
import SectionReveal from '../../components/landing/SectionReveal';
import LogoMarquee from '../../components/landing/LogoMarquee';

// Section imports
import Navbar from '../../components/landing/Navbar';
import Hero from '../../components/landing/Hero';
import FeatureTabs from '../../components/landing/FeatureTabs';
import FeatureSection from '../../components/landing/FeatureSection';
import CaseStudies from '../../components/landing/CaseStudies';
import IndustryTabs from '../../components/landing/IndustryTabs';
import CustomerStories from '../../components/landing/CustomerStories';
import CTA from '../../components/landing/CTA';
import Footer from '../../components/Footer/Footer';

export default function Landing() {
  const [activeTab, setActiveTab] = useState('code');

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      wheelMultiplier: 0.95
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0D1117] text-white transition-colors duration-200 antialiased relative">
      {/* Visual background layers */}
      <PageLoader />
      <BackgroundAnimation />
      <MouseGlow />

      {/* Primary content layer */}
      <div className="relative z-20">
        
        {/* 1. Header Navigation */}
        <Navbar />

        {/* 2. Hero Presentation (entrance delay) */}
        <SectionReveal delay={0.1} duration={0.85}>
          <Hero />
        </SectionReveal>

        {/* 3. Infinite Logo Marquee (paused on hover) */}
        <SectionReveal delay={0.15}>
          <LogoMarquee />
        </SectionReveal>

        {/* 4. Tab Segment Showcase */}
        <SectionReveal delay={0.2}>
          <section className="py-20 relative border-b border-[#30363D]/40 transition-colors">
            <div className="max-w-4xl mx-auto px-6 text-center space-y-3 mb-10">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">Features engineered for developer speed</h2>
              <p className="text-base sm:text-lg text-[#C9D1D9] leading-relaxed max-w-xl mx-auto font-medium">
                Explore advanced tools, in-memory directories explorer, pull request reviews, and security tables.
              </p>
            </div>
            
            <FeatureTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <FeatureSection activeTab={activeTab} />
          </section>
        </SectionReveal>

        {/* 5. Case Studies Hover grid with 3D Tilt */}
        <SectionReveal delay={0.2}>
          <CaseStudies />
        </SectionReveal>

        {/* 6. Industry Segment Swaps */}
        <SectionReveal delay={0.2}>
          <section className="py-20 relative border-y border-[#30363D]/40">
            <div className="max-w-3xl mx-auto px-6 text-center space-y-3 mb-8">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">Designed for every developer flow</h2>
              <p className="text-base sm:text-lg text-[#C9D1D9] max-w-lg mx-auto leading-relaxed font-medium">
                Integrate governance filters, scale startup seats, and audit security compliance scopes.
              </p>
            </div>
            
            <IndustryTabs />
          </section>
        </SectionReveal>

        {/* 7. Testimonials Grid */}
        <SectionReveal delay={0.2}>
          <CustomerStories />
        </SectionReveal>

        {/* 8. Call To Action overlay */}
        <SectionReveal delay={0.2}>
          <CTA />
        </SectionReveal>

        {/* 9. Footer Map */}
        <SectionReveal delay={0.1}>
          <Footer />
        </SectionReveal>

      </div>

    </div>
  );
}
export { Landing };
