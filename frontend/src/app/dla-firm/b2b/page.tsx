import { Metadata } from 'next';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';

export const metadata: Metadata = {
  title: 'Współpraca B2B - Modeo.pl | Profesjonalne rozwiązania dla firm',
  description: 'Rozwiń swoją współpracę B2B z Modeo. Oferujemy kompleksowe rozwiązania dla firm, hurtowników i partnerów biznesowych. ✓ Atrakcyjne warunki ✓ Wsparcie sprzedażowe ✓ Elastyczne rozliczenia',
  keywords: 'współpraca B2B, hurt odzieży, partnerstwo biznesowe, rozwiązania dla firm, dystrybucja odzieży, współpraca handlowa',
  openGraph: {
    title: 'Współpraca B2B - Modeo.pl',
    description: 'Profesjonalne rozwiązania B2B dla firm i partnerów biznesowych',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: '/resources/modeo twoj partner b2b 2.jpg',
        width: 1200,
        height: 630,
        alt: 'Współpraca B2B z Modeo',
      },
    ],
  },
  alternates: {
    canonical: '/dla-firm/b2b'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function B2BPage() {
  // Get team member for B2B partnership inquiries
  const b2bExpert = getTeamMemberByName('Piotr Ziętal'); // Kierownik ds. Obsługi Allegro - dobry do B2B
  
  if (!b2bExpert) {
    throw new Error('B2B expert not found');
  }

  return (
    <main className="min-h-screen">
      {/* Complete Contact Section with Header, Team Member and Form */}
      <CompleteContactSection
        teamMember={b2bExpert}
        tagline="Szukasz partnera biznesowego?"
        title="Rozpocznij współpracę B2B z Modeo"
        description="Wypełnij formularz, a nasz specjalista ds. współpracy B2B skontaktuje się z Tobą w ciągu 24 godzin. Omówimy warunki partnerstwa, rabaty hurtowe i możliwości współpracy dostosowane do Twojego biznesu."
        backgroundColor="gray"
      />
    </main>
  );
}