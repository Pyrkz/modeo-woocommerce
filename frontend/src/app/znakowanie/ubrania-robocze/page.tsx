import { Metadata } from 'next';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';

export const metadata: Metadata = {
  title: 'Znakowanie Ubrań Roboczych - Modeo.pl | Znakowanie odzieży roboczej',
  description: 'Profesjonalne znakowanie ubrań roboczych i odzieży BHP. Haft, sitodruk, odblaskowe znakowanie na kombinezonach, kamizelkach i odzieży ochronnej. ✓ Odporność na pranie ✓ Materiały odblaskowe ✓ Normy BHP',
  keywords: 'znakowanie ubrań roboczych, odzież BHP z logo, kamizelki robocze z nadrukiem, kombinezony firmowe, znakowanie odblaskowe, odzież ochronna',
  openGraph: {
    title: 'Znakowanie Ubrań Roboczych - Modeo.pl',
    description: 'Profesjonalne znakowanie ubrań roboczych i odzieży BHP',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: '/icons/Znakowanie Ubrania Robocze.svg',
        width: 1200,
        height: 630,
        alt: 'Znakowanie ubrań roboczych Modeo',
      },
    ],
  },
  alternates: {
    canonical: '/znakowanie/ubrania-robocze'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ZnakowanieUbranRoboczychPage() {
  // Get team member for workwear marking services
  const workwearExpert = getTeamMemberByName('Anna Pawlak'); // Specjalista ds. Produkcji - idealna do ubrań roboczych
  
  if (!workwearExpert) {
    throw new Error('Workwear expert not found');
  }

  return (
    <main className="min-h-screen">
      {/* Complete Contact Section with Header, Team Member and Form */}
      <CompleteContactSection
        teamMember={workwearExpert}
        tagline="Potrzebujesz oznaczyć ubrania robocze?"
        title="Skontaktuj się z ekspertem ubrań roboczych"
        description="Wypełnij formularz, a nasz specjalista ds. produkcji i znakowania ubrań roboczych skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci wybrać technikę znakowania spełniającą normy BHP i odpowiednią dla odzieży ochronnej."
        backgroundColor="gray"
      />
    </main>
  );
}