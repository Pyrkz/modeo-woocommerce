export interface UrodzinyProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  attributes: Array<{
    id: number;
    name: string;
    options: string[];
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  in_stock: boolean;
  on_sale: boolean;
  featured: boolean;
  short_description: string;
  description: string;
}

export interface UrodzinyGiftsResponse {
  products: UrodzinyProduct[];
  total: number;
  hasMore: boolean;
  isEmpty: boolean;
}

export interface UrodzinyGiftsState {
  products: UrodzinyProduct[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  total: number;
}

export interface UrodzinyFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  inStock?: boolean;
  onSale?: boolean;
  featured?: boolean;
  search?: string;
  sortBy?: 'popularity' | 'price_low' | 'price_high' | 'date' | 'title';
}

export interface UrodzinyGiftsHookReturn {
  state: UrodzinyGiftsState;
  filters: UrodzinyFilters;
  actions: {
    loadMore: () => Promise<void>;
    setFilters: (filters: Partial<UrodzinyFilters>) => void;
    refresh: () => Promise<void>;
  };
}