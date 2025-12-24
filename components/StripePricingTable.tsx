"use client";

import Script from "next/script";
import React from "react";

export default function StripePricingTable() {
    return (
        <div className="w-full py-10 bg-background rounded-2xl">
            {/* 1. Ładujemy skrypt Stripe */}
            <Script async src="https://js.stripe.com/v3/pricing-table.js" />

            {/* 2. Wklejamy Twój tag. Dodajemy komentarz dla TS, żeby nie krzyczał o nieznanym elemencie */}
            {/* @ts-ignore - Stripe Custom Element */}
            <stripe-pricing-table
                pricing-table-id="prctbl_1Sha3tKj4BMzLxzEMfPFfMZV"
                publishable-key="pk_live_51ShQLRKj4BMzLxzEEXwlfV2jVrtFAOlDf8NTTIYrVeYnWcCmz0FXfXcMSQLP5TIpGfGbJHsYc10PebNAowbw33TO00Qx2ZDXxb"
            >
                {/* @ts-ignore */}
            </stripe-pricing-table>
        </div>
    );
}