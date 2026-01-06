'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState, Suspense } from 'react';

// 1. Wydzielamy logikę używającą hooków do osobnego komponentu
const PixelEvents = () => {
    const [loaded, setLoaded] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams(); // <--- To jest winowajca, który wymaga Suspense

    useEffect(() => {
        if (!loaded) return;
        // Track PageView on route change
        window.fbq('track', 'PageView');
    }, [pathname, searchParams, loaded]);

    return (
        <Script
            id="fb-pixel"
            src="https://connect.facebook.net/en_US/fbevents.js"
            strategy="afterInteractive"
            onLoad={() => {
                setLoaded(true);
                window.fbq('init', '3412865108961069');
                window.fbq('track', 'PageView');
            }}
        />
    );
};

// 2. Główny komponent eksportowany na zewnątrz
// Owija logikę w Suspense, co naprawia błąd budowania strony 404
export const FacebookPixel = () => {
    return (
        <>
            <Suspense fallback={null}>
                <PixelEvents />
            </Suspense>
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src="https://www.facebook.com/tr?id=3412865108961069&ev=PageView&noscript=1"
                    alt="fb-pixel-noscript"
                />
            </noscript>
        </>
    );
};