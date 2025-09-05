/**
 * Format price with currency symbol for Polish market
 * Handles WooCommerce prices that come in cents (grosze)
 */
export const formatPrice = (price: string | number, currencySymbol: string = 'zł'): string => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numericPrice)) {
    return `0,00 ${currencySymbol}`;
  }

  // WooCommerce Store API returns prices in cents/grosze
  // Convert to złoty by dividing by 100
  const priceInZloty = numericPrice / 100;

  // Format with Polish locale (comma as decimal separator)
  return new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceInZloty) + ` ${currencySymbol}`;
};

/**
 * Format price for display in cart totals
 */
export const formatTotalPrice = (price: string | number, currencySymbol: string = 'zł'): string => {
  return formatPrice(price, currencySymbol);
};

/**
 * Format currency without symbol
 * Handles WooCommerce prices that come in cents (grosze)
 */
export const formatCurrency = (price: string | number): string => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numericPrice)) {
    return '0,00';
  }

  // WooCommerce Store API returns prices in cents/grosze
  // Convert to złoty by dividing by 100
  const priceInZloty = numericPrice / 100;

  return new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceInZloty);
};

/**
 * Parse price from formatted string back to cents (grosze)
 * Returns value that WooCommerce expects (in cents)
 */
export const parsePrice = (formattedPrice: string): number => {
  // Remove currency symbols and convert comma to dot
  const cleanPrice = formattedPrice
    .replace(/[^\d,.-]/g, '')
    .replace(',', '.');
  
  const priceInZloty = parseFloat(cleanPrice) || 0;
  
  // Convert back to cents for WooCommerce API
  return Math.round(priceInZloty * 100);
};