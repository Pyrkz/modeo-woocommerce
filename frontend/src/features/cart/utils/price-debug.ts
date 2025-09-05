/**
 * Price data types that the debug utility can handle
 */
type PriceDebugData = 
  | string 
  | number 
  | {
      price?: string | number;
      regular_price?: string | number;
      sale_price?: string | number;
      currency_symbol?: string;
      currency_code?: string;
      total_price?: string | number;
      numericPrice?: number;
      [key: string]: unknown;
    }
  | null 
  | undefined;

/**
 * Debug helper to understand WooCommerce price format
 */
export const debugPriceFormat = (priceData: PriceDebugData, context: string = '') => {
  console.group(`🔍 Price Debug - ${context}`);
  console.log('Raw price data:', priceData);
  
  if (typeof priceData === 'object' && priceData !== null) {
    Object.keys(priceData).forEach(key => {
      const value = (priceData as Record<string, unknown>)[key];
      if (typeof value === 'string' && !isNaN(parseFloat(value))) {
        console.log(`${key}:`, value, `(${parseFloat(value)} numeric)`);
      } else {
        console.log(`${key}:`, value);
      }
    });
  } else {
    console.log('Price value:', priceData, typeof priceData);
  }
  
  console.groupEnd();
};

/**
 * Smart price formatter that handles both cents and regular prices
 */
export const smartFormatPrice = (price: string | number, currencySymbol: string = 'zł'): string => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numericPrice)) {
    return `0,00 ${currencySymbol}`;
  }

  // Debug the incoming price
  debugPriceFormat({ price, numericPrice, currencySymbol }, 'smartFormatPrice');

  // Check if price looks like it's in cents (over 100 and no decimals)
  const seemsLikeCents = numericPrice >= 100 && numericPrice % 1 === 0;
  const finalPrice = seemsLikeCents ? numericPrice / 100 : numericPrice;
  
  console.log(`💰 Price conversion: ${numericPrice} → ${finalPrice} (cents: ${seemsLikeCents})`);

  return new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(finalPrice) + ` ${currencySymbol}`;
};