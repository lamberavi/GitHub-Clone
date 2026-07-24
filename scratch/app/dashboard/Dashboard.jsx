import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  GitBranch, GitPullRequest, CircleDot, Plus, 
  Terminal, History, Heart, Star, Sparkles, BookOpen, 
  Search, ExternalLink, Activity
} from 'lucide-react';
import DashboardLayout from '../../lib/layouts/DashboardLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import { addRepository, setActiveRepo } from '../../lib/redux/slices/repoSlice';
import { mockTrending } from '../../services/mockData';
import api from '../../lib/api/axios';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { repositories } = useSelector((state) => state.repos);

  const [isRepoModalOpen, setIsRepoModalOpen] = useState(false);
  const [newRepoData, setNewRepoData] = useState({ name: '', description: '', isPrivate: false });
  const [repoSearch, setRepoSearch] = useState('');
  const [activeFeedTab, setActiveFeedTab] = useState('activity'); // activity, trending
  const [isSaving, setIsSaving] = useState(false);

  const handleRepoClick = (repoId) => {
    const targetId = repoId;
    dispatch(setActiveRepo(targetId));
    navigate(`/repo/${targetId}`);
  };

  const handleCreateRepoSubmit = async (e) => {
    e.preventDefault();
    if (!newRepoData.name.trim()) {
      toast.error('Repository name is required.');
      return;
    }

    setIsSaving(true);
    try {
      const res = await api.post('/api/profile/repos/create', {
        repoName: newRepoData.name,
        description: newRepoData.description,
        visibility: newRepoData.isPrivate ? 'private' : 'public'
      });

      dispatch(addRepository(res.data.repository));
      toast.success('Repository created!');
      setNewRepoData({ name: '', description: '', isPrivate: false });
      setIsRepoModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to create repo.');
      // Local Redux fallback
      dispatch(addRepository({
        repoId: `${user?.username || 'user'}-${newRepoData.name.toLowerCase()}`,
        repoName: newRepoData.name,
        description: newRepoData.description,
        visibility: newRepoData.isPrivate ? 'private' : 'public',
        ownerId: user?.uid || 'user',
        stars: 0,
        forks: 0
      }));
      setIsRepoModalOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredRepos = repositories.filter(repo => 
    (repo.name || repo.repoName || '').toLowerCase().includes(repoSearch.toLowerCase())
  );

  const mockActivities = [
    { type: 'push', repo: 'github-clone-react', desc: 'pushed 2 commits to main', time: '10m ago', icon: History, color: 'text-[var(--accent-primary)] bg-[var(--accent-glow)]' },
    { type: 'issue', repo: 'github-clone-react', desc: 'opened issue: Tailwind theme variables update', time: '2h ago', icon: CircleDot, color: 'text-[#3FB950] bg-[#3FB950]/10' },
    { type: 'pr', repo: 'react-framer-boilerplate', desc: 'merged pull request #12: Update dependencies', time: '1d ago', icon: GitPullRequest, color: 'text-[#A371F7] bg-[#A371F7]/10' },
    { type: 'star', repo: 'tailwind-glassmorphism', desc: 'starred by alex_dev and 3 others', time: '2d ago', icon: Star, color: 'text-[#D29922] bg-[#D29922]/10' }
  ];

  // Right sidebar widget content
  const sidebarContent = (
    <div className="space-y-6">
      
      {/* 1. Repositories Widget */}
      <div className="glass-panel p-5 rounded-xl border border-[var(--border-primary)] bg-[var(--surface-card)] text-[var(--text-primary)] shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-4">
          <h3 className="font-bold text-sm tracking-tight text-[var(--text-primary)]">Your Repositories</h3>
          <Button 
            size="sm" 
            icon={Plus} 
            onClick={() => setIsRepoModalOpen(true)}
            className="h-8 px-2"
          >
            New
          </Button>
        </div>

        {/* Repository list search */}
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Find a repository..."
            value={repoSearch}
            onChange={(e) => setRepoSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1 text-xs bg-[var(--surface-canvas)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-lg outline-none focus:border-[var(--accent-primary)]"
          />
        </div>

        <ul className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {filteredRepos.length > 0 ? (
            filteredRepos.map((repo) => (
              <li key={repo.id || repo.repoId}>
                <button
                  onClick={() => handleRepoClick(repo.id || repo.repoId)}
                  className="w-full text-left p-2 rounded-lg hover:bg-[var(--surface-hover)] border border-transparent flex items-center justify-between group transition-all cursor-pointer"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
                      {user?.username || 'ravil'}/{repo.name || repo.repoName}
                    </p>
                  </div>
                  <Badge 
                    variant={repo.isPrivate || repo.visibility === 'private' ? 'neutral' : 'success'} 
                    size="sm"
                    className="ml-2 font-bold text-3xs"
                  >
                    {repo.isPrivate || repo.visibility === 'private' ? 'Private' : 'Public'}
                  </Badge>
                </button>
              </li>
            ))
          ) : (
            <li className="text-xs text-[var(--text-muted)] py-2 text-center">No repositories found.</li>
          )}
        </ul>
      </div>

      {/* 2. Announcements & Changelog */}
      <div className="glass-panel p-5 rounded-xl border border-[var(--border-primary)] bg-[var(--surface-card)] text-[var(--text-primary)] shadow-sm space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Latest Changelog</h4>
        <div className="text-xs space-y-2">
          <p className="font-bold text-[var(--text-primary)]">Vite 6 & React 19 Design Token Support</p>
          <p className="text-2xs text-[var(--text-muted)]">Updated performance metrics and parallel theme endpoints.</p>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout rightSidebar={sidebarContent}>
      <div className="space-y-6">
        
        {/* Welcome Prompt Banner */}
        <div className="glass-panel p-6 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-card)] shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--accent-glow)] border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>GitHub Copilot Engine Ready</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[var(--text-primary)]">
                Welcome back, {user?.firstName || 'Developer'}! 👋
              </h2>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Query code repositories, automate pull requests, trigger builds, and visualize your daily commit calendar.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Action Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button 
            onClick={() => navigate('/repositories')}
            className="p-4 bg-[var(--surface-card)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)] rounded-xl text-left transition-all cursor-pointer group shadow-sm"
          >
            <BookOpen size={18} className="text-[var(--accent-primary)] mb-2" />
            <p className="text-xs font-bold text-[var(--text-primary)] group-hover:underline">All Repositories</p>
            <p className="text-3xs text-[var(--text-muted)]">View all codebases</p>
          </button>

          <button 
            onClick={() => navigate('/profile')}
            className="p-4 bg-[var(--surface-card)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)] rounded-xl text-left transition-all cursor-pointer group shadow-sm"
          >
            <Activity size={18} className="text-[#3FB950] mb-2" />
            <p className="text-xs font-bold text-[var(--text-primary)] group-hover:underline">Your Profile</p>
            <p className="text-3xs text-[var(--text-muted)]">View stats & graph</p>
          </button>

          <button 
            onClick={() => setIsRepoModalOpen(true)}
            className="p-4 bg-[var(--surface-card)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)] rounded-xl text-left transition-all cursor-pointer group shadow-sm"
          >
            <Plus size={18} className="text-[#A371F7] mb-2" />
            <p className="text-xs font-bold text-[var(--text-primary)] group-hover:underline">New Repository</p>
            <p className="text-3xs text-[var(--text-muted)]">Create a new repo</p>
          </button>

          <button 
            onClick={() => navigate('/notifications')}
            className="p-4 bg-[var(--surface-card)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)] rounded-xl text-left transition-all cursor-pointer group shadow-sm"
          >
            <CircleDot size={18} className="text-[#D29922] mb-2" />
            <p className="text-xs font-bold text-[var(--text-primary)] group-hover:underline">Notifications</p>
            <p className="text-3xs text-[var(--text-muted)]">Check workspace activity</p>
          </button>
        </div>

        {/* Feed Tab System */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-primary)] pb-3">
            <div className="flex items-center gap-4 text-xs font-bold">
              <button
                onClick={() => setActiveFeedTab('activity')}
                className={`cursor-pointer transition-colors pb-1 ${
                  activeFeedTab === 'activity' ? 'text-[var(--text-primary)] border-b-2 border-[var(--accent-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                Recent Activity
              </button>
              <button
                onClick={() => setActiveFeedTab('trending')}
                className={`cursor-pointer transition-colors pb-1 ${
                  activeFeedTab === 'trending' ? 'text-[var(--text-primary)] border-b-2 border-[var(--accent-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                Trending Repositories
              </button>
            </div>
          </div>

          {activeFeedTab === 'activity' ? (
            <div className="space-y-3">
              {mockActivities.map((act, idx) => {
                const Icon = act.icon;
                return (
                  <div key={idx} className="p-4 bg-[var(--surface-card)] border border-[var(--border-primary)] rounded-xl flex items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${act.color}`}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[var(--text-primary)]">{act.repo}</p>
                        <p className="text-2xs text-[var(--text-muted)]">{act.desc}</p>
                      </div>
                    </div>
                    <span className="text-3xs text-[var(--text-muted)] font-semibold">{act.time}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockTrending.map((item, idx) => (
                <div key={idx} className="p-4 bg-[var(--surface-card)] border border-[var(--border-primary)] rounded-xl space-y-2 shadow-sm">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-[var(--accent-primary)] hover:underline cursor-pointer">{item.owner}/{item.name}</h4>
                    <span className="text-3xs font-bold text-[#D29922] flex items-center gap-0.5"><Star size={10} /> {item.stars}</span>
                  </div>
                  <p className="text-2xs text-[var(--text-muted)] line-clamp-2">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Creation Modal */}
      {isRepoModalOpen && (
        <Modal
          isOpen={isRepoModalOpen}
          onClose={() => setIsRepoModalOpen(false)}
          title="Create a new repository"
        >
          <form onSubmit={handleCreateRepoSubmit} className="space-y-4">
            <Input
              label="Repository Name"
              placeholder="e.g. my-awesome-app"
              value={newRepoData.name}
              onChange={(e) => setNewRepoData({ ...newRepoData, name: e.target.value })}
              required
              disabled={isSaving}
            />

            <Input
              label="Description (optional)"
              placeholder="Short summary..."
              value={newRepoData.description}
              onChange={(e) => setNewRepoData({ ...newRepoData, description: e.target.value })}
              disabled={isSaving}
            />

            <div className="space-y-2 pt-1">
              <label className="block text-2xs font-black text-[var(--text-muted)] uppercase tracking-wide">
                Visibility
              </label>
              <div className="flex gap-4 text-xs font-bold text-[var(--text-primary)]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    checked={!newRepoData.isPrivate}
                    onChange={() => setNewRepoData({ ...newRepoData, isPrivate: false })}
                    disabled={isSaving}
                  />
                  <span>Public</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    checked={newRepoData.isPrivate}
                    onChange={() => setNewRepoData({ ...newRepoData, isPrivate: true })}
                    disabled={isSaving}
                  />
                  <span>Private</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-[var(--border-primary)]">
              <Button variant="secondary" size="sm" onClick={() => setIsRepoModalOpen(false)} disabled={isSaving}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" isLoading={isSaving}>
                Create Repository
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </DashboardLayout>
  );
}
