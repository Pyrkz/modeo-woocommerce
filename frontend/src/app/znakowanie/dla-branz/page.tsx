import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SectionBadge from '@/components/ui/SectionBadge';
import { brandingIndustriesData } from '@/features/branding-industries/data/brandingIndustriesData';

export const metadata: Metadata = {
  title: 'Znakowanie dla branż - Profesjonalne rozwiązania | Modeo',
  description: 'Profesjonalne znakowanie dostosowane do specyfiki różnych branż - firmy, szkoły, kluby sportowe, restauracje, eventy. Hafiarstwo, sitodruk, grawer.',
  keywords: 'znakowanie dla branż, hafiarstwo, sitodruk, firmy, szkoły, sport, restauracje, eventy, modeo',
  openGraph: {
    title: 'Znakowanie dla branż - Profesjonalne rozwiązania | Modeo',
    description: 'Profesjonalne znakowanie dostosowane do specyfiki różnych branż - firmy, szkoły, kluby sportowe, restauracje, eventy.',
    type: 'website',
  }
};

export default function BrandingIndustriesPage() {
  const categoryColors = {
    business: 'from-blue-50 to-blue-100 border-blue-200',
    education: 'from-green-50 to-green-100 border-green-200',
    sports: 'from-orange-50 to-orange-100 border-orange-200',
    food: 'from-purple-50 to-purple-100 border-purple-200',
    events: 'from-red-50 to-red-100 border-red-200'
  };

  const categoryIcons = {
    business: 'text-blue-500',
    education: 'text-green-500',
    sports: 'text-orange-500',
    food: 'text-purple-500',
    events: 'text-red-500'
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <SectionBadge className="mb-6">
              Znakowanie profesjonalne
            </SectionBadge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Znakowanie dla
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary ml-3">
                każdej branży
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Oferujemy specjalistyczne rozwiązania brandingowe dostosowane do unikalnych potrzeb 
              różnych branż i sektorów biznesowych
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl">
                Zamów wycenę
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                Zobacz portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Wybierz swoją branżę
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Każda branża ma swoje unikalne wymagania. Poznaj nasze specjalistyczne rozwiązania
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandingIndustriesData.map((industry) => (
              <Link
                key={industry.id}
                href={industry.href}
                className="group block"
              >
                <div className={`bg-gradient-to-br ${categoryColors[industry.category]} border-2 rounded-2xl p-8 h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-white shadow-md p-3 ${categoryIcons[industry.category]} group-hover:scale-110 transition-transform`}>
                      <Image
                        src={industry.iconPath}
                        alt={`${industry.title} icon`}
                        width={40}
                        height={40}
                        className="w-full h-full"
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {industry.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {industry.description}
                    </p>

                    {industry.products && (
                      <div className="mb-6">
                        <p className="text-sm font-medium text-gray-500 mb-2">Popularne produkty:</p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {industry.products.slice(0, 3).map((product) => (
                            <span
                              key={product}
                              className="px-3 py-1 bg-white/70 text-xs rounded-full text-gray-600"
                            >
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="inline-flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                      Zobacz więcej
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nasze usługi znakowania
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Wykorzystujemy najnowocześniejsze technologie do stworzenia idealnego znakowania dla Twojej branży
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5H9a2 2 0 00-2 2v12a4 4 0 004 4h8a2 2 0 002-2V7a2 2 0 00-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hafiarstwo</h3>
              <p className="text-gray-600">Eleganckie hafty o najwyższej jakości na różnorodnych materiałach</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 7v8a1 1 0 001 1h8a1 1 0 001-1v-8M7 11h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sitodruk</h3>
              <p className="text-gray-600">Trwałe nadruki w żywych kolorach idealne dla większych nakładów</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">DTF i Sublimacja</h3>
              <p className="text-gray-600">Nowoczesne technologie dla pełnokolorowych, fotorealistycznych nadruków</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Grawer</h3>
              <p className="text-gray-600">Precyzyjne grawerowanie na metalu, drewnie i innych materiałach</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transfer i Folie</h3>
              <p className="text-gray-600">Elastyczne folie transferowe Flex i Flock w różnorodnych kolorach</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalizacja</h3>
              <p className="text-gray-600">Indywidualne oznakowania, numerowanie i personalne nadruki</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Potrzebujesz pomocy w wyborze?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Nasi eksperci pomogą Ci wybrać najlepsze rozwiązanie dla Twojej branży
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/kontakt"
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Skontaktuj się z ekspertem
            </a>
            <a
              href="tel:+48123456789"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              Zadzwoń: +48 123 456 789
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}