import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '@monaco-editor/react';
import { Save, ArrowLeft, Terminal } from 'lucide-react';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Input from '../common/Input';
import { setSelectedFile, updateFileContent, addCommit } from '../../lib/redux/slices/repoSlice';

export default function MonacoEditor({ file, repoId }) {
  const dispatch = useDispatch();
  
  const { theme } = useSelector((state) => state.theme);

  const [editorContent, setEditorContent] = useState(file.content);
  const [isCommitModalOpen, setIsCommitModalOpen] = useState(false);
  const [commitMessage, setCommitMessage] = useState('');
  
  // Decide Monaco theme
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  const handleEditorChange = (value) => {
    setEditorContent(value || '');
  };

  const handleCommitSubmit = (e) => {
    e.preventDefault();
    if (!commitMessage.trim()) return;

    // Update in-memory file content
    dispatch(updateFileContent({
      filepath: file.name,
      content: editorContent
    }));

    // Add a commit log to the repo
    dispatch(addCommit({
      message: commitMessage,
      changes: `+${Math.floor(Math.random() * 15) + 1} -${Math.floor(Math.random() * 5)}`
    }));

    setCommitMessage('');
    setIsCommitModalOpen(false);
    
    // Close editor view and return to directory explore
    dispatch(setSelectedFile(null));
  };

  return (
    <div className="space-y-4">
      
      {/* Action Header bar */}
      <div className="flex items-center justify-between border-b border-github-light-border/60 dark:border-github-dark-border/60 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            icon={ArrowLeft}
            onClick={() => dispatch(setSelectedFile(null))}
          >
            Back
          </Button>
          <div>
            <h3 className="font-bold text-sm font-mono truncate">{file.name}</h3>
            <span className="text-[10px] text-github-light-textMuted dark:text-github-dark-textMuted uppercase font-semibold">
              {file.language} mode
            </span>
          </div>
        </div>

        <Button 
          icon={Save} 
          onClick={() => setIsCommitModalOpen(true)}
          className="h-9"
        >
          Commit changes
        </Button>
      </div>

      {/* Editor Container */}
      <div className="border border-github-light-border dark:border-github-dark-border rounded-xl overflow-hidden shadow-premium">
        <Editor
          height="450px"
          language={file.language === 'markdown' ? 'markdown' : file.language}
          theme={editorTheme}
          value={editorContent}
          onChange={handleEditorChange}
          options={{
            fontSize: 13,
            fontFamily: 'JetBrains Mono, Fira Code, monospace',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbers: 'on',
            padding: { top: 12, bottom: 12 }
          }}
        />
      </div>

      {/* Commit Message modal dialog */}
      <Modal
        isOpen={isCommitModalOpen}
        onClose={() => setIsCommitModalOpen(false)}
        title="Commit Changes"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsCommitModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCommitSubmit} isDisabled={!commitMessage.trim()}>
              Commit
            </Button>
          </>
        }
      >
        <form onSubmit={handleCommitSubmit} className="space-y-4">
          <Input
            label="Commit message"
            name="commitMessage"
            placeholder="e.g. update code settings and styles"
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            required
            autoFocus
          />
          <p className="text-2xs text-github-light-textMuted dark:text-github-dark-textMuted leading-normal">
            This commit will be registered directly onto the active branch timeline. In-memory data states will adapt immediately.
          </p>
        </form>
      </Modal>

    </div>
  );
}
