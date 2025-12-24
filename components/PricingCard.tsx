"use client";

import { useState, useTransition } from "react";
import { createCheckoutSession } from "@/app/actions/stripe";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Proste ikonki SVG inline, żeby nie bawić się w importy
const CheckIcon = () => (
    <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

const LoaderIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
);

interface PricingCardProps {
    title: string;
    price: string;
    description: string;
    features: string[];
    priceId: string;
    badge?: string;
}

export default function PricingCard({
                                        title,
                                        price,
                                        description,
                                        features,
                                        priceId,
                                        badge
                                    }: PricingCardProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleBuy = () => {
        startTransition(async () => {
            try {
                // @ts-ignore
                const { url } = await createCheckoutSession({ priceId });
                if (url) {
                    // Przekierowanie na stronę Stripe
                    router.push(url);
                }
            } catch (error) {
                console.error(error);
                alert("Coś poszło nie tak. Spróbuj ponownie.");
            }
        });
    };

    return (
        <div className="relative group w-full max-w-sm mx-auto">
            {/* GLOW EFFECT pod spodem */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

            {/* KARTA */}
            <div className="relative flex flex-col h-full bg-neutral-900 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">

                {badge && (
                    <div className="absolute -top-4 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        {badge}
                    </div>
                )}

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-white/90">{title}</h3>
                    <p className="mt-2 text-sm text-neutral-400 h-10">{description}</p>
                </div>

                <div className="mb-8">
                    <span className="text-4xl font-bold text-white">{price}</span>
                    <span className="text-neutral-500 ml-2">/ msc</span>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm text-neutral-300">
                            <CheckIcon />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <Link
                    href={`/checkout/${priceId}`}
                    className="block w-full text-center bg-white text-black font-bold py-3 rounded-xl hover:bg-neutral-200 transition"
                >
                    Wybieram ten plan
                </Link>
            </div>
        </div>
    );
}