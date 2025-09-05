import { Product } from '@/types/product';
import { ShopFilters } from '../types';
import { config } from '@/lib/config';
import { transformProductsImages } from '@/utils/imageUrl';

// WooCommerce REST API response types (different from Store API)
interface WCRestApiProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  status: string;
  featured: boolean;
  sku: string;
  type: string;
  stock_status: string;
  stock_quantity: number | null;
  manage_stock: boolean;
  price: string;
  regular_price: string;
  sale_price: string;
  categories: Array<{ id: number; name: string; slug: string }>;
  tags: Array<{ id: number; name: string; slug: string }>;
  images: Array<{
    id: number;
    src: string;
    alt: string;
    name: string;
  }>;
  attributes: Array<{
    id: number;
    name: string;
    slug: string;
    has_variations: boolean;
    terms: Array<{ id: number; name: string; slug: string }>;
  }>;
  variations: number[];
  [key: string]: unknown; // Additional fields from WooCommerce
}

interface WCRestApiVariation {
  id: number;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: string;
  stock_quantity: number | null;
  manage_stock: boolean;
  attributes: Array<{
    id: number;
    name: string;
    slug: string;
    option: string;
  }>;
  image: {
    id: number;
    src: string;
    alt: string;
    name: string;
  } | null;
  [key: string]: unknown; // Additional fields from WooCommerce
}

const API_BASE_URL = config.getApiUrl();

export interface ProductsResponse {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

export class ShopApi {
  private static buildProductsUrl(filters: ShopFilters = {}, page: number = 1, perPage: number = 8): string {
    const url = new URL(`${API_BASE_URL}/wp-json/wc/store/products`);
    
    // Pagination
    url.searchParams.set('per_page', perPage.toString());
    url.searchParams.set('page', page.toString());
    
    // Search
    if (filters.search?.trim()) {
      url.searchParams.set('search', filters.search.trim());
    }
    
    // Category filter
    if (filters.category) {
      url.searchParams.set('category', filters.category);
    }
    
    // Color filter - Use correct WooCommerce Store API format
    if (filters.colors && filters.colors.length > 0) {
      // WooCommerce Store API expects attributes as array format
      // We need to build the query manually to avoid JSON stringification issues
      filters.colors.forEach((colorId, index) => {
        url.searchParams.set(`attributes[0][attribute]`, 'pa_kolor');
        url.searchParams.set(`attributes[0][term_id][${index}]`, colorId.toString());
        url.searchParams.set(`attributes[0][operator]`, 'in');
      });
    }
    
    // Price range
    if (filters.minPrice !== undefined && filters.minPrice > 0) {
      url.searchParams.set('min_price', (filters.minPrice * 100).toString()); // WooCommerce uses cents
    }
    if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
      url.searchParams.set('max_price', (filters.maxPrice * 100).toString());
    }
    
    // Stock status
    if (filters.inStock) {
      url.searchParams.set('stock_status', 'instock');
    }
    
    // Featured products
    if (filters.featured) {
      url.searchParams.set('featured', 'true');
    }
    
    // Sorting
    if (filters.sortBy) {
      url.searchParams.set('orderby', filters.sortBy);
      if (filters.sortOrder) {
        url.searchParams.set('order', filters.sortOrder);
      }
    }
    
    return url.toString();
  }

  static async fetchProducts(
    filters: ShopFilters = {}, 
    page: number = 1, 
    perPage: number = 8
  ): Promise<ProductsResponse> {
    const url = this.buildProductsUrl(filters, page, perPage);
    
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const products = await response.json();
    const totalHeader = response.headers.get('X-WP-Total');
    const totalPagesHeader = response.headers.get('X-WP-TotalPages');
    
    const total = totalHeader ? parseInt(totalHeader) : products.length;
    const totalPages = totalPagesHeader ? parseInt(totalPagesHeader) : 1;
    const hasMore = products.length >= perPage && page < totalPages;
    
    // Transform image URLs for production environment
    const transformedProducts = transformProductsImages(products);
    
    return {
      products: transformedProducts,
      total,
      totalPages,
      currentPage: page,
      hasMore,
    };
  }

