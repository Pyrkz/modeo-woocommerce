'use client';

import { customCollectionData } from '../data/customCollectionData';
import type { CustomCollectionData } from '../types';

export const useCustomCollectionData = (): CustomCollectionData => {
  return customCollectionData;
};