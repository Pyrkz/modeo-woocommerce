// Main Page Component
export { EventyBrandingPageOptimized } from './components/EventyBrandingPageOptimized';

// WooCommerce Components
export { EventyWooCommerceProducts } from './components/EventyWooCommerceProducts';

// Section Components
export { EventyHeroSection } from './components/sections/EventyHeroSection';
export { EventyServicesSection } from './components/sections/EventyServicesSection';
export { EventyBenefitsSection } from './components/sections/EventyBenefitsSection';

// UI Components
export { EventyServiceCard } from './components/ui/EventyServiceCard';
export { EventyStatsCard } from './components/ui/EventyStatsCard';
export { EventyFeatureCard } from './components/ui/EventyFeatureCard';

// Hooks
export { useEventyPreload } from './hooks/useEventyPreload';

// Utils
export * from './utils/performance';

// Data
export { eventyData, eventyServices, eventyStats, eventyFeatures, eventyBenefits } from './data/eventyData';

// Types
export type { 
  EventyService, 
  EventyStats, 
  EventyFeature,
  EventyBenefit 
} from './types';