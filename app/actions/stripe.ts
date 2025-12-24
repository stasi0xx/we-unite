"use server";

import Stripe from "stripe";
import { checkoutSchema } from "@/lib/validations/stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
});

type CreateCheckoutSessionInput = {
    priceId: string;
};

export async function createCheckoutSession(input: CreateCheckoutSessionInput) {
    const validated = checkoutSchema.safeParse(input);

    if (!validated.success) {
        throw new Error("Nieprawidłowe ID ceny.");
    }

    try {
        const origin = (await headers()).get("origin");

        const session = await stripe.checkout.sessions.create({
            ui_mode: "embedded", // WRACAMY DO EMBEDDED
            line_items: [
                {
                    price: validated.data.priceId,
                    quantity: 1,
                },
            ],
            mode: "subscription",
            // Tutaj user wróci po sukcesie (na Twojej stronie)
            return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
            automatic_tax: { enabled: true },
        });

        return { clientSecret: session.client_secret };
    } catch (error) {
        console.error("Stripe Action Error:", error);
        throw new Error("Błąd generowania sesji.");
    }
}