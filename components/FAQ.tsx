"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

// LISTA PYTAŃ - Skrojona pod Twoją ofertę (Boty + Strony)
const faqData = [
    {
        question: "Czy oferta wdrożenia bota za 1 PLN ma jakieś ukryte koszty?",
        answer: "Nie. Płacisz 1 PLN netto za pełną konfigurację, podpięcie i testy. Jedynym stałym kosztem jest późniejszy abonament utrzymaniowy (99 PLN/mc), który pokrywa serwery i do 1000 wiadomości miesięcznie. Możesz zrezygnować w dowolnym momencie z zachowaniem miesięcznego okresu wypowiedzenia."
    },
    {
        question: "Czy korzystanie z bota jest bezpieczne dla mojego konta na Instagramie/FB?",
        answer: "Tak, w 100%. Korzystamy wyłącznie z oficjalnego API Meta (Facebook & Instagram). Nie używamy 'botów klikających' czy nieautoryzowanych skryptów, za które lecą bany. Nasze rozwiązanie jest w pełni zgodne z regulaminem Meta."
    },
    {
        question: "Czy bot będzie brzmiał jak robot?",
        answer: "Nie. Nasze modele są trenowane na bazie Twoich dotychczasowych rozmów i stylu komunikacji. Potrafią używać emoji, rozumieją potoczny język i slang. W 9 na 10 przypadków klient nie orientuje się, że rozmawia z AI."
    },
    {
        question: "Jak długo trwa stworzenie strony WWW w pakiecie PRO?",
        answer: "Dla stron typu 'Inteligentna Wizytówka' czas realizacji to zazwyczaj 7-10 dni roboczych. Rozbudowane systemy z panelem klienta i automatyzacją zajmują od 3 do 5 tygodni. Zawsze ustalamy harmonogram przed rozpoczęciem prac."
    },
    {
        question: "Co jeśli AI nie będzie znało odpowiedzi na pytanie klienta?",
        answer: "System jest zaprogramowany tak, by w razie wątpliwości nie zmyślać (brak halucynacji). Jeśli pytanie wykracza poza bazę wiedzy, bot uprzejmie poprosi o chwilę cierpliwości i natychmiast powiadomi Cię (np. na Slacku lub mailowo), że wymagana jest interwencja człowieka."
    }
];

export const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // SCHEMA JSON-LD dla Google
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <section className="py-24 bg-background relative overflow-hidden" id="faq">

            {/* Wstrzyknięcie danych strukturalnych */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-4xl mx-auto px-6 relative z-10">

                {/* NAGŁÓWEK */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-2 bg-white/5 rounded-full mb-4 backdrop-blur-sm border border-white/10">
                        <HelpCircle className="w-5 h-5 text-zinc-400" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Masz pytania? <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">
              Mamy odpowiedzi.
            </span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Rozwiewamy wątpliwości dotyczące automatyzacji i wdrożeń.
                    </p>
                </div>

                {/* LISTA PYTAŃ */}
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={`
                group rounded-2xl border transition-all duration-300
                ${activeIndex === index
                                ? "bg-white/10 border-white/20 shadow-lg shadow-white/5"
                                : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]"
                            }
              `}
                        >
                            <button
                                onClick={() => toggleIndex(index)}
                                className="flex items-center justify-between w-full p-6 text-left"
                            >
                <span className={`text-lg font-medium transition-colors ${activeIndex === index ? "text-white" : "text-zinc-300 group-hover:text-white"}`}>
                  {item.question}
                </span>
                                <span className={`ml-4 shrink-0 p-2 rounded-full border transition-all ${activeIndex === index ? "bg-white text-black border-white" : "border-white/20 text-white"}`}>
                  {activeIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-zinc-400 leading-relaxed border-t border-white/10 mt-2">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};