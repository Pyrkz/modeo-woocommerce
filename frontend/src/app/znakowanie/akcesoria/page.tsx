import { Metadata } from 'next';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';

export const metadata: Metadata = {
  title: 'Znakowanie Akcesoriów - Modeo.pl | Personalizacja akcesoriów i gadżetów',
  description: 'Profesjonalne znakowanie akcesoriów reklamowych i gadżetów firmowych. Grawer, sitodruk, haft na kubkach, długopisach, brelokach i innych akcesoriach. ✓ Wszystkie akcesoria ✓ Różne techniki ✓ Wysoka jakość',
  keywords: 'znakowanie akcesoriów, gadżety reklamowe, akcesoria firmowe, kubki z logo, długopisy z nadrukiem, breloki firmowe, grawer na akcesoriach',
  openGraph: {
    title: 'Znakowanie Akcesoriów - Modeo.pl',
    description: 'Profesjonalne znakowanie akcesoriów reklamowych i gadżetów',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: '/icons/Znakowanie Akcesoria.svg',
        width: 1200,
        height: 630,
        alt: 'Znakowanie akcesoriów Modeo',
      },
    ],
  },
  alternates: {
    canonical: '/znakowanie/akcesoria'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ZnakowanieAkcesoriowPage() {
  // Get team member for accessories marking services
  const accessoriesExpert = getTeamMemberByName('Anna Pawlak'); // Specjalista ds. Produkcji - idealna do akcesoriów
  
  if (!accessoriesExpert) {
    throw new Error('Accessories expert not found');
  }

  return (
    <main className="min-h-screen">
      {/* Complete Contact Section with Header, Team Member and Form */}
      <CompleteContactSection
        teamMember={accessoriesExpert}
        tagline="Potrzebujesz oznaczyć akcesoria?"
        title="Skontaktuj się z ekspertem akcesoriów"
        description="Wypełnij formularz, a nasz specjalista ds. produkcji i znakowania akcesoriów skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci wybrać najlepszą technikę znakowania dla różnego typu akcesoriów i gadżetów promocyjnych."
        backgroundColor="gray"
      />
    </main>
  );
}