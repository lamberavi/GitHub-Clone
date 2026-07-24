import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { setActiveRepo } from '../../lib/redux/slices/repoSlice';

export default function SidebarRepositoryList({ onItemClick }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { repositories = [] } = useSelector((state) => state.repos);

  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const username = user?.username || 'ravil';

  const filteredRepos = repositories.filter((repo) =>
    (repo.name || repo.repoName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedRepos = isExpanded ? filteredRepos : filteredRepos.slice(0, 5);

  const handleRepoClick = (repo) => {
    const targetId = repo.id || repo.repoId;
    dispatch(setActiveRepo(targetId));
    navigate(`/repo/${targetId}`);
    if (onItemClick) onItemClick();
  };

  return (
    <div className="pt-3 border-t border-[#30363d] space-y-2 select-none">
      {/* Title & Count Header */}
      <div className="flex items-center justify-between px-3">
        <h4 className="text-3xs font-black uppercase tracking-wider text-[#8b949e]">
          Top repositories
        </h4>
        <span className="px-1.5 py-0.5 text-3xs font-black rounded-full bg-[#21262d] text-[#8b949e]">
          {repositories.length}
        </span>
      </div>

      {/* Live Search Input Box */}
      <div className="px-2">
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8b949e]" />
          <input
            type="text"
            placeholder="Find a repository..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-2 py-1 bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg text-xs font-semibold text-white outline-none"
          />
        </div>
      </div>

      {/* Repositories List */}
      <div className="space-y-0.5 px-1">
        {displayedRepos.length > 0 ? (
          displayedRepos.map((repo) => {
            const nameStr = repo.name || repo.repoName;
            return (
              <button
                key={repo.id || repo.repoId}
                onClick={() => handleRepoClick(repo)}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#161b22] rounded-lg transition-colors text-left cursor-pointer truncate"
              >
                <BookOpen size={13} className="shrink-0 text-[#8b949e]" />
                <span className="truncate">{username}/{nameStr}</span>
              </button>
            );
          })
        ) : (
          <p className="px-3 py-1.5 text-2xs text-[#8b949e]">No repositories found.</p>
        )}
      </div>

      {/* Show More Expansion Button */}
      {filteredRepos.length > 5 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center gap-1.5 px-3 py-1 text-2xs font-bold text-[#8b949e] hover:text-white transition-colors cursor-pointer"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={13} />
              <span>Show less</span>
            </>
          ) : (
            <>
              <ChevronDown size={13} />
              <span>Show more ({filteredRepos.length - 5})</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
