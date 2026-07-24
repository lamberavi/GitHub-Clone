import React from 'react';
import { BookOpen, FolderGit2, LayoutGrid, Package, Star, Activity, BarChart2 } from 'lucide-react';
import Badge from '../../components/common/Badge';

export default function ProfileHeader({ activeTab, setActiveTab, repoCount = 0 }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'repositories', label: 'Repositories', icon: FolderGit2, count: repoCount },
    { id: 'projects', label: 'Projects', icon: LayoutGrid, count: 0 },
    { id: 'packages', label: 'Packages', icon: Package, count: 0 },
    { id: 'stars', label: 'Stars', icon: Star, count: 12 },
    { id: 'stats', label: 'Stats', icon: BarChart2 },
    { id: 'activity', label: 'Activity', icon: Activity }
  ];

  return (
    <div className="border-b border-[var(--border-primary)] select-none">
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-lg transition-colors relative whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[var(--accent-glow)] text-[var(--accent-primary)] font-bold border-b-2 border-[var(--accent-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
              }`}
            >
              <Icon size={15} className={isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <Badge
                  variant="neutral"
                  size="sm"
                  className={`ml-0.5 font-bold text-3xs ${
                    isActive ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--surface-secondary)] text-[var(--text-muted)] border border-[var(--border-primary)]'
                  }`}
                >
                  {tab.count}
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
