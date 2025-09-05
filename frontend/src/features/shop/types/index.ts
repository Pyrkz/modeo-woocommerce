// Import Product types for use in interfaces below
import type { Product } from '@/types/product';

export interface ShopFilters {
  search?: string;
  category?: string;
  colors?: number[]; // Array of color term IDs
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
  sortBy?: 'date' | 'title' | 'price' | 'popularity' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

export interface ShopState {
  products: Product[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  filters: ShopFilters;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    hasMore: boolean;
    perPage: number;
  };
}

export interface NotificationState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  show: boolean;
}

export interface ShopActions {
  loadProducts: (filters?: ShopFilters, page?: number, append?: boolean) => Promise<void>;
  loadMore: () => Promise<void>;
  updateFilters: (filters: Partial<ShopFilters>) => void;
  resetFilters: () => void;
  addToCart: (productId: number, quantity?: number, variation?: { [key: string]: string }) => Promise<void>;
  // Notifications
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

export interface ShopNotifications {
  notifications: NotificationState[];
}

export interface UseShopReturn extends ShopState, ShopActions, ShopNotifications {}

// Re-export Product types at the end
export type { Product, ProductImage, ProductPrices, ProductAttribute } from '@/types/product';