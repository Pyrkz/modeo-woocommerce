// Main Page Component
export { RestauracjeBrandingPageOptimized } from './components/RestauracjeBrandingPageOptimized';

// WooCommerce Components
export { RestauracjeWooCommerceProducts } from './components/RestauracjeWooCommerceProducts';

// Section Components
export { RestauracjeHeroSection } from './components/sections/RestauracjeHeroSection';
export { RestauracjeServicesSection } from './components/sections/RestauracjeServicesSection';
export { RestauracjeBenefitsSection } from './components/sections/RestauracjeBenefitsSection';

// UI Components
export { RestauracjeServiceCard } from './components/ui/RestauracjeServiceCard';
export { RestauracjeStatsCard } from './components/ui/RestauracjeStatsCard';
export { RestauracjeFeatureCard } from './components/ui/RestauracjeFeatureCard';
export { RestauracjeBenefitCard } from './components/ui/RestauracjeBenefitCard';

// Hooks
export { useRestauracjePreload } from './hooks/useRestauracjePreload';

// Utils
export * from './utils/performance';

// Data
export { restauracjeData, restauracjeServices, restauracjeStats, restauracjeFeatures, restauracjeBenefits } from './data/restauracjeData';

// Types
export type { 
  RestauracjeService, 
  RestauracjeStats, 
  RestauracjeFeature,
  RestauracjeBenefit 
} from './types';