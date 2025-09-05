import { Product } from '@/types/product';

export interface DzienKobietGiftsResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
  isEmpty: boolean;
}

export interface DzienKobietFilters {
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