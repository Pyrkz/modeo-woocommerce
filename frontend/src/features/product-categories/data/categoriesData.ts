import type { ProductCategoriesSection } from '../types';

export const productCategoriesData: ProductCategoriesSection = {
  title: 'Odzież dla Twojego zespołu – wygoda, styl i profesjonalny wizerunek',
  subtitle: 'Zadbaj o dresscode',
  description: 'Profesjonalne rozwiązania i wysokiej jakości materiały. Wybierz kategorię i znajdź produkty idealne dla Twojego biznesu.',
  categories: [
    {
      id: 'koszulki-polo',
      title: 'Koszulki i polówki z Twoim Logo',
      description: 'Idealne dla każdej firmy',
      image: '/homepage/Koszulki Polo Modeo.jpg',
      imageAlt: 'Koszulki polo z logo firmy',
      href: '/znakowanie/koszulki',
      priority: true,
      size: 'large',
      className: 'col-span-1 row-span-2 md:col-span-2 md:row-span-2'
    },
    {
      id: 'bluzy-polary',
      title: 'BLUZY, POLARY I KURTKI',
      description: 'Ciepłe i wygodne dla zespołu',
      image: '/categories-images/Sklep modeo - polary.webp',
      imageAlt: 'Bluzy, polary i kurtki firmowe',
      href: '/znakowanie/bluzy',
      priority: true,
      size: 'medium',
      className: 'col-span-1 row-span-1'
    },
    {
      id: 'akcesoria',
      title: 'AKCESORIA',
      description: 'Plecaki, torby i inne dodatki',
      image: '/categories-images/Sklep modeo plecaki 3-min.jpg',
      imageAlt: 'Firmowe akcesoria - plecaki i torby',
      href: '/znakowanie/akcesoria',
      priority: true,
      size: 'medium',
      className: 'col-span-1 row-span-1'
    },
    {
      id: 'odziez-robocza',
      title: 'ODZIEŻ ROBOCZA I BHP',
      description: 'Bezpieczeństwo i jakość w pracy z zaawansowanymi rozwiązaniami',
      image: '/resources/ubrania-robocze.webp',
      imageAlt: 'Odzież robocza i BHP',
      href: '/znakowanie/ubrania-robocze',
      priority: false,
      size: 'medium',
      className: 'col-span-1 row-span-1'
    },
    {
      id: 'zestawy-prezentowe',
      title: 'ZESTAWY PREZENTOWE DLA PRACOWNIKÓW I KONTRAHENTÓW',
      description: 'Idealne na święta, jubileusze i eventy.',
      image: '/resources/modeo-personalizowane-koszulki-polo-2.webp',
      imageAlt: 'Zestawy prezentowe dla firm',
      href: '/dla-firm/wlasna-kolekcja',
      priority: false,
      size: 'large',
      className: 'col-span-1 row-span-1 md:col-span-2 md:row-span-1'
    }
  ]
};