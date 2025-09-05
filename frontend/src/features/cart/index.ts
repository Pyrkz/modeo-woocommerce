// Main cart exports
export { useCartApi } from './hooks/useCartApi';
export { cartApi } from './services/cart-api';

// Optimized components (recommended)
export { OptimizedSlideCart } from './components/optimized/OptimizedSlideCart';
export { OptimizedCartItem } from './components/optimized/OptimizedCartItem';
export { OptimizedCartItemImage } from './components/optimized/OptimizedCartItemImage';
export { OptimizedCartSummary } from './components/optimized/OptimizedCartSummary';

// Legacy components (for backward compatibility)
export { SlideCart } from './components/SlideCart';
export { CartItem } from './components/CartItem';
export { CartSummary } from './components/CartSummary';
export { CartLoadingSkeleton } from './components/CartLoadingSkeleton';

// Legacy services (for backward compatibility)
export { cartService } from './services/cart-service';
export type { CartAddRequest, CartResponse } from './services/cart-service';

// Legacy hooks (for backward compatibility)
export { useCartService } from './hooks/useCartService';

// Legacy context (for backward compatibility)
export { OptimizedCartProvider, useOptimizedCart } from './context/OptimizedCartProvider';

// Types
export type {
  Cart,
  CartItem as CartItemType,
  CartTotals,
  AddToCartRequest,
  SlideCartProps,
  CartItemProps,
  CartSummaryProps,
  CartItemImageProps,
} from './types/cart';

// Utilities
export { formatPrice, formatTotalPrice, formatCurrency, parsePrice } from './utils/formatters';