import { useMemo } from 'react';
import { privacyPolicyData } from '../data/privacyPolicyData';

export const usePrivacyPolicyData = () => {
  const memoizedData = useMemo(() => privacyPolicyData, []);
  
  const sectionsCount = useMemo(() => memoizedData.sections.length, [memoizedData]);
  
  const lastUpdatedFormatted = useMemo(() => {
    return new Date(memoizedData.lastUpdated).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [memoizedData.lastUpdated]);
  
  return {
    data: memoizedData,
    sectionsCount,
    lastUpdatedFormatted,
  };
};