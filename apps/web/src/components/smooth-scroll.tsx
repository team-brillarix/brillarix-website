'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    const stopForLoadMotion = () => lenis.stop();
    const startAfterLoadMotion = () => lenis.start();

    window.addEventListener('brillarix:load-motion-stop', stopForLoadMotion);
    window.addEventListener('brillarix:load-motion-start', startAfterLoadMotion);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && document.querySelector('.home-page[data-home-ready="false"]')) lenis.stop();
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('brillarix:load-motion-stop', stopForLoadMotion);
      window.removeEventListener('brillarix:load-motion-start', startAfterLoadMotion);
      lenis.destroy();
    };
  }, []);

  return null;
}
