import StripeEmbeddedForm from "@/components/StripeEmbeddedForm";
import { ArrowLeft } from "lucide-react"; // Jeśli masz lucide-react, jak nie to SVG
import Link from "next/link";

// Server Component
export default async function CheckoutPage({
                                               params,
                                           }: {
    params: Promise<{ priceId: string }>;
}) {
    const { priceId } = await params;

    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-blue-500/30">

            {/* Prosty Header */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
                    <Link
                        href="/"
                        className="flex items-center text-sm text-neutral-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Wróć do oferty
                    </Link>
                </div>
            </header>

            {/* Kontener Checkoutu */}
            <main className="pt-32 pb-20 px-4 flex justify-center items-start min-h-screen">
                <div className="w-full max-w-3xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            Finalizacja zamówienia
                        </h1>
                        <p className="text-neutral-400 mt-2">
                            Bezpieczna płatność przez Stripe. Twoje dane są chronione.
                        </p>
                    </div>

                    {/* Wrapper z efektem szkła */}
                    <div className="relative group rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-xl p-1 sm:p-8 shadow-2xl overflow-hidden">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl -z-10" />

                        {/* Tutaj ładuje się Stripe */}
                        <StripeEmbeddedForm priceId={priceId} />
                    </div>
                </div>
            </main>
        </div>
    );
}