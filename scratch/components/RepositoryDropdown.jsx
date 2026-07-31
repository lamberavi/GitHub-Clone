import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Pencil, Lock, Globe, Pin, Trash2, Copy, Archive, Star, Eye 
} from 'lucide-react';
import api from '../lib/api/axios';
import { useDispatch } from 'react-redux';
import { 
  updateRepository, 
  deleteRepository, 
  toggleStarRepository, 
  toggleWatchRepository 
} from '../lib/redux/slices/repoSlice';
import toast from 'react-hot-toast';
import EditRepositoryModal from './EditRepositoryModal';
import DeleteRepositoryModal from './DeleteRepositoryModal';
import ConfirmationModal from './ConfirmationModal';

export default function RepositoryDropdown({ 
  isOpen, 
  repo, 
  onClose, 
  onActionSuccess 
}) {
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isConfirmVisOpen, setIsConfirmVisOpen] = useState(false);
  const [visChangeType, setVisChangeType] = useState('private');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen && !isEditOpen && !isDeleteOpen && !isConfirmVisOpen) return null;

  const repoId = repo.repoId || repo.id || repo._id;
  const isPinned = repo.isPinned;
  const isArchived = repo.isArchived;
  const isPrivate = repo.visibility === 'private' || repo.isPrivate;

  // Pin/Unpin action handler
  const handleTogglePin = async () => {
    setIsProcessing(true);
    try {
      const res = await api.patch(`/api/repositories/${repoId}/pin`);
      dispatch(updateRepository(res.data.repository || { ...repo, isPinned: !isPinned }));
      toast.success(res.data.message || 'Pinned status updated!');
      if (onActionSuccess) onActionSuccess();
      onClose();
    } catch (err) {
      toast.error('Unable to update pinned status.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Archive/Unarchive action handler
  const handleToggleArchive = async () => {
    setIsProcessing(true);
    try {
      const res = await api.put(`/api/repositories/${repoId}`, {
        archived: !isArchived,
        isArchived: !isArchived
      });
      dispatch(updateRepository(res.data.repository));
      toast.success(!isArchived ? 'Repository archived!' : 'Repository restored!');
      if (onActionSuccess) onActionSuccess();
      onClose();
    } catch (err) {
      toast.error('Unable to change archived status.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Toggle Visibility directly
  const handleToggleVisibility = async () => {
    setIsProcessing(true);
    try {
      const newVis = isPrivate ? 'public' : 'private';
      const res = await api.put(`/api/repositories/${repoId}`, {
        visibility: newVis
      });
      dispatch(updateRepository(res.data.repository));
      toast.success(`Repository is now ${newVis}!`);
      setIsConfirmVisOpen(false);
      if (onActionSuccess) onActionSuccess();
      onClose();
    } catch (err) {
      toast.error('Failed to update visibility.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Trigger Visibility Confirmation Modal
  const triggerVisConfirmation = () => {
    setVisChangeType(isPrivate ? 'public' : 'private');
    setIsConfirmVisOpen(true);
  };

  // Duplicate repository action
  const handleDuplicate = async () => {
    setIsProcessing(true);
    try {
      const baseName = repo.repoName || repo.name || 'copy';
      const res = await api.post('/api/profile/repos/create', {
        repoName: `${baseName}-copy-${Math.floor(Math.random() * 1000)}`,
        description: repo.description,
        visibility: repo.visibility
      });
      toast.success('Repository duplicated successfully!');
      if (onActionSuccess) onActionSuccess();
      onClose();
    } catch (err) {
      toast.error('Failed to duplicate repository.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Star/Unstar repository
  const handleToggleStar = async () => {
    setIsProcessing(true);
    try {
      // Optimistic update
      dispatch(toggleStarRepository(repoId));
      const newStarredStatus = !repo.isStarred;
      toast.success(newStarredStatus ? 'Starred repository!' : 'Unstarred repository!');
      
      // Star backend API
      if (newStarredStatus) {
        await api.patch(`/api/repositories/${repoId}/star`);
      }
      
      if (onActionSuccess) onActionSuccess();
      onClose();
    } catch (err) {
      // Revert star count if failed
      dispatch(toggleStarRepository(repoId));
      toast.error('Failed to star repository.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Watch/Unwatch repository
  const handleToggleWatch = () => {
    dispatch(toggleWatchRepository(repoId));
    const newWatchStatus = !repo.isWatched;
    toast.success(newWatchStatus ? 'You are now watching this repository' : 'Stopped watching repository');
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-10 mt-1 w-56 rounded-xl border border-[#30363d] bg-[#161b22] shadow-2xl z-40 p-1.5 flex flex-col gap-0.5 select-none"
          >
            {/* Rename / Settings */}
            <button
              onClick={() => {
                setIsEditOpen(true);
                onClose();
              }}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-bold text-[#c9d1d9] hover:bg-[#21262d] hover:text-[#58a6ff] transition-all cursor-pointer"
            >
              <Pencil size={13} className="text-[#8b949e]" />
              <span>Rename Repository</span>
            </button>

            {/* Duplicate */}
            <button
              onClick={handleDuplicate}
              disabled={isProcessing}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-bold text-[#c9d1d9] hover:bg-[#21262d] hover:text-[#58a6ff] transition-all cursor-pointer disabled:opacity-50"
            >
              <Copy size={13} className="text-[#8b949e]" />
              <span>Duplicate</span>
            </button>

            {/* Pin / Unpin */}
            <button
              onClick={handleTogglePin}
              disabled={isProcessing}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-bold text-[#c9d1d9] hover:bg-[#21262d] hover:text-[#58a6ff] transition-all cursor-pointer disabled:opacity-50"
            >
              <Pin size={13} className={isPinned ? 'text-amber-500 fill-amber-500/10' : 'text-[#8b949e]'} />
              <span>{isPinned ? 'Unpin' : 'Pin'}</span>
            </button>

            {/* Star / Unstar */}
            <button
              onClick={handleToggleStar}
              disabled={isProcessing}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-bold text-[#c9d1d9] hover:bg-[#21262d] hover:text-[#58a6ff] transition-all cursor-pointer disabled:opacity-50"
            >
              <Star size={13} className={repo.isStarred ? 'text-amber-500 fill-amber-500/10' : 'text-[#8b949e]'} />
              <span>{repo.isStarred ? 'Unstar' : 'Star'}</span>
            </button>

            {/* Watch / Unwatch */}
            <button
              onClick={handleToggleWatch}
              disabled={isProcessing}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-bold text-[#c9d1d9] hover:bg-[#21262d] hover:text-[#58a6ff] transition-all cursor-pointer disabled:opacity-50"
            >
              <Eye size={13} className={repo.isWatched ? 'text-[var(--accent-primary)]' : 'text-[#8b949e]'} />
              <span>{repo.isWatched ? 'Unwatch' : 'Watch'}</span>
            </button>

            {/* Visibility Toggle with Confirmation */}
            <button
              onClick={() => {
                triggerVisConfirmation();
                onClose();
              }}
              disabled={isProcessing}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-bold text-[#c9d1d9] hover:bg-[#21262d] hover:text-[#58a6ff] transition-all cursor-pointer disabled:opacity-50"
            >
              {isPrivate ? <Globe size={13} className="text-[#8b949e]" /> : <Lock size={13} className="text-[#8b949e]" />}
              <span>Make {isPrivate ? 'Public' : 'Private'}</span>
            </button>

            {/* Archive / Unarchive */}
            <button
              onClick={handleToggleArchive}
              disabled={isProcessing}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-bold text-[#c9d1d9] hover:bg-[#21262d] hover:text-[#58a6ff] transition-all cursor-pointer disabled:opacity-50"
            >
              <Archive size={13} className="text-[#8b949e]" />
              <span>{isArchived ? 'Unarchive' : 'Archive'}</span>
            </button>

            <div className="h-px bg-[#30363d] my-1" />

            {/* Delete Trigger */}
            <button
              onClick={() => {
                setIsDeleteOpen(true);
                onClose();
              }}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-bold text-[#f85149] hover:bg-[#f85149]/10 transition-all cursor-pointer"
            >
              <Trash2 size={13} />
              <span>Delete Repository</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Form Modal */}
      {isEditOpen && (
        <EditRepositoryModal
          repo={repo}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onUpdateSuccess={() => {
            setIsEditOpen(false);
            if (onActionSuccess) onActionSuccess();
          }}
          onDeleteSuccess={() => {
            setIsEditOpen(false);
            if (onActionSuccess) onActionSuccess();
          }}
        />
      )}

      {/* Delete Form Modal */}
      {isDeleteOpen && (
        <DeleteRepositoryModal
          repo={repo}
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onDeleteSuccess={() => {
            setIsDeleteOpen(false);
            if (onActionSuccess) onActionSuccess();
          }}
        />
      )}

      {/* Visibility Change Confirmation Modal */}
      {isConfirmVisOpen && (
        <ConfirmationModal
          isOpen={isConfirmVisOpen}
          onClose={() => setIsConfirmVisOpen(false)}
          onConfirm={handleToggleVisibility}
          title="Change Visibility?"
          message={`Are you sure you want to make this repository ${visChangeType}? ${
            visChangeType === 'private'
              ? 'Only you and chosen collaborators will be able to see it.'
              : 'Anyone on the internet will be able to see this repository.'
          }`}
          confirmLabel={`Make ${visChangeType === 'private' ? 'Private' : 'Public'}`}
          isDanger={visChangeType === 'private'}
          isProcessing={isProcessing}
        />
      )}
    </>
  );
}
