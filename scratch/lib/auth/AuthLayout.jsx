import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Code2, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function AuthLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full bg-[var(--surface-canvas)] text-[var(--text-primary)] relative overflow-hidden flex items-center justify-center font-sans antialiased selection:bg-[var(--accent-glow)] transition-colors duration-300">
      
      {/* Main Container: Split Screen on Desktop (lg:grid-cols-12), Centered on Tablet/Mobile */}
      <div className="relative z-10 w-full max-w-7xl mx-auto min-h-screen lg:min-h-[850px] flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ================= LEFT SIDE (Desktop Branding & Feature Showcase) ================= */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex lg:col-span-7 flex-col justify-between space-y-10 pr-6"
          >
            {/* Logo & Brand Header */}
            <div className="space-y-3">
              <Link to="/" className="inline-flex items-center gap-3 group">
                <div className="p-3 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-primary)] shadow-sm group-hover:border-[var(--accent-primary)] group-hover:scale-105 transition-all duration-300">
                  <Github size={32} className="text-[var(--accent-primary)] group-hover:rotate-12 transition-transform duration-500" />
                </div>
                <div>
                  <span className="text-2xl font-black tracking-tight text-[var(--text-primary)] block">
                    GitHub <span className="text-[var(--accent-primary)]">Antigravity</span>
                  </span>
                  <span className="text-xs font-semibold text-[var(--text-muted)] tracking-wider uppercase">
                    Next-Gen AI Developer Platform
                  </span>
                </div>
              </Link>
            </div>

            {/* Dynamic Animated Value Prop Title */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-glow)] border border-[var(--accent-primary)]/30 text-xs font-bold text-[var(--accent-primary)]">
                <Sparkles size={14} className="animate-spin-slow" />
                <span>Engineered for Developer Velocity</span>
              </div>
              <h1 className="text-4xl xl:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
                Where the world builds <br />
                <span className="bg-gradient-to-r from-[var(--accent-primary)] via-[#A371F7] to-[#38BDF8] bg-clip-text text-transparent">
                  software together.
                </span>
              </h1>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-xl font-normal">
                Join over 100 million developers building secure, high-velocity workflows with automated AI pair programming, cloud codespaces, and real-time security scanning.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-primary)] shadow-sm hover:border-[var(--accent-primary)] transition-all duration-300 group">
                <div className="w-9 h-9 rounded-lg bg-[var(--accent-glow)] flex items-center justify-center text-[var(--accent-primary)] mb-3 group-hover:scale-110 transition-transform">
                  <Zap size={18} />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">4x Faster Builds</h3>
                <p className="text-xs text-[var(--text-muted)] leading-normal">Optimized runner instances & cloud cache.</p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-primary)] shadow-sm hover:border-[#A371F7] transition-all duration-300 group">
                <div className="w-9 h-9 rounded-lg bg-[#A371F7]/15 flex items-center justify-center text-[#A371F7] mb-3 group-hover:scale-110 transition-transform">
                  <Code2 size={18} />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">Instant Codespaces</h3>
                <p className="text-xs text-[var(--text-muted)] leading-normal">Pre-configured browser dev environments.</p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-primary)] shadow-sm hover:border-[#38BDF8] transition-all duration-300 group">
                <div className="w-9 h-9 rounded-lg bg-[#38BDF8]/15 flex items-center justify-center text-[#38BDF8] mb-3 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={18} />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">Secret Protection</h3>
                <p className="text-xs text-[var(--text-muted)] leading-normal">Automated push prevention & audits.</p>
              </div>
            </div>

            {/* Floating Testimonial Pill */}
            <div className="pt-2 flex items-center gap-4 text-xs text-[var(--text-muted)]">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-[10px] font-bold text-white border-2 border-[var(--surface-canvas)]">FG</div>
                <div className="w-7 h-7 rounded-full bg-[#A371F7] flex items-center justify-center text-[10px] font-bold text-white border-2 border-[var(--surface-canvas)]">MB</div>
                <div className="w-7 h-7 rounded-full bg-[#38BDF8] flex items-center justify-center text-[10px] font-bold text-white border-2 border-[var(--surface-canvas)]">ML</div>
              </div>
              <span>Trusted by 90% of Fortune 100 engineering teams.</span>
            </div>

          </motion.div>

          {/* ================= RIGHT SIDE (Glassmorphic Login / Signup Card) ================= */}
          <div className="col-span-1 lg:col-span-5 w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md relative"
            >
              {/* Card Outer Glow Ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[var(--accent-primary)]/30 via-[#A371F7]/20 to-[#38BDF8]/30 blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 animate-pulse-slow pointer-events-none" />

              {/* Glass Login / Signup Card */}
              <div className="relative w-full rounded-2xl bg-[var(--surface-card)] border border-[var(--border-primary)] p-8 sm:p-10 shadow-lg overflow-hidden z-10 text-[var(--text-primary)]">
                
                {/* Top highlight bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-80" />

                {/* Animated Outlet Page Transition */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Outlet />
                  </motion.div>
                </AnimatePresence>

              </div>
            </motion.div>
          </div>

        </div>
      </div>

    </div>
  );
}
export { AuthLayout };
