import { useRef, type CSSProperties, type ReactNode } from 'react'
import { EASE, MOTION_OK, gsap, useGSAP } from '../lib/gsap'

/* -------------------------------------------------------------------------- */
/* Layout                                                                     */
/* -------------------------------------------------------------------------- */

export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Reveal-on-scroll — GSAP + ScrollTrigger                                    */
/*                                                                            */
/* Same API as before (className / delay / style) so every section keeps      */
/* working; `delay` (ms) now drives the cascade inside staggered grids.       */
/* Motion is gated behind prefers-reduced-motion via gsap.matchMedia, so      */
/* reduced-motion users simply get the final layout with no tween at all.     */
/* -------------------------------------------------------------------------- */

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 26,
  start = 'top 85%',
  style,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  start?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from(el, {
          opacity: 0,
          y,
          duration: 0.85,
          ease: EASE,
          delay: delay / 1000,
          scrollTrigger: { trigger: el, start, once: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* RevealStagger — fades its direct children up in sequence as the group      */
/* enters. Use when the items aren't already individually wrapped in Reveal.  */
/* -------------------------------------------------------------------------- */

export function RevealStagger({
  children,
  className = '',
  stagger = 0.08,
  y = 18,
  start = 'top 85%',
}: {
  children: ReactNode
  className?: string
  stagger?: number
  y?: number
  start?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || el.children.length === 0) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from(Array.from(el.children), {
          opacity: 0,
          y,
          duration: 0.7,
          ease: EASE,
          stagger,
          scrollTrigger: { trigger: el, start, once: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* CountUp — the brand's "numbers are heroes" moment. Counts from 0 to the     */
/* target the first time it scrolls into view. Renders the final value up      */
/* front so reduced-motion / no-JS readers always see the real number.        */
/* -------------------------------------------------------------------------- */

const withCommas = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = 1.7,
  className = '',
}: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const fmt = (n: number) => `${prefix}${withCommas(n)}${suffix}`
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const counter = { v: 0 }
        el.textContent = fmt(0)
        gsap.to(counter, {
          v: value,
          duration,
          ease: 'power2.out',
          snap: { v: 1 },
          onUpdate: () => {
            el.textContent = fmt(counter.v)
          },
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <span ref={ref} className={className}>
      {prefix}
      {withCommas(value)}
      {suffix}
    </span>
  )
}
