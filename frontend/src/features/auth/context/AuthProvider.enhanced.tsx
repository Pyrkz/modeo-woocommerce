'use client';

import React, { useReducer, useEffect, ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { authApi } from '../api/auth.api';
import type { 
  User, 
  AuthState, 
  AuthContextType, 
  AuthError,   
  AuthErrorCode 
} from '@/types/auth';

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isInitialized: false,
  error: null,
};

// Auth actions (same as yours)
type AuthAction =
  | { type: 'INIT_START' }
  | { type: 'INIT_SUCCESS'; payload: { user: User | null } }
  | { type: 'INIT_ERROR'; payload: AuthError }
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR'; payload: AuthError }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_ERROR'; payload: AuthError }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE_START' }
  | { type: 'UPDATE_PROFILE_SUCCESS'; payload: User }
  | { type: 'UPDATE_PROFILE_ERROR'; payload: AuthError }
  | { type: 'CLEAR_ERROR' };

// Helper function
const createAuthError = (message: string, code: AuthErrorCode = 'UNKNOWN_ERROR'): AuthError => ({
  code,
  message
});

// Reducer (uproszczony)
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'INIT_START':
      return { ...state, isLoading: true };
    case 'INIT_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: !!action.payload.user,
        isLoading: false,
        isInitialized: true,
        error: null,
      };
    case 'INIT_ERROR':
      return {
        ...state,
        isLoading: false,
        isInitialized: true,
        error: action.payload,
      };
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

// AuthProvider Props
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 🚀 ULEPSZONA inicjalizacja z istniejącym API
  useEffect(() => {
    const initializeAuth = async () => {
      dispatch({ type: 'INIT_START' });

      try {
        // Użyj istniejącego authApi.checkAuth()
        const result = await authApi.checkAuth();
        
        if (result.success && result.user) {
          dispatch({ type: 'INIT_SUCCESS', payload: { user: result.user } });
        } else {
          dispatch({ type: 'INIT_SUCCESS', payload: { user: null } });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        const authError = createAuthError('Failed to initialize auth', 'SERVER_ERROR');
        dispatch({ type: 'INIT_ERROR', payload: authError });
      }
    };

    initializeAuth();
  }, []);

  // 🔄 Auto-refresh co 5 minut (jeśli zalogowany)
  useEffect(() => {
    if (!state.isAuthenticated || !state.user) return;

    const interval = setInterval(async () => {
      try {
        const result = await authApi.checkAuth();
        if (result.success && result.user) {
          // Cichy refresh - bez loading state
          dispatch({ type: 'INIT_SUCCESS', payload: { user: result.user } });
        } else {
          // Sesja wygasła
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        console.log('Background auth check failed:', error);
      }
    }, 5 * 60 * 1000); // 5 minut

    return () => clearInterval(interval);
  }, [state.isAuthenticated, state.user]);

  // Login - przekierowanie do WordPress
  const login = async (): Promise<void> => {
    // WordPress-native login redirect
    const returnUrl = window.location.pathname;
    const loginUrl = authApi.buildLoginUrl(returnUrl);
    window.location.href = loginUrl;
  };

  // Register - przekierowanie do WordPress  
  const register = (returnUrl?: string): void => {
    const redirectUrl = returnUrl || '/welcome';
    const registerUrl = authApi.buildRegisterUrl(redirectUrl);
    window.location.href = registerUrl;
  };

  // Logout - WordPress logout
  const logout = async (): Promise<void> => {
    try {
      const returnUrl = window.location.origin;
      const logoutUrl = authApi.buildLogoutUrl(returnUrl);
      
      // Wyczyść local state
      dispatch({ type: 'LOGOUT' });
      
      // Przekieruj do WordPress logout
      window.location.href = logoutUrl;
    } catch (error) {
      console.error('Logout error:', error);
      dispatch({ type: 'LOGOUT' });
    }
  };

  // Refresh User
  const refreshUser = async (): Promise<void> => {
    try {
      const result = await authApi.checkAuth();
      if (result.success && result.user) {
        dispatch({ type: 'INIT_SUCCESS', payload: { user: result.user } });
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    } catch {
      const authError: AuthError = createAuthError('Refresh failed', 'REFRESH_FAILED');
      dispatch({ type: 'INIT_ERROR', payload: authError });
    }
  };


  // Clear Error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Context value
  const value: AuthContextType = {
    user: state.user,
    loading: state.isLoading,
    error: state.error?.message || null,
    isLoggedIn: state.isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}