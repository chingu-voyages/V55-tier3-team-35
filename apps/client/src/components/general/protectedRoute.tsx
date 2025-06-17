import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import DashboardLayout from '@/Layout';
import { useAuthStore } from '@/stores/authStores';

interface Props {
  children: React.ReactNode;
  useLayout: boolean;
}

const ProtectedRoute = ({ children, useLayout }: Props) => {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      checkAuth();
    }
  }, [isAuthenticated, checkAuth]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!useLayout) {
    return <>{children}</>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default ProtectedRoute;
