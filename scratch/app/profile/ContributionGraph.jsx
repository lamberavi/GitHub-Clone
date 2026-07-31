import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

export default function ContributionGraph({ 
  contributions = [], 
  selectedYear = new Date().getFullYear(), 
  onYearChange 
}) {
  const [hoveredCell, setHoveredCell] = useState(null);

  // Generate years list (e.g., 2026, 2025, 2024, 2023)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }).map((_, i) => currentYear - i);

  const contribMap = {};
  contributions.forEach((c) => {
    contribMap[c.date] = c.commitCount;
  });

  // Generate cells for the selected year (from Jan 1st to Dec 31st)
  const cells = [];
  const startDate = new Date(`${selectedYear}-01-01T00:00:00.000Z`);
  const isLeap = (selectedYear % 4 === 0 && (selectedYear % 100 !== 0 || selectedYear % 400 === 0));
  const daysCount = isLeap ? 366 : 365;

  for (let i = 0; i < daysCount; i++) {
    const d = new Date(startDate.getTime());
    d.setDate(startDate.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const count = contribMap[dateStr] || 0;

    let colorClass = 'bg-[var(--surface-secondary)] border-[var(--border-primary)]'; // 0 commits
    if (count > 0 && count <= 5) colorClass = 'bg-[#9be9a8] dark:bg-[#0e4429] border-[#9be9a8] dark:border-[#0e4429]';
    else if (count >= 6 && count <= 15) colorClass = 'bg-[#40c463] dark:bg-[#006d32] border-[#40c463] dark:border-[#006d32]';
    else if (count >= 16 && count <= 30) colorClass = 'bg-[#30a14e] dark:bg-[#26a641] border-[#30a14e] dark:border-[#26a641]';
    else if (count > 30) colorClass = 'bg-[#216e39] dark:bg-[#39d353] border-[#216e39] dark:border-[#39d353]';

    cells.push({
      date: dateStr,
      count,
      colorClass
    });
  }

  const totalCommits = contributions.reduce((acc, curr) => acc + (curr.commitCount || 0), 0);

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start select-none w-full">
      {/* Calendar Area */}
      <div className="flex-1 w-full space-y-3 p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--surface-card)] text-[var(--text-primary)] shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5 uppercase tracking-wider">
            <Calendar size={14} className="text-[var(--text-muted)]" />
            <span>{totalCommits} contributions in {selectedYear}</span>
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

      {/* Year Sidebar (GitHub Style) */}
      <div className="w-full lg:w-32 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible no-scrollbar shrink-0">
        {years.map((y) => (
          <button
            key={y}
            onClick={() => onYearChange && onYearChange(y)}
            className={`px-3 py-1.5 rounded-lg text-left text-xs font-bold w-full transition-all cursor-pointer whitespace-nowrap ${
              selectedYear === y
                ? 'bg-[var(--accent-primary)] text-white shadow-sm'
                : 'text-[var(--text-muted)] hover:bg-[var(--surface-hover)]'
            }`}
          >
            {y}
          </button>
        ))}
      </div>
    </div>
  );
}
