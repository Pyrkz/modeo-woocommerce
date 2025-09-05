import { Metadata } from 'next';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';

export const metadata: Metadata = {
  title: 'Znakowanie Plecaków i Toreb - Modeo.pl | Nadruki na plecakach i torbach',
  description: 'Profesjonalne znakowanie plecaków, toreb i bagażu. Haft, sitodruk, grawer na plecakach szkolnych, sportowych i firmowych. ✓ Trwałe znakowanie ✓ Wszystkie techniki ✓ Wysoka jakość',
  keywords: 'znakowanie plecaków, nadruki na torbach, plecaki z logo, torby firmowe, haft na plecakach, grawer na torbach, personalizacja bagażu',
  openGraph: {
    title: 'Znakowanie Plecaków i Toreb - Modeo.pl',
    description: 'Profesjonalne znakowanie plecaków, toreb i bagażu',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: '/icons/Znakowanie Plecaki.svg',
        width: 1200,
        height: 630,
        alt: 'Znakowanie plecaków i toreb Modeo',
      },
    ],
  },
  alternates: {
    canonical: '/znakowanie/plecaki-torby'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ZnakowaniePlecakiTorbyPage() {
  // Get team member for bags and backpacks marking services
  const bagsExpert = getTeamMemberByName('Anna Pawlak'); // Specjalista ds. Produkcji - idealna do plecaków i toreb
  
  if (!bagsExpert) {
    throw new Error('Bags expert not found');
  }

  return (
    <main className="min-h-screen">
      {/* Complete Contact Section with Header, Team Member and Form */}
      <CompleteContactSection
        teamMember={bagsExpert}
        tagline="Potrzebujesz oznaczyć plecaki i torby?"
        title="Skontaktuj się z ekspertem plecaków i toreb"
        description="Wypełnij formularz, a nasz specjalista ds. produkcji i znakowania plecaków oraz toreb skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci wybrać najlepszą technikę znakowania odpowiednią dla materiału i przeznaczenia."
        backgroundColor="gray"
      />
    </main>
  );
}