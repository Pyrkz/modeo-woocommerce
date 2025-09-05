import { DropshippingHeroData } from '../types';

export const dropshippingHeroData: DropshippingHeroData = {
  badge: "Dropshipping bez ryzyka",
  title: {
    part1: "Sprzedawaj",
    highlight: "pod własną marką",
    part2: "bez inwestycji w towar"
  },
  subtitle: "Projektuj, marketuj, sprzedawaj - my zajmiemy się produkcją, pakowaniem i wysyłką do Twoich klientów.",
  description: "Zero ryzyka, maksymalny zysk.",
  highlightText: "Zero ryzyka, maksymalny zysk.",
  image: {
    src: "/resources/modeo twoj partner b2b 2.jpg",
    alt: "Modeo - Twój partner B2B w dropshippingu"
  },
  features: [
    {
      id: "no-capital",
      icon: "💰",
      title: "Start bez kapitału",
      description: "Rozpocznij sprzedaż bez inwestycji w magazyn"
    },
    {
      id: "your-brand", 
      icon: "🏷️",
      title: "Twoja marka",
      description: "Produkty sprzedawaj pod własnym logo"
    },
    {
      id: "auto-fulfillment",
      icon: "📦",
      title: "Automatyczna realizacja", 
      description: "My pakujemy i wysyłamy do Twoich klientów"
    },
    {
      id: "high-margins",
      icon: "💎",
      title: "Wysokie marże",
      description: "Ustalasz ceny i zarabiasz na każdej sprzedaży"
    }
  ],
  benefits: [
    "Wysoka jakość",
    "Szybka realizacja", 
    "Konkurencyjne ceny"
  ]
};