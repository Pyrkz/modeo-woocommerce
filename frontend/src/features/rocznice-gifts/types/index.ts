import { Product } from '@/types/product';

export interface RoczniceFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  featured?: boolean;
  search?: string;
}

export interface RoczniceGiftsResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
  isEmpty: boolean;
}