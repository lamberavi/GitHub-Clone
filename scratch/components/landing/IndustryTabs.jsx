import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Compass, Users2 } from 'lucide-react';

export default function IndustryTabs() {
  const [activeSegment, setActiveSegment] = useState('industry'); // industry, size, usecase

  const segments = [
    { id: 'industry', label: 'By Industry', icon: Building },
    { id: 'size', label: 'By Business Size', icon: Users2 },
    { id: 'usecase', label: 'By Use Case', icon: Compass }
  ];

  const dataMap = {
    industry: [
      { tag: 'Finance', title: 'High-security banking infrastructure', desc: 'LDAP access overrides and telemetry logs complying with strict financial guidelines.', metric: 'SOC 2 / ISO' },
      { tag: 'Healthcare', title: 'HIPAA-compliant workspace pipelines', desc: 'Secure repository encryptions safeguarding user data and logs.', metric: 'HIPAA Ready' },
      { tag: 'Automotive', title: 'Embedded firmware delivery boards', desc: 'Continuous integration compile tools accelerating vehicle telemetry updates.', metric: 'Automated CI' }
    ],
    size: [
      { tag: 'Startups', title: 'Spin up workspaces for free', desc: 'Access in-memory databases, file explorers, and code edits immediately.', metric: 'Free Tier' },
      { tag: 'Teams', title: 'Collaborate with custom seats', desc: 'Sync branch targets, open pull requests, and review commits collectively.', metric: 'Seat Config' },
      { tag: 'Enterprise', title: 'Advanced governance structures', desc: 'Federated single sign-on logs and central admin analytics monitors.', metric: 'SSO & Audits' }
    ],
    usecase: [
      { tag: 'Security', title: 'Telemetry vulnerability checkers', desc: 'Audit system actions and track directory modifications from security panels.', metric: 'Access Audit' },
      { tag: 'Automation', title: 'Trigger actions on repository push', desc: 'Automate build compiles and chart contributor velocities on graphs.', metric: 'Auto Hooks' },
      { tag: 'Code Review', title: 'High-fidelity diff reviews', desc: 'Analyze side-by-side split diff lines and write comment threads.', metric: 'Diff Engine' }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      
      {/* Segment Selector Tabs with bright text colors */}
      <div className="flex justify-center border-b border-[#30363D]/60 pb-5 flex-wrap gap-2">
        {segments.map((seg) => {
          const Icon = seg.icon;
          const isActive = activeSegment === seg.id;

          return (
            <button
              key={seg.id}
              onClick={() => setActiveSegment(seg.id)}
              className={`flex items-center gap-2.5 px-5 py-3 text-sm font-bold rounded-xl transition-all duration-300 cursor-pointer select-none whitespace-nowrap ${
                isActive 
                  ? 'bg-[#58A6FF]/15 text-[#58A6FF] border border-[#58A6FF]/40 shadow-[0_0_20px_rgba(88,166,255,0.25)]' 
                  : 'text-[#C9D1D9] hover:text-white hover:bg-[#161B22]'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-[#58A6FF]' : 'text-[#8B949E]'} />
              <span>{seg.label}</span>
            </button>
          );
        })}
      </div>

      {/* Cards list grid with bright white text & high contrast */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {dataMap[activeSegment].map((item, idx) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-[#161B22]/90 border border-[rgba(88,166,255,0.2)] hover:border-[rgba(88,166,255,0.5)] hover:shadow-[0_0_25px_rgba(88,166,255,0.2)] transition-all duration-300 flex flex-col justify-between min-h-[240px] group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-xs text-[#58A6FF] font-black uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#0D1117] border border-[#58A6FF]/30 text-white shadow-sm">
                    {item.metric}
                  </span>
                </div>
                
                <h4 className="text-lg font-extrabold text-white leading-snug group-hover:text-[#79C0FF] transition-colors">
                  {item.title}
                </h4>
              </div>

              <p className="text-sm text-[#C9D1D9] font-medium leading-relaxed pt-3 border-t border-[#30363D]/60 mt-4">
                {item.desc}
              </p>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
export { IndustryTabs };
