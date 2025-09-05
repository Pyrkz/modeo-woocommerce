// Components
export { 
  FeaturedProductsSection,
  OptimizedSliderContainer,
  EnhancedSliderNavigation,
  SectionHeader,
  SliderIndicators,
  SliderContainer,
  SliderNavigation,
  SliderProductItem
} from './components';

// Hooks
export { 
  useResponsiveSlider,
  useSmoothSlider,
  useProductSlider
} from './hooks';

// Config
export { SLIDER_BREAKPOINTS, SLIDER_SETTINGS } from './config/sliderConfig';

// Legacy hooks (if they exist)
export { useFeaturedProducts } from './hooks/useFeaturedProducts';
export { useSmoothScroll } from './hooks/useSmoothScroll';

// Types
export type { FeaturedProductsSectionProps } from './types';

// Data
export { featuredContent } from './data/featuredData';