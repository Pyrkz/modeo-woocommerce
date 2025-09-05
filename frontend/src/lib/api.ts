import { ApiResponse } from '@/types/common';

// API Configuration
export const API_CONFIG = {
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
};

// Enhanced fetch with error handling and retries
export async function apiRequest<T>(
  url: string,
  options: RequestInit & { 
    timeout?: number; 
    retries?: number;
    skipErrorHandling?: boolean;
  } = {}
): Promise<ApiResponse<T>> {
  const {
    timeout = API_CONFIG.timeout,
    retries = API_CONFIG.retries,
    skipErrorHandling = false,
    ...fetchOptions
  } = options;

  // Default headers
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  // Add credentials for WordPress API
  const defaultOptions: RequestInit = {
    credentials: 'include',
    headers: defaultHeaders,
    ...fetchOptions,
  };

  let lastError: Error;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...defaultOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      let data: T;

      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text() as T;
      }

      return {
        success: true,
        data,
        status: response.status,
      };

    } catch (error) {
      lastError = error as Error;
      
      if (attempt < retries && !lastError.name.includes('AbortError')) {
        // Wait before retry
        await new Promise(resolve => 
          setTimeout(resolve, API_CONFIG.retryDelay * (attempt + 1))
        );
        continue;
      }
      
      break;
    }
  }

  if (skipErrorHandling) {
    throw lastError!;
  }

  return {
    success: false,
    error: lastError!.message,
    status: 0,
  };
}

// Specific API methods
export const api = {
  get: <T>(url: string, options?: RequestInit) =>
    apiRequest<T>(url, { method: 'GET', ...options }),

  post: <T>(url: string, data?: unknown, options?: RequestInit) =>
    apiRequest<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }),

  put: <T>(url: string, data?: unknown, options?: RequestInit) =>
    apiRequest<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }),

  delete: <T>(url: string, options?: RequestInit) =>
    apiRequest<T>(url, { method: 'DELETE', ...options }),
};

// WordPress specific API helper
export const wpApi = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    api.get<T>(`/wp-json${endpoint}`, options),
    
  post: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    api.post<T>(`/wp-json${endpoint}`, data, options),
};