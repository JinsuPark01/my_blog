import { useUser } from '@clerk/nextjs';

interface AuthStatus {
  isAuthenticated: boolean;
  isAdmin: boolean;
  userId: string | null;
}

export const useAuthStatus = (): AuthStatus => {
  const { user } = useUser();

  return {
    isAuthenticated: !!user,
    isAdmin: user?.publicMetadata?.role === 'admin',
    userId: user?.id || null,
  };
};
