'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { CartContextValue } from '../types';

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
    // Prevent body scroll when cart is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
    // Restore body scroll
    document.body.style.overflow = '';
  }, []);

  const toggleCart = useCallback(() => {
    if (isCartOpen) {
      closeCart();
    } else {
      openCart();
    }
  }, [isCartOpen, openCart, closeCart]);

  const contextValue = useMemo(() => ({
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
  }), [isCartOpen, openCart, closeCart, toggleCart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};