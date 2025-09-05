import { GiftOccasion, GiftCategorySection } from '../types';

export const giftOccasionsData: GiftOccasion[] = [
  // Holidays
  {
    id: 'boze-narodzenie',
    title: 'Boże Narodzenie',
    description: 'Świąteczne prezenty pełne ciepła',
    iconPath: '/icons/gift-christmas.svg',
    href: '/na-prezent/boze-narodzenie',
    category: 'holidays'
  },
  {
    id: 'mikolajki',
    title: 'Mikołajki',
    description: 'Magiczne prezenty dla najmłodszych',
    iconPath: '/icons/gift-santa.svg',
    href: '/na-prezent/mikolajki',
    category: 'holidays'
  },
  {
    id: 'nowy-rok-sylwester',
    title: 'Nowy Rok / Sylwester',
    description: 'Wyjątkowe prezenty na Nowy Rok',
    iconPath: '/icons/gift-newyear.svg',
    href: '/na-prezent/nowy-rok-sylwester',
    category: 'holidays'
  },
  {
    id: 'walentynki',
    title: 'Walentynki',
    description: 'Romantyczne prezenty dla ukochanych',
    iconPath: '/icons/gift-valentine.svg',
    href: '/na-prezent/walentynki',
    category: 'holidays'
  },
  {
    id: 'dzien-kobiet',
    title: 'Dzień Kobiet',
    description: 'Wyjątkowe prezenty dla Pań',
    iconPath: '/icons/gift-womens-day.svg',
    href: '/na-prezent/dzien-kobiet',
    category: 'holidays'
  },
  {
    id: 'slub',
    title: 'Ślub',
    description: 'Pamiątkowe prezenty ślubne',
    iconPath: '/icons/gift-wedding.svg',
    href: '/na-prezent/slub',
    category: 'personal'
  },

  // Family occasions
  {
    id: 'dla-rodziny',
    title: 'Dla rodziny',
    description: 'Prezenty dla całej rodziny',
    iconPath: '/icons/gift-family.svg',
    href: '/na-prezent/dla-rodziny',
    category: 'family'
  },
  {
    id: 'dzien-mamy',
    title: 'Dzień Mamy',
    description: 'Serdeczne prezenty dla Mamy',
    iconPath: '/icons/gift-mothers-day.svg',
    href: '/na-prezent/dzien-mamy',
    category: 'family'
  },
  {
    id: 'dzien-taty',
    title: 'Dzień Taty',
    description: 'Wyjątkowe prezenty dla Taty',
    iconPath: '/icons/gift-fathers-day.svg',
    href: '/na-prezent/dzien-taty',
    category: 'family'
  },
  {
    id: 'dzien-dziecka',
    title: 'Dzień Dziecka',
    description: 'Radosne prezenty dla dzieci',
    iconPath: '/icons/gift-childrens-day.svg',
    href: '/na-prezent/dzien-dziecka',
    category: 'family'
  },
  {
    id: 'dzien-babci',
    title: 'Dzień Babci',
    description: 'Serdeczne prezenty dla Babci',
    iconPath: '/icons/gift-grandma.svg',
    href: '/na-prezent/dzien-babci',
    category: 'family'
  },
  {
    id: 'dzien-dziadka',
    title: 'Dzień Dziadka',
    description: 'Wyjątkowe prezenty dla Dziadka',
    iconPath: '/icons/gift-grandpa.svg',
    href: '/na-prezent/dzien-dziadka',
    category: 'family'
  },
  {
    id: 'dzien-chlopaka',
    title: 'Dzień Chłopaka',
    description: 'Praktyczne prezenty dla mężczyzn',
    iconPath: '/icons/gift-mens-day.svg',
    href: '/na-prezent/dzien-chlopaka',
    category: 'personal'
  },

  // Personal occasions
  {
    id: 'urodziny',
    title: 'Urodziny',
    description: 'Personalizowane prezenty urodzinowe',
    iconPath: '/icons/gift-birthday.svg',
    href: '/na-prezent/urodziny',
    category: 'personal'
  },
  {
    id: 'imieniny',
    title: 'Imieniny',
    description: 'Tradycyjne prezenty imieninowe',
    iconPath: '/icons/gift-nameday.svg',
    href: '/na-prezent/imieniny',
    category: 'personal'
  },
  {
    id: 'rocznice',
    title: 'Rocznice',
    description: 'Pamiątkowe prezenty na rocznicę',
    iconPath: '/icons/gift-anniversary.svg',
    href: '/na-prezent/rocznice',
    category: 'personal'
  },
  {
    id: 'parapetowka',
    title: 'Parapetówka',
    description: 'Praktyczne prezenty na nowe mieszkanie',
    iconPath: '/icons/gift-housewarming.svg',
    href: '/na-prezent/parapetowka',
    category: 'personal'
  },
  {
    id: 'dzien-nauczyciela',
    title: 'Dzień Nauczyciela',
    description: 'Podziękowania dla nauczycieli',
    iconPath: '/icons/gift-teacher.svg',
    href: '/na-prezent/dzien-nauczyciela',
    category: 'personal'
  },
  {
    id: 'zwierzaki',
    title: 'Zwierzaki',
    description: 'Akcesoria dla miłośników zwierząt',
    iconPath: '/icons/gift-pets.svg',
    href: '/na-prezent/zwierzaki',
    category: 'personal'
  }
];

export const giftCategorySections: GiftCategorySection[] = [
  {
    category: 'holidays',
    title: 'Święta i okazje',
    occasions: giftOccasionsData.filter(occasion => occasion.category === 'holidays')
  },
  {
    category: 'family',
    title: 'Dla rodziny',
    occasions: giftOccasionsData.filter(occasion => occasion.category === 'family')
  },
  {
    category: 'personal',
    title: 'Okazje osobiste',
    occasions: giftOccasionsData.filter(occasion => occasion.category === 'personal')
  }
];

export const giftOccasionsSectionContent = {
  title: 'Znajdź idealny prezent',
  subtitle: 'Wybierz okazję i odkryj spersonalizowane produkty, które sprawiają radość w każdej ważnej chwili'
};