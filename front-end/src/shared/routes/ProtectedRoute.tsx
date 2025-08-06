import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../../modules/user/store/user-store';

type ProtectedRouteProps = {
  children: ReactNode;
  requireAuth?: boolean; // true means user must be logged in, false means user must be logged out
};

const ProtectedRoute = ({ children, requireAuth = true }: ProtectedRouteProps) => {
  const { user, checkAuthStatus } = useUserStore();
  
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // If requireAuth is true and user is not logged in, redirect to login page
  if (requireAuth && !user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If requireAuth is false and user is logged in, redirect to home page
  if (!requireAuth && user.isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  // Otherwise, render the children
  return <>{children}</>;
};

export default ProtectedRoute;