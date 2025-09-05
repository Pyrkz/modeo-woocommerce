import { BusinessServicesProps } from '../types/services';

export const businessServicesData: BusinessServicesProps = {
  badge: "Wybierz najlepszą opcję dla siebie",
  title: "Kompleksowe rozwiązania",
  subtitle: "dla Twojej firmy",
  description: "Niezależnie od wielkości Twojego biznesu, mamy rozwiązanie które pomoże Ci osiągnąć cele",
  services: [
    {
      id: "1",
      title: "Stwórz własną markę odzieży i gadżetów",
      description: "Nasz pomysł na własną linię ubrań lub gadżetów? My zajmiemy się produkcją i personalizacją, a Ty możesz budować rozpoznawalną markę i własną kolekcję.",
      icon: "🏷️",
      link: {
        text: "Dowiedz się więcej",
        href: "/dla-firm/wlasna-kolekcja"
      }
    },
    {
      id: "2", 
      title: "Profesjonalna odzież firmowa dla Twojego zespołu",
      description: "Podkreśl wizerunek swojej marki i zapewnij komfort pracownikom. Oferujemy odzież reklamową, roboczą i eventową z możliwością personalizacji - od koszulek po odzież premium.",
      icon: "👔",
      link: {
        text: "Dowiedz się więcej",
        href: "/sklep/ubrania-robocze"
      }
    },
    {
      id: "3",
      title: "Sprzedawaj pod własną marką bez inwestycji w towar",
      description: "Rozpocznij sprzedaż odzieży i gadżetów bez kosztów magazynowych i prefikacji. Ty promujujesz markę, my zajmujemy się resztą - produkcją i wysyłką do Twoich klientów.",
      icon: "📈",
      link: {
        text: "Dowiedz się więcej",
        href: "/kontakt"
      }
    },
    {
      id: "4",
      title: "Atrakcyjne warunki współpracy B2B dla firm i dystrybutorów",
      description: "Dołącz do programu B2B i korzystaj ze specjalnych cen hurtowych, dedykowanego opiekuna oraz szerokiej oferty odzieży i gadżetów reklamowych.",
      icon: "🤝",
      link: {
        text: "Dowiedz się więcej",
        href: "/kontakt"
      }
    },
    {
      id: "5",
      title: "Profesjonalne znakowanie odzieży i gadżetów",
      description: "Zamów trwałe i estetyczne nadruki lub hafty na odzieży i gadżetach. Oferujemy nowoczesne technologie znakowania oraz możliwość personalizacji nawet niewielkich serii.",
      icon: "🎨",
      link: {
        text: "Dowiedz się więcej",
        href: "/znakowanie"
      }
    }
  ]
};