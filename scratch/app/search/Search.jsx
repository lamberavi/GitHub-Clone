import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, BookOpen, Users, CircleDot, GitPullRequest, Star, UserPlus, UserCheck } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { setSearch, setActiveRepo } from '../../lib/redux/slices/repoSlice';

export default function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchQuery, searchFilter, repositories } = useSelector((state) => state.repos);
  
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const [activeTab, setActiveTab] = useState(searchFilter || 'all');
  const [followedUsers, setFollowedUsers] = useState({});

  useEffect(() => {
    setLocalQuery(searchQuery);
    setActiveTab(searchFilter || 'all');
  }, [searchQuery, searchFilter]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    dispatch(setSearch({ query: localQuery, filter: activeTab }));
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    dispatch(setSearch({ query: localQuery, filter: tabId }));
  };

  const handleRepoClick = (repoId) => {
    dispatch(setActiveRepo(repoId));
    navigate(`/repo/${repoId}`);
  };

  const toggleFollowUser = (username) => {
    setFollowedUsers((prev) => ({
      ...prev,
      [username]: !prev[username]
    }));
  };

  // Mock User Data Results
  const mockUsers = [
    { username: 'alex_dev', name: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', bio: 'Frontend architect and React compiler developer.', location: 'London, UK' },
    { username: 'sarah_m', name: 'Sarah Miller', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80', bio: 'Design Systems lead & CSS-in-JS enthusiast.', location: 'San Francisco, CA' },
    { username: 'ravil', name: 'Ravil Kumar', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80', bio: 'OSS Enthusiast. Building antigravity apps 🚀', location: 'Bangalore, India' }
  ];

  // Perform filtering based on searchQuery
  const queryLower = localQuery.toLowerCase();

  const matchedRepos = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(queryLower) ||
      (repo.description && repo.description.toLowerCase().includes(queryLower))
  );

  const matchedUsers = mockUsers.filter(
    (u) =>
      u.username.toLowerCase().includes(queryLower) ||
      u.name.toLowerCase().includes(queryLower) ||
      u.bio.toLowerCase().includes(queryLower)
  );

  // Aggregate all issues/PRs from all repositories for global search
  const allIssues = repositories.flatMap(repo => 
    repo.issues.map(issue => ({ ...issue, repoName: repo.name, repoId: repo.id }))
  );
  const matchedIssues = allIssues.filter(issue => 
    issue.title.toLowerCase().includes(queryLower)
  );

  const allPRs = repositories.flatMap(repo => 
    repo.pullRequests.map(pr => ({ ...pr, repoName: repo.name, repoId: repo.id }))
  );
  const matchedPRs = allPRs.filter(pr => 
    pr.title.toLowerCase().includes(queryLower)
  );

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Search Input */}
      <form onSubmit={handleSearchSubmit} className="space-y-3">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Search</h1>
        <div className="flex gap-2.5">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-github-light-textMuted dark:text-github-dark-textMuted" />
            <input
              type="text"
              placeholder="Search across all repositories, issues, pull requests..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-github-light-bg dark:bg-github-dark-bg border border-github-light-border dark:border-github-dark-border rounded-lg outline-none focus:border-github-light-accent dark:focus:border-github-dark-accent focus:ring-1 focus:ring-github-light-accent/30 dark:focus:ring-github-dark-accent/30"
            />
          </div>
          <Button type="submit">Search</Button>
        </div>
      </form>

      {/* 2. Grid split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left Side Tab Filter Lists */}
        <aside className="lg:col-span-1 glass-panel border border-github-light-border/60 dark:border-github-dark-border/60 rounded-xl overflow-hidden custom-shadow">
          <div className="px-4 py-3 border-b border-github-light-border/60 dark:border-github-dark-border/60 bg-neutral-50 dark:bg-github-dark-sidebar/40 font-bold text-xs uppercase tracking-wider text-github-light-textMuted dark:text-github-dark-textMuted">
            Filter Results
          </div>
          
          <nav className="flex flex-col text-xs font-semibold">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-4 py-3 text-left border-l-2 flex items-center justify-between ${
                activeTab === 'all'
                  ? 'border-github-light-accent dark:border-github-dark-accent bg-github-light-accent/5 dark:bg-github-dark-accent/5 font-bold text-github-light-accent dark:text-github-dark-accent'
                  : 'border-transparent text-github-light-textMuted dark:text-github-dark-textMuted hover:bg-neutral-100 dark:hover:bg-neutral-800/40'
              }`}
            >
              <span>Repositories</span>
              <span className="px-1.5 py-0.2 bg-neutral-200 dark:bg-github-dark-border rounded-full font-bold text-3xs text-github-light-text dark:text-github-dark-text">
                {matchedRepos.length}
              </span>
            </button>

            <button
              onClick={() => handleTabChange('users')}
              className={`px-4 py-3 text-left border-l-2 flex items-center justify-between ${
                activeTab === 'users'
                  ? 'border-github-light-accent dark:border-github-dark-accent bg-github-light-accent/5 dark:bg-github-dark-accent/5 font-bold text-github-light-accent dark:text-github-dark-accent'
                  : 'border-transparent text-github-light-textMuted dark:text-github-dark-textMuted hover:bg-neutral-100 dark:hover:bg-neutral-800/40'
              }`}
            >
              <span>Users</span>
              <span className="px-1.5 py-0.2 bg-neutral-200 dark:bg-github-dark-border rounded-full font-bold text-3xs text-github-light-text dark:text-github-dark-text">
                {matchedUsers.length}
              </span>
            </button>

            <button
              onClick={() => handleTabChange('issues')}
              className={`px-4 py-3 text-left border-l-2 flex items-center justify-between ${
                activeTab === 'issues'
                  ? 'border-github-light-accent dark:border-github-dark-accent bg-github-light-accent/5 dark:bg-github-dark-accent/5 font-bold text-github-light-accent dark:text-github-dark-accent'
                  : 'border-transparent text-github-light-textMuted dark:text-github-dark-textMuted hover:bg-neutral-100 dark:hover:bg-neutral-800/40'
              }`}
            >
              <span>Issues</span>
              <span className="px-1.5 py-0.2 bg-neutral-200 dark:bg-github-dark-border rounded-full font-bold text-3xs text-github-light-text dark:text-github-dark-text">
                {matchedIssues.length}
              </span>
            </button>

            <button
              onClick={() => handleTabChange('prs')}
              className={`px-4 py-3 text-left border-l-2 flex items-center justify-between ${
                activeTab === 'prs'
                  ? 'border-github-light-accent dark:border-github-dark-accent bg-github-light-accent/5 dark:bg-github-dark-accent/5 font-bold text-github-light-accent dark:text-github-dark-accent'
                  : 'border-transparent text-github-light-textMuted dark:text-github-dark-textMuted hover:bg-neutral-100 dark:hover:bg-neutral-800/40'
              }`}
            >
              <span>Pull Requests</span>
              <span className="px-1.5 py-0.2 bg-neutral-200 dark:bg-github-dark-border rounded-full font-bold text-3xs text-github-light-text dark:text-github-dark-text">
                {matchedPRs.length}
              </span>
            </button>
          </nav>
        </aside>

        {/* Right Side Results list panel */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* REPOSITORIES RESULTS (activeTab === 'all') */}
          {activeTab === 'all' && (
            <div className="space-y-3">
              {matchedRepos.length > 0 ? (
                matchedRepos.map((repo) => (
                  <div 
                    key={repo.id}
                    onClick={() => handleRepoClick(repo.id)}
                    className="glass-panel p-4 rounded-xl border border-github-light-border/60 dark:border-github-dark-border/60 hover:border-github-light-accent/40 dark:hover:border-github-dark-accent/40 hover:shadow-glow cursor-pointer transition-all flex flex-col justify-between gap-3 group"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-github-light-accent dark:text-github-dark-accent group-hover:underline flex items-center gap-1.5">
                        <BookOpen size={14} /> {repo.owner}/{repo.name}
                      </h4>
                      {repo.description && (
                        <p className="text-xs text-github-light-textMuted dark:text-github-dark-textMuted mt-1 leading-relaxed">{repo.description}</p>
                      )}
                    </div>
                    <div className="flex gap-4 text-3xs font-bold text-github-light-textMuted dark:text-github-dark-textMuted uppercase pt-1">
                      {repo.languages.length > 0 && <span>{repo.languages[0].name}</span>}
                      <span>★ {repo.stars}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-github-light-textMuted py-8 text-center">No matching repositories found.</p>
              )}
            </div>
          )}

          {/* USERS RESULTS */}
          {activeTab === 'users' && (
            <div className="space-y-3">
              {matchedUsers.length > 0 ? (
                matchedUsers.map((u) => {
                  const isFollowing = followedUsers[u.username];
                  return (
                    <div 
                      key={u.username}
                      className="glass-panel p-4 rounded-xl border border-github-light-border/60 dark:border-github-dark-border/60 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold truncate">{u.name}</h4>
                          <p className="text-xs text-github-light-textMuted dark:text-github-dark-textMuted">@{u.username} · {u.location}</p>
                          <p className="text-[11px] text-github-light-textMuted dark:text-github-dark-textMuted truncate mt-1">{u.bio}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant={isFollowing ? 'outline' : 'primary'}
                        icon={isFollowing ? UserCheck : UserPlus}
                        onClick={() => toggleFollowUser(u.username)}
                        className="shrink-0 h-8 text-xs px-2.5"
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-github-light-textMuted py-8 text-center">No matching developers found.</p>
              )}
            </div>
          )}

          {/* ISSUES RESULTS */}
          {activeTab === 'issues' && (
            <div className="space-y-3">
              {matchedIssues.length > 0 ? (
                matchedIssues.map((issue) => (
                  <div 
                    key={`${issue.repoId}-${issue.id}`}
                    onClick={() => handleRepoClick(issue.repoId)}
                    className="glass-panel p-4 rounded-xl border border-github-light-border/60 dark:border-github-dark-border/60 hover:border-github-light-accent/30 dark:hover:border-github-dark-accent/30 cursor-pointer transition-all flex items-start gap-3.5 group"
                  >
                    <CircleDot size={16} className="text-github-light-success dark:text-github-dark-success shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold group-hover:text-github-light-accent dark:group-hover:text-github-dark-accent">
                        {issue.title} <span className="font-mono text-github-light-textMuted dark:text-github-dark-textMuted">#{issue.id}</span>
                      </h4>
                      <p className="text-[10px] text-github-light-textMuted dark:text-github-dark-textMuted font-semibold mt-1">
                        {issue.repoName} · opened {new Date(issue.date).toLocaleDateString()} by @{issue.author}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-github-light-textMuted py-8 text-center">No matching issues found.</p>
              )}
            </div>
          )}

          {/* PR RESULTS */}
          {activeTab === 'prs' && (
            <div className="space-y-3">
              {matchedPRs.length > 0 ? (
                matchedPRs.map((pr) => (
                  <div 
                    key={`${pr.repoId}-${pr.id}`}
                    onClick={() => handleRepoClick(pr.repoId)}
                    className="glass-panel p-4 rounded-xl border border-github-light-border/60 dark:border-github-dark-border/60 hover:border-github-light-accent/30 dark:hover:border-github-dark-accent/30 cursor-pointer transition-all flex items-start gap-3.5 group"
                  >
                    <GitPullRequest size={16} className="text-github-light-success dark:text-github-dark-success shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold group-hover:text-github-light-accent dark:group-hover:text-github-dark-accent">
                        {pr.title} <span className="font-mono text-github-light-textMuted dark:text-github-dark-textMuted">#{pr.number}</span>
                      </h4>
                      <p className="text-[10px] text-github-light-textMuted dark:text-github-dark-textMuted font-semibold mt-1">
                        {pr.repoName} · opened {new Date(pr.date).toLocaleDateString()} by @{pr.author}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-github-light-textMuted py-8 text-center">No matching pull requests found.</p>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
