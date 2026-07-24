import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

export default function ContributionGraph({ contributions = [] }) {
  const [hoveredCell, setHoveredCell] = useState(null);

  // Generate 52 weeks (364 days) grid layout
  const weeks = 52;
  const daysPerWeek = 7;
  const totalDays = weeks * daysPerWeek;

  const today = new Date();
  const contribMap = {};

  contributions.forEach((c) => {
    contribMap[c.date] = c.commitCount;
  });

  const cells = Array.from({ length: totalDays }).map((_, index) => {
    const d = new Date();
    d.setDate(today.getDate() - (totalDays - 1 - index));
    const dateStr = d.toISOString().split('T')[0];
    const count = contribMap[dateStr] || 0;

    let colorClass = 'bg-[var(--surface-secondary)] border-[var(--border-primary)]'; // 0 commits
    if (count === 1) colorClass = 'bg-[#9be9a8] dark:bg-[#0e4429] border-[#9be9a8] dark:border-[#0e4429]';
    else if (count >= 2 && count <= 3) colorClass = 'bg-[#40c463] dark:bg-[#006d32] border-[#40c463] dark:border-[#006d32]';
    else if (count >= 4 && count <= 6) colorClass = 'bg-[#30a14e] dark:bg-[#26a641] border-[#30a14e] dark:border-[#26a641]';
    else if (count > 6) colorClass = 'bg-[#216e39] dark:bg-[#39d353] border-[#216e39] dark:border-[#39d353]';

    return {
      date: dateStr,
      count,
      colorClass
    };
  });

  const totalCommits = contributions.reduce((acc, curr) => acc + (curr.commitCount || 0), 0);

  return (
    <div className="space-y-3 p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--surface-card)] text-[var(--text-primary)] shadow-sm select-none">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5 uppercase tracking-wider">
          <Calendar size={14} className="text-[var(--text-muted)]" />
          <span>{totalCommits} contributions in the last year</span>
        </h3>
        <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] font-bold">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded-sm bg-[var(--surface-secondary)] border border-[var(--border-primary)]" />
          <span className="w-2.5 h-2.5 rounded-sm bg-[#9be9a8] dark:bg-[#0e4429]" />
          <span className="w-2.5 h-2.5 rounded-sm bg-[#40c463] dark:bg-[#006d32]" />
          <span className="w-2.5 h-2.5 rounded-sm bg-[#30a14e] dark:bg-[#26a641]" />
          <span className="w-2.5 h-2.5 rounded-sm bg-[#216e39] dark:bg-[#39d353]" />
          <span>More</span>
        </div>
      </div>

      <div className="relative overflow-x-auto pb-2 no-scrollbar">
        <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[680px]">
          {cells.map((cell, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredCell(cell)}
              onMouseLeave={() => setHoveredCell(null)}
              className={`w-2.5 h-2.5 rounded-sm border cursor-pointer transition-transform hover:scale-125 ${cell.colorClass}`}
            />
          ))}
        </div>

        {/* Hover Tooltip Popup */}
        {hoveredCell && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-[var(--surface-card)] border border-[var(--border-primary)] text-3xs font-bold text-[var(--text-primary)] rounded shadow-lg pointer-events-none whitespace-nowrap z-30">
            {hoveredCell.count} contribution{hoveredCell.count === 1 ? '' : 's'} on {hoveredCell.date}
          </div>
        )}
      </div>
    </div>
  );
}
