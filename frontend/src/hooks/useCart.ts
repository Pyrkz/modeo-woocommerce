import { useState, useCallback, useEffect, useRef } from 'react';
import { Cart, CartItem, AddToCartRequest } from '@/types/cart';
import { config } from '@/lib/config';

interface UseCartReturn {
  cart: Cart | null;
  items: CartItem[];
  itemCount: number;
  loading: boolean;
  updating: boolean;
  error: string | null;
  nonce: string;
  addToCart: (request: AddToCartRequest) => Promise<void>;
  updateQuantity: (itemKey: string, quantity: number) => Promise<void>;
  removeFromCart: (itemKey: string) => Promise<void>;
  refreshCart: () => Promise<void>;
  clearError: () => void;
}

export const useCart = (): UseCartReturn => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState('');
  
  // Użyj ref aby zapobiec re-renders
  const initializedRef = useRef(false);

  // Fetch nonce for cart operations - STABILNE zależności
  const fetchNonce = useCallback(async () => {
    try {
      // Try to get nonce from dedicated endpoint first
      const nonceResponse = await fetch(`${config.getApiUrl()}/wp-json/wc/store/nonce`, {
        credentials: 'include',
      });
      
      if (nonceResponse.ok) {
        const nonceData = await nonceResponse.json();
        if (nonceData.nonce) {
          setNonce(nonceData.nonce);
          console.log('Nonce loaded from endpoint:', nonceData.nonce.substring(0, 10) + '...');
          return;
        }
      }
      
      // Fallback: get nonce from cart header
      const response = await fetch(`${config.getApiUrl()}/wp-json/wc/store/cart`, {
        credentials: 'include',
      });
      const nonceHeader = response.headers.get('X-WC-Store-API-Nonce');
      if (nonceHeader) {
        setNonce(nonceHeader);
        console.log('Nonce loaded from header:', nonceHeader.substring(0, 10) + '...');
      }
    } catch (err) {
      console.error('Błąd pobierania nonce:', err);
    }
  }, []); // PUSTE zależności!

  // Fetch cart data - STABILNE zależności
  const refreshCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${config.getApiUrl()}/wp-json/wc/store/cart`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCart(data);
      
      // Update nonce if available
      const nonceHeader = response.headers.get('X-WC-Store-API-Nonce');
      if (nonceHeader) {
        setNonce(nonceHeader);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Błąd pobierania koszyka';
      setError(errorMessage);
      console.error('Błąd pobierania koszyka:', err);
    } finally {
      setLoading(false);
    }
  }, []); // PUSTE zależności!

  // Add item to cart
  const addToCart = useCallback(async (request: AddToCartRequest) => {
    setUpdating(true);
    setError(null);
    
    try {
      // Ensure we have a nonce
      if (!nonce) {
        await fetchNonce();
      }
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (nonce) {
        headers['X-WC-Store-API-Nonce'] = nonce;
      }
      
      const response = await fetch(`${config.getApiUrl()}/wp-json/wc/store/cart/add-item`, {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify(request),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      // Refresh cart after adding item
      await refreshCart();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Błąd dodawania do koszyka';
      setError(errorMessage);
      console.error('Błąd dodawania do koszyka:', err);
      throw err;
    } finally {
      setUpdating(false);
    }
  }, [nonce, fetchNonce, refreshCart]);

  // Update item quantity
  const updateQuantity = useCallback(async (itemKey: string, quantity: number) => {
    if (quantity < 1) return;
    
    setUpdating(true);
    setError(null);
    
    try {
      console.log('Updating item quantity:', itemKey, 'to:', quantity);
      
      // ALWAYS get fresh nonce before POST operation
      let currentNonce = '';
      
      // Method 1: Try dedicated nonce endpoint
      try {
        const nonceResponse = await fetch(`${config.getApiUrl()}/wp-json/wc/store/nonce`, {
          credentials: 'include',
        });
        
        if (nonceResponse.ok) {
          const nonceData = await nonceResponse.json();
          if (nonceData.nonce) {
            currentNonce = nonceData.nonce;
            console.log('Fresh Store API nonce from endpoint:', currentNonce.substring(0, 10) + '...');
            // Also log WP nonce if available
            if (nonceData.wp_nonce) {
              console.log('Fresh WP nonce from endpoint:', nonceData.wp_nonce.substring(0, 10) + '...');
            }
          }
        }
      } catch {
        console.log('Nonce endpoint failed, trying cart endpoint');
      }
      
      // Method 2: Get nonce from cart call if endpoint failed
      if (!currentNonce) {
        const cartResponse = await fetch(`${config.getApiUrl()}/wp-json/wc/store/cart`, {
          credentials: 'include',
        });
        
        const headerNonce = cartResponse.headers.get('X-WC-Store-API-Nonce');
        if (headerNonce) {
          currentNonce = headerNonce;
          console.log('Fresh nonce from cart header:', currentNonce.substring(0, 10) + '...');
        }
      }
      
      if (!currentNonce) {
        throw new Error('Nie udało się pobrać nonce');
      }
      
      // Update stored nonce
      setNonce(currentNonce);
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-WP-Nonce': currentNonce,
        'X-WC-Store-API-Nonce': currentNonce,
        'Nonce': currentNonce,
      };
      
      console.log('Attempting POST with nonce:', currentNonce.substring(0, 10) + '...');
      
      const response = await fetch(`${config.getApiUrl()}/wp-json/wc/store/cart/items/${itemKey}`, {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify({ quantity }),
      });
      
      console.log('POST response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('POST failed:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Refresh cart after updating
      await refreshCart();
      console.log('Item quantity updated successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Błąd aktualizacji koszyka';
      setError(errorMessage);
      console.error('Błąd aktualizacji koszyka:', err);
    } finally {
      setUpdating(false);
    }
  }, [refreshCart]);

  // Remove item from cart
  const removeFromCart = useCallback(async (itemKey: string) => {
    setUpdating(true);
    setError(null);
    
    try {
      console.log('Removing item:', itemKey);
      
      // ALWAYS get fresh nonce before DELETE operation
      let currentNonce = '';
      
      // Method 1: Try dedicated nonce endpoint
      try {
        const nonceResponse = await fetch(`${config.getApiUrl()}/wp-json/wc/store/nonce`, {
          credentials: 'include',
        });
        
        if (nonceResponse.ok) {
          const nonceData = await nonceResponse.json();
          if (nonceData.nonce) {
            currentNonce = nonceData.nonce;
            console.log('Fresh Store API nonce from endpoint:', currentNonce.substring(0, 10) + '...');
            // Also log WP nonce if available
            if (nonceData.wp_nonce) {
              console.log('Fresh WP nonce from endpoint:', nonceData.wp_nonce.substring(0, 10) + '...');
            }
          }
        }
      } catch {
        console.log('Nonce endpoint failed, trying cart endpoint');
      }
      
      // Method 2: Get nonce from cart call if endpoint failed
      if (!currentNonce) {
        const cartResponse = await fetch(`${config.getApiUrl()}/wp-json/wc/store/cart`, {
          credentials: 'include',
        });
        
        const headerNonce = cartResponse.headers.get('X-WC-Store-API-Nonce');
        if (headerNonce) {
          currentNonce = headerNonce;
          console.log('Fresh nonce from cart header:', currentNonce.substring(0, 10) + '...');
        }
      }
      
      if (!currentNonce) {
        throw new Error('Nie udało się pobrać nonce');
      }
      
      // Update stored nonce
      setNonce(currentNonce);
      
      const headers: Record<string, string> = {
        'X-WP-Nonce': currentNonce,
        'X-WC-Store-API-Nonce': currentNonce,
        'Nonce': currentNonce,
      };
      
      console.log('Attempting DELETE with nonce:', currentNonce.substring(0, 10) + '...');
      
      const response = await fetch(`${config.getApiUrl()}/wp-json/wc/store/cart/items/${itemKey}`, {
        method: 'DELETE',
        credentials: 'include',
        headers,
      });
      
      console.log('DELETE response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('DELETE failed:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Refresh cart after removing item
      await refreshCart();
      console.log('Item removed successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Błąd usuwania z koszyka';
      setError(errorMessage);
      console.error('Błąd usuwania z koszyka:', err);
    } finally {
      setUpdating(false);
    }
  }, [refreshCart]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initialize cart TYLKO RAZ - bez niestabilnych zależności
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      
      const initializeCart = async () => {
        await fetchNonce();
        await refreshCart();
      };
      
      initializeCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // CAŁKOWICIE puste zależności!

  const items = cart?.items || [];
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return {
    cart,
    items,
    itemCount,
    loading,
    updating,
    error,
    nonce,
    addToCart,
    updateQuantity,
    removeFromCart,
    refreshCart,
    clearError,
  };
};