// src/components/ProtectedRoute.tsx
import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  isLoggedIn: boolean; // Условие авторизации
  children: React.ReactElement;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ isLoggedIn, children }) => {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
