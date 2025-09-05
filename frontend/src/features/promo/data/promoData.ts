import { PromoCard } from '../types';

export const promoData: PromoCard[] = [
  {
    id: 'dom-ogrod',
    title: 'Dom & Ogród – styl w każdym detalu',
    description: 'Nasze kolekcje dla domu i ogrodu to praktyczne rozwiązania, które sprawdzą się w każdym domu i podczas prac w ogrodzie. Od funkcjonalnych podwiązek, przez apronów do zjedności w projektowaniu, aż po luksusowy ogrodowe – wszystko stworzone z myślą o jakości i designie.',
    imagePath: '/resources/modeo dom i ogrod.jpg',
    imageAlt: 'Kolekcja Dom & Ogród - stylowe dodatki do domu',
    ctaText: 'Zobacz kategorię Dom & Ogród',
    ctaHref: '/sklep/dom-ogrod',
    badge: 'Tekstylia dla każdego, które tworzą klimat'
  },
  {
    id: 'pieluszki-akcesoria',
    title: 'Pieluszki i akcesoria dla najmłodszych',
    description: 'W Modeo dbamy także o najmłodszych! Przedstawiamy kategorię pieluszek i akcesoriów dla dzieci, które łączą wysoką jakość, przystępność i najlepsze rozwiązania.',
    imagePath: '/resources/modeo dla najmlodszych.jpg',
    imageAlt: 'Pieluszki i akcesoria dla dzieci',
    ctaText: 'Wróć',
    ctaHref: '/sklep/dzieci',
    badge: 'Kolekcje dzieci dla najważniejszych z myślą o najmiłych'
  }
];