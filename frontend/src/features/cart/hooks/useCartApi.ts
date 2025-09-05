import { useState, useCallback, useEffect, useRef } from 'react';
import { Cart, AddToCartRequest } from '../types/cart';
import { cartApi, CartApiError } from '../services/cart-api';

interface UseCartApiReturn {
  cart: Cart | null;
  items: Cart['items'];
  itemCount: number;
  loading: boolean;
  updating: boolean;
  error: string | null;
  nonce: string;
  addToCart: (request: AddToCartRequest) => Promise<void>;
  updateQuantity: (itemKey: string, quantity: number) => Promise<void>;
  removeFromCart: (itemKey: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  clearError: () => void;
}

export const useCartApi = (): UseCartApiReturn => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  const handleError = useCallback((err: unknown) => {
    const errorMessage = err instanceof CartApiError 
      ? err.message 
      : err instanceof Error 
      ? err.message 
      : 'Wystąpił nieoczekiwany błąd';
    setError(errorMessage);
    console.error('Cart API Error:', err);
  }, []);

  const refreshCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const cartData = await cartApi.getCart();
      setCart(cartData);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const addToCart = useCallback(async (request: AddToCartRequest) => {
    setUpdating(true);
    setError(null);
    
    try {
      const cartData = await cartApi.addItem(request);
      setCart(cartData);
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setUpdating(false);
    }
  }, [handleError]);

  const updateQuantity = useCallback(async (itemKey: string, quantity: number) => {
    if (quantity < 1) return;
    
    setUpdating(true);
    setError(null);
    
    try {
      const cartData = await cartApi.updateItem(itemKey, quantity);
      setCart(cartData);
    } catch (err) {
      handleError(err);
    } finally {
      setUpdating(false);
    }
  }, [handleError]);

  const removeFromCart = useCallback(async (itemKey: string) => {
    setUpdating(true);
    setError(null);
    
    try {
      const cartData = await cartApi.removeItem(itemKey);
      setCart(cartData);
    } catch (err) {
      handleError(err);
    } finally {
      setUpdating(false);
    }
  }, [handleError]);

  const clearCart = useCallback(async () => {
    setUpdating(true);
    setError(null);
    
    try {
      const cartData = await cartApi.clearCart();
      setCart(cartData);
    } catch (err) {
      handleError(err);
    } finally {
      setUpdating(false);
    }
  }, [handleError]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initialize cart on mount
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const initializeCart = async () => {
        await cartApi.initialize();
        await refreshCart();
      };
      initializeCart();
    }
  }, [refreshCart]);

  const items = cart?.items || [];
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const nonce = cartApi.getNonce();

  return {
    cart,
    items,
    itemCount,
    loading,
    updating,
    error,
    nonce,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
    clearError,
  };
};