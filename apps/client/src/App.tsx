import { Routes, Route, Navigate } from 'react-router-dom';

import BudgetsPage from './components/dashboard/tabs/budgets.tsx';
import ProtectedRoute from './components/general/protectedRoute.tsx';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import UserDetailsPage from './pages/Auth/UserDetailsPage';
import HomePage from './pages/home/HomePage';
import LandingPage from './pages/landing/LandingPage.tsx';
import TransactionPage from './pages/transactions/TransactionsPage';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes */}
      <Route
        path="/user-details"
        element={
          <ProtectedRoute useLayout={false}>
            <UserDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/overview"
        element={
          <ProtectedRoute useLayout={true}>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute useLayout={true}>
            <TransactionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/budgets"
        element={
          <ProtectedRoute useLayout={true}>
            <BudgetsPage />
          </ProtectedRoute>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
