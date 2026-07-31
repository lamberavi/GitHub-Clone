import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smile, LogOut, ArrowRightLeft } from 'lucide-react';
import profileMenuItems from '../../lib/config/profileMenuItems';
import { resolveAvatarUrl } from '../../lib/utils/avatar';

export default function ProfileDropdown({ user, onClose, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const photo = resolveAvatarUrl(user?.photo || user?.avatarUrl || user?.avatar);
  const displayName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.displayName || 'Developer';
  const username = user?.username || 'user';

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -5 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="absolute right-0 mt-2 w-64 bg-[var(--surface-card)] border border-[var(--border-primary)] rounded-xl shadow-lg py-1.5 z-50 text-xs font-semibold text-[var(--text-primary)] select-none"
    >
      {/* Section 1: Profile Header */}
      <div className="px-3.5 py-2.5 border-b border-[var(--border-primary)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={photo}
            alt={displayName}
            className="w-9 h-9 rounded-full border border-[var(--border-primary)] object-cover shrink-0"
          />
          <div className="min-w-0">
            <p className="font-bold text-[var(--text-primary)] leading-tight truncate">{displayName}</p>
            <p className="text-3xs text-[var(--text-muted)] truncate">@{username}</p>
          </div>
        </div>
        <button
          onClick={() => handleNavigate('/status')}
          className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] rounded-lg transition-colors cursor-pointer"
          title="Switch account"
        >
          <ArrowRightLeft size={14} />
        </button>
      </div>

      {/* Section 2: Set Status */}
      <div className="px-2 py-1.5 border-b border-[var(--border-primary)]">
        <button
          onClick={() => handleNavigate('/status')}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 border border-[var(--border-primary)] bg-[var(--surface-canvas)] hover:bg-[var(--surface-hover)] rounded-lg text-3xs font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <Smile size={13} className="text-amber-500" />
          <span>Set status</span>
        </button>
      </div>

      {/* Section 3 & 4: Dynamic Menu Items Array */}
      <div className="py-1 border-b border-[var(--border-primary)] space-y-1">
        {profileMenuItems.map((group, groupIdx) => (
          <div key={groupIdx} className={groupIdx > 0 ? 'pt-1 border-t border-[var(--border-primary)]' : ''}>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full flex items-center justify-between px-3.5 py-1.5 transition-all text-left cursor-pointer rounded-md ${
                    isActive
                      ? 'bg-[var(--accent-glow)] text-[var(--accent-primary)] font-bold border-l-2 border-[var(--accent-primary)]'
                      : 'text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon size={14} className={isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'} />
                    <span className="truncate">{item.title}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-3xs font-black uppercase rounded bg-[var(--accent-glow)] text-[var(--accent-primary)]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Section 5: Logout */}
      <div className="pt-1">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3.5 py-1.5 text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer text-left font-bold"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </motion.div>
  );
}
