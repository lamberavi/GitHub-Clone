import React, { useState } from 'react';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import api from '../../api/axios';
import toast from 'react-hot-toast';

export default function DeleteRepositoryModal({ repo, isOpen, onClose, onDeleteSuccess }) {
  if (!isOpen || !repo) return null;

  const repoName = repo.repoName || repo.name || 'repository';
  const ownerUsername = repo.ownerUsername || 'username';
  const fullTargetString = `${ownerUsername}/${repoName}`;

  const [confirmInput, setConfirmInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const isMatch = confirmInput.trim() === repoName || confirmInput.trim() === fullTargetString;

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    if (!isMatch) return;

    setIsDeleting(true);
    try {
      const repoId = repo.repoId || repo.id || repo._id;
      await api.delete(`/api/repositories/${repoId}`);
      toast.success(`Repository ${repoName} deleted.`);
      if (onDeleteSuccess) onDeleteSuccess(repoId);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to delete repository.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm select-none">
      <div className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-xl shadow-premium overflow-hidden text-[#c9d1d9]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[#30363d] bg-red-950/20">
          <div className="flex items-center gap-2 text-red-400 font-black text-sm">
            <AlertTriangle size={18} />
            <span>Delete Repository</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#8b949e] hover:text-white text-xs font-bold cursor-pointer"
            disabled={isDeleting}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleDeleteSubmit} className="p-4 space-y-4">
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-200 space-y-1">
            <p className="font-bold">This action cannot be undone.</p>
            <p className="text-3xs text-[#8b949e]">
              This will permanently delete the <strong>{repoName}</strong> repository, disk files, commits, branches, issues, and pull requests.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-2xs font-bold text-[#8b949e]">
              To confirm, type <strong className="text-white select-all">{repoName}</strong> in the box below:
            </label>
            <input
              type="text"
              value={confirmInput}
              onChange={(e) => setConfirmInput(e.target.value)}
              placeholder={`Type "${repoName}" to confirm`}
              disabled={isDeleting}
              className="w-full p-2 bg-[#0d1117] border border-[#30363d] text-xs font-semibold text-white rounded-lg outline-none focus:border-red-500"
            />
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-[#30363d]">
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
              disabled={isDeleting}
              className="font-bold"
            >
              Cancel
            </Button>

            <button
              type="submit"
              disabled={!isMatch || isDeleting}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                isMatch && !isDeleting
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg'
                  : 'bg-neutral-800 text-[#8b949e] cursor-not-allowed opacity-50'
              }`}
            >
              {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              <span>Delete Repository</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
