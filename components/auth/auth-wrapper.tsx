import React from 'react';
import { useAuthStatus } from '@/hooks/use-auth-status';

interface AuthWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, fallback = null }) => {
  const { isAuthenticated } = useAuthStatus();

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default AuthWrapper;
