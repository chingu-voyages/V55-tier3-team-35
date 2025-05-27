import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import UserDetailsPage from './pages/auth/UserDetailsPage';
import HomePage from './pages/Home/HomePage';
import LandingPage from './pages/Landing/LandingPage';
import { useAuthStore } from './stores/authStores';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/user-details" element={<UserDetailsPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

function App() {
  const { isAuthenticated, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <>{isAuthenticated ? <ProtectedRoutes /> : <PublicRoutes />}</>;
}

export default App;
