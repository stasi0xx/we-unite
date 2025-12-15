"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Bot, User, Zap, Mail, MessageSquare,
    Smartphone, Database, Globe, Server,
    FileVideo, Linkedin, Youtube, Instagram, Twitter,
    Gauge, Search, ShieldCheck, CheckCircle2
} from "lucide-react";
import { AnimatedList } from "@/components/ui/animated-list";
import { AnimatedBeam } from "@/components/ui/animated-beam";

// --- 1. AI RESPONDER (Czat - Bez zmian, bo działa dobrze) ---
const ChatMessage = ({ role, text }: { role: "ai" | "user"; text: string }) => (
    <div className={cn(
        "flex w-full max-w-[320px] mb-4",
        role === "user" ? "ml-auto justify-end" : "mr-auto justify-start"
    )}>
        <div className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm shadow-sm",
            role === "user"
                ? "bg-primary text-primary-foreground rounded-tr-sm"
                : "bg-zinc-800 text-zinc-200 border border-white/10 rounded-tl-sm"
        )}>
            {role === "ai" && <Bot size={16} className="shrink-0" />}
            <span>{text}</span>
            {role === "user" && <User size={16} className="shrink-0" />}
        </div>
    </div>
);

const AiChatDemo = () => {
    return (
        <div className="relative h-[400px] w-full max-w-md mx-auto overflow-hidden rounded-xl bg-zinc-950/50 border border-white/10 p-6 flex flex-col justify-end shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
            <AnimatedList delay={1500}>
                <ChatMessage role="user" text="Hej, ile kosztuje wdrożenie?" />
                <ChatMessage role="ai" text="Cześć! Wycena zależy od skali. Chcesz umówić szybką rozmowę na jutro?" />
                <ChatMessage role="user" text="Jasne, pasuje mi 10:00." />
                <ChatMessage role="ai" text="Świetnie! Termin zarezerwowany. Wysłałem potwierdzenie na maila. 🚀" />
            </AnimatedList>
        </div>
    );
};

// --- 2. AUTOMATYZACJA (Flow danych z opisami) ---
// Dodajemy etykiety, żeby użytkownik rozumiał proces
const AutomationIcon = React.forwardRef<HTMLDivElement, { icon: any, label: string }>(
    ({ icon: Icon, label }, ref) => (
        <div className="flex flex-col items-center gap-2 z-10">
            <div ref={ref} className="flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-900 border border-white/10 text-white shadow-lg">
                <Icon size={24} />
            </div>
            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                {label}
            </span>
        </div>
    )
);
AutomationIcon.displayName = "AutomationIcon";

const AutomationBeamDemo = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const div1Ref = useRef<HTMLDivElement>(null); // Input
    const div2Ref = useRef<HTMLDivElement>(null); // Brain
    const div3Ref = useRef<HTMLDivElement>(null); // Output 1
    const div4Ref = useRef<HTMLDivElement>(null); // Output 2

    return (
        <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden bg-zinc-950/30 rounded-xl border border-white/5" ref={containerRef}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

            <div className="flex size-full max-w-lg flex-row items-center justify-between gap-8 p-8">
                {/* ŹRÓDŁO DANYCH */}
                <div className="flex flex-col justify-center gap-8">
                    <AutomationIcon ref={div1Ref} icon={Mail} label="Nowy Email" />
                </div>

                {/* MÓZG / MAKE.COM */}
                <div className="flex flex-col justify-center">
                    <div ref={div2Ref} className="z-10 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)] border border-white/20">
                        <Zap size={40} className="text-white fill-white/20 animate-pulse" />
                    </div>
                    <span className="mt-3 text-xs font-bold text-indigo-400 text-center uppercase tracking-widest">
                        AI Logic
                    </span>
                </div>

                {/* AKCJE */}
                <div className="flex flex-col justify-center gap-12">
                    <AutomationIcon ref={div3Ref} icon={Database} label="Zapis w CRM" />
                    <AutomationIcon ref={div4Ref} icon={MessageSquare} label="Powiadomienie" />
                </div>
            </div>

            <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div2Ref} duration={3} />
            <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div3Ref} duration={3} delay={1.5} />
            <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div4Ref} duration={3} delay={1.5} />
        </div>
    );
};

