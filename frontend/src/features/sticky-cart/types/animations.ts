/**
 * Animation types for sticky cart components
 */
export type AnimationType = 
  | 'slide'        // Slide up/down (default)
  | 'bounce'       // Bounce effect
  | 'fade-scale'   // Fade with scale
  | 'flip'         // 3D flip effect
  | 'elastic'      // Elastic bounce
  | 'glow';        // Glow entrance

export interface AnimationConfig {
  type: AnimationType;
  duration: number;
  delay: number;
  easing: string;
}

export const ANIMATION_PRESETS: Record<AnimationType, AnimationConfig> = {
  slide: {
    type: 'slide',
    duration: 250,
    delay: 0,
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)' // very gentle ease-out
  },
  bounce: {
    type: 'bounce',
    duration: 600,
    delay: 0,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' // bounce
  },
  'fade-scale': {
    type: 'fade-scale',
    duration: 400,
    delay: 0,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // ease-out-quad
  },
  flip: {
    type: 'flip',
    duration: 500,
    delay: 0,
    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)' // ease-out-cubic
  },
  elastic: {
    type: 'elastic',
    duration: 800,
    delay: 0,
    easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)' // elastic
  },
  glow: {
    type: 'glow',
    duration: 450,
    delay: 0,
    easing: 'cubic-bezier(0.19, 1, 0.22, 1)' // ease-out-expo
  }
};