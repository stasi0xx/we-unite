"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

// Helper do aktualizacji zgody w GA4
const updateConsent = (consent: 'granted' | 'denied') => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
            'analytics_storage': consent,
            'ad_storage': consent,
            'ad_user_data': consent,
            'ad_personalization': consent,
        });
    }
};

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");

        if (!consent) {
            // Brak decyzji = pokazujemy baner
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        } else {
            // Użytkownik już kiedyś wybrał -> przywracamy ustawienie w GA4 przy odświeżeniu
            // (GA4 domyślnie powinno być 'denied', więc aktualizujemy tylko na 'granted')
            if (consent === 'true') {
                updateConsent('granted');
            }
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "true");
        updateConsent('granted'); // <--- KLUCZOWE: Odpalamy śledzenie
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "false");
        updateConsent('denied'); // <--- KLUCZOWE: Blokujemy śledzenie
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-4 right-4 z-[100] max-w-sm w-[calc(100%-2rem)] md:w-auto"
                >
                    <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden">

                        {/* Ozdobny glow */}
                        <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-primary/10 blur-[50px] rounded-full pointer-events-none" />

                        <div className="flex items-start gap-4 relative z-10">
                            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-primary">
                                <Cookie size={24} />
                            </div>

                            <div className="space-y-3">
                                <h3 className="font-bold text-white text-sm">
                                    Ciasteczka 🍪
                                </h3>
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    Używamy plików cookies, aby zapewnić najlepszą jakość działania naszej strony i automatyzacji. Szczegóły w {" "}
                                    <Link href="/polityka-prywatnosci" className="text-white hover:underline underline-offset-2">
                                        Polityce Prywatności
                                    </Link>.
                                </p>

                                <div className="flex gap-3 pt-1">
                                    <button
                                        onClick={handleAccept}
                                        className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-lg shadow-primary/20 cursor-pointer"
                                    >
                                        Akceptuję
                                    </button>
                                    <button
                                        onClick={handleDecline}
                                        className="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
                                    >
                                        Odrzuć
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleDecline}
                                aria-label="Zamknij i odrzuć"
                                className="absolute -top-2 -right-2 p-2 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};