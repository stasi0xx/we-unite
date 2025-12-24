"use client";

import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { createCheckoutSession } from "@/app/actions/stripe";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!stripeKey) throw new Error("BRAK KLUCZA STRIPE w .env.local");

const stripePromise = loadStripe(stripeKey);

export default function StripeEmbeddedForm({ priceId }: { priceId: string }) {
    const fetchClientSecret = useCallback(async () => {
        const res = await createCheckoutSession({ priceId });
        if (!res.clientSecret) throw new Error("Błąd serwera");
        return res.clientSecret;
    }, [priceId]);

    return (
        <div className="w-full">
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{
                    fetchClientSecret,
                    // Konfiguracja Ciemnego Motywu// Rzutowanie na any, bo typy React-Stripe bywają nieaktualne
                }}
            >
                <EmbeddedCheckout className="w-full h-full min-h-[600px]" />
            </EmbeddedCheckoutProvider>
        </div>
    );
}