import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BookOpen, RefreshCw } from 'lucide-react';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { setRepositories, setLoading, setError } from '../../lib/redux/slices/repoSlice';
import RepositorySection from '../profile/RepositorySection';
import api from '../../lib/api/axios';

export default function Repositories() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { repositories, hasLoaded, loading, error } = useSelector((state) => state.repos);

  const fetchRepos = async (force = false) => {
    if (!user) return;
    if (hasLoaded && !force) return;

    dispatch(setLoading(true));
    try {
      const usernameStr = user.username || 'ravil';
      const res = await api.get(`/api/profile/${usernameStr}/repos`);
      dispatch(setRepositories(res.data.repositories));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message || 'Database lookup timeout.'));
    }
  };

  useEffect(() => {
    fetchRepos(false);
  }, [user, dispatch]);

  const handleForceRefresh = () => {
    fetchRepos(true);
  };

  const renderSkeletons = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((n) => (
        <div key={n} className="p-5 border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl space-y-3.5 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="h-4.5 w-36 bg-[var(--border-primary)] rounded" />
            <div className="h-4 w-12 bg-[var(--border-primary)] rounded-full" />
          </div>
          <div className="h-3 w-2/3 bg-[var(--border-primary)] rounded" />
          <div className="flex gap-4 pt-1">
            <div className="h-3 w-16 bg-[var(--border-primary)] rounded" />
            <div className="h-3 w-12 bg-[var(--border-primary)] rounded" />
            <div className="h-3 w-20 bg-[var(--border-primary)] rounded" />
          </div>
        </div>
      ))}
    </div>
  );

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4 text-[var(--text-primary)]">
        <div className="bg-[#F85149]/10 border border-[#F85149]/30 p-5 rounded-xl space-y-2">
          <p className="text-sm font-semibold text-[#F85149]">Unable to load repositories.</p>
          <p className="text-xs text-[var(--text-muted)]">{error}</p>
        </div>
        <Button onClick={handleForceRefresh} variant="primary" icon={RefreshCw} className="font-bold">
          Retry Connection
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 select-none text-[var(--text-primary)] max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header details */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border-primary)] pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2 text-[var(--text-primary)]">
            <BookOpen size={22} className="text-[var(--text-muted)]" />
            <span>Repositories</span>
            {!loading && (
              <Badge variant="neutral" size="sm" className="ml-1 font-bold">
                {repositories.length}
              </Badge>
            )}
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Browse and query all active projects, codebases, and configurations from the database.
          </p>
        </div>
      </div>

      {loading ? (
        renderSkeletons()
      ) : (
        <RepositorySection 
          repositories={repositories} 
          onRefresh={handleForceRefresh} 
        />
      )}
    </div>
  );
}
