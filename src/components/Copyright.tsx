"use client";

import React from "react";

interface CopyrightProps {
    children: React.ReactNode;
    className?: string;
}

export default function Copyright({ children, className = "" }: CopyrightProps) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`block w-full text-center text-sm sm:text-base font-medium hover:opacity-80 transition-opacity cursor-pointer ${className}`}
            aria-label="Scroll to top"
        >
            {children}
        </button>
    );
}

