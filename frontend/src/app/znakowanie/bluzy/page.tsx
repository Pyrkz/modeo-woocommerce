import { Metadata } from 'next';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';

export const metadata: Metadata = {
  title: 'Bluzy - Znakowanie dla branży | Modeo.pl',
  description: 'Profesjonalne znakowanie bluz wszystkimi technikami. Haft, sitodruk, DTF, flex na bluzach firmowych, sportowych i brandowych. ✓ Wszystkie techniki ✓ Wysoka jakość ✓ Trwałe znakowanie',
  keywords: 'znakowanie bluz, bluzy firmowe, bluzy z logo, haft na bluzach, sitodruk na bluzach, nadruki na bluzach, personalizacja bluz',
  openGraph: {
    title: 'Bluzy - Znakowanie dla branży | Modeo.pl',
    description: 'Profesjonalne znakowanie bluz wszystkimi technikami',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: '/icons/Znakowanie Bluzy.svg',
        width: 1200,
        height: 630,
        alt: 'Znakowanie bluz Modeo',
      },
    ],
  },
  alternates: {
    canonical: '/znakowanie/dla-branz/bluzy'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ZnakowanieBluzyPage() {
  // Get team member for sweatshirts marking services
  const sweatshirtExpert = getTeamMemberByName('Anna Pawlak'); // Specjalista ds. Produkcji - idealna do bluz
  
  if (!sweatshirtExpert) {
    throw new Error('Sweatshirt expert not found');
  }

  return (
    <main className="min-h-screen">
      {/* Complete Contact Section with Header, Team Member and Form */}
      <CompleteContactSection
        teamMember={sweatshirtExpert}
        tagline="Potrzebujesz oznaczyć bluzy?"
        title="Skontaktuj się z ekspertem bluz"
        description="Wypełnij formularz, a nasz specjalista ds. produkcji i znakowania bluz skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci wybrać najlepszą technikę znakowania dopasowaną do materiału i stylu bluzy."
        backgroundColor="gray"
      />
    </main>
  );
}