import React from 'react';
import { Globe, Lock } from 'lucide-react';

export default function VisibilitySelector({ value, onChange, disabled }) {
  return (
    <div className="space-y-2">
      <label className="block text-2xs font-black text-[var(--text-muted)] uppercase tracking-wide">
        Visibility
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange('public')}
          className={`flex items-start gap-3 p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
            value === 'public'
              ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/5 text-[var(--text-primary)]'
              : 'border-[var(--border-primary)] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] text-[var(--text-muted)]'
          }`}
        >
          <Globe size={18} className="mt-0.5 shrink-0 text-[#3FB950]" />
          <div>
            <div className="text-xs font-black text-[var(--text-primary)]">Public</div>
            <div className="text-[10px] text-[var(--text-muted)] font-bold mt-0.5 leading-normal">
              Anyone on the internet can see this repository. You choose who can commit.
            </div>
          </div>
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange('private')}
          className={`flex items-start gap-3 p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
            value === 'private'
              ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/5 text-[var(--text-primary)]'
              : 'border-[var(--border-primary)] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] text-[var(--text-muted)]'
          }`}
        >
          <Lock size={18} className="mt-0.5 shrink-0 text-[#F85149]" />
          <div>
            <div className="text-xs font-black text-[var(--text-primary)]">Private</div>
            <div className="text-[10px] text-[var(--text-muted)] font-bold mt-0.5 leading-normal">
              You choose who can see and commit to this repository.
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
