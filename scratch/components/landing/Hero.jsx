import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Shield, GitBranch, Sparkles } from 'lucide-react';
import Button from '../common/Button';
import { useAnimateOnScroll } from '../../hooks/useAnimation';
import FloatingObject from './FloatingObject';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // GSAP/Framer scroll reveal refs
  const textRef = useAnimateOnScroll({ type: 'slide-up', delay: 0.1 });
  const formRef = useAnimateOnScroll({ type: 'slide-up', delay: 0.3 });
  const imageRef = useAnimateOnScroll({ type: 'scale-up', delay: 0.4 });

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
      setSubmitted(true);
    }
  };

  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-transparent">
      
      {/* Premium ambient backdrop glow blurs */}
      <div className="absolute top-[10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-github-light-accent/5 dark:bg-github-dark-accent/5 blur-[130px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-github-light-purple/5 dark:bg-github-dark-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Headlines & forms */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          
          <div ref={textRef} className="space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-github-light-accent/15 dark:bg-github-dark-accent/15 border border-github-light-accent/20 dark:border-github-dark-accent/25 px-3 py-1 rounded-full text-xs font-semibold text-github-light-accent dark:text-github-dark-accent">
              <Sparkles size={12} className="animate-spin-slow" />
              <span>Let's build from here</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] text-github-light-text dark:text-github-dark-text">
              The world's <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-github-light-accent to-github-light-purple dark:from-github-dark-accent dark:to-github-dark-purple">
                developer platform
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-github-light-textMuted dark:text-github-dark-textMuted leading-relaxed max-w-xl mx-auto lg:mx-0">
              Millions of developers and companies build, ship, and maintain their software on GitHub. Automate your pipelines, host in-browser files explorers, and secure codebases.
            </p>
          </div>

          {/* Email submit form / redirect */}
          <div ref={formRef} className="max-w-md mx-auto lg:mx-0">
            {!submitted ? (
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-sm bg-github-light-bg dark:bg-github-dark-bg border border-github-light-border dark:border-github-dark-border rounded-xl outline-none focus:border-github-light-accent dark:focus:border-github-dark-accent transition-all custom-shadow"
                />
                <Button type="submit" icon={ArrowRight} className="py-2.5">
                  Sign up for GitHub
                </Button>
              </form>
            ) : (
              <div className="p-4 bg-github-light-success/10 border border-github-light-success/20 rounded-xl text-github-light-success dark:text-emerald-450 text-sm font-semibold flex items-center gap-2 animate-fade-in">
                <span>✓</span>
                <span>Thank you! Proceed to sign up below.</span>
                <Link to="/register" className="ml-auto underline hover:opacity-90">
                  Register
                </Link>
              </div>
            )}

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6 text-xs text-github-light-textMuted dark:text-github-dark-textMuted font-semibold">
              <span className="flex items-center gap-1"><Code size={13} /> Monaco Code Editor</span>
              <span className="flex items-center gap-1"><GitBranch size={13} /> Multi-branch Git</span>
              <span className="flex items-center gap-1"><Shield size={13} /> Telemetry Audits</span>
            </div>
          </div>

        </div>

        {/* Right Column: Animated floating mockup screenshot & SVGs */}
        <div ref={imageRef} className="lg:col-span-6 relative flex justify-center h-[420px] items-center">
          
          {/* Circular glow background under mockup */}
          <div className="absolute top-[20%] w-[350px] h-[350px] rounded-full bg-github-light-accent/10 dark:bg-github-dark-accent/5 blur-[80px] pointer-events-none" />

          {/* Floating Robot mascot SVG (Phase 4 & 8) */}
          <FloatingObject speed={5.5} delay={0.4} className="absolute top-[10px] left-[-35px] z-20 w-16 h-16 pointer-events-none hidden md:block">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-[0_0_15px_rgba(188,140,255,0.45)]">
              <rect x="15" y="25" width="70" height="50" rx="15" fill="#21262D" stroke="#30363D" strokeWidth="3"/>
              <circle cx="35" cy="48" r="7" fill="#58A6FF"/>
              <circle cx="65" cy="48" r="7" fill="#58A6FF"/>
              <path d="M40 62 Q50 68 60 62" stroke="#e6edf3" strokeWidth="3" strokeLinecap="round"/>
              <line x1="50" y1="25" x2="50" y2="10" stroke="#bc8cff" strokeWidth="4"/>
              <circle cx="50" cy="8" r="5" fill="#bc8cff"/>
            </svg>
          </FloatingObject>

          {/* Floating Duck mascot SVG (Phase 4 & 8) */}
          <FloatingObject speed={7.2} delay={1.1} className="absolute bottom-[25px] right-[-25px] z-20 w-14 h-14 pointer-events-none hidden md:block">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-[0_0_12px_rgba(245,158,11,0.45)]">
              <circle cx="45" cy="40" r="22" fill="#F59E0B"/>
              <path d="M45 52 C45 68 75 68 75 52 Z" fill="#F59E0B"/>
              <circle cx="52" cy="35" r="3.5" fill="#0D1117"/>
              <path d="M62 38 L72 42 L62 46 Z" fill="#EF4444"/>
            </svg>
          </FloatingObject>

          {/* Floating Glowing Sphere SVG (Phase 4 & 8) */}
          <FloatingObject speed={8.8} delay={1.6} className="absolute top-[25px] right-[10px] z-10 w-10 h-10 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]">
              <circle cx="50" cy="50" r="40" fill="url(#sphereGlow)"/>
              <defs>
                <radialGradient id="sphereGlow" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#EC4899"/>
                  <stop offset="50%" stopColor="#7C3AED"/>
                  <stop offset="100%" stopColor="#0D1117"/>
                </radialGradient>
              </defs>
            </svg>
          </FloatingObject>

          {/* Browser mockup box container */}
          <div className="relative border border-github-light-border/70 dark:border-github-dark-border/80 bg-github-light-bg/70 dark:bg-github-dark-sidebar/70 backdrop-blur-md rounded-2xl p-5 w-full max-w-lg custom-shadow select-none hover:translate-y-[-5px] hover:shadow-premium-hover transition-all duration-500 animate-float-premium">
            
            {/* Mock browser header */}
            <div className="flex items-center justify-between border-b border-github-light-border/40 dark:border-github-dark-border/40 pb-3 mb-4">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-[10px] font-mono text-github-light-textMuted dark:text-github-dark-textMuted">antigravity-ide/github-clone</span>
              <div className="w-6" />
            </div>

            {/* Code representation skeleton list */}
            <div className="font-mono text-2xs space-y-2 text-github-light-text/80 dark:text-github-dark-text/80">
              <p className="text-github-light-textMuted dark:text-github-dark-textMuted">// Initialize in-memory workspace modules</p>
              <p><span className="text-github-light-purple dark:text-github-dark-purple">const</span> clone = <span className="text-github-light-accent dark:text-github-dark-accent">new</span> GitHubClone();</p>
              <p>{"clone.configure({"}</p>
              <p className="pl-4">{"editor: "}<span className="text-github-light-success dark:text-github-dark-success">"Monaco"</span>,</p>
              <p className="pl-4">{"themes: ["}<span className="text-github-light-success dark:text-github-dark-success">"light"</span>, <span className="text-github-light-success dark:text-github-dark-success">"dark"</span>{"],"}</p>
              <p className="pl-4">{"responsive: "}<span className="text-github-light-purple dark:text-github-dark-purple">true</span></p>
              <p>{"});"}</p>
              <p className="text-github-light-success dark:text-github-dark-success">{"clone.run();"}</p>
            </div>

            {/* Float badges */}
            <div className="absolute top-[-15px] right-[-10px] bg-github-light-accent text-white font-bold text-2xs px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
              <span>🚀</span> Fast
            </div>
            <div className="absolute bottom-[20px] left-[-20px] glass-panel border border-github-light-border dark:border-github-dark-border rounded-xl p-3 shadow-lg flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-github-light-purple/20 flex items-center justify-center text-github-light-purple font-bold">
                PR
              </div>
              <div>
                <p className="text-2xs font-bold leading-none">PR #12 Merged</p>
                <span className="text-[9px] text-github-light-textMuted dark:text-github-dark-textMuted font-medium">by @alex_dev</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
export { Hero };
