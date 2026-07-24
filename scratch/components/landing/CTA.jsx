import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../common/Button';
import { useAnimateOnScroll } from '../../hooks/useAnimation';

export default function CTA() {
  const containerRef = useAnimateOnScroll({ type: 'slide-up' });

  return (
    <section 
      ref={containerRef}
      className="py-20 bg-transparent relative overflow-hidden transition-colors duration-200"
    >
      {/* Dynamic glowing core behind CTA */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] h-[300px] rounded-full bg-github-light-accent/15 dark:bg-github-dark-accent/10 blur-[90px]" />
        <div className="w-[200px] h-[200px] rounded-full bg-github-light-purple/10 dark:bg-github-dark-purple/5 blur-[80px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6">
        
        <div className="inline-flex items-center gap-1.5 bg-github-light-accent/15 dark:bg-github-dark-accent/15 border border-github-light-accent/20 dark:border-github-dark-accent/25 px-2.5 py-0.5 rounded-full text-3xs font-bold uppercase tracking-wider text-github-light-accent dark:text-github-dark-accent">
          <Sparkles size={10} /> Start Building Today
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Let's build the future of software, together.
        </h2>

        <p className="text-sm sm:text-base text-github-light-textMuted dark:text-github-dark-textMuted max-w-xl mx-auto leading-relaxed">
          Open pull request reviews, edit Monaco files, configure theme preferences, and track analytics on responsive dashboard widgets.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link to="/login">
            <Button size="lg" icon={ArrowRight}>
              Launch Dashboard
            </Button>
          </Link>
          <Link to="/register">
            <Button size="lg" variant="secondary">
              Create an account
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
