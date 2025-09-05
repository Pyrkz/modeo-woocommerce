import type { Metadata } from 'next';
import { CorporateWearHero, corporateWearHeroData } from '@/features/corporate-wear';
import { ProductCategoriesSection } from '@/features/product-categories';
import { WhyChooseUsSection } from '@/features/why-choose-us';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';
import { BackgroundCTA } from '@/components/ui';

// Enable static generation for better performance
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: 'Odzież firmowa - Modeo.pl | Profesjonalna odzież dla zespołu',
  description: 'Podkreśl wizerunek swojej marki z profesjonalną odzieżą firmową. Oferujemy odzież reklamową, roboczą i eventową z możliwością personalizacji. ✓ Szybka dostawa ✓ Obsługa B2B',
  keywords: 'odzież firmowa, odzież reklamowa, t-shirty firmowe, bluzy z logo, personalizacja odzieży, odzież robocza, uniformy',
  openGraph: {
    title: 'Odzież firmowa - Modeo.pl',
    description: 'Profesjonalna odzież firmowa dla Twojego zespołu',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: '/resources/corporate-team.jpg',
        width: 1200,
        height: 630,
        alt: 'Zespół w firmowej odzieży Modeo',
      },
    ],
  },
  alternates: {
    canonical: '/dla-firm/odziez-firmowa'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function OdziezFirmowa() {
  // Get team member for corporate wear inquiries
  const corporateExpert = getTeamMemberByName('Anna Pawlak'); // Specjalista ds. Produkcji
  
  if (!corporateExpert) {
    throw new Error('Corporate expert not found');
  }

  return (
    <>
      <CorporateWearHero data={corporateWearHeroData} />
      
      {/* Product Categories Section */}
      <ProductCategoriesSection />
      
      {/* Why Choose Us Section */}
      <WhyChooseUsSection />
      <BackgroundCTA
        title="Masz większe zamówienie lub specyficzne wymagania?"
        variant='light'
      />
      
      {/* Complete Contact Section with Header, Team Member and Form */}
      <CompleteContactSection
        teamMember={corporateExpert}
        tagline="Potrzebujesz odzieży firmowej?"
        title="Skontaktuj się z naszym zespołem"
        description="Wypełnij formularz, a nasz specjalista ds. odzieży firmowej skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci wybrać najlepsze rozwiązania dla Twojej firmy."
        backgroundColor="gray"
      />
    </>
  );
}