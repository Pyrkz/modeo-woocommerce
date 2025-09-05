'use client';

import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/hooks/useCart';
import { SlideCartProps } from '../types';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { CartLoadingSkeleton } from './CartLoadingSkeleton';
import { config } from '@/lib/config';

export const SlideCart: React.FC<SlideCartProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  
  const { 
    cart, 
    items, 
    loading, 
    updating,
    error,
    updateQuantity, 
    removeFromCart,
    refreshCart 
  } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Handle click outside
  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  }, [onClose]);

  // Handle checkout redirect
  const handleCheckout = useCallback(() => {
    window.location.href = config.getCheckoutUrl();
  }, []);

  // Refresh cart when opened
  useEffect(() => {
    if (isOpen) {
      refreshCart();
    }
  }, [isOpen, refreshCart]);

  const isEmpty = useMemo(() => items.length === 0, [items.length]);
  const showContent = useMemo(() => !loading || items.length > 0, [loading, items.length]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      />

      {/* Slide Cart */}
      <div
        ref={cartRef}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Koszyk"
        aria-modal="true"
        role="dialog"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Koszyk ({items.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Zamknij koszyk"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {loading && isEmpty ? (
              <CartLoadingSkeleton />
            ) : error ? (
              <div className="flex items-center justify-center h-full px-6">
                <div className="text-center">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button
                    onClick={refreshCart}
                    className="text-primary hover:underline"
                  >
                    Spróbuj ponownie
                  </button>
                </div>
              </div>
            ) : isEmpty ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <ShoppingBagIcon className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Twój koszyk jest pusty
                </h3>
                <p className="text-gray-500 mb-6">
                  Dodaj produkty do koszyka, aby kontynuować zakupy
                </p>
                <button
                  onClick={onClose}
                  className="bg-primary hover:bg-[#b31313] text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Kontynuuj zakupy
                </button>
              </div>
            ) : (
              <div className="px-6 py-4">
                <div className="space-y-1">
                  {items.map((item) => (
                    <CartItem
                      key={item.key}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                      isUpdating={updating}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer with summary */}
          {showContent && !isEmpty && cart?.totals && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-100">
              <CartSummary
                totals={cart.totals}
                onCheckout={handleCheckout}
                isLoading={updating}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};