import { BrandingIndustry } from '../types';

export const brandingIndustriesData: BrandingIndustry[] = [
  {
    id: 'firmy',
    title: 'Firmy',
    description: 'Profesjonalne znakowanie dla przedsiębiorstw',
    detailedDescription: 'Kompleksowe rozwiązania brandingowe dla firm każdej wielkości. Od wizytówek po oznakowanie siedziby.',
    iconPath: '/icons/branding-business.svg',
    href: '/znakowanie/dla-branz/firmy',
    category: 'business',
    keywords: ['firma', 'biznes', 'korporacja', 'przedsiębiorstwo', 'office', 'biuro'],
    products: ['koszulki polo', 'bluzy', 'koszule', 'torby', 'długopisy', 'kubki'],
    services: ['hafiarstwo', 'sitodruk', 'grawer', 'sublimacja', 'transfer']
  },
  {
    id: 'szkoly',
    title: 'Szkoły',
    description: 'Znakowanie dla placówek edukacyjnych',
    detailedDescription: 'Specjalne rozwiązania dla szkół, przedszkoli i uczelni. Odzież szkolna i akcesoria edukacyjne.',
    iconPath: '/icons/branding-school.svg',
    href: '/znakowanie/dla-branz/szkoly',
    category: 'education',
    keywords: ['szkoła', 'edukacja', 'uczniowie', 'nauczyciele', 'przedszkole', 'uczelnia'],
    products: ['koszulki', 'bluzy szkolne', 'plecaki', 'zeszyty', 'długopisy', 'torby'],
    services: ['hafiarstwo', 'sitodruk', 'nadruki', 'personalizacja', 'embossing']
  },
  {
    id: 'kluby-sportowe',
    title: 'Kluby sportowe',
    description: 'Profesjonalna odzież sportowa z logo',
    detailedDescription: 'Wysokiej jakości stroje sportowe i akcesoria dla klubów, drużyn i organizacji sportowych.',
    iconPath: '/icons/branding-sports.svg',
    href: '/znakowanie/dla-branz/kluby-sportowe',
    category: 'sports',
    keywords: ['sport', 'drużyna', 'klub', 'piłka', 'fitness', 'trening', 'zawody'],
    products: ['koszulki sportowe', 'dresy', 'spodenki', 'bluzy', 'czapki', 'torby sportowe'],
    services: ['hafiarstwo', 'sitodruk', 'sublimacja', 'flock', 'flex']
  },
  {
    id: 'restauracje',
    title: 'Restauracje',
    description: 'Znakowanie dla branży gastronomicznej',
    detailedDescription: 'Profesjonalna odzież dla restauracji, kawiarni, barów i cateringów. Funkcjonalność i styl.',
    iconPath: '/icons/branding-restaurant.svg',
    href: '/znakowanie/dla-branz/restauracje',
    category: 'food',
    keywords: ['restauracja', 'kuchnia', 'szef kuchni', 'kelner', 'gastronomia', 'catering'],
    products: ['fartuchy', 'czapki kuchenne', 'koszulki polo', 'koszule', 'ręczniki', 'serwetki'],
    services: ['hafiarstwo', 'sitodruk', 'grawer', 'personalizacja', 'sublimacja']
  },
  {
    id: 'eventy',
    title: 'Eventy',
    description: 'Gadżety promocyjne na wydarzenia',
    detailedDescription: 'Materiały promocyjne i gadżety na konferencje, targi, festiwale i wydarzenia specjalne.',
    iconPath: '/icons/branding-events.svg',
    href: '/znakowanie/dla-branz/eventy',
    category: 'events',
    keywords: ['event', 'konferencja', 'targi', 'festiwal', 'promocja', 'marketing'],
    products: ['koszulki', 'torby', 'kubki', 'długopisy', 'smycze', 'roll-upy'],
    services: ['sitodruk', 'hafiarstwo', 'nadruki', 'grawer', 'sublimacja', 'gadżety']
  }
];

export const brandingIndustriesSectionData = {
  title: 'Znakowanie dla branż',
  description: 'Profesjonalne rozwiązania brandingowe dostosowane do specyfiki różnych branż i sektorów biznesowych.',
  industries: brandingIndustriesData
};