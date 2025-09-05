// Main components
export { 
  ProductCategoriesSection,
  ProductCategoriesGrid,
  ProductCategoriesHeader,
  ProductCategoryCard 
} from './components';

// UI components
export {
  OptimizedCategoryImage,
  CategoryOverlay,
  CategoryContent
} from './components/ui';

// Types
export type {
  ProductCategory,
  ProductCategoriesSection as ProductCategoriesSectionType,
  CategoryCardProps,
  CategoryGridProps
} from './types';

// Hooks
export {
  useProductCategories,
  useCategoriesPreload
} from './hooks';

// Data
export { productCategoriesData } from './data/categoriesData';

// Utils
export {
  generateImagePlaceholder,
  getCategorySizes,
  preloadCriticalImages
} from './utils';