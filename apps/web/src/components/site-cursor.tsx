'use client';

import { useEffect, useRef } from 'react';

const EASE = 0.16;

export function SiteCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let frame = 0;

    const moveCursor = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.dataset.visible = 'true';
    };

    const updateHoverState = (event: PointerEvent) => {
      const target = event.target;
      const element = target instanceof Element ? target : null;
      const isInteractive = Boolean(element?.closest('[data-cursor]'));
      // Project cards swap the dot for a filled disc carrying an arrow, the way
      // the reference listing signals "this opens".
      cursor.dataset.arrow = String(Boolean(element?.closest('[data-cursor-arrow]')));
      cursor.dataset.expanded = String(isInteractive);
    };

    const hideCursor = () => {
      cursor.dataset.visible = 'false';
      cursor.dataset.expanded = 'false';
      cursor.dataset.arrow = 'false';
    };

    const render = () => {
      currentX += (targetX - currentX) * EASE;
      currentY += (targetY - currentY) * EASE;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', moveCursor, { passive: true });
    document.addEventListener('pointerover', updateHoverState, { passive: true });
    document.documentElement.addEventListener('mouseleave', hideCursor);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', moveCursor);
      document.removeEventListener('pointerover', updateHoverState);
      document.documentElement.removeEventListener('mouseleave', hideCursor);
    };
  }, []);

  return (
    <div ref={cursorRef} className="site-cursor" aria-hidden="true">
      {/* Drawn in black so the parent's difference blend renders it white
          against the disc, without a second blend context. */}
      <svg className="site-cursor-arrow" viewBox="0 0 24 24" fill="none">
        <path d="M7 17 17 7M9 7h8v8" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
