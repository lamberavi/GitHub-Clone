import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, GitFork, Lock, Globe, Archive, Folder, MoreHorizontal, Pin } from 'lucide-react';
import RepositoryDropdown from './RepositoryDropdown';

const getLanguageColor = (lang) => {
  const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'Go': '#00ADD8',
    'PHP': '#4F5D95',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Ruby': '#701516',
    'Rust': '#dea584',
  };
  return colors[lang] || '#8b949e';
};

const formatRelativeTime = (dateString) => {
  if (!dateString) return 'recently';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  if (isNaN(diffMs)) return 'recently';
  
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  
  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
};

export default function RepositoryCard({ 
  repo, 
  searchQuery, 
  onActionSuccess 
}) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const nameStr = repo.name || repo.repoName || '';
  const isPrivate = repo.visibility === 'private' || repo.isPrivate;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      whileHover={{ 
        y: -4,
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px var(--accent-primary)',
        borderColor: 'var(--accent-primary)'
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      onClick={() => navigate(`/repo/${repo.repoId || repo.id}`)}
      className="relative p-5 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-card)]/75 backdrop-blur-md cursor-pointer transition-all flex flex-col justify-between min-h-[160px] group overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--surface-card) 0%, rgba(22, 27, 34, 0.4) 100%)'
      }}
    >
      {/* Glow hover background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        {/* Header Row */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <Folder size={16} className="text-[var(--text-muted)] shrink-0" />
            <h3 className="text-sm sm:text-base font-extrabold text-[var(--accent-primary)] hover:underline truncate">
              {highlightText(nameStr, searchQuery)}
            </h3>
            <span className="flex items-center gap-1 px-2.5 py-0.5 text-4xs font-black uppercase rounded-full border border-[var(--border-primary)] bg-[var(--surface-secondary)] text-[var(--text-muted)] tracking-wider">
              {isPrivate ? <Lock size={9} /> : <Globe size={9} />}
              <span>{isPrivate ? 'Private' : 'Public'}</span>
            </span>
            {repo.isPinned && (
              <span className="text-amber-500" title="Pinned to Profile">
                <Pin size={12} fill="currentColor" />
              </span>
            )}
            {repo.isArchived && (
              <span className="flex items-center gap-0.5 px-2 py-0.5 text-4xs font-black uppercase rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-500 tracking-wider">
                <Archive size={9} />
                <span>Archived</span>
              </span>
            )}
          </div>

          {/* Action trigger menu */}
          <div className="relative shrink-0" ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-1.5 rounded-lg border border-[var(--border-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all cursor-pointer"
            >
              <MoreHorizontal size={14} />
            </button>
            <RepositoryDropdown
              isOpen={isDropdownOpen}
              repo={repo}
              onClose={() => setIsDropdownOpen(false)}
              onActionSuccess={onActionSuccess}
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-[var(--text-muted)] mt-2 line-clamp-2 max-w-xl leading-relaxed font-semibold">
          {repo.description || 'No description provided.'}
        </p>

        {/* Topics List */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {repo.topics.map((topic, i) => (
              <span key={i} className="px-2 py-0.5 rounded-md text-4xs font-bold bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/10 hover:bg-[var(--accent-primary)] hover:text-white transition-colors duration-200">
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Metrics Row */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--border-primary)]/40 text-[10px] text-[var(--text-muted)] font-black uppercase tracking-wide">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-bold">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: getLanguageColor(repo.language || 'JavaScript') }} />
            <span>{repo.language || 'JavaScript'}</span>
          </span>
          <span className="flex items-center gap-0.5">
            <Star size={11} className={`mr-0.5 ${repo.isStarred ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{repo.stars || 0}</span>
          </span>
          <span className="flex items-center gap-0.5">
            <GitFork size={11} className="mr-0.5" />
            <span>{repo.forks || 0}</span>
          </span>
        </div>
        <span className="font-semibold text-2xs text-[var(--text-muted)]">
          Updated {formatRelativeTime(repo.updatedAt || repo.createdAt)}
        </span>
      </div>
    </motion.div>
  );
}
