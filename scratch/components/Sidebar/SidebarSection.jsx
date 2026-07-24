import React from 'react';
import SidebarItem from './SidebarItem';

export default function SidebarSection({ section, onItemClick }) {
  return (
    <div className="space-y-1">
      {section.title && (
        <h4 className="px-3 text-3xs font-black uppercase tracking-wider text-[#8b949e] mb-1.5 select-none">
          {section.title}
        </h4>
      )}
      <div className="space-y-0.5">
        {section.items.map((item) => (
          <SidebarItem key={item.id} item={item} onClick={onItemClick} />
        ))}
      </div>
    </div>
  );
}
