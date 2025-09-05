import { TermsOfServiceData } from '../types';

export const termsOfServiceData: TermsOfServiceData = {
  effectiveDate: "2025-07-04",
  companyInfo: {
    name: "HURTOWNIA TEKSTYLNA MODEO S.C. MAŁGORZATA PACAK, GRZEGORZ PACAK",
    address: "ul. Krakowska 45/44",
    city: "42-202 Częstochowa",
    region: "ŚLĄSKIE",
    nip: "5731658774",
    regon: "241453143",
    email: "sklep@modeo.pl",
    phone: "+48 664 733 063",
    foundedDate: "27 grudnia 1993"
  },
  contactInfo: {
    email: "sklep@modeo.pl",
    phone: "+48 664 733 063",
    address: "ul. Krakowska 45/44, 42-202 Częstochowa"
  },
  deliveryMethods: [
    { id: "courier", name: "Kurier (DPD, UPS, FedEx)", time: "1-2 dni robocze", cost: "od 15 PLN" },
    { id: "inpost", name: "Paczkomaty InPost", time: "1-2 dni robocze", cost: "od 12 PLN" },
    { id: "post", name: "Poczta Polska", time: "2-3 dni robocze", cost: "od 10 PLN" },
    { id: "pickup", name: "Odbiór osobisty", time: "natychmiast", cost: "bezpłatny" },
    { id: "express", name: "Dostawa ekspresowa", time: "24h", cost: "od 25 PLN" }
  ],
  paymentMethods: [
    { id: "online", name: "Płatność online (szybkie przelewy)" },
    { id: "card", name: "Płatność kartą płatniczą" },
    { id: "transfer", name: "Przelew tradycyjny" },
    { id: "cod", name: "Płatność za pobraniem (COD)" },
    { id: "blik", name: "BLIK" },
    { id: "deferred", name: "Płatność odroczona (firmy)" }
  ],
  productionTimes: [
    { id: "standard", category: "Produkty bez personalizacji", time: "1-3 dni robocze" },
    { id: "custom", category: "Produkty z personalizacją", time: "3-7 dni roboczych" },
    { id: "bulk", category: "Zamówienia duże (powyżej 50 szt.)", time: "7-14 dni roboczych" },
    { id: "express", category: "Zamówienia ekspresowe", time: "24-48 godzin" }
  ],
  sections: [
    {
      id: "general-info",
      title: "§1 Informacje ogólne",
      content: "",
      subsections: [
        {
          id: "owner-info",
          title: "Właściciel sklepu internetowego:",
          content: [
            "HURTOWNIA TEKSTYLNA MODEO S.C. MAŁGORZATA PACAK, GRZEGORZ PACAK",
            "Adres: ul. Krakowska 45/44, 42-202 Częstochowa, ŚLĄSKIE",
            "NIP: 5731658774 | REGON: 241453143",
            "Data powstania firmy: 27 grudnia 1993",
            "Email: sklep@modeo.pl",
            "Telefon: +48 664 733 063"
          ]
        },
        {
          id: "terms-scope",
          title: "1.1.",
          content: "Niniejszy Regulamin określa zasady korzystania ze sklepu internetowego dostępnego pod adresem modeo.pl, zwanego dalej 'Sklepem'."
        },
        {
          id: "specialization",
          title: "1.2. Sklep specjalizuje się w sprzedaży odzieży z personalizacją poprzez:",
          content: "",
          list: [
            { id: "screen-print", text: "Sitodruk na odzieży" },
            { id: "embroidery", text: "Haft komputerowy" },
            { id: "digital-print", text: "Nadruki cyfrowe" },
            { id: "standard-clothing", text: "Sprzedaż odzieży bez personalizacji" },
            { id: "other-services", text: "Pozostałe usługi tekstylne i reklamowe" }
          ]
        },
        {
          id: "availability",
          title: "1.3.",
          content: "Regulamin jest dostępny bezpłatnie na stronie głównej Sklepu i może być w każdej chwili pobrany, odtworzony i utrwalony."
        }
      ]
    },
    {
      id: "definitions",
      title: "§2 Definicje",
      content: "2.1. Używane w Regulaminie pojęcia oznaczają:",
      list: [
        { id: "seller", text: "Sprzedawca", description: "HURTOWNIA TEKSTYLNA MODEO S.C." },
        { id: "customer", text: "Klient/Kupujący", description: "osoba fizyczna, prawna lub jednostka organizacyjna dokonująca zakupu" },
        { id: "consumer", text: "Konsument", description: "osoba fizyczna dokonująca czynności niezwiązanych z działalnością gospodarczą" },
        { id: "entrepreneur", text: "Przedsiębiorca", description: "osoba fizyczna, prawna lub jednostka organizacyjna prowadząca działalność gospodarczą" },
        { id: "goods", text: "Towar", description: "odzież, artykuły tekstylne oraz usługi personalizacji oferowane w Sklepie" },
        { id: "order", text: "Zamówienie", description: "oświadczenie woli Klienta składane za pomocą formularza zamówieniowego" },
        { id: "sales-contract", text: "Umowa sprzedaży", description: "umowa zawarta między Sprzedawcą a Klientem za pośrednictwem Sklepu" },
        { id: "personalization", text: "Personalizacja", description: "nadruki, hafty lub inne formy oznakowania odzieży według projektu Klienta" }
      ]
    },
    {
      id: "usage-conditions",
      title: "§3 Warunki korzystania ze sklepu",
      content: "Korzystanie ze sklepu internetowego wymaga spełnienia określonych warunków technicznych oraz zobowiązuje do przestrzegania zasad bezprawnego korzystania z usług.",
      subsections: [
        {
          id: "technical-requirements",
          title: "3.1. Korzystanie ze Sklepu jest możliwe pod warunkiem:",
          content: "",
          list: [
            { id: "internet", text: "Posiadania dostępu do internetu" },
            { id: "browser", text: "Posiadania aktualnej przeglądarki internetowej" },
            { id: "cookies", text: "Włączenia obsługi cookies" },
            { id: "email", text: "Posiadania aktywnego konta e-mail" }
          ]
        },
        {
          id: "registration",
          title: "3.2.",
          content: "Klient może przeglądać asortyment i składać zamówienia bez rejestracji konta."
        },
        {
          id: "prohibited-content",
          title: "3.3. Zakazane jest dostarczanie treści o charakterze bezprawnym, w szczególności:",
          content: "",
          list: [
            { id: "copyright", text: "Naruszających prawa autorskie, znaki towarowe lub inne prawa własności intelektualnej" },
            { id: "offensive", text: "Zawierających treści obraźliwe, wulgarne lub dyskryminujące" },
            { id: "hate", text: "Propagujących nienawiść lub przemoc" },
            { id: "personal-rights", text: "Naruszających dobra osobiste osób trzecich" }
          ]
        },
        {
          id: "refusal-right",
          title: "",
          content: "Uwaga: Sprzedawca zastrzega sobie prawo do odmowy realizacji zamówienia zawierającego treści bezprawne lub naruszające niniejszy Regulamin.",
          highlight: true
        }
      ]
    },
    {
      id: "ordering-process",
      title: "§4 Składanie zamówień",
      content: "Proces składania zamówień w sklepie przebiega zgodnie z określoną procedurą, która zapewnia bezpieczeństwo i prawidłowość zawieranych transakcji.",
      subsections: [
        {
          id: "order-steps",
          title: "4.1. Proces składania zamówienia obejmuje następujące etapy:",
          content: "",
          list: [
            { id: "step1", text: "Wybór towaru i dodanie do koszyka" },
            { id: "step2", text: "Wypełnienie formularza zamówieniowego" },
            { id: "step3", text: "Wybór sposobu dostawy i płatności" },
            { id: "step4", text: "Akceptacja Regulaminu" },
            { id: "step5", text: "Potwierdzenie zamówienia" },
            { id: "step6", text: "Otrzymanie potwierdzenia e-mail" }
          ]
        },
        {
          id: "contract-formation",
          title: "4.2.",
          content: "Zamówienie stanowi ofertę zawarcia umowy sprzedaży. Umowa zostaje zawarta w momencie otrzymania przez Klienta e-maila potwierdzającego przyjęcie zamówienia do realizacji."
        },
        {
          id: "personalization-requirements",
          title: "4.3. W przypadku produktów z personalizacją, Klient zobowiązuje się do:",
          content: "",
          list: [
            { id: "design", text: "Dostarczenia projektu graficznego w odpowiedniej jakości i formacie" },
            { id: "rights", text: "Posiadania praw do wykorzystywanych materiałów graficznych" },
            { id: "approval", text: "Akceptacji próbki cyfrowej przed rozpoczęciem produkcji" }
          ]
        },
        {
          id: "cancellation-rights",
          title: "4.4. Sprzedawca zastrzega sobie prawo do anulowania zamówienia w przypadku:",
          content: "",
          list: [
            { id: "no-contact", text: "Braku możliwości skontaktowania się z Klientem" },
            { id: "false-data", text: "Podania nieprawdziwych danych" },
            { id: "no-stock", text: "Braku towaru w magazynie" },
            { id: "impossible-personalization", text: "Niemożności wykonania personalizacji zgodnie z życzeniami Klienta" }
          ]
        }
      ]
    },
    {
      id: "prices-payments",
      title: "§5 Ceny i płatności",
      content: "Poniżej przedstawiono zasady dotyczące cen produktów, kosztów dostawy oraz dostępnych metod płatności w sklepie.",
      subsections: [
        {
          id: "price-info",
          title: "5.1.",
          content: "Wszystkie ceny podane w Sklepie są cenami brutto (z podatkiem VAT) i wyrażone w złotych polskich (PLN)."
        },
        {
          id: "delivery-costs",
          title: "5.2.",
          content: "Cena towaru nie zawiera kosztów dostawy, które są naliczane dodatkowo i przedstawione Klientowi przed finalizacją zamówienia."
        },
        {
          id: "payment-transfer",
          title: "5.3.",
          content: "W przypadku płatności przelewem, towar zostanie wysłany po zaksięgowaniu wpłaty na koncie Sprzedawcy."
        },
        {
          id: "invoices",
          title: "5.4.",
          content: "Faktury VAT są wystawiane elektronicznie i wysyłane na adres e-mail podany w zamówieniu."
        },
        {
          id: "business-payment",
          title: "",
          content: "Dla firm: Oferujemy możliwość płatności odroczonej po wcześniejszym uzgodnieniu warunków współpracy. Skontaktuj się z nami w celu omówienia szczegółów.",
          highlight: true
        }
      ]
    },
    {
      id: "order-fulfillment",
      title: "§6 Realizacja zamówień i dostawa",
      content: "Realizacja zamówień odbywa się zgodnie z ustalonymi terminami produkcji i dostępnymi sposobami dostawy.",
      subsections: [
        {
          id: "free-delivery",
          title: "6.3.",
          content: "Bezpłatna dostawa przy zamówieniach powyżej 200 PLN (kurier standardowy)."
        },
        {
          id: "risk-transfer",
          title: "6.4.",
          content: "Ryzyko utraty lub uszkodzenia towaru przechodzi na Klienta w momencie wydania przesyłki przewoźnikowi."
        },
        {
          id: "package-inspection",
          title: "6.5.",
          content: "Klient zobowiązany jest do sprawdzenia przesyłki w obecności kuriera. W przypadku uszkodzenia opakowania należy sporządzić protokół szkody."
        }
      ]
    },
    {
      id: "withdrawal-right",
      title: "§7 Prawo odstąpienia od umowy",
      content: "Konsumentom przysługuje prawo odstąpienia od umowy zgodnie z przepisami prawa, z uwzględnieniem specyfiki produktów personalizowanych.",
      subsections: [
        {
          id: "general-right",
          title: "7.1.",
          content: "Konsument ma prawo odstąpić od umowy bez podania przyczyny w terminie 14 dni od dnia otrzymania towaru."
        },
        {
          id: "exceptions",
          title: "7.2. Prawo odstąpienia nie przysługuje w przypadku:",
          content: "",
          list: [
            { id: "personalized", text: "Produktów personalizowanych (z nadrukami, haftami, według indywidualnego projektu)" },
            { id: "custom-made", text: "Produktów wykonanych na specjalne zamówienie Konsumenta" },
            { id: "hygiene", text: "Produktów których nie można zwrócić ze względów higienicznych (bielizna, skarpety)" },
            { id: "perishable", text: "Produktów które ulegają szybkiemu zepsuciu lub mają krótki termin przydatności" }
          ]
        },
        {
          id: "withdrawal-process",
          title: "7.3. Aby odstąpić od umowy, Konsument musi poinformować Sprzedawcę o swojej decyzji:",
          content: "",
          list: [
            { id: "email", text: "E-mail: sklep@modeo.pl" },
            { id: "phone", text: "Telefon: +48 664 733 063" },
            { id: "mail", text: "Pocztą na adres: ul. Krakowska 45/44, 42-202 Częstochowa" }
          ]
        },
        {
          id: "withdrawal-form",
          title: "7.4.",
          content: "Konsument może skorzystać z wzoru formularza odstąpienia, ale nie jest to obowiązkowe."
        },
        {
          id: "return-costs",
          title: "7.5.",
          content: "Konsument ponosi bezpośrednie koszty zwrotu towaru. Sprzedawca zwróci zapłaconą cenę w terminie 14 dni od otrzymania oświadczenia o odstąpieniu."
        }
      ]
    },
    {
      id: "complaints-warranty",
      title: "§8 Reklamacje i gwarancja",
      content: "Sprzedawca zapewnia kompleksową obsługę reklamacji oraz ponosi odpowiedzialność za jakość produktów zgodnie z obowiązującymi przepisami.",
      subsections: [
        {
          id: "liability",
          title: "8.1.",
          content: "Sprzedawca ponosi odpowiedzialność za wady towaru na podstawie przepisów o rękojmi oraz udzielonej gwarancji."
        },
        {
          id: "complaint-contact",
          title: "8.2. Reklamację można zgłosić:",
          content: "",
          list: [
            { id: "email", text: "E-mail: sklep@modeo.pl" },
            { id: "phone", text: "Telefon: +48 664 733 063" },
            { id: "mail", text: "Pocztą na adres siedziby firmy" },
            { id: "personal", text: "Osobiście w siedzibie firmy" }
          ]
        },
        {
          id: "complaint-content",
          title: "Reklamacja powinna zawierać:",
          content: "",
          list: [
            { id: "customer-data", text: "Dane Klienta (imię, nazwisko, adres)" },
            { id: "order-number", text: "Numer zamówienia" },
            { id: "defect-description", text: "Opis wady lub niezgodności" },
            { id: "customer-request", text: "Żądanie Klienta (wymiana, naprawa, zwrot pieniędzy, obniżenie ceny)" },
            { id: "photos", text: "Zdjęcia wadliwego produktu (jeśli dotyczy)" },
            { id: "proof", text: "Dowód zakupu" }
          ]
        },
        {
          id: "complaint-processing",
          title: "8.3.",
          content: "Sprzedawca rozpatrzy reklamację w terminie 14 dni od jej otrzymania i udzieli odpowiedzi na piśmie lub e-mailem."
        },
        {
          id: "positive-complaint",
          title: "8.4. W przypadku pozytywnego rozpatrzenia reklamacji, Sprzedawca:",
          content: "",
          list: [
            { id: "exchange", text: "Wymieni towar na wolny od wad" },
            { id: "repair", text: "Usunie wadę (jeśli to możliwe)" },
            { id: "price-reduction", text: "Obniży cenę" },
            { id: "refund", text: "Zwróci zapłaconą cenę (w przypadku odstąpienia od umowy)" }
          ]
        }
      ]
    },
    {
      id: "data-protection",
      title: "§9 Ochrona danych osobowych",
      content: "Ochrona danych osobowych klientów jest priorytetem. Wszystkie dane są przetwarzane zgodnie z obowiązującymi przepisami o ochronie danych osobowych.",
      subsections: [
        {
          id: "data-controller",
          title: "9.1.",
          content: "Administratorem danych osobowych Klientów jest Sprzedawca."
        },
        {
          id: "gdpr-compliance",
          title: "9.2.",
          content: "Dane osobowe są przetwarzane zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO)."
        },
        {
          id: "privacy-policy-reference",
          title: "9.3.",
          content: "Szczegółowe informacje o przetwarzaniu danych osobowych zawarte są w Polityce Prywatności."
        },
        {
          id: "data-usage",
          title: "",
          content: "Dane osobowe są wykorzystywane wyłącznie w celu realizacji zamówień, obsługi klienta oraz prowadzenia działalności gospodarczej zgodnie z obowiązującym prawem.",
          highlight: true
        }
      ]
    },
    {
      id: "final-provisions",
      title: "§10 Postanowienia końcowe",
      content: "Niniejsze postanowienia końcowe określają zasady obowiązywania regulaminu oraz procedury rozwiązywania sporów.",
      subsections: [
        {
          id: "effective-date",
          title: "10.1.",
          content: "Niniejszy Regulamin wchodzi w życie z dniem 4 lipca 2025 roku."
        },
        {
          id: "changes",
          title: "10.2.",
          content: "Sprzedawca zastrzega sobie prawo do wprowadzania zmian w Regulaminie. O zmianach Klienci zostaną poinformowani poprzez publikację na stronie internetowej."
        },
        {
          id: "applicable-law",
          title: "10.3. W sprawach nieuregulowanych niniejszym Regulaminem stosuje się przepisy:",
          content: "",
          list: [
            { id: "civil-code", text: "Ustawy z dnia 23 kwietnia 1964 r. – Kodeks cywilny" },
            { id: "consumer-rights", text: "Ustawy z dnia 30 maja 2014 r. o prawach konsumenta" },
            { id: "electronic-services", text: "Ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną" }
          ]
        },
        {
          id: "jurisdiction",
          title: "10.4.",
          content: "Wszelkie spory wynikające z umów zawartych za pośrednictwem Sklepu będą rozstrzygane przez sąd właściwy dla siedziby Sprzedawcy."
        },
        {
          id: "alternative-resolution",
          title: "10.5.",
          content: "Konsument może skorzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń."
        }
      ]
    }
  ]
};