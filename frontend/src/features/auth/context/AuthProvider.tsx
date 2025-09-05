'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { config } from '@/lib/config';

interface User {
  id: number;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    isLoggedIn: false
  });
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      console.log('🔍 Checking authentication status...');
      
      const response = await fetch(`${config.getApiUrl()}/wp-json/modeo/v1/current-user`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('📦 User data received:', userData);
        
        setUser({
          id: userData.id || 0,
          name: userData.name || '',
          email: userData.email || '',
          isLoggedIn: userData.isLoggedIn || false
        });
        
        if (userData.isLoggedIn) {
          console.log('✅ User is logged in:', userData.name);
        }
      } else {
        console.log('ℹ️ User not authenticated');
        setUser({
          id: 0,
          name: '',
          email: '',
          isLoggedIn: false
        });
      }
    } catch (error) {
      console.error('❌ Error checking auth:', error);
      setUser({
        id: 0,
        name: '',
        email: '',
        isLoggedIn: false
      });
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    
    try {
      console.log('🔐 Attempting login for:', email);
      
      const response = await fetch(`${config.getApiUrl()}/wp-json/modeo/v1/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log('✅ Login successful');
        
        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          isLoggedIn: true
        });
        
        return { success: true };
      } else {
        console.log('❌ Login failed:', data.message);
        return { success: false, error: data.message || 'Błąd logowania' };
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      return { success: false, error: 'Błąd połączenia z serwerem' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 Logging out...');
      
      await fetch(`${config.getApiUrl()}/wp-json/modeo/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setUser({
        id: 0,
        name: '',
        email: '',
        isLoggedIn: false
      });
      
      console.log('✅ Logged out successfully');
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  };

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
    checkAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}