import type { CollectionBenefitsData } from '../types';

export const collectionBenefitsData: CollectionBenefitsData = {
  title: "Własna kolekcja",
  subtitle: "to inwestycja w przyszłość",
  description: {
    intro: "Własna kolekcja odzieży i gadżetów to nie tylko świetny sposób na promocję, ale także",
    highlight: "realne źródło przychodów.",
    conclusion: ""
  },
  callToAction: {
    title: "Jeśli chcesz, aby Twoja marka towarzyszyła ludziom",
    highlight: "na co dzień – czas ją pokazać!"
  },
  benefits: [
    {
      id: "1",
      text: "Wyróżnij swoją markę na rynku"
    },
    {
      id: "2", 
      text: "Stwórz unikalny styl odzieży i gadżetów"
    },
    {
      id: "3",
      text: "Zarabiaj, oferując produkty pod własnym brandem"
    },
    {
      id: "4",
      text: "Otrzymujesz pełne wsparcie – od projektu po produkcję"
    }
  ],
  productImage: {
    src: "/resources/Personalizowana bluza white 2.png",
    alt: "Personalizowana biała bluza z napisem DESIGN",
    width: 500,
    height: 600
  }
};