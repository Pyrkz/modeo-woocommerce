import type { CustomCollectionData } from '../types';

export const customCollectionData: CustomCollectionData = {
  hero: {
    title: 'Stwórz Własną Markę Odzieży i Gadżetów!',
    subtitle: 'Projektuj. Sprzedawaj. Buduj rozpoznawalność swojej marki.',
    cta: {
      text: 'Złóż zapytanie o ofertę',
      href: '/kontakt'
    },
    description: [
      'Masz pomysł na własną kolekcję odzieży lub gadżetów? A może chcesz stworzyć unikalną linię produktów dla swojej firmy? W Modeo pomożemy Ci w tym! Oferujemy kompleksową obsługę - od projektu graficznego, przez wybór odpowiednich produktów, aż po realizację zamówienia.',
      'Dzięki nam Twoja marka zyska niepowtarzalny charakter, a klienci na długo zapamiętają Twoją firmę. Nie czekaj - skontaktuj się z nami już dziś i przekonaj się, jak łatwo możesz stworzyć własną kolekcję!',
      'Zajmujemy się różnymi rodzajami projektów - od prostych nadruków na koszulkach, poprzez skomplikowane projekty haftu na bluzach, aż po gadżety reklamowe z logo Twojej firmy.'
    ]
  },
  images: {
    mainImage: {
      src: '/resources/modeo dla firm-min.jpg',
      alt: 'Modeo B2B koszulka',
      priority: true
    },
    showcaseImages: [
      {
        src: '/resources/modeo twoj partner b2b 2.jpg',
        alt: 'Zespół projektowy'
      },
      {
        src: '/resources/projektowanie-grafik-na-ubrania-i-gadzety.webp',
        alt: 'Odzież z nadrukiem'
      }
    ]
  },
  processSteps: {
    title: 'Jak to działa? - Poznaj proces',
    subtitle: 'krok po kroku',
    steps: [
      {
        id: 1,
        icon: '📞',
        title: 'Skontaktuj się z nami',
        description: 'Masz już pomysł? Świetnie! A jeśli jeszcze go szukasz, pomożemy Ci znaleźć najlepsze rozwiązanie dla Twojej marki.',
        stepLabel: 'krok'
      },
      {
        id: 2,
        icon: '✨',
        title: 'Masz projekt graficzny?',
        description: 'Prześlij go nam! Jeśli nie - nie martw się. Nasz zespół grafików przygotuje dla Ciebie profesjonalny projekt, który idealnie odda charakter Twojej marki.',
        stepLabel: 'krok'
      },
      {
        id: 3,
        icon: '👕',
        title: 'Produkcja i personalizacja',
        description: 'Realizujemy zamówienie zgodnie z ustalonymi. Odzież, gadżety, metki, opakowania - wszystko tak, jak sobie tego życzysz.',
        stepLabel: 'krok'
      },
      {
        id: 4,
        icon: '🚚',
        title: 'Gotowe produkty dostarczamy do Ciebie',
        description: 'lub Twoich klientów. Chcesz sprzedawać od razu? Zajmiemy się też logistyką lub dropshippingiem.',
        stepLabel: 'krok'
      }
    ],
    bottomText: 'Nie musisz znać się na produktci - od tego jesteśmy my. Ty skupiasz się na marce, my zajmujemy się resztą!'
  },
  productCategories: {
    title: 'Co możesz stworzyć w swojej',
    subtitle: 'kolekcji?',
    categories: [
      {
        id: 1,
        title: 'Koszulki',
        description: 'Klasyczne i sportowe'
      },
      {
        id: 2,
        title: 'Bluzy',
        description: 'Z kapturem i bez'
      },
      {
        id: 3,
        title: 'Kurtki',
        description: 'Na każdą pogodę'
      },
      {
        id: 4,
        title: 'Czapki',
        description: 'Stylowe nakrycia głowy'
      },
      {
        id: 5,
        title: 'Softshelle',
        description: 'Funkcjonalne i wygodne'
      },
      {
        id: 6,
        title: 'Polary',
        description: 'Ciepłe i miękkie'
      },
      {
        id: 7,
        title: 'Plecaki i torby',
        description: 'Do pracy i podróży'
      },
      {
        id: 8,
        title: 'Ubrania sportowe',
        description: 'Dla aktywnych'
      },
      {
        id: 9,
        title: 'Ubrania robocze',
        description: 'Bezpieczne i trwałe'
      },
      {
        id: 10,
        title: 'Akcesoria',
        description: 'Dopełniające stylu'
      }
    ],
    image: {
      src: '/hero-slider/tendy chlopek-min.png',
      alt: 'Młody mężczyzna w białej koszulce z nadrukiem słońca i napisem FOTOSYNTEZA',
      priority: false
    }
  },
  businessPartner: {
    badge: 'Dlaczego my?',
    title: 'Twój Partner w Biznesie',
    subtitle: 'Modowym',
    description: 'Łączymy pasję do wysokiej jakości z elastycznością biznesową. Jesteśmy partnerem, który pomoże Ci zbudować silną markę odzieżową.',
    features: [
      {
        id: 1,
        icon: '🛒',
        title: 'Bez kosztów magazynowych',
        description: 'Nie musisz inwestować w magazyn, zapełniowość towarów czy składkę logistyki. My zajmujemy się wszystkim.'
      },
      {
        id: 2,
        icon: '🎨',
        title: 'Mój design, nasze doświadczenie',
        description: 'Dostarczasz projekt, my dzielimy się wiedzą z najnowszymi możliwościami wykonania najlepszego koszulka garnitur.'
      },
      {
        id: 3,
        icon: '⚡',
        title: 'Elastyczne zamówienia',
        description: 'Od pojedynczych sztuk do dużej serii. Dostosowujemy się do potrzeb Twojego biznesu i skali sprzedaży.'
      },
      {
        id: 4,
        icon: '🛠️',
        title: 'Pełne wsparcie techniczne',
        description: 'Pomagamy w przygotowaniu projektów graficznych, dobierze materiałów i optymalizacji kosztów produkcji.'
      },
      {
        id: 5,
        icon: '⚡',
        title: 'Szybka realizacja',
        description: 'Standardowy czas realizacji to 5-7 dni roboczych. W przypadku pilnych zamówień oferujemy ekspresową realizację.'
      },
      {
        id: 6,
        icon: '💰',
        title: 'Konkurencyjne ceny',
        description: 'Oferujemy atrakcyjne ceny hurtowe, które pozwalają na osiągnięcie dobrej marży przy konkurencyjnych cenach dla klientów.'
      }
    ],
    image: {
      src: '/resources/modeo-koszulki-dla-twojej-marki.webp',
      alt: 'Kolorowe koszulki na wieszakach - różnorodne kolory dla Twojej marki',
      priority: false
    }
  }
};