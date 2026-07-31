import React from 'react';

export default function RepositorySkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((n) => (
        <div 
          key={n} 
          className="p-5 border border-[var(--border-primary)] bg-[var(--surface-card)]/40 rounded-2xl flex flex-col justify-between min-h-[160px]"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-4.5 w-40 bg-[var(--border-primary)] rounded" />
              <div className="h-4 w-14 bg-[var(--border-primary)] rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-11/12 bg-[var(--border-primary)] rounded" />
              <div className="h-3 w-8/12 bg-[var(--border-primary)] rounded" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-6 pt-3 border-t border-[var(--border-primary)]/20">
            <div className="flex items-center gap-4">
              <div className="h-3 w-16 bg-[var(--border-primary)] rounded" />
              <div className="h-3 w-10 bg-[var(--border-primary)] rounded" />
              <div className="h-3 w-10 bg-[var(--border-primary)] rounded" />
            </div>
            <div className="h-3 w-20 bg-[var(--border-primary)] rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
