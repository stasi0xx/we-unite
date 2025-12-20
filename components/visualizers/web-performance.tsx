// components/visualizers/web-performance.tsx
"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ScoreCircle = ({ label, target, colorClass }: { label: string, target: number, colorClass: string }) => {
    // Używamy CSS transition do animacji paska - to odciąża JS
    // JS służy tylko do licznika cyfrowego
    const [count, setCount] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Trigger animacji po zamontowaniu

        let start = 0;
        const duration = 1500; // 1.5s
        const steps = 30; // Mniej aktualizacji stanu! Nie potrzebujemy 60fps dla cyferek
        const increment = target / steps;
        const stepTime = duration / steps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [target]);

    // Obliczamy obwód dla SVG (r=46 -> 2 * pi * 46 ~= 289)
    const circumference = 289;
    const strokeDashoffset = circumference - (circumference * (mounted ? target : 0)) / 100;

    return (
        <div className="flex flex-col items-center gap-3 group">
            <div className={cn(
                "relative flex h-24 w-24 items-center justify-center rounded-full border-4 bg-background/50 shadow-lg backdrop-blur-sm transition-colors",
                // Tailwind 4: używamy color-mix lub opacity modifier
                `border-${colorClass}/20`
            )}>
                <span className="text-3xl font-bold font-mono tabular-nums tracking-tighter">
                    {count}
                </span>
                <svg
                    className="absolute inset-0 size-full -rotate-90 pointer-events-none"
                    viewBox="0 0 100 100"
                    aria-hidden="true"
                >
                    <circle
                        cx="50" cy="50" r="46"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        // Animacja CSS zamiast JS! Dużo wydajniej.
                        style={{
                            strokeDashoffset,
                            transition: "stroke-dashoffset 1.5s ease-out"
                        }}
                        className={cn("text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]")}
                    />
                </svg>
            </div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">
                {label}
            </span>
        </div>
    );
}

export default function WebPerformanceDemo() {
    return (
        <div className="relative h-[400px] w-full flex flex-col items-center justify-center gap-12 overflow-hidden rounded-xl border border-border bg-background/40 shadow-2xl">
            {/* Użycie natywnego gradientu CSS zamiast complex divów */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-emerald-500)_0%,transparent_70%)] opacity-10 pointer-events-none" />

            <div className="flex gap-6 md:gap-12 relative z-10">
                <ScoreCircle label="Performance" target={98} colorClass="emerald-500" />
                <ScoreCircle label="SEO" target={100} colorClass="emerald-500" />
                <ScoreCircle label="Best Practices" target={100} colorClass="emerald-500" />
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000 fill-mode-forwards opacity-0">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Core Web Vitals Passed</span>
            </div>
        </div>
    );
}