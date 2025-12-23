import { MetadataRoute } from "next";
import { OFFERS } from "@/lib/offers-data";

export default function sitemap(): MetadataRoute.Sitemap {
    // ZMIEŃ NA SWOJĄ DOMENĘ (bez ukośnika na końcu)
    // Jeśli masz zmienną środowiskową, możesz użyć: process.env.NEXT_PUBLIC_URL || 'https://weunite.pl'
    const baseUrl = "https://weunite.pl";

    // 1. Zdefiniuj strony statyczne (te, które na pewno istnieją)
    const staticRoutes = [
        "",                     // Strona główna
        "/regulamin",           // Regulamin
        "/polityka-prywatnosci" // Polityka prywatności
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.5, // Strona główna ma najwyższy priorytet
    }));

    // 2. Dynamicznie wygeneruj linki do ofert (pobierane z Twojego pliku offers-data)
    // Dzięki temu, jak dodasz nową usługę w kodzie, sitemap zaktualizuje się sama!
    const offerRoutes = Object.keys(OFFERS).map((slug) => ({
        url: `${baseUrl}/oferta/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const, // Oferty mogą się zmieniać częściej
        priority: 0.8,
    }));

    // 3. Połącz wszystko w jedną tablicę
    return [...staticRoutes, ...offerRoutes];
}