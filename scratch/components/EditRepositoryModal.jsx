import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit2 } from 'lucide-react';
import RepositorySettingsForm from './RepositorySettingsForm';
import DangerZone from './DangerZone';

export default function EditRepositoryModal({
  repo,
  isOpen,
  onClose,
  onUpdateSuccess,
  onDeleteSuccess
}) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !repo) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative w-full max-w-[650px] bg-[#161b22] border border-[#30363d] rounded-2xl shadow-2xl overflow-hidden text-[#c9d1d9] max-h-[85vh] flex flex-col z-10"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-[#30363d] bg-[#0d1117]/50 shrink-0">
            <h3 className="font-extrabold text-sm flex items-center gap-2 text-white">
              <Edit2 size={16} className="text-[var(--accent-primary)]" />
              <span>Repository Settings</span>
            </h3>
            <button
              onClick={onClose}
              className="text-[#8b949e] hover:text-white cursor-pointer transition-colors outline-none"
            >
              <X size={16} />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="p-5 space-y-6 overflow-y-auto flex-1">
            <RepositorySettingsForm
              repo={repo}
              onUpdateSuccess={onUpdateSuccess}
              onClose={onClose}
            />

            <div className="pt-4 border-t border-[#30363d] mt-4">
              <DangerZone
                repo={repo}
                onDeleteSuccess={() => {
                  if (onDeleteSuccess) onDeleteSuccess();
                  onClose();
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
