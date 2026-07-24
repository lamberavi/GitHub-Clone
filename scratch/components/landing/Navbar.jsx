import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, ChevronDown, Search, Menu, X } from 'lucide-react';
import useScroll from '../../hooks/useScroll';
import Button from '../common/Button';

export default function Navbar() {
  const { isScrolled } = useScroll();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
    { 
      name: 'Product', 
      links: ['Actions', 'Packages', 'Security', 'Codespaces', 'Copilot', 'Issues'] 
    },
    { 
      name: 'Solutions', 
      links: ['For Enterprise', 'For Teams', 'For Startups', 'For Education'] 
    },
    { 
      name: 'Resources', 
      links: ['Docs', 'GitHub Community', 'Partners', 'Developer Guide'] 
    },
    { name: 'Open Source', path: '#' },
    { name: 'Pricing', path: '#' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-3 bg-[#161B22]/75 border-b border-[#30363D]/65 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.45)]' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        
        {/* Left: Logo & Menu links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-90">
            <Github className="w-8 h-8 text-github-light-text dark:text-github-dark-text animate-pulse-slow" />
            <span>GitHub</span>
          </Link>

          {/* Desktop Menu links */}
          <ul className="hidden lg:flex items-center gap-5 text-sm font-semibold">
            {menuItems.map((item) => (
              <li 
                key={item.name}
                className="relative"
                onMouseEnter={() => item.links && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.links ? (
                  <button className="flex items-center gap-1 hover:text-github-light-accent dark:hover:text-github-dark-accent transition-colors py-2 cursor-pointer select-none">
                    <span>{item.name}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180 text-github-light-accent dark:text-github-dark-accent' : ''
                    }`} />
                  </button>
                ) : (
                  <a href={item.path} className="hover:text-github-light-accent dark:hover:text-github-dark-accent transition-colors py-2 block">
                    {item.name}
                  </a>
                )}

                {/* Dropdown Menu */}
                {item.links && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-48 glass-panel border border-github-light-border/60 dark:border-github-dark-border/60 rounded-xl shadow-lg py-2.5 z-50 animate-slide-up">
                    {item.links.map((link) => (
                      <a 
                        key={link} 
                        href="#" 
                        className="block px-4 py-2 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-github-light-accent dark:hover:text-github-dark-accent transition-colors"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Options (Search, Login, Signup) */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-github-light-textMuted dark:text-github-dark-textMuted" />
            <input
              type="text"
              placeholder="Search GitHub..."
              className="pl-9 pr-4 py-1.5 text-xs bg-github-light-canvas dark:bg-github-dark-bg/60 border border-github-light-border dark:border-github-dark-border rounded-lg outline-none focus:border-github-light-accent dark:focus:border-github-dark-accent focus:ring-1 focus:ring-github-light-accent/30 dark:focus:ring-github-dark-accent/30 transition-all w-56"
            />
          </div>
          <Link to="/login" className="text-xs font-bold hover:text-github-light-accent dark:hover:text-github-dark-accent transition-colors px-3 py-1.5">
            Sign In
          </Link>
          <Link to="/register">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Hamburger button */}
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden p-2 text-github-light-textMuted dark:text-github-dark-textMuted hover:text-github-light-text dark:hover:text-github-dark-text hover:bg-neutral-150 dark:hover:bg-neutral-800 rounded-lg transition-colors"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      {/* Mobile Drawer Menu Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 top-16 bg-github-light-bg dark:bg-github-dark-canvas z-40 p-6 flex flex-col justify-between overflow-y-auto lg:hidden animate-fade-in">
          <div className="space-y-6">
            <ul className="space-y-4 text-base font-bold">
              {menuItems.map((item) => (
                <li key={item.name} className="border-b border-github-light-border/40 dark:border-github-dark-border/40 pb-3">
                  {item.links ? (
                    <div className="space-y-2">
                      <p className="text-github-light-textMuted dark:text-github-dark-textMuted text-xs uppercase tracking-wider">{item.name}</p>
                      <div className="grid grid-cols-2 gap-2 pl-2">
                        {item.links.map(l => (
                          <a key={l} href="#" onClick={() => setIsMobileOpen(false)} className="text-sm font-semibold hover:text-github-light-accent dark:hover:text-github-dark-accent">
                            {l}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <a href={item.path} onClick={() => setIsMobileOpen(false)} className="block py-1 hover:text-github-light-accent dark:hover:text-github-dark-accent">
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-github-light-textMuted dark:text-github-dark-textMuted" />
              <input
                type="text"
                placeholder="Search GitHub..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-github-light-canvas dark:bg-github-dark-bg border border-github-light-border dark:border-github-dark-border rounded-lg outline-none focus:border-github-light-accent"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-github-light-border/60 dark:border-github-dark-border/60 pt-6">
            <Link to="/login" onClick={() => setIsMobileOpen(false)}>
              <Button variant="outline" className="w-full py-2.5">
                Sign In
              </Button>
            </Link>
            <Link to="/register" onClick={() => setIsMobileOpen(false)}>
              <Button className="w-full py-2.5">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}

    </nav>
  );
}
