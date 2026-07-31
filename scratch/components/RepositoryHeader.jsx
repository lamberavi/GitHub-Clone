import React from 'react';
import { Plus } from 'lucide-react';
import RepositorySearch from './RepositorySearch';
import RepositoryFilters from './RepositoryFilters';
import Button from './common/Button';

export default function RepositoryHeader({ 
  searchQuery, 
  onSearchChange, 
  visFilter, 
  onVisChange, 
  langFilter, 
  onLangChange, 
  sortOption, 
  onSortChange, 
  onCreateClick 
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-[var(--border-primary)] pb-5 mt-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Debounced live search */}
        <RepositorySearch
          value={searchQuery}
          onChange={onSearchChange}
        />

        {/* Action Controls */}
        <div className="flex items-center gap-3 justify-between sm:justify-start shrink-0">
          <RepositoryFilters
            visFilter={visFilter}
            onVisChange={onVisChange}
            langFilter={langFilter}
            onLangChange={onLangChange}
            sortOption={sortOption}
            onSortChange={onSortChange}
          />

          {onCreateClick && (
            <Button
              size="sm"
              variant="primary"
              icon={Plus}
              onClick={onCreateClick}
              className="font-bold py-2 px-3 rounded-xl shadow-sm shrink-0 cursor-pointer"
            >
              New
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
