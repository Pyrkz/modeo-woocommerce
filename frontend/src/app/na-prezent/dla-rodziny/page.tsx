import { Metadata } from 'next';
import Link from 'next/link';
import GiftOccasionProducts from '@/features/gift-occasions/components/GiftOccasionProducts';

export const metadata: Metadata = {
  title: 'Dla rodziny - Personalizowane Prezenty | Modeo',
  description: 'Prezenty, które łączą całą rodzinę. Personalizowane koszulki, bluzy i akcesoria z indywidualnym nadrukiem.',
  keywords: ['dla rodziny', 'prezent personalizowany', 'koszulka na prezent', 'bluza na prezent', 'nadruk'],
  openGraph: {
    title: 'Dla rodziny - Personalizowane Prezenty | Modeo',
    description: 'Prezenty, które łączą całą rodzinę',
    type: 'website',
  },
};

export default function DlarodzinyGiftPage() {
  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Strona główna
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/na-prezent" className="text-gray-500 hover:text-gray-700">
                Na prezent
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">Dla rodziny</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-blue-50 to-green-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <span className="text-6xl mr-4">👨‍👩‍👧‍👦</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Prezenty na <span className="text-green-600">Dla rodziny</span>
              </h1>
              <span className="text-6xl ml-4">🏠</span>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Prezenty, które łączą całą rodzinę. Wybierz spośród naszej kolekcji produktów i stwórz wyjątkowy, spersonalizowany prezent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sklep"
                className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Przeglądaj wszystkie produkty
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="#products"
                className="inline-flex items-center px-8 py-3 border-2 border-current text-green-600 font-semibold rounded-lg hover:bg-current hover:text-white transition-colors duration-200"
              >
                Zobacz prezenty na dla rodziny
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <div id="products">
        <GiftOccasionProducts
          occasionId="dla-rodziny"
          occasionTitle="Dla rodziny"
          filters={{ featured: true, search: 'family rodzina together' }}
        />
      </div>

      {/* CTA Section */}
      <section className="py-12 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Potrzebujesz pomocy w wyborze prezentu?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Skontaktuj się z nami - pomożemy Ci stworzyć idealny prezent na dla rodziny
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Skontaktuj się z nami
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.697-.413l-4.194 1.398A1 1 0 015 20l1.398-4.194A8.955 8.955 0 013 13c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Back to Occasions */}
      <section className="py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/na-prezent"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Wróć do wszystkich okazji
          </Link>
        </div>
      </section>
    </main>
  );
}