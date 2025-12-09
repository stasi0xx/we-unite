import React from 'react'
import {InteractiveGridPattern} from "@/components/ui/interactive-grid-pattern";
import {Button} from "@/components/ui/Button";
import {cn} from "@/lib/utils";

const Hero = () => {
    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden bg-background">

            {/* 2. TŁO: Grid Pattern.
          Ustawiamy go absolutnie, żeby rozciągnął się na cały kontener.
          z-0 zapewnia, że jest na samym spodzie.
          Dostosowałem kolory (fill-zinc-800) i opacity, żeby było subtelnie.
      */}
            <InteractiveGridPattern
                className={cn(
                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
                )}
                width={20}
                height={20}
                squares={[80, 80]}
                squaresClassName="hover:fill-blue-500"/* Dostosowanie koloru linii do naszego tła */
            />

            {/* Opcjonalnie: Dodatkowy gradient (winieta), żeby środek był jaśniejszy */}
            <div className="absolute inset-0 z-1 bg-[radial-gradient(circle_at_center,transparent_10%,var(--color-background)_90%)] pointer-events-none" />


            {/* 3. TREŚĆ: Musi być w kontenerze 'relative' z wyższym z-index (z-10)
          Inaczej nie dałoby się klikać w przyciski, bo tło by je zasłaniało.
      */}
            <div className="relative z-10 flex flex-col items-center gap-8 max-w-3xl mx-auto text-center">

                {/* "Badge" na górze */}
                <div className="font-mono text-xs text-accent uppercase tracking-widest mb-2 border border-border/50 px-3 py-1 rounded-full w-fit bg-card/50 backdrop-blur-sm">
                    NEXT.JS 16 + TAILWIND 4
                </div>

                {/* Nagłówek */}
                <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter">
                    Automatyzacja <br />
                    {/* Używamy naszego koloru primary (indigo) */}
                    <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Dla Twojej Firmy
          </span>
                </h1>

                <p className="text-xl text-zinc-400 font-sans max-w-xl">
                    Budujemy systemy, które pracują, gdy Ty śpisz.
                </p>

                {/* Przyciski */}
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {/* Przycisk Primary z efektem glow */}
                    <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition shadow-[0_0_30px_-10px_var(--primary)]">
                        Rozpocznij Projekt
                    </button>

                    {/* Przycisk Secondary */}
                    <button className="border border-border bg-card/50 backdrop-blur-md text-foreground px-8 py-3 rounded-lg font-medium hover:bg-zinc-800/50 transition">
                        Zobacz Demo
                    </button>
                </div>
            </div>

            {/* Bento Grid na dole (przykład z Twojego screena) */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mt-16 font-sans">
                <div className="bg-card/40 backdrop-blur-sm border border-border/50 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                        Supabase Database
                    </h3>
                    <p className="text-zinc-500 text-sm">Bezpieczne dane klientów.</p>
                </div>
                <div className="bg-card/40 backdrop-blur-sm border border-border/50 p-6 rounded-2xl flex items-center justify-center">
                    <code className="text-accent font-mono text-sm flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
                        Make.com Webhook Active
                    </code>
                </div>
            </div>

        </main>
    )
}
export default Hero
