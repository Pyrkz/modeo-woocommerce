import { Metadata } from 'next';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';

export const metadata: Metadata = {
  title: 'Znakowanie Koszulek - Modeo.pl | Nadruki na koszulkach',
  description: 'Profesjonalne znakowanie koszulek wszystkimi technikami. Nadruki na koszulkach - sitodruk, DTF, haft, flex. Wysokiej jakości personalizacja koszulek. ✓ Wszystkie techniki ✓ Szybka realizacja ✓ Atrakcyjne ceny',
  keywords: 'znakowanie koszulek, nadruki na koszulkach, personalizacja koszulek, koszulki z nadrukiem, koszulki z logo, druk na koszulkach',
  openGraph: {
    title: 'Znakowanie Koszulek - Modeo.pl',
    description: 'Profesjonalne znakowanie koszulek wszystkimi technikami',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: '/icons/Znakowanie koszulki.svg',
        width: 1200,
        height: 630,
        alt: 'Znakowanie koszulek Modeo',
      },
    ],
  },
  alternates: {
    canonical: '/znakowanie/koszulki'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ZnakowanieKoszulekPage() {
  // Get team member for t-shirt marking services
  const tshirtExpert = getTeamMemberByName('Anna Pawlak'); // Specjalista ds. Produkcji - idealna do koszulek
  
  if (!tshirtExpert) {
    throw new Error('T-shirt expert not found');
  }

  return (
    <main className="min-h-screen">
      {/* Complete Contact Section with Header, Team Member and Form */}
      <CompleteContactSection
        teamMember={tshirtExpert}
        tagline="Chcesz oznaczyć koszulki?"
        title="Skontaktuj się z ekspertem koszulek"
        description="Wypełnij formularz, a nasz specjalista ds. produkcji i znakowania koszulek skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci wybrać najlepszą technikę znakowania i dopasować ją do Twoich potrzeb."
        backgroundColor="gray"
      />
    </main>
  );
}