import React from 'react'
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
// Upewnij się, że ścieżka do Button jest poprawna (w plikach widzę components/ui/Button.tsx)
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {Spotlight} from "@/components/ui/spotlight-new";
import {TextAnimate} from "@/components/ui/text-animate";

const Hero = () => {
    return (
        <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">

            {/* TŁO: GRID PATTERN
                1. Zwiększamy squares do [120, 120] -> to da 2400px szerokości (pokryje Full HD i 2K).
                2. Zwiększamy maskę do 800px, żeby "światło" padało na większą część ekranu.
                3. stroke-white/10 sprawi, że linie będą delikatnie widoczne na czarnym tle.
            */}
            <InteractiveGridPattern
                className={cn(
                    "absolute inset-0 w-full h-full stroke-white/10", // Delikatne linie
                    "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]" // Większa "plama" widoczności
                )}
                width={50}
                height={50}
                squares={[120, 120]} // 120 * 20px = 2400px (bezpieczny zapas)
                squaresClassName="hover:fill-primary/50" // Fioletowe podświetlenie (zgodne z Twoim theme)
            />
            <Spotlight />
            {/* Opcjonalnie: Dodatkowy gradient (winieta) na brzegach */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-background)_100%)] pointer-events-none" />

            {/* TREŚĆ */}
            <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl mx-auto text-center px-4">

                <div className="font-mono text-xs text-accent uppercase tracking-widest mb-2 border border-white/10 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm">
                    Next.js 16 + Tailwind 4
                </div>


                    <h1 className="text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50 leading-tight">
                        <TextAnimate animation={'blurInUp'} by={'character'}>Automatyzacja</TextAnimate>
                        <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                            Dla Twojej Firmy
                        </span>
                    </h1>

                <p className="text-lg md:text-xl text-zinc-400 font-sans max-w-2xl">
                    Budujemy systemy, które pracują, gdy Ty śpisz. Oszczędzaj czas i skaluj biznes dzięki AI.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-6">
                    <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition shadow-[0_0_20px_-5px_var(--primary)]">
                        Rozpocznij Projekt
                    </button>

                    <button className="border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-lg font-medium transition">
                        Zobacz Demo
                    </button>
                </div>
            </div>

        </main>
    )
}
export default Hero