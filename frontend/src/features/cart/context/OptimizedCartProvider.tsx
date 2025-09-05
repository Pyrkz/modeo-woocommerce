'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useCartService } from '../hooks/useCartService';
import { Cart, CartItem } from '@/types/cart';
import { CartAddRequest } from '../services/cart-service';

interface CartContextType {
  // Cart state
  cart: Cart | null;
  items: CartItem[];
  itemCount: number;
  loading: boolean;
  updating: boolean;
  error: string | null;
  isInitialized: boolean;

  // Cart actions
  addToCart: (request: CartAddRequest) => Promise<boolean>;
  updateQuantity: (itemKey: string, quantity: number) => Promise<boolean>;
  removeFromCart: (itemKey: string) => Promise<boolean>;
  refreshCart: () => Promise<boolean>;
  clearError: () => void;

  // UI state
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface OptimizedCartProviderProps {
  children: ReactNode;
}

export const OptimizedCartProvider = ({ children }: OptimizedCartProviderProps) => {
  const cartService = useCartService();
  const [isOpen, setIsOpen] = React.useState(false);

  // Initialize cart on mount
  useEffect(() => {
    if (!cartService.isInitialized) {
      cartService.refreshCart();
    }
  }, [cartService]);

  // Cart UI actions
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(prev => !prev);

  const value: CartContextType = {
    // Cart state
    cart: cartService.cart,
    items: cartService.items,
    itemCount: cartService.itemCount,
    loading: cartService.loading,
    updating: cartService.updating,
    error: cartService.error,
    isInitialized: cartService.isInitialized,

    // Cart actions
    addToCart: cartService.addToCart,
    updateQuantity: cartService.updateQuantity,
    removeFromCart: cartService.removeFromCart,
    refreshCart: cartService.refreshCart,
    clearError: cartService.clearError,

    // UI state
    isOpen,
    openCart,
    closeCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useOptimizedCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useOptimizedCart must be used within an OptimizedCartProvider');
  }
  return context;
};