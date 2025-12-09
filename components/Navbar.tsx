"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Rozwiązania", href: "#features" },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Kontener paska nawigacji - Fixed u góry */}
            <nav className="fixed top-4 inset-x-0 max-w-5xl mx-auto z-50 px-4 md:px-0">
                <div className="relative flex items-center justify-between px-6 py-3 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl shadow-lg ring-1 ring-white/5 transition-all duration-300">

                    {/* LOGO */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_-3px_var(--primary)] group-hover:shadow-[0_0_20px_-3px_var(--primary)] transition-all">
                            <span className="font-bold text-white text-xs">WU</span>
                        </div>
                        <span className="font-bold text-sm tracking-wide text-zinc-100 group-hover:text-white transition-colors">
              WeUnite
            </span>
                    </Link>

                    {/* DESKTOP MENU (Ukryte na mobile) */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hover:shadow-[0_0_20px_-10px_rgba(255,255,255,0.5)]"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA BUTTON & MOBILE TOGGLE */}
                    <div className="flex items-center gap-4">
                        <button className="hidden md:block text-xs bg-white text-black px-5 py-2 rounded-full font-bold hover:bg-zinc-200 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]">
                            Kontakt
                        </button>

                        {/* Hamburger Button (Mobile) */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-zinc-300 hover:text-white p-1"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-20 inset-x-4 z-40 p-4 rounded-3xl border border-white/10 bg-black/90 backdrop-blur-2xl md:hidden"
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="p-4 text-center text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-white/10 my-2" />
                            <button className="w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-zinc-200 transition">
                                Skontaktuj się z nami
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};