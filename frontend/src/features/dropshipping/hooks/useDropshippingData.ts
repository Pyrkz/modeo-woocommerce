'use client';

import { useMemo } from 'react';
import { dropshippingHeroData } from '../data/dropshippingData';

export function useDropshippingData() {
  const data = useMemo(() => dropshippingHeroData, []);
  
  return {
    heroData: data,
    features: data.features,
    benefits: data.benefits,
  };
}