import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import {CookieConsent} from "@/components/CookieConsent";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
// Definicja fontów
const fontHeading = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-heading", // To nazwa zmiennej, którą złapiemy w CSS
    display: "swap",
});

const fontBody = Inter({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
});

const fontMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "WeUnite | Automatyzacja Jutra",
    description: "Dedykowane rozwiązania AI i automatyzacja biznesu.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // W Tailwind 4 dark mode działa często automatycznie, ale wymuśmy klasę 'dark' dla pewności i stylu
        <html lang="pl" className="dark">
        <body
            className={`${fontHeading.variable} ${fontBody.variable} ${fontMono.variable} antialiased bg-background text-foreground smooth-scroll`}
        >
        <Navbar />
        <SmoothScroll>
            {children}
        </SmoothScroll>
        <CookieConsent />
        </body>
        </html>
    );
}