import type { CorporateWearHeroProps } from '../types';

export const corporateWearHeroData: CorporateWearHeroProps = {
  badge: "Odkryj nasze kolekcje",
  title: "Profesjonalna",
  subtitle: "odzież firmowa dla Twojego zespołu",
  description: "Podkreśl wizerunek swojej marki i zapewnij komfort pracownikom. Oferujemy odzież reklamową, roboczą i eventową z możliwością personalizacji.",
  features: [
    {
      icon: "👥",
      title: "Obsługa premium"
    },
    {
      icon: "🎨", 
      title: "Personalizacja"
    },
    {
      icon: "🚚",
      title: "Szybka dostawa"
    },
    {
      icon: "🏢",
      title: "Obsługa B2B"
    }
  ],
  stats: [
    {
      value: "500+",
      label: "Zadowolonych firm"
    },
    {
      value: "50k+",
      label: "Sztuk rocznie"
    },
    {
      value: "48h+",
      label: "Czas realizacji"
    }
  ],
  heroImage: "/resources/corporate-team.jpg",
  heroImageAlt: "Zespół w firmowej odzieży Modeo"
};