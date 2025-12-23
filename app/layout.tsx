import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import {CookieConsent} from "@/components/CookieConsent";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
// Definicja fontów
const fontHeading = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-heading", // To nazwa zmiennej, którą złapiemy w CSS
    display: "swap",
});

const fontBody = Inter({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
});

const fontMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_URL
    ? `https://${process.env.NEXT_PUBLIC_URL}`
    : "https://weunite.pl"; // Zmień na swoją domenę, jeśli inna

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: "WeUnite | Automatyzacja Sprzedaży AI & Strony WWW",
        template: "%s | WeUnite" // To sprawia, że podstrony będą miały format: "Tytuł Podstrony | WeUnite"
    },
    description: "Zwiększ sprzedaż dzięki AI Social Responderom (wdrożenie od 1 zł) i inteligentnym stronom WWW. Automatyzacja marketingu i biznesu. Sprawdź ofertę.",
    keywords: [
        "automatyzacja ai",
        "social media responder",
        "chatbot instagram",
        "strony www gdynia",
        "automatyzacja sprzedaży",
        "boty sprzedażowe",
        "next.js developer"
    ],
    authors: [{ name: "WeUnite", url: baseUrl }],
    creator: "WeUnite",
    openGraph: {
        type: "website",
        locale: "pl_PL",
        url: baseUrl,
        title: "WeUnite | Twoja sprzedaż na autopilocie",
        description: "AI odpisuje klientom w 3 sekundy. Wdrożenie już od 1 zł. Sprawdź nasze rozwiązania.",
        siteName: "WeUnite",
        images: [
            {
                url: "/og-image.jpg", // Warto dodać plik og-image.jpg (1200x630px) do folderu public
                width: 1200,
                height: 630,
                alt: "WeUnite - Automatyzacja AI",
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService", // Google lubi ten typ dla usług B2B/Agencji
        "name": "WeUnite",
        "image": "https://weunite.pl/hero-logo.webp", // Link do logo (musi być pełny URL)
        "description": "Agencja automatyzacji AI i software house. Oferujemy auto-respondery do social mediów, dedykowane strony WWW i systemy CRM.",
        "url": "https://weunite.pl",
        "telephone": "+48537732320", // Format bez spacji dla maszyn
        "email": "info@weunite.pl",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "ul. Gdyńska G/9",
            "addressLocality": "Gdańsk",
            "postalCode": "80-340",
            "addressCountry": "PL"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "54.406", // Przykładowe współrzędne dla Gdańska Oliwy/Żabianki (ul. Gdyńska)
            "longitude": "18.573"
        },
        "priceRange": "1 PLN - 3500 PLN", // Zakres cen, o którym wspominałeś
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "09:00",
            "closes": "17:00"
        },
        "sameAs": [
            "https://www.instagram.com/weunite.pl/",
             // Dodaj jeśli masz
        ]
    };
    return (
        // W Tailwind 4 dark mode działa często automatycznie, ale wymuśmy klasę 'dark' dla pewności i stylu
        <html lang="pl" className="dark">
        <body
            className={`${fontHeading.variable} ${fontBody.variable} ${fontMono.variable} antialiased bg-background text-foreground smooth-scroll`}
        >

        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Navbar />
        <SmoothScroll>
            {children}
        </SmoothScroll>
        <CookieConsent />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ProfessionalService", // lub LocalBusiness
                    "name": "WeUnite",
                    "image": "https://weunite.pl/logo.png",
                    "url": "https://weunite.pl",
                    "telephone": "+48537732320",
                    "email": "info@weunite.pl",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "ul. Gdyńska G/9",
                        "addressLocality": "Gdańsk",
                        "postalCode": "80-340",
                        "addressCountry": "PL"
                    },
                    "priceRange": "1500 PLN - 3500 PLN",
                    "openingHoursSpecification": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday"
                        ],
                        "opens": "09:00",
                        "closes": "17:00"
                    },
                    "sameAs": [
                        "https://www.instagram.com/weunite.pl/",
                    ]
                })
            }}
        />
        </body>
        </html>
    );
}