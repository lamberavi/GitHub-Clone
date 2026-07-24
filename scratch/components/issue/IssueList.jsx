import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CircleDot, Plus, Search, MessageSquare, X } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import Input from '../common/Input';
import { addIssue, closeIssue, addIssueComment } from '../../lib/redux/slices/repoSlice';

export default function IssueList({ issues = [], repoId }) {
  const dispatch = useDispatch();

  const [issueSearch, setIssueSearch] = useState('');
  const [activeTab, setActiveTab] = useState('open'); // open, closed
  
  // Issue Creation Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newIssue, setNewIssue] = useState({ title: '', label: 'bug', priority: 'Medium' });

  // Issue Detail View State
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [newComment, setNewComment] = useState('');

  const handleCreateIssue = (e) => {
    e.preventDefault();
    if (!newIssue.title.trim()) return;

    dispatch(addIssue({
      title: newIssue.title,
      labels: [newIssue.label],
      priority: newIssue.priority
    }));

    setNewIssue({ title: '', label: 'bug', priority: 'Medium' });
    setIsCreateModalOpen(false);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedIssue) return;

    dispatch(addIssueComment({
      issueId: selectedIssue.id,
      commentText: newComment
    }));

    // Update locally loaded selected issue view state
    setSelectedIssue((prev) => ({
      ...prev,
      comments: prev.comments + 1,
      commentsList: [...(prev.commentsList || []), {
        author: 'ravil',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        text: newComment,
        date: new Date().toISOString()
      }]
    }));

    setNewComment('');
  };

  const handleCloseIssueClick = (id) => {
    dispatch(closeIssue(id));
    if (selectedIssue && selectedIssue.id === id) {
      setSelectedIssue((prev) => ({ ...prev, status: 'closed' }));
    }
  };

  // Run filters
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.title.toLowerCase().includes(issueSearch.toLowerCase());
    const matchesStatus = issue.status === activeTab;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4 text-[var(--text-primary)]">
      
      {!selectedIssue ? (
        <>
          {/* 1. Header controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search issues..."
                value={issueSearch}
                onChange={(e) => setIssueSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-lg outline-none focus:border-[var(--accent-primary)]"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={newIssue.label}
                onChange={(e) => setNewIssue({ ...newIssue, label: e.target.value })}
                className="px-3 py-2 text-sm bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-lg cursor-pointer hidden md:block"
              >
                <option value="bug">Label: Bug</option>
                <option value="enhancement">Enhancement</option>
                <option value="documentation">Documentation</option>
              </select>
              <Button icon={Plus} onClick={() => setIsCreateModalOpen(true)}>
                New Issue
              </Button>
            </div>
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
              <CircleDot size={14} className="text-[#3FB950]" />
              <span>{issues.filter(i => i.status === 'open').length} Open</span>
            </button>
            <button
              onClick={() => setActiveTab('closed')}
              className={`px-4 py-2 text-xs font-bold border-b-2 -mb-[2px] flex items-center gap-1.5 ${
                activeTab === 'closed'
                  ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <CircleDot size={14} className="text-[#F85149]" />
              <span>{issues.filter(i => i.status === 'closed').length} Closed</span>
            </button>
          </div>

          {/* List display */}
          <div className="border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl overflow-hidden divide-y divide-[var(--border-primary)] shadow-sm">
            {filteredIssues.length > 0 ? (
              filteredIssues.map((issue) => (
                <button
                  key={issue.id}
                  onClick={() => setSelectedIssue(issue)}
                  className="w-full text-left p-4 hover:bg-[var(--surface-hover)] flex items-start justify-between gap-4 transition-colors"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-[var(--text-primary)] hover:text-[var(--accent-primary)]">
                        {issue.title}
                      </span>
                      {issue.labels.map(l => (
                        <Badge key={l} variant={l === 'bug' ? 'danger' : 'info'} size="sm">
                          {l}
                        </Badge>
                      ))}
                      <Badge variant={issue.priority === 'Critical' ? 'danger' : issue.priority === 'High' ? 'warning' : 'neutral'} size="sm">
                        {issue.priority}
                      </Badge>
                    </div>
                    <p className="text-[10px] text-[var(--text-muted)] font-semibold">
                      #{issue.id} opened {new Date(issue.date).toLocaleDateString()} by @{issue.author}
                    </p>
                  </div>

                  {issue.comments > 0 && (
                    <div className="flex items-center gap-1 text-2xs text-[var(--text-muted)] font-bold">
                      <MessageSquare size={12} />
                      <span>{issue.comments}</span>
                    </div>
                  )}
                </button>
              ))
            ) : (
              <div className="p-16 text-center text-xs text-[var(--text-muted)] font-bold">
                No issues match your filter query.
              </div>
            )}
          </div>
        </>
      ) : (
        /* 2. Detailed Single Issue View */
        <div className="space-y-6 animate-fade-in">
          {/* Header detail */}
          <div className="border-b border-[var(--border-primary)] pb-4 space-y-3">
            <div className="flex justify-between items-start gap-4">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {selectedIssue.title} <span className="font-mono text-[var(--text-muted)]">#{selectedIssue.id}</span>
              </h2>
              <button 
                onClick={() => setSelectedIssue(null)}
                className="p-1 hover:bg-[var(--surface-hover)] rounded-lg text-[var(--text-muted)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge variant={selectedIssue.status === 'open' ? 'success' : 'danger'}>
                {selectedIssue.status === 'open' ? 'Open' : 'Closed'}
              </Badge>
              <span className="text-[var(--text-muted)] font-semibold">
                @{selectedIssue.author} opened this {new Date(selectedIssue.date).toLocaleDateString()} · {selectedIssue.comments} comments
              </span>
              
              {selectedIssue.status === 'open' && (
                <button
                  onClick={() => handleCloseIssueClick(selectedIssue.id)}
                  className="ml-auto text-xs px-2.5 py-1 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold"
                >
                  Close Issue
                </button>
              )}
            </div>
          </div>

          {/* Comments Discussion Thread */}
          <div className="space-y-4">
            
            {/* Opener initial mock comment */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-primary)] flex items-center justify-center font-bold text-xs uppercase text-[var(--text-muted)]">
                {selectedIssue.author[0]}
              </div>
              <div className="flex-1 border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-2xs text-[var(--text-muted)] font-bold">
                  <span>@{selectedIssue.author} commented</span>
                  <span>{new Date(selectedIssue.date).toLocaleDateString()}</span>
                </div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Please investigate: this issue is blocking development pipelines. We need to verify our config schemas.
                </p>
              </div>
            </div>

            {/* Replied comments list */}
            {selectedIssue.commentsList?.map((cmt, cIdx) => (
              <div key={cIdx} className="flex gap-3">
                <img src={cmt.avatar} alt={cmt.author} className="w-8 h-8 rounded-full object-cover border border-[var(--border-primary)]" />
                <div className="flex-1 border border-[var(--border-primary)] bg-[var(--surface-card)] rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-2xs text-[var(--text-muted)] font-bold">
                    <span>@{cmt.author} replied</span>
                    <span>{new Date(cmt.date).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-primary)] font-semibold">{cmt.text}</p>
                </div>
              </div>
            ))}

            {/* Comment creator text area */}
            <form onSubmit={handleAddComment} className="space-y-3 pt-4 border-t border-[var(--border-primary)]">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--accent-glow)] text-[var(--accent-primary)] flex items-center justify-center font-bold text-xs">
                  ME
                </div>
                <div className="flex-1 space-y-2">
                  <textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-lg outline-none focus:border-[var(--accent-primary)] transition-all min-h-[90px]"
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="secondary" size="sm" onClick={() => setSelectedIssue(null)}>
                      Back
                    </Button>
                    <Button type="submit" size="sm">
                      Comment
                    </Button>
                  </div>
                </div>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* 3. New Issue Dialog Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Open a new issue"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateIssue} isDisabled={!newIssue.title.trim()}>
              Submit Issue
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateIssue} className="space-y-4">
          <Input
            label="Issue Title"
            name="title"
            placeholder="e.g. Monaco search dialog crashes on narrow layouts"
            value={newIssue.title}
            onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
            required
            autoFocus
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-2xs font-bold text-[var(--text-muted)] uppercase">Label</label>
              <select
                value={newIssue.label}
                onChange={(e) => setNewIssue({ ...newIssue, label: e.target.value })}
                className="px-3 py-2 text-sm bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-lg outline-none cursor-pointer"
              >
                <option value="bug">Bug</option>
                <option value="enhancement">Enhancement</option>
                <option value="documentation">Documentation</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-2xs font-bold text-[var(--text-muted)] uppercase">Priority</label>
              <select
                value={newIssue.priority}
                onChange={(e) => setNewIssue({ ...newIssue, priority: e.target.value })}
                className="px-3 py-2 text-sm bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-lg outline-none cursor-pointer"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>

    </div>
  );
}
