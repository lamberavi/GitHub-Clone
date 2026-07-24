import React from 'react';
import { Github, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SidebarHeader({ onClose }) {
  return (
    <div className="px-4 h-14 border-b border-[#30363d] flex items-center justify-between gap-3 shrink-0">
      <Link to="/dashboard" className="flex items-center gap-2.5 font-bold text-sm text-white select-none">
        <Github size={22} className="text-white" />
        <span className="tracking-tight">GitHub IDE</span>
      </Link>
      
      {onClose && (
        <button
          onClick={onClose}
          className="p-1.5 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-lg transition-colors cursor-pointer"
          title="Close sidebar"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
