/**
 * Types for Dzień Babci gifts feature
 */

import { Product } from '@/types/product';

// Use standard Product type instead of custom types
export type { Product } from '@/types/product';

/**
 * Dzień Babci specific filters
 */
export interface DzienBabciFilters {
  category?: string;
  featured?: boolean;
  on_sale?: boolean;
  price_min?: number;
  price_max?: number;
  priceRange?: {
    min?: number;
    max?: number;
  };
  search?: string;
  style?: string;
  occasion?: string;
  orderby?: 'date' | 'title' | 'price' | 'popularity' | 'rating' | 'menu_order';
  order?: 'asc' | 'desc';
}

/**
 * Response type for Dzień Babci products API
 */
export interface DzienBabciGiftsResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
  isEmpty: boolean;
}

/**
 * Hook configuration for Dzień Babci gifts
 */
export interface UseDzienBabciGiftsConfig {
  filters?: DzienBabciFilters;
  initialPage?: number;
  initialPerPage?: number;
  enabled?: boolean;
}

/**
 * Hook return type for Dzień Babci gifts
 */
export interface UseDzienBabciGiftsReturn {
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
 * Grandmother's Day product category mapping
 */
export const DZIEN_BABCI_CATEGORY_SLUGS = [
  'dzien-babci',
  'babci',
  'babcia',
  'grandmother',
  'grandma',
  'grandmothers-day'
] as const;

export type DzienBabciCategorySlug = typeof DZIEN_BABCI_CATEGORY_SLUGS[number];

/**
 * Grandmother's Day themed product properties
 */
export interface DzienBabciProductProps {
  product: Product;
  showGrandmothersTheme?: boolean;
  showHeartIcon?: boolean;
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => void;
  priority?: boolean;
  className?: string;
}

/**
 * Grandmother's Day gift ideas categories
 */
export const DZIEN_BABCI_GIFT_CATEGORIES = [
  {
    id: 'personalized',
    name: 'Personalizowane',
    icon: '💐',
    description: 'Spersonalizowane prezenty dla babci'
  },
  {
    id: 'clothing',
    name: 'Odzież',
    icon: '🧥', 
    description: 'Eleganckie koszulki i bluzy'
  },
  {
    id: 'accessories',
    name: 'Akcesoria',
    icon: '👜',
    description: 'Stylowe dodatki dla babci'
  },
  {
    id: 'keepsakes',
    name: 'Pamiątki',
    icon: '📷',
    description: 'Pamiątki rodzinne'
  }
] as const;

export type DzienBabciGiftCategory = typeof DZIEN_BABCI_GIFT_CATEGORIES[number];

/**
 * Grandmother's Day color scheme
 */
export const DZIEN_BABCI_COLORS = {
  primary: 'purple-600',
  secondary: 'pink-500',
  accent: 'indigo-500',
  light: 'purple-50',
  background: 'pink-50'
} as const;