"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase"; // Import klienta

export const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 1. ZAPISUJEMY FORMULARZ DO ZMIENNEJ (zanim zniknie kontekst)
        const form = e.currentTarget;

        setIsSubmitting(true);
        setStatus("idle");

        // Pobieramy dane używając zapisanej referencji 'form'
        const formData = new FormData(form);
        const data = {
            first_name: formData.get("firstName") as string,
            last_name: formData.get("lastName") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
        };

        try {
            // WYSYŁKA DO SUPABASE
            const { error } = await supabase
                .from('leads')
                .insert([ data ]);

            if (error) throw error;

            setStatus("success");

            // 2. RESETUJEMY UŻYWAJĄC ZMIENNEJ (teraz to zadziała)
            form.reset();

        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus("error");
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <section id="contact" className="py-24 px-4 w-full bg-background relative overflow-hidden">

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-xl mx-auto relative z-10">

                <div className="text-center mb-10 space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Skontaktuj się z nami
                    </h2>
                    <p className="text-zinc-400">
                        Wypełnij formularz, a my wrócimy z planem automatyzacji dla Ciebie.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">
                                Imię
                            </label>
                            <input
                                id="firstName"
                                name="firstName" // Ważne dla FormData
                                required
                                type="text"
                                placeholder="Jan"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="lastName" className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">
                                Nazwisko
                            </label>
                            <input
                                id="lastName"
                                name="lastName" // Ważne
                                required
                                type="text"
                                placeholder="Kowalski"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">
                            Email Firmowy
                        </label>
                        <input
                            id="email"
                            name="email" // Ważne
                            required
                            type="email"
                            placeholder="jan@twojafirma.pl"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">
                            Zapytanie
                        </label>
                        <textarea
                            id="message"
                            name="message" // Ważne
                            required
                            rows={4}
                            placeholder="Opisz krótko, co chcesz zautomatyzować..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                            "w-full font-bold rounded-xl py-4 mt-4 transition-all flex items-center justify-center gap-2 shadow-lg",
                            isSubmitting ? "bg-zinc-700 cursor-not-allowed text-zinc-400" :
                                status === "success" ? "bg-green-600 hover:bg-green-700 text-white" :
                                    status === "error" ? "bg-red-600 hover:bg-red-700 text-white" :
                                        "bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_-5px_var(--primary)]"
                        )}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" /> Wysyłanie...
                            </>
                        ) : status === "success" ? (
                            <>
                                <CheckCircle2 className="w-5 h-5" /> Wysłano pomyślnie!
                            </>
                        ) : status === "error" ? (
                            <>
                                <AlertCircle className="w-5 h-5" /> Błąd, spróbuj ponownie
                            </>
                        ) : (
                            <>
                                Wyślij zgłoszenie <Send className="w-4 h-4" />
                            </>
                        )}
                    </button>

                </form>
            </div>
        </section>
    );
};