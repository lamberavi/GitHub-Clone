import React from 'react';
import { 
  GitCommit, FolderPlus, Trash2, Star, Edit, GitBranch, 
  GitPullRequest, AlertCircle, EyeOff, User, RefreshCw, FileText, Image, Loader2 
} from 'lucide-react';

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
      case 'repo_created':
        return <FolderPlus size={14} className="text-[#3FB950]" />;
      case 'repo_deleted':
        return <Trash2 size={14} className="text-[#F85149]" />;
      case 'commit_created':
        return <GitCommit size={14} className="text-[#3FB950]" />;
      case 'branch_created':
        return <GitBranch size={14} className="text-[var(--accent-primary)]" />;
      case 'pr_created':
        return <GitPullRequest size={14} className="text-[var(--accent-primary)]" />;
      case 'pr_merged':
        return <GitPullRequest size={14} className="text-[#A371F7]" />;
      case 'issue_created':
        return <AlertCircle size={14} className="text-[#F85149]" />;
      case 'issue_closed':
        return <AlertCircle size={14} className="text-[#3FB950]" />;
      case 'fork_created':
        return <GitBranch size={14} className="text-[#58A6FF]" />;
      case 'star_given':
        return <Star size={14} className="text-amber-500" />;
      case 'star_removed':
        return <Star size={14} className="text-[var(--text-muted)]" />;
      case 'profile_updated':
        return <User size={14} className="text-[#58A6FF]" />;
      case 'readme_edited':
        return <FileText size={14} className="text-[#3FB950]" />;
      case 'avatar_changed':
        return <Image size={14} className="text-[#A371F7]" />;
      case 'repo_renamed':
        return <RefreshCw size={14} className="text-amber-500" />;
      case 'repo_updated':
        return <Edit size={14} className="text-[#58A6FF]" />;
      default:
        return <Edit size={14} className="text-[#A371F7]" />;
    }
  };

  const getActivityTitle = (act) => {
    switch (act.activityType) {
      case 'repo_created':
        return `Created repository ${act.repository}`;
      case 'repo_deleted':
        return `Deleted repository ${act.repository}`;
      case 'commit_created':
        return `Pushed commit to ${act.repository}`;
      case 'branch_created':
        return `Created branch in ${act.repository}`;
      case 'pr_created':
        return `Opened pull request in ${act.repository}`;
      case 'pr_merged':
        return `Merged pull request in ${act.repository}`;
      case 'issue_created':
        return `Opened issue in ${act.repository}`;
      case 'issue_closed':
        return `Closed issue in ${act.repository}`;
      case 'fork_created':
        return `Forked repository ${act.repository}`;
      case 'star_given':
        return `Starred ${act.repository}`;
      case 'star_removed':
        return `Unstarred ${act.repository}`;
      case 'profile_updated':
        return `Updated user profile settings`;
      case 'readme_edited':
        return `Updated README.md in ${act.repository}`;
      case 'avatar_changed':
        return `Changed profile avatar photo`;
      case 'repo_renamed':
        return `Renamed repository ${act.repository}`;
      case 'repo_updated':
        return `Updated repository settings for ${act.repository}`;
      default:
        return act.details || `Performed action: ${act.activityType}`;
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
                  {getActivityTitle(act)}
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
