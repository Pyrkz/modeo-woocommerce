import { useState, useCallback, useRef } from 'react';
import { Cart, CartItem } from '@/types/cart';
import { cartService, CartAddRequest, CartResponse } from '../services/cart-service';

export interface UseCartServiceReturn {
  cart: Cart | null;
  items: CartItem[];
  itemCount: number;
  loading: boolean;
  updating: boolean;
  error: string | null;
  addToCart: (request: CartAddRequest) => Promise<boolean>;
  updateQuantity: (itemKey: string, quantity: number) => Promise<boolean>;
  removeFromCart: (itemKey: string) => Promise<boolean>;
  refreshCart: () => Promise<boolean>;
  clearError: () => void;
  isInitialized: boolean;
}

export const useCartService = (): UseCartServiceReturn => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Track if we're already loading to prevent duplicate requests
  const isLoadingRef = useRef(false);

  /**
   * Handle cart response and update state
   */
  const handleCartResponse = useCallback((response: CartResponse<Cart>): boolean => {
    if (response.success && response.data) {
      setCart(response.data);
      setError(null);
      return true;
    } else {
      setError(response.error || 'Wystąpił błąd');
      return false;
    }
  }, []);

  /**
   * Refresh cart data
   */
  const refreshCart = useCallback(async (): Promise<boolean> => {
    if (isLoadingRef.current) {
      return false;
    }

    isLoadingRef.current = true;
    setLoading(true);
    setError(null);
    
    try {
      const response = await cartService.getCart();
      const success = handleCartResponse(response);
      
      if (!isInitialized) {
        setIsInitialized(true);
        console.log('Cart Service: Initialized successfully');
      }
      
      return success;
    } catch (error) {
      setError('Błąd pobierania koszyka');
      console.error('Cart refresh error:', error);
      return false;
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  }, [handleCartResponse, isInitialized]);

  /**
   * Add item to cart
   */
  const addToCart = useCallback(async (request: CartAddRequest): Promise<boolean> => {
    setUpdating(true);
    setError(null);
    
    try {
      const response = await cartService.addToCart(request);
      const success = handleCartResponse(response);
      
      if (!success && response.error) {
        // Show user-friendly error message
        setError(response.error);
      }
      
      return success;
    } catch (error) {
      setError('Błąd dodawania do koszyka');
      console.error('Add to cart error:', error);
      return false;
    } finally {
      setUpdating(false);
    }
  }, [handleCartResponse]);

  /**
   * Update item quantity
   */
  const updateQuantity = useCallback(async (itemKey: string, quantity: number): Promise<boolean> => {
    if (quantity < 1) return false;
    
    setUpdating(true);
    setError(null);
    
    try {
      const response = await cartService.updateCartItem(itemKey, quantity);
      const success = handleCartResponse(response);
      
      if (!success && response.error) {
        setError(response.error);
      }
      
      return success;
    } catch (error) {
      setError('Błąd aktualizacji koszyka');
      console.error('Update quantity error:', error);
      return false;
    } finally {
      setUpdating(false);
    }
  }, [handleCartResponse]);

  /**
   * Remove item from cart
   */
  const removeFromCart = useCallback(async (itemKey: string): Promise<boolean> => {
    setUpdating(true);
    setError(null);
    
    try {
      const response = await cartService.removeCartItem(itemKey);
      const success = handleCartResponse(response);
      
      if (!success && response.error) {
        setError(response.error);
      }
      
      return success;
    } catch (error) {
      setError('Błąd usuwania z koszyka');
      console.error('Remove from cart error:', error);
      return false;
    } finally {
      setUpdating(false);
    }
  }, [handleCartResponse]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Derived state
  const items = cart?.items || [];
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return {
    cart,
    items,
    itemCount,
    loading,
    updating,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    refreshCart,
    clearError,
    isInitialized,
  };
};