export const resolveAvatarUrl = (avatarPath) => {
  if (!avatarPath) return 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80';
  if (avatarPath.startsWith('/uploads')) {
    // Vite serves frontend on 5173, so prefix with backend api URL
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    return `${apiBase.replace(/\/$/, '')}${avatarPath}`;
  }
  return avatarPath;
};
