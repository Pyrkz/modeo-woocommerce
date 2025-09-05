import { UrodzinyProduct } from '../types';

/**
 * Debounce function for search input
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for scroll events
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Memoized product filtering
 */
export const filterProducts = (
  products: UrodzinyProduct[],
  filters: {
    search?: string;
    category?: string;
    priceRange?: { min: number; max: number };
    inStock?: boolean;
    onSale?: boolean;
    featured?: boolean;
  }
): UrodzinyProduct[] => {
  return products.filter(product => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(searchTerm);
      const matchesDescription = product.short_description?.toLowerCase().includes(searchTerm);
      const matchesTags = product.tags?.some(tag => 
        tag.name.toLowerCase().includes(searchTerm)
      );
      
      if (!matchesName && !matchesDescription && !matchesTags) {
        return false;
      }
    }

    // Category filter
    if (filters.category) {
      const hasCategory = product.categories?.some(cat => 
        cat.slug === filters.category || cat.name.toLowerCase() === filters.category?.toLowerCase()
      );
      if (!hasCategory) return false;
    }

    // Price range filter
    if (filters.priceRange) {
      const price = parseFloat(product.price) || 0;
      if (price < filters.priceRange.min || price > filters.priceRange.max) {
        return false;
      }
    }

    // In stock filter
    if (filters.inStock !== undefined && product.in_stock !== filters.inStock) {
      return false;
    }

    // On sale filter
    if (filters.onSale !== undefined && product.on_sale !== filters.onSale) {
      return false;
    }

    // Featured filter
    if (filters.featured !== undefined && product.featured !== filters.featured) {
      return false;
    }

    return true;
  });
};

/**
 * Sort products based on criteria
 */
export const sortProducts = (
  products: UrodzinyProduct[],
  sortBy: 'popularity' | 'price_low' | 'price_high' | 'date' | 'title'
): UrodzinyProduct[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price_low':
      return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    
    case 'price_high':
      return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    
    case 'title':
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'pl'));
    
    case 'date':
      return sorted.sort((a, b) => b.id - a.id); // Newer products first
    
    case 'popularity':
    default:
      // Sort by featured first, then by ID
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.id - a.id;
      });
  }
};

/**
 * Calculate product discount percentage
 */
export const getDiscountPercentage = (regularPrice: string, salePrice: string): number => {
  const regular = parseFloat(regularPrice) || 0;
  const sale = parseFloat(salePrice) || 0;
  
  if (regular <= 0 || sale <= 0 || sale >= regular) return 0;
  
  return Math.round(((regular - sale) / regular) * 100);
};

/**
 * Format price for display
 */
export const formatPrice = (price: string | number): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numPrice);
};