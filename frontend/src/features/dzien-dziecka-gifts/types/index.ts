/**
 * Types for Dzień Dziecka gifts feature
 */

import { Product } from '@/types/product';

// Use standard Product type instead of custom types
export type { Product } from '@/types/product';

/**
 * Dzień Dziecka specific filters
 */
export interface DzienDzieckaFilters {
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
  ageRange?: string;
  gender?: string;
  orderby?: 'date' | 'title' | 'price' | 'popularity' | 'rating' | 'menu_order';
  order?: 'asc' | 'desc';
}

/**
 * Response type for Dzień Dziecka products API
 */
export interface DzienDzieckaGiftsResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
  isEmpty: boolean;
}

/**
 * Hook configuration for Dzień Dziecka gifts
 */
export interface UseDzienDzieckaGiftsConfig {
  filters?: DzienDzieckaFilters;
  initialPage?: number;
  initialPerPage?: number;
  enabled?: boolean;
}

/**
 * Hook return type for Dzień Dziecka gifts
 */
export interface UseDzienDzieckaGiftsReturn {
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
 * Children's Day product category mapping
 */
export const DZIEN_DZIECKA_CATEGORY_SLUGS = [
  'dzien-dziecka',
  'dziecka',
  'dziecko',
  'dzieci',
  'children',
  'kids',
  'childrens-day'
] as const;

export type DzienDzieckaCategorySlug = typeof DZIEN_DZIECKA_CATEGORY_SLUGS[number];

/**
 * Children's Day themed product properties
 */
export interface DzienDzieckaProductProps {
  product: Product;
  showChildrensTheme?: boolean;
  showPlayIcon?: boolean;
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => void;
  priority?: boolean;
  className?: string;
}

/**
 * Children's Day gift ideas categories
 */
export const DZIEN_DZIECKA_GIFT_CATEGORIES = [
  {
    id: 'personalized',
    name: 'Personalizowane',
    icon: '🎁',
    description: 'Spersonalizowane prezenty dla dzieci'
  },
  {
    id: 'clothing',
    name: 'Odzież',
    icon: '👕', 
    description: 'Koszulki i bluzy dla dzieci'
  },
  {
    id: 'accessories',
    name: 'Akcesoria',
    icon: '🎒',
    description: 'Zabawne dodatki dla małych'
  },
  {
    id: 'keepsakes',
    name: 'Pamiątki',
    icon: '🏆',
    description: 'Pamiątki z dzieciństwa'
  }
] as const;

export type DzienDzieckaGiftCategory = typeof DZIEN_DZIECKA_GIFT_CATEGORIES[number];

/**
 * Children's Day color scheme
 */
export const DZIEN_DZIECKA_COLORS = {
  primary: 'orange-500',
  secondary: 'yellow-500',
  accent: 'green-500',
  light: 'orange-50',
  background: 'yellow-50'
} as const;