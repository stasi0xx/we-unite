import Image from "next/image";
import { Marquee } from "@/components/ui/marquee"; // Wykorzystujemy Twój istniejący komponent
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react"; // Masz to w package.json

// Definicja typu - Strict Mode to podstawa
interface Testimonial {
    id: number;
    name: string;
    role: string;
    company?: string;
    avatarUrl: string; // Pamiętaj, żeby wrzucić te zdjęcia do /public/clients/ lub użyć placeholderów
    content: string;
}

// Przykładowe dane - w produkcji pobrałbyś to z CMS lub bazy danych
const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Marek Kowalski",
        role: "CEO",
        company: "TechNova Solutions",
        avatarUrl: "/clients/face1.webp", // Podmień na swoje
        content: "Wdrożenie automatyzacji skróciło nasz czas procesowania leadów o 70%. Zespół We Unite dostarczył rozwiązanie, które nie tylko działa, ale realnie zarabia.",
    },
    {
        id: 2,
        name: "Anna Nowak",
        role: "Dyrektor Operacyjny",
        company: "Logistics Pro",
        avatarUrl: "/clients/face2.webp",
        content: "Sceptycznie podchodziliśmy do AI, ale po audycie zobaczyliśmy potencjał. Teraz nie wyobrażamy sobie pracy bez systemów, które dla nas zbudowali.",
    },
    {
        id: 3,
        name: "Tomasz Wiśniewski",
        role: "Founder",
        company: "E-commerce Giant",
        avatarUrl: "/clients/face3.webp",
        content: "Profesjonalizm na poziomie Doliny Krzemowej. Kod jest czysty, skalowalny, a komunikacja bezpośrednia. Polecam każdemu, kto chce wyprzedzić konkurencję.",
    },
    {
        id: 4,
        name: "Karolina Wójcik",
        role: "Head of Marketing",
        company: "Creative Flow",
        avatarUrl: "/clients/face4.webp",
        content: "Automatyzacja marketingu to był strzał w dziesiątkę. Odzyskaliśmy setki godzin miesięcznie. Zwrot z inwestycji nastąpił szybciej niż zakładaliśmy.",
    },
];

// Sub-komponent karty (Atomic Design)
const TestimonialCard = ({ item }: { item: Testimonial }) => {
    return (
        <div
            className={cn(
                "relative h-full w-[350px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-card p-6 transition-all hover:border-primary/50",
                // Używamy zmiennych z Twojego globals.css: --card oraz --primary
                "flex flex-col justify-between gap-4"
            )}
        >
            {/* Ozdobny gradient w tle - subtelny efekt glow */}
            <div className="absolute -right-10 -top-10 h-24 w-24 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

            <div className="flex flex-col gap-4">
                <Quote className="h-8 w-8 text-primary/40" />
                <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                    "{item.content}"
                </p>
            </div>

            <div className="flex items-center gap-4 mt-2">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10">
                    <Image
                        src={item.avatarUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        // Używamy placeholdera, jeśli nie masz jeszcze zdjęć.
                        // W produkcji usuń prop `unoptimized` jeśli używasz zewnętrznego hostingu z configiem.
                        unoptimized={item.avatarUrl.startsWith("http")}
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-foreground">{item.name}</span>
                    <span className="text-xs text-muted-foreground">
            {item.role} {item.company && <span className="text-primary/60">@ {item.company}</span>}
          </span>
                </div>
            </div>
        </div>
    );
};

export function Testimonials() {
    return (
        <section className="relative py-20 lg:py-32 w-full overflow-hidden bg-background">
            {/* Nagłówek sekcji */}
            <div className="container mx-auto px-4 mb-12 text-center md:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-heading mb-4">
                    Co mówią o nas <span className="text-primary">KLIENCI</span>
                </h2>
                <p className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg">
                    Zobacz, jak nasze rozwiązania zmieniły biznesy naszych klientów.
                    Nie wierz nam na słowo – przeczytaj ich historie.
                </p>
            </div>

            {/* Marquee Container */}
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">


                {/* Drugi rząd (opcjonalny) - płynie w prawo (reverse) dla lepszego efektu wizualnego */}
                <Marquee reverse pauseOnHover className="[--duration:40s] mt-4 hidden sm:flex">
                    {testimonials.map((item) => (
                        // Dublujemy lub odwracamy kolejność dla różnorodności, w produkcji pobierz więcej opinii
                        <TestimonialCard key={`rev-${item.id}`} item={item} />
                    ))}
                </Marquee>

                {/* Gradienty maskujące na brzegach - profesjonalny look ("fade out") */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent z-10"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent z-10"></div>
            </div>
        </section>
    );
}