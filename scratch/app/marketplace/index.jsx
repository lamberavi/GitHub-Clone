import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function Marketplace() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6 text-[#c9d1d9] select-none">
      <div className="glass-panel p-8 rounded-2xl border border-[#30363d] text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400">
          <Gift size={32} />
        </div>
        <div className="space-y-1">
          <div className="flex justify-center items-center gap-2">
            <h1 className="text-2xl font-black text-white">GitHub Marketplace</h1>
            <Badge variant="warning" size="sm" className="font-bold">Under Development</Badge>
          </div>
          <p className="text-xs text-[#8b949e] max-w-md mx-auto leading-relaxed">
            Find developer tools, GitHub Actions workflows, security scanners, and app integrations.
          </p>
        </div>

        <div className="pt-4 border-t border-[#30363d]">
          <Button onClick={() => navigate('/dashboard')} variant="secondary" size="sm" icon={ArrowLeft} className="font-bold">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
