import React from 'react';

export default function Tabs({ 
  tabs, // Array of { id, label, icon: Icon, badge: number }
  activeTab, 
  onChange, 
  className = '' 
}) {
  return (
    <div className={`border-b border-github-light-border/60 dark:border-github-dark-border/60 flex items-center gap-1 overflow-x-auto scrollbar-none ${className}`}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap -mb-[2px] ${
              isActive
                ? 'border-github-light-accent dark:border-github-dark-accent text-github-light-text dark:text-github-dark-text'
                : 'border-transparent text-github-light-textMuted dark:text-github-dark-textMuted hover:text-github-light-text dark:hover:text-github-dark-text hover:border-github-light-border/40 dark:hover:border-github-dark-border/40'
            }`}
          >
            {Icon && <Icon size={16} />}
            <span>{tab.label}</span>
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-2xs font-semibold ${
                isActive 
                  ? 'bg-github-light-accent/15 dark:bg-github-dark-accent/20 text-github-light-accent dark:text-github-dark-accent' 
                  : 'bg-neutral-100 dark:bg-github-dark-border/40 text-github-light-textMuted dark:text-github-dark-textMuted'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
