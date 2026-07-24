import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../auth/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import SettingsLayout from '../layouts/SettingsLayout';
import ProtectedRoute from './ProtectedRoute';

// Public Pages
import Landing from '../../app/landing/Landing';
import Login from '../../app/login/Login';
import Signup from '../../app/login/Signup';
import ForgotPassword from '../../app/login/ForgotPassword';
import ResetPassword from '../../app/reset-password/ResetPassword';
import VerifyEmail from '../../app/verify-email/VerifyEmail';
import NotFound from '../../app/not-found/NotFound';

// Protected Core Pages
import Dashboard from '../../app/dashboard/Dashboard';
import Profile from '../../app/profile/Profile';
import Repositories from '../../app/repository/Repositories';
import RepoDetails from '../../app/repository/RepoDetails';
import Search from '../../app/search/Search';
import Notifications from '../../app/notifications/Notifications';
import Settings from '../../app/settings/Settings';
import AdminDashboard from '../../app/admin-dashboard/AdminDashboard';

// Settings Sub-Pages
import AppearanceSettings from '../../app/settings/AppearanceSettings';
import GenericSettingsSubPage from '../../app/settings/GenericSettingsSubPage';

// Profile Dropdown Pages
import Stars from '../../app/stars';
import Gists from '../../app/gists';
import Organizations from '../../app/organizations';
import Enterprises from '../../app/enterprises';
import Sponsors from '../../app/sponsors';
import Copilot from '../../app/copilot';
import FeaturePreview from '../../app/feature-preview';
import Appearance from '../../app/settings/Appearance';
import Accessibility from '../../app/settings/Accessibility';
import Enterprise from '../../app/enterprise';
import Status from '../../app/status';

// Sidebar Navigation Pages
import Issues from '../../app/issues';
import PullRequests from '../../app/pull-requests';
import Projects from '../../app/projects';
import Discussions from '../../app/discussions';
import Codespaces from '../../app/codespaces';
import Explore from '../../app/explore';
import Marketplace from '../../app/marketplace';
import MCPRegistry from '../../app/mcpregistry';

// Lucide Icons for sub-pages
import { User, Shield, Eye, Bell, CreditCard, BookOpen, Code2, Package, Sparkles, Terminal } from 'lucide-react';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Authentication Router */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Route>

      {/* Protected App Layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/repositories" element={<Repositories />} />
          <Route path="/repo/:repoId" element={<RepoDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Nested /settings layout */}
          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="/settings/appearance" replace />} />
            <Route path="profile" element={<Settings />} />
            <Route path="account" element={<GenericSettingsSubPage title="Account Settings" description="Manage security keys, 2FA, and session logs." icon={Shield} />} />
            <Route path="appearance" element={<AppearanceSettings />} />
            <Route path="accessibility" element={<GenericSettingsSubPage title="Accessibility Settings" description="Configure screen reader support, focus rings, and high contrast." icon={Eye} />} />
            <Route path="notifications" element={<GenericSettingsSubPage title="Notification Settings" description="Choose email webhooks, mobile alerts, and audit digest triggers." icon={Bell} />} />
            <Route path="billing" element={<GenericSettingsSubPage title="Billing & Plans" description="Review subscription seats, invoice receipts, and payment methods." icon={CreditCard} />} />
            <Route path="repositories" element={<GenericSettingsSubPage title="Repository Defaults" description="Set default branch names, visibility rules, and auto-merge templates." icon={BookOpen} />} />
            <Route path="codespaces" element={<GenericSettingsSubPage title="Codespaces Settings" description="Configure cloud runner sizes, idle timeouts, and secrets." icon={Code2} />} />
            <Route path="packages" element={<GenericSettingsSubPage title="Packages & Registry" description="Manage container registries, npm tokens, and maven credentials." icon={Package} />} />
            <Route path="copilot" element={<GenericSettingsSubPage title="Copilot AI Engine" description="Configure AI code completion models and privacy controls." icon={Sparkles} />} />
            <Route path="developer" element={<GenericSettingsSubPage title="Developer Settings" description="Manage OAuth apps, personal access tokens, and SSH keys." icon={Terminal} />} />
          </Route>

          {/* Profile Dropdown Navigation Routes */}
          <Route path="/stars" element={<Stars />} />
          <Route path="/gists" element={<Gists />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/enterprises" element={<Enterprises />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/copilot" element={<Copilot />} />
          <Route path="/feature-preview" element={<FeaturePreview />} />
          <Route path="/appearance" element={<Navigate to="/settings/appearance" replace />} />
          <Route path="/accessibility" element={<Navigate to="/settings/accessibility" replace />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/status" element={<Status />} />

          {/* Sidebar Navigation Routes */}
          <Route path="/issues" element={<Issues />} />
          <Route path="/pull-requests" element={<PullRequests />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/codespaces" element={<Codespaces />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/mcp-registry" element={<MCPRegistry />} />
        </Route>
      </Route>

      {/* 404 Fallback */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
