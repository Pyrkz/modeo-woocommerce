/**
 * Types for Dzień Mamy gifts feature
 */

import { Product } from '@/features/shop/types';

// Use standard Product type instead of custom types
export type { Product } from '@/features/shop/types';

/**
 * Dzień Mamy specific filters
 */
export interface DzienMamyFilters {
  featured?: boolean;
  on_sale?: boolean;
  price_min?: number;
  price_max?: number;
  orderby?: 'date' | 'title' | 'price' | 'popularity' | 'rating' | 'menu_order';
  order?: 'asc' | 'desc';
}

/**
 * Response type for Dzień Mamy products API
 */
export interface DzienMamyGiftsResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
  isEmpty: boolean;
}

/**
 * Hook configuration for Dzień Mamy gifts
 */
export interface UseDzienMamyGiftsConfig {
  filters?: DzienMamyFilters;
  initialPage?: number;
  initialPerPage?: number;
  enabled?: boolean;
}

/**
 * Hook return type for Dzień Mamy gifts
 */
export interface UseDzienMamyGiftsReturn {
  // Data
  products: Product[];
  total: number;
  hasMore: boolean;
  isEmpty: boolean;
  
  // State
  loading: boolean;
  error: string | null;
  isValidating: boolean;
  
  // Actions
  loadMore: () => Promise<void>;
  retry: () => void;
  refresh: () => Promise<void>;
  
  // Pagination
  currentPage: number;
  perPage: number;
  totalPages: number;
}

/**
 * Mother's Day product category mapping
 */
export const DZIEN_MAMY_CATEGORY_SLUGS = [
  'dzien-mamy',
  'mama',
  'mother',
  'mothers-day'
] as const;

export type DzienMamyCategorySlug = typeof DZIEN_MAMY_CATEGORY_SLUGS[number];

/**
 * Mother's Day themed product properties
 */
export interface DzienMamyProductProps {
  product: Product;
  showMothersTheme?: boolean;
  showHeartIcon?: boolean;
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => void;
  priority?: boolean;
  className?: string;
}

/**
 * Mother's Day gift ideas categories
 */
export const DZIEN_MAMY_GIFT_CATEGORIES = [
  {
    id: 'personalized',
    name: 'Personalizowane',
    icon: '💝',
    description: 'Spersonalizowane prezenty dla mamy'
  },
  {
    id: 'clothing',
    name: 'Odzież',
    icon: '👚', 
    description: 'Koszulki i bluzy na Dzień Mamy'
  },
  {
    id: 'accessories',
    name: 'Akcesoria',
    icon: '💎',
    description: 'Eleganckie dodatki dla mamy'
  },
  {
    id: 'keepsakes',
    name: 'Pamiątki',
    icon: '📸',
    description: 'Trwałe wspomnienia na Dzień Mamy'
  }
] as const;

export type DzienMamyGiftCategory = typeof DZIEN_MAMY_GIFT_CATEGORIES[number];

/**
 * Mother's Day color scheme
 */
export const DZIEN_MAMY_COLORS = {
  primary: 'pink-600',
  secondary: 'rose-500',
  accent: 'purple-500',
  light: 'pink-50',
  background: 'rose-50'
} as const;