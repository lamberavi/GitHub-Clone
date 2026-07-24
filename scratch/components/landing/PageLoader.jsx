import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Sparkles } from 'lucide-react';

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShow(false), 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 10;
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0D1117] select-none overflow-hidden"
        >
          {/* Ambient Background Gradient Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#58A6FF]/20 via-[#A371F7]/15 to-transparent blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />

          <div className="space-y-6 text-center max-w-xs w-full px-6 relative z-10">
            {/* Logo Container with Glow Ring */}
            <div className="relative inline-flex items-center justify-center">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#58A6FF] to-[#3FB950] blur-md opacity-60 animate-spin-slow" />
              <div className="relative p-4 rounded-2xl bg-[#161B22] border border-[#58A6FF]/50 shadow-[0_0_30px_rgba(88,166,255,0.3)]">
                <Github className="w-12 h-12 text-[#58A6FF] animate-pulse" />
              </div>
            </div>

            {/* Title & Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-white tracking-wide">
                <Sparkles size={14} className="text-[#58A6FF] animate-spin-slow" />
                <span>GitHub Antigravity</span>
              </div>

              <div className="h-1.5 w-full bg-[#161B22] rounded-full overflow-hidden border border-[rgba(255,255,255,0.1)] p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-[#58A6FF] via-[#A371F7] to-[#3FB950] rounded-full transition-all duration-200 shadow-[0_0_12px_#58A6FF]"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>

              <p className="text-[10px] uppercase font-extrabold tracking-widest text-[#8B949E]">
                Preparing Environment... {Math.min(progress, 100)}%
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export { PageLoader };
