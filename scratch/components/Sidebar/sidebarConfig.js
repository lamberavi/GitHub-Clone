import { 
  Home, CircleDot, GitPullRequest, BookOpen, Folder, 
  MessageSquare, Laptop, Bot, Compass, Gift, Puzzle 
} from 'lucide-react';

export const sidebarConfig = [
  // Section 1: Core Navigation
  {
    title: '',
    items: [
      { id: 'home', title: 'Home', icon: Home, path: '/dashboard' },
      { id: 'issues', title: 'All Issues', icon: CircleDot, path: '/issues' },
      { id: 'pulls', title: 'All Pull Requests', icon: GitPullRequest, path: '/pull-requests' },
      { id: 'repos', title: 'All Repositories', icon: BookOpen, path: '/repositories' },
      { id: 'projects', title: 'Projects', icon: Folder, path: '/projects' },
      { id: 'discussions', title: 'Discussions', icon: MessageSquare, path: '/discussions' },
      { id: 'codespaces', title: 'Codespaces', icon: Laptop, path: '/codespaces' },
      { id: 'copilot', title: 'Copilot', icon: Bot, path: '/copilot' }
    ]
  },
  // Section 2: Explore & Marketplace
  {
    title: 'Explore',
    items: [
      { id: 'explore', title: 'Explore', icon: Compass, path: '/explore' },
      { id: 'marketplace', title: 'Marketplace', icon: Gift, path: '/marketplace' },
      { id: 'mcp-registry', title: 'MCP Registry', icon: Puzzle, path: '/mcp-registry' }
    ]
  }
];

export default sidebarConfig;
