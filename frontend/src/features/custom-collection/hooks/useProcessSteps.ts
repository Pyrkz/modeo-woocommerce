'use client';

import { useMemo } from 'react';
import { useCustomCollectionData } from './useCustomCollectionData';
import type { ProcessStepsData } from '../types';

export const useProcessSteps = (): ProcessStepsData => {
  const { processSteps } = useCustomCollectionData();
  
  return useMemo(() => processSteps, [processSteps]);
};