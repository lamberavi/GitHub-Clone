import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BookOpen, RefreshCw, FolderPlus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import RepositoryHeader from '../../components/RepositoryHeader';
import RepositoryCard from '../../components/RepositoryCard';
import RepositoryModal from '../../components/RepositoryModal';
import RepositorySkeleton from '../../components/RepositorySkeleton';
import RepositoryEmpty from '../../components/RepositoryEmpty';
import useRepositories from '../../hooks/useRepositories';

export default function Repositories() {
  const { user } = useSelector((state) => state.auth);
  const { 
    repositories, 
    loading, 
    error, 
    fetchRepositories 
  } = useRepositories();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [visFilter, setVisFilter] = useState('all');
  const [langFilter, setLangFilter] = useState('All');
  const [sortOption, setSortOption] = useState('updated');
  
  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const usernameStr = user?.username || 'ravil';

  const loadData = useCallback(async (force = false) => {
    if (!usernameStr) return;
    try {
      await fetchRepositories(usernameStr, force);
    } catch (err) {
      console.error('Failed to load repositories:', err);
    }
  }, [usernameStr, fetchRepositories]);

  useEffect(() => {
    loadData(false);
  }, [loadData]);

  const handleForceRefresh = () => {
    loadData(true);
  };

  // Filtered and sorted repositories computed locally
  const processedRepos = useMemo(() => {
    if (!repositories) return [];

    let result = [...repositories];

    // 1. Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) => 
          (r.name || r.repoName || '').toLowerCase().includes(q) ||
          (r.description || '').toLowerCase().includes(q)
      );
    }

    // 2. Filter by Visibility / Type
    if (visFilter !== 'all') {
      if (visFilter === 'public') {
        result = result.filter((r) => r.visibility === 'public' || !r.isPrivate);
      } else if (visFilter === 'private') {
        result = result.filter((r) => r.visibility === 'private' || r.isPrivate);
      } else if (visFilter === 'pinned') {
        result = result.filter((r) => r.isPinned);
      } else if (visFilter === 'archived') {
        result = result.filter((r) => r.isArchived);
      }
    }

    // 3. Filter by Language
    if (langFilter !== 'All') {
      result = result.filter((r) => r.language === langFilter);
    }

    // 4. Sort
    result.sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortOption === 'oldest') {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      if (sortOption === 'alphabetical') {
        return (a.name || a.repoName || '').localeCompare(b.name || b.repoName || '');
      }
      if (sortOption === 'stars') {
        return (b.stars || 0) - (a.stars || 0);
      }
      // Default: 'updated'
      return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
    });

    return result;
  }, [repositories, searchQuery, visFilter, langFilter, sortOption]);

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
      {/* Title Header */}
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
        <Button
          onClick={() => setIsCreateOpen(true)}
          variant="primary"
          icon={FolderPlus}
          className="font-bold py-2 px-4 rounded-xl shrink-0 cursor-pointer shadow-lg hover:shadow-[var(--accent-primary)]/20 transition-all duration-300"
        >
          New Repository
        </Button>
      </div>

      {/* Search and Filters panel wrapper */}
      <RepositoryHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        visFilter={visFilter}
        onVisChange={setVisFilter}
        langFilter={langFilter}
        onLangChange={setLangFilter}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {/* Main Content Body */}
      {loading ? (
        <RepositorySkeleton />
      ) : processedRepos.length === 0 ? (
        <RepositoryEmpty onCreateClick={() => setIsCreateOpen(true)} />
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {processedRepos.map((repo) => (
              <RepositoryCard
                key={repo.id || repo.repoId || repo._id}
                repo={repo}
                searchQuery={searchQuery}
                onActionSuccess={handleForceRefresh}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Create Modal overlay */}
      {isCreateOpen && (
        <RepositoryModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onSuccess={handleForceRefresh}
        />
      )}
    </div>
  );
}
