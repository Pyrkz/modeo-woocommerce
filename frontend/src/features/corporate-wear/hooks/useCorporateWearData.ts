import { useMemo } from 'react';
import type { CorporateWearHeroProps } from '../types';

export function useCorporateWearData(data: CorporateWearHeroProps) {
  const optimizedData = useMemo(() => ({
    ...data,
    // Pre-calculate any expensive computations here if needed
    statsCount: data.stats.length,
    featuresCount: data.features.length,
  }), [data]);

  return optimizedData;
}