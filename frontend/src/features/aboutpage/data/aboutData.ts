import { 
  HeartIcon, 
  StarIcon, 
  EyeIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  RectangleStackIcon,
  BoltIcon,
  StarIcon as StarSolidIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { AboutFeature, AboutValue, BusinessService, TeamMember, Statistic, CTAContactCard } from '../types';

export const aboutFeaturesData: AboutFeature[] = [
  {
    id: 'misja',
    icon: HeartIcon,
    title: 'Nasza misja',
    description: 'Tworzymy unikalne projekty, które wyróżniają Twój biznes na rynku',
  },
  {
    id: 'wartosci',
    icon: StarIcon,
    title: 'Nasze wartości',
    description: 'Jakość, rzetelność i indywidualne podejście do każdego klienta',
  },
  {
    id: 'wizja',
    icon: EyeIcon,
    title: 'Nasza wizja',
    description: 'Być partnerem w budowaniu silnych marek i rozwijaniu biznesu',
  },
];

export const aboutValuesData: AboutValue[] = [
  {
    id: 'kochamy',
    title: 'Kochamy to, co robimy',
    description: 'Każdy nadruk to dla nas osobna historia. Lubimy, kiedy projekty mają charakter i pomagają firmom pokazać ich prawdziwą twarz.',
  },
  {
    id: 'jak-dzialamy',
    title: 'Jak działamy?',
    description: 'Szybki kontakt, konkretna wycena, ekspresowe realizacje. Dopasowujemy rozwiązania do Twoich potrzeb i zawsze gramy fair.',
  },
  {
    id: 'filozofia',
    title: 'Nasza filozofia',
    description: 'Każdy projekt jest wyjątkowy. Dbamy o detale, słuchamy Twoich potrzeb i zawsze szukamy najlepszego rozwiązania dla Twojej marki.',
  },
];

export const businessServicesData: BusinessService[] = [
  {
    id: 'b2b',
    title: 'B2B – współpraca dla firm i marek',
    description: 'Jesteśmy partnerem dla firm, agencji reklamowych i eventowych, które szukają sprawdzonych rozwiązań w zakresie odzieży reklamowej. Zapewniamy od wewnętrzne zapotrzebowanie – gwarantujemy wysoką jakość wykonania, terminowość i pełne wsparcie na każdym etapie realizacji. Jeśli chcesz budować wizerunek swojej marki z klasą – zapraszamy do współpracy!',
    ctaText: 'Oferta B2B',
    ctaHref: '/oferta-b2b',
    ctaVariant: 'primary',
  },
  {
    id: 'b2c',
    title: 'B2C – personalizowana odzież dla każdego',
    description: 'Szukasz wyjątkowej koszulki lub innej odzieży lub po prostu? Chcesz stworzyć swój własny projekt i zamówić go szybko i wygodnie? W naszym sklepie online możesz wybierać spośród setek produktów i motywów – zawsze znajdziesz to, co najbardziej Ci odpowiada. Bez formalności, bez ograniczeń – tak, jak chcesz.',
    ctaText: 'Sklep online',
    ctaHref: '/sklep',
    ctaVariant: 'secondary',
  },
];

export const teamMembersData: TeamMember[] = [
  {
    id: 'piotr-zietal',
    name: 'Piotr Ziętal',
    role: 'Kierownik ds. Obsługi Allegro',
    description: 'Odpowiadam za kontakt z klientami i koordynuję zamówień. Dbam o to, żeby każdy projekt był realizowany zgodnie z Waszymi oczekiwaniami.',
    email: 'allegro@modeo.pl',
    phone: '663 188 204',
    avatar: '/Ekipa/Piotrek.svg',
    avatarBgColor: 'black',
  },
  {
    id: 'anna-pawlak',
    name: 'Anna Pawlak',
    role: 'Specjalista ds. Produkcji',
    description: 'Nadzorują proces produkcji i jakość wykonania. Dzięki mnie każdy nadruk i haft są perfekcyjne.',
    email: 'ania@modeo.pl',
    phone: '793 971 004',
    avatar: '/Ekipa/Ania-red.svg',
    avatarBgColor: 'primary',
  },
  {
    id: 'justyna-wiewiora',
    name: 'Justyna Wiewióra',
    role: 'Koordynator Logistyki',
    description: 'Pilnuję terminów realizacji i wysyłek. Dzięki mnie zamówienia docierają do Was na czas.',
    email: 'justyna@modeo.pl',
    phone: '728 365 702',
    avatar: '/Ekipa/Justyna-red.svg',
    avatarBgColor: 'primary',
  },
  {
    id: 'piotr-anzorge',
    name: 'Piotr Anzorge',
    role: 'Projektantka Graficzna',
    description: 'Tworzę unikalne projekty graficzne i pomagam klientom w realizacji ich wizji. Artystyczna dusza zespołu.',
    email: 'piotr@modeo.pl',
    phone: '661 635 379',
    avatar: '/Ekipa/Anzi.svg',
    avatarBgColor: 'black',
  },
];

export const statisticsData: Statistic[] = [
  {
    id: 'established',
    icon: BuildingOffice2Icon,
    number: '1993',
    title: 'Rok założenia',
    description: 'Ponad 30 lat doświadczenia w branży',
    iconBgColor: 'bg-blue-50',
  },
  {
    id: 'satisfied-clients',
    icon: UserGroupIcon,
    number: '15 000+',
    title: 'Zadowolonych klientów',
    description: 'Firmy, które nam zaufały',
    iconBgColor: 'bg-yellow-50',
  },
  {
    id: 'products-made',
    icon: RectangleStackIcon,
    number: '500 000+',
    title: 'Wyprodukowanych sztuk',
    description: 'Koszulek, bluz i gadżetów',
    iconBgColor: 'bg-pink-50',
  },
  {
    id: 'delivery-time',
    icon: BoltIcon,
    number: '48h',
    title: 'Godzin na realizację',
    description: 'Ekspresowa realizacja zamówień',
    iconBgColor: 'bg-orange-50',
  },
  {
    id: 'satisfaction',
    icon: StarSolidIcon,
    number: '99%',
    title: 'Zadowolenia klientów',
    description: 'Potwierdzenie jakości naszych usług',
    iconBgColor: 'bg-green-50',
  },
  {
    id: 'techniques',
    icon: Cog6ToothIcon,
    number: '6',
    title: 'Technik nadruku',
    description: 'DTG, sitodruk, sublimacja, haft i flex/flock',
    iconBgColor: 'bg-purple-50',
  },
];

export const ctaContactData: CTAContactCard[] = [
  {
    id: 'email',
    icon: EnvelopeIcon,
    title: 'Email',
    value: 'sklep@modeo.pl',
    description: 'Odpowiadamy w ciągu 2 godzin w dni robocze',
    href: 'mailto:sklep@modeo.pl',
    type: 'email',
  },
  {
    id: 'phone',
    icon: PhoneIcon,
    title: 'Telefon',
    value: '+48 664 733 063',
    description: 'Pon-Pt: 8:00-16:00',
    href: 'tel:+48664733063',
    type: 'phone',
  },
  {
    id: 'address',
    icon: MapPinIcon,
    title: 'Odwiedź nas',
    value: 'w Częstochowie',
    description: 'Umów się na spotkanie w naszym biurze',
    href: 'https://maps.google.com/?q=Krakowska+45,+42-202+Częstochowa',
    type: 'address',
  },
];