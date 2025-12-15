import { notFound } from "next/navigation";
import { OFFERS } from "@/lib/offers-data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Spotlight } from "@/components/ui/spotlight-new";
import { PinContainer } from "@/components/ui/3d-pin";
import type { Metadata } from "next";
import {HeroVisualizer} from "@/components/hero-visualizer";

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

    if (!offer) return { title: "Oferta nie znaleziona" };

    return {
        title: `${offer.title} | WeUnite`,
        description: offer.subtitle,
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
            <Navbar />

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
                    <div className="md:col-span-2 space-y-8 text-lg text-zinc-300 leading-relaxed whitespace-pre-line">
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
                    <div className="md:col-span-1">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-32 backdrop-blur-md">
                            <h3 className="font-bold text-white mb-2">Zainteresowany?</h3>
                            <p className="text-sm text-zinc-400 mb-6">
                                Umów się na darmową konsultację i sprawdź, jak możemy wdrożyć to u Ciebie.
                            </p>

                            <Link
                                href="/#contact"
                                className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-primary/20"
                            >
                                Skontaktuj się
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* --- SEKCJA REALIZACJE (3D PIN) --- */}
                {offer.showcase && offer.showcase.length > 0 && (
                    <section className="border-t border-white/10 pt-16">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Nasze Realizacje
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
                                                    alt={project.title}
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