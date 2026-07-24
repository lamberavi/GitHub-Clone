import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bell, CircleDot, GitPullRequest, Mail, Check } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { markAsRead, markAllAsRead } from '../../lib/redux/slices/notificationSlice';

export default function Notifications() {
  const dispatch = useDispatch();
  const { items = [], unreadCount = 0 } = useSelector((state) => state.notifications);

  const getIcon = (type) => {
    switch (type) {
      case 'issue':
        return <CircleDot size={15} className="text-[#3FB950]" />;
      case 'pr':
        return <GitPullRequest size={15} className="text-[#A371F7]" />;
      default:
        return <Mail size={15} className="text-[var(--accent-primary)]" />;
    }
  };

  return (
    <div className="space-y-6 select-none max-w-5xl mx-auto p-4 sm:p-6 text-[var(--text-primary)]">
      
      {/* 1. Header controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--border-primary)] pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2 text-[var(--text-primary)]">
            <Bell size={22} className="text-[var(--text-muted)]" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="success" size="sm" className="ml-1 font-bold animate-pulse">
                {unreadCount} new
              </Badge>
            )}
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Review activity pings, mentions, issue boards, and code changes requested.
          </p>
        </div>

        {items.length > 0 && (
          <Button 
            size="sm" 
            variant="secondary" 
            icon={Check}
            onClick={() => dispatch(markAllAsRead())}
            className="h-8 text-xs font-bold"
          >
            Mark all read
          </Button>
        )}
      </div>

      {/* 2. Notifications listings */}
      <div className="border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl overflow-hidden divide-y divide-[var(--border-primary)] shadow-sm">
        {items.length > 0 ? (
          items.map((notif) => (
            <div 
              key={notif.id || notif._id}
              onClick={() => dispatch(markAsRead(notif.id || notif._id))}
              className={`p-4 flex items-start gap-4 transition-all duration-200 cursor-pointer ${
                !notif.isRead 
                  ? 'bg-[var(--accent-glow)] hover:bg-[var(--surface-hover)]' 
                  : 'hover:bg-[var(--surface-hover)]'
              }`}
            >
              {/* Unread dot indicator */}
              <div className="pt-1.5 shrink-0 flex items-center justify-center">
                {!notif.isRead ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] ring-4 ring-[var(--accent-glow)]" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-transparent border border-[var(--border-primary)]" />
                )}
              </div>

              {/* Icon */}
              <div className="p-2 bg-[var(--surface-secondary)] border border-[var(--border-primary)] rounded-lg shrink-0">
                {getIcon(notif.type)}
              </div>

              {/* Message */}
              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-sm font-bold text-[var(--text-primary)]">
                  {notif.title}
                </p>
                <p className="text-xs text-[var(--text-muted)] font-semibold">
                  {notif.message}
                </p>
                <p className="text-3xs text-[var(--text-muted)] font-bold pt-1">
                  {new Date(notif.date || notif.createdAt || Date.now()).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-xs text-[var(--text-muted)] font-bold">
            No notifications available.
          </div>
        )}
      </div>
    </div>
  );
}