// --- 3. SOCIAL MEDIA (Dystrybucja Treści - "One to Many") ---
const SocialPlatform = React.forwardRef<HTMLDivElement, { icon: any, color: string }>(
    ({ icon: Icon, color }, ref) => (
        <div ref={ref} className={cn("z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black border border-white/10 shadow-xl", color)}>
            <Icon size={20} />
        </div>
    )
);
SocialPlatform.displayName = "SocialPlatform";

const SocialDistributorDemo = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);
    const igRef = useRef<HTMLDivElement>(null);
    const liRef = useRef<HTMLDivElement>(null);
    const ytRef = useRef<HTMLDivElement>(null);
    const xRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden" ref={containerRef}>
            {/* Tło siatki */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Centralny "Plik Wideo" */}
            <div className="relative z-20 flex flex-col items-center">
                <div ref={centerRef} className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-black shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)]">
                    <FileVideo size={32} />
                </div>
                <div className="mt-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white backdrop-blur-md">
                    1. Nagranie
                </div>
            </div>

            {/* Satelity (Platformy) - Pozycjonowane absolutnie wokół środka */}
            <div className="absolute flex h-full w-full max-w-sm items-center justify-between pointer-events-none">
                <div className="flex flex-col gap-24 h-full justify-center">
                    <SocialPlatform ref={igRef} icon={Instagram} color="text-pink-500 hover:text-pink-400" />
                    <SocialPlatform ref={liRef} icon={Linkedin} color="text-blue-500 hover:text-blue-400" />
                </div>
                <div className="flex flex-col gap-24 h-full justify-center">
                    <SocialPlatform ref={ytRef} icon={Youtube} color="text-red-500 hover:text-red-400" />
                    <SocialPlatform ref={xRef} icon={Twitter} color="text-white hover:text-zinc-300" />
                </div>
            </div>

            {/* Wiązki (Beams) wychodzące na zewnątrz */}
            <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={igRef} curvature={-50} />
            <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={liRef} curvature={50} />
            <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={ytRef} curvature={-50} reverse />
            <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={xRef} curvature={50} reverse />
        </div>
    );
}

// --- 4. WWW (Lighthouse Score - Speedometer) ---
const ScoreCircle = ({ label, target, color }: { label: string, target: number, color: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000; // ms
        const steps = 60;
        const interval = duration / steps;
        const stepValue = target / steps;

        let current = 0;
        const timer = setInterval(() => {
            current += stepValue;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, interval);

        return () => clearInterval(timer);
    }, [target]);

    return (
        <div className="flex flex-col items-center gap-3">
            <div className={cn("relative flex h-24 w-24 items-center justify-center rounded-full border-4 bg-zinc-950/50 shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)]", color)}>
                <span className="text-3xl font-bold text-white font-mono">{count}</span>
                {/* Dekoracyjny ring */}
                <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50" cy="50" r="46"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="290"
                        strokeDashoffset={290 - (290 * count) / 100}
                        className={cn("transition-all duration-[2s] ease-out", color.replace('border-', 'text-'))}
                    />
                </svg>
            </div>
            <span className="text-sm font-medium text-zinc-400 uppercase tracking-widest">{label}</span>
        </div>
    );
}

const WebPerformanceDemo = () => {
    return (
        <div className="relative h-[400px] w-full flex flex-col items-center justify-center gap-12 bg-zinc-950/30 rounded-xl border border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15)_0%,transparent_70%)] pointer-events-none" />

            <div className="flex gap-8 md:gap-16 relative z-10">
                <ScoreCircle label="Performance" target={100} color="border-emerald-500" />
                <ScoreCircle label="SEO" target={100} color="border-emerald-500" />
                <ScoreCircle label="Best Practices" target={100} color="border-emerald-500" />
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span className="text-sm font-medium text-emerald-400">Core Web Vitals Passed</span>
            </div>
        </div>
    );
}

// --- GŁÓWNY KOMPONENT EXPORTOWANY ---
export const HeroVisualizer = ({ slug }: { slug: string }) => {
    switch (slug) {
        case "ai-social-responder":
            return <AiChatDemo />;
        case "automatyzacja-biznesu":
        case "dedykowane-aplikacje":
            return <AutomationBeamDemo />;
        case "social-media-marketing":
            return <SocialDistributorDemo />; // Nowy komponent
        case "inteligentne-strony":
            return <WebPerformanceDemo />; // Nowy komponent
        default:
            return <AutomationBeamDemo />;
    }
};