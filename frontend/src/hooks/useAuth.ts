'use client';
import { useState, useEffect } from 'react';
import { API_ENDPOINTS, env } from '@/config/env';

interface User {
  id: number;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Sprawdź sesję WordPress
      const response = await fetch(API_ENDPOINTS.USER_ME, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          isLoggedIn: true,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (returnUrl?: string) => {
    const redirectUrl = returnUrl 
      ? `${window.location.origin}${returnUrl}`
      : window.location.href;
    
    window.location.href = `${env.wordPressUrl}/moje-konto/?redirect_to=${encodeURIComponent(redirectUrl)}`;
  };

  const logout = () => {
    window.location.href = `${env.wordPressUrl}/moje-konto/customer-logout/?redirect_to=${encodeURIComponent(window.location.origin)}`;
  };

  const register = () => {
    const redirectUrl = window.location.origin + '/welcome';
    window.location.href = `${env.wordPressUrl}/moje-konto/?redirect_to=${encodeURIComponent(redirectUrl)}#register`;
  };

  return {
    user,
    loading,
    isLoggedIn: !!user?.isLoggedIn,
    login,
    logout,
    register,
    checkAuth,
  };
}