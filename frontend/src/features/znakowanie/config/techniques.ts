import { Technique } from '../types/techniques';

// Enhanced technique data with SEO and expert information
export interface TechniqueConfig extends Technique {
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  expertName?: string;
  contactTitle: string;
  contactDescription: string;
  contactTagline: string;
  ogImage?: string;
}

export const techniquesConfig: Record<string, TechniqueConfig> = {
  haft: {
    id: 'haft',
    name: 'HAFT',
    slug: 'haft',
    image: '/znakowanie/haft-min.png',
    description: 'Haft maszynowy - eleganckie wykończenie nadające prestiżu',
    href: '/znakowanie/haft',
    seoTitle: 'Haft Komputerowy - Modeo.pl | Profesjonalny haft na odzieży',
    seoDescription: 'Profesjonalny haft komputerowy na odzieży i akcesoriach. Wysokiej jakości hafty na koszulkach, bluzkach, czapkach i odzieży roboczej. ✓ Precyzyjne wykonanie ✓ Trwałość ✓ Szybka realizacja',
    keywords: 'haft komputerowy, haft na odzieży, haft logo, hafty na koszulkach, haft na czapkach, profesjonalny haft, znakowanie haftem',
    expertName: 'Anna Pawlak',
    contactTitle: 'Skontaktuj się z ekspertem haftu',
    contactDescription: 'Wypełnij formularz, a nasz specjalista ds. produkcji i haftu komputerowego skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci stworzyć precyzyjne hafty, które będą trwałe i estetyczne.',
    contactTagline: 'Potrzebujesz haftu komputerowego?',
    ogImage: '/rodzaje-nadrukow/haft komputerowy-min.jpg'
  },
  sitodruk: {
    id: 'sitodruk',
    name: 'SITODRUK',
    slug: 'sitodruk',
    image: '/znakowanie/sitodruk-min.png',
    description: 'Tradycyjna technika nadruku o najwyższej jakości',
    href: '/znakowanie/sitodruk',
    seoTitle: 'Sitodruk - Modeo.pl | Profesjonalny sitodruk na odzieży',
    seoDescription: 'Profesjonalny sitodruk na odzieży i tekstyliach. Najwyższa jakość nadruków sitodrukiem. ✓ Trwałe kolory ✓ Duże nakłady ✓ Konkurencyjne ceny',
    keywords: 'sitodruk, nadruki sitodrukiem, sitodruk na koszulkach, sitodruk reklamowy, profesjonalny sitodruk, znakowanie sitodrukiem',
    expertName: 'Anna Pawlak',
    contactTitle: 'Skontaktuj się z ekspertem sitodruku',
    contactDescription: 'Wypełnij formularz, a nasz specjalista ds. sitodruku skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci stworzyć trwałe nadruki sitodrukiem w najlepszej jakości.',
    contactTagline: 'Potrzebujesz sitodruku?',
    ogImage: '/rodzaje-nadrukow/sitodruk-min.jpg'
  },
  dtf: {
    id: 'dtf',
    name: 'DTF',
    slug: 'dtf',
    image: '/znakowanie/dtf-min.png',
    description: 'Direct to Film - nowoczesna technologia transferu',
    href: '/znakowanie/dtf',
    seoTitle: 'DTF - Direct to Film - Modeo.pl | Nowoczesny nadruk DTF',
    seoDescription: 'Nowoczesna technologia DTF (Direct to Film) - najnowocześniejszy sposób nadruku na tekstyliach. ✓ Wysokie detale ✓ Żywe kolory ✓ Uniwersalność materiałów',
    keywords: 'DTF, direct to film, nadruk DTF, nowoczesny nadruk, dtf nadruk, transfer dtf, znakowanie dtf',
    expertName: 'Anna Pawlak',
    contactTitle: 'Skontaktuj się z ekspertem DTF',
    contactDescription: 'Wypełnij formularz, a nasz specjalista ds. technologii DTF skontaktuje się z Tobą w ciągu 24 godzin. Poznaj najnowocześniejszą metodę nadruku na tekstyliach.',
    contactTagline: 'Potrzebujesz nadruku DTF?',
    ogImage: '/rodzaje-nadrukow/dtf-min.jpg'
  },
  sublimacja: {
    id: 'sublimacja',
    name: 'SUBLIMACJA',
    slug: 'sublimacja',
    image: '/znakowanie/sublimacja-nowa-min.png',
    description: 'Sublimacja - pełnokolorowe nadruki o żywych kolorach',
    href: '/znakowanie/sublimacja',
    seoTitle: 'Sublimacja - Modeo.pl | Pełnokolorowe nadruki sublimacyjne',
    seoDescription: 'Profesjonalne nadruki sublimacyjne - pełnokolorowe, trwałe nadruki o najwyższej jakości. ✓ Nieograniczone kolory ✓ Foto jakość ✓ Trwałość',
    keywords: 'sublimacja, nadruk sublimacyjny, sublimacja na odzieży, pełnokolorowy nadruk, sublimacja cyfrowa, znakowanie sublimacją',
    expertName: 'Anna Pawlak',
    contactTitle: 'Skontaktuj się z ekspertem sublimacji',
    contactDescription: 'Wypełnij formularz, a nasz specjalista ds. sublimacji skontaktuje się z Tobą w ciągu 24 godzin. Poznaj możliwości pełnokolorowych nadruków sublimacyjnych.',
    contactTagline: 'Potrzebujesz sublimacji?',
    ogImage: '/rodzaje-nadrukow/sublimacja-min.jpg'
  },
  flex: {
    id: 'flex',
    name: 'FLEX',
    slug: 'flex',
    image: '/znakowanie/flex-min.png',
    description: 'Flex - elastyczne folie do precyzyjnego znakowania',
    href: '/znakowanie/flex',
    seoTitle: 'Flex - Modeo.pl | Precyzyjne znakowanie folią flex',
    seoDescription: 'Profesjonalne znakowanie folią flex - precyzyjne, trwałe nadruki. ✓ Dokładne kontury ✓ Szeroka paleta kolorów ✓ Elastyczność',
    keywords: 'flex, folia flex, znakowanie flex, nadruk flex, folia termotransferowa flex, znakowanie folią',
    expertName: 'Anna Pawlak',
    contactTitle: 'Skontaktuj się z ekspertem FLEX',
    contactDescription: 'Wypełnij formularz, a nasz specjalista ds. znakowania folią flex skontaktuje się z Tobą w ciągu 24 godzin. Poznaj możliwości precyzyjnego znakowania.',
    contactTagline: 'Potrzebujesz znakowania FLEX?',
    ogImage: '/rodzaje-nadrukow/flex-min.jpg'
  },
  flock: {
    id: 'flock',
    name: 'FLOCK',
    slug: 'flock',
    image: '/znakowanie/flock-min.png',
    description: 'Flock - aksamitne wykończenie o unikalnej teksturze',
    href: '/znakowanie/flock',
    seoTitle: 'Flock - Modeo.pl | Aksamitne znakowanie folią flock',
    seoDescription: 'Profesjonalne znakowanie folią flock - aksamitna tekstura, eleganckie wykończenie. ✓ Unikalna tekstura ✓ Elegancki wygląd ✓ Trwałość',
    keywords: 'flock, folia flock, znakowanie flock, aksamitny nadruk, folia aksamitna, znakowanie folią flock',
    expertName: 'Anna Pawlak',
    contactTitle: 'Skontaktuj się z ekspertem FLOCK',
    contactDescription: 'Wypełnij formularz, a nasz specjalista ds. znakowania folią flock skontaktuje się z Tobą w ciągu 24 godzin. Poznaj eleganckie możliwości aksamitnego wykończenia.',
    contactTagline: 'Potrzebujesz znakowania FLOCK?',
    ogImage: '/rodzaje-nadrukow/flock-min.jpg'
  }
};

// Helper function to get technique config
export const getTechniqueConfig = (slug: string): TechniqueConfig | undefined => {
  return techniquesConfig[slug];
};

// Helper function to generate metadata for technique pages
export const generateTechniqueMetadata = (slug: string) => {
  const config = getTechniqueConfig(slug);
  
  if (!config) {
    throw new Error(`Technique configuration not found for slug: ${slug}`);
  }

  return {
    title: config.seoTitle,
    description: config.seoDescription,
    keywords: config.keywords,
    openGraph: {
      title: config.seoTitle,
      description: config.seoDescription,
      type: 'website',
      locale: 'pl_PL',
      images: config.ogImage ? [{
        url: config.ogImage,
        width: 1200,
        height: 630,
        alt: `${config.name} - Modeo`,
      }] : undefined,
    },
    alternates: {
      canonical: config.href
    },
    robots: {
      index: true,
      follow: true,
    }
  };
};