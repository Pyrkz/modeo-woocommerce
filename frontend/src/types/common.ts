// Common Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  status?: number;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface LoadingState {
  loading: boolean;
  error: string | null;
}

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Environment Config
export interface Environment {
  isDevelopment: boolean;
  isProduction: boolean;
  apiBaseUrl: string;
  frontendUrl: string;
  wordPressUrl: string;
}

// Navigation
export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  active?: boolean;
  external?: boolean;
}

// UI States
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type AlertType = 'info' | 'success' | 'warning' | 'error';