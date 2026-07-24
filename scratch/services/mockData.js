// Mock Database for GitHub Clone Frontend

export const currentUser = {
  username: 'ravil',
  fullName: 'Ravil Kumar',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  bio: 'Full Stack Engineer & OSS Enthusiast. Building antigravity apps 🚀',
  company: 'Antigravity Labs',
  location: 'Bangalore, India',
  email: 'ravil@antigravity.io',
  website: 'https://antigravity.io',
  twitter: 'ravil_kumar',
  followers: 1240,
  following: 382,
  organizations: [
    { name: 'Antigravity Core', logo: 'AC' },
    { name: 'Vite Ecosystem', logo: 'VE' },
    { name: 'Tailwind Labs', logo: 'TL' }
  ],
  achievements: [
    { name: 'Pull Shark', icon: '🦈', desc: 'Opened PRs that were merged' },
    { name: 'Quickdraw', icon: '🤠', desc: 'Closed an issue within 5 mins' },
    { name: 'YOLO', icon: '🛹', desc: 'Merged PR without review' },
    { name: 'Arctic Code Vault', icon: '❄️', desc: 'Contributed to 2026 vault' }
  ],
  pinnedRepos: ['github-clone-react', 'react-framer-boilerplate', 'tailwind-glassmorphism', 'monaco-diff-viewer']
};

