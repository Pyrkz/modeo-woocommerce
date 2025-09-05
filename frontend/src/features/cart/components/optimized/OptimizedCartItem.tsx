'use client';

import React, { memo, useCallback, useState, useMemo } from 'react';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { CartItemProps } from '../../types/cart';
import { formatPrice } from '../../utils/formatters';
import { OptimizedCartItemImage } from './OptimizedCartItemImage';

export const OptimizedCartItem = memo<CartItemProps>(({ 
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
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setLocalUpdating(false);
    }
  }, [item.key, onUpdateQuantity, updating]);

  const handleRemove = useCallback(async () => {
    if (updating) return;
    
    setLocalUpdating(true);
    try {
      await onRemove(item.key);
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setLocalUpdating(false);
    }
  }, [item.key, onRemove, updating]);

  // Memoized values for performance
  const imageUrl = useMemo(() => 
    item.images?.[0]?.thumbnail || item.images?.[0]?.src, 
    [item.images]
  );
  
  const imageAlt = useMemo(() => 
    item.images?.[0]?.alt || item.name, 
    [item.images, item.name]
  );

  const formattedLineTotal = useMemo(() => 
    formatPrice(item.totals.line_total, item.totals.currency_symbol), 
    [item.totals.line_total, item.totals.currency_symbol]
  );

  const formattedUnitPrice = useMemo(() => 
    item.quantity > 1 ? formatPrice(item.prices.price, item.prices.currency_symbol) : null,
    [item.quantity, item.prices.price, item.prices.currency_symbol]
  );

  return (
    <div className={`flex gap-4 py-4 border-b border-gray-100 last:border-0 transition-opacity ${updating ? 'opacity-50' : ''}`}>
      {/* Product Image */}
      <OptimizedCartItemImage 
        src={imageUrl}
        alt={imageAlt}
        className="w-16 h-16 object-cover rounded-lg bg-gray-100"
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
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={updating || item.quantity <= 1}
              className="p-2 rounded-l-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Zmniejsz ilość"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            
            <span className="w-12 text-center text-sm font-medium border-x border-gray-200 py-2">
              {item.quantity}
            </span>
            
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={updating}
              className="p-2 rounded-r-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Zwiększ ilość"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              {formattedLineTotal}
            </p>
            {formattedUnitPrice && (
              <p className="text-xs text-gray-500">
                {formattedUnitPrice} / szt.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        disabled={updating}
        className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-red-50"
        aria-label={`Usuń ${item.name} z koszyka`}
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
});

OptimizedCartItem.displayName = 'OptimizedCartItem';