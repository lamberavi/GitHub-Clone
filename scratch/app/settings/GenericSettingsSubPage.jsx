import React from 'react';
import { Sparkles } from 'lucide-react';
import Button from '../../components/common/Button';

export default function GenericSettingsSubPage({ title, description, icon: Icon, children }) {
  return (
    <div className="space-y-6 max-w-3xl text-white">
      <div className="border-b border-[#30363D] pb-5">
        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2.5">
          {Icon && <Icon className="text-[#58A6FF]" size={26} />}
          <span>{title}</span>
        </h1>
        <p className="text-xs text-[#8B949E] mt-1 font-medium leading-relaxed">
          {description}
        </p>
      </div>

      {children || (
        <div className="p-8 rounded-2xl bg-[#161B22] border border-[#30363D] space-y-4">
          <div className="flex items-center gap-3 text-sm font-bold text-[#58A6FF]">
            <Sparkles size={18} />
            <span>{title} Preferences Active</span>
          </div>
          <p className="text-xs text-[#C9D1D9] leading-relaxed">
            All security controls, notification webhooks, API tokens, and workspace policies are configured according to your GitHub Antigravity profile.
          </p>
          <div className="pt-2">
            <Button variant="gradientBlue" size="sm">Save Changes</Button>
          </div>
        </div>
      )}
    </div>
  );
}
