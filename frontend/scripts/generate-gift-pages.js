import fs from 'fs';
import path from 'path';

// Gift occasions data
const giftOccasions = [
  {
    id: 'mikolajki',
    title: 'Mikołajki',
    description: 'Magiczne prezenty dla najmłodszych na Dzień Świętego Mikołaja',
    emoji: '🎅',
    emoji2: '🎁',
    searchTerms: 'mikołaj święty children kids',
    theme: 'from-red-50 via-green-50 to-red-50',
    bgClass: 'bg-red-600',
    hoverClass: 'hover:bg-red-700',
    colorClass: 'text-red-600',
    hoverColorClass: 'hover:text-red-700'
  },
  {
    id: 'nowy-rok-sylwester',
    title: 'Nowy Rok / Sylwester',
    description: 'Wyjątkowe prezenty na powitanie Nowego Roku',
    emoji: '🎆',
    emoji2: '🥳',
    searchTerms: 'new year sylwester nowy rok party',
    theme: 'from-purple-50 via-blue-50 to-purple-50',
    bgClass: 'bg-purple-600',
    hoverClass: 'hover:bg-purple-700',
    colorClass: 'text-purple-600',
    hoverColorClass: 'hover:text-purple-700'
  },
  {
    id: 'dzien-kobiet',
    title: 'Dzień Kobiet',
    description: 'Wyjątkowe prezenty dla Pań w Dniu Kobiet',
    emoji: '🌸',
    emoji2: '💐',
    searchTerms: 'kobieta women lady flowers',
    theme: 'from-pink-50 via-purple-50 to-pink-50',
    bgClass: 'bg-pink-600',
    hoverClass: 'hover:bg-pink-700',
    colorClass: 'text-pink-600',
    hoverColorClass: 'hover:text-pink-700'
  },
  {
    id: 'slub',
    title: 'Ślub',
    description: 'Pamiątkowe prezenty ślubne dla nowożeńców',
    emoji: '💍',
    emoji2: '👰',
    searchTerms: 'wedding ślub marriage couple',
    theme: 'from-rose-50 via-pink-50 to-rose-50',
    bgClass: 'bg-rose-600',
    hoverClass: 'hover:bg-rose-700',
    colorClass: 'text-rose-600',
    hoverColorClass: 'hover:text-rose-700'
  },
  {
    id: 'dla-rodziny',
    title: 'Dla rodziny',
    description: 'Prezenty, które łączą całą rodzinę',
    emoji: '👨‍👩‍👧‍👦',
    emoji2: '🏠',
    searchTerms: 'family rodzina together',
    theme: 'from-green-50 via-blue-50 to-green-50',
    bgClass: 'bg-green-600',
    hoverClass: 'hover:bg-green-700',
    colorClass: 'text-green-600',
    hoverColorClass: 'hover:text-green-700'
  },
  {
    id: 'dzien-mamy',
    title: 'Dzień Mamy',
    description: 'Serdeczne prezenty dla najlepszej Mamy na świecie',
    emoji: '👩‍👧',
    emoji2: '💝',
    searchTerms: 'mama mother mom love',
    theme: 'from-rose-50 via-pink-50 to-rose-50',
    bgClass: 'bg-rose-600',
    hoverClass: 'hover:bg-rose-700',
    colorClass: 'text-rose-600',
    hoverColorClass: 'hover:text-rose-700'
  },
  {
    id: 'dzien-taty',
    title: 'Dzień Taty',
    description: 'Wyjątkowe prezenty dla najlepszego Taty na świecie',
    emoji: '👨‍👧',
    emoji2: '🎁',
    searchTerms: 'tata father dad papa',
    theme: 'from-blue-50 via-indigo-50 to-blue-50',
    bgClass: 'bg-blue-600',
    hoverClass: 'hover:bg-blue-700',
    colorClass: 'text-blue-600',
    hoverColorClass: 'hover:text-blue-700'
  },
  {
    id: 'dzien-dziecka',
    title: 'Dzień Dziecka',
    description: 'Radosne prezenty dla najmłodszych',
    emoji: '👶',
    emoji2: '🧸',
    searchTerms: 'dzieci children kids child',
    theme: 'from-yellow-50 via-orange-50 to-yellow-50',
    bgClass: 'bg-yellow-600',
    hoverClass: 'hover:bg-yellow-700',
    colorClass: 'text-yellow-600',
    hoverColorClass: 'hover:text-yellow-700'
  },
  {
    id: 'dzien-babci',
    title: 'Dzień Babci',
    description: 'Serdeczne prezenty dla kochanej Babci',
    emoji: '👵',
    emoji2: '🌺',
    searchTerms: 'babcia grandma grandmother',
    theme: 'from-purple-50 via-pink-50 to-purple-50',
    bgClass: 'bg-purple-600',
    hoverClass: 'hover:bg-purple-700',
    colorClass: 'text-purple-600',
    hoverColorClass: 'hover:text-purple-700'
  },
  {
    id: 'dzien-dziadka',
    title: 'Dzień Dziadka',
    description: 'Wyjątkowe prezenty dla ukochanego Dziadka',
    emoji: '👴',
    emoji2: '🎁',
    searchTerms: 'dziadek grandpa grandfather',
    theme: 'from-gray-50 via-blue-50 to-gray-50',
    bgClass: 'bg-gray-600',
    hoverClass: 'hover:bg-gray-700',
    colorClass: 'text-gray-600',
    hoverColorClass: 'hover:text-gray-700'
  },
  {
    id: 'dzien-chlopaka',
    title: 'Dzień Chłopaka',
    description: 'Praktyczne i stylowe prezenty dla mężczyzn',
    emoji: '👨',
    emoji2: '🎁',
    searchTerms: 'chłopak boyfriend men masculine',
    theme: 'from-indigo-50 via-blue-50 to-indigo-50',
    bgClass: 'bg-indigo-600',
    hoverClass: 'hover:bg-indigo-700',
    colorClass: 'text-indigo-600',
    hoverColorClass: 'hover:text-indigo-700'
  },
  {
    id: 'urodziny',
    title: 'Urodziny',
    description: 'Personalizowane prezenty urodzinowe na każdy wiek',
    emoji: '🎂',
    emoji2: '🎉',
    searchTerms: 'birthday urodziny cake celebration',
    theme: 'from-yellow-50 via-pink-50 to-yellow-50',
    bgClass: 'bg-yellow-600',
    hoverClass: 'hover:bg-yellow-700',
    colorClass: 'text-yellow-600',
    hoverColorClass: 'hover:text-yellow-700'
  },
  {
    id: 'imieniny',
    title: 'Imieniny',
    description: 'Tradycyjne i nowoczesne prezenty imieninowe',
    emoji: '🎊',
    emoji2: '🌟',
    searchTerms: 'nameday imieniny tradition polish',
    theme: 'from-teal-50 via-green-50 to-teal-50',
    bgClass: 'bg-teal-600',
    hoverClass: 'hover:bg-teal-700',
    colorClass: 'text-teal-600',
    hoverColorClass: 'hover:text-teal-700'
  },
  {
    id: 'rocznice',
    title: 'Rocznice',
    description: 'Pamiątkowe prezenty na ważne rocznice',
    emoji: '💐',
    emoji2: '💑',
    searchTerms: 'anniversary rocznica relationship love',
    theme: 'from-rose-50 via-red-50 to-rose-50',
    bgClass: 'bg-rose-600',
    hoverClass: 'hover:bg-rose-700',
    colorClass: 'text-rose-600',
    hoverColorClass: 'hover:text-rose-700'
  },
  {
    id: 'parapetowka',
    title: 'Parapetówka',
    description: 'Praktyczne prezenty na nowe mieszkanie',
    emoji: '🏡',
    emoji2: '🔑',
    searchTerms: 'housewarming new home apartment',
    theme: 'from-green-50 via-teal-50 to-green-50',
    bgClass: 'bg-green-600',
    hoverClass: 'hover:bg-green-700',
    colorClass: 'text-green-600',
    hoverColorClass: 'hover:text-green-700'
  },
  {
    id: 'dzien-nauczyciela',
    title: 'Dzień Nauczyciela',
    description: 'Podziękowania dla nauczycieli za ich pracę',
    emoji: '👩‍🏫',
    emoji2: '📚',
    searchTerms: 'teacher nauczyciel education school',
    theme: 'from-blue-50 via-indigo-50 to-blue-50',
    bgClass: 'bg-blue-600',
    hoverClass: 'hover:bg-blue-700',
    colorClass: 'text-blue-600',
    hoverColorClass: 'hover:text-blue-700'
  },
  {
    id: 'zwierzaki',
    title: 'Zwierzaki',
    description: 'Akcesoria dla miłośników zwierząt',
    emoji: '🐕',
    emoji2: '🐱',
    searchTerms: 'pets animals dog cat lover',
    theme: 'from-amber-50 via-orange-50 to-amber-50',
    bgClass: 'bg-amber-600',
    hoverClass: 'hover:bg-amber-700',
    colorClass: 'text-amber-600',
    hoverColorClass: 'hover:text-amber-700'
  }
];

