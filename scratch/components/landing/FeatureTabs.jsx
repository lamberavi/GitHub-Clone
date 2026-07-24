import React from 'react';
import { motion } from 'framer-motion';
import { Code, Calendar, Users, Cpu, Shield } from 'lucide-react';

export default function FeatureTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'code', label: 'Code', icon: Code },
    { id: 'plan', label: 'Plan', icon: Calendar },
    { id: 'collaborate', label: 'Collaborate', icon: Users },
    { id: 'automate', label: 'Automate', icon: Cpu },
    { id: 'secure', label: 'Secure', icon: Shield }
  ];

  return (
    <div className="w-full flex justify-center border-b border-[#30363D]/60 mb-12 overflow-x-auto scrollbar-none">
      <div className="flex gap-3 p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold rounded-xl transition-all duration-300 cursor-pointer select-none whitespace-nowrap ${
                isActive 
                  ? 'text-[#58A6FF] bg-[#58A6FF]/10 shadow-[0_0_15px_rgba(88,166,255,0.2)]' 
                  : 'text-[#C9D1D9] hover:text-white hover:bg-[#161B22]'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-[#58A6FF]' : 'text-[#8B949E]'} />
              <span>{tab.label}</span>
              
              {/* Animated underline highlighter */}
              {isActive && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute bottom-[-2px] left-0 right-0 h-[3px] bg-[#58A6FF] shadow-[0_0_10px_#58A6FF] rounded-full"
                  transition={{ type: 'spring', damping: 20, stiffness: 220 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export { FeatureTabs };
