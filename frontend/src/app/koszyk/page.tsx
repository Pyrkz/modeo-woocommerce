'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { config } from '@/lib/config';
import { makeAuthenticatedRequest } from '@/utils/nonce';

interface CartItem {
  key: string;
  id: number;
  name: string;
  quantity: number;
  prices: {
    price: string;
    currency_symbol: string;
  };
  totals: {
    line_total: string;
    currency_symbol: string;
  };
  images?: Array<{src: string}>;
}

interface CartTotals {
  total_price: string;
  total_items: string;
  currency_symbol: string;
}

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [totals, setTotals] = useState<CartTotals>({
    total_price: '0',
    total_items: '0',
    currency_symbol: 'zł'
  });

  const fetchCart = async () => {
    try {
      const response = await makeAuthenticatedRequest(`${config.getApiUrl()}/wp-json/wc/store/cart`);
      const data = await response.json();
      console.log('Cart data:', data);
      setItems(data.items || []);
      setTotals(data.totals || {
        total_price: '0',
        total_items: '0',
        currency_symbol: 'zł'
      });
      setLoading(false);
    } catch (error) {
      console.error('Błąd pobierania koszyka:', error);
      setLoading(false);
    }
  };

  const updateQuantity = async (itemKey: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setUpdating(true);
    try {
      const response = await makeAuthenticatedRequest(`${config.getApiUrl()}/wp-json/wc/store/cart/update-item`, {
        method: 'POST',
        body: JSON.stringify({
          key: itemKey,
          quantity: newQuantity,
        }),
      });
      
      if (response.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error('Błąd aktualizacji koszyka:', error);
    } finally {
      setUpdating(false);
    }
  };

  const removeFromCart = async (itemKey: string) => {
    setUpdating(true);
    try {
      const response = await makeAuthenticatedRequest(`${config.getApiUrl()}/wp-json/wc/store/cart/remove-item`, {
        method: 'POST',
        body: JSON.stringify({
          key: itemKey,
        }),
      });
      
      if (response.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error('Błąd usuwania z koszyka:', error);
    } finally {
      setUpdating(false);
    }
  };

  const goToCheckout = () => {
    // Przekierowanie do WordPress checkout (polska wersja)
    window.location.href = config.getCheckoutUrl();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* Page Header */}
      <section className="bg-gradient-to-r from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Twój <span className="text-primary">Koszyk</span>
            </h1>
            <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
              {items.length > 0 
                ? `Masz ${items.length} ${items.length === 1 ? 'produkt' : items.length < 5 ? 'produkty' : 'produktów'} w koszyku`
                : 'Twój koszyk jest pusty'}
            </p>
            <nav className="text-sm text-gray-700">
              <Link href="/" className="hover:text-primary">Strona główna</Link>
              <span className="mx-2">→</span>
              <span className="text-primary">Koszyk</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-700">Ładowanie koszyka...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Koszyk jest pusty</h3>
                <p className="text-gray-700 mb-6">Dodaj produkty do koszyka, aby kontynuować zakupy.</p>
                <Link 
                  href="/sklep"
                  className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
                >
                  Przejdź do sklepu
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Produkty w koszyku ({items.length})
                    </h2>
                  </div>
                  
                  <div className="divide-y">
                    {items.map((item) => (
                      <div key={item.key} className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                              {item.images?.[0] ? (
                                <Image 
                                  src={item.images[0].src} 
                                  alt={item.name}
                                  width={80}
                                  height={80}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                              ) : (
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                                </svg>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-medium text-gray-900 truncate">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Cena jednostkowa: {(parseInt(item.prices.price) / 100).toFixed(2)} {item.prices.currency_symbol}
                            </p>
                            
                            <div className="flex items-center mt-3 space-x-3">
                              <label className="text-sm text-gray-700">Ilość:</label>
                              <div className="flex items-center border rounded-lg">
                                <button 
                                  onClick={() => updateQuantity(item.key, item.quantity - 1)}
                                  disabled={updating || item.quantity <= 1}
                                  className="px-3 py-1 text-gray-700 hover:text-gray-900 disabled:opacity-50"
                                >
                                  −
                                </button>
                                <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => updateQuantity(item.key, item.quantity + 1)}
                                  disabled={updating}
                                  className="px-3 py-1 text-gray-700 hover:text-gray-900 disabled:opacity-50"
                                >
                                  +
                                </button>
                              </div>
                              <button 
                                onClick={() => removeFromCart(item.key)}
                                disabled={updating}
                                className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
                              >
                                Usuń
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex-shrink-0 text-right">
                            <p className="text-lg font-semibold text-gray-900">
                              {(parseInt(item.totals.line_total) / 100).toFixed(2)} {item.totals.currency_symbol}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border sticky top-4">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Podsumowanie zamówienia</h3>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Produkty ({totals.total_items})</span>
                      <span className="text-gray-900">
                        {(parseInt(totals.total_price) / 100).toFixed(2)} {totals.currency_symbol}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Dostawa</span>
                      <span className="text-gray-700">Obliczane przy płatności</span>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span className="text-gray-900">Razem</span>
                        <span className="text-primary">
                          {(parseInt(totals.total_price) / 100).toFixed(2)} {totals.currency_symbol}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-4">
                      <button 
                        onClick={goToCheckout}
                        disabled={updating}
                        className="w-full bg-primary hover:bg-primary-hover text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {updating ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Aktualizowanie...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M8 11v6h8v-6M8 11H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2" />
                            </svg>
                            Przejdź do płatności
                          </>
                        )}
                      </button>
                      
                      <Link 
                        href="/sklep"
                        className="w-full border border-primary text-primary hover:bg-primary hover:text-white py-3 px-4 rounded-lg font-medium transition-colors text-center inline-block"
                      >
                        Kontynuuj zakupy
                      </Link>
                    </div>
                    
                    <div className="text-xs text-gray-600 pt-4 border-t">
                      <p>✓ Bezpieczna płatność przez Autopay</p>
                      <p>✓ Dostawa przez Furgonetka</p>
                      <p>✓ Możliwość płatności BLIK</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}