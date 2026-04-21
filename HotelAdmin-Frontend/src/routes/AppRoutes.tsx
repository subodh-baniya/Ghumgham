import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginPage from '../pages/LoginPage';
import HotelAdminLayout from '../components/layout/HotelAdminLayout';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  
  // If no token exists, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { token } = useAuth();
  
  return (
    <Routes>
      {/* Login route - no protection needed */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Root route - redirect based on auth state */}
      <Route 
        path="/" 
        element={token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
      />
      
      {/* Protected layout route - all admin pages use this */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <HotelAdminLayout />
          </ProtectedRoute>
        }
      />
      
      {/* Catch-all route - redirect unknown routes to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
