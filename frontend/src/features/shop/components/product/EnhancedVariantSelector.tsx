'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Product, ProductAttribute } from '@/types/product';
import { ShopApi } from '@/features/shop/api/shop.api';
import { productCartService } from '@/features/shop/services/product-cart.service';
import { AttributeSelector } from './AttributeSelector';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

interface EnhancedVariantSelectorProps {
  product: Product;
  onAddToCart?: (variationId?: number | null, quantity?: number, variation?: { [key: string]: string }) => Promise<void>;
  onVariationSelected?: (variationId: number | null, attributes?: { [key: string]: string }) => void;
  className?: string;
}

/**
 * Enhanced variant selector with intelligent attribute type detection
 * and optimized UX for different attribute types (color, size, text)
 */
export const EnhancedVariantSelector = ({ 
  product, 
  onAddToCart, 
  onVariationSelected,
  className = '' 
}: EnhancedVariantSelectorProps) => {
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({});
  const [selectedVariationId, setSelectedVariationId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVariationStock, setSelectedVariationStock] = useState<string | null>(null);

  // Get variation attributes from product.attributes (preferred) or variations (fallback)
  const variationAttributes = useMemo((): ProductAttribute[] => {
    // Use product.attributes if available and this is a variable product
    if (product.attributes && product.attributes.length > 0 && ShopApi.isVariableProduct(product)) {
      return product.attributes.filter(attr => attr.has_variations && attr.terms && attr.terms.length > 1);
    }
    
    // Fallback to the original method
    const legacyAttributes = ShopApi.getVariationAttributes(product);
    return legacyAttributes.filter(attr => attr.options.length > 1).map(attr => ({
      id: 0,
      name: attr.name,
      taxonomy: null,
      has_variations: true,
      terms: attr.options.map((option, index) => ({
        id: index,
        name: option,
        slug: option.toLowerCase().replace(/\s+/g, '-'),
      }))
    }));
  }, [product]);

  // Fetch detailed variations with stock information (kept for future API improvements)
  // Commented out until API authentication is resolved
  // const [detailedVariations, setDetailedVariations] = useState<unknown[]>([]);

  // useEffect(() => {
  //   if (ShopApi.isVariableProduct(product)) {
  //     console.log('🔄 Fetching detailed variations for product:', product.id);
      
  //     ShopApi.fetchDetailedVariations(product.id)
  //       .then(variations => {
  //         console.log('✅ Got detailed variations:', variations);
  //         setDetailedVariations(variations);
  //       })
  //       .catch(error => {
  //         console.error('❌ Failed to fetch detailed variations:', error);
  //         setDetailedVariations([]);
  //       });
  //   }
  // }, [product.id, product]);

  // State for real-time availability checking
  const [realTimeAvailability, setRealTimeAvailability] = useState<Map<string, { available: boolean; reason?: string }> | null>(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  // Get optimistic attribute availability (default to available)
  const attributeAvailability = useMemo(() => {
    if (!ShopApi.isVariableProduct(product)) {
      return new Map();
    }

    const availabilityMap = new Map<string, Map<string, boolean>>();
    
    variationAttributes.forEach(attribute => {
      // Use optimized availability that defaults to available
      const availability = productCartService.getOptimizedAttributeAvailability(product, attribute.name);
      availabilityMap.set(attribute.name, availability);
    });

    return availabilityMap;
  }, [product, variationAttributes]);

  // Get single-option attributes (auto-selected)
  const singleOptionAttributes = useMemo(() => {
    const allVariationAttributes = ShopApi.getVariationAttributes(product);
    return allVariationAttributes.filter(attr => attr.options.length === 1);
  }, [product]);

  // Update selected variation when attributes change
  const updateSelectedVariation = useCallback((attributes: { [key: string]: string }) => {
    // Use the same sophisticated matching logic as the cart service
    const variationId = productCartService.findVariationId(product, attributes);
    
    setSelectedVariationId(variationId);
    
    // Check stock status of selected variation
    if (variationId && product.variations) {
      const variation = product.variations.find(v => v.id === variationId);
      if (variation) {
        setSelectedVariationStock(variation.stock_status || null);
      }
    } else {
      setSelectedVariationStock(null);
    }
    
    if (onVariationSelected) {
      onVariationSelected(variationId, attributes);
    }
  }, [product, onVariationSelected]);

  // Real-time availability check when user makes a complete selection
  const checkRealTimeAvailability = useCallback(async (attributes: { [key: string]: string }) => {
    // Only check if we have a complete selection
    const requiredAttrs = variationAttributes.filter(attr => attr.terms && attr.terms.length > 1);
    const hasCompleteSelection = requiredAttrs.every(attr => attributes[attr.name]);
    
    if (!hasCompleteSelection) {
      setRealTimeAvailability(null);
      return;
    }

    setCheckingAvailability(true);
    
    try {
      const result = await productCartService.checkVariantAvailability(product, attributes);
      
      // Store result in a map for easy access
      const availabilityMap = new Map<string, { available: boolean; reason?: string }>();
      availabilityMap.set('selection', result);
      setRealTimeAvailability(availabilityMap);
    } catch {
      setRealTimeAvailability(null);
    } finally {
      setCheckingAvailability(false);
    }
  }, [product, variationAttributes]);

  // Handle attribute selection with real-time checking
  const handleAttributeChange = useCallback((attributeName: string, value: string) => {
    const newAttributes = { ...selectedAttributes, [attributeName]: value };
    setSelectedAttributes(newAttributes);
    updateSelectedVariation(newAttributes);
    
    // Trigger real-time availability check
    checkRealTimeAvailability(newAttributes);
  }, [selectedAttributes, updateSelectedVariation, checkRealTimeAvailability]);

  // Auto-select single-option attributes
  useEffect(() => {
    const autoSelectedAttributes: { [key: string]: string } = {};
    singleOptionAttributes.forEach(attr => {
      if (attr.options.length === 1) {
        autoSelectedAttributes[attr.name] = attr.options[0];
      }
    });

    if (Object.keys(autoSelectedAttributes).length > 0) {
      setSelectedAttributes(prev => ({ ...prev, ...autoSelectedAttributes }));
    }
  }, [singleOptionAttributes]);

  // Check if all required attributes are selected
  const isCompleteSelection = useMemo(() => {
    // If there are no multi-option attributes, check if we have all single-option attributes
    if (variationAttributes.length === 0) {
      return singleOptionAttributes.every(attr => selectedAttributes[attr.name]);
    }
    // Otherwise, check multi-option attributes
    return variationAttributes.every(attr => selectedAttributes[attr.name]);
  }, [variationAttributes, selectedAttributes, singleOptionAttributes]);

  // Check if selected variation is in stock (with real-time data priority)
  const isInStock = useMemo(() => {
    if (!selectedVariationId) return true; // If no variation selected yet, assume available
    
    // Priority 1: Use real-time availability data if available
    if (realTimeAvailability && isCompleteSelection) {
      const realTimeResult = realTimeAvailability.get('selection');
      if (realTimeResult !== undefined) {
        return realTimeResult.available;
      }
    }
    
    // Priority 2: Use variation data if available
    if (selectedVariationId && product.variations) {
      const variation = product.variations.find(v => v.id === selectedVariationId);
      if (variation) {
        // Check multiple properties for stock availability
        const variationAny = variation as unknown as {
          is_purchasable?: boolean;
          is_in_stock?: boolean;
          purchasable?: boolean;
          in_stock?: boolean;
        };
        
        // Check is_purchasable first (most reliable)
        if (variationAny.is_purchasable !== undefined) {
          return variationAny.is_purchasable === true;
        }
        
        // Check is_in_stock
        if (variationAny.is_in_stock !== undefined) {
          return variationAny.is_in_stock === true;
        }
        
        // Fall back to stock_status
        if (selectedVariationStock !== null) {
          return selectedVariationStock !== 'outofstock';
        }
      }
    }
    
    // Priority 3: Default to available (optimistic)
    return true;
  }, [selectedVariationId, selectedVariationStock, product.variations, realTimeAvailability, isCompleteSelection]);

  // Handle add to cart for variation
  const handleAddToCart = useCallback(async () => {
    if (!selectedVariationId || !onAddToCart) {
      return;
    }

    setIsLoading(true);
    try {
      await onAddToCart(selectedVariationId, 1, selectedAttributes);
    } catch (error) {
      console.error('Add to cart failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedVariationId, selectedAttributes, onAddToCart]);

  // Get stock status message
  const stockStatusMessage = useMemo(() => {
    if (checkingAvailability) {
      return 'Sprawdzanie dostępności...';
    }
    
    if (realTimeAvailability && isCompleteSelection) {
      const realTimeResult = realTimeAvailability.get('selection');
      if (realTimeResult && !realTimeResult.available) {
        return realTimeResult.reason || 'Wariant niedostępny';
      }
    }
    
    if (isCompleteSelection && !isInStock) {
      return 'Wybrany wariant produktu jest niedostępny';
    }
    
    return null;
  }, [checkingAvailability, realTimeAvailability, isCompleteSelection, isInStock]);

  if (!ShopApi.isVariableProduct(product)) {
    return null;
  }

  // If there are no multi-option attributes, show simplified UI
  if (variationAttributes.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        {onAddToCart && (
          <button
            onClick={handleAddToCart}
            disabled={!isCompleteSelection || isLoading || !isInStock}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              isCompleteSelection && !isLoading && isInStock
                ? 'bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a7.646 7.646 0 100 15.292 7.646 7.646 0 000-15.292z" />
                </svg>
                Dodawanie...
              </>
            ) : !isInStock ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Produkt niedostępny
              </>
            ) : (
              <>
                <ShoppingBagIcon className="w-5 h-5" />
                Dodaj do koszyka
              </>
            )}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Enhanced Attribute Selectors */}
      {variationAttributes.map((attribute) => (
        <AttributeSelector
          key={attribute.name}
          attribute={attribute}
          selectedValue={selectedAttributes[attribute.name]}
          onValueChange={(value) => handleAttributeChange(attribute.name, value)}
          availability={attributeAvailability.get(attribute.name)}
        />
      ))}

      {/* Add to Cart Button */}
      {onAddToCart && (
        <div className="pt-4 border-t">
          
          <button
            onClick={handleAddToCart}
            disabled={!isCompleteSelection || isLoading || !isInStock}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              isCompleteSelection && !isLoading && isInStock
                ? 'bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-lg hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a7.646 7.646 0 100 15.292 7.646 7.646 0 000-15.292z" />
                </svg>
                Dodawanie...
              </>
            ) : checkingAvailability ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a7.646 7.646 0 100 15.292 7.646 7.646 0 000-15.292z" />
                </svg>
                Sprawdzanie...
              </>
            ) : !isInStock && isCompleteSelection ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Produkt niedostępny
              </>
            ) : (
              <>
                <ShoppingBagIcon className="w-5 h-5" />
                {isCompleteSelection ? 'Dodaj do koszyka' : 'Wybierz opcje'}
              </>
            )}
          </button>
          
          {/* Selection Help Text */}
          {!isCompleteSelection && variationAttributes.length > 0 && (
            <p className="text-sm text-gray-500 text-center mt-2">
              Wybierz wszystkie opcje aby dodać produkt do koszyka
            </p>
          )}
          
          {/* Dynamic Stock Status Message */}
          {stockStatusMessage && (
            <p className={`text-sm text-center mt-2 ${
              checkingAvailability ? 'text-blue-600' : 'text-red-600'
            }`}>
              {stockStatusMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedVariantSelector;