import Hero from "@/components/Hero";
// Upewnij się, że ścieżka importu jest poprawna (zależnie jak nazwałeś plik z poprzedniego kroku)
import { FeaturesBento } from "@/components/Features";
import {Contact} from "@/components/Contact";
import {Footer} from "@/components/Footer";
import {TrustedBy} from "@/components/TrustedBy";

export default function Home() {
    return (
        <main className="relative">

            {/* 1. Kontener Hero
           - sticky top-0: Przykleja element do góry ekranu podczas scrollowania.
           - h-screen: Musi mieć wysokość ekranu, żeby nie "skakał".
           - z-0: Jest na spodzie (warstwa bazowa).
        */}
            <div className="sticky top-0 z-0 h-screen w-full">
                <Hero />
            </div>

            {/* 2. Kontener Reszty Strony (Bento Grid, Footer, itd.)
           - relative: Wymagane, żeby z-index zadziałał.
           - z-10: Musi być wyżej niż Hero, żeby na niego "wjechać".
           - bg-background: Musi mieć kolor tła (czarny), żeby przykryć Hero (inaczej byłby przezroczysty).
        */}
            <div className="relative z-10 bg-background w-full shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.8)]">
                {/* Tutaj wrzucasz wszystkie kolejne sekcje */}
                <FeaturesBento />
                <TrustedBy />
                <Contact />
                {/* Przykładowy footer/odstęp, żebyś widział efekt do końca */}
                <Footer />
            </div>

        </main>
    );
}