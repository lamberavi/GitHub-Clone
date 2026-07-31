import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import Button from './common/Button';
import api from '../lib/api/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteRepository } from '../lib/redux/slices/repoSlice';

export default function DeleteRepositoryModal({ repo, isOpen, onClose, onDeleteSuccess }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [typedName, setTypedName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Support ESC key close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isDeleting) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isDeleting]);

  if (!isOpen || !repo) return null;

  const repoName = repo.repoName || repo.name || '';
  const isConfirmed = typedName.trim() === repoName.trim();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!isConfirmed) return;

    setIsDeleting(true);
    try {
      const repoId = repo.repoId || repo.id || repo._id;
      await api.delete(`/api/repositories/${repoId}`);
      toast.success('Repository deleted successfully.');
      dispatch(deleteRepository(repoId));
      
      if (onDeleteSuccess) {
        onDeleteSuccess(repoId);
      }
      onClose();

      // Redirect if deleting from details page
      const currentPath = window.location.pathname;
      if (currentPath.includes(`/repo/${repoId}`)) {
        navigate('/repositories');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Unable to delete repository. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => {
            if (!isDeleting) onClose();
          }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative w-full max-w-md bg-[#161b22] border border-[#f85149]/30 rounded-2xl shadow-2xl overflow-hidden text-[#c9d1d9] z-10"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-[#30363d] bg-[#0d1117]/50 shrink-0">
            <h3 className="font-extrabold text-sm flex items-center gap-2 text-[#f85149]">
              <AlertTriangle size={16} />
              <span>Delete Repository</span>
            </h3>
            <button
              onClick={onClose}
              className="text-[#8b949e] hover:text-white cursor-pointer transition-colors outline-none disabled:opacity-50"
              disabled={isDeleting}
            >
              <X size={16} />
            </button>
          </div>

          {/* Warning Body */}
          <form onSubmit={handleDelete} className="p-5 space-y-4 text-left">
            <div className="p-3 border border-[#f85149]/20 rounded-lg bg-[#f85149]/5 space-y-1.5 text-xs text-[#e6edf3] font-semibold leading-relaxed">
              <p>
                This action <span className="font-black text-[#f85149]">cannot be undone</span>. This will permanently delete the repository:
              </p>
              <p className="font-black text-[#f85149] text-center py-1 bg-[#0d1117] border border-[#30363d] rounded">
                {repoName}
              </p>
              <p>
                This will also purge database records (Commits, Issues, PRs) and the physical directory on disk.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-2xs font-black text-[var(--text-muted)] uppercase tracking-wide">
                Type the repository name <span className="font-mono text-[#f85149] font-black">{repoName}</span> to confirm:
              </label>
              <input
                type="text"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                disabled={isDeleting}
                placeholder={repoName}
                className="w-full p-2.5 bg-[#0d1117] border border-[#30363d] focus:border-[#f85149] focus:ring-1 focus:ring-[#f85149] text-xs font-bold text-white rounded-lg outline-none transition-all placeholder-[#484f58] disabled:opacity-50"
                required
                autoFocus
              />
            </div>

            <div className="flex gap-2 justify-end pt-3 border-t border-[#30363d]">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={onClose}
                disabled={isDeleting}
                className="font-bold text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="danger"
                size="sm"
                isLoading={isDeleting}
                loadingText="Deleting..."
                disabled={!isConfirmed}
                icon={Trash2}
                className="font-bold text-xs"
              >
                Delete
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