export const initialRepositories = [
  {
    id: 'github-clone-react',
    name: 'github-clone-react',
    description: 'A premium, state-of-the-art client-side GitHub clone built with React, Vite, Tailwind CSS, and Monaco Editor. Features animations, markdown preview, issues, and PR reviews.',
    isPrivate: false,
    stars: 284,
    forks: 43,
    watchers: 12,
    owner: 'ravil',
    updatedAt: '2026-07-22T10:00:00Z',
    languages: [
      { name: 'JavaScript', percentage: 68.2, color: '#f1e05a' },
      { name: 'CSS', percentage: 24.5, color: '#563d7c' },
      { name: 'HTML', percentage: 7.3, color: '#e34c26' }
    ],
    branches: ['main', 'dev', 'feature/sidebar-navigation', 'fix/monaco-theme'],
    contributors: [
      { username: 'ravil', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80', commits: 54 },
      { username: 'alex_dev', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', commits: 12 },
      { username: 'sarah_m', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80', commits: 8 }
    ],
    files: {
      type: 'dir',
      name: 'root',
      children: [
        {
          type: 'dir',
          name: 'src',
          children: [
            {
              type: 'dir',
              name: 'components',
              children: [
                {
                  type: 'file',
                  name: 'Button.jsx',
                  content: `import React from 'react';\nimport { motion } from 'framer-motion';\n\nexport const Button = ({ children, onClick, variant = 'primary', className = '' }) => {\n  const baseStyle = 'px-4 py-2 rounded-md font-medium text-sm transition-all duration-200';\n  const variants = {\n    primary: 'bg-github-dark-accent text-white hover:bg-opacity-90 border border-transparent shadow-sm',\n    secondary: 'bg-github-dark-border text-github-dark-text hover:bg-opacity-80 border border-github-dark-borderMuted',\n    danger: 'bg-github-dark-danger text-white hover:bg-opacity-90'\n  };\n\n  return (\n    <motion.button\n      whileTap={{ scale: 0.98 }}\n      onClick={onClick}\n      className={\`\${baseStyle} \${variants[variant]} \${className}\`}\n    >\n      {children}\n    </motion.button>\n  );\n};`
                },
                {
                  type: 'file',
                  name: 'Modal.jsx',
                  content: `import React from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { X } from 'lucide-react';\n\nexport const Modal = ({ isOpen, onClose, title, children }) => {\n  return (\n    <AnimatePresence>\n      {isOpen && (\n        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">\n          <motion.div\n            initial={{ opacity: 0, scale: 0.95 }}\n            animate={{ opacity: 1, scale: 1 }}\n            exit={{ opacity: 0, scale: 0.95 }}\n            className="w-full max-w-lg overflow-hidden border rounded-lg bg-github-dark-sidebar border-github-dark-border shadow-xl"\n          >\n            <div className="flex items-center justify-between p-4 border-b border-github-dark-border">\n              <h3 className="font-semibold text-github-dark-text">{title}</h3>\n              <button onClick={onClose} className="p-1 hover:bg-github-dark-border rounded text-github-dark-textMuted">\n                <X size={18} />\n              </button>\n            </div>\n            <div className="p-4">{children}</div>\n          </motion.div>\n        </div>\n      )}\n    </AnimatePresence>\n  );\n};`
                }
              ]
            },
            {
              type: 'file',
              name: 'App.jsx',
              content: `import React from 'react';\nimport { Routes, Route } from 'react-router-dom';\nimport Dashboard from './pages/Dashboard';\n\nfunction App() {\n  return (\n    <div className="min-h-screen text-slate-100 bg-slate-950 font-sans">\n      <Routes>\n        <Route path="/" element={<Dashboard />} />\n      </Routes>\n    </div>\n  );\n}\n\nexport default App;`
            }
          ]
        },
        {
          type: 'file',
          name: 'README.md',
          content: `# GitHub Clone Frontend (React + Vite)\n\nWelcome to the next-generation GitHub Clone frontend. This project implements a fully functional client-side environment featuring:\n\n* **Responsive Design**: Designed Mobile-First supporting breakpoints up to 1536px.\n* **Design System**: Beautiful glassmorphic themes with Tailwind CSS.\n* **State Management**: Redux Toolkit drives navigation, mock updates, and theme configurations.\n* **Monaco Editor**: High fidelity files editing directly in-browser.\n* **Animated Overlays**: Powered by Framer Motion.\n\n### Running Locally\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\nEnjoy the workspace! 🚀`
        },
        {
          type: 'file',
          name: 'package.json',
          content: `{\n  "name": "github-clone-react",\n  "private": true,\n  "version": "1.0.0",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build"\n  },\n  "dependencies": {\n    "@monaco-editor/react": "^4.6.0",\n    "@reduxjs/toolkit": "^2.2.0",\n    "framer-motion": "^11.0.0",\n    "lucide-react": "^0.300.0",\n    "react": "^18.3.0",\n    "react-dom": "^18.3.0",\n    "react-router-dom": "^6.22.0"\n  }\n}`
        }
      ]
    },
    commits: [
      { id: 'c1a2b3c', author: 'ravil', message: 'feat: add monaco editor support for file view', date: '2026-07-22T09:40:00Z', changes: '+24 -2' },
      { id: 'f4e5d6c', author: 'ravil', message: 'style: enhance dark/light themes with glassmorphic cards', date: '2026-07-21T18:15:00Z', changes: '+94 -45' },
      { id: 'a8b9c0d', author: 'alex_dev', message: 'fix: align sidebar buttons correctly on narrow viewports', date: '2026-07-20T14:22:00Z', changes: '+5 -5' },
      { id: '1a2b3c4', author: 'ravil', message: 'initial commit: scaffold React + Vite configuration', date: '2026-07-19T08:00:00Z', changes: '+120 -0' }
    ],
    issues: [
      { id: 1, title: 'Tailwind dark theme doesn\'t activate correctly on initial load', status: 'open', author: 'alex_dev', comments: 3, labels: ['bug', 'ui'], priority: 'High', date: '2026-07-21T12:00:00Z' },
      { id: 2, title: 'Implement full-screen toggle for Monaco file editor', status: 'closed', author: 'ravil', comments: 1, labels: ['enhancement'], priority: 'Medium', date: '2026-07-20T15:00:00Z' },
      { id: 3, title: 'Mobile drawer navbar overlaps main headers', status: 'open', author: 'sarah_m', comments: 0, labels: ['bug', 'responsive'], priority: 'Critical', date: '2026-07-22T08:30:00Z' }
    ],
    pullRequests: [
      {
        id: 1,
        title: 'feat: add Framer Motion transitions for layouts and pages',
        status: 'open',
        author: 'ravil',
        number: 4,
        date: '2026-07-22T05:00:00Z',
        sourceBranch: 'feature/transitions',
        targetBranch: 'main',
        comments: 2,
        fileDiffs: [
          { filepath: 'src/App.jsx', additions: 15, deletions: 2, content: `@@ -1,7 +1,20 @@\n import React from 'react';\n+import { motion, AnimatePresence } from 'framer-motion';\n import { Routes, Route, useLocation } from 'react-router-dom';\n \n function App() {\n+  const location = useLocation();\n   return (\n-    <div className="min-h-screen">\n-      <Routes>\n-        <Route path="/" element={<Dashboard />} />\n-      </Routes>\n+    <AnimatePresence mode="wait">\n+      <motion.div\n+        key={location.pathname}\n+        initial={{ opacity: 0 }}\n+        animate={{ opacity: 1 }}\n+        exit={{ opacity: 0 }}\n+      >\n+        <Routes location={location}>\n+          <Route path="/" element={<Dashboard />} />\n+        </Routes>\n+      </motion.div>\n+    </AnimatePresence>\n   );\n }` }
        ]
      },
      {
        id: 2,
        title: 'docs: clarify licensing and local contribution workflow',
        status: 'merged',
        author: 'alex_dev',
        number: 3,
        date: '2026-07-20T11:00:00Z',
        sourceBranch: 'docs/contribution-guidelines',
        targetBranch: 'main',
        comments: 1,
        fileDiffs: [
          { filepath: 'README.md', additions: 8, deletions: 0, content: `@@ -12,2 +12,10 @@\n Enjoy the workspace! 🚀\n+\n+## Contributing\n+1. Fork the repository\n+2. Create your branch (\`git checkout -b feature/amazing-feature\`)\n+3. Commit changes (\`git commit -m 'feat: Add amazing feature'\`)\n+4. Push to branch (\`git push origin feature/amazing-feature\`)\n+5. Open a Pull Request` }
        ]
      }
    ]
  },
  {
    id: 'react-framer-boilerplate',
    name: 'react-framer-boilerplate',
    description: 'An opinionated template incorporating React Router, Redux Toolkit, Framer Motion, and Tailwind CSS. Built to start fluid interfaces in seconds.',
    isPrivate: false,
    stars: 124,
    forks: 14,
    watchers: 5,
    owner: 'ravil',
    updatedAt: '2026-07-15T15:30:00Z',
    languages: [
      { name: 'JavaScript', percentage: 92.0, color: '#f1e05a' },
      { name: 'HTML', percentage: 8.0, color: '#e34c26' }
    ],
    branches: ['main'],
    commits: [],
    issues: [],
    pullRequests: [],
    contributors: [{ username: 'ravil', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80', commits: 12 }],
    files: { type: 'dir', name: 'root', children: [] }
  },
  {
    id: 'tailwind-glassmorphism',
    name: 'tailwind-glassmorphism',
    description: 'A playground and utility CSS library extensions for making high-end glassmorphic UIs. Easily control transparency, blur, borders, and backdrop saturation.',
    isPrivate: false,
    stars: 94,
    forks: 8,
    watchers: 2,
    owner: 'ravil',
    updatedAt: '2026-07-12T08:00:00Z',
    languages: [
      { name: 'CSS', percentage: 100.0, color: '#563d7c' }
    ],
    branches: ['main'],
    commits: [],
    issues: [],
    pullRequests: [],
    contributors: [{ username: 'ravil', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80', commits: 8 }],
    files: { type: 'dir', name: 'root', children: [] }
  }
];

export const mockNotifications = [
  { id: 1, type: 'issue', repo: 'github-clone-react', title: 'alex_dev commented on: Tailwind dark theme doesn\'t activate...', unread: true, date: '2026-07-22T10:15:00Z' },
  { id: 2, type: 'pr', repo: 'github-clone-react', title: 'sarah_m requested a review on: feat: add Framer Motion transitions...', unread: true, date: '2026-07-22T09:02:00Z' },
  { id: 3, type: 'mention', repo: 'github-clone-react', title: 'alex_dev mentioned you in a commit comment: c1a2b3c', unread: false, date: '2026-07-21T16:30:00Z' }
];

export const mockTrending = [
  { name: 'framer/motion', stars: 22402, language: 'TypeScript', color: '#3178c6', desc: 'A popular open source animation library for React apps.' },
  { name: 'tailwindlabs/tailwindcss', stars: 81903, language: 'CSS', color: '#563d7c', desc: 'A utility-first CSS framework for rapid UI development.' },
  { name: 'reduxjs/redux-toolkit', stars: 10920, language: 'TypeScript', color: '#3178c6', desc: 'The official, opinionated, batteries-included toolset for efficient Redux development.' }
];

export const mockContributionWeeks = Array.from({ length: 53 }, (_, weekIdx) => {
  return Array.from({ length: 7 }, (_, dayIdx) => {
    // Generate a random contribution count skewed towards 0 and smaller values
    const randVal = Math.random();
    let count = 0;
    if (randVal > 0.85) count = Math.floor(Math.random() * 8) + 4;
    else if (randVal > 0.6) count = Math.floor(Math.random() * 4) + 1;
    
    // Assign HSL colors based on intensity
    let colorClass = 'bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/20'; // none
    if (count > 0 && count <= 2) colorClass = 'bg-emerald-200 dark:bg-emerald-950/60 border border-emerald-300/10';
    else if (count > 2 && count <= 5) colorClass = 'bg-emerald-400 dark:bg-emerald-800/80 border border-emerald-400/10';
    else if (count > 5 && count <= 8) colorClass = 'bg-emerald-600 dark:bg-emerald-600 border border-emerald-500/10';
    else if (count > 8) colorClass = 'bg-emerald-800 dark:bg-emerald-400 border border-emerald-400/20';

    return {
      count,
      colorClass,
      date: new Date(2025, 6, 22 + weekIdx * 7 + dayIdx).toISOString().split('T')[0]
    };
  });
});
