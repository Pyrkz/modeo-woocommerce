import { Metadata } from 'next';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';

export const metadata: Metadata = {
  title: 'Nadruki i Znakowanie - Modeo.pl | Profesjonalne usługi nadruku',
  description: 'Profesjonalne nadruki i znakowanie odzieży dla firm. Oferujemy sitodruk, DTF, haft komputerowy, flex i flock. ✓ Najwyższa jakość ✓ Szybka realizacja ✓ Konkurencyjne ceny',
  keywords: 'nadruki na odzieży, znakowanie odzieży, sitodruk, DTF, haft komputerowy, flex, flock, sublimacja, personalizacja odzieży',
  openGraph: {
    title: 'Nadruki i Znakowanie - Modeo.pl',
    description: 'Profesjonalne nadruki i znakowanie odzieży dla firm',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: '/resources/modeo znakowanie.jpg',
        width: 1200,
        height: 630,
        alt: 'Nadruki i znakowanie Modeo',
      },
    ],
  },
  alternates: {
    canonical: '/dla-firm/nadruki'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function NadrukiPage() {
  // Get team member for printing services inquiries
  const printingExpert = getTeamMemberByName('Anna Pawlak'); // Specjalista ds. Produkcji - idealny do nadruków
  
  if (!printingExpert) {
    throw new Error('Printing expert not found');
  }

  return (
    <main className="min-h-screen">
      {/* Complete Contact Section with Header, Team Member and Form */}
      <CompleteContactSection
        teamMember={printingExpert}
        tagline="Potrzebujesz profesjonalnych nadruków?"
        title="Skontaktuj się z ekspertem znakowania"
        description="Wypełnij formularz, a nasz specjalista ds. produkcji i znakowania skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci wybrać najlepszą technikę nadruku i zapewnimy najwyższą jakość wykonania."
        backgroundColor="gray"
      />
    </main>
  );
}