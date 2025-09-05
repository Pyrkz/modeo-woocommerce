'use client';

import { useMemo } from 'react';
import { whyChooseUsData } from '../data/whyChooseUsData';

export function useWhyChooseUs() {
  const data = useMemo(() => whyChooseUsData, []);
  
  return {
    data,
    features: data.features,
    statistics: data.statistics
  };
}