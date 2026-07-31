import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';

const LANGUAGES = ['All', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Python', 'Java', 'Go', 'Rust'];
const VISIBILITIES = ['all', 'public', 'private', 'pinned', 'archived'];
const SORT_OPTIONS = [
  { value: 'updated', label: 'Recently Updated' },
  { value: 'newest', label: 'Newest Created' },
  { value: 'oldest', label: 'Oldest Created' },
  { value: 'alphabetical', label: 'Name A-Z' },
  { value: 'stars', label: 'Stars Count' }
];

export default function RepositoryFilters({ 
  visFilter, 
  onVisChange, 
  langFilter, 
  onLangChange, 
  sortOption, 
  onSortChange 
}) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Visibility / Type filter */}
      <div className="flex items-center gap-1.5">
        <span className="text-3xs font-black uppercase text-[var(--text-muted)] tracking-wider">Type</span>
        <select
          value={visFilter}
          onChange={(e) => onVisChange(e.target.value)}
          className="px-3 py-2 bg-[var(--surface-canvas)] border border-[var(--border-primary)] rounded-xl text-2xs font-bold text-[var(--text-primary)] cursor-pointer outline-none focus:border-[var(--accent-primary)] transition-all"
        >
          {VISIBILITIES.map((vis) => (
            <option key={vis} value={vis}>
              {vis.charAt(0).toUpperCase() + vis.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Language filter */}
      <div className="flex items-center gap-1.5">
        <span className="text-3xs font-black uppercase text-[var(--text-muted)] tracking-wider">Language</span>
        <select
          value={langFilter}
          onChange={(e) => onLangChange(e.target.value)}
          className="px-3 py-2 bg-[var(--surface-canvas)] border border-[var(--border-primary)] rounded-xl text-2xs font-bold text-[var(--text-primary)] cursor-pointer outline-none focus:border-[var(--accent-primary)] transition-all"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Option */}
      <div className="flex items-center gap-1.5">
        <span className="text-3xs font-black uppercase text-[var(--text-muted)] tracking-wider">Sort</span>
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-2 bg-[var(--surface-canvas)] border border-[var(--border-primary)] rounded-xl text-2xs font-bold text-[var(--text-primary)] cursor-pointer outline-none focus:border-[var(--accent-primary)] transition-all"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
