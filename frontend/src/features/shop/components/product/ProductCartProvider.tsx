'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { Product } from '@/types/product';
import { useProductCart } from '../../hooks/useProductCart';
import { ProductAddToCartRequest } from '../../services/product-cart.service';
import { useCartContext } from '@/features/cart/context/CartProvider';

interface ProductCartContextType {
  addToCart: (request: ProductAddToCartRequest) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  canAddToCart: (selectedVariation?: { [key: string]: string }) => { canAdd: boolean; reason?: string };
  clearError: () => void;
  product: Product;
}

const ProductCartContext = createContext<ProductCartContextType | undefined>(undefined);

interface ProductCartProviderProps {
  children: ReactNode;
  product: Product;
  onSuccess?: () => void;
}

export const ProductCartProvider = ({ children, product, onSuccess }: ProductCartProviderProps) => {
  const { openCart } = useCartContext();
  const productCart = useProductCart();

  const addToCart = async (request: ProductAddToCartRequest): Promise<boolean> => {
    const success = await productCart.addToCart(product, request);
    
    if (success) {
      openCart();
      onSuccess?.();
    }
    
    return success;
  };

  const canAddToCart = (selectedVariation?: { [key: string]: string }) => {
    return productCart.canAddToCart(product, selectedVariation);
  };

  const value: ProductCartContextType = {
    addToCart,
    loading: productCart.loading,
    error: productCart.error,
    canAddToCart,
    clearError: productCart.clearError,
    product,
  };

  return (
    <ProductCartContext.Provider value={value}>
      {children}
    </ProductCartContext.Provider>
  );
};

export const useProductCartContext = (): ProductCartContextType => {
  const context = useContext(ProductCartContext);
  if (context === undefined) {
    throw new Error('useProductCartContext must be used within a ProductCartProvider');
  }
  return context;
};