// Main Page Component
export { FirmyBrandingPageOptimized } from './components/FirmyBrandingPageOptimized';

// WooCommerce Components
export { FirmyWooCommerceProducts } from './components/FirmyWooCommerceProducts';

// Section Components
export { FirmyHeroSection } from './components/sections/FirmyHeroSection';
export { FirmyServicesSection } from './components/sections/FirmyServicesSection';
export { FirmyBenefitsSection } from './components/sections/FirmyBenefitsSection';
export { FirmyCtaSection } from './components/sections/FirmyCtaSection';

// UI Components
export { FirmyServiceCard } from './components/ui/FirmyServiceCard';
export { FirmyStatsCard } from './components/ui/FirmyStatsCard';
export { FirmyFeatureCard } from './components/ui/FirmyFeatureCard';

// Hooks
export { useFirmyPreload } from './hooks/useFirmyPreload';

// Utils
export * from './utils/performance';

// Data
export { firmyData, firmyServices, firmyStats, firmyFeatures } from './data/firmyData';

// Types
export type { 
  FirmyService, 
  FirmyStats, 
  FirmyFeature,
  FirmyBenefit 
} from './types';