import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function TopicsInput({ topics = [], onChange, disabled }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      addTopic();
    }
  };

  const addTopic = () => {
    const cleanTopic = inputValue.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '');
    if (cleanTopic && !topics.includes(cleanTopic)) {
      onChange([...topics, cleanTopic]);
      setInputValue('');
    }
  };

  const removeTopic = (topicToRemove) => {
    onChange(topics.filter((t) => t !== topicToRemove));
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-2xs font-black text-[var(--text-muted)] uppercase tracking-wide">
        Topics
      </label>
      <div className="flex flex-wrap gap-1.5 p-2 bg-[var(--surface-canvas)] border border-[var(--border-primary)] rounded-lg focus-within:border-[var(--accent-primary)] focus-within:ring-1 focus-within:ring-[var(--accent-primary)] transition-all min-h-[40px] items-center">
        {topics.map((topic) => (
          <span
            key={topic}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-3xs font-black text-[var(--accent-primary)]"
          >
            <span>{topic}</span>
            {!disabled && (
              <button
                type="button"
                onClick={() => removeTopic(topic)}
                className="hover:text-[#F85149] focus:outline-none cursor-pointer text-[var(--accent-primary)]"
              >
                <X size={10} />
              </button>
            )}
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTopic}
          placeholder={topics.length === 0 ? "Add topics (press Enter or Space)" : ""}
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none text-xs font-semibold text-[var(--text-primary)] px-1 py-0.5 placeholder-[var(--text-muted)] min-w-[120px]"
        />
      </div>
    </div>
  );
}
