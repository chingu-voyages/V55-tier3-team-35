import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import DashboardLayout from '@/Layout';
import { useAuthStore } from '@/stores/authStores';

interface Props {
  children: React.ReactNode;
  useLayout: boolean;
}

const ProtectedRoute = ({ children, useLayout }: Props) => {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const performAuthCheck = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsChecking(false);
      }
    };

    performAuthCheck();
  }, [checkAuth]);

  console.log('ProtectedRoute state:', { isAuthenticated, isChecking });

  if (isChecking) {
    return <div>Loading...</div>; // TODO: Replace with your skeleton component
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (!useLayout) {
    return <>{children}</>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default ProtectedRoute;
