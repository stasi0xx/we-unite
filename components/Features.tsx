"use client";

import {
    BellIcon, Zap, Bot, MessageCircle, Globe, Share2,
    Code2, Workflow, Terminal, GitBranch, Server, Database
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { AnimatedList } from "@/components/ui/animated-list";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// --- IKONY SOCIAL MEDIA (SVG) ---
const Icons = {
    whatsapp: () => <svg viewBox="0 0 24 24" className="fill-current w-full h-full"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
    instagram: () => <svg viewBox="0 0 24 24" className="fill-current w-full h-full"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
    facebook: () => <svg viewBox="0 0 24 24" className="fill-current w-full h-full"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.651-2.797 2.895v1.077h3.942l-.591 3.667h-3.351v7.98h-5.017z"/></svg>,
    tiktok: () => <svg viewBox="0 0 16 16" className="fill-current w-full h-full"><path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/></svg>,
    x: () => <svg viewBox="0 0 24 24" className="fill-current w-full h-full"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    linkedin: () => <svg viewBox="0 0 24 24" className="fill-current w-full h-full"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
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

// --- KOMPONENT 3: Social Media Orbit ---
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

// --- KOMPONENT 4: Dev/Terminal Activity ---
const DevItem = ({ text, icon: Icon, color }: { text: string; icon: any; color: string }) => {
    return (
        <figure className={cn(
            "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-lg p-3",
            "transition-all duration-200 ease-in-out hover:scale-[102%]",
            "bg-zinc-900/80 border border-white/5 backdrop-blur-sm shadow-sm"
        )}>
            <div className="flex flex-row items-center gap-3">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-md bg-black/50", color)}>
                    <Icon size={14} />
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center whitespace-pre text-xs font-mono text-zinc-300">
                        <span className="text-zinc-500 mr-2">{">"}</span>
                        {text}
                    </figcaption>
                </div>
            </div>
        </figure>
    );
};

const DevActivityDemo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative flex h-[350px] w-full flex-col p-6 overflow-hidden", className)}>
            <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black z-0" />
            <div className="relative z-10 opacity-90">
                <AnimatedList delay={1500}>
                    <DevItem text="git push origin main" icon={GitBranch} color="text-orange-400" />
                    <DevItem text="Build started..." icon={Terminal} color="text-blue-400" />
                    <DevItem text="Database migrations synced" icon={Database} color="text-green-400" />
                    <DevItem text="Running tests (142 passed)" icon={Code2} color="text-purple-400" />
                    <DevItem text="Deployed to production 🚀" icon={Server} color="text-emerald-400" />
                </AnimatedList>
            </div>
        </div>
    );
};


