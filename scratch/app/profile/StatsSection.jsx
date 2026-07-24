import React from 'react';
import { BookOpen, Star, GitCommit, Code } from 'lucide-react';

export default function StatsSection({ repositories = [], contributions = [] }) {
  const totalStars = repositories.reduce((acc, curr) => acc + (curr.stars || 0), 0);
  const totalCommits = contributions.reduce((acc, curr) => acc + (curr.commitCount || 0), 0);
  
  const languages = repositories.map(r => r.language).filter(Boolean);
  const uniqueLangs = [...new Set(languages)].length;

  const statCards = [
    { label: 'Repositories', value: repositories.length, icon: BookOpen, color: 'text-[var(--accent-primary)]' },
    { label: 'Total Stars', value: totalStars, icon: Star, color: 'text-amber-500' },
    { label: 'Total Commits', value: totalCommits, icon: GitCommit, color: 'text-[#3FB950]' },
    { label: 'Languages Used', value: uniqueLangs, icon: Code, color: 'text-[#A371F7]' }
  ];

  return (
    <div className="space-y-6 select-none text-[var(--text-primary)]">
      <h3 className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)]">Developer Overview & Metrics</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--surface-card)] hover:border-[var(--accent-primary)] transition-all space-y-2 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-2xs font-black text-[var(--text-muted)] uppercase tracking-wide">{stat.label}</span>
                <Icon size={16} className={stat.color} />
              </div>
              <p className="text-2xl font-black text-[var(--text-primary)]">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
