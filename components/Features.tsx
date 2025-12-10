"use client";

import { BellIcon, Zap, Bot, MessageCircle, Globe, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { AnimatedList } from "@/components/ui/animated-list";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import {OrbitingCircles} from "@/components/ui/orbiting-circles"; // <--- Importujemy nowy komponent
import React, { useRef } from "react";

// --- IKONY SOCIAL MEDIA (SVG) ---
const Icons = {
    whatsapp: () => (
        <svg viewBox="0 0 24 24" className="fill-current w-full h-full"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    ),
    instagram: () => (
        <svg viewBox="0 0 24 24" className="fill-current w-full h-full"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    ),
    facebook: () => (
        <svg viewBox="0 0 24 24" className="fill-current w-full h-full"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.651-2.797 2.895v1.077h3.942l-.591 3.667h-3.351v7.98h-5.017z"/></svg>
    ),
    tiktok: () => (
        <svg viewBox="0 0 16 16" className="fill-current w-full h-full"><path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/></svg>
    ),
    x: () => (
        <svg viewBox="0 0 24 24" className="fill-current w-full h-full"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    ),
    linkedin: () => (
        <svg viewBox="0 0 24 24" className="fill-current w-full h-full"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    ),
};

// --- KOMPONENT 1: AI Responder Demo ---
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

// --- KOMPONENT 2: Integrations Demo ---
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
    const div5Ref = useRef<HTMLDivElement>(null);

    return (
        <div
            className={cn("relative flex h-[300px] w-full items-center justify-center overflow-hidden", className)}
            ref={containerRef}
        >
            <div className="flex h-full w-full flex-row items-stretch justify-between gap-10 p-10">
                <div className="flex flex-col justify-center gap-2">
                    <Circle ref={div1Ref}><div className="w-6 h-6 bg-blue-500 rounded-full" /></Circle>
                    <Circle ref={div2Ref}><div className="w-6 h-6 bg-green-500 rounded-full" /></Circle>
                    <Circle ref={div3Ref}><div className="w-6 h-6 bg-pink-500 rounded-full" /></Circle>
                    <Circle ref={div4Ref}><div className="w-6 h-6 bg-orange-500 rounded-full" /></Circle>
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

// --- KOMPONENT 3: Social Media Orbit (NOWOŚĆ) ---
export function OrbitingCirclesDemo({ className }: { className?: string }) {
    return (
        <div className={cn("relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden", className)}>
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-5xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
        Brand
      </span>

            {/* Wewnętrzna orbita */}
            <OrbitingCircles iconSize={30} radius={60}>
                <div className="p-2 bg-black border border-white/10 rounded-full text-white hover:text-pink-500 transition-colors"><Icons.instagram /></div>
                <div className="p-2 bg-black border border-white/10 rounded-full text-white hover:text-blue-500 transition-colors"><Icons.facebook /></div>
                <div className="p-2 bg-black border border-white/10 rounded-full text-white hover:text-green-500 transition-colors"><Icons.whatsapp /></div>
            </OrbitingCircles>

            {/* Zewnętrzna orbita (w drugą stronę) */}
            <OrbitingCircles iconSize={40} radius={110} reverse speed={1.5}>
                <div className="p-2 bg-black border border-white/10 rounded-full text-white hover:text-white transition-colors"><Icons.tiktok /></div>
                <div className="p-2 bg-black border border-white/10 rounded-full text-white hover:text-blue-400 transition-colors"><Icons.linkedin /></div>
                <div className="p-2 bg-black border border-white/10 rounded-full text-white hover:text-gray-300 transition-colors"><Icons.x /></div>
            </OrbitingCircles>
        </div>
    )
}

// --- TABLICA FEATURES ---
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
        Icon: Globe,
        name: "Inteligentne strony",
        description: "Tworzymy szybkie strony Next.js, które same sprzedają. Zobacz nasze realizacje.",
        href: "#",
        cta: "Zobacz portfolio",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute top-10 w-full h-full [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] overflow-hidden rounded-xl">
                <img
                    src="/case1.webp"
                    alt="Nasze realizacje"
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500 border-t border-white/10"
                />
            </div>
        ),
    },
    {
        Icon: Share2, // Zmieniona ikona na "Share"
        name: "Social Media Marketing", // Nowa nazwa
        description: "Bądź wszędzie. Twoja marka widoczna na każdej platformie dzięki automatyzacji.",
        className: "col-span-3 lg:col-span-2",
        href: "#",
        cta: "Zwiększ zasięgi",
        background: (
            <div className="absolute top-0 w-full h-full [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
                {/* Nowa animacja Orbiting Circles */}
                <OrbitingCirclesDemo className="scale-90 group-hover:scale-100 transition-transform duration-500" />
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