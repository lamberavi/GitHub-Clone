import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Pin, Plus, Check, Edit2, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import api from '../../lib/api/axios';
import toast from 'react-hot-toast';

export default function RepositorySection({ repositories = [], onRefresh }) {
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [visFilter, setVisFilter] = useState('all'); // all, public, private
  const [langFilter, setLangFilter] = useState('all'); // all, JavaScript, etc.
  const [sortOrder, setSortOrder] = useState('newest'); // newest, oldest, stars

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Create repo state
  const [isCreating, setIsCreating] = useState(false);
  const [newRepo, setNewRepo] = useState({
    repoName: '',
    description: '',
    visibility: 'public',
    language: 'JavaScript',
    hasReadme: true,
    hasGitignore: false,
    license: 'None'
  });

  // Edit repo state
  const [editingRepo, setEditingRepo] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleCreateRepo = async (e) => {
    e.preventDefault();
    if (!newRepo.repoName) {
      toast.error('Repository name is required.');
      return;
    }

    const nameRegex = /^[a-zA-Z0-9._-]+$/;
    if (!nameRegex.test(newRepo.repoName)) {
      toast.error('Repository name can only contain letters, numbers, hyphens, periods, and underscores.');
      return;
    }

    setIsSaving(true);
    try {
      await api.post('/api/profile/repos/create', newRepo);
      toast.success('Repository created successfully!');
      setIsCreating(false);
      setNewRepo({ 
        repoName: '', 
        description: '', 
        visibility: 'public', 
        language: 'JavaScript',
        hasReadme: true,
        hasGitignore: false,
        license: 'None'
      });
      onRefresh();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditRepoSubmit = async (e) => {
    e.preventDefault();
    if (!editingRepo.repoName) {
      toast.error('Repository name is required.');
      return;
    }
    setIsSaving(true);
    try {
      await api.put(`/api/profile/repos/${editingRepo.repoId}`, {
        repoName: editingRepo.repoName,
        description: editingRepo.description,
        visibility: editingRepo.visibility,
        language: editingRepo.language
      });
      toast.success('Repository updated successfully!');
      setEditingRepo(null);
      onRefresh();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteRepo = async (repoId, e) => {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to permanently delete this repository? This cannot be undone.')) return;
    setIsSaving(true);
    try {
      await api.delete(`/api/profile/repos/${repoId}`);
      toast.success('Repository deleted successfully.');
      setEditingRepo(null);
      onRefresh();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStar = async (repoId, e) => {
    e.stopPropagation();
    try {
      await api.post('/api/profile/repos/star', { repoId });
      toast.success('Starred repository!');
      onRefresh();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleTogglePin = async (repoId, e) => {
    e.stopPropagation();
    try {
      await api.post('/api/profile/repos/pin', { repoId });
      toast.success('Toggled pin status!');
      onRefresh();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() 
            ? <mark key={i} className="bg-amber-400/30 text-[var(--text-primary)] rounded px-0.5 font-bold">{part}</mark> 
            : part
        )}
      </span>
    );
  };

  // Filter & Sort Repos
  const filteredRepos = repositories
    .filter((repo) => {
      const matchesSearch = (repo.repoName || repo.name || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVis = visFilter === 'all' || repo.visibility === visFilter;
      const matchesLang = langFilter === 'all' || repo.language === langFilter;
      return matchesSearch && matchesVis && matchesLang;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      if (sortOrder === 'oldest') return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      if (sortOrder === 'stars') return (b.stars || 0) - (a.stars || 0);
      return 0;
    });

  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage) || 1;
  const paginatedRepos = filteredRepos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const languages = ['all', ...new Set(repositories.map((r) => r.language).filter(Boolean))];

  return (
    <div className="space-y-4 select-none">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between border-b border-[var(--border-primary)] pb-4">
        <div className="relative w-full md:w-80">
          <Search size={14} className="absolute left-3 top-3 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-2 bg-[var(--surface-card)] border border-[var(--border-primary)] focus:border-[var(--accent-primary)] rounded-lg text-xs font-semibold text-[var(--text-primary)] outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
          <select
            value={visFilter}
            onChange={(e) => {
              setVisFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[var(--surface-card)] border border-[var(--border-primary)] text-2xs font-bold text-[var(--text-muted)] py-1.5 px-3 rounded-lg outline-none cursor-pointer"
          >
            <option value="all">Type: All</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          <select
            value={langFilter}
            onChange={(e) => {
              setLangFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[var(--surface-card)] border border-[var(--border-primary)] text-2xs font-bold text-[var(--text-muted)] py-1.5 px-3 rounded-lg outline-none cursor-pointer"
          >
            {languages.map((l) => (
              <option key={l} value={l}>
                Language: {l.charAt(0).toUpperCase() + l.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[var(--surface-card)] border border-[var(--border-primary)] text-2xs font-bold text-[var(--text-muted)] py-1.5 px-3 rounded-lg outline-none cursor-pointer"
          >
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
            <option value="stars">Sort: Stars</option>
          </select>

          <Button 
            variant="primary" 
            size="xs" 
            icon={Plus} 
            className="font-bold py-1.5"
            onClick={() => setIsCreating(true)}
          >
            New
          </Button>
        </div>
      </div>

      {/* Repositories List */}
      <div className="space-y-3">
        {paginatedRepos.length === 0 ? (
          <div className="text-center py-12 border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl space-y-2">
            <span className="text-4xl block">📁</span>
            <p className="text-sm font-bold text-[var(--text-primary)]">No repositories found</p>
            <p className="text-xs text-[var(--text-muted)]">Create your first repository to start collaborating.</p>
            <div className="pt-2">
              <Button size="xs" variant="primary" icon={Plus} onClick={() => setIsCreating(true)}>
                New Repository
              </Button>
            </div>
          </div>
        ) : (
          paginatedRepos.map((repo) => (
            <div
              key={repo.repoId || repo.id}
              onClick={() => navigate(`/repo/${repo.repoId || repo.id}`)}
              className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--surface-card)] hover:border-[var(--accent-primary)] shadow-sm cursor-pointer transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4 group"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[var(--accent-primary)] hover:underline truncate">
                    {highlightText(repo.repoName || repo.name, searchQuery)}
                  </h4>
                  <span className="px-2 py-0.5 text-3xs font-bold uppercase rounded-full border border-[var(--border-primary)] text-[var(--text-muted)] bg-[var(--surface-secondary)]">
                    {repo.visibility || (repo.isPrivate ? 'private' : 'public')}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] line-clamp-2 max-w-lg leading-relaxed font-semibold">
                  {repo.description || 'No description provided.'}
                </p>
                
                <div className="flex items-center gap-4 text-[10px] text-[var(--text-muted)] font-bold">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f1e05a]" />
                    {repo.language || 'JavaScript'}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Star size={11} /> {repo.stars || 0}
                  </span>
                  <span>
                    Updated {repo.updatedAt ? new Date(repo.updatedAt).toLocaleDateString() : 'recently'}
                  </span>
                </div>
              </div>

              {/* Actions panel */}
              <div className="flex gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingRepo({ ...repo });
                  }}
                  className="p-2 rounded-lg border border-[var(--border-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
                  title="Edit repository settings"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={(e) => handleTogglePin(repo.repoId || repo.id, e)}
                  className={`p-2 rounded-lg border border-[var(--border-primary)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer ${
                    repo.isPinned ? 'text-amber-500 bg-[var(--surface-hover)]' : 'text-[var(--text-muted)]'
                  }`}
                  title={repo.isPinned ? 'Unpin from Overview' : 'Pin to Overview'}
                >
                  <Pin size={13} />
                </button>
                <button
                  onClick={(e) => handleToggleStar(repo.repoId || repo.id, e)}
                  className="p-2 rounded-lg border border-[var(--border-primary)] hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 text-[10px] font-bold cursor-pointer"
                  title="Star repository"
                >
                  <Star size={13} />
                  <span>Star</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-[var(--border-primary)] pt-4">
          <span className="text-2xs text-[var(--text-muted)] font-bold">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 border border-[var(--border-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center"
            >
              <ArrowLeft size={14} />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-[var(--border-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center"
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Creation Modal Form */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[var(--surface-card)] border border-[var(--border-primary)] rounded-xl shadow-lg overflow-hidden text-[var(--text-primary)]">
            <div className="flex justify-between items-center p-4 border-b border-[var(--border-primary)]">
              <h3 className="font-black text-base text-[var(--text-primary)]">Create a new repository</h3>
              <button
                onClick={() => setIsCreating(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRepo} className="p-4 space-y-4">
              <Input
                label="Repository Name"
                placeholder="e.g. my-awesome-app"
                value={newRepo.repoName}
                onChange={(e) => setNewRepo({ ...newRepo, repoName: e.target.value })}
                disabled={isSaving}
                required
              />

              <Input
                label="Description"
                placeholder="Repository description..."
                value={newRepo.description}
                onChange={(e) => setNewRepo({ ...newRepo, description: e.target.value })}
                disabled={isSaving}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-2xs font-black text-[var(--text-muted)] mb-1.5 uppercase tracking-wide">
                    Visibility
                  </label>
                  <select
                    value={newRepo.visibility}
                    onChange={(e) => setNewRepo({ ...newRepo, visibility: e.target.value })}
                    disabled={isSaving}
                    className="w-full p-2 bg-[var(--surface-canvas)] border border-[var(--border-primary)] text-xs font-bold text-[var(--text-primary)] rounded-lg outline-none cursor-pointer"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div>
                  <label className="block text-2xs font-black text-[var(--text-muted)] mb-1.5 uppercase tracking-wide">
                    Language
                  </label>
                  <select
                    value={newRepo.language}
                    onChange={(e) => setNewRepo({ ...newRepo, language: e.target.value })}
                    disabled={isSaving}
                    className="w-full p-2 bg-[var(--surface-canvas)] border border-[var(--border-primary)] text-xs font-bold text-[var(--text-primary)] rounded-lg outline-none cursor-pointer"
                  >
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="Rust">Rust</option>
                  </select>
                </div>
              </div>

              {/* Initializers checkboxes */}
              <div className="space-y-2 pt-2 border-t border-[var(--border-primary)] mt-2">
                <label className="flex items-center gap-2 text-2xs font-bold text-[var(--text-muted)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newRepo.hasReadme}
                    onChange={(e) => setNewRepo({ ...newRepo, hasReadme: e.target.checked })}
                    disabled={isSaving}
                    className="rounded bg-[var(--surface-canvas)] border-[var(--border-primary)] accent-[var(--accent-primary)]"
                  />
                  <span>Initialize this repository with a README</span>
                </label>

                <label className="flex items-center gap-2 text-2xs font-bold text-[var(--text-muted)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newRepo.hasGitignore}
                    onChange={(e) => setNewRepo({ ...newRepo, hasGitignore: e.target.checked })}
                    disabled={isSaving}
                    className="rounded bg-[var(--surface-canvas)] border-[var(--border-primary)] accent-[var(--accent-primary)]"
                  />
                  <span>Add .gitignore template</span>
                </label>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsCreating(false)}
                  disabled={isSaving}
                  className="font-bold"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  isLoading={isSaving}
                  icon={Check}
                  className="font-bold"
                >
                  Create Repository
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