// --- NOWY KOMPONENT 5: Website Builder Animation (Zastępuje zdjęcie) ---
const WebsiteBuilderDemo = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0, scale: 0.9 },
        show: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center p-6 overflow-hidden [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
            {/* Browser Mockup Frame */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[350px] aspect-[9/16] md:aspect-[3/4] bg-zinc-950/80 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm relative group-hover:scale-[1.02] transition-transform duration-500"
            >
                {/* Browser Header (dots) */}
                <div className="h-6 bg-zinc-900/50 border-b border-white/5 flex items-center gap-1.5 px-3">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>

                {/* Animated Content Blocks (Skeleton UI) */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="p-4 flex flex-col gap-3"
                >
                    {/* Header/Nav Skeleton */}
                    <motion.div variants={itemVariants} className="flex justify-between items-center">
                        <div className="h-3 w-1/4 bg-white/20 rounded-full" />
                        <div className="flex gap-2">
                            <div className="h-2 w-8 bg-white/10 rounded-full" />
                            <div className="h-2 w-8 bg-white/10 rounded-full" />
                        </div>
                    </motion.div>

                    {/* Hero Section Skeleton */}
                    <motion.div variants={itemVariants} className="h-24 w-full bg-gradient-to-br from-primary/20 to-purple-500/10 rounded-lg animate-pulse" />

                    {/* Text Skeletons */}
                    <motion.div variants={itemVariants} className="space-y-2 py-2">
                        <div className="h-3 w-3/4 bg-white/10 rounded-full" />
                        <div className="h-2 w-full bg-white/5 rounded-full" />
                        <div className="h-2 w-5/6 bg-white/5 rounded-full" />
                    </motion.div>

                    {/* Image + Text split */}
                    <motion.div variants={itemVariants} className="flex gap-3">
                        <div className="h-16 w-1/3 bg-zinc-800/50 rounded-md border border-white/5" />
                        <div className="space-y-2 flex-1">
                            <div className="h-2 w-full bg-white/5 rounded-full" />
                            <div className="h-2 w-4/5 bg-white/5 rounded-full" />
                            <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                        </div>
                    </motion.div>

                    {/* CTA Button Skeleton */}
                    <motion.div variants={itemVariants} className="h-8 w-1/3 bg-primary/30 rounded-md mt-2" />

                </motion.div>
            </motion.div>
        </div>
    );
};


// --- DANE ---
type FeatureCategory = "all" | "automation" | "web" | "social";

interface Feature {
    Icon: any;
    name: string;
    description: string;
    href: string;
    cta: string;
    className: string;
    background: React.ReactNode;
    category: FeatureCategory[];
}

const features: Feature[] = [
    {
        Icon: BellIcon,
        name: "AI Social Responder",
        description: "Automatycznie odpowiadaj na wiadomości, kwalifikuj leady i umawiaj spotkania 24/7.",
        href: "/oferta/ai-social-responder",
        cta: "Zobacz szczegóły",
        className: "col-span-3 lg:col-span-2",
        background: (
            <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        ),
        category: ["all", "automation", "social"]
    },
    {
        Icon: Zap,
        name: "Automatyzacja Biznesu",
        description: "Łączymy Twoje narzędzia (CRM, Email, Slack) w jeden spójny system.",
        href: "/oferta/automatyzacja-biznesu",
        cta: "Sprawdź szczegóły",
        className: "col-span-3 lg:col-span-1",
        background: (
            <IntegrationsBeamDemo className="absolute right-0 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        ),
        category: ["all", "automation"]
    },
    {
        Icon: Globe,
        name: "Inteligentne strony",
        description: "Tworzymy szybkie strony Next.js, które same sprzedają. Zobacz nasze realizacje.",
        href: "/oferta/inteligentne-strony",
        cta: "Zobacz ofertę",
        className: "col-span-3 lg:col-span-1",
        // --- ZMIANA TUTAJ: Używamy nowego komponentu WebsiteBuilderDemo zamiast zdjęcia ---
        background: (
            <WebsiteBuilderDemo />
        ),
        category: ["all", "web"]
    },
    {
        Icon: Share2,
        name: "Social Media Marketing",
        description: "Bądź wszędzie. Twoja marka widoczna na każdej platformie dzięki automatyzacji publikacji.",
        className: "col-span-3 lg:col-span-2",
        href: "/oferta/social-media-marketing",
        cta: "Sprawdź ofertę",
        background: (
            <div className="absolute top-0 w-full h-full [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
                <OrbitingCirclesDemo className="scale-90 group-hover:scale-100 transition-transform duration-500" />
            </div>
        ),
        category: ["all", "social"]
    },
    /*{
        Icon: Code2,
        name: "Dedykowane aplikacje",
        description: "Potrzebujesz czegoś więcej niż strony? Budujemy aplikacje SaaS i panele klienta.",
        href: "/oferta/dedykowane-aplikacje",
        cta: "Wyceń projekt",
        className: "col-span-3 lg:col-span-3",
        background: (
            <div className="absolute inset-0 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
                <DevActivityDemo className="w-full h-full" />
            </div>
        ),
        category: ["all", "web", "automation"]
    }*/
];

// --- ZAKŁADKI (Tabs Component) ---
const TABS = [
    { id: "all", label: "Wszystko", icon: Workflow },
    { id: "automation", label: "Automatyzacja", icon: Bot },
    { id: "web", label: "Strony WWW", icon: Globe },
    { id: "social", label: "Social Media", icon: MessageCircle },
] as const;

export function FeaturesBento() {
    const [activeTab, setActiveTab] = useState<FeatureCategory>("all");

    const filteredFeatures = features.filter(f => f.category.includes(activeTab));

    return (
        <section id="features" className="py-24 px-4 w-full bg-background relative scroll-mt-20">
            <div className="max-w-6xl mx-auto mb-12 text-center">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-4">
                    Wszystko czego potrzebujesz
                </h2>
                <p className="text-zinc-400 mb-8">Wybierz obszar, który chcesz usprawnić w swojej firmie.</p>

                {/* TABS CONTAINER */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as FeatureCategory)}
                            className={cn(
                                "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                activeTab === tab.id ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                            )}
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="active-tab"
                                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* GRID Z ANIMACJĄ PRZEŁĄCZANIA */}
            <div className="max-w-6xl mx-auto min-h-[600px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <BentoGrid>
                            {filteredFeatures.map((feature, idx) => (
                                <BentoCard key={feature.name + idx} {...feature} />
                            ))}
                        </BentoGrid>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}