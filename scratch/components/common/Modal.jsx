import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Button from './Button';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md'
}) {
  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
    '3xl': 'max-w-3xl'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/60 dark:bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Panel Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`w-full ${sizes[size]} glass-panel border border-github-light-border dark:border-github-dark-border custom-shadow rounded-xl overflow-hidden relative z-10`}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-github-light-border/60 dark:border-github-dark-border/60 flex items-center justify-between">
              <h3 className="font-semibold text-base text-github-light-text dark:text-github-dark-text">
                {title}
              </h3>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg text-github-light-textMuted dark:text-github-dark-textMuted hover:text-github-light-text dark:hover:text-github-dark-text transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-4 overflow-y-auto max-h-[70vh]">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-5 py-3.5 bg-neutral-50 dark:bg-github-dark-sidebar/40 border-t border-github-light-border/60 dark:border-github-dark-border/60 flex justify-end gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
