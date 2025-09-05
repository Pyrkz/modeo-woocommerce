/**
 * Types for Dzień Dziadka gifts feature
 */

import { Product } from '@/features/shop/types';

// Use standard Product type instead of custom types
export type { Product } from '@/features/shop/types';

/**
 * Dzień Dziadka specific filters
 */
export interface DzienDziadkaFilters {
  featured?: boolean;
  on_sale?: boolean;
  price_min?: number;
  price_max?: number;
  orderby?: 'date' | 'title' | 'price' | 'popularity' | 'rating' | 'menu_order';
  order?: 'asc' | 'desc';
  category?: string;
  priceRange?: { min?: number; max?: number; };
  search?: string;
  style?: string;
  occasion?: string;
}

/**
 * Response type for Dzień Dziadka products API
 */
export interface DzienDziadkaGiftsResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
  isEmpty: boolean;
}

/**
 * Hook configuration for Dzień Dziadka gifts
 */
export interface UseDzienDziadkaGiftsConfig {
  filters?: DzienDziadkaFilters;
  initialPage?: number;
  initialPerPage?: number;
  enabled?: boolean;
}

/**
 * Hook return type for Dzień Dziadka gifts
 */
export interface UseDzienDziadkaGiftsReturn {
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
 * Grandfather's Day product category mapping
 */
export const DZIEN_DZIADKA_CATEGORY_SLUGS = [
  'dzien-dziadka',
  'dziadka',
  'dziadek',
  'grandfather',
  'grandpa',
  'grandfathers-day'
] as const;

export type DzienDziatkaCategorySlug = typeof DZIEN_DZIADKA_CATEGORY_SLUGS[number];

/**
 * Grandfather's Day themed product properties
 */
export interface DzienDziadkaProductProps {
  product: Product;
  showGrandfathersTheme?: boolean;
  showWisdomIcon?: boolean;
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => void;
  priority?: boolean;
  className?: string;
}

/**
 * Grandfather's Day gift ideas categories
 */
export const DZIEN_DZIADKA_GIFT_CATEGORIES = [
  {
    id: 'personalized',
    name: 'Personalizowane',
    icon: '🎯',
    description: 'Spersonalizowane prezenty dla dziadka'
  },
  {
    id: 'clothing',
    name: 'Odzież',
    icon: '👔', 
    description: 'Eleganckie koszulki i bluzy'
  },
  {
    id: 'accessories',
    name: 'Akcesoria',
    icon: '🎩',
    description: 'Stylowe dodatki dla dziadka'
  },
  {
    id: 'keepsakes',
    name: 'Pamiątki',
    icon: '🏅',
    description: 'Pamiątki rodzinne'
  }
] as const;

export type DzienDziadkaGiftCategory = typeof DZIEN_DZIADKA_GIFT_CATEGORIES[number];

/**
 * Grandfather's Day color scheme
 */
export const DZIEN_DZIADKA_COLORS = {
  primary: 'emerald-600',
  secondary: 'teal-500',
  accent: 'green-600',
  light: 'emerald-50',
  background: 'teal-50'
} as const;