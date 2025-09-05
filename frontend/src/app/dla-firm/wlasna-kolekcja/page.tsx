import { Metadata } from 'next';
import { CustomCollectionSection } from '@/features/custom-collection';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';

export const metadata: Metadata = {
  title: 'Własna Kolekcja B2B - Modeo.pl',
  description: 'Stwórz własną markę odzieży i gadżetów dla swojej firmy'
};

export default function WlasnaKolekcjaPage() {
  // Get team member for custom collection inquiries
  const designExpert = getTeamMemberByName('Piotr Anzorge'); // Projektantka Graficzna
  
  if (!designExpert) {
    throw new Error('Design expert not found');
  }

  return (
    <main className="min-h-screen">
      <CustomCollectionSection />
      
      {/* Complete Contact Section with Header, Team Member and Form */}
      <CompleteContactSection
        teamMember={designExpert}
        tagline="Chcesz stworzyć własną kolekcję?"
        title="Skontaktuj się z naszym projektantem"
        description="Wypełnij formularz, a nasz specjalista ds. projektowania graficznego skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci stworzyć unikalną kolekcję odzieży dla Twojej marki."
        backgroundColor="gray"
      />
    </main>
  );
}