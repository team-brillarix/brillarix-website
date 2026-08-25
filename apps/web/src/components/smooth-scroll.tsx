'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

// Matches the CSS --anchor-offset token, which also drives scroll-padding-top
// for the non-JS / reduced-motion path.
function anchorOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--anchor-offset');
  const parsed = Number.parseInt(raw, 10);
  return Number.isNaN(parsed) ? 124 : parsed;
}

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

    // Lenis' own `anchors` option does not preventDefault, so the browser jump
    // and the eased scroll would both run. This does one or the other.
    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (lenis.isSmooth === false) return;

      const anchor = (event.target as Element | null)?.closest?.('a[href]');
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === '_blank') return;

      const destination = new URL(anchor.href);
      const current = new URL(window.location.href);
      if (destination.origin !== current.origin) return;
      if (destination.pathname !== current.pathname || !destination.hash) return;

      const target = document.querySelector(destination.hash);
      if (!(target instanceof HTMLElement)) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: -anchorOffset() });
      window.history.pushState(null, '', destination.hash);
      // Keeps the skip link and keyboard navigation meaningful — without this
      // the eased scroll moves the page but leaves focus behind.
      target.focus({ preventScroll: true });
    };

    window.addEventListener('brillarix:load-motion-stop', stopForLoadMotion);
    window.addEventListener('brillarix:load-motion-start', startAfterLoadMotion);
    window.addEventListener('brillarix:scroll-lock', stopForLoadMotion);
    window.addEventListener('brillarix:scroll-unlock', startAfterLoadMotion);
    document.addEventListener('click', onDocumentClick);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && document.querySelector('.home-page[data-home-ready="false"]')) lenis.stop();
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('brillarix:load-motion-stop', stopForLoadMotion);
      window.removeEventListener('brillarix:load-motion-start', startAfterLoadMotion);
      window.removeEventListener('brillarix:scroll-lock', stopForLoadMotion);
      window.removeEventListener('brillarix:scroll-unlock', startAfterLoadMotion);
      document.removeEventListener('click', onDocumentClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
