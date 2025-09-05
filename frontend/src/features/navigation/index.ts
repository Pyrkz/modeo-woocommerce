// Components
export { default as MegaMenu } from './components/MegaMenu';
export { default as MegaMenuTrigger } from './components/MegaMenuTrigger';
export { default as MegaMenuMobile } from './components/MegaMenuMobile';
export { default as OptimizedMegaMenu } from './components/OptimizedMegaMenu';
export { GiftDropdown } from './components/GiftDropdown';
export { BrandingDropdown } from './components/BrandingDropdown';
export { BusinessDropdown } from './components/BusinessDropdown';
export { MobileNavButton } from './components/MobileNavButton';
export { MobileNavOverlay } from './components/MobileNavOverlay';
export { MobileNavItem } from './components/MobileNavItem';
export { MobileNavSubmenu } from './components/MobileNavSubmenu';
export { MobileNavigation } from './components/MobileNavigation';
export { StickyMobileHeader } from './components/StickyMobileHeader';

// Hooks
export { useMegaMenu } from './hooks/useMegaMenu';
export { usePreloadCategories } from './hooks/usePreloadCategories';
export { useMobileNav } from './hooks/useMobileNav';

// Types
export type { 
  Category, 
  Subcategory, 
  MegaMenuProps, 
  MegaMenuTriggerProps,
  CategorySectionProps 
} from './types';

// Constants
export { 
  SHOP_CATEGORIES, 
  getCategoryBySlug, 
  getCategoryById 
} from './constants/categories';