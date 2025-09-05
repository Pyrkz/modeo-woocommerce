'use client';
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function LoginContent() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Pobierz URL do którego chcemy wrócić po zalogowaniu
    const returnUrl = searchParams.get('return') || '/';
    const redirectUrl = `${window.location.origin}${returnUrl}`;
    
    // Przekierowanie do przyjaznej strony WooCommerce My Account (NIE do wp-admin!)
    window.location.href = `http://localhost:8080/moje-konto/?redirect_to=${encodeURIComponent(redirectUrl)}`;
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Modeo.pl</h1>
            <p className="text-gray-600">Logowanie do konta</p>
          </div>
          
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Przekierowuję do bezpiecznego logowania...</p>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>🔐 Bezpieczne logowanie przez WordPress</p>
            <p>🛡️ Bez dostępu do panelu administratora</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}