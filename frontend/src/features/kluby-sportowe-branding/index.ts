// Main Page Component
export { KlubyBrandingPageOptimized } from './components/KlubyBrandingPageOptimized';

// WooCommerce Components
export { KlubyWooCommerceProducts } from './components/KlubyWooCommerceProducts';

// Section Components
export { KlubyHeroSection } from './components/sections/KlubyHeroSection';
export { KlubyServicesSection } from './components/sections/KlubyServicesSection';
export { KlubyBenefitsSection } from './components/sections/KlubyBenefitsSection';

// UI Components
export { KlubyServiceCard } from './components/ui/KlubyServiceCard';
export { KlubyStatsCard } from './components/ui/KlubyStatsCard';
export { KlubyFeatureCard } from './components/ui/KlubyFeatureCard';

// Hooks
export { useKlubyPreload } from './hooks/useKlubyPreload';

// Utils
export * from './utils/performance';

// Data
export { klubyData, klubyServices, klubyStats, klubyFeatures, klubyBenefits } from './data/klubyData';

// Types
export type { 
  KlubyService, 
  KlubyStats, 
  KlubyFeature,
  KlubyBenefit 
} from './types';