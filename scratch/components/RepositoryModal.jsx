import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, FolderPlus } from 'lucide-react';
import Button from './common/Button';
import Input from './common/Input';
import VisibilitySelector from './VisibilitySelector';
import LanguageSelector from './LanguageSelector';
import TopicsInput from './TopicsInput';
import api from '../lib/api/axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addRepository } from '../lib/redux/slices/repoSlice';

export default function RepositoryModal({ 
  isOpen, 
  onClose, 
  onSuccess 
}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    visibility: 'public',
    language: 'JavaScript',
    license: 'MIT',
    topics: []
  });
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Repository name is required.');
      return;
    }

    const nameRegex = /^[a-zA-Z0-9._-]+$/;
    if (!nameRegex.test(formData.name.trim())) {
      toast.error('Repository name can only contain letters, numbers, hyphens, periods, and underscores.');
      return;
    }

    setIsSaving(true);
    try {
      const res = await api.post('/api/profile/repos/create', {
        repoName: formData.name,
        description: formData.description,
        visibility: formData.visibility,
        language: formData.language,
        license: formData.license,
        topics: formData.topics
      });

      dispatch(addRepository(res.data.repository));
      toast.success('Repository created successfully!');
      
      // Clear form
      setFormData({
        name: '',
        description: '',
        visibility: 'public',
        language: 'JavaScript',
        license: 'MIT',
        topics: []
      });

      if (onSuccess) onSuccess(res.data.repository);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to create repository.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-lg bg-[#161b22] border border-[#30363d] rounded-2xl shadow-2xl overflow-hidden text-[#c9d1d9] max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[#30363d]">
          <h3 className="font-extrabold text-sm sm:text-base flex items-center gap-2 text-white">
            <FolderPlus size={18} className="text-[var(--accent-primary)]" />
            <span>Create a new repository</span>
          </h3>
          <button
            onClick={onClose}
            className="text-[#8b949e] hover:text-white text-xs font-bold cursor-pointer transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto flex-1 text-left">
          <Input
            label="Repository Name"
            placeholder="e.g. my-awesome-app"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={isSaving}
            required
          />

          <div className="space-y-1">
            <label className="block text-2xs font-black text-[var(--text-muted)] mb-1 uppercase tracking-wide">
              Description (optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={isSaving}
              placeholder="Provide a short description..."
              className="w-full p-2.5 bg-[var(--surface-canvas)] border border-[var(--border-primary)] text-xs font-semibold text-[var(--text-primary)] rounded-xl outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all min-h-[60px] resize-y"
            />
          </div>

          <VisibilitySelector
            value={formData.visibility}
            onChange={(val) => setFormData({ ...formData, visibility: val })}
            disabled={isSaving}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <LanguageSelector
              value={formData.language}
              onChange={(val) => setFormData({ ...formData, language: val })}
              disabled={isSaving}
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[var(--text-primary)]">
                License
              </label>
              <select
                value={formData.license}
                onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                disabled={isSaving}
                className="w-full p-2.5 bg-[var(--surface-canvas)] border border-[var(--border-primary)] text-xs font-bold text-[var(--text-primary)] rounded-xl outline-none cursor-pointer focus:border-[var(--accent-primary)] transition-all"
              >
                <option value="MIT">MIT License</option>
                <option value="Apache-2.0">Apache License 2.0</option>
                <option value="GPL-3.0">GNU GPLv3</option>
                <option value="None">None</option>
              </select>
            </div>
          </div>

          <TopicsInput
            topics={formData.topics}
            onChange={(val) => setFormData({ ...formData, topics: val })}
            disabled={isSaving}
          />

          {/* Footer Actions */}
          <div className="flex gap-2 justify-end pt-3 border-t border-[#30363d]">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onClose}
              disabled={isSaving}
              className="font-bold text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isSaving}
              className="font-bold text-xs py-2 px-4 rounded-xl"
            >
              Create Repository
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
