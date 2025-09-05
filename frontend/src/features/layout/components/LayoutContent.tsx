'use client';

import React, { ReactNode } from 'react';
import { CartProvider, useCartContext } from '../../cart/context/CartProvider';
import Header from '../../header/components/Header';
import Footer from '../../footer/components/Footer';
import { SlideCart } from '../../cart/components/SlideCart';

interface LayoutContentProps {
  children: ReactNode;
}

export const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          {children}
        </main>
        
        <Footer />
        
        {/* SlideCart connected to CartContext */}
        <SlideCartWrapper />
      </div>
    </CartProvider>
  );
};

// Wrapper component to connect SlideCart with CartContext
const SlideCartWrapper: React.FC = () => {
  const { isCartOpen, closeCart } = useCartContext();
  
  return (
    <SlideCart 
      isOpen={isCartOpen} 
      onClose={closeCart} 
    />
  );
};