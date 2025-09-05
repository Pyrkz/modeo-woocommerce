import { PrivacyPolicyData } from '../types';

export const privacyPolicyData: PrivacyPolicyData = {
  lastUpdated: "2024-09-02",
  companyInfo: {
    name: "HURTOWNIA TEKSTYLNA MODEO S.C. MAŁGORZATA PACAK, GRZEGORZ PACAK",
    address: "ul. Krakowskiej 45/44",
    city: "42-202 Częstochowa",
    region: "ŚLĄSKIE",
    nip: "5731658774",
    regon: "241453143",
    email: "sklep@modeo.pl",
    phone: "+48 530-448-345"
  },
  contactInfo: {
    email: "sklep@modeo.pl",
    phone: "+48 530-448-345"
  },
  sections: [
    {
      id: "general-info",
      title: "1. Informacje ogólne",
      content: [
        "Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod adresem: modeo.pl",
        "Operatorem serwisu oraz Administratorem danych osobowych jest HURTOWNIA TEKSTYLNA MODEO S.C. MAŁGORZATA PACAK, GRZEGORZ PACAK z siedzibą przy ul. Krakowskiej 45/44, 42-202 Częstochowa, ŚLĄSKIE, NIP: 5731658774, REGON: 241453143.",
        "Operator jest Administratorem Twoich danych osobowych w odniesieniu do danych podanych dobrowolnie w Serwisie."
      ]
    },
    {
      id: "data-processing-purposes",
      title: "2. Cele przetwarzania danych osobowych",
      content: "Serwis wykorzystuje dane osobowe w następujących celach:",
      subsections: [
        {
          id: "purposes-list",
          title: "",
          content: "",
          list: [
            { id: "newsletter", text: "Prowadzenie newslettera" },
            { id: "comments", text: "Prowadzenie systemu komentarzy" },
            { id: "contact-form", text: "Obsługa zapytań przez formularz" },
            { id: "shipping", text: "Przygotowanie, pakowanie, wysyłka towarów" },
            { id: "services", text: "Realizacja zamówionych usług" }
          ]
        },
        {
          id: "data-acquisition",
          title: "Sposób pozyskiwania informacji:",
          content: [
            "Poprzez dobrowolnie wprowadzone w formularzach dane, które zostają wprowadzone do systemów Operatora",
            "Poprzez zapisywanie w urządzeniach końcowych plików cookie (tzw. 'ciasteczka')"
          ]
        }
      ]
    },
    {
      id: "security-methods",
      title: "3. Wybrane metody ochrony danych stosowane przez Operatora",
      content: "Operator stosuje następujące metody ochrony danych osobowych:",
      subsections: [
        {
          id: "ssl-encryption",
          title: "Szyfrowanie SSL",
          content: "Miejsca logowania i wprowadzania danych osobowych są chronione w warstwie transmisji (certyfikat SSL)."
        },
        {
          id: "encrypted-database",
          title: "Zaszyfrowana baza danych",
          content: "Dane osobowe przechowywane w bazie danych są zaszyfrowane w taki sposób, że jedynie Operator może je odczytać."
        },
        {
          id: "hashed-passwords",
          title: "Hashowane hasła",
          content: "Hasła użytkowników są przechowywane w postaci hashowanej – nie można odwrócić tego procesu."
        },
        {
          id: "regular-updates",
          title: "Regularne aktualizacje",
          content: "Operator regularnie aktualizuje oprogramowanie i wykonuje kopie bezpieczeństwa."
        }
      ]
    },
    {
      id: "hosting",
      title: "4. Hosting",
      content: [
        "Serwis jest hostowany (technicznie utrzymywany) na serwerach operatora: Hostinger",
        "Firma hostingowa w celu zapewnienia niezawodności technicznej prowadzi logi na poziomie serwera. Zapisowi mogą podlegać:"
      ],
      subsections: [
        {
          id: "server-logs",
          title: "",
          content: "",
          list: [
            { id: "url-resources", text: "zasoby określone identyfikatorem URL (adresy żądanych zasobów – stron, plików)" },
            { id: "request-time", text: "czas nadejścia zapytania" },
            { id: "response-time", text: "czas wysłania odpowiedzi" },
            { id: "client-station", text: "nazwę stacji klienta – identyfikacja realizowana przez protokół HTTP" },
            { id: "http-errors", text: "informacje o błędach jakie nastąpiły przy realizacji transakcji HTTP" },
            { id: "referer-url", text: "adres URL strony poprzednio odwiedzanej przez użytkownika (referer link)" },
            { id: "browser-info", text: "informacje o przeglądarce użytkownika" },
            { id: "ip-address", text: "informacje o adresie IP" },
            { id: "diagnostic-info", text: "informacje diagnostyczne związane z procesem samodzielnego zamawiania usług" },
            { id: "email-handling", text: "informacje związane z obsługą poczty elektronicznej" }
          ]
        }
      ]
    },
    {
      id: "user-rights",
      title: "5. Twoje prawa i dodatkowe informacje o sposobie wykorzystania danych",
      content: "Zgodnie z obowiązującymi przepisami przysługują Ci następujące prawa oraz informacje dotyczące przetwarzania danych:",
      subsections: [
        {
          id: "data-recipients",
          title: "Odbiorcy danych osobowych:",
          content: [
            "W niektórych sytuacjach Administrator ma prawo przekazywać Twoje dane osobowe innym odbiorcom, jeśli będzie to niezbędne do wykonania zawartej z Tobą umowy lub do zrealizowania obowiązków ciążących na Administratorze. Dotyczy to takich grup odbiorców:"
          ],
          list: [
            { id: "hosting-company", text: "firma hostingowa na zasadzie powierzenia" },
            { id: "couriers", text: "kurierzy" },
            { id: "payment-operators", text: "operatorzy płatności" },
            { id: "authorized-employees", text: "upoważnieni pracownicy i współpracownicy" },
            { id: "marketing-companies", text: "firmy świadczące usługi marketingu" }
          ]
        },
        {
          id: "data-retention",
          title: "Okres przechowywania danych:",
          content: "",
          list: [
            { id: "contract-data", text: "Dane umowne: nie dłużej niż jest to konieczne do wykonania związanych z nimi czynności określonych osobnymi przepisami" },
            { id: "marketing-data", text: "Dane marketingowe: nie będą przetwarzane dłużej niż przez 3 lata" }
          ]
        },
        {
          id: "user-rights-list",
          title: "Przysługuje Ci prawo żądania od Administratora:",
          content: "",
          list: [
            { id: "access-right", text: "Prawo dostępu – do danych osobowych Ciebie dotyczących" },
            { id: "rectification-right", text: "Prawo sprostowania – poprawienia nieprawidłowych danych" },
            { id: "erasure-right", text: "Prawo usunięcia – usunięcia danych w określonych przypadkach" },
            { id: "restriction-right", text: "Prawo ograniczenia – ograniczenia przetwarzania danych" },
            { id: "portability-right", text: "Prawo przenoszenia – otrzymania danych w formacie strukturalnym" },
            { id: "objection-right", text: "Prawo sprzeciwu – wobec przetwarzania w celach marketingowych" }
          ]
        },
        {
          id: "complaint-right",
          title: "",
          content: [
            "Prawo do skargi: Na działania Administratora przysługuje skarga do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.",
            "Podanie danych osobowych jest dobrowolne, lecz niezbędne do obsługi Serwisu.",
            "W stosunku do Ciebie mogą być podejmowane czynności polegające na zautomatyzowanym podejmowaniu decyzji, w tym profilowaniu w celu świadczenia usług w ramach zawartej umowy oraz w celu prowadzenia przez Administratora marketingu bezpośredniego.",
            "Dane osobowe nie są przekazywane od krajów trzecich w rozumieniu przepisów o ochronie danych osobowych. Oznacza to, że nie przesyłamy ich poza teren Unii Europejskiej."
          ]
        }
      ]
    },
    {
      id: "form-information",
      title: "6. Informacje w formularzach",
      content: [
        "Serwis zbiera informacje podane dobrowolnie przez użytkownika, w tym dane osobowe, o ile zostaną one podane",
        "Serwis może zapisać informacje o parametrach połączenia (oznaczenie czasu, adres IP)",
        "Serwis może zapisać informację ułatwiającą powiązanie danych w formularzu z adresem e-mail użytkownika",
        "Dane podane w formularzu są przetwarzane w celu wynikającym z funkcji konkretnego formularza"
      ]
    },
    {
      id: "administrator-logs",
      title: "7. Logi Administratora",
      content: "Informacje o zachowaniu użytkowników w serwisie mogą podlegać logowaniu. Dane te są wykorzystywane w celu administrowania serwisem."
    },
    {
      id: "marketing-techniques",
      title: "8. Istotne techniki marketingowe",
      content: "W ramach świadczenia usług Operator może stosować następujące techniki marketingowe:",
      subsections: [
        {
          id: "google-analytics",
          title: "Google Analytics",
          content: [
            "Operator stosuje analizę statystyczną ruchu na stronie, poprzez Google Analytics (Google Inc. z siedzibą w USA). Operator nie przekazuje do operatora tej usługi danych osobowych, a jedynie zanonimizowane informacje.",
            "Zarządzanie preferencjami: https://www.google.com/ads/preferences/"
          ]
        },
        {
          id: "facebook-pixel",
          title: "Piksel Facebooka",
          content: "Operator korzysta z piksela Facebooka. Ta technologia powoduje, że serwis Facebook (Facebook Inc. z siedzibą w USA) wie, że dana osoba w nim zarejestrowana korzysta z Serwisu. Operator nie przekazuje żadnych dodatkowych danych osobowych serwisowi Facebook."
        }
      ]
    },
    {
      id: "cookies-information",
      title: "9. Informacja o plikach cookies",
      content: [
        "Serwis korzysta z plików cookies. Pliki cookies (tzw. 'ciasteczka') stanowią dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu i przeznaczone są do korzystania ze stron internetowych Serwisu."
      ],
      subsections: [
        {
          id: "cookies-purposes",
          title: "Pliki cookies wykorzystywane są w następujących celach:",
          content: "",
          list: [
            { id: "session-maintenance", text: "utrzymanie sesji użytkownika Serwisu (po zalogowaniu)" },
            { id: "marketing-purposes", text: "realizacji celów marketingowych określonych powyżej" }
          ]
        },
        {
          id: "cookies-types",
          title: "Rodzaje plików cookies:",
          content: "",
          list: [
            { id: "session-cookies", text: 'Cookies "sesyjne" - Pliki tymczasowe, przechowywane do czasu wylogowania lub wyłączenia przeglądarki' },
            { id: "persistent-cookies", text: 'Cookies "stałe" - Przechowywane przez określony czas lub do ich usunięcia przez użytkownika' }
          ]
        },
        {
          id: "cooperating-entities",
          title: "",
          content: "Współpracujące podmioty: Pliki cookies mogą być również wykorzystywane przez firmy współpracujące z operatorem: Google (Google Inc.), Facebook (Facebook Inc.), Twitter (Twitter Inc.) – wszystkie z siedzibą w USA."
        }
      ]
    },
    {
      id: "cookies-management",
      title: "10. Zarządzanie plikami cookies – jak w praktyce wyrażać i cofać zgodę?",
      content: [
        "Jeśli użytkownik nie chce otrzymywać plików cookies, może zmienić ustawienia przeglądarki. Zastrzegamy, że wyłączenie obsługi plików cookies niezbędnych dla procesów uwierzytelniania, bezpieczeństwa, utrzymania preferencji użytkownika może utrudnić, a w skrajnych przypadkach może uniemożliwić korzystanie ze stron www."
      ],
      subsections: [
        {
          id: "browser-instructions",
          title: "Instrukcje dla poszczególnych przeglądarek:",
          content: "",
          list: [
            { id: "desktop-browsers", text: "Przeglądarki komputerowe: Edge, Internet Explorer, Chrome, Safari, Firefox, Opera" },
            { id: "mobile-devices", text: "Urządzenia mobilne: Android, Safari (iOS), Windows Phone" },
            { id: "help", text: "Pomoc: Szczegółowe instrukcje znajdziesz w pomocy lub dokumentacji Twojej przeglądarki internetowej" }
          ]
        },
        {
          id: "cookies-warning",
          title: "",
          content: "Uwaga: Ograniczenia stosowania plików cookies mogą wpłynąć na niektóre funkcjonalności dostępne na stronach internetowych Serwisu."
        }
      ]
    }
  ]
};