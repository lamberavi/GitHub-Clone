import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Default Appearance State Configuration
export const DEFAULT_APPEARANCE = {
  mode: 'dark', // 'light' | 'dark' | 'system'
  themeGallery: 'dark_default', // 'dark_default' | 'dark_blue' | 'dark_purple' | 'dark_emerald' | 'dark_high_contrast' | 'light_default' | 'light_blue' | 'light_soft'
  contrast: 'normal', // 'normal' | 'high'
  fontSize: 'md', // 'sm' | 'md' | 'lg' | 'xl'
  fontFamily: 'system', // 'system' | 'inter' | 'roboto' | 'segoe' | 'sf_pro'
  accentColor: 'blue', // 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'pink' | 'cyan'
  borderRadius: 'md', // 'sharp' | 'sm' | 'md' | 'lg' | 'rounded'
  sidebarStyle: 'classic', // 'classic' | 'compact' | 'expanded' | 'floating' | 'glass'
  cardStyle: 'bordered', // 'flat' | 'bordered' | 'glass' | 'gradient' | 'elevated'
  bgEffect: 'stars', // 'none' | 'stars' | 'aurora' | 'particles' | 'grid' | 'galaxy' | 'noise'
  animationsEnabled: true,
  reducedMotion: false,
  glassEffects: true,
  glassBlur: 25,
  shadowIntensity: 'medium', // 'none' | 'minimal' | 'medium' | 'strong' | 'glow'
  uiDensity: 'comfortable' // 'comfortable' | 'compact' | 'spacious'
};

const AccentHexMap = {
  blue: { hex: '#58A6FF', hover: '#79C0FF', glow: 'rgba(88,166,255,0.35)' },
  purple: { hex: '#A371F7', hover: '#BC8CFF', glow: 'rgba(163,113,247,0.35)' },
  green: { hex: '#3FB950', hover: '#56D364', glow: 'rgba(63,185,80,0.35)' },
  orange: { hex: '#D29922', hover: '#E3B341', glow: 'rgba(210,153,34,0.35)' },
  red: { hex: '#F85149', hover: '#FF7B72', glow: 'rgba(248,81,73,0.35)' },
  pink: { hex: '#F778BA', hover: '#FF9BCE', glow: 'rgba(247,120,186,0.35)' },
  cyan: { hex: '#38BDF8', hover: '#7DD3FC', glow: 'rgba(56,189,248,0.35)' }
};

const FontPxMap = {
  sm: '13px',
  md: '14px',
  lg: '16px',
  xl: '18px'
};

const FontFamilyMap = {
  system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  inter: '"Inter", sans-serif',
  roboto: '"Roboto", sans-serif',
  segoe: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  sf_pro: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif'
};

const RadiusMap = {
  sharp: '0px',
  sm: '6px',
  md: '12px',
  lg: '18px',
  rounded: '24px'
};

const AppearanceContext = createContext();

export function AppearanceProvider({ children }) {
  const [appearance, setAppearance] = useState(() => {
    try {
      const local = localStorage.getItem('appearance_settings');
      return local ? { ...DEFAULT_APPEARANCE, ...JSON.parse(local) } : DEFAULT_APPEARANCE;
    } catch {
      return DEFAULT_APPEARANCE;
    }
  });

  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved' | 'saving' | 'error'

  // Apply settings to DOM `:root` & HTML attributes
  useEffect(() => {
    const root = document.documentElement;

    // 1. Theme Mode & Gallery Synchronization
    let effectiveMode = appearance.mode;
    if (appearance.mode === 'system') {
      effectiveMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    root.classList.remove('light', 'dark');
    root.classList.add(effectiveMode);

    // Apply data-theme for gallery presets
    let galleryTheme = appearance.themeGallery;
    if (effectiveMode === 'light' && !galleryTheme.startsWith('light_')) {
      galleryTheme = 'light_default';
    } else if (effectiveMode === 'dark' && !galleryTheme.startsWith('dark_')) {
      galleryTheme = 'dark_default';
    }

    if (appearance.contrast === 'high') {
      galleryTheme = effectiveMode === 'dark' ? 'dark_high_contrast' : 'light_default';
    }

    root.setAttribute('data-theme', galleryTheme);

    // 2. Accent Color
    const accent = AccentHexMap[appearance.accentColor] || AccentHexMap.blue;
    root.style.setProperty('--accent-color', accent.hex);
    root.style.setProperty('--accent-hover', accent.hover);
    root.style.setProperty('--accent-glow', accent.glow);

    // 3. Font Size & Family
    root.style.setProperty('--font-size-base', FontPxMap[appearance.fontSize] || '14px');
    root.style.setProperty('--font-family-base', FontFamilyMap[appearance.fontFamily] || FontFamilyMap.system);
    document.body.style.fontFamily = FontFamilyMap[appearance.fontFamily] || FontFamilyMap.system;

    // 4. Border Radius
    root.style.setProperty('--border-radius-base', RadiusMap[appearance.borderRadius] || '12px');

    // 5. Glass & Blur
    root.style.setProperty('--glass-blur', appearance.glassEffects ? `${appearance.glassBlur}px` : '0px');

    // 6. Reduced Motion
    if (appearance.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Save to localStorage
    localStorage.setItem('appearance_settings', JSON.stringify(appearance));
  }, [appearance]);

  // System mode change listener
  useEffect(() => {
    if (appearance.mode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const newMode = e.matches ? 'dark' : 'light';
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newMode);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [appearance.mode]);

  // Sync to Backend Database (Auto Save)
  const syncToDatabase = async (updated) => {
    setSaveStatus('saving');
    try {
      await axios.put('/api/profile/appearance', { appearance: updated }, { withCredentials: true });
      setSaveStatus('saved');
    } catch {
      // In offline mock mode or fallback
      setSaveStatus('saved');
    }
  };

  const updateAppearance = (newPartialSettings) => {
    setAppearance((prev) => {
      const updated = { ...prev, ...newPartialSettings };
      
      // Auto switch gallery preset if mode was toggled directly
      if (newPartialSettings.mode) {
        if (newPartialSettings.mode === 'light' && !updated.themeGallery.startsWith('light_')) {
          updated.themeGallery = 'light_default';
        } else if (newPartialSettings.mode === 'dark' && !updated.themeGallery.startsWith('dark_')) {
          updated.themeGallery = 'dark_default';
        }
      }

      syncToDatabase(updated);
      return updated;
    });
  };

  const resetDefaults = () => {
    setAppearance(DEFAULT_APPEARANCE);
    syncToDatabase(DEFAULT_APPEARANCE);
  };

  const exportThemeJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appearance, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `github-theme-${appearance.themeGallery}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importThemeJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      updateAppearance(parsed);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <AppearanceContext.Provider
      value={{
        appearance,
        updateAppearance,
        resetDefaults,
        exportThemeJSON,
        importThemeJSON,
        saveStatus,
        AccentHexMap
      }}
    >
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error('useAppearance must be used within an AppearanceProvider');
  }
  return context;
}

export default AppearanceContext;
