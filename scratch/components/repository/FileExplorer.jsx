import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Folder, FileText, ArrowLeft, FileCode } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { pushPath, popPath, setPath, setSelectedFile } from '../../lib/redux/slices/repoSlice';

export default function FileExplorer({ filesNode, commits = [] }) {
  const dispatch = useDispatch();
  const { currentPath } = useSelector((state) => state.repos);

  // Helper to traverse the files tree according to the currentPath array
  const getCurrentDirectory = () => {
    let current = filesNode;
    for (const folder of currentPath) {
      if (current.children) {
        const found = current.children.find(
          (c) => c.type === 'dir' && c.name === folder
        );
        if (found) current = found;
      }
    }
    return current;
  };

  const currentDir = getCurrentDirectory();
  const latestCommit = commits[0] || { author: 'ravil', message: 'Update codebase files', date: new Date().toISOString() };

  // Find README.md in current directory
  const readmeFile = currentDir.children?.find(
    (c) => c.type === 'file' && c.name.toLowerCase() === 'readme.md'
  );

  const handleNodeClick = (node) => {
    if (node.type === 'dir') {
      dispatch(pushPath(node.name));
    } else {
      // Find language based on file extension
      const ext = node.name.split('.').pop().toLowerCase();
      let language = 'javascript';
      if (ext === 'md') language = 'markdown';
      else if (ext === 'html') language = 'html';
      else if (ext === 'css') language = 'css';
      else if (ext === 'json') language = 'json';

      dispatch(setSelectedFile({
        name: node.name,
        content: node.content,
        language
      }));
    }
  };

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      
      {/* 1. Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-sm font-semibold flex-wrap">
        <button
          onClick={() => dispatch(setPath([]))}
          className="text-[var(--accent-primary)] hover:underline font-bold"
        >
          root
        </button>
        {currentPath.map((folder, index) => (
          <React.Fragment key={index}>
            <span className="text-[var(--text-muted)]">/</span>
            <button
              onClick={() => dispatch(setPath(currentPath.slice(0, index + 1)))}
              className="text-[var(--accent-primary)] hover:underline font-bold"
            >
              {folder}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* 2. File Explorer Table container */}
      <div className="border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl overflow-hidden shadow-sm">
        
        {/* Latest Commit Bar Header */}
        <div className="px-4 py-3 bg-[var(--surface-secondary)] border-b border-[var(--border-primary)] flex items-center justify-between text-xs flex-wrap gap-2 text-[var(--text-primary)]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--text-primary)]">{latestCommit.author}</span>
            <span className="text-[var(--text-muted)] truncate max-w-sm sm:max-w-md font-semibold">
              {latestCommit.message}
            </span>
          </div>
          <span className="text-[var(--text-muted)] shrink-0 font-semibold">
            {latestCommit.id || 'c1a2b3'} · {new Date(latestCommit.date).toLocaleDateString()}
          </span>
        </div>

        {/* Directory rows list */}
        <div className="divide-y divide-[var(--border-primary)]">
          {currentPath.length > 0 && (
            <button
              onClick={() => dispatch(popPath())}
              className="w-full text-left px-4 py-2.5 text-xs hover:bg-[var(--surface-hover)] text-[var(--accent-primary)] font-bold flex items-center gap-2.5"
            >
              <ArrowLeft size={14} />
              <span>.. (Parent Directory)</span>
            </button>
          )}

          {currentDir.children?.map((node) => (
            <button
              key={node.name}
              onClick={() => handleNodeClick(node)}
              className="w-full text-left px-4 py-3 hover:bg-[var(--surface-hover)] flex items-center justify-between text-sm transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                {node.type === 'dir' ? (
                  <Folder size={18} className="text-[#58A6FF] shrink-0" />
                ) : node.name.endsWith('.md') ? (
                  <FileText size={18} className="text-[var(--text-muted)] shrink-0" />
                ) : (
                  <FileCode size={18} className="text-[var(--accent-primary)] shrink-0" />
                )}
                <span className="truncate group-hover:text-[var(--accent-primary)] font-bold text-[var(--text-primary)]">
                  {node.name}
                </span>
              </div>
              <span className="text-xs text-[var(--text-muted)] shrink-0 font-semibold">
                {node.type === 'dir' ? 'Folder' : 'File'}
              </span>
            </button>
          ))}

          {(!currentDir.children || currentDir.children.length === 0) && (
            <div className="p-8 text-center text-xs text-[var(--text-muted)] font-bold">
              Empty folder repository.
            </div>
          )}
        </div>
      </div>

      {/* 3. README Markdown Box */}
      {readmeFile && (
        <div className="border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl overflow-hidden shadow-sm">
          <div className="px-4 py-3 bg-[var(--surface-secondary)] border-b border-[var(--border-primary)] font-bold text-xs flex items-center gap-2 text-[var(--text-primary)]">
            <FileText size={14} className="text-[var(--text-muted)]" />
            <span>README.md</span>
          </div>
          <div className="p-6 md:p-8 overflow-x-auto prose dark:prose-invert max-w-none text-sm text-[var(--text-primary)]">
            <ReactMarkdown>{readmeFile.content}</ReactMarkdown>
          </div>
        </div>
      )}

    </div>
  );
}
