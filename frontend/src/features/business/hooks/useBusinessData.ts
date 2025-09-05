'use client';

import { useMemo } from 'react';
import { businessPageData } from '../data/businessData';
import { BusinessPageData } from '../types';

export const useBusinessData = (): BusinessPageData => {
  return useMemo(() => businessPageData, []);
};