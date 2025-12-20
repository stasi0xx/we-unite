"use client";

import React, { useRef } from "react";
import { FileVideo, Linkedin, Youtube, Instagram, Twitter } from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";

// Sub-komponent platformy
const SocialPlatform = React.forwardRef<
    HTMLDivElement,
    { icon: React.ElementType; colorClass: string; label: string }
>(({ icon: Icon, colorClass, label }, ref) => (
    <div className="flex flex-col items-center gap-2 relative z-10 group">
        <div
            ref={ref}
            className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full border shadow-xl transition-all duration-300 hover:scale-110",
                "bg-card border-border", // Baza
                colorClass // Specyficzny kolor po najechaniu lub stały
            )}
            aria-label={`Publikuj na ${label}`}
        >
            <Icon size={20} />
        </div>
    </div>
));
SocialPlatform.displayName = "SocialPlatform";

export default function SocialDistributorDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);

    // Refs dla platform
    const igRef = useRef<HTMLDivElement>(null);
    const liRef = useRef<HTMLDivElement>(null);
    const ytRef = useRef<HTMLDivElement>(null);
    const xRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className="relative h-[400px] w-full flex items-center justify-center overflow-hidden rounded-xl border border-border bg-background/40 shadow-xl"
            ref={containerRef}
        >
            {/* Grid Pattern w CSS */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

            {/* Central Node: Content Source */}
            <div className="relative z-20 flex flex-col items-center">
                <div
                    ref={centerRef}
                    className="flex h-20 w-20 items-center justify-center rounded-2xl bg-foreground text-background shadow-2xl shadow-foreground/20 border border-border"
                >
                    <FileVideo size={32} />
                </div>
                <div className="mt-3 px-3 py-1 bg-background/80 border border-border rounded-full text-xs font-medium text-foreground backdrop-blur-md shadow-sm">
                    1. Źródło (Video)
                </div>
            </div>

            {/* Platformy - Rozłożone po bokach */}
            <div className="absolute flex h-full w-full max-w-sm items-center justify-between pointer-events-none">
                {/* Lewa strona */}
                <div className="flex flex-col gap-28 h-full justify-center pointer-events-auto pl-4">
                    <SocialPlatform
                        ref={igRef}
                        icon={Instagram}
                        label="Instagram"
                        colorClass="text-pink-500 border-pink-500/20 hover:bg-pink-500 hover:text-white"
                    />
                    <SocialPlatform
                        ref={liRef}
                        icon={Linkedin}
                        label="LinkedIn"
                        colorClass="text-blue-600 border-blue-600/20 hover:bg-blue-600 hover:text-white"
                    />
                </div>

                {/* Prawa strona */}
                <div className="flex flex-col gap-28 h-full justify-center pointer-events-auto pr-4">
                    <SocialPlatform
                        ref={ytRef}
                        icon={Youtube}
                        label="YouTube"
                        colorClass="text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white"
                    />
                    <SocialPlatform
                        ref={xRef}
                        icon={Twitter}
                        label="X (Twitter)"
                        colorClass="text-foreground border-foreground/20 hover:bg-foreground hover:text-background"
                    />
                </div>
            </div>

            {/* Animowane wiązki */}
            {/* Curvature pozwala na ładne łuki. Reverse zmienia kierunek animacji (do vs od). */}
            <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={igRef} curvature={-50} gradientStartColor="white" gradientStopColor="#ec4899" />
            <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={liRef} curvature={50} gradientStartColor="white" gradientStopColor="#2563eb" />
            <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={ytRef} curvature={-50} reverse gradientStartColor="white" gradientStopColor="#ef4444" />
            <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={xRef} curvature={50} reverse gradientStartColor="white" gradientStopColor="#71717a" />
        </div>
    );
}