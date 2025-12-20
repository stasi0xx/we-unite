"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton"; // Zakładam, że masz ui/skeleton

// Ładujemy komponenty leniwie.
// Server Side Rendering (ssr: true) jest ok dla SEO, ale jeśli to czysta dekoracja pod "foldem", można dać false.
// Tutaj zostawiamy true dla LCP (Largest Contentful Paint), jeśli są na górze strony.

const AiChatInteractive = dynamic(() => import("./visualizers/ai-chat"), {
    loading: () => <Skeleton className="h-[450px] w-full rounded-xl bg-zinc-900/20" />,
});

const AutomationBeamDemo = dynamic(() => import("./visualizers/automation-beam"), {
    loading: () => <Skeleton className="h-[400px] w-full rounded-xl bg-zinc-900/20" />,
});

const SocialDistributorDemo = dynamic(() => import("./visualizers/social-distributor"), {
    loading: () => <Skeleton className="h-[400px] w-full rounded-xl bg-zinc-900/20" />,
});

const WebPerformanceDemo = dynamic(() => import("./visualizers/web-performance"), {
    loading: () => <Skeleton className="h-[400px] w-full rounded-xl bg-zinc-900/20" />,
});

export const HeroVisualizer = ({ slug }: { slug: string }) => {
    switch (slug) {
        case "ai-social-responder":
            return <AiChatInteractive />;
        case "automatyzacja-biznesu":
        case "dedykowane-aplikacje":
            return <AutomationBeamDemo />;
        case "social-media-marketing":
            return <SocialDistributorDemo />;
        case "inteligentne-strony":
            return <WebPerformanceDemo />;
        default:
            return <AutomationBeamDemo />;
    }
};