import React from 'react';
import { useSelector } from 'react-redux';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';
import { BarChart3, Users, Folder, CircleDot, GitPullRequest, Database } from 'lucide-react';
import Badge from '../../components/common/Badge';

export default function AdminDashboard() {
  const { repositories } = useSelector((state) => state.repos);
  const { notifications } = useSelector((state) => state.notifications);

  // Compute metrics
  const totalRepos = repositories.length;
  const totalIssues = repositories.reduce((sum, r) => sum + r.issues.length, 0);
  const totalPRs = repositories.reduce((sum, r) => sum + r.pullRequests.length, 0);
  const totalCommits = repositories.reduce((sum, r) => sum + r.commits.length, 0);

  // Mock analytics charts data
  const chartData = [
    { date: 'Jul 16', Commits: 14, PRs: 2, Issues: 4 },
    { date: 'Jul 17', Commits: 28, PRs: 5, Issues: 8 },
    { date: 'Jul 18', Commits: 18, PRs: 3, Issues: 6 },
    { date: 'Jul 19', Commits: 35, PRs: 7, Issues: 9 },
    { date: 'Jul 20', Commits: 45, PRs: 11, Issues: 12 },
    { date: 'Jul 21', Commits: 30, PRs: 6, Issues: 5 },
    { date: 'Jul 22', Commits: 54, PRs: 10, Issues: 8 }
  ];

  const auditLogs = [
    { id: 1, action: 'CREATE_REPOSITORY', detail: 'ravil created: github-clone-react', date: '2026-07-22T06:00:00Z', status: 'SUCCESS' },
    { id: 2, action: 'COMMIT_PUSH', detail: 'ravil pushed c1a2b3c to github-clone-react', date: '2026-07-22T05:30:00Z', status: 'SUCCESS' },
    { id: 3, action: 'MERGE_PULL_REQUEST', detail: 'ravil merged PR #3 into main', date: '2026-07-21T18:00:00Z', status: 'SUCCESS' },
    { id: 4, action: 'USER_SIGNUP', detail: 'alex_dev created account', date: '2026-07-20T08:00:00Z', status: 'SUCCESS' }
  ];

  return (
    <div className="space-y-8">
      
      {/* 1. Header */}
      <div className="border-b border-github-light-border/60 dark:border-github-dark-border/60 pb-5">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
          <BarChart3 size={24} className="text-github-light-textMuted dark:text-github-dark-textMuted" />
          <span>Admin analytics</span>
        </h1>
        <p className="text-xs text-github-light-textMuted dark:text-github-dark-textMuted mt-1">
          Review central database logs, commit velocities, issue trends, and telemetry metrics.
        </p>
      </div>

      {/* 2. Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Repositories */}
        <div className="glass-panel p-5 border border-github-light-border/60 dark:border-github-dark-border/60 rounded-xl custom-shadow flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-github-light-textMuted dark:text-github-dark-textMuted">Repositories</span>
            <p className="text-xl sm:text-2xl font-extrabold">{totalRepos}</p>
          </div>
          <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-lg">
            <Folder size={20} />
          </div>
        </div>

        {/* Commits */}
        <div className="glass-panel p-5 border border-github-light-border/60 dark:border-github-dark-border/60 rounded-xl custom-shadow flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-github-light-textMuted dark:text-github-dark-textMuted">Total Commits</span>
            <p className="text-xl sm:text-2xl font-extrabold">{totalCommits}</p>
          </div>
          <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-lg">
            <Database size={20} />
          </div>
        </div>

        {/* PRs */}
        <div className="glass-panel p-5 border border-github-light-border/60 dark:border-github-dark-border/60 rounded-xl custom-shadow flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-github-light-textMuted dark:text-github-dark-textMuted">Pull Requests</span>
            <p className="text-xl sm:text-2xl font-extrabold">{totalPRs}</p>
          </div>
          <div className="p-2.5 bg-purple-500/10 text-purple-500 rounded-lg">
            <GitPullRequest size={20} />
          </div>
        </div>

        {/* Issues */}
        <div className="glass-panel p-5 border border-github-light-border/60 dark:border-github-dark-border/60 rounded-xl custom-shadow flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-github-light-textMuted dark:text-github-dark-textMuted">Active Issues</span>
            <p className="text-xl sm:text-2xl font-extrabold">{totalIssues}</p>
          </div>
          <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-lg">
            <CircleDot size={20} />
          </div>
        </div>
      </div>

      {/* 3. Recharts Interactive Area Chart */}
      <div className="glass-panel p-5 border border-github-light-border/60 dark:border-github-dark-border/60 rounded-2xl custom-shadow space-y-4">
        <h3 className="font-bold text-sm tracking-tight">System Commit Velocity</h3>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#58a6ff" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#58a6ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#21262d" opacity={0.3} />
              <XAxis dataKey="date" stroke="#8d96a0" fontSize={11} tickLine={false} />
              <YAxis stroke="#8d96a0" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#161b22', 
                  border: '1px solid #30363d', 
                  borderRadius: '8px',
                  color: '#e6edf3',
                  fontSize: '12px'
                }} 
              />
              <Area type="monotone" dataKey="Commits" stroke="#58a6ff" strokeWidth={2} fillOpacity={1} fill="url(#colorCommits)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Audit Log Table */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm tracking-tight">Central Security Audit Log</h3>
        
        <div className="glass-panel border border-github-light-border/60 dark:border-github-dark-border/60 rounded-xl overflow-hidden custom-shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-50 dark:bg-github-dark-sidebar/45 border-b border-github-light-border/60 dark:border-github-dark-border/60 font-bold text-github-light-textMuted dark:text-github-dark-textMuted uppercase">
                  <th className="p-4">Action</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-github-light-border/40 dark:divide-github-dark-border/45 font-medium">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-neutral-100 dark:hover:bg-neutral-850/40">
                    <td className="p-4 font-mono font-bold text-github-light-accent dark:text-github-dark-accent">
                      {log.action}
                    </td>
                    <td className="p-4 font-sans text-github-light-text/90 dark:text-github-dark-text/90">
                      {log.detail}
                    </td>
                    <td className="p-4 text-github-light-textMuted dark:text-github-dark-textMuted">
                      {new Date(log.date).toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <Badge variant="success" size="sm">
                        {log.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
