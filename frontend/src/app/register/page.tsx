'use client';
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function RegisterContent() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Pobierz URL do którego chcemy wrócić po rejestracji
    const returnUrl = searchParams.get('return') || '/';
    const redirectUrl = `${window.location.origin}${returnUrl}`;
    
    // Przekierowanie do przyjaznej strony WooCommerce rejestracji (NIE do wp-admin!)
    window.location.href = `http://localhost:8080/moje-konto/?action=register&redirect_to=${encodeURIComponent(redirectUrl)}`;
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Modeo.pl</h1>
            <p className="text-gray-600">Tworzenie nowego konta</p>
          </div>
          
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Przekierowuję do formularza rejestracji...</p>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>📝 Szybka rejestracja przez WordPress</p>
            <p>🛡️ Bezpieczne i sprawdzone rozwiązanie</p>
            <p>💳 Gotowe do zakupów po rejestracji</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}