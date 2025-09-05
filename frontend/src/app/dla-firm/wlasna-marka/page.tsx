import { Metadata } from 'next';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';

export const metadata: Metadata = {
  title: 'Własna Marka B2B - Modeo.pl | Stwórz swoją markę odzieżową',
  description: 'Rozwiń swoją markę z profesjonalną odzieżą. Kompleksowe wsparcie w tworzeniu własnej marki odzieżowej - od projektu po produkcję. ✓ Doświadczony zespół ✓ Wysokie standardy jakości',
  keywords: 'własna marka odzieżowa, private label, marka odzieży, produkcja odzieży, projektowanie marki, branding odzieżowy',
  openGraph: {
    title: 'Własna Marka B2B - Modeo.pl',
    description: 'Stwórz swoją markę odzieżową z profesjonalnym wsparciem Modeo',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: '/resources/modeo-koszulki-dla-twojej-marki.webp',
        width: 1200,
        height: 630,
        alt: 'Własna marka odzieżowa Modeo',
      },
    ],
  },
  alternates: {
    canonical: '/dla-firm/wlasna-marka'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function WlasnaMarkaPage() {
  // Get team member for brand development inquiries
  const brandingExpert = getTeamMemberByName('Piotr Anzorge'); // Projektantka Graficzna - najlepszy do brandingu
  
  if (!brandingExpert) {
    throw new Error('Branding expert not found');
  }

  return (
    <main className="min-h-screen">
      
      {/* Complete Contact Section with Header, Team Member and Form */}
      <CompleteContactSection
        teamMember={brandingExpert}
        tagline="Marzysz o własnej marce odzieżowej?"
        title="Rozpocznij swoją przygodę z brandingiem"
        description="Wypełnij formularz, a nasz specjalista ds. brandingu i projektowania skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci przejść całą drogę od pomysłu do gotowej marki odzieżowej."
        backgroundColor="gray"
      />
    </main>
  );
}