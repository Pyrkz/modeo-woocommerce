/**
 * Transform WordPress image URLs for proper handling in different environments
 * Fixes the issue where Next.js Image component can't fetch images through Caddy proxy
 */

import { Product, ProductImage, ProductVariation } from '@/types/product';

/**
 * Transform WordPress image URL to use internal Docker network URL when in production
 * This prevents circular references when Next.js tries to fetch images through Caddy
 */
export function transformImageUrl(imageUrl: string): string {
  // Only transform in production environments
  if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
    // Check if it's a WordPress upload URL
    if (imageUrl.includes('/wp-content/uploads/')) {
      // Replace public domains with internal WordPress container URL
      return imageUrl
        .replace('https://modeo.pl', 'http://wordpress')
        .replace('https://nextmodeo.sitefy.pl', 'http://wordpress')
        .replace('http://modeo.pl', 'http://wordpress')
        .replace('http://nextmodeo.sitefy.pl', 'http://wordpress');
    }
  }
  
  // In all other cases, return the original URL
  return imageUrl;
}

/**
 * Process product data to transform image URLs
 */
export function transformProductImages<T extends Product>(product: T): T {
  if (!product) return product;
  
  // Transform main images array (images is required in Product type)
  if (Array.isArray(product.images)) {
    product.images = product.images.map((image: ProductImage) => ({
      ...image,
      src: transformImageUrl(image.src),
      // Ensure thumbnail is also transformed if it exists
      ...(image.thumbnail ? { thumbnail: transformImageUrl(image.thumbnail) } : {})
    }));
  }
  
  // Transform variations if they exist
  if (product.variations && Array.isArray(product.variations)) {
    product.variations = product.variations.map((variation: ProductVariation) => {
      // Check if variation has images array
      if (variation.images && Array.isArray(variation.images)) {
        return {
          ...variation,
          images: variation.images.map((image: ProductImage) => ({
            ...image,
            src: transformImageUrl(image.src),
            ...(image.thumbnail ? { thumbnail: transformImageUrl(image.thumbnail) } : {})
          }))
        };
      }
      return variation;
    });
  }
  
  return product;
}

/**
 * Transform an array of products
 */
export function transformProductsImages<T extends Product>(products: T[]): T[] {
  return products.map(transformProductImages);
}