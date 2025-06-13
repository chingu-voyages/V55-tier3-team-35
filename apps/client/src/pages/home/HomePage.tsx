import { Navigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStores';

const HomePage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <div>Home Page</div>;
};

export default HomePage;
