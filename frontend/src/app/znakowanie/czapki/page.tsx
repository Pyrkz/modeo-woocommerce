import { Metadata } from 'next';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';

export const metadata: Metadata = {
  title: 'Znakowanie Czapek - Modeo.pl | Nadruki i hafty na czapkach',
  description: 'Profesjonalne znakowanie czapek wszystkimi technikami. Haft 3D, sitodruk, naszywki na czapkach z daszkiem, bejsbolówkach i czapkach firmowych. ✓ Haft 3D ✓ Precyzyjne wykonanie ✓ Trwałe znakowanie',
  keywords: 'znakowanie czapek, haft na czapkach, czapki z logo, bejsbolówki firmowe, czapki z daszkiem, naszywki na czapkach, haft 3D na czapkach',
  openGraph: {
    title: 'Znakowanie Czapek - Modeo.pl',
    description: 'Profesjonalne znakowanie czapek wszystkimi technikami',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: '/icons/Znakowanie Czapki.svg',
        width: 1200,
        height: 630,
        alt: 'Znakowanie czapek Modeo',
      },
    ],
  },
  alternates: {
    canonical: '/znakowanie/czapki'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ZnakowanieCzapekPage() {
  // Get team member for caps marking services
  const capExpert = getTeamMemberByName('Anna Pawlak'); // Specjalista ds. Produkcji - idealna do czapek
  
  if (!capExpert) {
    throw new Error('Cap expert not found');
  }

  return (
    <main className="min-h-screen">
      {/* Complete Contact Section with Header, Team Member and Form */}
      <CompleteContactSection
        teamMember={capExpert}
        tagline="Potrzebujesz oznaczyć czapki?"
        title="Skontaktuj się z ekspertem czapek"
        description="Wypełnij formularz, a nasz specjalista ds. produkcji i znakowania czapek skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci wybrać najlepszą technikę znakowania, w tym specjalistyczny haft 3D na czapkach."
        backgroundColor="gray"
      />
    </main>
  );
}