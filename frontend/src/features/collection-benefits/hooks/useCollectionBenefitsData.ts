import { useMemo } from 'react';
import { collectionBenefitsData } from '../data/collectionBenefitsData';
import type { CollectionBenefitsData } from '../types';

export const useCollectionBenefitsData = (): CollectionBenefitsData => {
  return useMemo(() => collectionBenefitsData, []);
};