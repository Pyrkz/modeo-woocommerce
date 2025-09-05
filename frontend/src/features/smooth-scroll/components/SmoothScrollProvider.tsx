'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useLenis } from '../hooks/useLenis';
import type { LenisOptions, SmoothScrollContextType } from '../types';

const SmoothScrollContext = createContext<SmoothScrollContextType | null>(null);

interface SmoothScrollProviderProps {
  children: ReactNode;
  options?: Partial<LenisOptions>;
}

/**
 * Provider component for smooth scroll context
 */
export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ 
  children, 
  options 
}) => {
  const { scrollTo, scrollToTop, isScrolling, scrollProgress, velocity } = useLenis(options);

  const value: SmoothScrollContextType = {
    scrollTo,
    scrollToTop,
    isScrolling,
    scrollProgress,
    velocity,
  };

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

/**
 * Hook to use smooth scroll context
 */
export const useSmoothScroll = (): SmoothScrollContextType => {
  const context = useContext(SmoothScrollContext);
  
  if (!context) {
    throw new Error('useSmoothScroll must be used within a SmoothScrollProvider');
  }
  
  return context;
};