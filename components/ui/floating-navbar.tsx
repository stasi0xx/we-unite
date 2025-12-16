"use client";
import React, {JSX, useState} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export const FloatingNav = ({
                              navItems,
                              className,
                            }: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  // Stan widoczności
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Sprawdź czy scroll jest zdefiniowany (nie na serwerze)
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // Jeśli jesteśmy na samej górze strony -> ZAWSZE widoczny
        setVisible(true);
      } else {
        if (direction < 0) {
          // Scroll w GÓRĘ -> Pokaż
          setVisible(true);
        } else {
          // Scroll w DÓŁ -> Ukryj
          setVisible(false);
        }
      }
    }
  });

  return (
      <AnimatePresence mode="wait">
        <motion.div
            initial={{
              opacity: 1,
              y: -100,
            }}
            animate={{
              y: visible ? 0 : -100,
              opacity: visible ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className={cn(
                // Baza styli: Fixed, na górze, wycentrowany
                "flex max-w-fit fixed top-5 inset-x-0 mx-auto border border-white/10 rounded-full bg-black/50 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-6 py-3 items-center justify-center space-x-4",
                className
            )}
        >
          {/* LOGO w wersji mini (tylko ikonka, żeby nie zajmowało miejsca) */}
          <Link href="/" className="mr-4">
            <Image
                src="/hero-logo.png"
                alt="Logo"
                width={30}
                height={30}
                className="w-8 h-auto object-contain"
            />
          </Link>

          {/* Linki Nawigacyjne */}
          {navItems.map((navItem: any, idx: number) => (
              <Link
                  key={`link=${idx}`}
                  href={navItem.link}
                  className={cn(
                      "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 transition-colors"
                  )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block text-sm font-medium cursor-pointer">{navItem.name}</span>
              </Link>
          ))}

          {/* Przycisk Kontakt (Wyróżniony) */}
          <Link href="#contact">
            <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full cursor-pointer">
              <span>Kontakt</span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
            </button>
          </Link>
        </motion.div>
      </AnimatePresence>
  );
};