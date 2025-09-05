import { useState, useCallback, useEffect } from 'react';
import { Cart, CartItem, AddToCartRequest } from '@/types/cart';

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

  // Fetch nonce for cart operations
  const fetchNonce = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/wp-json/wc/store/cart', {
        credentials: 'include',
      });
      const nonceHeader = response.headers.get('Nonce');
      if (nonceHeader) {
        setNonce(nonceHeader);
      }
    } catch (err) {
      console.error('Błąd pobierania nonce:', err);
    }
  }, []);

  // Fetch cart data
  const refreshCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8080/wp-json/wc/store/cart', {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCart(data);
      
      // Update nonce if available
      const nonceHeader = response.headers.get('Nonce');
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
  }, []);

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
        headers['Nonce'] = nonce;
      }
      
      const response = await fetch('http://localhost:8080/wp-json/wc/store/cart/add-item', {
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
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (nonce) {
        headers['Nonce'] = nonce;
      }
      
      const response = await fetch(`http://localhost:8080/wp-json/wc/store/cart/items/${itemKey}`, {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify({ quantity }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Refresh cart after updating
      await refreshCart();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Błąd aktualizacji koszyka';
      setError(errorMessage);
      console.error('Błąd aktualizacji koszyka:', err);
    } finally {
      setUpdating(false);
    }
  }, [nonce, refreshCart]);

  // Remove item from cart
  const removeFromCart = useCallback(async (itemKey: string) => {
    setUpdating(true);
    setError(null);
    
    try {
      const headers: Record<string, string> = {};
      
      if (nonce) {
        headers['Nonce'] = nonce;
      }
      
      const response = await fetch(`http://localhost:8080/wp-json/wc/store/cart/items/${itemKey}`, {
        method: 'DELETE',
        credentials: 'include',
        headers,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Refresh cart after removing item
      await refreshCart();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Błąd usuwania z koszyka';
      setError(errorMessage);
      console.error('Błąd usuwania z koszyka:', err);
    } finally {
      setUpdating(false);
    }
  }, [nonce, refreshCart]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initialize cart on mount
  useEffect(() => {
    const initializeCart = async () => {
      await fetchNonce();
      await refreshCart();
    };
    
    initializeCart();
  }, [fetchNonce, refreshCart]);

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