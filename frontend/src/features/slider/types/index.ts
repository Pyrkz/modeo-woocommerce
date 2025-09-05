export interface SliderItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imagePath: string;
  imageAlt: string;
  ctaText: string;
  ctaHref: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface HeroSliderProps {
  slides: SliderItem[];
  autoplay?: boolean;
  autoplayDelay?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export interface SliderControlsProps {
  currentSlide: number;
  totalSlides: number;
  onSlideChange: (index: number) => void;
  showDots?: boolean;
  showArrows?: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export interface UseSliderOptions {
  slideCount: number;
  autoplay?: boolean;
  autoplayDelay?: number;
}

export interface UseSliderReturn {
  currentSlide: number;
  isPlaying: boolean;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  previousSlide: () => void;
  pauseAutoplay: () => void;
  resumeAutoplay: () => void;
}