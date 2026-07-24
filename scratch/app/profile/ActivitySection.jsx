import React from 'react';
import { GitCommit, FolderPlus, Star, Edit, Loader2 } from 'lucide-react';

export default function ActivitySection({ activities = [], loading = false }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-[var(--text-muted)]">
        <Loader2 className="w-6 h-6 animate-spin text-[var(--accent-primary)]" />
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-10 border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl">
        <p className="text-xs font-semibold text-[var(--text-muted)]">No recent activity logs recorded.</p>
      </div>
    );
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'commit':
        return <GitCommit size={14} className="text-[#3FB950]" />;
      case 'repo_created':
        return <FolderPlus size={14} className="text-[var(--accent-primary)]" />;
      case 'starred':
        return <Star size={14} className="text-amber-500" />;
      case 'profile_update':
      default:
        return <Edit size={14} className="text-[#A371F7]" />;
    }
  };

  return (
    <div className="space-y-4 select-none text-[var(--text-primary)]">
      <h3 className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)]">Contribution Activity</h3>
      
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--border-primary)]">
        {activities.map((act, idx) => (
          <div key={idx} className="relative flex items-start gap-3 group">
            <div className="absolute -left-6 top-0.5 p-1 bg-[var(--surface-canvas)] border border-[var(--border-primary)] rounded-full z-10">
              {getActivityIcon(act.activityType)}
            </div>
            
            <div className="p-3.5 rounded-xl border border-[var(--border-primary)] bg-[var(--surface-card)] hover:border-[var(--accent-primary)] transition-colors w-full space-y-1 shadow-sm">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[var(--text-primary)]">
                  {act.activityType === 'repo_created' && `Created repository ${act.repository}`}
                  {act.activityType === 'commit' && `Committed to ${act.repository}`}
                  {act.activityType === 'starred' && `Starred ${act.repository}`}
                  {act.activityType === 'profile_update' && `Updated profile settings`}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-semibold">
                  {new Date(act.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] font-semibold">{act.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
