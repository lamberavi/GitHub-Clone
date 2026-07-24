import React from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarSection from './SidebarSection';
import SidebarRepositoryList from './SidebarRepositoryList';
import sidebarConfig from './sidebarConfig';
import './sidebar.css';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* 1. Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] shrink-0 h-full select-none transition-colors duration-300">
        <SidebarHeader />
        
        <div className="flex-1 overflow-y-auto sidebar-scrollbar p-3 space-y-4">
          {sidebarConfig.map((section, idx) => (
            <SidebarSection key={idx} section={section} />
          ))}

          <SidebarRepositoryList />
        </div>
      </aside>

      {/* 2. Mobile Drawer Overlay Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* 3. Mobile Slide Drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-[var(--bg-secondary)] text-[var(--text-primary)] border-r border-[var(--border-color)] z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarHeader onClose={onClose} />

        <div className="flex-1 overflow-y-auto sidebar-scrollbar p-3 space-y-4">
          {sidebarConfig.map((section, idx) => (
            <SidebarSection key={idx} section={section} onItemClick={onClose} />
          ))}

          <SidebarRepositoryList onItemClick={onClose} />
        </div>
      </aside>
    </>
  );
}
