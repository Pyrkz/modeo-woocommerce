import { GiftCard } from '../types';

export const giftsData: GiftCard[] = [
  {
    id: 'walentynki',
    title: 'Walentynki',
    imagePath: '/hero-slider/modeo-bluza-kwiaty-we-wlosach.png',
    imageAlt: 'Personalizowane upominki na Walentynki',
    href: '/sklep/walentynki',
    badge: 'Okazja / okoliczność',
    size: 'large'
  },
  {
    id: 'dzien-mamy',
    title: 'Dzień Mamy',
    imagePath: '/hero-slider/modeo-dzien-mamy.png',
    imageAlt: 'Personalizowane upominki na Dzień Mamy',
    href: '/sklep/dzien-mamy',
    badge: 'Okoliczność',
    size: 'small'
  },
  {
    id: 'dzien-taty',
    title: 'Dzień Taty',
    imagePath: '/hero-slider/Tatinek-dzien-tatu.png',
    imageAlt: 'Personalizowane upominki na Dzień Taty',
    href: '/sklep/dzien-taty',
    badge: 'Dla Ojców',
    size: 'small'
  },
  {
    id: 'dzien-dziecka',
    title: 'Dzień Dziecka',
    imagePath: '/hero-slider/tendy chlopek-min.png',
    imageAlt: 'Personalizowane upominki na Dzień Dziecka',
    href: '/sklep/dzien-dziecka',
    badge: 'Dla Dzieci',
    size: 'large'
  },
  {
    id: 'zwierzaczki',
    title: 'Zwierzaczki',
    imagePath: '/hero-slider/modeo-piesek-bluza.png',
    imageAlt: 'Koszulki i bluzy ze zwierzączkami',
    href: '/sklep/zwierzaczki',
    size: 'large'
  },
  {
    id: 'polo-shirt',
    title: 'Polo Shirt',
    imagePath: '/hero-slider/modeo-pichcim-koszulka.png',
    imageAlt: 'Eleganckie koszulki polo z nadrukiem',
    href: '/sklep/polo',
    badge: 'Styl i elegancja',
    size: 'small'
  }
];

export const giftsContent = {
  badgeText: 'Personalizowane upominki na każdą okazję',
  title: 'Podaruj coś więcej niż prezent',
  subtitle: 'Ubrania, torby, naszulki czy dźban ceramiczny – w każdej ofercie znajdziemy wyjątkowy produkt, które możesz spersonalizować. Dzięki naszej, siłom, obsłudze najwyższej jakości przy pomocy osoba której chcesz sprawić radość może otrzymać niezapomnijany prezent.'
};