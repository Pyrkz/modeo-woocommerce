import { SliderItem } from '../types';

export const heroSliderData: SliderItem[] = [
  {
    id: 'slide-1',
    title: 'Profesjonalne Znakowanie Odzieży',
    subtitle: 'Nowa kolekcja biznesowa',
    description: 'Wysokiej jakości koszulki, bluzy i odzież robocza z możliwością personalizacji. Idealny wybór dla firm i organizacji.',
    imagePath: '/hero-slider/Koszulka-Tendy-Model.png',
    imageAlt: 'Profesjonalne znakowanie odzieży dla biznesu',
    ctaText: 'Zobacz Kolekcję',
    ctaHref: '/sklep'
  },
  {
    id: 'slide-2', 
    title: 'Sportowa Odzież Premium',
    subtitle: 'Aktywny styl życia',
    description: 'Nowoczesne ubrania sportowe z technologią odprowadzania wilgoci. Komfort i styl na każdy trening.',
    imagePath: '/hero-slider/modeo koszulki sportowe.jpg',
    imageAlt: 'Sportowa odzież premium dla aktywnych',
    ctaText: 'Sprawdź Ofertę',
    ctaHref: '/sklep/ubrania-sportowe'
  },
  {
    id: 'slide-3',
    title: 'Personalizacja i Nadruki',
    subtitle: 'Twój unikalny styl',
    description: 'Spersonalizuj swoją odzież z naszymi zaawansowanymi technikami nadruku. Ekspresowa realizacja zamówień.',
    imagePath: '/hero-slider/Sklep modeo plecaki 2-min.jpg', 
    imageAlt: 'Personalizacja i nadruki na odzieży',
    ctaText: 'Zamów Nadruk',
    ctaHref: '/znakowanie'
  }
];

export const sliderSettings = {
  autoplay: true,
  autoplayDelay: 6000,
  showDots: true,
  showArrows: true
};