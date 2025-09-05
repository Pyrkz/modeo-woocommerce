// Optimized animation variants factory for Framer Motion
import { PREMIUM_EASING } from '../config/gallery-data';
import type { AnimationConfig } from '../types/gallery';

export const createAnimationVariants = (config: AnimationConfig) => {
  const { shouldAnimate, transitionDuration, slideTransition } = config;

  if (!shouldAnimate) {
    return {
      phone: { hidden: {}, visible: {} },
      control: { hidden: {}, visible: {} },
      header: { hidden: {}, visible: {} },
      mobileControls: { hidden: {}, visible: {} },
      instagramLink: { hidden: {}, visible: {} },
      thumbnails: { hidden: {}, visible: {} },
      slide: {
        enter: () => ({}),
        center: {},
        exit: () => ({})
      }
    };
  }

  return {
    phone: {
      hidden: { 
        opacity: 0, 
        y: 30,
        scale: 0.95
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: transitionDuration,
          ease: PREMIUM_EASING
        }
      }
    },
    control: {
      hidden: { 
        opacity: 0, 
        scale: 0.9
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: slideTransition,
          delay: 0.3,
          ease: PREMIUM_EASING
        }
      }
    },
    header: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: transitionDuration,
          ease: PREMIUM_EASING
        }
      }
    },
    mobileControls: {
      hidden: { opacity: 0, y: 15 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.6,
          duration: slideTransition,
          ease: PREMIUM_EASING
        }
      }
    },
    instagramLink: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.8,
          duration: slideTransition,
          ease: PREMIUM_EASING
        }
      }
    },
    thumbnails: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          delay: 1,
          duration: slideTransition,
          ease: PREMIUM_EASING
        }
      }
    },
    slide: {
      enter: (direction: number) => ({
        x: direction > 0 ? 100 : -100,
        opacity: 0,
        scale: 0.98
      }),
      center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1
      },
      exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 100 : -100,
        opacity: 0,
        scale: 0.98
      })
    }
  };
};