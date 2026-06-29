import { useRef } from 'react'
import { Container, Reveal } from './ui'
import { JungleDivider } from './JungleDivider'
import { EASE, MOTION_OK, ScrollTrigger, gsap, useGSAP } from '../lib/gsap'

const STEPS = [
  { emoji: '🔭', title: 'Discovery & Strategy', body: 'Map the core hypothesis, the users, and the scaling path before a line of code.' },
  { emoji: '🌱', title: 'AI-Accelerated Build', body: 'AI-assisted scaffolding and rapid-build tooling put a working, engineered first version in front of users in weeks — not a throwaway mockup.' },
  { emoji: '🌳', title: 'Full-Stack Development', body: 'Built on Next.js, NestJS, and PostgreSQL — real databases, secure backends, architecture that scales.' },
  { emoji: '🧪', title: 'Testing & Optimization', body: 'Harden for real load: performance, security, and edge cases under production conditions.' },
  { emoji: '🚀', title: 'Launch & Deployment', body: 'Ship to production on AWS / GCP / Vercel — and stay to run it with you.' },
]

export function Process() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const wrap = wrapRef.current
      if (!wrap) return
      const stops = gsap.utils.toArray<HTMLElement>('[data-stop]', wrap)
      const contents = stops.map((s) => s.querySelector('[data-content]') as HTMLElement)
      const rings = stops.map((s) => s.querySelector('[data-ring]') as HTMLElement)

      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // Fade only the text — never the marker, which masks the spine behind it.
        gsap.set(stops, { transformOrigin: 'left center' })
        gsap.set(contents, { opacity: 0.55 })
        gsap.set(rings, { autoAlpha: 0 })

        // The spine fills as you scroll the steps.
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: wrap, start: 'top 72%', end: 'bottom 78%', scrub: true },
          },
        )

        // Spotlight: the step you're currently on grows and is full-strength; every
        // other step sits slightly faded. (The spine fill carries the progress.)
        const reached = stops.map(() => false)
        const render = () => {
          let active = -1
          reached.forEach((r, i) => {
            if (r) active = i
          })
          stops.forEach((stop, i) => {
            const on = i === active
            gsap.to(stop, { scale: on ? 1.06 : 1, duration: 0.45, ease: EASE, overwrite: 'auto' })
            gsap.to(contents[i], {
              opacity: on ? 1 : 0.55,
              duration: 0.45,
              ease: EASE,
              overwrite: 'auto',
            })
            gsap.to(rings[i], {
              autoAlpha: on ? 1 : 0,
              duration: 0.4,
              ease: EASE,
              overwrite: 'auto',
            })
          })
        }
        stops.forEach((stop, i) => {
          ScrollTrigger.create({
            trigger: stop,
            start: 'top 66%',
            onEnter: () => {
              reached[i] = true
              render()
            },
            onLeaveBack: () => {
              reached[i] = false
              render()
            },
          })
        })
      })
    },
    { scope: wrapRef },
  )

  return (
    <section id="process" className="relative bg-canopy-2 text-milk">
      <JungleDivider from="#fbf3dc" to="#123420" />
      <Container className="py-20 sm:py-28">
        <Reveal className="max-w-2xl">
          <span className="eyebrow-j">build system</span>
          <h2 className="font-display mt-4 text-4xl text-milk sm:text-5xl">
            From whiteboard to production, in five steps.
          </h2>
        </Reveal>

        <div ref={wrapRef} className="relative mx-auto mt-12 max-w-3xl">
          {/* dim track + bright fill that draws as you scroll */}
          <div
            className="absolute bottom-10 left-[34px] top-10 w-1 rounded bg-leaf/15"
            aria-hidden="true"
          />
          <div
            ref={lineRef}
            className="absolute bottom-10 left-[34px] top-10 w-1 origin-top rounded bg-gradient-to-b from-lime to-leaf"
            aria-hidden="true"
          />
          <ol className="space-y-1">
            {STEPS.map((s) => (
              <li key={s.title} data-stop className="flex items-start gap-7 py-4">
                <span
                  data-marker
                  className="relative z-[1] flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full border-[3px] border-lime bg-canopy-3 text-3xl shadow-[0_0_0_6px_#123420]"
                >
                  <span
                    data-ring
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_0_0_4px_rgba(164,232,102,0.25),0_0_22px_rgba(164,232,102,0.9)]"
                  />
                  {s.emoji}
                </span>
                <div data-content className="pt-3.5">
                  <h3 className="font-display text-xl text-banana">{s.title}</h3>
                  <p className="mt-1.5 max-w-[58ch] leading-relaxed text-milk-soft">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
