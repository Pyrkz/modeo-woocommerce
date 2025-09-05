import { TeamMember } from '../types';

export const teamMembers: TeamMember[] = [
  {
    id: 'piotr-zietal',
    name: 'Piotr Ziętal',
    position: 'Kierownik ds. Obsługi Allegro',
    description: 'Odpowiadam za kontakt z klientami i koordynuję zamówień. Dbam o to, żeby każdy projekt był realizowany zgodnie z Waszymi oczekiwaniami.',
    email: 'allegro@modeo.pl',
    phone: '663 188 204',
    image: '/Ekipa/Piotrek.svg',
    imageHover: '/Ekipa/Piotrek-red.svg'
  },
  {
    id: 'anna-pawlak',
    name: 'Anna Pawlak',
    position: 'Specjalista ds. Produkcji',
    description: 'Nadzoruję proces produkcji i jakość wykonania. Dzięki mnie każdy nadruk i haft są perfekcyjne.',
    email: 'ania@modeo.pl',
    phone: '793 971 004',
    image: '/Ekipa/Ania.svg',
    imageHover: '/Ekipa/Ania-red.svg'
  },
  {
    id: 'justyna-wiewiora',
    name: 'Justyna Wiewióra',
    position: 'Koordynator Logistyki',
    description: 'Pilnuję terminów realizacji i wysyłek. Dzięki mnie zamówienia docierają do Was na czas.',
    email: 'justyna@modeo.pl',
    phone: '728 365 702',
    image: '/Ekipa/Justyna.svg',
    imageHover: '/Ekipa/Justyna-red.svg'
  },
  {
    id: 'piotr-anzorge',
    name: 'Piotr Anzorge',
    position: 'Projektant Graficzny',
    description: 'Tworzę unikalne projekty graficzne i pomagam klientom w realizacji ich wizji. Artystyczna dusza zespołu.',
    email: 'piotr@modeo.pl',
    phone: '661 635 379',
    image: '/Ekipa/Anzi.svg',
    imageHover: '/Ekipa/Anzi-red.svg'
  }
];

// Helper function to get team member by ID
export const getTeamMemberById = (id: string): TeamMember | undefined => {
  return teamMembers.find(member => member.id === id);
};

// Helper function to get team member by name
export const getTeamMemberByName = (name: string): TeamMember | undefined => {
  return teamMembers.find(member => member.name === name);
};