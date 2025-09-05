import { Product } from '@/types/product';

export interface ImieninyFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  featured?: boolean;
  search?: string;
}

export interface ImieninyGiftsResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
  isEmpty: boolean;
}