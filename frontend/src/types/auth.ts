// Auth Feature Types
export interface User {
  id: number;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string;
  roles?: string[];
  isLoggedIn: boolean;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  login: (returnUrl?: string) => void;
  logout: () => void;
  register: (returnUrl?: string) => void;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

// AuthHookReturn is equivalent to AuthContextType
export type AuthHookReturn = AuthContextType;

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: AuthError | null;
}

export interface AuthResponse {
  user: User | null;
  token: string;
  refreshToken: string;
}

export interface AuthError {
  code: AuthErrorCode;
  message: string;
}

export type AuthErrorCode = 
  | 'UNKNOWN_ERROR'
  | 'SERVER_ERROR'
  | 'REFRESH_FAILED'
  | 'LOGIN_FAILED'
  | 'LOGOUT_FAILED';

export interface LoginRedirectOptions {
  returnUrl?: string;
  autoRedirect?: boolean;
  preserveQuery?: boolean;
}

export interface AuthApiResponse {
  success: boolean;
  user?: User;
  message?: string;
  error?: string;
}

// WordPress User API Response
export interface WPUserResponse {
  id: number;
  name: string;
  email: string;
  first_name: string;
  last_name: string;
  nickname: string;
  description: string;
  avatar_urls: {
    24: string;
    48: string;
    96: string;
  };
  roles: string[];
  capabilities: Record<string, boolean>;
}