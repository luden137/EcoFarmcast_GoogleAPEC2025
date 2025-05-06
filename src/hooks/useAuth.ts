import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User } from 'firebase/auth';

/**
 * Auth context interface
 */
export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: { displayName?: string; email?: string }) => Promise<User>;
}

/**
 * Custom hook to access the auth context
 * @returns Auth context values and methods
 */
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;
