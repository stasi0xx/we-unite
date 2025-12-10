import React from 'react'
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight-new";
import { TextAnimate } from "@/components/ui/text-animate";
// Importujemy ikony z lucide-react (upewnij się, że masz tę paczkę, jest standardowa w shadcn)
import { Database, Zap, Bot, Layers } from "lucide-react";

const Hero = () => {
    return (
        <main className="relative min-h-screen w-full flex flex-col items-center justify-start md:justify-center overflow-hidden bg-background pt-32 md:pt-10 pb-12">

            {/* TŁO: GRID I SPOTLIGHT */}
            <InteractiveGridPattern
                className={cn(
                    "absolute inset-0 w-full h-full stroke-white/10",
                    "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
                )}
                width={50}
                height={50}
                squares={[120, 120]}
                squaresClassName="hover:fill-primary/50"
            />
            <Spotlight />

            {/* AMBIENT GLOW - dla głębi */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[400px] bg-primary/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none z-0" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-background)_100%)] pointer-events-none" />

            {/* GŁÓWNA TREŚĆ */}
            <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl mx-auto text-center px-4">

                {/* BADGE */}
                <div className="font-mono text-[10px] md:text-xs text-accent uppercase tracking-widest mb-2 border border-white/10 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm">
                    Next.js 16 + Tailwind 4
                </div>

                {/* NAGŁÓWEK */}
                <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold leading-tight">
                    <span className="text-white block mb-2">
                        <TextAnimate animation="blurInUp" by="character">
                            Automatyzacja
                        </TextAnimate>
                    </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
    Dla Twojej Firmy
</span>
                </h1>

                {/* OPIS */}
                <p className="text-base md:text-xl text-zinc-400 font-sans max-w-2xl leading-relaxed">
                    Budujemy systemy, które pracują, gdy Ty śpisz. Oszczędzaj czas i skaluj biznes dzięki AI.
                </p>

                {/* PRZYCISKI */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
                    <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl font-bold transition shadow-[0_0_20px_-5px_var(--primary)] cursor-pointer w-full sm:w-auto">
                        Rozpocznij Projekt
                    </button>
                </div>
            </div>

            {/* SEKCJA TECH STACK (Narzędzia) - Poprawiona dla mobile */}
            <div className="relative z-10 mt-16 md:mt-24 flex flex-col items-center gap-6 px-4 w-full">
                <p className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium text-center">
                    Powered by best-in-class AI models
                </p>

                {/* FIX MOBILE:
                   1. flex-wrap -> pozwala elementom spadać do nowej linii
                   2. justify-center -> centruje je, gdy spadną
                   3. gap-6 -> mniejszy odstęp na telefonie, żeby więcej weszło w linii
                */}
                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-12 opacity-60 hover:opacity-100 transition-all duration-500">

                    <div className="flex items-center gap-2 group">
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-green-500/50 transition-colors">
                            <Database className="w-5 h-5 text-zinc-400 group-hover:text-green-400" />
                        </div>
                        <span className="text-sm md:text-lg font-bold text-zinc-300 group-hover:text-white">Supabase</span>
                    </div>

                    <div className="flex items-center gap-2 group">
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-purple-500/50 transition-colors">
                            <Zap className="w-5 h-5 text-zinc-400 group-hover:text-purple-400" />
                        </div>
                        <span className="text-sm md:text-lg font-bold text-zinc-300 group-hover:text-white">Make</span>
                    </div>

                    <div className="flex items-center gap-2 group">
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-blue-500/50 transition-colors">
                            <Bot className="w-5 h-5 text-zinc-400 group-hover:text-blue-400" />
                        </div>
                        <span className="text-sm md:text-lg font-bold text-zinc-300 group-hover:text-white">OpenAI</span>
                    </div>

                    <div className="flex items-center gap-2 group">
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-white/50 transition-colors">
                            <Layers className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                        </div>
                        <span className="text-sm md:text-lg font-bold text-zinc-300 group-hover:text-white">Next.js</span>
                    </div>

                </div>
            </div>

        </main>
    )
}
export default Hero