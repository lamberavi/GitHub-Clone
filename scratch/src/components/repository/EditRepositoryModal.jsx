import React, { useState } from 'react';
import { Check, Edit2, X } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import api from '../../api/axios';
import toast from 'react-hot-toast';

export default function EditRepositoryModal({ repo, isOpen, onClose, onUpdateSuccess }) {
  if (!isOpen || !repo) return null;

  const [formData, setFormData] = useState({
    repoName: repo.repoName || repo.name || '',
    description: repo.description || '',
    visibility: repo.visibility || (repo.isPrivate ? 'private' : 'public'),
    language: repo.language || 'JavaScript',
    defaultBranch: repo.defaultBranch || 'main',
    license: repo.license || 'MIT'
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!formData.repoName.trim()) {
      toast.error('Repository name is required.');
      return;
    }

    setIsSaving(true);
    try {
      const repoId = repo.repoId || repo.id || repo._id;
      const res = await api.put(`/api/repositories/${repoId}`, formData);
      toast.success('Repository updated successfully!');
      if (onUpdateSuccess) onUpdateSuccess(res.data.repository || { ...repo, ...formData });
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to update repository.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
      <div className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-xl shadow-premium overflow-hidden text-[#c9d1d9]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[#30363d]">
          <h3 className="font-black text-white text-base flex items-center gap-2">
            <Edit2 size={16} className="text-[#58a6ff]" />
            <span>Edit Repository Settings</span>
          </h3>
          <button
            onClick={onClose}
            className="text-[#8b949e] hover:text-white text-xs font-bold cursor-pointer"
            disabled={isSaving}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleEditSubmit} className="p-4 space-y-4">
          <Input
            label="Repository Name"
            value={formData.repoName}
            onChange={(e) => setFormData({ ...formData, repoName: e.target.value })}
            disabled={isSaving}
            required
          />

          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            disabled={isSaving}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-2xs font-black text-[#8b949e] mb-1.5 uppercase tracking-wide">
                Visibility
              </label>
              <select
                value={formData.visibility}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                disabled={isSaving}
                className="w-full p-2 bg-[#0d1117] border border-[#30363d] text-xs font-bold text-white rounded-lg outline-none cursor-pointer"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div>
              <label className="block text-2xs font-black text-[#8b949e] mb-1.5 uppercase tracking-wide">
                Language
              </label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                disabled={isSaving}
                className="w-full p-2 bg-[#0d1117] border border-[#30363d] text-xs font-bold text-white rounded-lg outline-none cursor-pointer"
              >
                <option value="JavaScript">JavaScript</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Python">Python</option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="Rust">Rust</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Default Branch"
              value={formData.defaultBranch}
              onChange={(e) => setFormData({ ...formData, defaultBranch: e.target.value })}
              disabled={isSaving}
            />

            <div>
              <label className="block text-2xs font-black text-[#8b949e] mb-1.5 uppercase tracking-wide">
                License
              </label>
              <select
                value={formData.license}
                onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                disabled={isSaving}
                className="w-full p-2 bg-[#0d1117] border border-[#30363d] text-xs font-bold text-white rounded-lg outline-none cursor-pointer"
              >
                <option value="MIT">MIT License</option>
                <option value="Apache-2.0">Apache 2.0</option>
                <option value="GPL-3.0">GNU GPLv3</option>
                <option value="None">None</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-3 border-t border-[#30363d]">
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
              disabled={isSaving}
              className="font-bold"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              isLoading={isSaving}
              icon={Check}
              className="font-bold"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
