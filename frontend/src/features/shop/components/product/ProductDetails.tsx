'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import { EnhancedVariantSelector } from './EnhancedVariantSelector';
import { useProductCartContext } from './ProductCartProvider';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

interface ProductInfoProps {
  product: Product;
  selectedVariationId?: number | null;
  selectedAttributes: { [key: string]: string };
  onVariationSelected: (variationId: number | null, attributes: { [key: string]: string }) => void;
}

export const ProductDetails = ({ 
  product, 
  selectedVariationId, 
  selectedAttributes,
  onVariationSelected 
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, loading, error, canAddToCart, clearError } = useProductCartContext();

  // Safety check for required props
  if (!product || !product.name || !product.prices) {
    console.warn('ProductDetails: Missing required product data');
    return null;
  }

  const handleAddToCart = async (variationId?: number | null, qty = 1, attributes?: { [key: string]: string }) => {
    clearError();
    
    await addToCart({
      variationId: variationId || selectedVariationId,
      quantity: qty,
      variation: attributes || selectedAttributes
    });
  };

  const handleVariationSelected = (variationId: number | null, attributes: { [key: string]: string } = {}) => {
    onVariationSelected(variationId, attributes);
  };

  const { canAdd, reason } = canAddToCart(selectedAttributes);

  return (
    <div>
      {/* Product Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4" 
          dangerouslySetInnerHTML={{ __html: product.name }}
      />
      
      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-4">
          <span className="text-3xl font-bold text-primary">
            {(parseInt(product.prices.price) / 100).toFixed(2)} {product.prices.currency_symbol}
          </span>
          {product.prices.regular_price !== product.prices.sale_price && (
            <span className="text-xl text-gray-400 line-through">
              {(parseInt(product.prices.regular_price) / 100).toFixed(2)} {product.prices.currency_symbol}
            </span>
          )}
        </div>
      </div>

      {/* Short Description */}
      {product.short_description && (
        <div className="mb-6 product-description-short">
          <div dangerouslySetInnerHTML={{ __html: product.short_description }} />
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Product Variants Selector */}
      {product.type === 'variable' && (
        <div className="mb-6" id="variant-selector" role="group" aria-label="Opcje produktu">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Wybierz opcje</h3>
          <EnhancedVariantSelector 
            product={product}
            onAddToCart={handleAddToCart}
            onVariationSelected={handleVariationSelected}
            className="mb-4"
          />
        </div>
      )}

      {/* Variation Description */}
      {selectedVariationId && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-900 mb-1">Wybrano wariant produktu</h4>
              <p className="text-sm text-blue-800">ID wariantu: {selectedVariationId}</p>
            </div>
          </div>
        </div>
      )}

      {/* Simple Product Cart (for non-variable products) */}
      {product.type !== 'variable' && (
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <label className="text-sm font-medium text-gray-700">Ilość:</label>
            <div className="flex items-center border rounded-lg">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-500 hover:text-gray-700"
              >
                −
              </button>
              <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-gray-500 hover:text-gray-700"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => handleAddToCart(undefined, quantity)}
              disabled={loading || !canAdd}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                canAdd && !loading
                  ? 'bg-primary hover:bg-primary-hover text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Dodawanie...
                </>
              ) : (
                <>
                  <ShoppingBagIcon className="w-5 h-5" />
                  Dodaj do koszyka
                </>
              )}
            </button>
            
            <Link 
              href="/koszyk"
              className="border border-primary text-primary hover:bg-primary hover:text-white py-3 px-6 rounded-lg font-medium transition-colors text-center flex items-center justify-center gap-2"
            >
              <ShoppingBagIcon className="w-4 h-4" />
              Zobacz koszyk
            </Link>
          </div>

          {!canAdd && reason && (
            <p className="text-sm text-red-600 mt-2">{reason}</p>
          )}
        </div>
      )}

      {/* View Cart Link for variable products */}
      {product.type === 'variable' && (
        <div className="mb-8">
          <Link 
            href="/koszyk"
            className="w-full border border-primary text-primary hover:bg-primary hover:text-white py-3 px-6 rounded-lg font-medium transition-colors text-center flex items-center justify-center gap-2"
          >
            <ShoppingBagIcon className="w-4 h-4" />
            Zobacz koszyk
          </Link>
        </div>
      )}

      {/* Trust Signals */}
      <div className="border-t pt-6">
        <div className="grid grid-cols-1 gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Bezpłatna dostawa od 200 zł
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Płatność BLIK i kartą
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            14 dni na zwrot
          </div>
        </div>
      </div>
    </div>
  );
};