"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { scrollToSection } from '@/lib/utils';

export default function HashScrollHandler() {
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (pathname !== '/') return;

    const handleHashScroll = () => {
      const hash = window.location.hash;
      const elementId = hash.substring(1);

      if (!elementId) return;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          scrollToSection(elementId);
        } else {
          setTimeout(() => {
            const retryElement = document.getElementById(elementId);
            if (retryElement) scrollToSection(elementId);
          }, 200);
        }
      }, 150);
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll, { passive: true });

    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname]);

  return null;
}


