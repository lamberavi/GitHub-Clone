import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smile, ArrowLeft, Check } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import toast from 'react-hot-toast';
import './styles.css';

export default function Status() {
  const navigate = useNavigate();
  const [statusText, setStatusText] = useState('Focusing on code 🚀');

  const handleSaveStatus = (e) => {
    e.preventDefault();
    toast.success('Status updated successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="placeholder-container p-4 sm:p-8 space-y-6 text-[#c9d1d9] select-none max-w-lg mx-auto">
      <div className="glass-panel p-6 rounded-2xl border border-[#30363d] space-y-4">
        <div className="flex items-center gap-3 border-b border-[#30363d] pb-4">
          <Smile size={24} className="text-amber-400" />
          <div>
            <h1 className="text-lg font-black text-white">Set User Status</h1>
            <p className="text-2xs text-[#8b949e]">Status messages are visible across your profile and workspace.</p>
          </div>
        </div>

        <form onSubmit={handleSaveStatus} className="space-y-4">
          <Input
            label="What's happening?"
            placeholder="e.g. Working from home..."
            value={statusText}
            onChange={(e) => setStatusText(e.target.value)}
          />

          <div className="flex justify-between items-center pt-2 border-t border-[#30363d]">
            <Button onClick={() => navigate('/dashboard')} variant="secondary" size="sm" icon={ArrowLeft} className="font-bold">
              Back
            </Button>
            <Button type="submit" variant="primary" size="sm" icon={Check} className="font-bold">
              Save Status
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