  static async fetchNonce(): Promise<string | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/wp-json/wc/store/cart`, {
        credentials: 'include',
      });
      return response.headers.get('Nonce');
    } catch (error) {
      console.warn('Failed to fetch nonce:', error);
      return null;
    }
  }

  static async addToCart(productId: number, quantity: number = 1, variation?: { [key: string]: string }): Promise<unknown> {
    // Get nonce first (may not be needed in dev with nonce bypass plugin)
    const nonce = await this.fetchNonce();
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (nonce) {
      headers['Nonce'] = nonce;
    }

    const requestBody: Record<string, unknown> = {
      id: productId,
      quantity,
    };

    // If variation attributes are provided, include them
    if (variation) {
      requestBody.variation = variation;
    }
    
    const response = await fetch(`${API_BASE_URL}/wp-json/wc/store/cart/add-item`, {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add to cart: ${response.status} - ${errorText}`);
    }
    
    return response.json();
  }

  /**
   * Fetch a specific product variation by ID
   */
  static async fetchVariation(variationId: number): Promise<Product> {
    const url = `${API_BASE_URL}/wp-json/wc/store/products/${variationId}`;
    
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  /**
   * Fetch detailed product with stock information using WooCommerce REST API
   * This provides more detailed stock information than the Store API
   */
  static async fetchDetailedProduct(productId: number): Promise<WCRestApiProduct | null> {
    const url = `${API_BASE_URL}/wp-json/wc/v3/products/${productId}`;
    
    console.log('🔍 Fetching detailed product data from:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.warn(`⚠️ Failed to fetch detailed product: ${response.status}`);
      return null;
    }
    
    const detailedProduct = await response.json();
    console.log('📊 Detailed product data:', detailedProduct);
    return detailedProduct;
  }

  /**
   * Fetch detailed variations for a product using WooCommerce REST API
   */
  static async fetchDetailedVariations(productId: number): Promise<WCRestApiVariation[]> {
    const url = `${API_BASE_URL}/wp-json/wc/v3/products/${productId}/variations`;
    
    console.log('🔍 Fetching detailed variations from:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.warn(`⚠️ Failed to fetch detailed variations: ${response.status}`);
      return [];
    }
    
    const variations = await response.json();
    console.log('📊 Detailed variations data:', variations);
    return variations;
  }

  /**
   * Helper to determine if a product is variable and has options
   */
  static isVariableProduct(product: Product): boolean {
    return product.type === 'variable' && product.has_options === true && 
           Boolean(product.variations && product.variations.length > 0);
  }

  /**
   * Get available variation attributes for a variable product
   */
  static getVariationAttributes(product: Product): Array<{ name: string, options: string[] }> {
    if (!this.isVariableProduct(product)) return [];

    const variationAttributes: { [key: string]: Set<string> } = {};

    // Collect all unique attribute values from variations
    product.variations?.forEach(variation => {
      variation.attributes.forEach(attr => {
        if (!variationAttributes[attr.name]) {
          variationAttributes[attr.name] = new Set();
        }
        variationAttributes[attr.name].add(attr.value);
      });
    });

    // Convert to array format
    return Object.entries(variationAttributes).map(([name, optionsSet]) => ({
      name,
      options: Array.from(optionsSet)
    }));
  }

  /**
   * Find variation ID based on selected attributes
   */
  static findVariationId(product: Product, selectedAttributes: { [key: string]: string }): number | null {
    if (!this.isVariableProduct(product)) return null;

    const matchingVariation = product.variations?.find(variation => {
      return variation.attributes.every(attr => {
        const selectedValue = selectedAttributes[attr.name];
        const variationValue = attr.value;
        
        // Case-insensitive comparison for attribute values
        return selectedValue?.toLowerCase() === variationValue?.toLowerCase();
      });
    });

    return matchingVariation?.id || null;
  }
}