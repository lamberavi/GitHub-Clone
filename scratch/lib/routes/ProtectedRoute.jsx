import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import SkeletonLoader from '../../components/common/SkeletonLoader';

export function ProtectedRoute({ children }) {
  const { user, loading, isMockMode } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-github-light-canvas dark:bg-github-dark-canvas p-6">
        <div className="max-w-md w-full space-y-4">
          <SkeletonLoader count={4} />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to verify-email page if provider is email and email is not verified
  if (!isMockMode && user.provider === 'email' && !user.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children ? children : <Outlet />;
}
export default ProtectedRoute;
