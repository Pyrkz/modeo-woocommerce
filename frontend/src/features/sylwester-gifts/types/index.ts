import { Product } from '@/types/product';

export interface SylwesterFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  featured?: boolean;
  search?: string;
}

export interface SylwesterGiftsResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
  isEmpty: boolean;
}