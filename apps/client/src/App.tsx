import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import UserDetailsPage from './pages/Auth/UserDetailsPage';
import HomePage from './pages/home/HomePage';
import LandingPage from './pages/Landing/LandingPage';
import { useAuthStore } from './stores/authStores';

function App() {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Routes>
      {/* Public routes - always accessible */}
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes - only accessible when authenticated */}
      <Route
        path="/user-details"
        element={
          isAuthenticated ? (
            <UserDetailsPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/home"
        element={
          isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
