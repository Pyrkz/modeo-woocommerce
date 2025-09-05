import { memo, useMemo, useCallback } from 'react';
import { Product } from '../../types';
import { OptimizedProductCard } from './OptimizedProductCard';

interface VirtualizedProductGridProps {
  products: Product[];
  onAddToCart?: (productId: number, quantity?: number) => void;
  onToggleFavorite?: (productId: number) => void;
  onQuickView?: (product: Product) => void;
  favorites?: Set<number>;
  addingToCart?: Set<number>;
  className?: string;
  loadingMore?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

// Memoized product card to prevent unnecessary rerenders
const MemoizedProductCard = memo<{
  product: Product;
  onAddToCart?: (productId: number, quantity?: number) => void;
  onToggleFavorite?: (productId: number) => void;
  onQuickView?: (product: Product) => void;
  isFavorite: boolean;
  isAddingToCart: boolean;
  priority: boolean;
}>(({ product, onAddToCart, onToggleFavorite, onQuickView, isFavorite, isAddingToCart, priority }) => (
  <OptimizedProductCard
    product={product}
    onAddToCart={onAddToCart}
    onToggleFavorite={onToggleFavorite}
    onQuickView={onQuickView}
    isFavorite={isFavorite}
    isAddingToCart={isAddingToCart}
    priority={priority}
  />
));
MemoizedProductCard.displayName = 'MemoizedProductCard';

// Load more button component
const LoadMoreButton = memo<{
  onLoadMore: () => void;
  hasMore: boolean;
  loadingMore: boolean;
}>(({ onLoadMore, hasMore, loadingMore }) => {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onLoadMore}
        disabled={loadingMore}
        className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        {loadingMore ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Ładowanie...
          </>
        ) : (
          'Pokaż więcej produktów'
        )}
      </button>
    </div>
  );
});
LoadMoreButton.displayName = 'LoadMoreButton';

export const VirtualizedProductGrid = memo<VirtualizedProductGridProps>(({
  products,
  onAddToCart,
  onToggleFavorite,
  onQuickView,
  favorites = new Set(),
  addingToCart = new Set(),
  className = '',
  loadingMore = false,
  hasMore = false,
  onLoadMore
}) => {
  // Memoize grid items to prevent unnecessary recalculations
  const gridItems = useMemo(() => {
    return products.map((product, index) => ({
      product,
      key: `${product.id}-${product.date_modified || index}`, // Use modified date for cache busting
      priority: index < 4 // Priority loading for first 4 products
    }));
  }, [products]);

  const handleAddToCart = useCallback((productId: number, quantity?: number) => {
    onAddToCart?.(productId, quantity);
  }, [onAddToCart]);

  const handleToggleFavorite = useCallback((productId: number) => {
    onToggleFavorite?.(productId);
  }, [onToggleFavorite]);

  const handleQuickView = useCallback((product: Product) => {
    onQuickView?.(product);
  }, [onQuickView]);

  const handleLoadMore = useCallback(() => {
    if (onLoadMore && !loadingMore && hasMore) {
      onLoadMore();
    }
  }, [onLoadMore, loadingMore, hasMore]);

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nie znaleziono produktów
        </h3>
        <p className="text-gray-500">
          Spróbuj zmienić filtry lub wyszukać inne produkty
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {gridItems.map(({ product, key, priority }) => (
          <MemoizedProductCard
            key={key}
            product={product}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            onQuickView={handleQuickView}
            isFavorite={favorites.has(product.id)}
            isAddingToCart={addingToCart.has(product.id)}
            priority={priority}
          />
        ))}
      </div>

      {/* Load More Button */}
      <LoadMoreButton
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        loadingMore={loadingMore}
      />
    </div>
  );
});

VirtualizedProductGrid.displayName = 'VirtualizedProductGrid';