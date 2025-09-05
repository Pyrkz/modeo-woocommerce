import { FooterSection, LegalLink } from '../types';

export const footerSections: FooterSection[] = [
  {
    title: 'SKLEP',
    links: [
      { href: '/nowosci', label: 'Nowości' },
      { href: '/kolekcje', label: 'Kolekcje' },
      { href: '/sklep/koszulki', label: 'Koszulki' },
      { href: '/sklep/bluzy', label: 'Bluzy' },
      { href: '/sklep/polary', label: 'Polary' },
      { href: '/sklep/kurtki', label: 'Kurtki' },
      { href: '/karty-akcesoria', label: 'Akcesoria' },
    ],
  },
  {
    title: 'POPULARNE',
    links: [
      { href: '/sklep/sezonowe-hity', label: 'Sezonowe hity' },
      { href: '/sklep/must-have', label: 'Must-Have produkty' },
      { href: '/sklep/dzianina', label: 'Przytulne swetry' },
      { href: '/sklep/modne-akcesoria', label: 'Modne akcesoria' },
    ],
  },
  {
    title: 'WSPARCIE',
    links: [
      { href: '/kontakt', label: 'Kontakt' },
      { href: '/konto', label: 'Konto' },
      { href: '/dostawa-i-odbiory', label: 'Dostawa i odbior' },
      { href: '/zwroty', label: 'Zwroty' },
    ],
  },
  {
    title: 'INFO',
    links: [
      { href: '/o-nas', label: 'O nas' },
      { href: '/dla-firm', label: 'Współpraca' },
    ],
  },
];

export const legalLinks: LegalLink[] = [
  { href: '/polityka-prywatnosci', label: 'Polityka prywatności' },
  { href: '/regulamin', label: 'Regulamin' },
  { href: '/mapa-strony', label: 'Mapa strony' },
];