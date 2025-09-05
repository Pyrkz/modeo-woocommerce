// Portfolio page - Modeo.pl realizacje znakowania odziezy
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ZnakowanieGallery } from '@/features/znakowanie';

export const metadata: Metadata = {
  title: 'Portfolio - Nasze Realizacje Znakowania | Modeo.pl',
  description: 'Zobacz najlepsze realizacje znakowania odziezy od Modeo. Haft, sitodruk, termotransfer - profesjonalne projekty dla firm, klubow sportowych i szkol.',
  keywords: 'portfolio, realizacje, znakowanie odziezy, haft, sitodruk, termotransfer, projekty, Modeo',
  openGraph: {
    title: 'Portfolio - Nasze Realizacje Znakowania | Modeo.pl',
    description: 'Zobacz najlepsze realizacje znakowania odziezy od Modeo',
    type: 'website',
    locale: 'pl_PL',
    siteName: 'Modeo.pl'
  }
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-blue-500/5 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
            Nasze Portfolio
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Odkryj najlepsze realizacje znakowania odziezy od Modeo.pl. 
            Od eleganckich haftow po dynamiczne sitodruky - kazdy projekt to dowod 
            naszej pasji i profesjonalizmu.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <ZnakowanieGallery />


      {/* Techniques Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Techniki znakowania
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Oferujemy pelen zakres technik znakowania dostosowanych do Twoich potrzeb
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Link 
              href="/znakowanie/haft" 
              className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src="/znakowanie/haft-min.png"
                  alt="Haft - znakowanie odziezy"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">Haft</h3>
                <p className="text-gray-600 mb-4">Elegancki haft komputerowy - trwaly i reprezentacyjny sposob znakowania odziezy firmowej</p>
                <div className="inline-flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                  Dowiedz sie wiecej 
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link 
              href="/znakowanie/sitodruk" 
              className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src="/znakowanie/sitodruk-min.png"
                  alt="Sitodruk - znakowanie odziezy"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">Sitodruk</h3>
                <p className="text-gray-600 mb-4">Profesjonalny sitodruk dla duzych nakladow - zywe kolory i doskonala trwalosc</p>
                <div className="inline-flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                  Dowiedz sie wiecej 
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link 
              href="/znakowanie/dtf" 
              className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src="/znakowanie/dtf-min.png"
                  alt="DTF - znakowanie odziezy"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">DTF</h3>
                <p className="text-gray-600 mb-4">Nowoczesna technika druku cyfrowego - idealna dla kolorowych i szczegolowych projektow</p>
                <div className="inline-flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                  Dowiedz sie wiecej 
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link 
              href="/znakowanie/sublimacja" 
              className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src="/znakowanie/sublimacja-min.png"
                  alt="Sublimacja - znakowanie odziezy"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">Sublimacja</h3>
                <p className="text-gray-600 mb-4">Druk sublimacyjny dla jasnych materialow - zywe kolory i trwale wzory</p>
                <div className="inline-flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                  Dowiedz sie wiecej 
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link 
              href="/znakowanie/flex" 
              className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src="/znakowanie/flex-min.png"
                  alt="Flex - znakowanie odziezy"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">Flex</h3>
                <p className="text-gray-600 mb-4">Folie elastyczne - idealne do naprasowania liter i prostych ksztaltow</p>
                <div className="inline-flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                  Dowiedz sie wiecej 
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link 
              href="/znakowanie/flock" 
              className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src="/znakowanie/flock-min.png"
                  alt="Flock - znakowanie odziezy"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">Flock</h3>
                <p className="text-gray-600 mb-4">Folia flokowana z aksamitna struktura - elegancki efekt matowy</p>
                <div className="inline-flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                  Dowiedz sie wiecej 
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            Gotowy na wlasny projekt?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Skontaktuj sie z nami i stworzmy razem wyjatkowy projekt znakowania dla Twojej firmy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/kontakt" 
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center"
            >
              Skontaktuj sie z nami
            </Link>
            <Link 
              href="/sklep" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors inline-flex items-center"
            >
              Sprawdz nasz sklep
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}