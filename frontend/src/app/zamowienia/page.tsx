'use client';
import { useEffect } from 'react';

export default function ZamowieniaPage() {
  useEffect(() => {
    // Przekierowanie do WordPress zamówień klienta  
    window.location.href = 'http://localhost:8080/moje-konto/orders/';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Modeo.pl</h1>
            <p className="text-gray-600">Twoje zamówienia</p>
          </div>
          
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Przekierowuję do listy zamówień...</p>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>📦 Historia wszystkich zamówień</p>
            <p>📋 Statusy i szczegóły</p>
            <p>🔄 Opcje zwrotów i reklamacji</p>
          </div>
        </div>
      </div>
    </div>
  );
}