import React from 'react';

export default function SkeletonLoader({ 
  variant = 'text', 
  rows = 1,
  className = '' 
}) {
  const baseStyle = 'animate-pulse bg-neutral-250 dark:bg-github-dark-border/60 rounded';

  if (variant === 'avatar') {
    return <div className={`${baseStyle} rounded-full ${className}`} />;
  }

  if (variant === 'card') {
    return (
      <div className={`p-4 border border-github-light-border dark:border-github-dark-border rounded-xl space-y-3 ${className}`}>
        <div className="flex items-center gap-3">
          <div className={`${baseStyle} rounded-full w-10 h-10`} />
          <div className="space-y-1.5 flex-1">
            <div className={`${baseStyle} h-4 w-1/3`} />
            <div className={`${baseStyle} h-3 w-1/4`} />
          </div>
        </div>
        <div className={`${baseStyle} h-3 w-full`} />
        <div className={`${baseStyle} h-3 w-5/6`} />
      </div>
    );
  }

  // default text rows loader
  return (
    <div className={`space-y-2.5 w-full ${className}`}>
      {Array.from({ length: rows }).map((_, idx) => (
        <div 
          key={idx} 
          className={`${baseStyle} h-4`} 
          style={{ width: rows > 1 && idx === rows - 1 ? '70%' : '100%' }}
        />
      ))}
    </div>
  );
}
