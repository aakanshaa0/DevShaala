import { createContext, useState, useEffect, ReactNode } from 'react';

// Define types for TypeScript
type UserRole = 'user' | 'admin' | null;

// Define the shape of our authentication context
interface AuthContextType {
  token: string | null;          // JWT token for authentication
  userRole: UserRole;           // User's role (admin/user)
  login: (token: string, role: UserRole) => void;  // Function to log in
  logout: () => void;           // Function to log out
  isAuthenticated: () => boolean;  // Check if user is logged in
  isAdmin: () => boolean;       // Check if user is admin
  isUser: () => boolean;        // Check if user is regular user
}

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Create the authentication context with default values
export const AuthContext = createContext<AuthContextType>({
  token: null,
  userRole: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: () => false,
  isAdmin: () => false,
  isUser: () => false,
});

// The AuthProvider component that wraps the app
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // State for authentication token and user role
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [userRole, setUserRole] = useState<UserRole>(
    localStorage.getItem('userRole') as UserRole
  );

  // Effect to check for existing authentication on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserRole = localStorage.getItem('userRole') as UserRole;
    
    if (storedToken) {
      setToken(storedToken);
      setUserRole(storedUserRole);
    }
  }, []);

  // Function to handle user login
  const login = (newToken: string, role: UserRole) => {
    // Store authentication data in localStorage
    localStorage.setItem('token', newToken);
    localStorage.setItem('userRole', role as string);
    // Update state
    setToken(newToken);
    setUserRole(role);
  };

  // Function to handle user logout
  const logout = () => {
    // Remove authentication data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    // Clear state
    setToken(null);
    setUserRole(null);
  };

  // Helper functions to check user status
  const isAuthenticated = () => !!token;  // Returns true if token exists
  const isAdmin = () => userRole === 'admin';  // Returns true if user is admin
  const isUser = () => userRole === 'user';    // Returns true if user is regular user

  // Create the context value object
  const contextValue = {
    token,
    userRole,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    isUser,
  };

  // Provide the authentication context to all children components
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};