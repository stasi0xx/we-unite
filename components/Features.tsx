"use client";

import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon, Zap, Bot, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { AnimatedList } from "@/components/ui/animated-list";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import React, { useRef } from "react";

// --- KOMPONENT 1: AI Responder Demo (Lista powiadomień) ---
const NotificationItem = ({ text, time, icon }: { text: string; time: string; icon: string }) => {
    return (
        <figure className={cn(
            "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
            "transition-all duration-200 ease-in-out hover:scale-[103%]",
            "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
            "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
        )}>
            <div className="flex flex-row items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-100 dark:bg-zinc-800">
                    <span className="text-lg">{icon}</span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
                        <span className="text-sm sm:text-lg">{text}</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">{time}</span>
                    </figcaption>
                </div>
            </div>
        </figure>
    );
};

const AnimatedListDemo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative flex h-[500px] w-full flex-col p-6 overflow-hidden", className)}>
            <AnimatedList>
                <NotificationItem text="Nowy lead z Instagrama" time="1m" icon="💬" />
                <NotificationItem text="AI: Wysłano ofertę" time="2m" icon="🤖" />
                <NotificationItem text="Spotkanie dodane do kalendarza" time="5m" icon="📅" />
                <NotificationItem text="Klient zaakceptował wycenę" time="10m" icon="💰" />
                <NotificationItem text="Nowy e-mail od klienta" time="15m" icon="📧" />
            </AnimatedList>
        </div>
    );
};

// --- KOMPONENT 2: Integrations Demo (Beam) ---
const Circle = React.forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
    ({ className, children }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/10 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] dark:bg-black",
                    className,
                )}
            >
                {children}
            </div>
        );
    }
);
Circle.displayName = "Circle";

const IntegrationsBeamDemo = ({ className }: { className?: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const div1Ref = useRef<HTMLDivElement>(null);
    const div2Ref = useRef<HTMLDivElement>(null);
    const div3Ref = useRef<HTMLDivElement>(null);
    const div4Ref = useRef<HTMLDivElement>(null);
    const div5Ref = useRef<HTMLDivElement>(null); // Central Node

    return (
        <div
            className={cn("relative flex h-[300px] w-full items-center justify-center overflow-hidden", className)}
            ref={containerRef}
        >
            <div className="flex h-full w-full flex-row items-stretch justify-between gap-10 p-10">
                <div className="flex flex-col justify-center gap-2">
                    <Circle ref={div1Ref}><FileTextIcon className="w-6 h-6 text-blue-500"/></Circle>
                    <Circle ref={div2Ref}><Share2Icon className="w-6 h-6 text-green-500"/></Circle>
                    <Circle ref={div3Ref}><MessageCircle className="w-6 h-6 text-pink-500"/></Circle>
                    <Circle ref={div4Ref}><CalendarIcon className="w-6 h-6 text-orange-500"/></Circle>
                </div>
                <div className="flex flex-col justify-center">
                    <Circle ref={div5Ref} className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 border-none">
                        <Bot className="w-8 h-8 text-white" />
                    </Circle>
                </div>
            </div>

            <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div5Ref} />
            <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div5Ref} delay={1} />
            <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={div5Ref} delay={2} />
            <AnimatedBeam containerRef={containerRef} fromRef={div4Ref} toRef={div5Ref} delay={3} />
        </div>
    );
};

// --- GŁÓWNA SEKCJA BENTO ---

const features = [
    {
        Icon: BellIcon,
        name: "AI Social Responder",
        description: "Automatycznie odpowiadaj na wiadomości, kwalifikuj leady i umawiaj spotkania 24/7.",
        href: "#",
        cta: "Zobacz jak to działa",
        className: "col-span-3 lg:col-span-2",
        background: (
            <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        ),
    },
    {
        Icon: Zap,
        name: "Automatyzacja Biznesu",
        description: "Łączymy Twoje narzędzia w jeden spójny system.",
        href: "#",
        cta: "Sprawdź integracje",
        className: "col-span-3 lg:col-span-1",
        background: (
            <IntegrationsBeamDemo className="absolute right-0 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        ),
    },
    {
        Icon: FileTextIcon,
        name: "Inteligentna Baza Wiedzy",
        description: "AI uczy się na podstawie Twoich plików i dokumentów.",
        href: "#",
        cta: "Więcej",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute top-10 w-full opacity-50 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]">
                {/* Tutaj można wstawić prosty obrazek lub Marquee z plikami */}
                <div className="p-4 border rounded-xl bg-white/5 mx-6">
                    <div className="h-4 w-2/3 bg-zinc-700 rounded mb-2 animate-pulse" />
                    <div className="h-4 w-1/2 bg-zinc-700 rounded animate-pulse delay-75" />
                </div>
            </div>
        ),
    },
    {
        Icon: CalendarIcon,
        name: "Auto-Scheduling",
        description: "Kalendarz, który sam zarządza Twoimi spotkaniami.",
        className: "col-span-3 lg:col-span-2",
        href: "#",
        cta: "Poznaj szczegóły",
        background: (
            <div className="absolute right-0 top-10 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105 opacity-50">
                {/* Placeholder na kalendarz - można podmienić na komponent Calendar */}
                <div className="grid grid-cols-7 gap-2 p-8 text-center text-zinc-500 text-xs">
                    {[...Array(28)].map((_, i) => (
                        <div key={i} className={cn("rounded p-2", i === 12 ? "bg-primary text-white font-bold" : "bg-white/5")}>
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
];

export function FeaturesBento() {
    return (
        <section className="py-24 px-4 w-full bg-background relative">
            <div className="max-w-6xl mx-auto mb-12 text-center">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-4">
                    Wszystko czego potrzebujesz
                </h2>
                <p className="text-zinc-400">Kompletny zestaw narzędzi do automatyzacji Twojej firmy.</p>
            </div>

            <div className="max-w-6xl mx-auto">
                <BentoGrid>
                    {features.map((feature, idx) => (
                        <BentoCard key={idx} {...feature} />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}