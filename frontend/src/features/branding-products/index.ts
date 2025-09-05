// Components
export { BrandingProductCard } from './components/BrandingProductCard';
export { BrandingProductGrid } from './components/BrandingProductGrid';
export { BrandingProductsByCategory } from './components/BrandingProductsByCategory';
export { ContactModal } from './components/ContactModal';

// Hooks
export { useLazyLoad } from './hooks/useLazyLoad';

// Utils
export { 
  BrandingProductsCache,
  measurePerformance,
  debounce,
  getOptimizedImageSrc,
  createIntersectionObserver 
} from './utils/performance';

// Re-export types if needed
export type { Product } from '@/types/product';