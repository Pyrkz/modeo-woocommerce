'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  prices: {
    price: string;
    currency_symbol: string;
  };
  images: Array<{src: string}>;
}

export default function TestWP() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [nonce, setNonce] = useState('');

  const fetchNonce = async () => {
    try {
      const response = await fetch('http://localhost:8080/wp-json/wc/store/cart', {
        credentials: 'include',
      });
      const nonceHeader = response.headers.get('Nonce');
      if (nonceHeader) {
        setNonce(nonceHeader);
      }
    } catch (error) {
      console.error('Błąd pobierania nonce:', error);
    }
  };

  const addToCart = async (productId: number) => {
    try {
      console.log('Próba dodania produktu do koszyka:', productId);
      
      // Najpierw pobierz nonce jeśli go nie ma
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
        body: JSON.stringify({
          id: productId,
          quantity: 1,
        }),
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Sukces:', result);
        alert('Produkt dodany do koszyka!');
      } else {
        const errorText = await response.text();
        console.error('Błąd response:', response.status, errorText);
        alert(`Błąd dodawania do koszyka: ${response.status}`);
      }
    } catch (error) {
      console.error('Błąd fetch:', error);
      alert('Błąd połączenia z serwerem');
    }
  };

  useEffect(() => {
    // Pobierz produkty i nonce jednocześnie
    const fetchData = async () => {
      try {
        // Pobierz nonce najpierw
        await fetchNonce();
        
        // Potem pobierz produkty
        const res = await fetch('http://localhost:8080/wp-json/wc/store/products', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('API response:', data);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Błąd połączenia z WordPress:', err);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) return <div>Ładowanie produktów...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sklep Modeo</h1>
        <a 
          href="/koszyk" 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Koszyk 🛒
        </a>
      </div>
      
      {products.length === 0 ? (
        <p>Brak produktów. Dodaj produkty w WordPress Admin.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="border p-4 rounded">
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-lg text-green-600 font-semibold mb-3">
                {(parseInt(product.prices.price) / 100).toFixed(2)} {product.prices.currency_symbol}
              </p>
              {product.images?.[0] && (
                <Image 
                  src={product.images[0].src} 
                  alt={product.name} 
                  width={300}
                  height={192}
                  className="w-full h-48 object-cover mb-3" 
                />
              )}
              <button 
                onClick={() => addToCart(product.id)}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Dodaj do koszyka
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}