'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, Suspense } from 'react';

const PixelEvents = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // To odpala się przy zmianie ścieżki (nawigacja wewnątrz strony)
        // Sprawdzamy, czy fbq istnieje, żeby nie wywalić błędu przez AdBlocka
        if (typeof window.fbq !== 'undefined') {
            window.fbq('track', 'PageView');
        }
    }, [pathname, searchParams]);

    return (
        <Script
            id="fb-pixel-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          
          // Inicjalizacja Twoim ID
          fbq('init', '3412865108961069');
          // Pierwszy PageView leci od razu przy ładowaniu
          fbq('track', 'PageView');
        `,
            }}
        />
    );
};

export const FacebookPixel = () => {
    return (
        <>
            {/* Suspense jest konieczny dla useSearchParams w Next.js 15+ */}
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