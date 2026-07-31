import React, { useState, useEffect } from 'react';
import { Check, FileText, Eye } from 'lucide-react';
import Input from './common/Input';
import Button from './common/Button';
import VisibilitySelector from './VisibilitySelector';
import LanguageSelector from './LanguageSelector';
import TopicsInput from './TopicsInput';
import ReactMarkdown from 'react-markdown';
import api from '../lib/api/axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateRepository } from '../lib/redux/slices/repoSlice';

export default function RepositorySettingsForm({ repo, onUpdateSuccess, inline = false, onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    repoName: repo?.repoName || repo?.name || '',
    description: repo?.description || '',
    visibility: repo?.visibility || (repo?.isPrivate ? 'private' : 'public'),
    language: repo?.language || 'JavaScript',
    topics: repo?.topics || [],
    license: repo?.license || 'MIT',
    defaultBranch: repo?.defaultBranch || 'main',
    readmeContent: repo?.readmeContent || `# ${repo?.repoName || repo?.name || 'repo'}\n\nWelcome to your new repository!`
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showReadmePreview, setShowReadmePreview] = useState(false);

  useEffect(() => {
    if (repo) {
      setFormData({
        repoName: repo.repoName || repo.name || '',
        description: repo.description || '',
        visibility: repo.visibility || (repo.isPrivate ? 'private' : 'public'),
        language: repo.language || 'JavaScript',
        topics: repo.topics || [],
        license: repo.license || 'MIT',
        defaultBranch: repo.defaultBranch || 'main',
        readmeContent: repo.readmeContent || `# ${repo.repoName || repo.name}\n\nWelcome to your new repository!`
      });
    }
  }, [repo]);

  const validateForm = () => {
    const name = formData.repoName.trim();
    if (!name) return 'Repository name is required.';
    if (name.length < 3) return 'Repository name must be at least 3 characters.';
    const nameRegex = /^[a-zA-Z0-9._-]+$/;
    if (!nameRegex.test(name)) {
      return 'Repository name can only contain alphanumeric characters, hyphens, periods, and underscores.';
    }
    if (!formData.defaultBranch.trim()) {
      return 'Default branch is required.';
    }
    if (formData.description && formData.description.length > 350) {
      return 'Description cannot exceed 350 characters.';
    }
    if (formData.topics.length > 20) {
      return 'You can add a maximum of 20 topics.';
    }
    return null;
  };

  const isChanged = () => {
    if (!repo) return false;
    const originalName = repo.repoName || repo.name || '';
    const originalDesc = repo.description || '';
    const originalVis = repo.visibility || (repo.isPrivate ? 'private' : 'public');
    const originalLang = repo.language || 'JavaScript';
    const originalTopics = repo.topics || [];
    const originalLicense = repo.license || 'MIT';
    const originalReadme = repo.readmeContent || '';
    const originalDefaultBranch = repo.defaultBranch || 'main';

    if (formData.repoName.trim() !== originalName.trim()) return true;
    if (formData.description !== originalDesc) return true;
    if (formData.visibility !== originalVis) return true;
    if (formData.language !== originalLang) return true;
    if (formData.license !== originalLicense) return true;
    if (formData.readmeContent !== originalReadme) return true;
    if (formData.defaultBranch.trim() !== originalDefaultBranch.trim()) return true;

    if (formData.topics.length !== originalTopics.length) return true;
    const t1 = [...formData.topics].sort();
    const t2 = [...originalTopics].sort();
    for (let i = 0; i < t1.length; i++) {
      if (t1[i] !== t2[i]) return true;
    }

    return false;
  };

  const hasChanges = isChanged();
  const hasErrors = !!validateForm();
  const isDisabled = !hasChanges || hasErrors || isSaving;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    setIsSaving(true);
    try {
      const repoId = repo.repoId || repo.id || repo._id;
      const res = await api.put(`/api/repositories/${repoId}`, formData);
      toast.success('Repository updated successfully.');
      dispatch(updateRepository(res.data.repository));
      if (onUpdateSuccess) {
        onUpdateSuccess(res.data.repository);
      }
      if (onClose) onClose();
    } catch (err) {
      console.error('[RepositorySettings] Update failed:', err);
      const friendlyMsg = err.response?.status === 500
        ? 'Something went wrong while updating the repository. Please try again.'
        : (err.response?.data?.message || err.message || 'Unable to update repository. Please try again.');
      toast.error(friendlyMsg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Repository Name"
        placeholder="e.g. my-awesome-app"
        value={formData.repoName}
        onChange={(e) => setFormData({ ...formData, repoName: e.target.value })}
        disabled={isSaving}
        required
      />

      <div className="space-y-1">
        <label className="block text-2xs font-black text-[var(--text-muted)] mb-1 uppercase tracking-wide">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          disabled={isSaving}
          placeholder="Repository description..."
          className="w-full p-2.5 bg-[var(--surface-canvas)] border border-[var(--border-primary)] text-xs font-semibold text-[var(--text-primary)] rounded-lg outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all min-h-[80px] resize-y"
        />
      </div>

      <VisibilitySelector
        value={formData.visibility}
        onChange={(val) => setFormData({ ...formData, visibility: val })}
        disabled={isSaving}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="block text-2xs font-black text-[var(--text-muted)] uppercase tracking-wide">
            Default Branch
          </label>
          <input
            type="text"
            value={formData.defaultBranch}
            onChange={(e) => setFormData({ ...formData, defaultBranch: e.target.value })}
            disabled={isSaving}
            placeholder="e.g. main"
            className="w-full p-2.5 bg-[var(--surface-canvas)] border border-[var(--border-primary)] text-xs font-bold text-[var(--text-primary)] rounded-lg outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all disabled:opacity-50"
            required
          />
        </div>

        <LanguageSelector
          value={formData.language}
          onChange={(val) => setFormData({ ...formData, language: val })}
          disabled={isSaving}
        />

        <div className="space-y-1.5">
          <label className="block text-2xs font-black text-[var(--text-muted)] uppercase tracking-wide">
            License
          </label>
          <select
            value={formData.license}
            onChange={(e) => setFormData({ ...formData, license: e.target.value })}
            disabled={isSaving}
            className="w-full p-2.5 bg-[var(--surface-canvas)] border border-[var(--border-primary)] text-xs font-bold text-[var(--text-primary)] rounded-lg outline-none cursor-pointer focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all"
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

      {/* README Editor & Preview */}
      <div className="space-y-2 pt-2 border-t border-[var(--border-primary)] mt-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <FileText size={14} className="text-[var(--text-muted)]" />
            <span>README.md Preview</span>
          </label>
          <button
            type="button"
            onClick={() => setShowReadmePreview(!showReadmePreview)}
            className="flex items-center gap-1 text-2xs font-bold text-[var(--accent-primary)] hover:underline cursor-pointer"
          >
            <Eye size={12} />
            <span>{showReadmePreview ? "Edit README Source" : "Preview README"}</span>
          </button>
        </div>

        {showReadmePreview ? (
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg max-h-[200px] overflow-y-auto text-xs font-medium prose prose-invert max-w-none">
            <ReactMarkdown>{formData.readmeContent}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={formData.readmeContent}
            onChange={(e) => setFormData({ ...formData, readmeContent: e.target.value })}
            disabled={isSaving}
            placeholder="Write README content here using Markdown..."
            className="w-full p-2.5 bg-[var(--surface-canvas)] border border-[var(--border-primary)] text-xs font-mono text-[var(--text-primary)] rounded-lg outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all min-h-[120px] resize-y"
          />
        )}
      </div>

      <div className="flex gap-2 justify-end pt-3 border-t border-[var(--border-primary)]">
        {onClose && (
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
        )}
        <Button
          type="submit"
          variant="primary"
          size="sm"
          isLoading={isSaving}
          loadingText="Saving..."
          disabled={isDisabled}
          className="font-bold text-xs"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}
