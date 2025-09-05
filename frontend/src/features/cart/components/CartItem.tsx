'use client';

import React, { memo, useCallback, useState } from 'react';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { CartItemProps } from '../types';
import { formatPrice } from '../utils/formatters';
import { CartItemImage } from './CartItemImage';

export const CartItem: React.FC<CartItemProps> = memo(({ 
  item, 
  onUpdateQuantity, 
  onRemove,
  isUpdating = false 
}) => {
  const [localUpdating, setLocalUpdating] = useState(false);
  const updating = isUpdating || localUpdating;

  const handleQuantityChange = useCallback(async (newQuantity: number) => {
    if (newQuantity < 1 || updating) return;
    
    setLocalUpdating(true);
    try {
      await onUpdateQuantity(item.key, newQuantity);
    } finally {
      setLocalUpdating(false);
    }
  }, [item.key, onUpdateQuantity, updating]);

  const handleRemove = useCallback(async () => {
    if (updating) return;
    
    setLocalUpdating(true);
    try {
      await onRemove(item.key);
    } finally {
      setLocalUpdating(false);
    }
  }, [item.key, onRemove, updating]);

  const imageUrl = item.images?.[0]?.thumbnail || item.images?.[0]?.src;
  const imageAlt = item.images?.[0]?.alt || item.name;

  return (
    <div className={`flex gap-4 py-4 border-b border-gray-100 last:border-0 ${updating ? 'opacity-50' : ''}`}>
      {/* Product Image */}
      <CartItemImage 
        src={imageUrl}
        alt={imageAlt}
      />

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate pr-2">
          {item.name}
        </h3>
        
        {item.sku && (
          <p className="text-xs text-gray-500 mt-0.5">SKU: {item.sku}</p>
        )}

        <div className="mt-2 flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={updating || item.quantity <= 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Zmniejsz ilość"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            
            <span className="w-10 text-center text-sm font-medium">
              {item.quantity}
            </span>
            
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={updating}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Zwiększ ilość"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              {formatPrice(item.totals.line_total, item.totals.currency_symbol)}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-gray-500">
                {formatPrice(item.prices.price, item.prices.currency_symbol)} / szt.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        disabled={updating}
        className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label={`Usuń ${item.name} z koszyka`}
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
});

CartItem.displayName = 'CartItem';