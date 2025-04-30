import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  userType: 'user' | 'admin';
}

const ProtectedRoute = ({ children, userType }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, isUser } = useAuth();
  
  if (!isAuthenticated()) {
    // If not authenticated at all, redirect to appropriate login page
    return <Navigate to={`/${userType}/signin`} replace />;
  }
  
  // Check if user has the right role
  if (userType === 'admin' && !isAdmin()) {
    return <Navigate to="/user/dashboard" replace />;
  }
  
  if (userType === 'user' && !isUser()) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;