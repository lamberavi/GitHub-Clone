import React from 'react';

export default function DashboardLayout({ children, sidebar }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      {/* Main Content Area */}
      <div className="lg:col-span-3 space-y-8 w-full">
        {children}
      </div>
      
      {/* Right Column Sidebar Widgets */}
      <aside className="lg:col-span-1 space-y-8 w-full">
        {sidebar}
      </aside>
    </div>
  );
}
