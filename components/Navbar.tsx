"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react"; // Ikony do mobile menu

export function Navbar() {
    const { scrollY } = useScroll();
    const [visible, setVisible] = useState(true);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // LOGIKA SMART SCROLL
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        // Wykryj czy strona została przewinięta (do zmiany tła)
        if (latest > 50) {
            setHasScrolled(true);
        } else {
            setHasScrolled(false);
        }

        // Logika ukrywania/pokazywania
        if (latest > previous && latest > 150) {
            // Scroll w dół -> Ukryj
            setVisible(false);
            setMobileMenuOpen(false); // Zamknij menu mobilne przy scrollu
        } else {
            // Scroll w górę -> Pokaż
            setVisible(true);
        }
    });

    const navLinks = [
        { name: "Oferta", href: "/#features" },
        { name: "Realizacje", href: "/#portfolio" }, // Jeśli masz sekcję portfolio
        { name: "O nas", href: "/#about" },
    ];

    return (
        <AnimatePresence mode="wait">
            <motion.nav
                initial={{ y: 0 }}
                animate={{
                    y: visible ? 0 : -100,
                    backgroundColor: hasScrolled ? "rgba(0, 0, 0, 0.7)" : "transparent",
                    backdropFilter: hasScrolled ? "blur(10px)" : "blur(0px)",
                    borderBottom: hasScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid transparent"
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn(
                    "fixed top-0 inset-x-0 z-[5000] w-full transition-colors duration-300"
                )}
            >
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                    {/* LOGO */}
                    <Link href="/" className="relative z-50">
                        <Image
                            src="/logo.png"
                            alt="We Unite"
                            width={120}
                            height={60}
                            className="h-8 w-auto object-contain"
                            loading="eager"
                        />
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA BUTTON & MOBILE TOGGLE */}
                    <div className="flex items-center gap-4">
                        <Link href="#contact" className="hidden md:block">
                            <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors">
                                Wycena
                            </button>
                        </Link>

                        {/* HAMBURGER (MOBILE) */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-white p-1"
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU OVERLAY */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-black/95 border-b border-white/10 overflow-hidden"
                        >
                            <div className="flex flex-col p-6 gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-lg font-medium text-zinc-300 hover:text-white"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
                                    <button className="w-full bg-white text-black px-5 py-3 rounded-xl text-base font-bold">
                                        Darmowa Konsultacja
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.nav>
        </AnimatePresence>
    );
}