import React from 'react';
import { useAnimateOnScroll } from '../../hooks/useAnimation';
import IndustryCard from '../Cards/IndustryCard';

export default function CaseStudies() {
  const containerRef = useAnimateOnScroll({ type: 'slide-up' });

  const cases = [
    {
      caseKey: 'figma',
      company: 'Figma',
      badge: 'Collaboration',
      category: 'Codespaces & Actions',
      title: 'How Figma powers engineering sprints with GitHub Actions and Codespaces.',
      description: 'Explore how automated container environments and cloud hosting speed up core deployment pipelines by over 3.5x.',
      isActive: false
    },
    {
      caseKey: 'mercedes',
      company: 'Mercedes-Benz',
      badge: 'Enterprise Spotlight',
      category: 'GitHub Advanced Security',
      title: 'Scaling secure developer workflows across thousands of systems worldwide.',
      description: 'Binding custom telemetry layers, secure authentication tokens, and strict access keys to ensure codebase compliance globally.',
      isActive: true
    },
    {
      caseKey: 'mercado',
      company: 'Mercado Libre',
      badge: 'Security Audits',
      category: 'Actions & Automation',
      title: 'Driving e-commerce speed and reliability through automated repository security audits.',
      description: 'Triggering real-time audits on commits, tracking workflow logs, and preventing vulnerability regressions across thousands of repos.',
      isActive: false
    }
  ];

  return (
    <section ref={containerRef} className="py-28 bg-transparent relative overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">Customer Success Stories</h2>
          <p className="text-sm sm:text-base text-github-light-textMuted dark:text-github-dark-textMuted leading-relaxed">
            See how scaling businesses and global enterprises build high-velocity engineering cultures on the GitHub platform.
          </p>
        </div>

        {/* Case Study Cards Grid with 3D Tilt & Spotlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pt-6">
          {cases.map((cs) => (
            <div key={cs.company} className="h-full flex items-center">
              <IndustryCard
                caseKey={cs.caseKey}
                company={cs.company}
                badge={cs.badge}
                category={cs.category}
                title={cs.title}
                description={cs.description}
                isActive={cs.isActive}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
export { CaseStudies };
