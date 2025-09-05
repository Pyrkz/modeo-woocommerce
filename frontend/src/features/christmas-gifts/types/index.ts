import { Product } from '@/types/product';

export interface ChristmasGiftsResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
  isEmpty: boolean;
}

export interface ChristmasFilters {
  category?: string;
  priceRange?: {
    min?: number;
    max?: number;
  };
  featured?: boolean;
  search?: string;
}

// Re-export Product type for convenience
export type { Product };