import { cartService, CartAddRequest } from '@/features/cart/services/cart-service';
import { Product } from '@/types/product';

// WooCommerce REST API variation type for detailed variations
interface WCRestApiVariation {
  id: number;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: string;
  stock_quantity: number | null;
  manage_stock: boolean;
  attributes: Array<{
    id: number;
    name: string;
    slug: string;
    option: string;
  }>;
  image: {
    id: number;
    src: string;
    alt: string;
    name: string;
  } | null;
  [key: string]: unknown;
}

export interface ProductAddToCartRequest {
  productId?: number;
  variationId?: number | null;
  quantity?: number;
  variation?: { [key: string]: string };
}

class ProductCartService {
  private static instance: ProductCartService;

  private constructor() {}

  static getInstance(): ProductCartService {
    if (!ProductCartService.instance) {
      ProductCartService.instance = new ProductCartService();
    }
    return ProductCartService.instance;
  }

  /**
   * Add product to cart with intelligent ID selection
   */
  async addProductToCart(
    product: Product,
    request: ProductAddToCartRequest
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Determine the correct product ID to use
      const targetProductId = this.determineProductId(product, request);
      
      if (!targetProductId) {
        return {
          success: false,
          error: 'Nie można określić ID produktu'
        };
      }

      // Validate quantity
      const quantity = request.quantity || 1;
      if (quantity < 1) {
        return {
          success: false,
          error: 'Ilość musi być większa od 0'
        };
      }

      // Prepare cart request
      const cartRequest: CartAddRequest = {
        id: targetProductId,
        quantity,
        variation: request.variation
      };

      // Validate variation for variable products
      if (product.type === 'variable') {
        const validationError = this.validateVariableProductRequest(product, cartRequest);
        if (validationError) {
          return {
            success: false,
            error: validationError
          };
        }
      }

      // Add to cart using cart service
      const response = await cartService.addToCart(cartRequest);
      
      if (response.success) {
        return { success: true };
      } else {
        return {
          success: false,
          error: response.error || 'Błąd dodawania do koszyka'
        };
      }
    } catch (error) {
      console.error('Product cart service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Błąd połączenia z serwerem'
      };
    }
  }

  /**
   * Determine which product ID to use based on request and product type
   */
  private determineProductId(product: Product, request: ProductAddToCartRequest): number | null {
    // If specific product ID is provided, use it
    if (request.productId) {
      return request.productId;
    }

    // If variation ID is provided, use it
    if (request.variationId) {
      return request.variationId;
    }

    // For simple products, use main product ID
    if (product.type !== 'variable') {
      return product.id;
    }

    // For variable products, we need a variation ID
    if (product.type === 'variable' && request.variation && Object.keys(request.variation).length > 0) {
      // Try to find variation ID from product variations
      const variationId = this.findVariationId(product, request.variation);
      return variationId;
    }

    return null;
  }

  /**
   * Find variation ID based on selected attributes
   * Public method with enhanced Polish character and slug matching
   */
  findVariationId(product: Product, selectedAttributes: { [key: string]: string }): number | null {
    if (!product.variations || product.variations.length === 0) {
      return null;
    }

    // Find matching variation
    for (const variation of product.variations) {
      if (variation.attributes) {
        let matches = true;
        
        // Check if all selected attributes match this variation
        for (const [attrName, attrValue] of Object.entries(selectedAttributes)) {
          const variationAttr = variation.attributes.find(attr => 
            attr.name === attrName || attr.name.toLowerCase().includes(attrName.toLowerCase())
          );
          
          if (!variationAttr) {
            matches = false;
            break;
          }
          
          // Enhanced matching logic for different attribute types
          let isMatch = false;
          const variationValue = variationAttr.value || '';
          const selectedValue = attrValue || '';
          
          // Method 1: Direct case-insensitive comparison
          if (variationValue.toLowerCase() === selectedValue.toLowerCase()) {
            isMatch = true;
          }
          // Method 2: Slug comparison - convert display name to slug format
          else {
            // Convert selected value to slug-like format with proper Polish character handling
            const selectedSlug = selectedValue
              .toLowerCase()
              // First handle Polish characters before removing special chars
              .replace(/ą/g, 'a').replace(/ć/g, 'c').replace(/ę/g, 'e')
              .replace(/ł/g, 'l').replace(/ń/g, 'n').replace(/ó/g, 'o')
              .replace(/ś/g, 's').replace(/ź/g, 'z').replace(/ż/g, 'z')
              .replace(/Ą/g, 'a').replace(/Ć/g, 'c').replace(/Ę/g, 'e')
              .replace(/Ł/g, 'l').replace(/Ń/g, 'n').replace(/Ó/g, 'o')
              .replace(/Ś/g, 's').replace(/Ź/g, 'z').replace(/Ż/g, 'z')
              // Remove punctuation and special characters except spaces and hyphens
              .replace(/[,.:;!?()[\]{}'"]/g, '') // Remove common punctuation
              .replace(/[^\w\s-]/g, '') // Remove remaining special characters
              .replace(/\s+/g, '-') // Replace spaces with hyphens
              .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
            
            if (variationValue.toLowerCase() === selectedSlug) {
              isMatch = true;
            }
            // Method 3: Reverse - convert variation slug to display format and compare
            else {
              const variationDisplay = variationValue
                .replace(/-/g, ' ') // Replace hyphens with spaces
                .replace(/\b\w/g, l => l.toUpperCase()); // Title case
              
              if (variationDisplay.toLowerCase() === selectedValue.toLowerCase()) {
                isMatch = true;
              }
            }
          }
          
          if (!isMatch) {
            matches = false;
            break;
          }
        }
        
        if (matches) {
          return variation.id;
        }
      }
    }

    return null;
  }

  /**
   * Validate variable product request
   */
  private validateVariableProductRequest(product: Product, request: CartAddRequest): string | null {
    // Check if we have variation data for variable products
    if (!request.variation || Object.keys(request.variation).length === 0) {
      return 'Wybierz wszystkie opcje produktu';
    }

    // Check if all required attributes are selected
    if (product.attributes) {
      const requiredAttributes = product.attributes.filter(attr => attr.has_variations);
      
      for (const attr of requiredAttributes) {
        if (!request.variation[attr.name]) {
          return `Wybierz opcję: ${attr.name}`;
        }
      }
    }

    return null;
  }

  /**
   * Get availability status of all variants for a product
   */
  getVariantAvailability(product: Product): Map<string, { available: boolean; reason?: string }> {
    const availability = new Map<string, { available: boolean; reason?: string }>();
    
    console.log('🔍 getVariantAvailability Debug:', {
      productId: product.id,
      hasVariations: !!product.variations,
      variationsCount: product.variations?.length || 0,
      hasDetailedVariations: !!(product as unknown as { detailedVariations?: WCRestApiVariation[] }).detailedVariations,
      detailedVariationsCount: ((product as unknown as { detailedVariations?: WCRestApiVariation[] }).detailedVariations?.length) || 0
    });
    
    // Use detailed variations if available (from WooCommerce REST API)
    const detailedVariations = (product as unknown as { detailedVariations?: WCRestApiVariation[] }).detailedVariations;
    if (detailedVariations && detailedVariations.length > 0) {
      console.log('✅ Using detailed variations with stock information');
      
      detailedVariations.forEach((variation, index) => {
        // Convert detailed variation to our format for key generation
        const keyVariation = {
          attributes: variation.attributes?.map((attr) => ({
            name: attr.name || attr.slug || '',
            value: attr.option || ''
          })).filter(attr => attr.name && attr.value) || []
        };
        const key = this.getVariationKey(keyVariation);
        
        let isAvailable = true;
        let reason = '';
        let checkUsed = '';

        // Check purchasable first
        if (variation.purchasable !== undefined) {
          isAvailable = variation.purchasable === true;
          if (!isAvailable) reason = 'Wariant niedostępny';
          checkUsed = 'purchasable';
        }
        // Check manage_stock and stock_status
        else if (variation.stock_status !== undefined) {
          isAvailable = variation.stock_status === 'instock';
          if (!isAvailable) reason = 'Brak na stanie';
          checkUsed = 'stock_status';
        }
        else {
          isAvailable = false;
          reason = 'Brak informacji o dostępności';
          checkUsed = 'none (defaulted to false)';
        }

        console.log(`📋 Detailed Variation ${index + 1} (ID: ${variation.id}):`, {
          key,
          attributes: keyVariation.attributes,
          stock_status: variation.stock_status,
          purchasable: variation.purchasable,
          manage_stock: variation.manage_stock,
          stock_quantity: variation.stock_quantity,
          checkUsed,
          isAvailable,
          reason
        });

        availability.set(key, { available: isAvailable, reason });
      });
      
      console.log('📊 Detailed variant availability result:', Object.fromEntries(availability));
      return availability;
    }
    
    // Fallback to original variations if detailed ones not available
    if (!product.variations || product.variations.length === 0) {
      console.log('❌ No variations found for product');
      return availability;
    }

    console.log('⚠️ Using fallback variations (limited stock info)');
    
    product.variations.forEach((variation, index) => {
      const key = this.getVariationKey(variation);
      
      // Check multiple stock properties
      const variationAny = variation as unknown as {
        is_purchasable?: boolean;
        purchasable?: boolean;
        is_in_stock?: boolean;
        stock_quantity?: number;
        manage_stock?: boolean;
      };
      let isAvailable = true; // Default to available unless proven otherwise
      let reason = '';
      let checkUsed = '';

      // Check is_purchasable first (most reliable)
      if (variationAny.is_purchasable !== undefined) {
        isAvailable = variationAny.is_purchasable === true;
        if (!isAvailable) reason = 'Wariant niedostępny';
        checkUsed = 'is_purchasable';
      }
      // Check is_in_stock
      else if (variationAny.is_in_stock !== undefined) {
        isAvailable = variationAny.is_in_stock === true;
        if (!isAvailable) reason = 'Brak na stanie';
        checkUsed = 'is_in_stock';
      }
      // Fall back to stock_status
      else if (variation.stock_status !== undefined) {
        isAvailable = variation.stock_status !== 'outofstock';
        if (!isAvailable) reason = 'Wyprzedane';
        checkUsed = 'stock_status';
      }
      // If no stock information is available from variation data, 
      // default to true (optimistic) but mark for dynamic checking
      else {
        // Default to available - will be checked dynamically when user selects
        isAvailable = true;
        reason = '';
        checkUsed = 'none (optimistic default - will check dynamically)';
      }

      console.log(`📋 Fallback Variation ${index + 1} (ID: ${variation.id}):`, {
        key,
        attributes: variation.attributes,
        stock_status: variation.stock_status,
        is_purchasable: variationAny.is_purchasable,
        is_in_stock: variationAny.is_in_stock,
        checkUsed,
        isAvailable,
        reason
      });

      availability.set(key, { available: isAvailable, reason });
    });

    console.log('📊 Fallback variant availability result:', Object.fromEntries(availability));
    return availability;
  }

  /**
   * Get availability for specific attribute values
   */
  getAttributeAvailability(product: Product, attributeName: string): Map<string, boolean> {
    const availability = new Map<string, boolean>();
    const variantAvailability = this.getVariantAvailability(product);
    
    console.log('🔍 getAttributeAvailability Debug:', {
      productId: product.id,
      productName: product.name,
      attributeName,
      hasVariations: !!product.variations,
      variationsCount: product.variations?.length || 0,
      variantAvailability: Object.fromEntries(variantAvailability)
    });
    
    if (!product.variations) {
      console.log('❌ No variations found for product');
      return availability;
    }

    // First, get all possible attribute values from product.attributes (the complete list)
    const productAttribute = product.attributes?.find(attr => 
      attr.name === attributeName || attr.name.toLowerCase().includes(attributeName.toLowerCase())
    );
    
    if (productAttribute && productAttribute.terms) {
      // Initialize all possible values - don't set them yet, let variations determine availability
      console.log('🏷️ Found possible values for attribute:', 
        productAttribute.terms.map(t => t.name)
      );
    }

    // Now check each variation to see which attribute values are actually available
    product.variations.forEach((variation, index) => {
      // Try multiple ways to find the attribute
      let attribute = variation.attributes.find(attr => 
        attr.name === attributeName || attr.name.toLowerCase().includes(attributeName.toLowerCase())
      );
      
      // Fallback: try to match by attribute.value against common size values if looking for size
      if (!attribute && attributeName.toLowerCase().includes('rozmiar')) {
        attribute = variation.attributes.find(attr => 
          ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].includes(attr.value?.toUpperCase())
        );
      }
      
      console.log(`📋 Variation ${index + 1}:`, {
        variationId: variation.id,
        attributes: variation.attributes,
        stock_status: variation.stock_status,
        is_purchasable: (variation as unknown as { is_purchasable?: boolean }).is_purchasable,
        is_in_stock: (variation as unknown as { is_in_stock?: boolean }).is_in_stock,
        foundAttribute: attribute
      });
      
      if (attribute && attribute.value) {
        const variantKey = this.getVariationKey(variation);
        const variantData = variantAvailability.get(variantKey);
        const variantAvailable = variantData?.available ?? false;
        
        console.log(`🔄 Processing attribute value "${attribute.value}":`, {
          variantKey,
          variantData,
          variantAvailable
        });
        
        // If any variant with this attribute value is available, mark as available
        const currentAvailability = availability.get(attribute.value) ?? false;
        const newAvailability = currentAvailability || variantAvailable;
        
        // Set both lowercase and uppercase versions for case-insensitive matching
        availability.set(attribute.value.toLowerCase(), newAvailability);
        availability.set(attribute.value.toUpperCase(), newAvailability);
        availability.set(attribute.value, newAvailability); // Original case
        
        console.log(`✅ Set availability for "${attribute.value}" (all cases): ${newAvailability}`);
      }
    });

    console.log('📊 Final availability map:', Object.fromEntries(availability));
    return availability;
  }

  /**
   * Create unique key for variation based on its attributes
   */
  private getVariationKey(variation: { attributes: { name: string; value: string }[] }): string {
    return variation.attributes
      .map(attr => `${attr.name}:${attr.value}`)
      .sort()
      .join('|');
  }

  /**
   * Check if product can be added to cart
   */
  canAddToCart(product: Product, selectedVariation?: { [key: string]: string }): { canAdd: boolean; reason?: string } {
    // For simple products, check stock status
    if (product.type !== 'variable') {
      if (product.stock_status === 'outofstock') {
        return {
          canAdd: false,
          reason: 'Produkt niedostępny'
        };
      }
      return { canAdd: true };
    }

    // For variable products, check if all attributes are selected
    if (!selectedVariation || Object.keys(selectedVariation).length === 0) {
      return {
        canAdd: false,
        reason: 'Wybierz wszystkie opcje produktu'
      };
    }

    // Check if all required attributes are selected
    if (product.attributes) {
      const requiredAttributes = product.attributes.filter(attr => attr.has_variations);
      
      for (const attr of requiredAttributes) {
        if (!selectedVariation[attr.name]) {
          return {
            canAdd: false,
            reason: `Wybierz opcję: ${attr.name}`
          };
        }
      }
    }

    // Check stock status of selected variation
    if (product.variations && selectedVariation) {
      const variationId = this.findVariationId(product, selectedVariation);
      if (variationId) {
        const variation = product.variations.find(v => v.id === variationId);
        if (variation && variation.stock_status === 'outofstock') {
          return {
            canAdd: false,
            reason: 'Wybrany wariant jest niedostępny'
          };
        }
      }
    }

    return { canAdd: true };
  }

  /**
   * Check real-time stock availability for a specific variant selection
   * Uses optimistic approach with variation data lookup only
   */
  async checkVariantAvailability(
    product: Product, 
    selectedVariation: { [key: string]: string }
  ): Promise<{ available: boolean; reason?: string }> {
    try {
      // Find the variation ID for the selected attributes
      const variationId = this.findVariationId(product, selectedVariation);
      if (!variationId) {
        return { available: false, reason: 'Wariant nie został znaleziony' };
      }

      // Find the actual variation object
      const variation = product.variations?.find(v => v.id === variationId);
      if (!variation) {
        return { available: false, reason: 'Dane wariantu niedostępne' };
      }

      const variationAny = variation as unknown as {
        is_purchasable?: boolean;
        purchasable?: boolean;
        is_in_stock?: boolean;
        stock_quantity?: number;
        manage_stock?: boolean;
      };

      // Check multiple availability indicators in priority order
      
      // 1. Check is_purchasable (most reliable if available)
      if (variationAny.is_purchasable !== undefined) {
        if (variationAny.is_purchasable === true) {
          return { available: true };
        } else {
          return { available: false, reason: 'Wariant niedostępny do zakupu' };
        }
      }
      
      // 2. Check purchasable (alternative property name)
      if (variationAny.purchasable !== undefined) {
        if (variationAny.purchasable === true) {
          return { available: true };
        } else {
          return { available: false, reason: 'Wariant niedostępny do zakupu' };
        }
      }
      
      // 3. Check is_in_stock
      if (variationAny.is_in_stock !== undefined) {
        if (variationAny.is_in_stock === true) {
          return { available: true };
        } else {
          return { available: false, reason: 'Brak na stanie' };
        }
      }
      
      // 4. Check stock_status
      if (variation.stock_status !== undefined) {
        if (variation.stock_status === 'instock') {
          return { available: true };
        } else if (variation.stock_status === 'outofstock') {
          return { available: false, reason: 'Wyprzedane' };
        } else {
          // Handle other statuses like 'onbackorder'
          return { available: true, reason: 'Dostępne na zamówienie' };
        }
      }
      
      // 5. If no stock data available, use optimistic approach (default to available)
      return { available: true, reason: 'Brak danych o dostępności - domyślnie dostępny' };
      
    } catch {
      // On error, default to available to avoid blocking users unnecessarily
      return { available: true, reason: 'Błąd sprawdzenia dostępności - domyślnie dostępny' };
    }
  }

  /**
   * Get optimistic availability with real-time checking capability
   */
  getOptimizedAttributeAvailability(product: Product, attributeName: string): Map<string, boolean> {
    const availability = new Map<string, boolean>();
    
    if (!product.variations) {
      return availability;
    }

    // Get all possible values for the attribute and default them to available
    const productAttribute = product.attributes?.find(attr => 
      attr.name === attributeName || attr.name.toLowerCase().includes(attributeName.toLowerCase())
    );
    
    if (productAttribute && productAttribute.terms) {
      // Initialize all possible values as available (optimistic approach)
      productAttribute.terms.forEach(term => {
        // Set multiple case variants for robust matching
        availability.set(term.name.toLowerCase(), true);
        availability.set(term.name.toUpperCase(), true);
        availability.set(term.name, true);
      });
    }

    return availability;
  }
}

export const productCartService = ProductCartService.getInstance();