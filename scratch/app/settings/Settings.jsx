import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Sun, Moon, Monitor, Save, ShieldAlert, Sparkles } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { updateProfile } from '../../lib/redux/slices/authSlice';
import { setTheme } from '../../lib/redux/slices/themeSlice';

export default function Settings() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);

  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || '',
    bio: user?.bio || '',
    company: user?.company || '',
    location: user?.location || '',
    website: user?.website || ''
  });

  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
    setIsSaved(false);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      dispatch(updateProfile(profileData));
      setIsLoading(false);
      setIsSaved(true);
    }, 1000);
  };

  const handleThemeChange = (selectedTheme) => {
    dispatch(setTheme(selectedTheme));
  };

  return (
    <div className="space-y-8 max-w-2xl">
      
      {/* 1. Header Title */}
      <div className="border-b border-github-light-border/60 dark:border-github-dark-border/60 pb-5">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-xs text-github-light-textMuted dark:text-github-dark-textMuted mt-1">
          Adjust profile logs, security configurations, API scopes, and visual themes.
        </p>
      </div>

      {/* 2. Visual Themes section */}
      <section className="space-y-4">
        <h3 className="font-bold text-sm flex items-center gap-1.5">
          <Sparkles size={16} className="text-github-light-accent dark:text-github-dark-accent" />
          <span>Appearance</span>
        </h3>
        <p className="text-xs text-github-light-textMuted dark:text-github-dark-textMuted leading-normal">
          Customize how GitHub appears on your viewport. Sync visual styles to system configurations.
        </p>
        
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleThemeChange('light')}
            className={`p-4 border rounded-xl flex flex-col items-center gap-2 select-none hover:bg-neutral-100 dark:hover:bg-neutral-850/30 transition-all ${
              theme === 'light'
                ? 'border-github-light-accent dark:border-github-dark-accent ring-2 ring-github-light-accent/15 text-github-light-accent dark:text-github-dark-accent font-bold'
                : 'border-github-light-border dark:border-github-dark-border text-github-light-textMuted dark:text-github-dark-textMuted'
            }`}
          >
            <Sun size={20} />
            <span className="text-xs font-semibold">Light</span>
          </button>

          <button
            onClick={() => handleThemeChange('dark')}
            className={`p-4 border rounded-xl flex flex-col items-center gap-2 select-none hover:bg-neutral-100 dark:hover:bg-neutral-850/30 transition-all ${
              theme === 'dark'
                ? 'border-github-light-accent dark:border-github-dark-accent ring-2 ring-github-light-accent/15 text-github-light-accent dark:text-github-dark-accent font-bold'
                : 'border-github-light-border dark:border-github-dark-border text-github-light-textMuted dark:text-github-dark-textMuted'
            }`}
          >
            <Moon size={20} />
            <span className="text-xs font-semibold">Dark</span>
          </button>

          <button
            onClick={() => handleThemeChange('system')}
            className={`p-4 border rounded-xl flex flex-col items-center gap-2 select-none hover:bg-neutral-100 dark:hover:bg-neutral-850/30 transition-all ${
              theme === 'system'
                ? 'border-github-light-accent dark:border-github-dark-accent ring-2 ring-github-light-accent/15 text-github-light-accent dark:text-github-dark-accent font-bold'
                : 'border-github-light-border dark:border-github-dark-border text-github-light-textMuted dark:text-github-dark-textMuted'
            }`}
          >
            <Monitor size={20} />
            <span className="text-xs font-semibold">System</span>
          </button>
        </div>
      </section>

      {/* 3. User profile settings */}
      <section className="space-y-4 pt-4 border-t border-github-light-border/60 dark:border-github-dark-border/60">
        <h3 className="font-bold text-sm flex items-center gap-1.5">
          <User size={16} className="text-github-light-textMuted dark:text-github-dark-textMuted" />
          <span>Public Profile</span>
        </h3>

        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="fullName"
              placeholder="e.g. Ravil Kumar"
              value={profileData.fullName}
              onChange={handleChange}
            />
            <Input
              label="Company"
              name="company"
              placeholder="e.g. Antigravity Labs"
              value={profileData.company}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Location"
              name="location"
              placeholder="e.g. Bangalore, India"
              value={profileData.location}
              onChange={handleChange}
            />
            <Input
              label="Website URL"
              name="website"
              placeholder="e.g. https://antigravity.io"
              value={profileData.website}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-github-light-textMuted dark:text-github-dark-textMuted">Bio</label>
            <textarea
              name="bio"
              placeholder="Tell us about yourself..."
              value={profileData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-github-light-bg dark:bg-github-dark-bg border border-github-light-border dark:border-github-dark-border rounded-lg outline-none focus:border-github-light-accent dark:focus:border-github-dark-accent transition-all min-h-[90px]"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button 
              type="submit" 
              icon={Save}
              isLoading={isLoading}
            >
              Save Profile
            </Button>
            {isSaved && (
              <span className="text-xs text-github-light-success dark:text-github-dark-success font-semibold animate-fade-in">
                ✓ Settings updated successfully.
              </span>
            )}
          </div>
        </form>
      </section>

      {/* 4. Danger accounts settings */}
      <section className="space-y-4 pt-6 border-t border-github-light-border/60 dark:border-github-dark-border/60">
        <h3 className="font-bold text-sm text-github-light-danger dark:text-github-dark-danger flex items-center gap-1.5">
          <ShieldAlert size={16} />
          <span>Security Zone</span>
        </h3>
        
        <div className="p-4 border border-github-light-danger/30 dark:border-github-dark-danger/30 rounded-xl bg-github-light-danger/5 dark:bg-github-dark-danger/5 flex justify-between items-center gap-4">
          <div>
            <h4 className="text-xs font-bold">Purge local workspace logs</h4>
            <p className="text-[10px] text-github-light-textMuted dark:text-github-dark-textMuted mt-0.5">
              Reset entire project databases and start from a fresh Vite template.
            </p>
          </div>
          <Button variant="danger" size="sm" onClick={() => window.location.reload()}>
            Purge
          </Button>
        </div>
      </section>

    </div>
  );
}
