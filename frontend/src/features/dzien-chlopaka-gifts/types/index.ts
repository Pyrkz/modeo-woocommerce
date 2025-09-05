/**
 * Types for Dzień Chłopaka gifts feature
 */

import { Product } from '@/features/shop/types';

// Use standard Product type instead of custom types
export type { Product } from '@/features/shop/types';

/**
 * Dzień Chłopaka specific filters
 */
export interface DzienChlopakaFilters {
  featured?: boolean;
  on_sale?: boolean;
  price_min?: number;
  price_max?: number;
  orderby?: 'date' | 'title' | 'price' | 'popularity' | 'rating' | 'menu_order';
  order?: 'asc' | 'desc';
}

/**
 * Response type for Dzień Chłopaka products API
 */
export interface DzienChlopakaGiftsResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
  isEmpty: boolean;
}

/**
 * Hook configuration for Dzień Chłopaka gifts
 */
export interface UseDzienChlopakaGiftsConfig {
  filters?: DzienChlopakaFilters;
  initialPage?: number;
  initialPerPage?: number;
  enabled?: boolean;
}

/**
 * Hook return type for Dzień Chłopaka gifts
 */
export interface UseDzienChlopakaGiftsReturn {
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
 * Men's Day product category mapping
 */
export const DZIEN_CHLOPAKA_CATEGORY_SLUGS = [
  'dzien-chlopaka',
  'chlopaka',
  'chlopak',
  'men-day',
  'mens-day',
  'boys-day',
  'international-mens-day'
] as const;

export type DzienChlopakaCategorySlug = typeof DZIEN_CHLOPAKA_CATEGORY_SLUGS[number];

/**
 * Men's Day themed product properties
 */
export interface DzienChlopakaProductProps {
  product: Product;
  showMensTheme?: boolean;
  showMaleIcon?: boolean;
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => void;
  priority?: boolean;
  className?: string;
}

/**
 * Men's Day gift ideas categories
 */
export const DZIEN_CHLOPAKA_GIFT_CATEGORIES = [
  {
    id: 'personalized',
    name: 'Personalizowane',
    icon: '🎯',
    description: 'Spersonalizowane prezenty dla mężczyzn'
  },
  {
    id: 'clothing',
    name: 'Odzież',
    icon: '👕',
    description: 'Stylowe koszulki i bluzy'
  },
  {
    id: 'accessories',
    name: 'Akcesoria',
    icon: '⌚',
    description: 'Męskie dodatki i gadżety'
  },
  {
    id: 'hobby',
    name: 'Hobby',
    icon: '🎮',
    description: 'Prezenty związane z zainteresowaniami'
  }
] as const;

export type DzienChlopakaGiftCategory = typeof DZIEN_CHLOPAKA_GIFT_CATEGORIES[number];

/**
 * Men's Day color scheme
 */
export const DZIEN_CHLOPAKA_COLORS = {
  primary: 'blue-600',
  secondary: 'indigo-500',
  accent: 'navy-600',
  light: 'blue-50',
  background: 'indigo-50'
} as const;