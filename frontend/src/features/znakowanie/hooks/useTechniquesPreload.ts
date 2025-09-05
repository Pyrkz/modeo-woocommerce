'use client';

import { useEffect } from 'react';
import { Technique } from '../types/techniques';

export const useTechniquesPreload = (techniques: Technique[]) => {
  useEffect(() => {
    // Preload technique pages and images for better performance
    if (typeof window !== 'undefined') {
      // Preload Next.js pages
      import('next/router').then(({ default: Router }) => {
        techniques.forEach(technique => {
          Router.prefetch(technique.href).catch(() => {
            // Silently handle prefetch errors
          });
        });
      });

      // Preload images
      techniques.forEach(technique => {
        const img = new Image();
        img.src = technique.image;
      });
    }
  }, [techniques]);
};