"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Upewnij się, że masz ten plik
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const LeadForm = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        // Walidacja prosta
        if (!email || !email.includes("@")) {
            setStatus("error");
            return;
        }

        // Wysyłka do Supabase
        const { error } = await supabase
            .from("leads")
            .insert([{ email, source: "ai_responder_1pln" }]);

        if (error) {
            console.error(error);
            setStatus("error");
        } else {
            setStatus("success");
            setEmail("");
        }
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl text-center"
            >
                <div className="flex justify-center mb-3">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Super decyzja!</h3>
                <p className="text-zinc-400 text-sm">
                    Twoje zgłoszenie zostało przyjęte. <br/>
                    Skontaktujemy się z Tobą w ciągu 24h, aby ustalić szczegóły wdrożenia.
                </p>
            </motion.div>
        );
    }

    return (
        <div className="mt-8 p-1">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
                <div className="relative flex-1">
                    <input
                        type="email"
                        placeholder="Wpisz swój e-mail..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "loading"}
                        className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-zinc-600"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="
                        group relative flex items-center justify-center gap-2
                        bg-white text-black font-bold px-8 py-4 rounded-xl
                        hover:bg-zinc-200 disabled:opacity-70 disabled:cursor-not-allowed
                        transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]
                    "
                >
                    {status === "loading" ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            <span>Odbieram za 1 PLN</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            {status === "error" && (
                <p className="text-red-400 text-xs mt-2 ml-2">
                    Wystąpił błąd. Sprawdź e-mail lub spróbuj ponownie później.
                </p>
            )}

            <p className="text-xs text-zinc-500 mt-3 ml-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
                Dostępność oferty ograniczona czasowo.
            </p>
        </div>
    );
};