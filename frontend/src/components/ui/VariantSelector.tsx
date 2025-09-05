'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Product, ProductAttribute } from '@/types/product';
import { ShopApi } from '@/features/shop/api/shop.api';
import AttributeSwatch from './AttributeSwatch';

interface VariantSelectorProps {
  product: Product;
  onAddToCart?: (productId: number, quantity: number, variation?: { [key: string]: string }) => Promise<void>;
  onVariationSelected?: (variationId: number | null) => void;
  className?: string;
}

const VariantSelector = ({ 
  product, 
  onAddToCart, 
  onVariationSelected,
  className = '' 
}: VariantSelectorProps) => {
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({});
  const [selectedVariationId, setSelectedVariationId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get variation attributes from product.attributes (preferred) or variations (fallback)
  const variationAttributes = useMemo((): ProductAttribute[] => {
    // Use product.attributes if available and this is a variable product
    if (product.attributes && product.attributes.length > 0 && ShopApi.isVariableProduct(product)) {
      return product.attributes.filter(attr => attr.has_variations && attr.terms.length > 1);
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

  // Get single-option attributes (auto-selected) - keeping the fallback logic for now
  const singleOptionAttributes = useMemo(() => {
    const allVariationAttributes = ShopApi.getVariationAttributes(product);
    return allVariationAttributes.filter(attr => attr.options.length === 1);
  }, [product]);

  // Update selected variation when attributes change
  const updateSelectedVariation = useCallback((attributes: { [key: string]: string }) => {
    const variationId = ShopApi.findVariationId(product, attributes);
    setSelectedVariationId(variationId);
    if (onVariationSelected) {
      onVariationSelected(variationId);
    }
  }, [product, onVariationSelected]);

  // Handle attribute selection
  const handleAttributeChange = useCallback((attributeName: string, value: string) => {
    const newAttributes = { ...selectedAttributes, [attributeName]: value };
    setSelectedAttributes(newAttributes);
    updateSelectedVariation(newAttributes);
  }, [selectedAttributes, updateSelectedVariation]);

  // Handle add to cart for variation
  const handleAddToCart = useCallback(async () => {
    if (!selectedVariationId || !onAddToCart) return;

    setIsLoading(true);
    try {
      await onAddToCart(selectedVariationId, 1, selectedAttributes);
    } finally {
      setIsLoading(false);
    }
  }, [selectedVariationId, selectedAttributes, onAddToCart]);

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


  // Check if all required attributes are selected (only multi-option attributes need user selection)
  const isCompleteSelection = useMemo(() => {
    // If there are no multi-option attributes, check if we have all single-option attributes
    if (variationAttributes.length === 0) {
      return singleOptionAttributes.every(attr => selectedAttributes[attr.name]);
    }
    // Otherwise, check multi-option attributes
    return variationAttributes.every(attr => selectedAttributes[attr.name]);
  }, [variationAttributes, selectedAttributes, singleOptionAttributes]);

  if (!ShopApi.isVariableProduct(product)) {
    return null;
  }

  // If there are no multi-option attributes, don't show the selector UI
  if (variationAttributes.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        {onAddToCart && (
          <button
            onClick={handleAddToCart}
            disabled={!isCompleteSelection || isLoading}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
              isCompleteSelection && !isLoading
                ? 'bg-primary hover:bg-primary-hover text-white'
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
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                </svg>
                Dodaj do koszyka
              </>
            )}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Variation Attribute Selectors */}
      {variationAttributes.map((attribute) => {
        return (
          <div key={attribute.name} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {attribute.name}:
            </label>
            <div className="flex flex-wrap gap-2 items-center">
              {attribute.terms.map((term) => {
                const isSelected = selectedAttributes[attribute.name] === term.name;
                
                return (
                  <AttributeSwatch
                    key={term.id}
                    term={term}
                    isSelected={isSelected}
                    onClick={() => handleAttributeChange(attribute.name, term.name)}
                  />
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Add to Cart Button */}
      {onAddToCart && (
        <button
          onClick={handleAddToCart}
          disabled={!isCompleteSelection || isLoading}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
            isCompleteSelection && !isLoading
              ? 'bg-primary hover:bg-primary-hover text-white'
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
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
              </svg>
              {isCompleteSelection ? 'Dodaj do koszyka' : 'Wybierz opcje'}
            </>
          )}
        </button>
      )}

      {/* Selection Help Text */}
      {!isCompleteSelection && variationAttributes.length > 0 && (
        <p className="text-sm text-gray-500 text-center">
          Wybierz wszystkie opcje aby dodać produkt do koszyka
        </p>
      )}
    </div>
  );
};

export default VariantSelector;