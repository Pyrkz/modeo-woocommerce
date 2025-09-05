/**
 * Types for Dzień Taty gifts feature
 */

import { Product } from '@/features/shop/types';

// Use standard Product type instead of custom types
export type { Product } from '@/features/shop/types';

/**
 * Dzień Taty specific filters
 */
export interface DzienTatyFilters {
  featured?: boolean;
  on_sale?: boolean;
  price_min?: number;
  price_max?: number;
  orderby?: 'date' | 'title' | 'price' | 'popularity' | 'rating' | 'menu_order';
  order?: 'asc' | 'desc';
}

/**
 * Response type for Dzień Taty products API
 */
export interface DzienTatyGiftsResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
  isEmpty: boolean;
}

/**
 * Hook configuration for Dzień Taty gifts
 */
export interface UseDzienTatyGiftsConfig {
  filters?: DzienTatyFilters;
  initialPage?: number;
  initialPerPage?: number;
  enabled?: boolean;
}

/**
 * Hook return type for Dzień Taty gifts
 */
export interface UseDzienTatyGiftsReturn {
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
 * Father's Day product category mapping
 */
export const DZIEN_TATY_CATEGORY_SLUGS = [
  'dzien-taty',
  'tata',
  'father',
  'fathers-day',
  'ojciec'
] as const;

export type DzienTatyCategorySlug = typeof DZIEN_TATY_CATEGORY_SLUGS[number];

/**
 * Father's Day themed product properties
 */
export interface DzienTatyProductProps {
  product: Product;
  showFathersTheme?: boolean;
  showDadIcon?: boolean;
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => void;
  priority?: boolean;
  className?: string;
}

/**
 * Father's Day gift ideas categories
 */
export const DZIEN_TATY_GIFT_CATEGORIES = [
  {
    id: 'personalized',
    name: 'Personalizowane',
    icon: '🎁',
    description: 'Spersonalizowane prezenty dla taty'
  },
  {
    id: 'clothing',
    name: 'Odzież',
    icon: '👕', 
    description: 'Koszulki i bluzy na Dzień Taty'
  },
  {
    id: 'accessories',
    name: 'Akcesoria',
    icon: '⚡',
    description: 'Stylowe dodatki dla ojca'
  },
  {
    id: 'keepsakes',
    name: 'Pamiątki',
    icon: '🏆',
    description: 'Trwałe wspomnienia na Dzień Taty'
  }
] as const;

export type DzienTatyGiftCategory = typeof DZIEN_TATY_GIFT_CATEGORIES[number];

/**
 * Father's Day color scheme
 */
export const DZIEN_TATY_COLORS = {
  primary: 'blue-600',
  secondary: 'indigo-500',
  accent: 'gray-600',
  light: 'blue-50',
  background: 'slate-50'
} as const;