'use client';

import React, { memo } from 'react';
import { CartSummaryProps } from '../types';
import { formatPrice } from '../utils/formatters';

export const CartSummary: React.FC<CartSummaryProps> = memo(({ 
  totals, 
  onCheckout,
  isLoading = false 
}) => {
  const handleCheckout = () => {
    if (!isLoading) {
      onCheckout();
    }
  };

  return (
    <div className="border-t border-gray-200 pt-4 space-y-3">
      {/* Subtotal */}
      <div className="flex justify-between text-sm">
        <span className="text-gray-700">Suma częściowa</span>
        <span className="font-medium text-gray-900">
          {formatPrice(totals.total_items, totals.currency_symbol)}
        </span>
      </div>

      {/* Shipping */}
      {totals.total_shipping && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Wysyłka</span>
          <span className="font-medium text-gray-900">
            {totals.total_shipping === '0' 
              ? 'Darmowa' 
              : formatPrice(totals.total_shipping, totals.currency_symbol)
            }
          </span>
        </div>
      )}

      {/* Tax */}
      {totals.total_tax !== '0' && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Podatek</span>
          <span className="font-medium text-gray-900">
            {formatPrice(totals.total_tax, totals.currency_symbol)}
          </span>
        </div>
      )}

      {/* Total */}
      <div className="flex justify-between text-base font-semibold pt-3 border-t border-gray-200">
        <span className="text-gray-900">Razem</span>
        <span className="text-lg text-gray-900">
          {formatPrice(totals.total_price, totals.currency_symbol)}
        </span>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full bg-primary hover:bg-[#b31313] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      >
        {isLoading ? 'Przetwarzanie...' : 'Przejdź do kasy'}
      </button>

      {/* Additional Info */}
      <p className="text-xs text-gray-500 text-center">
        Koszty wysyłki i podatki zostaną obliczone przy kasie
      </p>
    </div>
  );
});

CartSummary.displayName = 'CartSummary';