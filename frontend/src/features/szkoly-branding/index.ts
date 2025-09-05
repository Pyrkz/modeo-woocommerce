// Main Page Component
export { SzkolyBrandingPageOptimized } from './components/SzkolyBrandingPageOptimized';

// WooCommerce Components
export { SzkolyWooCommerceProducts } from './components/SzkolyWooCommerceProducts';

// Section Components
export { SzkolyHeroSection } from './components/sections/SzkolyHeroSection';
export { SzkolyServicesSection } from './components/sections/SzkolyServicesSection';
export { SzkolyBenefitsSection } from './components/sections/SzkolyBenefitsSection';

// UI Components
export { SzkolyServiceCard } from './components/ui/SzkolyServiceCard';
export { SzkolyStatsCard } from './components/ui/SzkolyStatsCard';
export { SzkolyFeatureCard } from './components/ui/SzkolyFeatureCard';

// Hooks
export { useSzkolyPreload } from './hooks/useSzkolyPreload';
export { useSzkolyBrandingOptimized } from './hooks/useSzkolyBrandingOptimized';

// Utils
export * from './utils/performance';

// Data
export { szkolyData, szkolyServices, szkolyStats, szkolyFeatures, szkolyBenefits } from './data/szkolyData';

// Types
export type { 
  SzkolyService, 
  SzkolyStats, 
  SzkolyFeature,
  SzkolyBenefit 
} from './types';