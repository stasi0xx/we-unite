import { notFound } from "next/navigation";
import { OFFERS } from "@/lib/offers-data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, ArrowRight, ArrowLeft, Zap, Rocket, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Spotlight } from "@/components/ui/spotlight-new";
import { PinContainer } from "@/components/ui/3d-pin";
import type { Metadata } from "next";
import {HeroVisualizer} from "@/components/hero-visualizer";
import {LeadForm} from "@/components/LeadForm";
import {FAQ} from "@/components/FAQ";
import StripeEmbeddedForm from "@/components/StripeEmbeddedForm";
import PricingCard from "@/components/PricingCard";
import StripePricingTable from "@/components/StripePricingTable";
import {TrustedBy} from "@/components/TrustedBy";

// --- 1. FUNKCJA POMOCNICZA (Dodaj ją tutaj, przed generateStaticParams) ---
// Ta funkcja zabezpiecza przed błędem "Invalid URL", gdy link jest np. "#"
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

    // Zabezpieczenie na wypadek błędnego linku
    if (!offer) {
        return {
            title: "Oferta nie znaleziona | WeUnite",
            robots: { index: false } // Nie indeksuj stron 404
        };
    }

    // Tworzenie chwytliwego tytułu pod SEO
    // Np.: "AI Social Responder - Cennik i Wdrożenie | WeUnite"
    const seoTitle = `${offer.title} - Automatyzacja i Cennik`;

    // Skracanie opisu do ~160 znaków dla Google (meta description)
    const seoDescription = offer.subtitle.length > 150
        ? offer.subtitle
        : `${offer.subtitle}. Sprawdź jak ${offer.title} może zaoszczędzić Twój czas. Wdrożenie automatyzacji w Twojej firmie.`;

    // Pobranie obrazka z showcase (jeśli istnieje) do podglądu na Facebooku
    const ogImage = offer.showcase && offer.showcase.length > 0
        ? offer.showcase[0].image
        : "/og-default.jpg"; // Domyślny obrazek

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

    const Icon = offer.icon;

    return (
        <main className="min-h-screen bg-background text-foreground relative overflow-hidden font-sans">

            <Spotlight />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">

                {/* BACK BUTTON */}
                <div className="mb-8">
                    <Link
                        href="/#features"
                        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Wróć do oferty
                    </Link>
                </div>

                {/* HEADER */}
                <div className="flex flex-col items-center text-center space-y-8 mb-24">

                    {/* ZAMIAST MAŁEJ IKONY -> INTERAKTYWNA WIZUALIZACJA */}

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-3xl">
                        {offer.title}
                    </h1>

                    <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
                        {offer.subtitle}
                    </p>
                    <div className="w-full max-w-2xl mx-auto mb-8">
                        <HeroVisualizer slug={slug} />
                    </div>

                </div>

                {/* GŁÓWNA TREŚĆ */}
                <div className="grid md:grid-cols-3 gap-12 mb-24">
                    <div className="md:col-span-3 space-y-8 text-lg text-zinc-300 leading-relaxed whitespace-pre-line">
                        {slug === 'ai-social-responder' && (
                            <div className="my-12 space-y-12">

                                {/* A. TRANSPARENTNY CENNIK (Dwie karty) */}
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                        <Zap className="text-yellow-400" />
                                        Jasne zasady rozliczeń
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* KARTA 1: WDROŻENIE */}
                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-green-500/50 transition-colors relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                                                OFERTA START
                                            </div>
                                            <div className="mb-4">
                                                <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Krok 1: Wdrożenie</p>
                                                <div className="flex items-baseline gap-1 mt-2">
                                                    <span className="text-4xl font-bold text-white">5 PLN</span>
                                                    <span className="text-sm text-zinc-500">jednorazowo</span>
                                                </div>
                                            </div>
                                            <ul className="space-y-2 text-sm text-zinc-300">
                                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Pełna konfiguracja konta</li>
                                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Podpięcie pod fanpage/IG</li>
                                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Testy działania</li>
                                            </ul>
                                        </div>

                                        {/* KARTA 2: UTRZYMANIE */}
                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors">
                                            <div className="mb-4">
                                                <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Krok 2: Utrzymanie</p>
                                                <div className="flex items-baseline gap-1 mt-2">
                                                    <span className="text-4xl font-bold text-white">99 PLN</span>
                                                    <span className="text-sm text-zinc-500">/ miesięcznie</span>
                                                </div>
                                            </div>
                                            <ul className="space-y-2 text-sm text-zinc-300">
                                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500"/> Do 1000 wiadomości / mc</li>
                                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500"/> Raporty skuteczności</li>
                                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500"/> Wsparcie techniczne 24/7</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="text-xs text-zinc-500 mt-3 text-center md:text-left">
                                        * Brak ukrytych kosztów. Możesz zrezygnować w dowolnym momencie z 30-dniowym wypowiedzeniem.
                                    </p>
                                </div>

                                {/* B. PROCES WDROŻENIA (3 KROKI) */}
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-6">Jak zaczynamy?</h3>
                                    <div className="relative border-l border-white/10 ml-3 space-y-8 pl-8 py-2">
                                        {/* KROK 1 */}
                                        <div className="relative">
                                            <span className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-black ring-4 ring-background">1</span>
                                            <h4 className="text-lg font-bold text-white">Zamawiasz wdrożenie za 1 zł</h4>
                                            <p className="text-zinc-400 text-sm mt-1">
                                                Klikasz "Skontaktuj się", a my wysyłamy Ci krótką ankietę, żeby AI wiedziało, jak sprzedawać Twoje produkty.
                                            </p>
                                        </div>
                                        {/* KROK 2 */}
                                        <div className="relative">
                                            <span className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white ring-4 ring-background border border-white/20">2</span>
                                            <h4 className="text-lg font-bold text-white">My konfigurujemy magię</h4>
                                            <p className="text-zinc-400 text-sm mt-1">
                                                W ciągu 48h podpinamy system pod Twoje social media i testujemy scenariusze rozmów.
                                            </p>
                                        </div>
                                        {/* KROK 3 */}
                                        <div className="relative">
                                            <span className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white ring-4 ring-background border border-white/20">3</span>
                                            <h4 className="text-lg font-bold text-white">Startujesz!</h4>
                                            <p className="text-zinc-400 text-sm mt-1">
                                                Od teraz każdy komentarz i wiadomość prywatna są obsługiwane natychmiastowo. Ty tylko sprawdzasz powiadomienia o nowych leadach.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-16">
                                    {/*  <PricingCard price={offer.price} priceId={offer.priceId} description={offer.description} features={offer.benefits} title={offer.title} /> */}
                                    <LeadForm />
                                    <TrustedBy />
                                    <FAQ />

                                </div>

                            </div>
                        )}

                        {offer.description}

                        <div className="pt-8">
                            <h3 className="text-2xl font-bold text-white mb-6">Co zyskujesz?</h3>
                            <ul className="space-y-4">
                                {offer.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* STICKY CTA */}

                </div>



                {/* --- SEKCJA REALIZACJE (3D PIN) --- */}
                {offer.showcase && offer.showcase.length > 0 && (
                    <section className="border-t border-white/10 pt-16">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Przykładowe Realizacje
                            </h2>
                            <p className="text-zinc-400 max-w-2xl mx-auto">
                                Zobacz wybrane projekty w akcji. Najeźdź kursorem, aby zobaczyć efekt 3D.
                            </p>
                        </div>

                        {/* GRID DLA 3D PINÓW */}
                        <div className="flex flex-wrap items-center justify-center gap-16 lg:gap-24">
                            {offer.showcase.map((project, idx) => (
                                <div key={idx} className="h-[25rem] w-full sm:w-[20rem] flex items-center justify-center">
                                    <PinContainer
                                        // --- 5. UŻYCIE FUNKCJI POMOCNICZEJ ---
                                        title={getSafeHostname(project.link)}
                                        href={project.link || "#"}
                                    >
                                        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
                                            <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                                                {project.title}
                                            </h3>
                                            <div className="text-base !m-0 !p-0 font-normal">
                                                <span className="text-slate-500 line-clamp-2">
                                                    {project.description}
                                                </span>
                                            </div>

                                            {/* Obrazek wewnątrz pinu */}
                                            <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 overflow-hidden relative">
                                                <Image
                                                    src={project.image}
                                                    alt={`Realizacja strony WWW: ${project.title} - Wykonanie WeUnite`}
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