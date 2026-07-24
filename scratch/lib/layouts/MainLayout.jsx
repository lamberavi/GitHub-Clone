import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Bell, Search, Moon, Sun, Monitor, 
  ChevronDown, LayoutDashboard, Folder, CircleDot, 
  GitPullRequest, BarChart3, Settings, LogOut, Github, User
} from 'lucide-react';
import { setTheme, initializeTheme } from '../redux/slices/themeSlice';
import { setSearch } from '../redux/slices/repoSlice';
import useAuth from '../../hooks/useAuth';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProfileDropdown from '../../components/navigation/ProfileDropdown';

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { logout } = useAuth();
  
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const unreadCount = useSelector((state) => state.notifications.unreadCount) || 0;
  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  // Initial theme loader
  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  // Handle redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      dispatch(setSearch({ query: localSearch, filter: 'all' }));
      navigate('/search');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const photo = user?.photo || user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 select-none">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--bg-secondary)] backdrop-blur-md transition-colors duration-300">
        <div className="px-4 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Hamburger */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden p-2 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-muted)]"
            >
              <Menu size={20} />
            </button>
            
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
              className="hidden lg:flex p-2 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-muted)]"
            >
              <Menu size={20} />
            </button>
            
            <Link to="/dashboard" className="flex items-center gap-2 font-bold text-lg tracking-tight text-[var(--text-primary)]">
              <Github className="w-7 h-7 text-[var(--accent-color)]" />
              <span className="hidden sm:inline">GitHub</span>
              <span className="text-[var(--accent-color)] text-xs font-semibold border border-[var(--border-color)] px-1.5 py-0.5 rounded-md">IDE</span>
            </Link>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search or type '/' to launch query..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg outline-none focus:border-[var(--accent-color)] text-[var(--text-primary)] transition-colors"
              />
            </div>
          </form>

          {/* Right Header Navigation Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Notification Bell */}
            <Link 
              to="/notifications" 
              className="relative p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] rounded-lg transition-colors"
              title="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[var(--accent-color)] rounded-full animate-ping" />
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
              >
                <img
                  src={photo}
                  alt={user?.firstName || 'User'}
                  className="w-8 h-8 rounded-full border border-[var(--border-color)] object-cover"
                />
                <ChevronDown size={14} className="text-[var(--text-muted)]" />
              </button>

              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <ProfileDropdown
                    user={user}
                    onClose={() => setIsProfileDropdownOpen(false)}
                    onLogout={handleLogout}
                  />
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </header>

      {/* Main Body with Collapsible Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Modular GitHub Home Sidebar */}
        <Sidebar 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />

        {/* Dynamic Route Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
