import { API_ENDPOINTS } from '@/config/env';

// API configuration
export const API_BASE_URL = API_ENDPOINTS.WC_API;

// Common API request options
export const getApiOptions = (nonce?: string): RequestInit => ({
  credentials: 'include' as RequestCredentials,
  headers: {
    'Content-Type': 'application/json',
    ...(nonce && { 'Nonce': nonce }),
  },
});

// Generic API request function
export const apiRequest = async <T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...getApiOptions(),
    ...options,
    headers: {
      ...getApiOptions().headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Product API functions
export const productApi = {
  getProducts: async (params: Record<string, string | number> = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    
    const endpoint = `/products?${searchParams.toString()}`;
    return apiRequest(endpoint);
  },

  getProduct: async (id: number) => {
    return apiRequest(`/products/${id}`);
  },

  searchProducts: async (query: string, params: Record<string, string | number> = {}) => {
    return productApi.getProducts({ search: query, ...params });
  },
};

// Cart API functions
export const cartApi = {
  getCart: async () => {
    return apiRequest('/cart');
  },

  addItem: async (data: { id: number; quantity: number }, nonce?: string) => {
    return apiRequest('/cart/add-item', {
      method: 'POST',
      headers: nonce ? { 'Nonce': nonce } : {},
      body: JSON.stringify(data),
    });
  },

  updateItem: async (itemKey: string, quantity: number, nonce?: string) => {
    return apiRequest(`/cart/items/${itemKey}`, {
      method: 'POST',
      headers: nonce ? { 'Nonce': nonce } : {},
      body: JSON.stringify({ quantity }),
    });
  },

  removeItem: async (itemKey: string, nonce?: string) => {
    return apiRequest(`/cart/items/${itemKey}`, {
      method: 'DELETE',
      headers: nonce ? { 'Nonce': nonce } : {},
    });
  },
};

// Error handling utility
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Wystąpił nieoczekiwany błąd';
};