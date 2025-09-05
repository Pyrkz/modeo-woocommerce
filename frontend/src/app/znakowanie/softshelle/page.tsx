import { Metadata } from 'next';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';

export const metadata: Metadata = {
  title: 'Znakowanie Softshelli - Modeo.pl | Nadruki na softshellach',
  description: 'Profesjonalne znakowanie softshelli i odzieży sportowej. Haft, sitodruk, flex na softshellach. Trwałe znakowanie odporne na warunki pogodowe. ✓ Wodoodporność ✓ Elastyczność ✓ Profesjonalne wykonanie',
  keywords: 'znakowanie softshelli, nadruki na softshellach, softshelle z logo, haft na softshellach, odzież sportowa z nadrukiem',
  openGraph: {
    title: 'Znakowanie Softshelli - Modeo.pl',
    description: 'Profesjonalne znakowanie softshelli i odzieży sportowej',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: '/icons/Znakowanie Softshelle.svg',
        width: 1200,
        height: 630,
        alt: 'Znakowanie softshelli Modeo',
      },
    ],
  },
  alternates: {
    canonical: '/znakowanie/softshelle'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ZnakowanieSocketshellePage() {
  // Get team member for softshell marking services
  const softshellExpert = getTeamMemberByName('Anna Pawlak'); // Specjalista ds. Produkcji - idealna do softshelli
  
  if (!softshellExpert) {
    throw new Error('Softshell expert not found');
  }

  return (
    <main className="min-h-screen">
      {/* Complete Contact Section with Header, Team Member and Form */}
      <CompleteContactSection
        teamMember={softshellExpert}
        tagline="Potrzebujesz oznaczyć softshelle?"
        title="Skontaktuj się z ekspertem softshelli"
        description="Wypełnij formularz, a nasz specjalista ds. produkcji i znakowania softshelli skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci wybrać technikę znakowania zachowującą właściwości funkcjonalne materiału."
        backgroundColor="gray"
      />
    </main>
  );
}