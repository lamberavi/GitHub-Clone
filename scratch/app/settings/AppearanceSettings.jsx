import React, { useState } from 'react';
import { useAppearance } from '../../lib/context/AppearanceContext';
import LiveRepoPreviewCard from '../../components/Cards/LiveRepoPreviewCard';
import { 
  Sun, Moon, Monitor, Sparkles, Check, RefreshCw, Download, Upload, 
  Palette, Type, Sliders, Eye, Zap, Layers, Maximize2, Shield, CircleDot
} from 'lucide-react';
import Button from '../../components/common/Button';

export default function AppearanceSettings() {
  const { 
    appearance, 
    updateAppearance, 
    resetDefaults, 
    exportThemeJSON, 
    importThemeJSON, 
    saveStatus,
    AccentHexMap 
  } = useAppearance();

  const [importText, setImportText] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleImport = () => {
    const success = importThemeJSON(importText);
    if (success) {
      showToast('Theme imported successfully!');
      setShowImportModal(false);
      setImportText('');
    } else {
      alert('Invalid Theme JSON string');
    }
  };

  return (
    <div className="space-y-10 max-w-4xl pb-16 text-white font-sans">
      
      {/* Header Info & Auto-Save Status */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#30363D] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5">
            <Palette className="text-[#58A6FF]" size={28} />
            <span>Appearance Settings</span>
          </h1>
          <p className="text-sm text-[#8B949E] mt-1 font-medium">
            Customize theme presets, accent colors, typography, background FX, and interface density.
          </p>
        </div>

        {/* Action Controls: Reset, Export, Auto-Save Status */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#3FB950] font-bold px-2.5 py-1 rounded-full bg-[#238636]/15 border border-[#238636] flex items-center gap-1.5">
            <Check size={13} />
            <span>{saveStatus === 'saving' ? 'Saving...' : 'Auto Saved'}</span>
          </span>

          <Button 
            onClick={exportThemeJSON} 
            variant="outline" 
            size="sm" 
            icon={Download}
            className="text-xs font-bold"
          >
            Export JSON
          </Button>

          <Button 
            onClick={() => setShowImportModal(true)} 
            variant="outline" 
            size="sm" 
            icon={Upload}
            className="text-xs font-bold"
          >
            Import
          </Button>

          <Button 
            onClick={() => { resetDefaults(); showToast('Reset to default appearance'); }} 
            variant="ghost" 
            size="sm" 
            icon={RefreshCw}
            className="text-xs font-bold text-[#F85149] hover:bg-[#F85149]/10"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3 rounded-xl bg-[#238636] text-white font-bold text-xs shadow-lg animate-fade-in flex items-center gap-2">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Phase 21: Live Repository Card Preview */}
      <LiveRepoPreviewCard />

      {/* Phase 4: Theme Mode */}
      <section className="space-y-4 pt-4 border-t border-[#30363D]">
        <h3 className="text-base font-bold flex items-center gap-2 text-white">
          <Sun size={18} className="text-[#58A6FF]" />
          <span>Theme Mode</span>
        </h3>
        <p className="text-xs text-[#8B949E]">
          Choose how GitHub Antigravity looks to you. Select a explicit theme mode or sync with your system.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: 'light', label: 'Single Light', icon: Sun, desc: 'Clean daylight view' },
            { id: 'dark', label: 'Single Dark', icon: Moon, desc: 'High-velocity night workspace' },
            { id: 'system', label: 'System Sync', icon: Monitor, desc: 'Sync automatically with OS' }
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = appearance.mode === item.id;

            return (
              <button
                key={item.id}
                onClick={() => updateAppearance({ mode: item.id })}
                className={`p-5 rounded-2xl border flex flex-col gap-3 transition-all cursor-pointer text-left ${
                  isSelected 
                    ? 'bg-[#58A6FF]/10 border-[#58A6FF] shadow-[0_0_20px_rgba(88,166,255,0.25)] ring-2 ring-[#58A6FF]/20' 
                    : 'bg-[#161B22] border-[#30363D] hover:border-[#8B949E]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <Icon size={22} className={isSelected ? 'text-[#58A6FF]' : 'text-[#8B949E]'} />
                  {isSelected && <Check size={16} className="text-[#58A6FF]" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.label}</h4>
                  <p className="text-xs text-[#8B949E] mt-0.5">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Phase 5: Theme Gallery */}
      <section className="space-y-4 pt-4 border-t border-[#30363D]">
        <h3 className="text-base font-bold flex items-center gap-2 text-white">
          <Palette size={18} className="text-[#A371F7]" />
          <span>Theme Gallery Presets</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'dark_default', label: 'Dark Default', color: '#0D1117', border: '#30363D' },
            { id: 'dark_blue', label: 'Dark Blue', color: '#0A111E', border: '#273A61' },
            { id: 'dark_purple', label: 'Dark Purple', color: '#120E1E', border: '#3B305F' },
            { id: 'dark_emerald', label: 'Dark Emerald', color: '#0A1612', border: '#275244' },
            { id: 'dark_high_contrast', label: 'High Contrast Dark', color: '#000000', border: '#FFFFFF' },
            { id: 'light_default', label: 'Light Default', color: '#FFFFFF', border: '#D0D7DE' },
            { id: 'light_blue', label: 'Light Blue', color: '#F0F7FF', border: '#B3D7FF' },
            { id: 'light_soft', label: 'Light Soft', color: '#FAF9F6', border: '#E2DFD2' }
          ].map((t) => {
            const isSelected = appearance.themeGallery === t.id;
            return (
              <button
                key={t.id}
                onClick={() => updateAppearance({ themeGallery: t.id })}
                className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer text-left ${
                  isSelected ? 'border-[#58A6FF] bg-[#58A6FF]/10 ring-2 ring-[#58A6FF]/30' : 'bg-[#161B22] border-[#30363D] hover:border-[#8B949E]'
                }`}
              >
                <span className="w-5 h-5 rounded-full shrink-0 border border-[#30363D]" style={{ backgroundColor: t.color, borderColor: t.border }} />
                <span className="text-xs font-bold truncate text-white">{t.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Phase 11: Accent Color */}
      <section className="space-y-4 pt-4 border-t border-[#30363D]">
        <h3 className="text-base font-bold flex items-center gap-2 text-white">
          <CircleDot size={18} className="text-[#38BDF8]" />
          <span>Accent Color</span>
        </h3>
        <p className="text-xs text-[#8B949E]">
          Applies globally to buttons, links, active tabs, focus rings, and badges.
        </p>

        <div className="flex flex-wrap gap-3">
          {Object.keys(AccentHexMap).map((colorKey) => {
            const acc = AccentHexMap[colorKey];
            const isSelected = appearance.accentColor === colorKey;

            return (
              <button
                key={colorKey}
                onClick={() => updateAppearance({ accentColor: colorKey })}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-bold capitalize transition-all cursor-pointer ${
                  isSelected ? 'border-white bg-[#161B22] ring-2 ring-white/30 scale-105' : 'bg-[#161B22] border-[#30363D] hover:border-[#8B949E]'
                }`}
              >
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: acc.hex }} />
                <span className="text-white">{colorKey}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Phase 9 & 10: Font Size & Font Family */}
      <section className="space-y-5 pt-4 border-t border-[#30363D]">
        <h3 className="text-base font-bold flex items-center gap-2 text-white">
          <Type size={18} className="text-[#3FB950]" />
          <span>Typography Engine</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Font Size */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#8B949E]">Font Size</label>
            <div className="grid grid-cols-4 gap-2">
              {['sm', 'md', 'lg', 'xl'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => updateAppearance({ fontSize: sz })}
                  className={`py-2 rounded-lg border text-xs font-bold uppercase transition-all cursor-pointer ${
                    appearance.fontSize === sz ? 'bg-[#58A6FF]/20 border-[#58A6FF] text-[#58A6FF]' : 'bg-[#161B22] border-[#30363D] text-[#8B949E] hover:text-white'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Font Family */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#8B949E]">Font Family</label>
            <select
              value={appearance.fontFamily}
              onChange={(e) => updateAppearance({ fontFamily: e.target.value })}
              className="w-full px-4 py-2 text-xs font-bold bg-[#161B22] border border-[#30363D] rounded-xl text-white outline-none focus:border-[#58A6FF] cursor-pointer"
            >
              <option value="system">System Default (-apple-system)</option>
              <option value="inter">Inter (Modern & Clean)</option>
              <option value="roboto">Roboto (Google Design)</option>
              <option value="segoe">Segoe UI (Windows System)</option>
              <option value="sf_pro">SF Pro (Apple Native)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Phase 12 & 15: Border Radius & Background FX */}
      <section className="space-y-5 pt-4 border-t border-[#30363D]">
        <h3 className="text-base font-bold flex items-center gap-2 text-white">
          <Sliders size={18} className="text-[#D29922]" />
          <span>UI Geometry & Background Effects</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Border Radius */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#8B949E]">Border Radius</label>
            <div className="grid grid-cols-5 gap-1.5">
              {['sharp', 'sm', 'md', 'lg', 'rounded'].map((r) => (
                <button
                  key={r}
                  onClick={() => updateAppearance({ borderRadius: r })}
                  className={`py-2 rounded-lg border text-[11px] font-bold capitalize transition-all cursor-pointer ${
                    appearance.borderRadius === r ? 'bg-[#58A6FF]/20 border-[#58A6FF] text-[#58A6FF]' : 'bg-[#161B22] border-[#30363D] text-[#8B949E] hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Background FX */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#8B949E]">Background Effects</label>
            <select
              value={appearance.bgEffect}
              onChange={(e) => updateAppearance({ bgEffect: e.target.value })}
              className="w-full px-4 py-2 text-xs font-bold bg-[#161B22] border border-[#30363D] rounded-xl text-white outline-none focus:border-[#58A6FF] cursor-pointer"
            >
              <option value="none">None (Plain Solid Dark)</option>
              <option value="stars">Twinkling Stars Canvas</option>
              <option value="aurora">Aurora Glow Mesh</option>
              <option value="particles">Floating Particles</option>
              <option value="grid">Isometric Matrix Grid</option>
              <option value="galaxy">Galaxy Orbs Drift</option>
            </select>
          </div>
        </div>
      </section>

      {/* Phase 16, 17, 18: Motion, Glass & Reduced Motion */}
      <section className="space-y-4 pt-4 border-t border-[#30363D]">
        <h3 className="text-base font-bold flex items-center gap-2 text-white">
          <Zap size={18} className="text-[#F778BA]" />
          <span>Motion, Glass & Accessibility Toggles</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center justify-between cursor-pointer">
            <div>
              <h4 className="text-xs font-bold text-white">Glassmorphism</h4>
              <p className="text-[10px] text-[#8B949E]">Enable backdrop blur filters</p>
            </div>
            <input
              type="checkbox"
              checked={appearance.glassEffects}
              onChange={(e) => updateAppearance({ glassEffects: e.target.checked })}
              className="h-4 w-4 rounded border-[#30363D] bg-[#0D1117] accent-[#58A6FF] cursor-pointer"
            />
          </label>

          <label className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center justify-between cursor-pointer">
            <div>
              <h4 className="text-xs font-bold text-white">Animations</h4>
              <p className="text-[10px] text-[#8B949E]">UI transitions & hover effects</p>
            </div>
            <input
              type="checkbox"
              checked={appearance.animationsEnabled}
              onChange={(e) => updateAppearance({ animationsEnabled: e.target.checked })}
              className="h-4 w-4 rounded border-[#30363D] bg-[#0D1117] accent-[#58A6FF] cursor-pointer"
            />
          </label>

          <label className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center justify-between cursor-pointer">
            <div>
              <h4 className="text-xs font-bold text-white">Reduced Motion</h4>
              <p className="text-[10px] text-[#8B949E]">Disable particle motion for accessibility</p>
            </div>
            <input
              type="checkbox"
              checked={appearance.reducedMotion}
              onChange={(e) => updateAppearance({ reducedMotion: e.target.checked })}
              className="h-4 w-4 rounded border-[#30363D] bg-[#0D1117] accent-[#58A6FF] cursor-pointer"
            />
          </label>
        </div>
      </section>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-6 max-w-lg w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Import Theme JSON</h3>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste custom theme JSON payload here..."
              className="w-full h-36 p-3 bg-[#0D1117] border border-[#30363D] rounded-xl text-xs font-mono text-white outline-none focus:border-[#58A6FF]"
            />
            <div className="flex justify-end gap-3">
              <Button onClick={() => setShowImportModal(false)} variant="ghost" size="sm">Cancel</Button>
              <Button onClick={handleImport} variant="gradientBlue" size="sm">Apply Theme</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
