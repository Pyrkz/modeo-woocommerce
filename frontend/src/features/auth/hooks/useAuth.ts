'use client';

import { useState, useEffect, useCallback } from 'react';
import { User, AuthHookReturn } from '@/types/auth';
import { authApi } from '../api/auth.api';
import { buildRedirectUrl, storage } from '@/lib/utils';

// Auth cache key
const AUTH_CACHE_KEY = 'modeo_user_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface UserCache {
  user: User;
  timestamp: number;
}

export function useAuth(): AuthHookReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in
  const isLoggedIn = Boolean(user?.isLoggedIn);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load user from cache
  const loadFromCache = useCallback((): User | null => {
    try {
      const cached = storage.get<UserCache>(AUTH_CACHE_KEY);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.user;
      }
    } catch (error) {
      console.warn('Failed to load user from cache:', error);
    }
    return null;
  }, []);

  // Save user to cache
  const saveToCache = useCallback((userData: User) => {
    try {
      storage.set<UserCache>(AUTH_CACHE_KEY, {
        user: userData,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.warn('Failed to save user to cache:', error);
    }
  }, []);

  // Clear cache
  const clearCache = useCallback(() => {
    storage.remove(AUTH_CACHE_KEY);
  }, []);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await authApi.checkAuth();

      if (result.success && result.user) {
        setUser(result.user);
        saveToCache(result.user);
      } else {
        setUser(null);
        clearCache();
      }
    } catch (err) {
      setError('Nie udało się sprawdzić statusu logowania');
      console.error('Auth check failed:', err);
    } finally {
      setLoading(false);
    }
  }, [saveToCache, clearCache]);

  // Login redirect
  const login = useCallback((returnUrl?: string) => {
    const redirectUrl = returnUrl || window.location.pathname;
    const loginUrl = authApi.buildLoginUrl(buildRedirectUrl(redirectUrl));
    window.location.href = loginUrl;
  }, []);

  // Register redirect
  const register = useCallback((returnUrl?: string) => {
    const redirectUrl = returnUrl || '/welcome';
    const registerUrl = authApi.buildRegisterUrl(buildRedirectUrl(redirectUrl));
    window.location.href = registerUrl;
  }, []);

  // Logout redirect
  const logout = useCallback(() => {
    const returnUrl = window.location.origin;
    const logoutUrl = authApi.buildLogoutUrl(returnUrl);
    
    // Clear cache before redirect
    clearCache();
    setUser(null);
    
    window.location.href = logoutUrl;
  }, [clearCache]);

  // Initial auth check + periodic refresh
  useEffect(() => {
    let isMounted = true;
    let refreshInterval: NodeJS.Timeout;

    const checkInitialAuth = async () => {
      // Try cache first (but don't rely on it too much)
      const cachedUser = loadFromCache();
      if (cachedUser && isMounted) {
        setUser(cachedUser);
        setLoading(false);
        
        // Still verify with server in background
        setTimeout(async () => {
          if (isMounted) {
            await verifyWithServer();
          }
        }, 1000);
        return;
      }

      await verifyWithServer();
    };

    // Listen for window focus events to refresh auth status
    const handleWindowFocus = () => {
      console.log('🔐 Window focused, checking auth status...');
      if (isMounted) {
        verifyWithServer();
      }
    };
    
    window.addEventListener('focus', handleWindowFocus);

    const verifyWithServer = async () => {
      try {
        const result = await authApi.checkAuth();

        if (!isMounted) return;

        if (result.success && result.user) {
          setUser(result.user);
          saveToCache(result.user);
          setError(null);
          
          // Set up periodic refresh if logged in
          if (!refreshInterval) {
            refreshInterval = setInterval(async () => {
              if (isMounted) {
                try {
                  const freshResult = await authApi.checkAuth();
                  if (freshResult.success && freshResult.user) {
                    setUser(freshResult.user);
                    saveToCache(freshResult.user);
                  } else {
                    setUser(null);
                    clearCache();
                  }
                } catch (refreshErr) {
                  console.log('Background refresh failed:', refreshErr);
                }
              }
            }, 5 * 60 * 1000); // Refresh co 5 minut
          }
        } else {
          setUser(null);
          clearCache();
        }
      } catch (err) {
        if (isMounted) {
          setError('Nie udało się sprawdzić statusu logowania');
          console.error('Auth check failed:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkInitialAuth();

    return () => {
      isMounted = false;
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [loadFromCache, saveToCache, clearCache]);

  return {
    user,
    loading,
    error,
    isLoggedIn,
    login,
    logout,
    register,
    refreshUser,
    clearError,
  };
}