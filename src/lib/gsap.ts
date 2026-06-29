/* ------------------------------------------------------------------ *
 * Central GSAP setup.
 *
 * GSAP is the page's animation engine. ScrollTrigger drives every
 * scroll-reveal; the `useGSAP` hook (from @gsap/react) scopes tweens
 * to a component and reverts them on unmount — which also makes the
 * whole thing StrictMode-safe (effects run twice in dev).
 *
 * Motion is gated behind `(prefers-reduced-motion: no-preference)` via
 * gsap.matchMedia() at every call site, so reduced-motion users get the
 * final, static layout with no tweens registered.
 * ------------------------------------------------------------------ */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Shared easings — keep the page's motion feeling like one hand.
export const EASE = 'power3.out'

// Media query GSAP uses to skip animation for reduced-motion users.
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

export { gsap, ScrollTrigger, useGSAP }
