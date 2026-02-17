
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'process-owner' | 'modeler' | 'analyst' | 'viewer';
  department: string;
  permissions: string[];
  isActive: boolean;
  lastLogin?: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock users for demonstration
  const mockUsers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'admin@company.com',
      role: 'admin' as const,
      department: 'IT Operations',
      permissions: ['all'],
      isActive: true,
      password: 'admin123'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'user@company.com',
      role: 'modeler' as const,
      department: 'Business Analysis',
      permissions: ['read', 'write', 'model'],
      isActive: true,
      password: 'user123'
    }
  ];

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser && foundUser.isActive) {
      const userWithoutPassword = { ...foundUser, lastLogin: new Date() };
      delete (userWithoutPassword as any).password;
      
      setUser(userWithoutPassword);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${foundUser.name}!`
      });
      
      setIsLoading(false);
      return true;
    }
    
    toast({
      title: "Login Failed",
      description: "Invalid email or password",
      variant: "destructive"
    });
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out"
    });
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes('all') || user.permissions.includes(permission);
  };

  const hasRole = (role: string): boolean => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.role === role;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    hasPermission,
    hasRole,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
