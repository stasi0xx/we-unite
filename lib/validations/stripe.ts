import { z } from "zod";

export const checkoutSchema = z.object({
    priceId: z.string().startsWith("price_"), // Walidacja formatu Stripe
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;