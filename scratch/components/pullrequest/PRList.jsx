import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GitPullRequest, GitMerge, Plus, MessageSquare, Files, X } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import Input from '../common/Input';
import { addPullRequest, mergePullRequest } from '../../lib/redux/slices/repoSlice';

export default function PRList({ prs = [], branches = [], repoId }) {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('open'); // open, merged
  
  // PR Creation state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPR, setNewPR] = useState({ title: '', source: branches[1] || 'dev', target: 'main' });

  // Single PR details state
  const [selectedPR, setSelectedPR] = useState(null);
  const [prViewTab, setPrViewTab] = useState('conversation'); // conversation, files

  const handleCreatePR = (e) => {
    e.preventDefault();
    if (!newPR.title.trim()) return;

    dispatch(addPullRequest({
      title: newPR.title,
      sourceBranch: newPR.source,
      targetBranch: newPR.target,
      fileDiffs: [
        {
          filepath: 'src/components/Sidebar.jsx',
          additions: 12,
          deletions: 4,
          content: `@@ -4,4 +4,12 @@\n export default function Sidebar() {\n+  const [collapsed, setCollapsed] = useState(false);\n   return (\n-    <aside className="w-64 bg-slate-900 border-r border-slate-800">\n+    <aside className={\`bg-slate-900 border-r border-slate-800 transition-all duration-300 \${collapsed ? 'w-20' : 'w-64'}\`}>\n+      <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-slate-800">\n+        Collapse\n+      </button>\n       <nav className="p-4 space-y-2">\n         {/* Link list items */}`
        }
      ]
    }));

    setNewPR({ title: '', source: branches[1] || 'dev', target: 'main' });
    setIsCreateModalOpen(false);
  };

  const handleMergeClick = (id) => {
    dispatch(mergePullRequest(id));
    if (selectedPR && selectedPR.id === id) {
      setSelectedPR((prev) => ({ ...prev, status: 'merged' }));
    }
  };

  const filteredPRs = prs.filter(pr => pr.status === activeTab);

  return (
    <div className="space-y-4 text-[var(--text-primary)]">
      
      {!selectedPR ? (
        <>
          {/* 1. Header controls */}
          <div className="flex justify-between items-center flex-wrap gap-3">
            <h3 className="font-bold text-sm text-[var(--text-muted)]">Pull Requests</h3>
            <Button icon={Plus} onClick={() => setIsCreateModalOpen(true)}>
              New Pull Request
            </Button>
          </div>

          {/* Tab switches */}
          <div className="flex border-b border-[var(--border-primary)]">
            <button
              onClick={() => setActiveTab('open')}
              className={`px-4 py-2 text-xs font-bold border-b-2 -mb-[2px] flex items-center gap-1.5 ${
                activeTab === 'open'
                  ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <GitPullRequest size={14} className="text-[#3FB950]" />
              <span>{prs.filter(p => p.status === 'open').length} Open</span>
            </button>
            <button
              onClick={() => setActiveTab('merged')}
              className={`px-4 py-2 text-xs font-bold border-b-2 -mb-[2px] flex items-center gap-1.5 ${
                activeTab === 'merged'
                  ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <GitMerge size={14} className="text-[#A371F7]" />
              <span>{prs.filter(p => p.status === 'merged').length} Merged</span>
            </button>
          </div>

          {/* PR Listing items */}
          <div className="border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl overflow-hidden divide-y divide-[var(--border-primary)] shadow-sm">
            {filteredPRs.length > 0 ? (
              filteredPRs.map((pr) => (
                <button
                  key={pr.id}
                  onClick={() => { setSelectedPR(pr); setPrViewTab('conversation'); }}
                  className="w-full text-left p-4 hover:bg-[var(--surface-hover)] flex items-start justify-between gap-4 transition-colors"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <span className="font-bold text-sm text-[var(--text-primary)] hover:text-[var(--accent-primary)]">
                      {pr.title}
                    </span>
                    <p className="text-[10px] text-[var(--text-muted)] font-semibold">
                      #{pr.number} opened {new Date(pr.date).toLocaleDateString()} by @{pr.author} · {pr.sourceBranch} → {pr.targetBranch}
                    </p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Badge variant={pr.status === 'open' ? 'success' : 'purple'} size="sm">
                      {pr.status === 'open' ? 'Open' : 'Merged'}
                    </Badge>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-16 text-center text-xs text-[var(--text-muted)] font-bold">
                No pull requests found.
              </div>
            )}
          </div>
        </>
      ) : (
        /* 2. PR Detail view */
        <div className="space-y-6 animate-fade-in">
          
          {/* Header */}
          <div className="border-b border-[var(--border-primary)] pb-4 space-y-2">
            <div className="flex justify-between items-start gap-4">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {selectedPR.title} <span className="font-mono text-[var(--text-muted)]">#{selectedPR.number}</span>
              </h2>
              <button 
                onClick={() => setSelectedPR(null)}
                className="p-1 hover:bg-[var(--surface-hover)] rounded-lg text-[var(--text-muted)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge variant={selectedPR.status === 'open' ? 'success' : 'purple'}>
                {selectedPR.status === 'open' ? 'Open' : 'Merged'}
              </Badge>
              <span className="text-[var(--text-muted)] font-semibold">
                @{selectedPR.author} wants to merge commits into <code className="px-1.5 py-0.5 rounded bg-[var(--surface-secondary)] border border-[var(--border-primary)]">{selectedPR.targetBranch}</code> from <code className="px-1.5 py-0.5 rounded bg-[var(--surface-secondary)] border border-[var(--border-primary)]">{selectedPR.sourceBranch}</code>
              </span>
            </div>
          </div>

          {/* Sub Navigation tabs */}
          <div className="flex border-b border-[var(--border-primary)]">
            <button
              onClick={() => setPrViewTab('conversation')}
              className={`px-4 py-2 text-xs font-bold border-b-2 -mb-[2px] flex items-center gap-1.5 ${
                prViewTab === 'conversation'
                  ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <MessageSquare size={13} />
              <span>Conversation</span>
            </button>
            <button
              onClick={() => setPrViewTab('files')}
              className={`px-4 py-2 text-xs font-bold border-b-2 -mb-[2px] flex items-center gap-1.5 ${
                prViewTab === 'files'
                  ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Files size={13} />
              <span>Files Changed ({selectedPR.fileDiffs?.length || 0})</span>
            </button>
          </div>

          {/* Tab content */}
          {prViewTab === 'conversation' ? (
            <div className="space-y-6">
              
              {/* Opener info */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-primary)] flex items-center justify-center font-bold text-xs">
                  {selectedPR.author[0].toUpperCase()}
                </div>
                <div className="flex-1 border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-2xs text-[var(--text-muted)] font-bold">
                    <span>@{selectedPR.author} commented</span>
                    <span>{new Date(selectedPR.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    This pull request introduces clean animations and fixes theme flashes on dashboard widgets. Please review files changed logs.
                  </p>
                </div>
              </div>

              {/* Merge Actions panel */}
              <div className="p-5 rounded-xl border border-[var(--border-primary)] bg-[var(--surface-card)] shadow-sm flex items-start gap-4">
                <div className={`p-2.5 rounded-lg text-white ${
                  selectedPR.status === 'merged' ? 'bg-[#A371F7]' : 'bg-[#3FB950]'
                }`}>
                  {selectedPR.status === 'merged' ? <GitMerge size={20} /> : <GitPullRequest size={20} />}
                </div>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">
                    {selectedPR.status === 'merged' 
                      ? 'Pull request successfully merged' 
                      : 'This branch has no conflicts with the base branch'}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] font-semibold leading-normal">
                    {selectedPR.status === 'merged'
                      ? 'Commits have been incorporated into the main production timeline.'
                      : 'Merging can be performed automatically. Always check unit test workflows beforehand.'}
                  </p>
                  
                  {selectedPR.status === 'open' && (
                    <Button 
                      size="sm" 
                      variant="success" 
                      icon={GitMerge}
                      onClick={() => handleMergeClick(selectedPR.id)}
                      className="mt-2"
                    >
                      Merge pull request
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="secondary" size="sm" onClick={() => setSelectedPR(null)}>
                  Back to List
                </Button>
              </div>

            </div>
          ) : (
            /* Visual code diff visualizer */
            <div className="space-y-6">
              {selectedPR.fileDiffs?.map((diff, dfIdx) => (
                <div key={dfIdx} className="border border-[var(--border-primary)] rounded-xl overflow-hidden shadow-sm bg-[var(--surface-card)]">
                  <div className="px-4 py-2.5 bg-[var(--surface-secondary)] border-b border-[var(--border-primary)] font-mono text-xs flex justify-between font-bold">
                    <span>{diff.filepath}</span>
                    <span className="text-[10px] text-[#3FB950]">
                      +{diff.additions} -{diff.deletions}
                    </span>
                  </div>

                  {/* Diff highlight viewer */}
                  <pre className="p-4 overflow-x-auto text-[11px] font-mono leading-relaxed bg-[#0D1117] text-slate-200">
                    <code>
                      {diff.content.split('\n').map((line, lIdx) => {
                        const isAdd = line.startsWith('+');
                        const isDel = line.startsWith('-');
                        const isMeta = line.startsWith('@@');

                        let lineClass = 'text-slate-400';
                        if (isAdd) lineClass = 'bg-emerald-950/70 text-emerald-300 font-semibold px-1 rounded-sm';
                        else if (isDel) lineClass = 'bg-red-950/80 text-red-300 font-semibold px-1 rounded-sm';
                        else if (isMeta) lineClass = 'text-cyan-400 opacity-80';

                        return (
                          <div key={lIdx} className={`${lineClass} select-text py-0.5`}>
                            {line}
                          </div>
                        );
                      })}
                    </code>
                  </pre>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* 3. New PR Dialog Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Open a new pull request"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePR} isDisabled={!newPR.title.trim()}>
              Create Pull Request
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreatePR} className="space-y-4">
          <Input
            label="PR Title"
            name="title"
            placeholder="e.g. feat: integrate dark mode toggles in navbar"
            value={newPR.title}
            onChange={(e) => setNewPR({ ...newPR, title: e.target.value })}
            required
            autoFocus
          />

          <div className="grid grid-cols-2 gap-3 items-center pt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-2xs font-bold text-[var(--text-muted)] uppercase">Source (compare)</label>
              <select
                value={newPR.source}
                onChange={(e) => setNewPR({ ...newPR, source: e.target.value })}
                className="px-3 py-2 text-sm bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-lg outline-none cursor-pointer"
              >
                {branches.filter(b => b !== 'main').map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-2xs font-bold text-[var(--text-muted)] uppercase">Target (base)</label>
              <select
                value={newPR.target}
                onChange={(e) => setNewPR({ ...newPR, target: e.target.value })}
                className="px-3 py-2 text-sm bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-lg outline-none cursor-pointer"
              >
                <option value="main">main</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>

    </div>
  );
}
