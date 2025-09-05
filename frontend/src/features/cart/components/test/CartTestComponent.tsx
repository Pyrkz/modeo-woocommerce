'use client';

import React, { useState } from 'react';
import { useCartApi } from '../../hooks/useCartApi';
import { OptimizedSlideCart } from '../optimized/OptimizedSlideCart';

export const CartTestComponent: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { 
    cart, 
    items, 
    itemCount, 
    loading, 
    error, 
    addToCart, 
    refreshCart 
  } = useCartApi();

  const handleTestAddToCart = async () => {
    try {
      await addToCart({
        id: 123, // Test product ID
        quantity: 1
      });
    } catch (error) {
      console.error('Test add to cart failed:', error);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Cart Test Component</h2>
      
      {/* Cart Status */}
      <div className="mb-4 space-y-2">
        <p>Items in cart: <strong>{itemCount}</strong></p>
        <p>Loading: <strong>{loading ? 'Yes' : 'No'}</strong></p>
        {error && (
          <p className="text-red-600">Error: <strong>{error}</strong></p>
        )}
      </div>

      {/* Test Buttons */}
      <div className="space-x-2 mb-4">
        <button
          onClick={handleTestAddToCart}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test Add to Cart
        </button>
        
        <button
          onClick={refreshCart}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Refresh Cart
        </button>
        
        <button
          onClick={() => setCartOpen(true)}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Open Cart ({itemCount})
        </button>
      </div>

      {/* Cart Items Preview */}
      {items.length > 0 && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Cart Items:</h3>
          <ul className="text-sm space-y-1">
            {items.map((item) => (
              <li key={item.key} className="flex justify-between">
                <span>{item.name}</span>
                <span>Qty: {item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cart Debug Info */}
      <details className="mb-4">
        <summary className="cursor-pointer text-sm text-gray-600">Debug Info</summary>
        <pre className="mt-2 p-2 bg-gray-100 text-xs overflow-auto">
          {JSON.stringify({ 
            itemCount, 
            loading, 
            error, 
            hasCart: !!cart,
            itemsLength: items.length 
          }, null, 2)}
        </pre>
      </details>

      {/* Slide Cart */}
      <OptimizedSlideCart 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </div>
  );
};