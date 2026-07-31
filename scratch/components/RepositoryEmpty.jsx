import React from 'react';
import { FolderOpen, Plus } from 'lucide-react';
import Button from './common/Button';

export default function RepositoryEmpty({ onCreateClick }) {
  return (
    <div className="text-center py-16 px-4 border border-[var(--border-primary)] bg-[var(--surface-card)]/40 rounded-2xl space-y-4 select-none backdrop-blur-md">
      <div className="w-16 h-16 rounded-full bg-[var(--surface-hover)] border border-[var(--border-primary)] flex items-center justify-center mx-auto text-[var(--text-muted)] animate-bounce">
        <FolderOpen size={28} />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm sm:text-base font-extrabold text-[var(--text-primary)]">
          No repositories found
        </h3>
        <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto font-semibold leading-relaxed">
          Create your first codebase to start staging commits, branching code, and logging pull requests.
        </p>
      </div>
      {onCreateClick && (
        <div className="pt-2">
          <Button 
            size="sm" 
            variant="primary" 
            icon={Plus} 
            onClick={onCreateClick}
            className="font-bold py-2 px-4 rounded-xl"
          >
            New Repository
          </Button>
        </div>
      )}
    </div>
  );
}
