import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import Button from './common/Button';

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDanger = false,
  isProcessing = false
}) {
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
      if (e.key === 'Escape' && isOpen && !isProcessing) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isProcessing]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => {
            if (!isProcessing) onClose();
          }}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className={`relative w-full max-w-md bg-[#161b22] border rounded-2xl shadow-2xl overflow-hidden text-[#c9d1d9] z-10 ${
            isDanger ? 'border-[#f85149]/30' : 'border-[#30363d]'
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-[#30363d] bg-[#0d1117]/50">
            <h3 className={`font-extrabold text-sm flex items-center gap-2 ${isDanger ? 'text-[#f85149]' : 'text-white'}`}>
              {isDanger && <AlertTriangle size={16} />}
              <span>{title}</span>
            </h3>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="text-[#8b949e] hover:text-white cursor-pointer transition-colors outline-none disabled:opacity-50"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4">
            <p className="text-xs font-semibold text-[var(--text-muted)] leading-relaxed">
              {message}
            </p>

            {/* Actions */}
            <div className="flex gap-2 justify-end pt-3 border-t border-[#30363d]">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={onClose}
                disabled={isProcessing}
                className="font-bold text-xs"
              >
                {cancelLabel}
              </Button>
              <Button
                type="button"
                variant={isDanger ? 'danger' : 'primary'}
                size="sm"
                onClick={onConfirm}
                isLoading={isProcessing}
                className="font-bold text-xs"
              >
                {confirmLabel}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
