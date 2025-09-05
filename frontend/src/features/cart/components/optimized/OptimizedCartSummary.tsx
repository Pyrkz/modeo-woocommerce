'use client';

import React, { memo, useMemo } from 'react';
import { CartSummaryProps } from '../../types/cart';
import { formatPrice } from '../../utils/formatters';

export const OptimizedCartSummary = memo<CartSummaryProps>(({ 
  totals, 
  onCheckout, 
  isLoading = false 
}) => {
  // Memoized formatted prices for performance
  const formattedSubtotal = useMemo(() => 
    formatPrice(totals.total_items, totals.currency_symbol), 
    [totals.total_items, totals.currency_symbol]
  );

  const formattedShipping = useMemo(() => 
    parseFloat(totals.total_shipping) > 0 
      ? formatPrice(totals.total_shipping, totals.currency_symbol)
      : null,
    [totals.total_shipping, totals.currency_symbol]
  );

  const formattedTax = useMemo(() => 
    parseFloat(totals.total_tax) > 0 
      ? formatPrice(totals.total_tax, totals.currency_symbol)
      : null,
    [totals.total_tax, totals.currency_symbol]
  );

  const formattedTotal = useMemo(() => 
    formatPrice(totals.total_price, totals.currency_symbol), 
    [totals.total_price, totals.currency_symbol]
  );

  const hasShipping = useMemo(() => 
    parseFloat(totals.total_shipping) > 0, 
    [totals.total_shipping]
  );

  const hasTax = useMemo(() => 
    parseFloat(totals.total_tax) > 0, 
    [totals.total_tax]
  );

  return (
    <div className="space-y-4">
      {/* Summary details */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Produkty:</span>
          <span className="font-medium">{formattedSubtotal}</span>
        </div>
        
        {hasShipping && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Dostawa:</span>
            <span className="font-medium">{formattedShipping}</span>
          </div>
        )}
        
        {hasTax && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">VAT:</span>
            <span className="font-medium">{formattedTax}</span>
          </div>
        )}
        
        <hr className="border-gray-200" />
        
        <div className="flex justify-between">
          <span className="text-base font-semibold text-gray-900">Razem:</span>
          <span className="text-lg font-bold text-gray-900">{formattedTotal}</span>
        </div>
      </div>

      {/* Checkout button */}
      <button
        onClick={onCheckout}
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
          isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-primary hover:bg-[#b31313] active:bg-[#9f1111]'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg 
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Aktualizowanie...
          </span>
        ) : (
          'Przejdź do płatności'
        )}
      </button>

      {/* Security note */}
      <p className="text-xs text-gray-500 text-center">
        Bezpieczne płatności przez BLIK i Przelewy24
      </p>
    </div>
  );
});

OptimizedCartSummary.displayName = 'OptimizedCartSummary';