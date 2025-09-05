import { Metadata } from 'next';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';

export const metadata: Metadata = {
  title: 'Znakowanie Polarów - Modeo.pl | Nadruki i hafty na polarach',
  description: 'Profesjonalne znakowanie polarów wszystkimi technikami. Haft, sitodruk, flex na polarach firmowych i reklamowych. Specjalistyczne techniki dla materiałów polarowych. ✓ Trwałe znakowanie ✓ Wysoka jakość ✓ Materiały polarowe',
  keywords: 'znakowanie polarów, polary z logo, haft na polarach, polary firmowe, nadruki na polarach, personalizacja polarów, polary reklamowe',
  openGraph: {
    title: 'Znakowanie Polarów - Modeo.pl',
    description: 'Profesjonalne znakowanie polarów wszystkimi technikami',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: '/icons/Znakowanie Polary.svg',
        width: 1200,
        height: 630,
        alt: 'Znakowanie polarów Modeo',
      },
    ],
  },
  alternates: {
    canonical: '/znakowanie/polary'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ZnakowaniePolarowPage() {
  // Get team member for fleece marking services
  const fleeceExpert = getTeamMemberByName('Anna Pawlak'); // Specjalista ds. Produkcji - idealna do polarów
  
  if (!fleeceExpert) {
    throw new Error('Fleece expert not found');
  }

  return (
    <main className="min-h-screen">
      {/* Complete Contact Section with Header, Team Member and Form */}
      <CompleteContactSection
        teamMember={fleeceExpert}
        tagline="Potrzebujesz oznaczyć polary?"
        title="Skontaktuj się z ekspertem polarów"
        description="Wypełnij formularz, a nasz specjalista ds. produkcji i znakowania polarów skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci wybrać najlepszą technikę znakowania dostosowaną do specyfiki materiałów polarowych."
        backgroundColor="gray"
      />
    </main>
  );
}