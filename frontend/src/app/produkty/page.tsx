'use client';
import { useEffect } from 'react';

export default function ProduktyPage() {
  useEffect(() => {
    // Przekierowanie do test-wp (temporary) lub przyszłej strony produktów
    window.location.href = '/test-wp';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Przekierowuję do produktów...</p>
      </div>
    </div>
  );
}