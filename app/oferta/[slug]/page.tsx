import { notFound } from "next/navigation";
import { OFFERS } from "@/lib/offers-data";
import { Footer } from "@/components/Footer";
import { CheckCircle2, ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Spotlight } from "@/components/ui/spotlight-new";
import { PinContainer } from "@/components/ui/3d-pin";
import type { Metadata } from "next";
import { HeroVisualizer } from "@/components/hero-visualizer";
import { LeadForm } from "@/components/LeadForm";
import { FAQ } from "@/components/FAQ";
import { TrustedBy } from "@/components/TrustedBy";

// --- 1. FUNKCJA POMOCNICZA ---
const getSafeHostname = (link?: string) => {
    if (!link || !link.startsWith("http")) return "Projekt";
    try {
        return new URL(link).hostname;
    } catch (e) {
        return "Projekt";
    }
};

// 2. Generowanie ścieżek statycznych (SSG)
export function generateStaticParams() {
    return Object.keys(OFFERS).map((slug) => ({
        slug: slug,
    }));
}

// 3. Metadata dla SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const offer = OFFERS[slug];

    if (!offer) {
        return {
            title: "Oferta nie znaleziona | WeUnite",
            robots: { index: false }
        };
    }

    const seoTitle = `${offer.title} - Automatyzacja i Cennik`;
    const seoDescription = offer.subtitle.length > 150
        ? offer.subtitle
        : `${offer.subtitle}. Sprawdź jak ${offer.title} może zaoszczędzić Twój czas. Wdrożenie automatyzacji w Twojej firmie.`;

    const ogImage = offer.showcase && offer.showcase.length > 0
        ? offer.showcase[0].image
        : "/og-default.jpg";

    return {
        title: seoTitle,
        description: seoDescription,
        openGraph: {
            title: seoTitle,
            description: seoDescription,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: offer.title,
                },
            ],
        },
        alternates: {
            canonical: `/oferta/${slug}`,
        }
    };
}

