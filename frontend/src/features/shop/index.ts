// Components
export { ProductPage } from './components/product/ProductPage';
export { ProductImageGallery } from './components/product/ProductImageGallery';
export { ProductDetails } from './components/product/ProductDetails';
export { ProductInfo } from './components/product/ProductInfo';
export { ProductBreadcrumb } from './components/product/ProductBreadcrumb';
export { ProductDescription } from './components/product/ProductDescription';
export { ProductCartProvider, useProductCartContext } from './components/product/ProductCartProvider';
export { CategoryLayout } from './components/CategoryLayout';
export { ShopLayout } from './components/ShopLayout';

// Services
export { productCartService } from './services/product-cart.service';
export type { ProductAddToCartRequest } from './services/product-cart.service';

// Hooks  
export { useProductCart } from './hooks/useProductCart';
export { useCategoryShop } from './hooks/useCategoryShop';
export { useShop } from './hooks/useShop';