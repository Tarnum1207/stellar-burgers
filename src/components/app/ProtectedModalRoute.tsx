// src/components/ProtectedModalRoute.tsx
import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedModalRouteProps {
  isLoggedIn: boolean; // Условие авторизации
  modalContent: React.ReactNode;
}

const ProtectedModalRoute: FC<ProtectedModalRouteProps> = ({
  isLoggedIn,
  modalContent
}) => {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <>{modalContent}</>;
};

export default ProtectedModalRoute;
