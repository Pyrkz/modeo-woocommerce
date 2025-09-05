// Performance optimization utilities
import { useEffect } from 'react';

export const useWillChangeCleanup = (
  ref: React.RefObject<HTMLElement | null>,
  shouldAnimate: boolean,
  transitionDuration: number
) => {
  useEffect(() => {
    if (!shouldAnimate) return;

    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.style.willChange = 'auto';
      }
    }, (transitionDuration + 0.4) * 1000 + 100);

    return () => clearTimeout(timer);
  }, [shouldAnimate, transitionDuration, ref]);
};

export const getGPUAcceleratedStyle = (shouldAnimate: boolean) => ({
  transform: 'translate3d(0, 0, 0)',
  backfaceVisibility: 'hidden' as const,
  willChange: shouldAnimate ? 'transform, opacity' : 'auto',
  contain: 'layout style paint' as const
});

export const getSectionStyle = (shouldAnimate: boolean) => ({
  transform: 'translate3d(0, 0, 0)',
  backfaceVisibility: 'hidden' as const,
  willChange: shouldAnimate ? 'transform, opacity' : 'auto',
  contain: 'layout style paint' as const
});