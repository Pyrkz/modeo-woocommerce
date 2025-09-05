export interface ProductImage {
  id: number;
  src: string;
  thumbnail: string;
  alt: string;
  name?: string;
}

export interface ProductPrices {
  price: string;
  regular_price: string;
  sale_price: string;
  currency_symbol: string;
  currency_code: string;
  currency_minor_unit?: number;
  currency_decimal_separator?: string;
  currency_thousand_separator?: string;
  currency_prefix?: string;
  currency_suffix?: string;
}

// Product variation attribute structure
export interface ProductVariationAttribute {
  name: string;
  value: string;
}

// Product variation structure (from Store API)
export interface ProductVariation {
  id: number;
  attributes: ProductVariationAttribute[];
  images?: ProductImage[]; // Images specific to this variation
  prices?: ProductPrices; // Variation-specific pricing
  stock_status?: string;
  is_purchasable?: boolean;
  is_in_stock?: boolean;
  sku?: string;
  weight?: string;
  description?: string; // Variation description from WooCommerce
}

// Swatch types from attribute swatches system
export type SwatchType = 'none' | 'color' | 'label' | 'image';

// Product attribute term with enhanced swatch support for images, colors, and patterns
export interface ProductAttributeTerm {
  id: number;
  name: string;
  slug: string;
  description?: string;
  // Legacy color support
  color?: string; // RGB color value from WooCommerce taxonomy meta
  // Enhanced swatch system support
  swatch_type?: SwatchType;
  swatch_value?: string; // Color hex, image URL, or label text
  // Taxonomy image support (for patterns, textures, etc.)
  image?: {
    id: number;
    url: string;
    thumbnail?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
}

// Product attribute structure with variation support
export interface ProductAttribute {
  id: number;
  name: string;
  taxonomy?: string | null;
  has_variations: boolean;
  terms: ProductAttributeTerm[];
  // Legacy support
  option?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  images: ProductImage[];
  prices: ProductPrices;
  stock_status: string | null;
  is_in_stock?: boolean;
  permalink: string;
  type?: string;
  status?: string;
  featured?: boolean;
  catalog_visibility?: string;
  date_created?: string;
  date_modified?: string;
  sku?: string;
  weight?: string;
  dimensions?: {
    length: string;
    width: string;
    height: string;
  };
  categories?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  tags?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  attributes?: ProductAttribute[];
  variations?: ProductVariation[];
  has_options?: boolean;
  is_purchasable?: boolean;
  parent?: number; // For variation products
  average_rating?: string;
  rating_count?: number;
  related_ids?: number[];
  upsell_ids?: number[];
  cross_sell_ids?: number[];
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}