"use client";

import React, { useRef } from "react";
import {
    Zap, Mail, MessageSquare, Database
} from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";

// Sub-komponent dla ikon (czystszy kod w głównym komponencie)
const AutomationIcon = React.forwardRef<
    HTMLDivElement,
    { icon: React.ElementType; label: string; active?: boolean }
>(({ icon: Icon, label, active }, ref) => (
    <div className="flex flex-col items-center gap-2 z-10 relative group">
        <div
            ref={ref}
            className={cn(
                "flex h-14 w-14 items-center justify-center rounded-xl border shadow-lg transition-all duration-300",
                "bg-card border-border text-foreground", // Tailwind 4 semantic colors
                active
                    ? "border-primary/50 shadow-[0_0_20px_-5px_var(--color-primary)]"
                    : "group-hover:border-primary/30"
            )}
        >
            <Icon size={24} className="opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider bg-background/80 px-2 py-1 rounded-full backdrop-blur-sm border border-border/50">
            {label}
        </span>
    </div>
));
AutomationIcon.displayName = "AutomationIcon";

export default function AutomationBeamDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mailRef = useRef<HTMLDivElement>(null);
    const logicRef = useRef<HTMLDivElement>(null); // Centralny punkt (AI)
    const dbRef = useRef<HTMLDivElement>(null);
    const msgRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className="relative h-[400px] w-full flex items-center justify-center overflow-hidden rounded-xl border border-border bg-background/40 shadow-xl backdrop-blur-sm"
            ref={containerRef}
        >
            {/* Tło siatki - subtelne i wydajne w CSS */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_100%)] opacity-5 pointer-events-none" />

            <div className="flex size-full max-w-lg flex-row items-center justify-between gap-8 p-8 relative z-20">

                {/* KROK 1: Input */}
                <div className="flex flex-col justify-center gap-8">
                    <AutomationIcon ref={mailRef} icon={Mail} label="Nowy Email" />
                </div>

                {/* KROK 2: AI Logic (Centrum) */}
                <div className="flex flex-col justify-center">
                    <div
                        ref={logicRef}
                        className="z-10 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-violet-600 shadow-[0_0_40px_-10px_var(--color-primary)] border border-white/20 relative"
                    >
                        <Zap size={40} className="text-white fill-white/20 animate-pulse" />
                        {/* Efekt "oddechu" dla AI */}
                        <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping opacity-20 duration-1000" />
                    </div>
                    <span className="mt-4 text-xs font-bold text-primary text-center uppercase tracking-widest">
                        AI Core
                    </span>
                </div>

                {/* KROK 3: Outputy */}
                <div className="flex flex-col justify-center gap-12">
                    <AutomationIcon ref={dbRef} icon={Database} label="CRM Update" />
                    <AutomationIcon ref={msgRef} icon={MessageSquare} label="Slack Alert" />
                </div>
            </div>

            {/* Połączenia (Beams) - Renderowane na warstwie SVG */}
            {/* Input -> AI */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={mailRef}
                toRef={logicRef}
                duration={3}
                gradientStartColor="var(--color-muted-foreground)" // Używamy zmiennych CSS
                gradientStopColor="var(--color-primary)"
            />

            {/* AI -> Database (Delay dla sekwencyjności) */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={logicRef}
                toRef={dbRef}
                duration={3}
                delay={1.5}
                gradientStartColor="var(--color-primary)"
                gradientStopColor="var(--color-violet-500)"
            />

            {/* AI -> Slack */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={logicRef}
                toRef={msgRef}
                duration={3}
                delay={1.5}
                gradientStartColor="var(--color-primary)"
                gradientStopColor="var(--color-blue-500)"
            />
        </div>
    );
}