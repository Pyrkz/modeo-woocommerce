// Components
export * from './components';
export { TechniquePageLayout } from './components/technique-page';
export { default as ZnakowanieGallery } from './components/ZnakowanieGallery';

// Types
export * from './types';
export type { GalleryItem, GalleryControls, AnimationConfig } from './types/gallery';

// Data & Config
export * from './data/znakowanieMethods';
export { 
  techniquesConfig, 
  getTechniqueConfig, 
  generateTechniqueMetadata 
} from './config/techniques';
export { GALLERY_ITEMS, GALLERY_CONFIG } from './config/gallery-data';

// Hooks
export * from './hooks/useSlider';
export * from './hooks/useImagePreloader';
export { useTechniquePrefetch } from './hooks/useTechniquePrefetch';
export {
  useOptimizedReducedMotion,
  useViewportAnimation,
  useGalleryControls
} from './hooks';