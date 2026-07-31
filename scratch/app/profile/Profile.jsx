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
import { Star, ArrowUpRight, Loader2, AlertTriangle, LayoutGrid, Plus, Check, Package } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import toast from 'react-hot-toast';
import './Profile.css';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Shared global Redux states
  const { user } = useSelector((state) => state.auth);
  const { repositories } = useSelector((state) => state.repos);
  
  const [activeTab, setActiveTab] = useState('overview'); // overview, repositories, projects, packages, stars
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Individual loading/error states for parallel execution
  const [userDetails, setUserDetails] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);

  const [loadingRepos, setLoadingRepos] = useState(true);
  const [errorRepos, setErrorRepos] = useState(null);

  const [starredRepos, setStarredRepos] = useState([]);
  const [projects, setProjects] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const [contributions, setContributions] = useState([]);
  const [loadingContribs, setLoadingContribs] = useState(true);
  const [errorContribs, setErrorContribs] = useState(null);

  const [activities, setActivities] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [errorActivity, setErrorActivity] = useState(null);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // New Project Modal State
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [isSavingProject, setIsSavingProject] = useState(false);

  const loadData = () => {
    if (!user) return;

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

    // 3. Fetch Starred Repos
    api.get(`/api/profile/${usernameStr}/starred`)
      .then((res) => {
        setStarredRepos(res.data.repositories || []);
      })
      .catch((err) => console.error('Failed to load starred repos:', err));

    // 4. Fetch Projects
    api.get(`/api/profile/${usernameStr}/projects`)
      .then((res) => {
        setProjects(res.data.projects || []);
      })
      .catch((err) => console.error('Failed to load projects:', err));

    // 5. Fetch Organizations
    api.get(`/api/profile/${usernameStr}/organizations`)
      .then((res) => {
        setOrganizations(res.data.organizations || []);
      })
      .catch((err) => console.error('Failed to load organizations:', err));
  };

  const loadContributionsAndActivity = () => {
    if (!user) return;
    const usernameStr = user.username || 'ravil';

    // Fetch Contributions for selectedYear
    setLoadingContribs(true);
    setErrorContribs(null);
    api.get(`/api/profile/${usernameStr}/contributions?year=${selectedYear}`)
      .then((res) => {
        setContributions(res.data.contributions || []);
      })
      .catch((err) => {
        setErrorContribs(err.response?.data?.message || err.message || 'Failed to load contributions.');
      })
      .finally(() => setLoadingContribs(false));

    // Fetch Activities for selectedYear
    setLoadingActivity(true);
    setErrorActivity(null);
    api.get(`/api/profile/${usernameStr}/activity?year=${selectedYear}`)
      .then((res) => {
        setActivities(res.data.activities || []);
      })
      .catch((err) => {
        setErrorActivity(err.response?.data?.message || err.message || 'Failed to load activity logs.');
      })
      .finally(() => setLoadingActivity(false));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user && !token) {
      navigate('/login');
    } else if (user) {
      loadData();
    }
  }, [user, navigate, refreshTrigger]);

  useEffect(() => {
    if (user) {
      loadContributionsAndActivity();
    }
  }, [user, selectedYear, refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleUpdateUser = (updatedUser) => {
    dispatch(updateProfile(updatedUser));
    handleRefresh();
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projectName) return;
    setIsSavingProject(true);
    try {
      await api.post('/api/profile/projects/create', { name: projectName, description: projectDesc });
      toast.success('Project created successfully!');
      setProjectName('');
      setProjectDesc('');
      setIsCreatingProject(false);
      handleRefresh();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setIsSavingProject(false);
    }
  };

  // Popular languages logic
  const languageStats = {};
  repositories.forEach(repo => {
    if (repo.language) {
      languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
    }
  });
  const totalReposWithLang = Object.values(languageStats).reduce((a, b) => a + b, 0);
  const popularLanguages = Object.entries(languageStats)
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / totalReposWithLang) * 100),
      color: name === 'JavaScript' ? '#f1e05a' : (name === 'Python' ? '#3572A5' : (name === 'HTML' ? '#e34c26' : (name === 'CSS' ? '#563d7c' : (name === 'Rust' ? '#deb73d' : '#858b9c'))))
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);

  const pinnedRepos = repositories.filter((r) => r.isPinned);
  const displayedPinned = pinnedRepos.length > 0 ? pinnedRepos.slice(0, 6) : repositories.slice(0, 6);

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

      case 'projects':
        return (
          <div className="space-y-4 select-none">
            <div className="flex justify-between items-center border-b border-[var(--border-primary)] pb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)]">Projects</h3>
              <Button 
                variant="primary" 
                size="xs" 
                icon={Plus} 
                onClick={() => setIsCreatingProject(true)}
                className="font-bold py-1.5"
              >
                New Project
              </Button>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-12 border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl space-y-2">
                <LayoutGrid className="w-8 h-8 text-[var(--text-muted)] mx-auto" />
                <p className="text-sm font-bold text-[var(--text-primary)]">Create your first project</p>
                <p className="text-xs text-[var(--text-muted)] font-semibold">Boards, roadmaps, and tasks tracking built right into GitHub Clone.</p>
                <div className="pt-2">
                  <Button size="xs" variant="primary" icon={Plus} onClick={() => setIsCreatingProject(true)}>
                    Create Project
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div 
                    key={proj.projectId}
                    className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--surface-card)] hover:border-[var(--accent-primary)] shadow-sm transition-all flex flex-col justify-between min-h-[110px]"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] truncate">
                        {proj.name}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2 leading-relaxed font-semibold">
                        {proj.description || 'No description provided.'}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-[var(--text-muted)] font-bold mt-4">
                      <span className="px-1.5 py-0.5 rounded-full border border-green-500/20 bg-green-500/10 text-green-500 capitalize">
                        {proj.status}
                      </span>
                      <span>Created {new Date(proj.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'packages':
        return (
          <div className="text-center py-16 border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl space-y-3 select-none">
            <Package className="w-10 h-10 text-[var(--text-muted)] mx-auto animate-bounce" />
            <p className="text-sm font-bold text-[var(--text-primary)]">No packages published yet</p>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto font-semibold leading-relaxed">
              Publish registry packages (npm, NuGet, Docker, Maven) directly to GitHub Packages storage.
            </p>
          </div>
        );

      case 'stars':
        return (
          <div className="space-y-4 select-none">
            <h3 className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border-primary)] pb-3">Starred Repositories</h3>
            
            {starredRepos.length === 0 ? (
              <div className="text-center py-12 border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl space-y-2">
                <span className="text-4xl block">⭐</span>
                <p className="text-sm font-bold text-[var(--text-primary)]">You don't have any starred repositories yet</p>
                <p className="text-xs text-[var(--text-muted)] font-semibold">Star repositories in the Repositories tab to list them here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {starredRepos.map((repo) => (
                  <div
                    key={repo.repoId || repo.id}
                    onClick={() => navigate(`/repo/${repo.repoId || repo.id}`)}
                    className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--surface-card)] hover:border-[var(--accent-primary)] shadow-sm cursor-pointer transition-all flex flex-col justify-between min-h-[120px] group"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-bold text-[var(--accent-primary)] hover:underline truncate">
                          {repo.repoName || repo.name}
                        </h4>
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();
                            try {
                              await api.post('/api/profile/repos/star', { repoId: repo.repoId || repo.id });
                              toast.success('Starred status toggled!');
                              handleRefresh();
                            } catch (err) {
                              toast.error(err.message);
                            }
                          }}
                          className="p-1.5 border border-[var(--border-primary)] text-amber-500 rounded-lg hover:bg-[var(--surface-hover)] transition-colors cursor-pointer shrink-0"
                          title="Unstar repository"
                        >
                          <Star size={13} fill="currentColor" />
                        </button>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] mt-1.5 line-clamp-2 leading-relaxed font-semibold">
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

            {/* Popular languages list */}
            {popularLanguages.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)]">Popular Languages</span>
                <div className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--surface-card)] space-y-4">
                  <div className="flex h-2.5 w-full rounded-full overflow-hidden">
                    {popularLanguages.map((lang, idx) => (
                      <div 
                        key={idx} 
                        style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                        title={`${lang.name}: ${lang.percentage}%`} 
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {popularLanguages.map((lang, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-2xs font-bold">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                        <span className="text-[var(--text-primary)]">{lang.name}</span>
                        <span className="text-[var(--text-muted)]">{lang.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Contributions graph section */}
            <div className="space-y-3">
              {renderSectionHeader('Contribution Calendar', loadingContribs, errorContribs, loadContributionsAndActivity)}
              {loadingContribs ? (
                <div className="h-32 border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl animate-pulse" />
              ) : (
                <ContributionGraph 
                  contributions={contributions || []} 
                  selectedYear={selectedYear}
                  onYearChange={setSelectedYear}
                />
              )}
            </div>

            {/* Activity timeline feed under Overview */}
            <div className="space-y-3 pt-2">
              {renderSectionHeader('Contribution History', loadingActivity, errorActivity, loadContributionsAndActivity)}
              <ActivitySection 
                activities={activities} 
                loading={loadingActivity} 
              />
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
            organizations={organizations}
          />
        )}
      </div>

      {/* Right Column Tab Content panel */}
      <div className="lg:col-span-3 space-y-6">
        <ProfileHeader 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          repoCount={repositories.length} 
          projectCount={projects.length}
          starCount={starredRepos.length}
        />

        {renderTabContent()}
      </div>

      {/* Create Project Modal */}
      {isCreatingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[var(--surface-card)] border border-[var(--border-primary)] rounded-xl shadow-lg overflow-hidden text-[var(--text-primary)]">
            <div className="flex justify-between items-center p-4 border-b border-[var(--border-primary)]">
              <h3 className="font-black text-base text-[var(--text-primary)]">Create a new project</h3>
              <button
                onClick={() => setIsCreatingProject(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="p-4 space-y-4">
              <Input
                label="Project Name"
                placeholder="e.g. Q3 Roadmap"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                disabled={isSavingProject}
                required
              />

              <Input
                label="Description"
                placeholder="Project details..."
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                disabled={isSavingProject}
              />

              <div className="flex gap-2 justify-end pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsCreatingProject(false)}
                  disabled={isSavingProject}
                  className="font-bold"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  isLoading={isSavingProject}
                  icon={Check}
                  className="font-bold"
                >
                  Create Project
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export { Profile };
