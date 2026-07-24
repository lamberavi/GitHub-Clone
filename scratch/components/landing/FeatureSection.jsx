import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export default function FeatureSection({ activeTab }) {
  const [openAccordion, setOpenAccordion] = useState(0);

  // Reset open accordion on tab switch
  useEffect(() => {
    setOpenAccordion(0);
  }, [activeTab]);

  const contentMap = {
    code: {
      title: 'Write code fluidly in the browser',
      desc: 'Use the integrated Monaco Editor to inspect files, make fast edits, and write commits straight onto branch logs.',
      btnText: 'Open File Explorer',
      items: [
        { label: 'Monaco Editor Integration', details: 'Full syntax highlighting for multiple languages, scroll lines, and visual theme syncs.' },
        { label: 'In-Memory Commits', details: 'Record edits directly on the local git branch without needing CLI terminals.' },
        { label: 'Hierarchical Trees', details: 'Browse folders, subdirectories, and files in a clean sidebar structure.' }
      ],
      mockup: (
        <div className="font-mono text-xs space-y-3 bg-[#090D12] text-slate-100 p-6 rounded-xl border border-[rgba(88,166,255,0.2)] shadow-2xl">
          <p className="text-[#8B949E]">// src/components/Button.jsx</p>
          <p><span className="text-[#A371F7] font-bold">export const</span> {"Button = ({ children }) => ("}</p>
          <p className="pl-4">&lt;<span className="text-[#58A6FF] font-bold">button</span> className=<span className="text-[#3FB950]">"px-4 py-2 bg-blue-500 rounded"</span>&gt;</p>
          <p className="pl-8">{`{children}`}</p>
          <p className="pl-4">&lt;/<span className="text-[#58A6FF] font-bold">button</span>&gt;</p>
          <p>);</p>
        </div>
      )
    },
    plan: {
      title: 'Track issues and prioritize sprint cycles',
      desc: 'Establish boards to assign tasks, define custom labels, customize priority weights, and review notification triggers.',
      btnText: 'View Issues Board',
      items: [
        { label: 'Custom Bug Labels', details: 'Tag issues with bug, enhancement, or documentation labels for sorting.' },
        { label: 'Priority Weights', details: 'Set priority levels from Low to Critical to guide developer cycles.' },
        { label: 'Interactive Comment Board', details: 'Add replying comments in real time, discuss bug fixes, and resolve threads.' }
      ],
      mockup: (
        <div className="space-y-3 bg-[#161B22] p-5 rounded-xl border border-[rgba(88,166,255,0.2)] shadow-2xl text-white">
          <div className="flex items-center justify-between border-b border-[#30363D] pb-2">
            <span className="text-xs font-bold text-white">Issues Tracking</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#238636]/30 border border-[#238636] text-[#3FB950] font-bold">3 Open</span>
          </div>
          <div className="space-y-2">
            <div className="p-3 bg-[#0D1117] border border-[#30363D] rounded-lg text-xs space-y-1">
              <div className="flex justify-between font-bold text-white">
                <span>#1 Monaco scroll fix</span>
                <span className="text-[10px] text-[#F85149] bg-[#F85149]/10 px-1.5 py-0.5 rounded">Critical</span>
              </div>
              <p className="text-[11px] text-[#8B949E]">Opened by @alex_dev</p>
            </div>
            <div className="p-3 bg-[#0D1117] border border-[#30363D] rounded-lg text-xs space-y-1">
              <div className="flex justify-between font-bold text-white">
                <span>#2 Document core layout API</span>
                <span className="text-[10px] text-[#58A6FF] bg-[#58A6FF]/10 px-1.5 py-0.5 rounded">Medium</span>
              </div>
              <p className="text-[11px] text-[#8B949E]">Opened by @ravil</p>
            </div>
          </div>
        </div>
      )
    },
    collaborate: {
      title: 'Review pull requests and diff changes',
      desc: 'Verify code additions and deletions line-by-line using visual code diff grids. Resolve threads and merge branches instantly.',
      btnText: 'Explore PR Pipeline',
      items: [
        { label: 'Split Diff Highlighter', details: 'Clear green highlights for additions (+) and red overlays for deletions (-).' },
        { label: 'Merge Approvals', details: 'Verify branch conflicts automatically and click to merge PR branch changes.' },
        { label: 'Branch Compare Picker', details: 'Compare compare-branches directly with the main base branch before building PRs.' }
      ],
      mockup: (
        <div className="font-mono text-xs bg-[#090D12] text-slate-100 p-5 rounded-xl border border-[rgba(88,166,255,0.2)] shadow-2xl space-y-1.5">
          <p className="text-[11px] text-[#38BDF8] font-bold">@@ -4,2 +4,3 @@</p>
          <p className="bg-[#F85149]/20 text-[#FF7B72] px-2 py-0.5 rounded font-semibold">- &lt;div className="w-64 bg-slate-900"&gt;</p>
          <p className="bg-[#238636]/30 text-[#7EE787] px-2 py-0.5 rounded font-semibold">{"+ <div className={`w-64 bg-slate-900 ${collapsed ? 'w-20' : 'w-64'}`}>"}</p>
          <p className="text-[#C9D1D9] pl-2">{"  <Navbar toggle={toggle} />"}</p>
        </div>
      )
    },
    automate: {
      title: 'Monitor live statistics and activity logs',
      desc: 'Observe commits frequency and user logs. Track repository contributions on contribution calendar squares.',
      btnText: 'View Analytics Graph',
      items: [
        { label: 'Contribution Grid Calendar', details: 'A github-like contribution squares grid representing commit density.' },
        { label: 'Telemetry Graphs', details: 'Line/Area charts visualising repository commit frequency over time.' },
        { label: 'Real-time Feed Logs', details: 'Feeds displaying commits, star actions, and code merge timestamps.' }
      ],
      mockup: (
        <div className="bg-[#161B22] p-5 rounded-xl border border-[rgba(88,166,255,0.2)] shadow-2xl space-y-3">
          <span className="text-xs font-bold text-white block">Contribution Frequency</span>
          <div className="flex gap-1 flex-wrap max-w-xs mx-auto pt-1">
            {Array.from({ length: 42 }).map((_, i) => {
              const bgClass = i % 7 === 0 ? 'bg-[#238636]' : i % 5 === 0 ? 'bg-[#3FB950]' : i % 3 === 0 ? 'bg-[#0E4429]' : 'bg-[#21262D]';
              return <div key={i} className={`w-3.5 h-3.5 rounded-[2px] ${bgClass}`} />;
            })}
          </div>
        </div>
      )
    },
    secure: {
      title: 'Analyze central security databases',
      desc: 'Verify administrative logs and actions. Review administrative repository deletions or modifications in-memory.',
      btnText: 'Inspect Audits Logs',
      items: [
        { label: 'Administrative Audits Logs', details: 'Tables indexing actions, descriptions, IP logs, and success indicators.' },
        { label: 'Role Toggles', details: 'Ensure only validated mock sessions can execute admin dashboard controls.' },
        { label: 'Settings Security', details: 'Establish local account protection toggles and database reset points.' }
      ],
      mockup: (
        <div className="space-y-3 bg-[#161B22] p-5 rounded-xl border border-[rgba(88,166,255,0.2)] shadow-2xl">
          <span className="text-xs font-bold text-white block">Security Audit Logs</span>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between border-b border-[#30363D] pb-2">
              <span className="text-[#58A6FF] font-bold">REPO_DELETE</span>
              <span className="text-[#8B949E]">Just now</span>
            </div>
            <div className="flex justify-between border-b border-[#30363D] pb-2">
              <span className="text-[#58A6FF] font-bold">COMMIT_PUSH</span>
              <span className="text-[#8B949E]">2m ago</span>
            </div>
          </div>
        </div>
      )
    }
  };

  const current = contentMap[activeTab];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column: Descriptive text and Accordions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">{current.title}</h2>
              <p className="text-base sm:text-lg text-[#C9D1D9] leading-relaxed font-medium">{current.desc}</p>
            </div>

            {/* Accordions with high contrast white & blue text */}
            <div className="space-y-3 border-t border-[#30363D]/60 pt-4">
              {current.items.map((item, index) => {
                const isOpen = openAccordion === index;
                return (
                  <div 
                    key={item.label} 
                    className="border-b border-[#30363D]/60 pb-3"
                  >
                    <button
                      onClick={() => setOpenAccordion(isOpen ? -1 : index)}
                      className={`w-full text-left font-bold text-base flex items-center justify-between py-2.5 cursor-pointer select-none transition-colors ${
                        isOpen ? 'text-[#58A6FF]' : 'text-white hover:text-[#58A6FF]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown size={18} className={`transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#58A6FF]' : 'text-[#8B949E]'
                      }`} />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-[#C9D1D9] font-medium mt-1 leading-relaxed pl-1">
                            {item.details}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link to="/login">
                <Button variant="gradientBlue" icon={ArrowRight} className="py-3 px-6 font-bold shadow-[0_0_20px_rgba(88,166,255,0.3)]">
                  {current.btnText}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Mockup Showcase Panel */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md p-6 bg-[#161B22]/90 border border-[rgba(88,166,255,0.25)] rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative overflow-hidden group">
              {/* Background accent ring */}
              <div className="absolute top-[-10%] right-[-10%] w-48 h-48 rounded-full bg-[#58A6FF]/10 blur-[50px] pointer-events-none" />
              
              <div className="relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                {current.mockup}
              </div>
            </div>
          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
export { FeatureSection };
