import { createContext, useState, useEffect, ReactNode } from 'react';

// Types
type UserRole = 'user' | 'admin' | null;

interface AuthContextType {
  token: string | null;
  userRole: UserRole;
  login: (token: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  isUser: () => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create context
export const AuthContext = createContext<AuthContextType>({
  token: null,
  userRole: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: () => false,
  isAdmin: () => false,
  isUser: () => false,
});

// Provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [userRole, setUserRole] = useState<UserRole>(
    localStorage.getItem('userRole') as UserRole
  );

  useEffect(() => {
    // Check if token exists in localStorage on component mount
    const storedToken = localStorage.getItem('token');
    const storedUserRole = localStorage.getItem('userRole') as UserRole;
    
    if (storedToken) {
      setToken(storedToken);
      setUserRole(storedUserRole);
    }
  }, []);

  const login = (newToken: string, role: UserRole) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('userRole', role as string);
    setToken(newToken);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setToken(null);
    setUserRole(null);
  };

  const isAuthenticated = () => !!token;
  const isAdmin = () => userRole === 'admin';
  const isUser = () => userRole === 'user';

  const contextValue = {
    token,
    userRole,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    isUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};