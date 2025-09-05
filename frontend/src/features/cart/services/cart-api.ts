import { config } from '@/lib/config';
import { Cart, AddToCartRequest } from '../types/cart';

export class CartApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'CartApiError';
  }
}

class CartApi {
  private nonce: string = '';
  private sessionCookie: string = '';

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${config.getApiUrl()}/wp-json/wc/store/${endpoint}`;
    
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add nonce header if available
    if (this.nonce) {
      defaultHeaders['X-WC-Store-API-Nonce'] = this.nonce;
    }

    const response = await fetch(url, {
      ...options,
      credentials: 'include', // Critical for session handling
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    // Extract nonce from response header for future requests
    const nonceHeader = response.headers.get('X-WC-Store-API-Nonce');
    if (nonceHeader) {
      this.nonce = nonceHeader;
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new CartApiError(
        errorData?.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData?.code
      );
    }

    return response.json();
  }

  async getCart(): Promise<Cart> {
    return this.request<Cart>('cart');
  }

  async addItem(request: AddToCartRequest): Promise<Cart> {
    return this.request<Cart>('cart/add-item', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async updateItem(itemKey: string, quantity: number): Promise<Cart> {
    return this.request<Cart>(`cart/items/${itemKey}`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeItem(itemKey: string): Promise<Cart> {
    return this.request<Cart>(`cart/items/${itemKey}`, {
      method: 'DELETE',
    });
  }

  async clearCart(): Promise<Cart> {
    return this.request<Cart>('cart/items', {
      method: 'DELETE',
    });
  }

  // Initialize session and nonce
  async initialize(): Promise<void> {
    try {
      await this.getCart(); // This will set the nonce
    } catch (error) {
      console.warn('Failed to initialize cart session:', error);
    }
  }

  getNonce(): string {
    return this.nonce;
  }
}

export const cartApi = new CartApi();