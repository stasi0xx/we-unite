"use client";

import React from 'react';
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Marquee } from "@/components/ui/marquee";
import { Database, Zap, Bot, Layers, Server, Code2, Globe, Cpu } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const techStack = [
    { icon: Database, label: "Supabase" },
    { icon: Zap, label: "Make.com" },
    { icon: Bot, label: "OpenAI" },
    { icon: Layers, label: "Next.js 16" },
    { icon: Server, label: "Vercel" },
    { icon: Code2, label: "TypeScript" },
    { icon: Globe, label: "Stripe" },
    { icon: Cpu, label: "n8n" },
];

const Hero = () => {
    return (
        // ZMIANA: Usunięto justify-center, zmieniono pt-32 na pt-24 (mobile) i md:pt-20 (desktop - miejsce na navbar)
        <main className="relative min-h-screen w-full flex flex-col items-center overflow-hidden bg-background pt-24 md:pt-20">

            {/* TŁO: GRID I SPOTLIGHT */}
            <InteractiveGridPattern
                className={cn(
                    "absolute inset-0 w-full h-full stroke-white/5",
                    "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
                )}
                width={50}
                height={50}
                squares={[120, 120]}
                squaresClassName="hover:fill-primary/50"
            />
            <Spotlight />

            {/* AMBIENT GLOW */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[400px] bg-primary/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-background)_100%)] pointer-events-none" />

            {/* GŁÓWNA TREŚĆ - CENTROWANIE */}
            {/* ZMIANA: Dodano 'flex-1 flex flex-col justify-center' - to centruje treść w wolnej przestrzeni */}
            {/* Usunięto 'mb-20', który przesuwał treść do góry */}
            <div className="relative z-10 flex-1 flex flex-col justify-center items-center gap-6 max-w-5xl mx-auto text-center px-4 w-full pb-8">


                {/* --- LOGO --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full max-w-[300px] md:max-w-[500px] h-auto flex justify-center"
                >
                    <Image
                        src="/hero-logo.webp"
                        alt="We Unite Logo"
                        width={600}
                        height={200}
                        priority
                        className="w-full h-auto object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.15)]"
                    />
                </motion.div>

                {/* --- NAPIS: TWÓJ SPOTLIGHT --- */}
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-3xl md:text-6xl font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 uppercase mt-4 mb-2 drop-shadow-sm"
                >
                    Twój Spotlight
                </motion.h2>

                {/* OPIS */}
                <p className="text-sm md:text-lg text-zinc-400 font-sans max-w-xl leading-relaxed">
                    Budujemy systemy, które pracują, gdy Ty śpisz. Oszczędzaj czas i skaluj biznes dzięki dedykowanym rozwiązaniom AI.
                </p>

                {/* PRZYCISKI */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto justify-center">
                    <button className="
                        group relative overflow-hidden
                        px-8 py-3 md:px-10 md:py-4 rounded-full font-bold text-base md:text-lg text-zinc-900
                        bg-gradient-to-b from-white via-zinc-200 to-zinc-400
                        border-t border-white/80 border-b border-zinc-500
                        shadow-[0_0_20px_-5px_rgba(255,255,255,0.4),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-2px_5px_rgba(0,0,0,0.1)]
                        hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.6),inset_0_1px_0_rgba(255,255,255,1)]
                        active:scale-95 active:shadow-[inset_0_3px_5px_rgba(0,0,0,0.2)]
                        transition-all duration-300 ease-out
                        cursor-pointer z-10
                    ">
                        <span className="relative z-10 drop-shadow-sm">Rozpocznij Projekt</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shine_1s_ease-in-out_infinite]" />
                    </button>
                </div>
            </div>

            {/* MARQUEE */}
            <div className="relative z-10 w-full mb-8 md:mb-12">
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent z-20"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent z-20"></div>

                <Marquee pauseOnHover className="[--duration:30s] [--gap:3rem]">
                    {techStack.map((tech, idx) => (
                        <div key={idx} className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/5 rounded-full hover:bg-white/10 transition-colors cursor-default backdrop-blur-sm">
                            <tech.icon className="w-5 h-5 text-zinc-400" />
                            <span className="text-lg font-medium text-zinc-300">{tech.label}</span>
                        </div>
                    ))}
                </Marquee>
            </div>

        </main>
    )
}
export default Hero