import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function RepositorySearch({ 
  value, 
  onChange, 
  placeholder = "Search repositories..." 
}) {
  const [localVal, setLocalVal] = useState(value);

  useEffect(() => {
    setLocalVal(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(localVal);
    }, 300); // 300ms debounce delay (Phase 7)
    return () => clearTimeout(handler);
  }, [localVal, onChange]);

  return (
    <div className="relative flex-1 min-w-[200px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
      <input
        type="text"
        value={localVal}
        onChange={(e) => setLocalVal(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 bg-[var(--surface-canvas)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-xl text-xs font-semibold outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all"
      />
      {localVal && (
        <button
          onClick={() => setLocalVal('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
}