// 4. Główny komponent strony
export default async function OfferPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const offer = OFFERS[slug];

    if (!offer) {
        notFound();
    }

    return (
        // FIX: Dodano overflow-x-hidden na poziomie main, aby uciąć wszystko co wystaje
        <main className="min-h-screen bg-background text-foreground relative overflow-x-hidden font-sans w-full">

            <Spotlight />
            {/* FIX: Tło ograniczone do max-w-full */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0 max-w-full" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20 w-full">

                {/* BACK BUTTON */}
                <div className="mb-8 pl-2">
                    <Link
                        href="/#features"
                        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Wróć do oferty
                    </Link>
                </div>

                {/* HEADER */}
                <div className="flex flex-col items-center text-center space-y-8 mb-16 md:mb-24 w-full">
                    <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-white max-w-3xl break-words px-2">
                        {offer.title}
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed px-2">
                        {offer.subtitle}
                    </p>

                    {/* FIX: Kontener dla Visualizera z overflow-hidden */}
                    <div className="w-full max-w-2xl mx-auto mb-8 overflow-hidden px-2 md:px-0">
                        <HeroVisualizer slug={slug} />
                    </div>
                </div>

                {/* GŁÓWNA TREŚĆ */}
                <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-24 w-full">
                    <div className="md:col-span-3 space-y-8 w-full min-w-0">

                        {/* A. SEKCJA DEDYKOWANA (AI Social Responder) */}
                        {slug === 'ai-social-responder' && (
                            <div className="my-8 md:my-12 space-y-12 w-full">

                                {/* A. TRANSPARENTNY CENNIK */}
                                <div className="w-full">
                                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 px-2">
                                        <Zap className="text-yellow-400 shrink-0" />
                                        Jasne zasady rozliczeń
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                        {/* KARTA 1 */}
                                        <div className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-green-500/50 transition-colors relative overflow-hidden group w-full">
                                            <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                                                START
                                            </div>
                                            <div className="mb-4">
                                                <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Krok 1: Wdrożenie</p>
                                                <div className="flex items-baseline gap-1 mt-2">
                                                    <span className="text-3xl md:text-4xl font-bold text-white">5 PLN</span>
                                                    <span className="text-xs md:text-sm text-zinc-500">jednorazowo</span>
                                                </div>
                                            </div>
                                            <ul className="space-y-2 text-sm text-zinc-300">
                                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5"/> <span>Pełna konfiguracja konta</span></li>
                                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5"/> <span>Podpięcie pod fanpage/IG</span></li>
                                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5"/> <span>Testy działania</span></li>
                                            </ul>
                                        </div>

                                        {/* KARTA 2 */}
                                        <div className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors w-full">
                                            <div className="mb-4">
                                                <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Krok 2: Utrzymanie</p>
                                                <div className="flex items-baseline gap-1 mt-2">
                                                    <span className="text-3xl md:text-4xl font-bold text-white">99 PLN</span>
                                                    <span className="text-xs md:text-sm text-zinc-500">/ miesięcznie</span>
                                                </div>
                                            </div>
                                            <ul className="space-y-2 text-sm text-zinc-300">
                                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5"/> <span>Do 1000 wiadomości / mc</span></li>
                                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5"/> <span>Raporty skuteczności</span></li>
                                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5"/> <span>Wsparcie techniczne 24/7</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="text-xs text-zinc-500 mt-3 text-center md:text-left px-2">
                                        * Brak ukrytych kosztów. Możesz zrezygnować w dowolnym momencie.
                                    </p>
                                </div>

                                {/* B. PROCES WDROŻENIA - REFAKTORYZACJA NA FLEXBOX (BEZ ABSOLUTE) */}
                                <div className="w-full">
                                    <h3 className="text-2xl font-bold text-white mb-6 px-2">Jak zaczynamy?</h3>

                                    {/* Nowa struktura: Lista zamiast pozycjonowania absolutnego */}
                                    <div className="space-y-8 w-full px-2">

                                        {/* KROK 1 */}
                                        <div className="flex gap-4 md:gap-6">
                                            <div className="flex flex-col items-center">
                                                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-black ring-4 ring-background shrink-0 z-10">
                                                    1
                                                </div>
                                                <div className="w-px h-full bg-white/10 my-2"></div>
                                            </div>
                                            <div className="pb-4">
                                                <h4 className="text-lg font-bold text-white">Zamawiasz wdrożenie za 5 zł</h4>
                                                <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
                                                    Klikasz "Skontaktuj się", a my wysyłamy Ci krótką ankietę, żeby AI wiedziało, jak sprzedawać Twoje produkty.
                                                </p>
                                            </div>
                                        </div>

                                        {/* KROK 2 */}
                                        <div className="flex gap-4 md:gap-6">
                                            <div className="flex flex-col items-center">
                                                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white ring-4 ring-background border border-white/20 shrink-0 z-10">
                                                    2
                                                </div>
                                                <div className="w-px h-full bg-white/10 my-2"></div>
                                            </div>
                                            <div className="pb-4">
                                                <h4 className="text-lg font-bold text-white">My konfigurujemy magię</h4>
                                                <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
                                                    W ciągu 48h podpinamy system pod Twoje social media i testujemy scenariusze rozmów.
                                                </p>
                                            </div>
                                        </div>

                                        {/* KROK 3 */}
                                        <div className="flex gap-4 md:gap-6">
                                            <div className="flex flex-col items-center">
                                                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white ring-4 ring-background border border-white/20 shrink-0 z-10">
                                                    3
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-white">Startujesz!</h4>
                                                <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
                                                    Od teraz każdy komentarz i wiadomość prywatna są obsługiwane natychmiastowo.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Zabezpieczenie kontenerów zewnętrznych (LeadForm, FAQ) */}
                                <div className="mb-16 w-full max-w-full overflow-hidden space-y-12">
                                    <div className="w-full overflow-x-hidden">
                                        <LeadForm />
                                    </div>
                                    <div className="w-full overflow-x-hidden">
                                        <TrustedBy />
                                    </div>
                                    <div className="w-full overflow-x-hidden">
                                        <FAQ />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* OPIS TEKSTOWY */}
                        <div className="text-lg text-zinc-300 leading-relaxed whitespace-pre-line break-words w-full px-2 md:px-0">
                            {offer.description}
                        </div>

                        {/* BENEFITY */}
                        <div className="pt-8 w-full">
                            <h3 className="text-2xl font-bold text-white mb-6 px-2 md:px-0">Co zyskujesz?</h3>
                            <ul className="space-y-4 px-2 md:px-0">
                                {offer.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                                        <span className="break-words text-zinc-300">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* --- SEKCJA REALIZACJE (3D PIN) --- */}
                {offer.showcase && offer.showcase.length > 0 && (
                    <section className="border-t border-white/10 pt-16 w-full overflow-hidden">
                        <div className="text-center mb-16 px-2">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Przykładowe Realizacje
                            </h2>
                            <p className="text-zinc-400 max-w-2xl mx-auto">
                                Zobacz wybrane projekty w akcji. Najeźdź kursorem, aby zobaczyć efekt 3D.
                            </p>
                        </div>

                        {/* GRID DLA 3D PINÓW */}
                        <div className="flex flex-wrap items-center justify-center gap-16 lg:gap-24 w-full px-2">
                            {offer.showcase.map((project, idx) => (
                                <div key={idx} className="h-[25rem] w-full sm:w-[20rem] flex items-center justify-center">
                                    <PinContainer
                                        title={getSafeHostname(project.link)}
                                        href={project.link || "#"}
                                    >
                                        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[18rem] sm:w-[20rem] h-[20rem]">
                                            <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                                                {project.title}
                                            </h3>
                                            <div className="text-base !m-0 !p-0 font-normal">
                                                <span className="text-slate-500 line-clamp-2">
                                                    {project.description}
                                                </span>
                                            </div>

                                            <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 overflow-hidden relative">
                                                <Image
                                                    src={project.image}
                                                    alt={`Realizacja strony WWW: ${project.title}`}
                                                    fill
                                                    className="object-cover object-top"
                                                />
                                            </div>
                                        </div>
                                    </PinContainer>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </div>
            <Footer />
        </main>
    );
}