import { useMemo } from 'react';
import { termsOfServiceData } from '../data/termsOfServiceData';

export const useTermsOfServiceData = () => {
  const memoizedData = useMemo(() => termsOfServiceData, []);
  
  const sectionsCount = useMemo(() => memoizedData.sections.length, [memoizedData]);
  
  const effectiveDateFormatted = useMemo(() => {
    return new Date(memoizedData.effectiveDate).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [memoizedData.effectiveDate]);
  
  const deliveryMethodsCount = useMemo(() => memoizedData.deliveryMethods.length, [memoizedData]);
  const paymentMethodsCount = useMemo(() => memoizedData.paymentMethods.length, [memoizedData]);
  
  return {
    data: memoizedData,
    sectionsCount,
    effectiveDateFormatted,
    deliveryMethodsCount,
    paymentMethodsCount,
  };
};