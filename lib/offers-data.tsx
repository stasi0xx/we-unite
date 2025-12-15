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
    description: string;
    icon: LucideIcon;
    benefits: string[];
    showcase?: ShowcaseItem[]; // <--- NOWE POLE (Opcjonalne)
};

export const OFFERS: Record<string, Offer> = {
    "ai-social-responder": {
        id: "ai-social-responder",
        title: "AI Social Responder",
        subtitle: "Twój wirtualny handlowiec 24/7",
        description: `
            W świecie social media czas reakcji to pieniądz. Jeśli klient pisze o 2:00 w nocy, a Ty odpisujesz o 9:00 rano – już go straciłeś.
            
            Nasz AI Social Responder to nie jest zwykły chatbot. To zaawansowany model językowy, który rozumie kontekst, intencje i potrafi prowadzić naturalną rozmowę.
            Nie tylko odpowiada na pytania, ale aktywnie sprzedaje, umawia spotkania w Twoim kalendarzu i zbiera dane kontaktowe.
        `,
        icon: BellIcon,
        benefits: [
            "Natychmiastowa reakcja na wiadomości (Instagram, FB, WhatsApp)",
            "Automatyczna kwalifikacja leadów",
            "Zapisywanie spotkań bezpośrednio w Google Calendar",
            "Naturalny język, nie do odróżnienia od człowieka"
        ]
    },
    "automatyzacja-biznesu": {
        id: "automatyzacja-biznesu",
        title: "Automatyzacja Biznesu",
        subtitle: "Odzyskaj 20h tygodniowo, eliminując nudne zadania",
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
        subtitle: "Szybkość, która daje przewagę w Google",
        description: `
            Większość stron to "wizytówki", które nie sprzedają. My tworzymy platformy oparte o Next.js 16 i React Server Components.
            
            Co to oznacza? Twoja strona ładuje się w ułamku sekundy. Jest bezpieczna, skalowalna i kocha ją Google. To nie jest kolejny szablon na WordPressie, który "zamula" po zainstalowaniu trzech wtyczek.
        `,
        icon: Globe,
        benefits: [
            "Wynik 95-100/100 w Google PageSpeed Insights",
            "Pełna optymalizacja SEO technicznego",
            "Nowoczesny design (Tailwind CSS 4 + Framer Motion)",
            "CMS dostosowany do Twoich potrzeb (Sanity/Strapi)"
        ],
        // --- TUTAJ DODAJESZ SWOJE PROJEKTY ---
        showcase: [
            {
                title: "Esencja - Kreatorzy Reklamy",
                description: "Nowoczesna strona agencji reklamowej. Minimalizm, animacje scrollowania i pełna optymalizacja pod konwersję.",
                image: "/case1.webp", // Używam pliku, który już masz
                link: "https://esencja.net"
            },
            {
                title: "Pierwsze Trzeźwe Pokolenie",
                description: "Strona fundacji Bartłomeja Glinki, która walczy z uzanleżnieniami wśród młodzieży",
                image: "/page2.webp", // ZMIEŃ NA SWÓJ PLIK (np. /projekty/projekt2.png)
                link: "https://www.pierwszetrzezwepokolenie.pl/"
            },
            {
                title: "E-commerce Beauty",
                description: "Sklep internetowy oparty o Shopify Headless. Niesamowita szybkość i unikalny design marki.",
                image: "/page3.webp", // ZMIEŃ NA SWÓJ PLIK
                link: "https://www.checzgdynia.com/"
            }
        ]
    },
    "social-media-marketing": {
        id: "social-media-marketing",
        title: "Social Media Marketing",
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