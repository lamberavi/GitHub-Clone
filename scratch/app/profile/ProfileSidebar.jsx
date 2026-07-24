import React, { useState, useRef } from 'react';
import { 
  Users, MapPin, Building, Globe, Mail, Edit3, Award, ShieldCheck, Check, Camera, Loader2, Link as LinkIcon 
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import api from '../../lib/api/axios';
import toast from 'react-hot-toast';

export default function ProfileSidebar({ user, onUpdateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    bio: user?.bio || '',
    company: user?.company || '',
    location: user?.location || '',
    website: user?.website || ''
  });

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await api.put('/api/profile/update', formData);
      toast.success('Profile updated successfully!');
      if (onUpdateUser) onUpdateUser(res.data.user);
      setIsEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('avatar', file);

    setIsUploadingAvatar(true);
    try {
      const res = await api.post('/api/upload/avatar', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Profile avatar uploaded!');
      const updatedPhoto = res.data.avatarUrl;
      if (onUpdateUser) {
        onUpdateUser({ ...user, photo: updatedPhoto, avatar: updatedPhoto, avatarUrl: updatedPhoto });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Avatar upload failed.');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const displayName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.displayName || 'Developer';
  const username = user?.username || 'user';
  const rawPhoto = user?.photo || user?.avatarUrl || user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80';
  const photo = rawPhoto.startsWith('/uploads') ? `http://localhost:5000${rawPhoto}` : rawPhoto;

  return (
    <div className="space-y-6 text-[#c9d1d9] select-none">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Avatar and User Name */}
      <div className="space-y-4">
        <div className="relative group w-48 h-48 sm:w-64 sm:h-64 lg:w-full lg:h-auto aspect-square mx-auto lg:mx-0">
          <img
            src={photo}
            alt={displayName}
            className="w-full h-full rounded-full border-2 border-[#30363d] object-cover shadow-glow transition-transform duration-300 group-hover:scale-[1.02]"
          />
          
          {/* Avatar Upload Camera Trigger Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploadingAvatar}
            className="absolute bottom-2 left-2 p-2 bg-[#161b22] border border-[#30363d] rounded-full shadow-lg text-[#58a6ff] hover:text-white transition-colors cursor-pointer"
            title="Upload Profile Picture"
          >
            {isUploadingAvatar ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
          </button>

          <div className="absolute bottom-2 right-2 p-2 bg-[#161b22] border border-[#30363d] rounded-full shadow-lg text-emerald-400" title="Verified Account">
            <ShieldCheck size={16} />
          </div>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
            {displayName}
          </h1>
          <h2 className="text-sm font-semibold text-[#8b949e]">@{username}</h2>
        </div>
      </div>

      {/* Edit Profile Button */}
      <Button
        variant="secondary"
        size="sm"
        className="w-full font-bold border-[#30363d] hover:bg-[#21262d] py-1.5"
        icon={Edit3}
        onClick={() => setIsEditing(true)}
      >
        Edit profile
      </Button>

      {/* Biography */}
      {user?.bio && (
        <p className="text-xs text-[#c9d1d9] leading-relaxed font-semibold">
          {user.bio}
        </p>
      )}

      {/* Followers stats */}
      <div className="flex items-center gap-3 text-xs text-[#8b949e] font-semibold border-b border-[#30363d] pb-4">
        <span className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer">
          <Users size={14} />
          <strong className="text-white">{user?.followersCount || user?.followers || 124}</strong> followers
        </span>
        <span>·</span>
        <span className="hover:text-[#58a6ff] cursor-pointer">
          <strong className="text-white">{user?.followingCount || user?.following || 38}</strong> following
        </span>
      </div>

      {/* Details Meta Links */}
      <div className="space-y-2 text-xs font-semibold text-[#8b949e]">
        {user?.company && (
          <div className="flex items-center gap-2">
            <Building size={14} className="shrink-0 text-[#8b949e]" />
            <span className="truncate text-white">{user.company}</span>
          </div>
        )}
        {user?.location && (
          <div className="flex items-center gap-2">
            <MapPin size={14} className="shrink-0 text-[#8b949e]" />
            <span className="truncate text-white">{user.location}</span>
          </div>
        )}
        {user?.email && (
          <div className="flex items-center gap-2">
            <Mail size={14} className="shrink-0 text-[#8b949e]" />
            <span className="truncate text-white">{user.email}</span>
          </div>
        )}
        {user?.website && (
          <div className="flex items-center gap-2">
            <Globe size={14} className="shrink-0 text-[#8b949e]" />
            <a
              href={user.website.startsWith('http') ? user.website : `https://${user.website}`}
              target="_blank"
              rel="noreferrer"
              className="truncate text-[#58a6ff] hover:underline"
            >
              {user.website}
            </a>
          </div>
        )}
      </div>

      {/* Achievements Badges */}
      <div className="border-t border-[#30363d] pt-4 space-y-2">
        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Achievements</h3>
        <div className="flex items-center gap-2 pt-1">
          <div className="p-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400" title="Pull Shark">
            <Award size={18} />
          </div>
          <div className="p-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400" title="Pair Extraordinaire">
            <ShieldCheck size={18} />
          </div>
          <div className="p-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400" title="Arctic Code Vault Contributor">
            <LinkIcon size={18} />
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-xl shadow-premium overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-[#30363d]">
              <h3 className="font-black text-white text-base">Edit User Profile</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-[#8b949e] hover:text-white text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  disabled={isSaving}
                />
                <Input
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  disabled={isSaving}
                />
              </div>

              <div>
                <label className="block text-2xs font-black text-[#8b949e] mb-1 uppercase tracking-wide">
                  Bio
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full p-2 bg-[#0d1117] border border-[#30363d] text-xs font-semibold text-white rounded-lg outline-none focus:border-[#58a6ff]"
                  placeholder="Add a bio..."
                  disabled={isSaving}
                />
              </div>

              <Input
                label="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                disabled={isSaving}
              />

              <Input
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                disabled={isSaving}
              />

              <Input
                label="Website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                disabled={isSaving}
              />

              <div className="flex gap-2 justify-end pt-2 border-t border-[#30363d]">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditing(false)}
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
                  Save Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
