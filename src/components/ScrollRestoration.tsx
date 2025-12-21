"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRestoration() {
    const pathname = usePathname();

    useEffect(() => {
        if (!window.location.hash) {
            requestAnimationFrame(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }, [pathname]);

    return null;
}

