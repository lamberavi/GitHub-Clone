import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  User, Shield, Palette, Eye, Bell, CreditCard, 
  BookOpen, Code2, Package, Sparkles, Terminal 
} from 'lucide-react';

export default function SettingsLayout() {
  const navItems = [
    { to: '/settings/profile', label: 'Public Profile', icon: User },
    { to: '/settings/account', label: 'Account', icon: Shield },
    { to: '/settings/appearance', label: 'Appearance', icon: Palette },
    { to: '/settings/accessibility', label: 'Accessibility', icon: Eye },
    { to: '/settings/notifications', label: 'Notifications', icon: Bell },
    { to: '/settings/billing', label: 'Billing & Plans', icon: CreditCard },
    { to: '/settings/repositories', label: 'Repositories', icon: BookOpen },
    { to: '/settings/codespaces', label: 'Codespaces', icon: Code2 },
    { to: '/settings/packages', label: 'Packages', icon: Package },
    { to: '/settings/copilot', label: 'Copilot', icon: Sparkles },
    { to: '/settings/developer', label: 'Developer Settings', icon: Terminal }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Settings Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-1">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#8B949E] px-3 mb-3">
            Personal Settings
          </h2>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all select-none ${
                      isActive
                        ? 'bg-[#58A6FF]/15 text-[#58A6FF] border border-[#58A6FF]/40 shadow-[0_0_15px_rgba(88,166,255,0.2)]'
                        : 'text-[#C9D1D9] hover:text-white hover:bg-[#161B22]'
                    }`
                  }
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Right Settings Content Outlet */}
        <main className="lg:col-span-9 min-h-[600px]">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
