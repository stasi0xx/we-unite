import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

// --- TWOI KLIENCI ---
// Tutaj wpisujesz nazwy plików, które wgrałeś do folderu public/clients/
const companies = [
    {
        name: "Szkoła Językowa",
        logo: "/clients/logo1.webp", // Ścieżka do pliku w public/clients
    },
    {
        name: "Polska Akademia Dzieci",
        logo: "/clients/logo2.webp",
    },
    {
        name: "Pierwsze Trzeźwe Pokolenie",
        logo: "/clients/logo3.webp",
    },
    {
        name: "Shine Hair",
        logo: "/clients/shine-hair.jpeg", // Ścieżka do pliku w public/clients
    },
    {
        name: "Finanse i Księgowość",
        logo: "/clients/finanse-i-ksiegowosc.png",
    },
    {
        name: "Akademia rozwoju osobistego Columbus",
        logo: "/clients/akademia-rozwoju-osobistego-columbus.jpeg",
    },

];

export function TrustedBy() {
    return (
        <section className="py-24 bg-background border-t border-white/5 relative overflow-hidden" id="TrustedBy">

            {/* Nagłówek sekcji */}
            <div className="container px-4 md:px-6 mb-12 mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-white mb-4">
                    Zaufali nam
                </h2>
                <p className="text-zinc-400 max-w-[600px] mx-auto text-sm md:text-base">
                    Pomagamy firmom skalować sprzedaż i automatyzować procesy. Dołącz do grona zadowolonych klientów.
                </p>
            </div>

            {/* Marquee Container */}
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">

                <Marquee pauseOnHover className="[--duration:30s]">
                    {companies.map((company, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                // ZMIANA 1: Mniejszy padding (px-4), żeby dać więcej miejsca grafice
                                "flex items-center justify-center px-4 py-2 mx-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 cursor-default group",
                                "hover:bg-white/5 hover:border-white/10 hover:shadow-2xl",
                                // ZMIANA 2: Nieco większy rozmiar samego kafelka
                                "w-[180px] h-[100px]"
                            )}
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                <Image
                                    src={company.logo}
                                    alt={company.name}
                                    width={160}
                                    height={90}
                                    // ZMIANA 3: max-w/max-h ustawione na 90% kontenera - logo wypełni kafelek
                                    className="object-contain w-auto h-auto max-w-[90%] max-h-[90%] filter grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                                />
                            </div>
                        </div>
                    ))}
                </Marquee>

                {/* Gradient Fade - Efekt wyłaniania się z mroku */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-10"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-10"></div>
            </div>
        </section>
    );
}