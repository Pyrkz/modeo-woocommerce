import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  BoltIcon,
  ClockIcon,
  GiftIcon 
} from '@heroicons/react/24/outline';
import { ContactInfo, ContactFeature } from '../types';

export const contactInfoData: ContactInfo[] = [
  {
    id: 'email',
    icon: EnvelopeIcon,
    title: 'Email',
    value: 'sklep@modeo.pl',
    href: 'mailto:sklep@modeo.pl',
    type: 'email',
  },
  {
    id: 'phone',
    icon: PhoneIcon,
    title: 'Telefon',
    value: '+48 664 733 063',
    href: 'tel:+48664733063',
    type: 'phone',
  },
  {
    id: 'address',
    icon: MapPinIcon,
    title: 'Odwiedź nas',
    value: 'Krakowska 45, 42-202 Częstochowa',
    href: 'https://maps.google.com/?q=Krakowska+45,+42-202+Częstochowa',
    type: 'address',
  },
];

export const contactFeaturesData: ContactFeature[] = [
  {
    id: 'fast-response',
    icon: BoltIcon,
    title: 'Szybka odpowiedź',
    description: 'Odpowiadamy w ciągu 2 godzin w dni robocze',
  },
  {
    id: 'working-hours',
    icon: ClockIcon,
    title: 'Godziny pracy',
    description: 'Pon-Pt: 8:00-16:00\nSob-Ndz: Zamknięte',
  },
  {
    id: 'free-quote',
    icon: GiftIcon,
    title: 'Darmowa wycena',
    description: 'Pierwsza wycena zawsze za darmo, bez zobowiązań',
  },
];