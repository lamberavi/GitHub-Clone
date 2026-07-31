import React from 'react';

const LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'Go',
  'PHP',
  'HTML',
  'CSS',
  'Ruby',
  'Rust'
];

export default function LanguageSelector({ value, onChange, disabled }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-2xs font-black text-[var(--text-muted)] uppercase tracking-wide">
        Language
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full p-2.5 bg-[var(--surface-canvas)] border border-[var(--border-primary)] text-xs font-bold text-[var(--text-primary)] rounded-lg outline-none cursor-pointer focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}
