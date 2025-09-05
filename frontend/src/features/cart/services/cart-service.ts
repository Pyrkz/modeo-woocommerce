import { config } from '@/lib/config';
import { Cart, AddToCartRequest } from '@/types/cart';

export interface CartAddRequest {
  id: number;
  quantity: number;
  variation?: { [key: string]: string };
}

export interface CartResponse<T = Cart> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

class CartService {
  private static instance: CartService;
  private nonce: string = '';

  private constructor() {}

  static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }
    return CartService.instance;
  }

  /**
   * Decode HTML entities in strings
   */
  private decodeHtmlEntities(text: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }

  /**
   * Fetch and cache nonce for cart operations
   */
  private async fetchNonce(): Promise<string> {
    try {
      // First try to get nonce from dedicated endpoint
      const nonceResponse = await fetch(`${config.getApiUrl()}/wp-json/wc/store/nonce`, {
        credentials: 'include',
      });
      
      if (nonceResponse.ok) {
        const nonceData = await nonceResponse.json();
        if (nonceData.nonce) {
          this.nonce = nonceData.nonce;
          console.log('Cart Service: Nonce fetched from endpoint:', nonceData.nonce.substring(0, 10) + '...');
          return nonceData.nonce;
        }
      }

      // Fallback: try to get nonce from cart endpoint header
      const cartResponse = await fetch(`${config.getApiUrl()}/wp-json/wc/store/cart`, {
        credentials: 'include',
      });
      
      const nonceHeader = cartResponse.headers.get('Nonce') || cartResponse.headers.get('X-WC-Store-API-Nonce');
      if (nonceHeader) {
        this.nonce = nonceHeader;
        return nonceHeader;
      }
      
      return '';
    } catch (error) {
      console.error('Błąd pobierania nonce:', error);
      return '';
    }
  }

  /**
   * Ensure we have a valid nonce
   */
  private async ensureNonce(): Promise<string> {
    if (!this.nonce) {
      this.nonce = await this.fetchNonce();
    }
    return this.nonce;
  }

  /**
   * Convert variation object to WooCommerce Store API format
   */
  private convertVariationToApiFormat(variation?: { [key: string]: string }): Array<{ attribute: string; value: string }> {
    if (!variation || Object.keys(variation).length === 0) {
      return [];
    }

    return Object.entries(variation).map(([key, value]) => ({
      attribute: key,
      value: value
    }));
  }

  /**
   * Get current cart
   */
  async getCart(): Promise<CartResponse<Cart>> {
    try {
      const response = await fetch(`${config.getApiUrl()}/wp-json/wc/store/cart`, {
        credentials: 'include',
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Błąd pobierania koszyka: ${response.status}`,
          statusCode: response.status
        };
      }

      const cart = await response.json();
      
      // Update nonce if available
      const nonceHeader = response.headers.get('Nonce');
      if (nonceHeader) {
        this.nonce = nonceHeader;
      }

      return {
        success: true,
        data: cart
      };
    } catch (error) {
      console.error('Błąd pobierania koszyka:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Błąd połączenia z serwerem'
      };
    }
  }

  /**
   * Add item to cart with proper format conversion
   */
  async addToCart(request: CartAddRequest): Promise<CartResponse<Cart>> {
    try {
      // Ensure we have a nonce
      await this.ensureNonce();

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (this.nonce) {
        headers['X-WC-Store-API-Nonce'] = this.nonce;
        headers['Nonce'] = this.nonce; // Fallback
        console.log('Cart Service: Using nonce:', this.nonce.substring(0, 10) + '...');
      } else {
        console.warn('Cart Service: No nonce available!');
      }

      // Convert to proper API format
      const apiRequest: AddToCartRequest = {
        id: request.id,
        quantity: request.quantity,
        variation: this.convertVariationToApiFormat(request.variation)
      };

      const response = await fetch(`${config.getApiUrl()}/wp-json/wc/store/cart/add-item`, {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify(apiRequest),
      });

      if (!response.ok) {
        let errorMessage = `Błąd dodawania do koszyka: ${response.status}`;
        
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = this.decodeHtmlEntities(errorData.message);
          }
          console.error('Cart API Error:', errorData);
        } catch {
          // Ignore JSON parsing errors
        }

        // If it's a nonce error, try to refresh nonce and retry once
        if (response.status === 403 || errorMessage.includes('nonce') || errorMessage.includes('jednorazowym')) {
          console.log('Cart Service: Nonce error detected, refreshing and retrying...');
          this.nonce = ''; // Clear invalid nonce
          
          // Try once more with fresh nonce
          await this.ensureNonce();
          if (this.nonce) {
            const retryHeaders = {
              'Content-Type': 'application/json',
              'X-WC-Store-API-Nonce': this.nonce,
              'Nonce': this.nonce
            };
            
            const retryResponse = await fetch(`${config.getApiUrl()}/wp-json/wc/store/cart/add-item`, {
              method: 'POST',
              credentials: 'include',
              headers: retryHeaders,
              body: JSON.stringify(apiRequest),
            });
            
            if (retryResponse.ok) {
              const cart = await retryResponse.json();
              return {
                success: true,
                data: cart
              };
            }
          }
        }

        return {
          success: false,
          error: errorMessage,
          statusCode: response.status
        };
      }

      const cart = await response.json();
      return {
        success: true,
        data: cart
      };
    } catch (error) {
      console.error('Błąd dodawania do koszyka:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Błąd połączenia z serwerem'
      };
    }
  }

  /**
   * Update cart item quantity
   */
  async updateCartItem(itemKey: string, quantity: number): Promise<CartResponse<Cart>> {
    try {
      await this.ensureNonce();

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (this.nonce) {
        headers['X-WC-Store-API-Nonce'] = this.nonce;
        headers['Nonce'] = this.nonce; // Fallback
      }

      const response = await fetch(`${config.getApiUrl()}/wp-json/wc/store/cart/items/${itemKey}`, {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Błąd aktualizacji koszyka: ${response.status}`,
          statusCode: response.status
        };
      }

      const cart = await response.json();
      return {
        success: true,
        data: cart
      };
    } catch (error) {
      console.error('Błąd aktualizacji koszyka:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Błąd połączenia z serwerem'
      };
    }
  }

  /**
   * Remove item from cart
   */
  async removeCartItem(itemKey: string): Promise<CartResponse<Cart>> {
    try {
      await this.ensureNonce();

      const headers: Record<string, string> = {};

      if (this.nonce) {
        headers['X-WC-Store-API-Nonce'] = this.nonce;
        headers['Nonce'] = this.nonce; // Fallback
      }

      const response = await fetch(`${config.getApiUrl()}/wp-json/wc/store/cart/items/${itemKey}`, {
        method: 'DELETE',
        credentials: 'include',
        headers,
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Błąd usuwania z koszyka: ${response.status}`,
          statusCode: response.status
        };
      }

      // Check if response has content before trying to parse JSON
      const contentType = response.headers.get('content-type');
      const hasJsonContent = contentType && contentType.includes('application/json');
      const contentLength = response.headers.get('content-length');
      const hasContent = contentLength && parseInt(contentLength) > 0;
      
      let cart = null;
      
      if (hasJsonContent && hasContent) {
        try {
          cart = await response.json();
        } catch {
          console.warn('Could not parse JSON response from removeCartItem, but operation was successful');
          cart = null;
        }
      } else {
        console.log('Remove cart item successful - no JSON content returned (likely 204 No Content)');
      }

      return {
        success: true,
        data: cart
      };
    } catch (error) {
      console.error('Błąd usuwania z koszyka:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Błąd połączenia z serwerem'
      };
    }
  }

  /**
   * Clear the cached nonce (useful for testing or after logout)
   */
  clearNonce(): void {
    this.nonce = '';
  }
}

export const cartService = CartService.getInstance();