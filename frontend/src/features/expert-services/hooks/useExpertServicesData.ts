import { useMemo } from 'react';
import { expertServicesData } from '../data/expertServicesData';
import type { ExpertServicesData } from '../types';

export const useExpertServicesData = (): ExpertServicesData => {
  return useMemo(() => expertServicesData, []);
};