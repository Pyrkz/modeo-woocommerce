// Main Page Component
export { NaPrezentGiftsPageOptimized } from './components/NaPrezentGiftsPageOptimized';

// Section Components  
export { NaPrezentHeroSection } from './components/sections/NaPrezentHeroSection';
export { NaPrezentCategoriesSection } from './components/sections/NaPrezentCategoriesSection';
export { NaPrezentWhySection } from './components/sections/NaPrezentWhySection';

// UI Components
export { NaPrezentStatsCard } from './components/ui/NaPrezentStatsCard';
export { NaPrezentCategoryCard } from './components/ui/NaPrezentCategoryCard';

// Hooks
export { useNaPrezentPreload } from './hooks/useNaPrezentPreload';

// Utils
export * from './utils/performance';

// Data
export { naPrezentData, naPrezentCategories, naPrezentStats, naPrezentFeatures } from './data/naPrezentData';

// Types
export type { 
  NaPrezentCategory, 
  NaPrezentStats, 
  NaPrezentFeature 
} from './types';