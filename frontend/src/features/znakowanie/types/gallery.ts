// Gallery types for Znakowanie realizacje gallery component

export interface GalleryItem {
  id: number;
  image: string;
  alt?: string;
}

// Animation variant types for Framer Motion
export interface AnimationVariant {
  opacity?: number;
  x?: number;
  y?: number;
  scale?: number;
  zIndex?: number;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: number[] | string;
  };
}

export interface SlideVariant {
  enter: (direction: number) => AnimationVariant;
  center: AnimationVariant;
  exit: (direction: number) => AnimationVariant;
}

export interface AnimationVariants {
  phone: {
    hidden: AnimationVariant;
    visible: AnimationVariant;
  };
  control: {
    hidden: AnimationVariant;
    visible: AnimationVariant;
  };
  header: {
    hidden: AnimationVariant;
    visible: AnimationVariant;
  };
  mobileControls: {
    hidden: AnimationVariant;
    visible: AnimationVariant;
  };
  instagramLink: {
    hidden: AnimationVariant;
    visible: AnimationVariant;
  };
  thumbnails: {
    hidden: AnimationVariant;
    visible: AnimationVariant;
  };
  slide: SlideVariant;
}

export interface GalleryControls {
  currentIndex: number;
  isAutoPlaying: boolean;
  isTransitioning: boolean;
  isHovered: boolean;
  direction: number;
}

export interface AnimationConfig {
  shouldAnimate: boolean;
  transitionDuration: number;
  slideTransition: number;
  staggerDelay: number;
}

export interface GalleryNavigation {
  goToNext: () => void;
  goToPrevious: () => void;
  goToSlide: (index: number) => void;
  toggleAutoPlay: () => void;
}

export interface ThumbnailButtonProps {
  item: GalleryItem;
  index: number;
  currentIndex: number;
  isTransitioning: boolean;
  goToSlide: (index: number) => void;
  shouldAnimate: boolean;
}

export interface PhoneMockupProps {
  currentIndex: number;
  direction: number;
  galleryItems: readonly GalleryItem[];
  isAutoPlaying: boolean;
  isHovered: boolean;
  isTransitioning: boolean;
  animationVariants: AnimationVariants;
  isInView: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  goToNext: () => void;
  goToPrevious: () => void;
  goToSlide: (index: number) => void;
  shouldAnimate: boolean;
}

export interface ControlsProps {
  currentIndex: number;
  totalItems: number;
  isAutoPlaying: boolean;
  isTransitioning: boolean;
  shouldAnimate: boolean;
  animationVariants: AnimationVariants;
  isInView: boolean;
  goToNext: () => void;
  goToPrevious: () => void;
  toggleAutoPlay: () => void;
}