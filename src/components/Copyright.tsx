"use client";

import React from "react";

export default function Copyright({ children }: { children: React.ReactNode }) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className="block w-full text-center text-background text-sm sm:text-base font-medium hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Scroll to top"
        >
            {children}
        </button>
    );
}

