'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface UseProductActionsProps {
  productId: number;
  productSlug: string;
  isVariable: boolean;
  onAddToCart?: (productId: number, quantity?: number) => Promise<void>;
}

export function useProductActions({ 
  productId, 
  productSlug, 
  isVariable, 
  onAddToCart 
}: UseProductActionsProps) {
  const router = useRouter();

  const handleAddToCart = useCallback(async () => {
    if (onAddToCart && !isVariable) {
      await onAddToCart(productId, 1);
    }
  }, [onAddToCart, productId, isVariable]);

  const handleViewProduct = useCallback(() => {
    router.push(`/sklep/${productSlug}`);
  }, [router, productSlug]);

  return {
    handleAddToCart,
    handleViewProduct,
    shouldShowAddToCart: !isVariable && !!onAddToCart,
    shouldRedirectToProduct: isVariable || !onAddToCart
  };
}