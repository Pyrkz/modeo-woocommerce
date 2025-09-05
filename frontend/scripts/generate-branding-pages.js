import fs from 'fs';
import path from 'path';

// Branding industries data
const industries = [
  {
    id: 'firmy',
    title: 'Firmy',
    description: 'Profesjonalne znakowanie dla przedsiębiorstw',
    detailedDescription: 'Kompleksowe rozwiązania brandingowe dla firm każdej wielkości. Od wizytówek po oznakowanie siedziby.',
    category: 'business',
    keywords: ['firma', 'biznes', 'korporacja', 'przedsiębiorstwo', 'office', 'biuro']
  },
  {
    id: 'szkoly',
    title: 'Szkoły',
    description: 'Znakowanie dla placówek edukacyjnych',
    detailedDescription: 'Specjalne rozwiązania dla szkół, przedszkoli i uczelni. Odzież szkolna i akcesoria edukacyjne.',
    category: 'education',
    keywords: ['szkoła', 'edukacja', 'uczniowie', 'nauczyciele', 'przedszkole', 'uczelnia']
  },
  {
    id: 'kluby-sportowe',
    title: 'Kluby sportowe',
    description: 'Profesjonalna odzież sportowa z logo',
    detailedDescription: 'Wysokiej jakości stroje sportowe i akcesoria dla klubów, drużyn i organizacji sportowych.',
    category: 'sports',
    keywords: ['sport', 'drużyna', 'klub', 'piłka', 'fitness', 'trening', 'zawody']
  },
  {
    id: 'restauracje',
    title: 'Restauracje',
    description: 'Znakowanie dla branży gastronomicznej',
    detailedDescription: 'Profesjonalna odzież dla restauracji, kawiarni, barów i cateringów. Funkcjonalność i styl.',
    category: 'food',
    keywords: ['restauracja', 'kuchnia', 'szef kuchni', 'kelner', 'gastronomia', 'catering']
  },
  {
    id: 'eventy',
    title: 'Eventy',
    description: 'Gadżety promocyjne na wydarzenia',
    detailedDescription: 'Materiały promocyjne i gadżety na konferencje, targi, festiwale i wydarzenia specjalne.',
    category: 'events',
    keywords: ['event', 'konferencja', 'targi', 'festiwal', 'promocja', 'marketing']
  }
];

// Template for individual industry pages
const pageTemplate = (industry) => `import { Metadata } from 'next';
import { BrandingIndustryProducts } from '@/features/branding-industries/components/BrandingIndustryProducts';
import { SectionBadge } from '@/components/ui/SectionBadge';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '${industry.title} - Znakowanie dla branży | Modeo',
  description: '${industry.description}. ${industry.detailedDescription}',
  keywords: '${industry.keywords.join(', ')}, znakowanie, hafiarstwo, sitodruk, modeo',
  openGraph: {
    title: '${industry.title} - Znakowanie dla branży | Modeo',
    description: '${industry.description}. ${industry.detailedDescription}',
    type: 'website',
  }
};

export default function ${industry.title.replace(/[^a-zA-Z]/g, '')}BrandingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <SectionBadge className="mb-6">
              Znakowanie dla branży
            </SectionBadge>
            
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary p-4 shadow-lg">
                <Image
                  src="/icons/branding-${industry.id}.svg"
                  alt="${industry.title} icon"
                  width={48}
                  height={48}
                  className="w-full h-full"
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Znakowanie dla
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary ml-3">
                ${industry.title}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              ${industry.detailedDescription}
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

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nasze usługi dla branży: ${industry.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Oferujemy kompleksowe rozwiązania brandingowe dostosowane do specyfiki Twojej branży
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5H9a2 2 0 00-2 2v12a4 4 0 004 4h8a2 2 0 002-2V7a2 2 0 00-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hafiarstwo</h3>
              <p className="text-gray-600">Wysokiej jakości hafty na odzieży i akcesoriach</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 7v8a1 1 0 001 1h8a1 1 0 001-1v-8M7 11h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sitodruk</h3>
              <p className="text-gray-600">Trwałe nadruki w żywych kolorach</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Grawer</h3>
              <p className="text-gray-600">Precyzyjne grawerowanie na różnych materiałach</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sublimacja</h3>
              <p className="text-gray-600">Pełnokolorowe nadruki fotorealistyczne</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl">
              <div className="w-12 h-12 bg-red-500 text-white rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transfer</h3>
              <p className="text-gray-600">Elastyczne folie transferowe</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl">
              <div className="w-12 h-12 bg-indigo-500 text-white rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalizacja</h3>
              <p className="text-gray-600">Indywidualne oznaczenia i personalizacje</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BrandingIndustryProducts
            industryId="${industry.id}"
            industryTitle="${industry.title}"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Gotowy na profesjonalne znakowanie?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Skontaktuj się z nami i otrzymaj bezpłatną wycenę dostosowaną do Twojej branży
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/kontakt"
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Zamów wycenę
            </a>
            <a
              href="tel:+48123456789"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              Zadzwoń teraz
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}`;

// Create directory if it doesn't exist
const baseDir = path.join(__dirname, '..', 'src', 'app', 'znakowanie', 'dla-branz');

// Ensure the directory exists
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
  console.log('Created directory:', baseDir);
}

// Generate pages for each industry
industries.forEach(industry => {
  const industryDir = path.join(baseDir, industry.id);
  
  // Create directory for each industry
  if (!fs.existsSync(industryDir)) {
    fs.mkdirSync(industryDir, { recursive: true });
  }
  
  // Create page.tsx file
  const pageContent = pageTemplate(industry);
  const pagePath = path.join(industryDir, 'page.tsx');
  
  fs.writeFileSync(pagePath, pageContent);
  console.log(`Created page: ${pagePath}`);
});

console.log('\\n✅ Successfully generated all branding industry pages!');
console.log(`Generated ${industries.length} pages in: ${baseDir}`);

// List all created files
console.log('\\nCreated files:');
industries.forEach(industry => {
  console.log(`- /znakowanie/dla-branz/${industry.id}/page.tsx`);
});