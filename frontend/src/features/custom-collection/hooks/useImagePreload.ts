'use client';

import { useEffect } from 'react';
import type { ProductImage } from '../types';
import { preloadCriticalImages } from '../utils';

export const useImagePreload = (images: ProductImage[]) => {
  useEffect(() => {
    const criticalImages = images.filter(img => img.priority);
    preloadCriticalImages(criticalImages);
  }, [images]);
};