import { PrintingMethod } from '../types';
import { placeholderImages } from '../utils/imageOptimization';

export const printingMethods: PrintingMethod[] = [
  {
    id: 'sitodruk',
    name: 'Sitodruk',
    description: 'Tradycyjna technika nadruku o najwyższej jakości i trwałości',
    image: placeholderImages.sitodruk,
    features: [
      'Najwyższa jakość nadruku',
      'Duża trwałość',
      'Idealne do dużych nakładów',
      'Szeroka gama kolorów'
    ],
    isPopular: true
  },
  {
    id: 'dtf',
    name: 'DTF (Direct to Film)',
    description: 'Nowoczesna technologia transferu zapewniająca żywe kolory',
    image: placeholderImages.dtf,
    features: [
      'Żywe, nasycone kolory',
      'Elastyczny nadruk',
      'Sprawdza się na różnych materiałach',
      'Szybka realizacja'
    ]
  },
  {
    id: 'haft',
    name: 'Haft maszynowy',
    description: 'Eleganckie wykończenie nadające prestiżu Twojej marce',
    image: placeholderImages.haft,
    features: [
      'Elegancki wygląd',
      'Bardzo trwały',
      'Prestiżowy charakter',
      'Odporna na pranie'
    ],
    isPopular: true
  },
  {
    id: 'dtg',
    name: 'DTG (Direct to Garment)',
    description: 'Bezpośredni nadruk na tekstylia z możliwością pełnokolorowych projektów',
    image: placeholderImages.dtg,
    features: [
      'Pełnokolorowe projekty',
      'Doskonała jakość detali',
      'Miękki w dotyku',
      'Idealne do małych nakładów'
    ]
  },
  {
    id: 'termotransfer',
    name: 'Termotransfer',
    description: 'Uniwersalna metoda idealna do personalizacji i małych nakładów',
    image: placeholderImages.termotransfer,
    features: [
      'Szybka realizacja',
      'Doskonałe do personalizacji',
      'Szeroki wybór kolorów',
      'Ekonomiczne rozwiązanie'
    ]
  },
  {
    id: 'grawerowanie',
    name: 'Grawerowanie laserowe',
    description: 'Precyzyjne grawerowanie na różnych materiałach',
    image: placeholderImages.grawerowanie,
    features: [
      'Wysoka precyzja',
      'Trwałe oznaczenie',
      'Różne materiały',
      'Profesjonalny wygląd'
    ]
  }
];

export const heroData = {
  title: 'Znakowanie',
  subtitle: 'Jesteśmy liderem w branży odzieży firmowej z wieloletnim doświadczeniem i tysiącami zadowolonych klientów',
  badgeText: 'Dlaczego setki firm nam ufa',
  slides: printingMethods
};