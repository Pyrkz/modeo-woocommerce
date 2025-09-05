// Main components
export { 
  WhyChooseUsSection,
  WhyChooseUsHeader,
  FeaturesGrid,
  FeatureCard,
  StatisticsSection,
  StatisticsGrid,
  StatisticCard 
} from './components';

// UI components
export {
  FeatureIcon,
  FeatureContent
} from './components/ui';

// Types
export type {
  Feature,
  Statistic,
  WhyChooseUsSection as WhyChooseUsSectionType,
  FeatureCardProps,
  StatisticCardProps,
  WhyChooseUsSectionProps
} from './types';

// Hooks
export {
  useWhyChooseUs
} from './hooks';

// Data
export { whyChooseUsData } from './data/whyChooseUsData';