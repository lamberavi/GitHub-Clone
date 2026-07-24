import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Star, GitFork, Eye, Plus, BookOpen, 
  CircleDot, GitPullRequest, Code, Settings, History, GitBranch
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';

// Custom subcomponents
import FileExplorer from '../../components/repository/FileExplorer';
import MonacoEditor from '../../components/editor/MonacoEditor';
import IssueList from '../../components/issue/IssueList';
import PRList from '../../components/pullrequest/PRList';

// Redux Actions
import { 
  setActiveRepo, setActiveBranch, addBranch, setSelectedFile 
} from '../../lib/redux/slices/repoSlice';

export default function RepoDetails() {
  const { repoId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { repositories, activeBranch, selectedFile } = useSelector((state) => state.repos);
  
  const [activeTab, setActiveTab] = useState('code'); // code, issues, pulls, commits, branches, settings
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [newBranchName, setNewBranchName] = useState('');
  
  const [isStarred, setIsStarred] = useState(false);
  const [starCount, setStarCount] = useState(0);

  // Find active repo
  const repo = repositories.find((r) => (r.id === repoId || r.repoId === repoId || r.name === repoId || r.repoName === repoId)) || repositories[0];

  useEffect(() => {
    if (repoId) {
      dispatch(setActiveRepo(repoId));
    }
  }, [repoId, dispatch]);

  useEffect(() => {
    if (repo) {
      setStarCount(repo.stars);
    }
  }, [repo]);

  if (!repo) {
    return (
      <div className="text-center py-16 text-[var(--text-primary)]">
        <p className="text-sm text-[var(--text-muted)]">Repository not found.</p>
        <Button onClick={() => navigate('/dashboard')} className="mt-4">Back to Dashboard</Button>
      </div>
    );
  }

  const handleStarToggle = () => {
    if (isStarred) {
      setStarCount(starCount - 1);
      setIsStarred(false);
    } else {
      setStarCount(starCount + 1);
      setIsStarred(true);
    }
  };

  const handleCreateBranch = (e) => {
    e.preventDefault();
    if (!newBranchName.trim()) return;

    dispatch(addBranch(newBranchName));
    setNewBranchName('');
    setIsBranchModalOpen(false);
  };

  const tabs = [
    { id: 'code', label: 'Code', icon: Code },
    { id: 'issues', label: 'Issues', icon: CircleDot, badge: repo.issues.length },
    { id: 'pulls', label: 'Pull Requests', icon: GitPullRequest, badge: repo.pullRequests.length },
    { id: 'commits', label: 'Commits', icon: History, badge: repo.commits.length },
    { id: 'branches', label: 'Branches', icon: GitBranch, badge: repo.branches.length },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="space-y-6 text-[var(--text-primary)] select-none max-w-7xl mx-auto p-4 sm:p-6">
      
      {/* 1. Repository Info Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border-primary)] pb-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <BookOpen className="text-[var(--text-muted)] w-5 h-5 shrink-0" />
            <h1 className="text-xl font-bold flex items-center gap-1.5 truncate">
              <span className="text-[var(--accent-primary)] hover:underline cursor-pointer">{repo.owner}</span>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="truncate">{repo.name}</span>
            </h1>
            <Badge variant={repo.isPrivate ? 'neutral' : 'info'} size="sm">
              {repo.isPrivate ? 'Private' : 'Public'}
            </Badge>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed max-w-2xl font-semibold">
            {repo.description}
          </p>
        </div>

        {/* Action Widgets */}
        <div className="flex flex-wrap gap-2 shrink-0">
          <Button 
            size="sm" 
            variant={isStarred ? 'primary' : 'secondary'} 
            icon={Star}
            onClick={handleStarToggle}
            className="h-8"
          >
            {isStarred ? 'Starred' : 'Star'} <span className="ml-1 px-1.5 py-0.5 bg-[var(--surface-canvas)] border border-[var(--border-primary)] rounded-full text-3xs font-bold">{starCount}</span>
          </Button>
          <Button size="sm" variant="secondary" icon={GitFork} className="h-8">
            Fork <span className="ml-1 px-1.5 py-0.5 bg-[var(--surface-canvas)] border border-[var(--border-primary)] rounded-full text-3xs font-bold">{repo.forks}</span>
          </Button>
          <Button size="sm" variant="secondary" icon={Eye} className="h-8">
            Watch
          </Button>
        </div>
      </div>

      {/* 2. Top-level Navigation Tabs */}
      <div className="flex border-b border-[var(--border-primary)] overflow-x-auto scrollbar-none gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); dispatch(setSelectedFile(null)); }}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 -mb-[2px] whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-[var(--accent-primary)] text-[var(--accent-primary)] font-bold'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="px-1.5 py-0.5 bg-[var(--surface-secondary)] border border-[var(--border-primary)] text-[var(--text-muted)] rounded-full text-3xs font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Tab contents router */}
      <div className="pt-2">
        
        {/* CODE TAB */}
        {activeTab === 'code' && (
          <div className="space-y-4">
            {!selectedFile ? (
              <div className="space-y-4">
                {/* Branch controls select bar */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <select
                      value={activeBranch}
                      onChange={(e) => dispatch(setActiveBranch(e.target.value))}
                      className="px-3 py-1.5 text-xs font-bold bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-lg cursor-pointer outline-none focus:border-[var(--accent-primary)]"
                    >
                      {repo.branches.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      icon={Plus} 
                      onClick={() => setIsBranchModalOpen(true)}
                      className="h-8 px-2"
                    >
                      New Branch
                    </Button>
                  </div>

                  <div className="text-2xs font-bold text-[var(--text-muted)] flex gap-3">
                    <span><span className="text-[var(--text-primary)]">{repo.branches.length}</span> branches</span>
                    <span><span className="text-[var(--text-primary)]">{repo.commits.length}</span> commits</span>
                  </div>
                </div>

                {/* File Explorer listing */}
                <FileExplorer filesNode={repo.files} commits={repo.commits} />
              </div>
            ) : (
              /* Monaco Code view */
              <MonacoEditor file={selectedFile} repoId={repo.id} />
            )}
          </div>
        )}

        {/* ISSUES TAB */}
        {activeTab === 'issues' && (
          <IssueList issues={repo.issues} repoId={repo.id} />
        )}

        {/* PULL REQUESTS TAB */}
        {activeTab === 'pulls' && (
          <PRList prs={repo.pullRequests} branches={repo.branches} repoId={repo.id} />
        )}

        {/* COMMITS HISTORY TAB */}
        {activeTab === 'commits' && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-[var(--text-muted)]">Commits on {activeBranch}</h3>
            
            <div className="relative border-l border-[var(--border-primary)] pl-6 ml-3 space-y-6">
              {repo.commits.length > 0 ? (
                repo.commits.map((commit) => (
                  <div key={commit.id} className="relative group">
                    {/* Circle Node Icon */}
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-[var(--border-primary)] bg-[var(--surface-card)] group-hover:border-[var(--accent-primary)] transition-colors" />
                    
                    <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--surface-card)] hover:border-[var(--accent-primary)] transition-all flex justify-between gap-4 items-center shadow-sm">
                      <div className="min-w-0 flex-1 space-y-1">
                        <p className="text-sm font-bold truncate hover:text-[var(--accent-primary)] cursor-pointer text-[var(--text-primary)]">
                          {commit.message}
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)] font-semibold">
                          by @{commit.author} committed {new Date(commit.date).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3 font-mono shrink-0">
                        <span className="text-[10px] text-[#3FB950] font-bold">
                          {commit.changes}
                        </span>
                        <Badge variant="neutral" size="sm">
                          {commit.id}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[var(--text-muted)] py-4">No commits recorded on this branch.</p>
              )}
            </div>
          </div>
        )}

        {/* BRANCHES LIST TAB */}
        {activeTab === 'branches' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h3 className="font-bold text-sm text-[var(--text-muted)]">Branch List</h3>
              <Button icon={Plus} size="sm" onClick={() => setIsBranchModalOpen(true)}>
                New Branch
              </Button>
            </div>

            <div className="border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl overflow-hidden divide-y divide-[var(--border-primary)] shadow-sm">
              {repo.branches.map((br) => (
                <div key={br} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <GitBranch size={16} className="text-[var(--text-muted)]" />
                    <span className="text-sm font-bold text-[var(--text-primary)]">{br}</span>
                    {br === 'main' && <Badge variant="info" size="sm">Default</Badge>}
                    {br === activeBranch && <Badge variant="success" size="sm">Active</Badge>}
                  </div>
                  
                  {br !== 'main' && (
                    <button 
                      onClick={() => dispatch(setActiveBranch('main'))}
                      className="text-xs text-[var(--accent-primary)] hover:underline font-bold"
                    >
                      Reset to Default
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REPOSITORY SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="p-6 rounded-xl border border-[var(--border-primary)] bg-[var(--surface-card)] shadow-sm space-y-6 max-w-xl text-[var(--text-primary)]">
            <h3 className="font-bold text-base">Repository Settings</h3>
            
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <Input
                label="Rename Repository"
                name="renameRepo"
                placeholder={repo.name}
                disabled
              />
              <p className="text-2xs text-[var(--text-muted)]">
                Renaming features are locked in demo modes to preserve references.
              </p>
            </form>

            <div className="border-t border-[var(--border-primary)] pt-6 space-y-4">
              <h4 className="text-sm font-bold text-[#F85149]">Danger Zone</h4>
              <div className="p-4 border border-[#F85149]/30 rounded-xl bg-[#F85149]/10 space-y-3">
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <h5 className="text-xs font-bold text-[var(--text-primary)]">Delete this repository</h5>
                    <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
                      Once deleted, in-memory states will disappear.
                    </p>
                  </div>
                  <Button variant="danger" size="sm" isDisabled>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 4. Branch Creator Modal */}
      <Modal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        title="Create a new branch"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsBranchModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateBranch} isDisabled={!newBranchName.trim()}>
              Create branch
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateBranch} className="space-y-4">
          <Input
            label="Branch Name"
            name="newBranchName"
            placeholder="e.g. feature/visual-diff"
            value={newBranchName}
            onChange={(e) => setNewBranchName(e.target.value)}
            required
            autoFocus
          />
          <p className="text-2xs text-[var(--text-muted)] leading-normal">
            The branch will spin off from the current head of <code className="px-1.5 py-0.5 rounded bg-[var(--surface-secondary)] border border-[var(--border-primary)]">{activeBranch}</code>.
          </p>
        </form>
      </Modal>

    </div>
  );
}
