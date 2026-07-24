import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../lib/redux/slices/authSlice';
import { setRepositories } from '../../lib/redux/slices/repoSlice';
import api from '../../lib/api/axios';
import ProfileHeader from './ProfileHeader';
import ProfileSidebar from './ProfileSidebar';
import RepositorySection from './RepositorySection';
import ContributionGraph from './ContributionGraph';
import ActivitySection from './ActivitySection';
import StatsSection from './StatsSection';
import { Star, ArrowUpRight, Loader2, AlertTriangle } from 'lucide-react';
import Button from '../../components/common/Button';
import './Profile.css';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Shared global Redux states
  const { user } = useSelector((state) => state.auth);
  const { repositories } = useSelector((state) => state.repos);
  
  const [activeTab, setActiveTab] = useState('overview'); // overview, repositories, stats, activity

  // Individual loading/error states for parallel execution
  const [userDetails, setUserDetails] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);

  const [loadingRepos, setLoadingRepos] = useState(true);
  const [errorRepos, setErrorRepos] = useState(null);

  const [stats, setStats] = useState({ repositories: 0, commits: 0, stars: 0, languages: 0 });
  const [loadingStats, setLoadingStats] = useState(true);
  const [errorStats, setErrorStats] = useState(null);

  const [contributions, setContributions] = useState([]);
  const [loadingContribs, setLoadingContribs] = useState(true);
  const [errorContribs, setErrorContribs] = useState(null);

  const [activities, setActivities] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [errorActivity, setErrorActivity] = useState(null);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const loadData = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const usernameStr = user.username || 'ravil';

    // 1. Fetch User details
    setLoadingUser(true);
    setErrorUser(null);
    api.get(`/api/profile/${usernameStr}`)
      .then((res) => {
        setUserDetails(res.data.user);
      })
      .catch((err) => {
        setErrorUser(err.response?.data?.message || err.message || 'Failed to load user info.');
        setUserDetails(user); // fallback to Redux details
      })
      .finally(() => setLoadingUser(false));

    // 2. Fetch Repositories
    setLoadingRepos(true);
    setErrorRepos(null);
    api.get(`/api/profile/${usernameStr}/repos`)
      .then((res) => {
        dispatch(setRepositories(res.data.repositories));
      })
      .catch((err) => {
        setErrorRepos(err.response?.data?.message || err.message || 'Failed to load repos.');
      })
      .finally(() => setLoadingRepos(false));

    // 3. Fetch Stats
    setLoadingStats(true);
    setErrorStats(null);
    api.get(`/api/profile/${usernameStr}/stats`)
      .then((res) => {
        setStats(res.data.stats);
      })
      .catch((err) => {
        setErrorStats(err.response?.data?.message || err.message || 'Failed to load statistics.');
      })
      .finally(() => setLoadingStats(false));

    // 4. Fetch Contributions
    setLoadingContribs(true);
    setErrorContribs(null);
    api.get(`/api/profile/${usernameStr}/contributions`)
      .then((res) => {
        setContributions(res.data.contributions);
      })
      .catch((err) => {
        setErrorContribs(err.response?.data?.message || err.message || 'Failed to load contributions.');
      })
      .finally(() => setLoadingContribs(false));

    // 5. Fetch Activities
    setLoadingActivity(true);
    setErrorActivity(null);
    api.get(`/api/profile/${usernameStr}/activity`)
      .then((res) => {
        setActivities(res.data.activities);
      })
      .catch((err) => {
        setErrorActivity(err.response?.data?.message || err.message || 'Failed to load activity logs.');
      })
      .finally(() => setLoadingActivity(false));
  };

  useEffect(() => {
    loadData();
  }, [user, navigate, refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleUpdateUser = (updatedUser) => {
    dispatch(updateProfile(updatedUser));
    handleRefresh();
  };

  const pinnedRepos = repositories.filter((r) => r.isPinned);
  const displayedPinned = pinnedRepos.length > 0 ? pinnedRepos : repositories.slice(0, 4);

  const renderSectionHeader = (title, isLoading, isError, onRetry) => (
    <div className="flex items-center justify-between gap-2 border-b border-[var(--border-primary)] pb-2 mb-3">
      <span className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)]">{title}</span>
      {isLoading && <Loader2 size={12} className="text-[var(--accent-primary)] animate-spin" />}
      {isError && (
        <button 
          onClick={onRetry}
          className="text-2xs font-bold text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
          title={isError}
        >
          <AlertTriangle size={11} /> Retry
        </button>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'repositories':
        return (
          <div className="space-y-4">
            {errorRepos && (
              <div className="p-4 border border-red-500/20 bg-red-500/10 rounded-xl text-center space-y-2">
                <p className="text-xs text-red-500 font-bold">{errorRepos}</p>
                <Button onClick={loadData} size="xs" variant="secondary">Retry repos fetch</Button>
              </div>
            )}
            
            {loadingRepos ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2].map((n) => (
                  <div key={n} className="p-4 border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl space-y-3">
                    <div className="h-4 w-40 bg-[var(--border-primary)] rounded" />
                    <div className="h-3 w-5/6 bg-[var(--border-primary)] rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <RepositorySection 
                repositories={repositories} 
                onRefresh={handleRefresh} 
              />
            )}
          </div>
        );

      case 'stats':
        return (
          <div className="space-y-4">
            {errorStats && (
              <div className="p-4 border border-red-500/20 bg-red-500/10 rounded-xl text-center space-y-2">
                <p className="text-xs text-red-500 font-bold">{errorStats}</p>
                <Button onClick={loadData} size="xs" variant="secondary">Retry stats fetch</Button>
              </div>
            )}

            {loadingStats ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-24 border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl" />
                ))}
              </div>
            ) : (
              <StatsSection 
                repositories={repositories} 
                contributions={contributions} 
                user={userDetails || user} 
              />
            )}
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-4">
            {errorActivity && (
              <div className="p-4 border border-red-500/20 bg-red-500/10 rounded-xl text-center space-y-2">
                <p className="text-xs text-red-500 font-bold">{errorActivity}</p>
                <Button onClick={loadData} size="xs" variant="secondary">Retry activity fetch</Button>
              </div>
            )}

            <ActivitySection 
              activities={activities} 
              loading={loadingActivity} 
            />
          </div>
        );

      case 'overview':
      default:
        return (
          <div className="space-y-6">
            {/* Pinned Repos overview Section */}
            <div className="space-y-3">
              {renderSectionHeader('Pinned Repositories', loadingRepos, errorRepos, loadData)}

              {loadingRepos ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
                  <div className="h-28 border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl" />
                  <div className="h-28 border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl" />
                </div>
              ) : displayedPinned.length === 0 ? (
                <div className="text-center py-6 border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl">
                  <p className="text-xs text-[var(--text-muted)]">No repositories to show in overview.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayedPinned.map((repo) => (
                    <div 
                      key={repo.repoId || repo.id}
                      onClick={() => navigate(`/repo/${repo.repoId || repo.id}`)}
                      className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--surface-card)] hover:border-[var(--accent-primary)] shadow-sm cursor-pointer transition-all flex flex-col justify-between min-h-[130px] group"
                    >
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-sm font-bold text-[var(--accent-primary)] hover:underline truncate">
                            {repo.name || repo.repoName}
                          </h4>
                          <ArrowUpRight size={13} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2 leading-relaxed font-semibold">
                          {repo.description || 'No description provided.'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] font-bold mt-4">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#f1e05a]" />
                            {repo.language || 'JavaScript'}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Star size={11} /> {repo.stars || 0}
                          </span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded border border-[var(--border-primary)] bg-[var(--surface-secondary)] text-2xs uppercase tracking-wide">
                          {repo.visibility || (repo.isPrivate ? 'private' : 'public')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contributions graph section */}
            <div className="space-y-3">
              {renderSectionHeader('Contribution Calendar', loadingContribs, errorContribs, loadData)}
              {loadingContribs ? (
                <div className="h-32 border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl animate-pulse" />
              ) : (
                <ContributionGraph contributions={contributions || []} />
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start select-none max-w-7xl mx-auto p-4 sm:p-6 text-[var(--text-primary)]">
      
      {/* Left Column Sidebar details */}
      <div className="lg:col-span-1">
        {loadingUser ? (
          <div className="space-y-5 animate-pulse">
            <div className="w-28 h-28 rounded-full bg-[var(--border-primary)]" />
            <div className="h-5 w-40 bg-[var(--border-primary)] rounded" />
            <div className="h-4 w-24 bg-[var(--border-primary)] rounded" />
            <div className="h-10 w-full bg-[var(--border-primary)] rounded" />
          </div>
        ) : (
          <ProfileSidebar 
            user={userDetails || user} 
            onUpdateUser={handleUpdateUser} 
          />
        )}
      </div>

      {/* Right Column Tab Content panel */}
      <div className="lg:col-span-3 space-y-6">
        <ProfileHeader 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          repoCount={repositories.length} 
        />

        {renderTabContent()}
      </div>
    </div>
  );
}
export { Profile };