// Template for gift occasion page
function generatePageTemplate(occasion) {
  return `import { Metadata } from 'next';
import Link from 'next/link';
import GiftOccasionProducts from '@/features/gift-occasions/components/GiftOccasionProducts';

export const metadata: Metadata = {
  title: '${occasion.title} - Personalizowane Prezenty | Modeo',
  description: '${occasion.description}. Personalizowane koszulki, bluzy i akcesoria z indywidualnym nadrukiem.',
  keywords: ['${occasion.title.toLowerCase()}', 'prezent personalizowany', 'koszulka na prezent', 'bluza na prezent', 'nadruk'],
  openGraph: {
    title: '${occasion.title} - Personalizowane Prezenty | Modeo',
    description: '${occasion.description}',
    type: 'website',
  },
};

export default function ${occasion.title.replace(/[^a-zA-Z0-9]/g, '')}GiftPage() {
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
            <li className="text-gray-900 font-medium">${occasion.title}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br ${occasion.theme} py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <span className="text-6xl mr-4">${occasion.emoji}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Prezenty na <span className="${occasion.colorClass}">${occasion.title}</span>
              </h1>
              <span className="text-6xl ml-4">${occasion.emoji2}</span>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              ${occasion.description}. Wybierz spośród naszej kolekcji produktów i stwórz wyjątkowy, spersonalizowany prezent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sklep"
                className="inline-flex items-center px-8 py-3 ${occasion.bgClass} text-white font-semibold rounded-lg ${occasion.hoverClass} transition-colors duration-200"
              >
                Przeglądaj wszystkie produkty
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="#products"
                className="inline-flex items-center px-8 py-3 border-2 border-current ${occasion.colorClass} font-semibold rounded-lg hover:bg-current hover:text-white transition-colors duration-200"
              >
                Zobacz prezenty na ${occasion.title.toLowerCase()}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <div id="products">
        <GiftOccasionProducts
          occasionId="${occasion.id}"
          occasionTitle="${occasion.title}"
          filters={{ featured: true, search: '${occasion.searchTerms}' }}
        />
      </div>

      {/* CTA Section */}
      <section className="py-12 ${occasion.bgClass} text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Potrzebujesz pomocy w wyborze prezentu?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Skontaktuj się z nami - pomożemy Ci stworzyć idealny prezent na ${occasion.title.toLowerCase()}
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center px-8 py-3 bg-white ${occasion.colorClass} font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
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
            className="inline-flex items-center ${occasion.colorClass} ${occasion.hoverColorClass} font-medium"
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
}`;
}

// Generate pages
const appDir = path.join(__dirname, '..', 'src', 'app', 'na-prezent');

giftOccasions.forEach(occasion => {
  const dirPath = path.join(appDir, occasion.id);
  const filePath = path.join(dirPath, 'page.tsx');

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Generate and write page
  const pageContent = generatePageTemplate(occasion);
  fs.writeFileSync(filePath, pageContent, 'utf8');
  
  console.log(`✅ Generated: ${occasion.id}/page.tsx`);
});

console.log(`\n🎉 Successfully generated ${giftOccasions.length} gift occasion pages!`);
console.log('\n📋 Generated pages:');
giftOccasions.forEach(occasion => {
  console.log(`   - /na-prezent/${occasion.id} (${occasion.title})`);
});