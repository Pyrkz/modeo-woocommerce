'use client';

import React, { memo } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { CartIconProps } from '../types';

export const CartIcon: React.FC<CartIconProps> = memo(({ 
  className = '', 
  itemCount = 0, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative bg-white hover:bg-gray-50 text-gray-700 hover:text-primary p-3 rounded-lg transition-all duration-200 inline-flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${className}`}
      aria-label={`Koszyk${itemCount > 0 ? ` (${itemCount} ${itemCount === 1 ? 'produkt' : 'produkty'})` : ''}`}
    >
      <ShoppingBagIcon className="w-5 h-5" />
      {itemCount > 0 && (
        <span 
          className="absolute -top-1 -right-1 bg-primary text-white rounded-full px-1.5 py-1 text-xs font-medium min-w-[1.25rem] h-5 text-center leading-none flex items-center justify-center animate-scale-in"
          aria-label={`${itemCount} ${itemCount === 1 ? 'produkt' : 'produkty'} w koszyku`}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
});

CartIcon.displayName = 'CartIcon';