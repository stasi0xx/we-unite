import { BellIcon, Zap, Globe, Share2, Code2, LucideIcon } from "lucide-react";

// Definicja pojedynczego projektu w portfolio
export type ShowcaseItem = {
    title: string;
    description: string;
    image: string; // Ścieżka do pliku w /public (np. "/projects/site1.jpg")
    link?: string; // Opcjonalny link do wersji live
};

export type Offer = {
    id: string;
    title: string;
    subtitle: string;
    price: string;
    priceId: string;
    description: string;
    icon: LucideIcon;
    benefits: string[];
    showcase?: ShowcaseItem[]; // <--- NOWE POLE (Opcjonalne)
};

export const OFFERS: Record<string, Offer> = {
    "ai-social-responder": {
        id: "ai-social-responder",
        title: "AI Social Responder",
        subtitle: "Twój wirtualny handlowiec dostępny 24/7",
        price: "99zł",
        priceId:"price_1ShXjx469LQK5IDgj790o5ZM",
        // ZMIANA TREŚCI SPRZEDAŻOWEJ
        description: `
            Tracisz klientów, bo nie odpisujesz natychmiast? W erze TikToka i Instagrama czas reakcji to pieniądz. Jeśli klient pisze o 2:00 w nocy, a Ty odpisujesz o 9:00 rano – konkurencja już go przejęła.
            Nasz model językowy rozumie kontekst, slang i intencje. To nie jest zwykły chatbot "wciśnij 1", to Twój najlepszy pracownik.
        `,
        icon: BellIcon,
        benefits: [
            "Wdrożenie systemu już za symboliczne 1 PLN",
            "Obsługa do 1000 wiadomości w pakiecie za 99 PLN/mc",
            "Natychmiastowa reakcja (poniżej 3 sekund)",
            "Zapisywanie spotkań bezpośrednio w Twoim kalendarzu Google",
            "Działa na Instagramie, Messengerze i WhatsAppie"
        ]
    },
    "automatyzacja-biznesu": {
        id: "automatyzacja-biznesu",
        title: "Automatyzacja Biznesu",
        subtitle: "Odzyskaj 20h tygodniowo, eliminując nudne zadania",
        price: "99zł",
        priceId:"price_1ShXjx469LQK5IDgj790o5ZM",
        description: `
            Czy wiesz, że 30% czasu pracy w biurze to "przeklejanie danych"? Łączymy systemy, których używasz na co dzień (Gmail, Slack, Trello, CRM, Excel), w jeden spójny organizm.
            
            Tworzymy scenariusze w Make.com i n8n, które same wystawiają faktury, wysyłają umowy, przypominają o płatnościach i raportują wyniki. Ty zajmujesz się strategią, roboty "klikaniem".
        `,
        icon: Zap,
        benefits: [
            "Integracja CRM z systemami fakturowymi",
            "Automatyczny onboarding klientów",
            "Raportowanie wyników sprzedaży na Slack/Email",
            "Eliminacja błędów ludzkich przy wprowadzaniu danych"
        ]
    },
    "inteligentne-strony": {
        id: "inteligentne-strony",
        title: "Inteligentne Strony WWW",
        subtitle: "Szybkość Next.js + Skuteczność Handlowca",
        price: "99zł",
        priceId:"price_1ShXjx469LQK5IDgj790o5ZM",
        description: `
            Większość stron to martwe wizytówki, które tylko generują koszty. My tworzymy platformy, które aktywnie wspierają Twój biznes.
            
            Nie używamy gotowców z WordPressa, które "zamulają" po miesiącu. Budujemy w technologii Next.js 16+ (tej samej, z której korzysta Netflix czy HBO).
            
            Nasze pakiety:
            🟢 Start (1500 PLN): Ultraszybka strona wizytówka. Idealna dla usług lokalnych. Nowoczesny design, RWD, optymalizacja pod Google.
            🟣 Pro (5000 PLN): "Inteligentna Strona". Zintegrowana z CRM, z wbudowanym systemem rezerwacji, blogiem i pełną analityką zachowań użytkownika.
        `,
        icon: Globe,
        benefits: [
            "Wersja Start (1500 zł) lub Pro z automatyzacją (3500 zł)",
            "Pełna optymalizacja SEO technicznego na start",
            "CMS (Panel zarządzania), który jest prostszy niż Word"
        ],
        showcase: [
            // ... (Twoje projekty: Esencja, Fundacja, Checz - zostają bez zmian)
            {
                title: "Esencja - Kreatorzy Reklamy",
                description: "Nowoczesna strona agencji reklamowej. Minimalizm, animacje scrollowania i pełna optymalizacja pod konwersję.",
                image: "/case1.webp",
                link: "https://esencja.net"
            },
            {
                title: "Pierwsze Trzeźwe Pokolenie",
                description: "Strona fundacji Bartłomeja Glinki, która walczy z uzanleżnieniami wśród młodzieży",
                image: "/page2.webp",
                link: "https://www.pierwszetrzezwepokolenie.pl/"
            },
            {
                title: "Checz Gdynia",
                description: "Strona sportowej prosta i skuteczna",
                image: "/page3.webp",
                link: "https://www.checzgdynia.com/"
            }
        ]
    },
    "social-media-marketing": {
        id: "social-media-marketing",
        title: "Social Media Marketing",
        price: "99zł",
        priceId:"price_1ShXjx469LQK5IDgj790o5ZM",
        subtitle: "Zasięgi budowane technologią, a nie przypadkiem",
        description: `
            Publikowanie "na czuja" to strata czasu. Wdrażamy systemy, które automatyzują dystrybucję treści.
            
            Jeden materiał wideo zamieniamy na 10 formatów (Shorts, Reels, TikTok, Post na LinkedIn, Tweet) i publikujemy automatycznie w najlepszych godzinach. Twoja marka jest wszędzie, a Ty nagrywasz tylko raz.
        `,
        icon: Share2,
        benefits: [
            "Automatyczny recykling treści (Content Repurposing)",
            "Analityka zasięgów z wielu platform w jednym miejscu",
            "Planowanie publikacji z wyprzedzeniem",
            "Spójny wizerunek marki we wszystkich kanałach"
        ]
    },
    "dedykowane-aplikacje": {
        id: "dedykowane-aplikacje",
        title: "Dedykowane Aplikacje",
        price: "99zł",
        priceId:"price_1ShXjx469LQK5IDgj790o5ZM",
        subtitle: "SaaS i Panele Klienta szyte na miarę",
        description: `
            Gotowe pudełkowe rozwiązania Cię ograniczają? Budujemy dedykowane aplikacje webowe, panele klienta (B2B) i systemy SaaS.
            
            Korzystamy z najnowocześniejszego stacku: Next.js, Supabase (PostgreSQL), Stripe. Bezpieczeństwo i skalowalność są w standardzie. To rozwiązania dla firm, które chcą zdominować swoją niszę technologiczną.
        `,
        icon: Code2,
        benefits: [
            "Pełna własność kodu i bazy danych",
            "Skalowalna architektura (Serverless)",
            "Integracje z płatnościami (Stripe/Przelewy24)",
            "Zaawansowane zarządzanie rolami i uprawnieniami"
        ]
    }
};