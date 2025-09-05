'use client';

import { memo } from 'react';
import Link from 'next/link';
import type { Product, ProductPrices } from '../../types';
import { useProductActions } from './hooks/useProductActions';
import { formatPriceWithCurrency } from '../../utils/price';

interface ProductActionsProps {
  product: Product;
  isVariable?: boolean;
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => Promise<void>;
  className?: string;
}

const ViewButton = memo<{ href: string; prices: ProductPrices }>(({ href, prices }) => {
  return (
    <Link 
      href={href}
      className="w-full inline-flex items-center justify-between px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
    >
      <span className="text-sm">Wybierz opcje</span>
      <span className="text-sm font-bold">
        {formatPriceWithCurrency(prices.price, prices.currency_symbol)}
      </span>
    </Link>
  );
});
ViewButton.displayName = 'ViewButton';

const AddToCartButton = memo<{ 
  onClick: () => void; 
  prices: ProductPrices;
}>(({ onClick, prices }) => {
  return (
    <button 
      onClick={onClick}
      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 flex items-center justify-between"
    >
      <span className="text-sm">Dodaj do koszyka</span>
      <span className="text-sm font-bold">
        {formatPriceWithCurrency(prices.price, prices.currency_symbol)}
      </span>
    </button>
  );
});
AddToCartButton.displayName = 'AddToCartButton';

export const ProductActions = memo<ProductActionsProps>(({ 
  product,
  isVariable = false,
  onAddToCart,
  className = '' 
}) => {
  const { 
    handleAddToCart, 
    shouldShowAddToCart 
  } = useProductActions({
    productId: product.id,
    productSlug: product.slug,
    isVariable,
    onAddToCart
  });

  return (
    <div className={className}>
      <div className="w-full">
        {shouldShowAddToCart ? (
          <AddToCartButton 
            onClick={handleAddToCart}
            prices={product.prices}
          />
        ) : (
          <ViewButton 
            href={`/sklep/${product.slug}`} 
            prices={product.prices}
          />
        )}
      </div>
    </div>
  );
});

ProductActions.displayName = 'ProductActions';