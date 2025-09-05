// Native CSS animation utilities without framer-motion
import { GALLERY_CONFIG } from '../config/gallery-data';

// Animation timing function (equivalent to premium easing)
export const PREMIUM_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

// Base animation styles
export const getBaseAnimationStyles = (shouldAnimate: boolean) => ({
  transform: 'translate3d(0, 0, 0)',
  backfaceVisibility: 'hidden' as const,
  willChange: shouldAnimate ? 'transform, opacity' : 'auto',
});

// Fade in up animation
export const getFadeInUpStyles = (
  isVisible: boolean, 
  shouldAnimate: boolean, 
  delay = 0
): React.CSSProperties => {
  if (!shouldAnimate) return {};
  
  const baseStyles = getBaseAnimationStyles(shouldAnimate);
  const translateY = isVisible ? 'translateY(0)' : 'translateY(20px)';
  
  return {
    ...baseStyles,
    opacity: isVisible ? 1 : 0,
    transform: `translate3d(0, 0, 0) ${translateY}`,
    transition: `opacity ${GALLERY_CONFIG.TRANSITION_DURATION}s ${PREMIUM_EASING} ${delay}s, transform ${GALLERY_CONFIG.TRANSITION_DURATION}s ${PREMIUM_EASING} ${delay}s`
  };
};

// Scale animation for buttons
export const getScaleStyles = (
  isHovered: boolean,
  isPressed: boolean,
  shouldAnimate: boolean
): React.CSSProperties => {
  if (!shouldAnimate) return getBaseAnimationStyles(false);

  let scale = 1;
  if (isPressed) scale = 0.95;
  else if (isHovered) scale = 1.05;

  const baseStyles = getBaseAnimationStyles(shouldAnimate);
  
  return {
    ...baseStyles,
    transform: `translate3d(0, 0, 0) scale(${scale})`,
    transition: `transform 0.2s ${PREMIUM_EASING}`
  };
};

// Slide animation for carousel
export const getSlideStyles = (
  direction: number,
  isActive: boolean,
  isEntering: boolean,
  isExiting: boolean
): React.CSSProperties => {
  let transform = 'translate3d(0, 0, 0)';
  let opacity = 1;

  if (isEntering) {
    transform = `translate3d(${direction > 0 ? '100%' : '-100%'}, 0, 0) scale(0.98)`;
    opacity = 0;
  } else if (isExiting) {
    transform = `translate3d(${direction < 0 ? '100%' : '-100%'}, 0, 0) scale(0.98)`;
    opacity = 0;
  } else if (isActive) {
    transform = 'translate3d(0, 0, 0) scale(1)';
    opacity = 1;
  }

  return {
    position: 'absolute' as const,
    inset: 0,
    transform,
    opacity,
    transition: `transform 0.3s ${PREMIUM_EASING}, opacity 0.2s ${PREMIUM_EASING}`,
    backfaceVisibility: 'hidden',
    willChange: 'transform, opacity'
  };
};

// Progress bar animation
export const getProgressStyles = (
  width: string,
  isActive: boolean,
  isAutoPlaying: boolean,
  isHovered: boolean,
  isTransitioning: boolean
): React.CSSProperties => {
  const duration = isActive && isAutoPlaying && !isHovered && !isTransitioning ? 3.5 : 0.2;
  
  return {
    width,
    height: '100%',
    backgroundColor: 'white',
    borderRadius: '9999px',
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden',
    transition: `width ${duration}s ${duration > 1 ? 'linear' : PREMIUM_EASING}`
  };
};

// Rotating animation for Instagram icon
export const getRotatingStyles = (shouldAnimate: boolean): React.CSSProperties => {
  if (!shouldAnimate) return {};

  return {
    animation: 'spin 3s linear infinite',
    ...getBaseAnimationStyles(shouldAnimate)
  };
};

// Bounce animation for arrow
export const getBounceStyles = (shouldAnimate: boolean): React.CSSProperties => {
  if (!shouldAnimate) return {};

  return {
    animation: 'bounce-x 2s ease-in-out infinite',
    ...getBaseAnimationStyles(shouldAnimate)
  };
};