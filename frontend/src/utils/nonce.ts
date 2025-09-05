/**
 * Nonce utility for WooCommerce Store API
 * Handles both development (no nonce) and production (with nonce) modes
 */

import { config } from '@/lib/config';

interface NonceResponse {
  nonce: string;
}

class NonceManager {
  private cachedNonce: string | null = null;
  private nonceExpiry: number = 0;
  private readonly NONCE_CACHE_TIME = 12 * 60 * 60 * 1000; // 12 hours

  /**
   * Get a fresh nonce from WordPress
   */
  private async fetchNonce(): Promise<string> {
    try {
      const response = await fetch(`${config.getApiUrl()}/wp-json/wc/store/nonce`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch nonce');
      }

      const data: NonceResponse = await response.json();
      return data.nonce;
    } catch (error) {
      console.error('Error fetching nonce:', error);
      throw error;
    }
  }

  /**
   * Get nonce (cached or fresh)
   */
  async getNonce(): Promise<string | null> {
    // For development, check if WP_ENV is development
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (isDevelopment) {
      // In development, we don't need nonce due to disabled nonce check
      return null;
    }

    const now = Date.now();

    // Check if cached nonce is still valid
    if (this.cachedNonce && now < this.nonceExpiry) {
      return this.cachedNonce;
    }

    try {
      // Fetch fresh nonce
      this.cachedNonce = await this.fetchNonce();
      this.nonceExpiry = now + this.NONCE_CACHE_TIME;
      
      return this.cachedNonce;
    } catch (error) {
      console.error('Failed to get nonce, continuing without it:', error);
      return null;
    }
  }

  /**
   * Clear cached nonce (useful when nonce becomes invalid)
   */
  clearCache(): void {
    this.cachedNonce = null;
    this.nonceExpiry = 0;
  }

  /**
   * Add nonce to request headers
   */
  async getAuthHeaders(): Promise<Record<string, string>> {
    const nonce = await this.getNonce();
    
    if (nonce) {
      return {
        'X-WC-Store-API-Nonce': nonce,
        'Nonce': nonce,
      };
    }

    return {};
  }
}

// Export singleton instance
export const nonceManager = new NonceManager();

/**
 * Helper function to make authenticated Store API requests
 */
export async function makeAuthenticatedRequest(url: string, options: RequestInit = {}): Promise<Response> {
  const authHeaders = await nonceManager.getAuthHeaders();
  
  const requestOptions: RequestInit = {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, requestOptions);
  
  // If we get a 403 or 401, nonce might be invalid
  if (response.status === 403 || response.status === 401) {
    nonceManager.clearCache();
    
    // Retry once with fresh nonce
    const freshAuthHeaders = await nonceManager.getAuthHeaders();
    const retryOptions: RequestInit = {
      ...requestOptions,
      headers: {
        ...requestOptions.headers,
        ...freshAuthHeaders,
      },
    };
    
    return await fetch(url, retryOptions);
  }
  
  return response;
}