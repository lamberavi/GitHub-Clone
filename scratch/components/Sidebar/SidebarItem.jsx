import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SidebarItem({ item, onClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const Icon = item.icon;
  const isActive = location.pathname === item.path;

  const handleClick = () => {
    navigate(item.path);
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer select-none ${
        isActive
          ? 'sidebar-item-active'
          : 'text-[#8b949e] hover:text-white hover:bg-[#161b22]'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Icon size={16} className={isActive ? 'text-[#58a6ff]' : 'text-[#8b949e]'} />
        <span className="truncate">{item.title}</span>
      </div>
      {item.badge && (
        <span className="px-1.5 py-0.5 text-3xs font-black uppercase rounded bg-[#21262d] text-[#8b949e]">
          {item.badge}
        </span>
      )}
    </button>
  );
}
