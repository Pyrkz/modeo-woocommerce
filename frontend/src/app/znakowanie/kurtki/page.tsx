import { Metadata } from 'next';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';

export const metadata: Metadata = {
  title: 'Znakowanie Kurtek - Modeo.pl | Nadruki na kurtkach',
  description: 'Profesjonalne znakowanie kurtek i odzieży wierzchniej. Haft, sitodruk, flex na kurtkach roboczych, softshellach, bluzach. ✓ Trwałe znakowanie ✓ Odporność na warunki ✓ Profesjonalne wykonanie',
  keywords: 'znakowanie kurtek, nadruki na kurtkach, personalizacja kurtek, kurtki z logo, haft na kurtkach, znakowanie softshelli',
  openGraph: {
    title: 'Znakowanie Kurtek - Modeo.pl',
    description: 'Profesjonalne znakowanie kurtek i odzieży wierzchniej',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: '/icons/Znakowanie Kurtki.svg',
        width: 1200,
        height: 630,
        alt: 'Znakowanie kurtek Modeo',
      },
    ],
  },
  alternates: {
    canonical: '/znakowanie/kurtki'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ZnakowanieKurtekPage() {
  // Get team member for jacket marking services
  const jacketExpert = getTeamMemberByName('Anna Pawlak'); // Specjalista ds. Produkcji - idealna do kurtek
  
  if (!jacketExpert) {
    throw new Error('Jacket expert not found');
  }

  return (
    <main className="min-h-screen">
      {/* Complete Contact Section with Header, Team Member and Form */}
      <CompleteContactSection
        teamMember={jacketExpert}
        tagline="Potrzebujesz oznaczyć kurtki?"
        title="Skontaktuj się z ekspertem kurtek"
        description="Wypełnij formularz, a nasz specjalista ds. produkcji i znakowania kurtek skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci wybrać odpowiednią technikę znakowania odporną na warunki atmosferyczne."
        backgroundColor="gray"
      />
    </main>
  );
}