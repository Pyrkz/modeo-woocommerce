// Components
export { default as GiftOccasionsSection } from './components/GiftOccasionsSection';
export { default as GiftOccasionsGrid } from './components/GiftOccasionsGrid';
export { default as GiftOccasionsHeader } from './components/GiftOccasionsHeader';
export { default as GiftOccasionCard } from './components/GiftOccasionCard';
export { default as GiftOccasionIcon } from './components/GiftOccasionIcon';
export { default as GiftOccasionContent } from './components/GiftOccasionContent';
export { default as GiftOccasionProducts } from './components/GiftOccasionProducts';

// Data
export { 
  giftOccasionsData, 
  giftCategorySections, 
  giftOccasionsSectionContent 
} from './data/giftOccasionsData';

// Types
export type { 
  GiftOccasion, 
  GiftOccasionsSectionData, 
  GiftOccasionCardProps, 
  GiftCategorySection 
} from './types';

// Hooks
export { useGiftOccasionsPreload } from './hooks/useGiftOccasionsPreload';