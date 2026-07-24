import { 
  User, BookOpen, Star, Code, Building, Globe, Heart, 
  Settings, Bot, Sparkles, Palette, Eye, ShieldCheck, Smile 
} from 'lucide-react';

export const profileMenuItems = [
  // Section 1: Main Features
  {
    section: 'main',
    items: [
      { id: 'profile', title: 'Your Profile', icon: User, path: '/profile' },
      { id: 'repositories', title: 'Your Repositories', icon: BookOpen, path: '/repositories' },
      { id: 'stars', title: 'Your Stars', icon: Star, path: '/stars' },
      { id: 'gists', title: 'Your Gists', icon: Code, path: '/gists' },
      { id: 'organizations', title: 'Your Organizations', icon: Building, path: '/organizations' },
      { id: 'enterprises', title: 'Your Enterprises', icon: Globe, path: '/enterprises' },
      { id: 'sponsors', title: 'Your Sponsors', icon: Heart, path: '/sponsors' }
    ]
  },
  // Section 2: Preferences & Settings
  {
    section: 'settings',
    items: [
      { id: 'settings', title: 'Settings', icon: Settings, path: '/settings' },
      { id: 'copilot', title: 'Copilot Settings', icon: Bot, path: '/copilot' },
      { id: 'feature-preview', title: 'Feature Preview', icon: Sparkles, path: '/feature-preview' },
      { id: 'appearance', title: 'Appearance', icon: Palette, path: '/appearance' },
      { id: 'accessibility', title: 'Accessibility', icon: Eye, path: '/accessibility' },
      { id: 'enterprise', title: 'Try Enterprise', icon: ShieldCheck, path: '/enterprise', badge: 'Free Trial' }
    ]
  }
];

export default profileMenuItems;
