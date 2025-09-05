import { Product } from '@/types/product';

export interface WalentynkiGiftsResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
  isEmpty: boolean;
}

export interface WalentynkiFilters {
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