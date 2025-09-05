import { BusinessPageData } from '../types';

export const businessPageData: BusinessPageData = {
  hero: {
    title: "Oferta dla firm",
    subtitle: "Profesjonalne rozwiązania dla Twojego biznesu",
    description: "Niezależnie od tego, czy chcesz stworzyć wyjątkową markę, potrzebujesz ubrań służbowych, czy firmowych gadżetów - dzięki temu oferowaniemu spełniasz każde potrzeby.",
    ctaButton: {
      text: "Poznaj ofertę",
      href: "/kontakt"
    },
    backgroundImage: "/resources/modeo dla firm-min.jpg"
  },
  features: [
    {
      id: "1",
      title: "Znakowanie firmowe",
      description: "Profesjonalne znakowanie odzieży i gadżetów reklamowych najwyższej jakości",
      icon: "🎨",
      benefits: [
        "Haft komputerowy",
        "Sitodruk",
        "Transfer termiczny",
        "Sublimacja"
      ]
    },
    {
      id: "2",
      title: "Ubrania robocze",
      description: "Wysokiej jakości odzież robocza i bhp dostosowana do specyfiki Twojej branży",
      icon: "👔",
      benefits: [
        "Certyfikowana odzież BHP",
        "Duży wybór modeli",
        "Personalizacja",
        "Konkurencyjne ceny"
      ]
    },
    {
      id: "3",
      title: "Gadżety reklamowe",
      description: "Szeroki wybór gadżetów promocyjnych z możliwością personalizacji",
      icon: "🎁",
      benefits: [
        "Kubki i termosy",
        "Długopisy i notesy",
        "Torby i plecaki",
        "Gadżety elektroniczne"
      ]
    },
    {
      id: "4",
      title: "Obsługa B2B",
      description: "Kompleksowa obsługa firm z dedykowanym opiekunem klienta",
      icon: "🤝",
      benefits: [
        "Indywidualna wycena",
        "Elastyczne terminy płatności",
        "Dedykowany opiekun",
        "Szybka realizacja"
      ]
    }
  ],
  stats: [
    {
      id: "1",
      value: "500",
      label: "Zadowolonych firm",
      suffix: "+"
    },
    {
      id: "2",
      value: "10000",
      label: "Zrealizowanych projektów",
      suffix: "+"
    },
    {
      id: "3",
      value: "24",
      label: "Godziny na przygotowanie wyceny",
      suffix: "h"
    },
    {
      id: "4",
      value: "99",
      label: "Zadowolenia klientów",
      suffix: "%"
    }
  ],
  testimonials: [
    {
      id: "1",
      name: "Anna Kowalska",
      company: "Tech Solutions Sp. z o.o.",
      position: "Dyrektor HR",
      content: "Współpraca z Modeo to sama przyjemność. Profesjonalne podejście, konkurencyjne ceny i zawsze terminowa realizacja.",
      rating: 5
    },
    {
      id: "2",
      name: "Marek Nowak",
      company: "Build Master",
      position: "Właściciel",
      content: "Zamówiłem odzież roboczą dla całej ekipy. Jakość wykonania i komfort noszenia przeszły moje oczekiwania.",
      rating: 5
    },
    {
      id: "3",
      name: "Katarzyna Wiśniewska",
      company: "Marketing Pro",
      position: "Account Manager",
      content: "Gadżety reklamowe od Modeo zawsze robią świetne wrażenie na naszych klientach. Polecam!",
      rating: 5
    }
  ],
  cta: {
    title: "Gotowy na współpracę?",
    description: "Skontaktuj się z nami już dziś i otrzymaj bezpłatną wycenę dopasowaną do potrzeb Twojej firmy.",
    primaryButton: {
      text: "Zapytaj o wycenę",
      href: "/kontakt"
    },
    secondaryButton: {
      text: "Zobacz produkty",
      href: "/sklep"
    }
  }
};