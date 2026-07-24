import React from 'react';
import { Link } from 'react-router-dom';
import { Github, FileQuestion, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-github-light-canvas dark:bg-github-dark-canvas text-github-light-text dark:text-github-dark-text p-6 text-center select-none">
      <div className="absolute top-[25%] w-[400px] h-[400px] rounded-full bg-github-light-danger/5 dark:bg-github-dark-danger/5 blur-[100px] pointer-events-none" />

      <div className="space-y-6 max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-github-light-danger/10 dark:bg-github-dark-danger/10 text-github-light-danger dark:text-github-dark-danger rounded-2xl flex items-center justify-center animate-bounce">
            <FileQuestion size={36} />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-extrabold tracking-tight font-mono text-github-light-danger dark:text-github-dark-danger">404</h1>
          <h2 className="text-2xl font-bold tracking-tight">Page not found</h2>
          <p className="text-sm text-github-light-textMuted dark:text-github-dark-textMuted leading-relaxed">
            The page you are looking for does not exist, has been removed, or is temporarily inaccessible.
          </p>
        </div>

        <div className="pt-2">
          <Link to="/dashboard">
            <Button icon={ArrowLeft} variant="secondary">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
