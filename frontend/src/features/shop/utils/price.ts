/**
 * Optimized price formatting utilities for WooCommerce
 * Handles price conversion from smallest units to display format
 */

const PRICE_CACHE = new Map<string, string>();

/**
 * Format price from WooCommerce Store API format (smallest units)
 * Example: 1599 -> "15.99"
 */
export function formatPrice(price: string | number, useCache = true): string {
  const priceStr = price.toString();
  
  // Use cache for repeated calculations
  if (useCache && PRICE_CACHE.has(priceStr)) {
    return PRICE_CACHE.get(priceStr)!;
  }
  
  const numPrice = typeof price === 'string' ? parseInt(price) : price;
  const formatted = (numPrice / 100).toFixed(2);
  
  if (useCache) {
    PRICE_CACHE.set(priceStr, formatted);
  }
  
  return formatted;
}

/**
 * Format price with currency symbol
 */
export function formatPriceWithCurrency(
  price: string | number, 
  currencySymbol: string = 'zł',
  useCache = true
): string {
  return `${formatPrice(price, useCache)} ${currencySymbol}`;
}

/**
 * Clear price formatting cache (useful for memory management)
 */
export function clearPriceCache(): void {
  PRICE_CACHE.clear();
}

/**
 * Format price range for variable products
 */
export function formatPriceRange(
  minPrice: string | number,
  maxPrice: string | number,
  currencySymbol: string = 'zł'
): string {
  const min = formatPrice(minPrice);
  const max = formatPrice(maxPrice);
  
  if (min === max) {
    return `${min} ${currencySymbol}`;
  }
  
  return `${min} - ${max} ${currencySymbol}`;
}