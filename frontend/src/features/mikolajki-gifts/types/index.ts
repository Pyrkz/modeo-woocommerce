import { Product } from '@/types/product';

export interface MikolajkiFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  featured?: boolean;
  search?: string;
}

export interface MikolajkiGiftsResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
  isEmpty: boolean;
}