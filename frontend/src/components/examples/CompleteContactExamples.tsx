'use client';

import { CompleteContactSection } from '@/features/contact';
import { teamMembers } from '@/features/team';

/**
 * Examples of CompleteContactSection usage
 * 
 * This component combines:
 * - Section header (like AboutContent style)
 * - Team member card (left side) 
 * - Contact form (right side)
 */

export function CompleteContactExamples() {
  return (
    <div className="space-y-0">
      
      {/* Example 1: Corporate Wear Contact */}
      <CompleteContactSection
        teamMember={teamMembers[1]} // Anna Pawlak - Specjalista ds. Produkcji
        tagline="Potrzebujesz odzieży firmowej?"
        title="Skontaktuj się z naszym zespołem"
        description="Wypełnij formularz, a nasz specjalista ds. odzieży firmowej skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci wybrać najlepsze rozwiązania dla Twojej firmy."
        backgroundColor="gray"
      />

      {/* Example 2: Allegro Support */}
      <CompleteContactSection
        teamMember={teamMembers[0]} // Piotr Ziętal - Kierownik ds. Obsługi Allegro
        tagline="Sprzedajesz na Allegro?"
        title="Skontaktuj się z ekspertem Allegro"
        description="Masz pytania o współpracę z nami poprzez platformę Allegro? Nasz kierownik odpowie na wszystkie Twoje pytania i pomoże w realizacji zamówienia."
        backgroundColor="white"
      />

      {/* Example 3: Logistics Contact */}
      <CompleteContactSection
        teamMember={teamMembers[2]} // Justyna Wiewióra - Koordynator Logistyki
        tagline="Pilne zamówienie?"
        title="Zapytaj o terminy realizacji"
        description="Potrzebujesz szybkiej realizacji zamówienia? Skontaktuj się z naszym koordynatorem logistyki, który ustali optymalne terminy dostawy."
        backgroundColor="gray"
      />

      {/* Example 4: Design Services */}
      <CompleteContactSection
        teamMember={teamMembers[3]} // Piotr Anzorge - Projektantka Graficzna
        tagline="Potrzebujesz projektu?"
        title="Stwórzmy coś wyjątkowego razem"
        description="Nasz grafik pomoże Ci stworzyć unikalny projekt, który idealnie odzwierciedli charakter Twojej marki. Skonsultujemy każdy detal, aby rezultat przekroczył Twoje oczekiwania."
        backgroundColor="white"
      />
    </div>
  );
}

// Individual use case components
export function CorporateContactSection() {
  return (
    <CompleteContactSection
      teamMember={teamMembers[1]}
      tagline="Potrzebujesz odzieży firmowej?"
      title="Skontaktuj się z naszym zespołem"
      description="Wypełnij formularz, a nasz specjalista ds. odzieży firmowej skontaktuje się z Tobą w ciągu 24 godzin."
      backgroundColor="gray"
    />
  );
}

export function AllegroContactSection() {
  return (
    <CompleteContactSection
      teamMember={teamMembers[0]}
      tagline="Sprzedajesz na Allegro?"
      title="Ekspert Allegro do Twojej dyspozycji"
      description="Masz pytania o współpracę? Nasz kierownik ds. Allegro odpowie na wszystkie pytania."
      backgroundColor="white"
    />
  );
}