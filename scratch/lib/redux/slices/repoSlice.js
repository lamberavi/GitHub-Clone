import { createSlice } from '@reduxjs/toolkit';

const repoSlice = createSlice({
  name: 'repos',
  initialState: {
    repositories: [],
    hasLoaded: false, // tracks if synced with database in current session
    loading: false,
    error: null,
    activeRepoId: 'github-clone-react',
    activeBranch: 'main',
    currentPath: [], 
    selectedFile: null, 
    searchQuery: '',
    searchFilter: 'all'
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setRepositories: (state, action) => {
      state.repositories = action.payload.map(repo => ({
        id: repo.repoId,
        repoId: repo.repoId,
        name: repo.repoName,
        description: repo.description,
        isPrivate: repo.visibility === 'private',
        visibility: repo.visibility,
        stars: repo.stars || 0,
        forks: repo.forks || 0,
        ownerId: repo.ownerId,
        updatedAt: repo.updatedAt,
        createdAt: repo.createdAt,
        language: repo.language || 'JavaScript',
        languages: [{ name: repo.language || 'JavaScript', percentage: 100, color: '#f1e05a' }],
        branches: repo.branches || ['main'],
        contributors: repo.contributors || [{ username: 'ravil', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80', commits: 1 }],
        files: repo.files || { type: 'dir', name: 'root', children: [{ type: 'file', name: 'README.md', content: `# ${repo.repoName}\n\n${repo.description || ''}` }] },
        commits: repo.commits || [{ id: 'init001', author: 'ravil', message: 'Initial commit', date: new Date().toISOString(), changes: '+1 -0' }],
        issues: repo.issues || [],
        pullRequests: repo.pullRequests || [],
        isPinned: repo.isPinned || false
      }));
      state.hasLoaded = true;
      state.loading = false;
      state.error = null;
    },
    setActiveRepo: (state, action) => {
      state.activeRepoId = action.payload;
      state.activeBranch = 'main';
      state.currentPath = [];
      state.selectedFile = null;
    },
    setActiveBranch: (state, action) => {
      state.activeBranch = action.payload;
    },
    pushPath: (state, action) => {
      state.currentPath.push(action.payload);
      state.selectedFile = null;
    },
    popPath: (state) => {
      state.currentPath.pop();
      state.selectedFile = null;
    },
    setPath: (state, action) => {
      state.currentPath = action.payload;
      state.selectedFile = null;
    },
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    addRepository: (state, action) => {
      const dbRepo = action.payload;
      const newRepo = {
        id: dbRepo.repoId,
        repoId: dbRepo.repoId,
        name: dbRepo.repoName,
        description: dbRepo.description || '',
        isPrivate: dbRepo.visibility === 'private',
        visibility: dbRepo.visibility,
        stars: dbRepo.stars || 0,
        forks: dbRepo.forks || 0,
        ownerId: dbRepo.ownerId,
        updatedAt: dbRepo.updatedAt,
        createdAt: dbRepo.createdAt,
        language: dbRepo.language || 'JavaScript',
        languages: [{ name: dbRepo.language || 'JavaScript', percentage: 100, color: '#f1e05a' }],
        branches: ['main'],
        contributors: [{ username: 'ravil', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80', commits: 1 }],
        files: { type: 'dir', name: 'root', children: [{ type: 'file', name: 'README.md', content: `# ${dbRepo.repoName}\n\n${dbRepo.description || ''}` }] },
        commits: [{ id: 'init001', author: 'ravil', message: 'Initial commit', date: new Date().toISOString(), changes: '+1 -0' }],
        issues: [],
        pullRequests: [],
        isPinned: dbRepo.isPinned || false
      };
      state.repositories.unshift(newRepo);
    },
    updateRepository: (state, action) => {
      const dbRepo = action.payload;
      const index = state.repositories.findIndex(r => r.repoId === dbRepo.repoId || r.id === dbRepo.repoId);
      if (index !== -1) {
        state.repositories[index] = {
          ...state.repositories[index],
          id: dbRepo.repoId,
          repoId: dbRepo.repoId,
          name: dbRepo.repoName,
          description: dbRepo.description,
          isPrivate: dbRepo.visibility === 'private',
          visibility: dbRepo.visibility,
          language: dbRepo.language,
          stars: dbRepo.stars,
          forks: dbRepo.forks,
          isPinned: dbRepo.isPinned
        };
      }
    },
    deleteRepository: (state, action) => {
      const repoId = action.payload;
      state.repositories = state.repositories.filter(r => r.repoId !== repoId && r.id !== repoId);
    },
    addBranch: (state, action) => {
      const repo = state.repositories.find(r => r.id === state.activeRepoId || r.repoId === state.activeRepoId);
      if (repo && !repo.branches.includes(action.payload)) {
        repo.branches.push(action.payload);
        state.activeBranch = action.payload;
      }
    },
    addCommit: (state, action) => {
      const repo = state.repositories.find(r => r.id === state.activeRepoId || r.repoId === state.activeRepoId);
      if (repo) {
        repo.commits.unshift({
          id: Math.random().toString(16).substring(2, 9),
          author: 'ravil',
          message: action.payload.message,
          date: new Date().toISOString(),
          changes: action.payload.changes || '+1 -0'
        });
      }
    },
    updateFileContent: (state, action) => {
      const { filepath, content } = action.payload;
      const repo = state.repositories.find(r => r.id === state.activeRepoId || r.repoId === state.activeRepoId);
      if (repo && state.selectedFile) {
        state.selectedFile.content = content;
        const updateNestedFile = (node, pathParts, fileContent) => {
          if (pathParts.length === 1) {
            const file = node.children.find(c => c.type === 'file' && c.name === pathParts[0]);
            if (file) file.content = fileContent;
            return;
          }
          const nextDir = node.children.find(c => c.type === 'dir' && c.name === pathParts[0]);
          if (nextDir) {
            updateNestedFile(nextDir, pathParts.slice(1), fileContent);
          }
        };
        const pathParts = [...state.currentPath, state.selectedFile.name];
        updateNestedFile(repo.files, pathParts, content);
      }
    },
    addIssue: (state, action) => {
      const repo = state.repositories.find(r => r.id === state.activeRepoId || r.repoId === state.activeRepoId);
      if (repo) {
        const nextId = repo.issues.length + 1;
        repo.issues.unshift({
          id: nextId,
          title: action.payload.title,
          status: 'open',
          author: 'ravil',
          comments: 0,
          labels: action.payload.labels || [],
          priority: action.payload.priority || 'Medium',
          date: new Date().toISOString(),
          commentsList: []
        });
      }
    },
    closeIssue: (state, action) => {
      const repo = state.repositories.find(r => r.id === state.activeRepoId || r.repoId === state.activeRepoId);
      if (repo) {
        const issue = repo.issues.find(i => i.id === action.payload);
        if (issue) issue.status = 'closed';
      }
    },
    addIssueComment: (state, action) => {
      const { issueId, commentText } = action.payload;
      const repo = state.repositories.find(r => r.id === state.activeRepoId || r.repoId === state.activeRepoId);
      if (repo) {
        const issue = repo.issues.find(i => i.id === issueId);
        if (issue) {
          issue.comments += 1;
          if (!issue.commentsList) issue.commentsList = [];
          issue.commentsList.push({
            author: 'ravil',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
            text: commentText,
            date: new Date().toISOString()
          });
        }
      }
    },
    addPullRequest: (state, action) => {
      const repo = state.repositories.find(r => r.id === state.activeRepoId || r.repoId === state.activeRepoId);
      if (repo) {
        const nextId = repo.pullRequests.length + 1;
        repo.pullRequests.unshift({
          id: nextId,
          title: action.payload.title,
          status: 'open',
          author: 'ravil',
          number: nextId,
          date: new Date().toISOString(),
          sourceBranch: action.payload.sourceBranch,
          targetBranch: action.payload.targetBranch,
          comments: 0,
          fileDiffs: action.payload.fileDiffs || []
        });
      }
    },
    mergePullRequest: (state, action) => {
      const repo = state.repositories.find(r => r.id === state.activeRepoId || r.repoId === state.activeRepoId);
      if (repo) {
        const pr = repo.pullRequests.find(p => p.id === action.payload);
        if (pr) {
          pr.status = 'merged';
          repo.commits.unshift({
            id: Math.random().toString(16).substring(2, 9),
            author: 'ravil',
            message: `Merge pull request #${pr.number} from ${pr.sourceBranch}`,
            date: new Date().toISOString(),
            changes: '+12 -4'
          });
        }
      }
    },
    setSearch: (state, action) => {
      state.searchQuery = action.payload.query;
      state.searchFilter = action.payload.filter || 'all';
    }
  }
});

export const {
  setLoading,
  setError,
  setRepositories,
  setActiveRepo,
  setActiveBranch,
  pushPath,
  popPath,
  setPath,
  setSelectedFile,
  addRepository,
  updateRepository,
  deleteRepository,
  addBranch,
  addCommit,
  updateFileContent,
  addIssue,
  closeIssue,
  addIssueComment,
  addPullRequest,
  mergePullRequest,
  setSearch
} = repoSlice.actions;

export default repoSlice.reducer;
