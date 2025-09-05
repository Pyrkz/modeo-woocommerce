import { useState, useCallback } from 'react';
import { Product } from '@/types/product';
import { productCartService, ProductAddToCartRequest } from '../services/product-cart.service';
import { useCartService } from '@/features/cart/hooks/useCartService';

export interface UseProductCartReturn {
  addToCart: (product: Product, request: ProductAddToCartRequest) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  canAddToCart: (product: Product, selectedVariation?: { [key: string]: string }) => { canAdd: boolean; reason?: string };
  clearError: () => void;
}

export const useProductCart = (): UseProductCartReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { refreshCart } = useCartService();

  /**
   * Add product to cart with proper error handling and cart refresh
   */
  const addToCart = useCallback(async (
    product: Product,
    request: ProductAddToCartRequest
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Check if product can be added to cart
      const validation = productCartService.canAddToCart(product, request.variation);
      if (!validation.canAdd) {
        setError(validation.reason || 'Nie można dodać produktu do koszyka');
        return false;
      }

      // Add to cart
      const result = await productCartService.addProductToCart(product, request);
      
      if (result.success) {
        // Refresh cart to get updated data
        await refreshCart();
        return true;
      } else {
        setError(result.error || 'Błąd dodawania do koszyka');
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Błąd połączenia z serwerem';
      setError(errorMessage);
      console.error('Product cart error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [refreshCart]);

  /**
   * Check if product can be added to cart
   */
  const canAddToCart = useCallback((
    product: Product,
    selectedVariation?: { [key: string]: string }
  ): { canAdd: boolean; reason?: string } => {
    return productCartService.canAddToCart(product, selectedVariation);
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    addToCart,
    loading,
    error,
    canAddToCart,
    clearError,
  };
};