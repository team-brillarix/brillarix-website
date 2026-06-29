import { useRef } from 'react'
import { Container, Reveal } from './ui'
import { JungleDivider } from './JungleDivider'
import { EASE, MOTION_OK, ScrollTrigger, gsap, useGSAP } from '../lib/gsap'

// Three principles as stops along the trail — descending in scale and emphasis.
const STOPS = [
  {
    n: '01',
    title: 'Full-stack first',
    tag: 'Built to last',
    tone: '#2e8b4f', // leaf — the primary doctrine
    primary: true,
    body: 'Solid backend architecture, thoughtful system design, and implementation that holds up after launch — not just through a demo.',
  },
  {
    n: '02',
    title: 'AI as leverage, not autopilot',
    tag: 'Human-led',
    tone: '#2bb3a3', // teal
    body: (
      <>
        AI helps us move faster across research, scaffolding, workflow speed, and repetitive
        execution — but product thinking and engineering judgment stay with the team.
      </>
    ),
  },
  {
    n: '03',
    title: 'Rapid systems, used deliberately',
    tag: 'When it fits',
    tone: '#9a6233', // warm bark — the supporting stop
    muted: true,
    body: (
      <>
        For the right products, tools like <b className="font-semibold text-forest">Bubble</b>,{' '}
        <b className="font-semibold text-forest">Xano</b>, and{' '}
        <b className="font-semibold text-forest">Pinecone</b> help us ship faster without giving up
        structure — especially for internal tools, portals, SaaS workflows, and ops systems.
      </>
    ),
  },
]

function TopoBackdrop() {
  const ring =
    'M0,-38 C22,-39 41,-18 39,3 C37,25 19,41 -3,40 C-25,39 -41,19 -39,-3 C-38,-23 -22,-37 0,-38 Z'
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* dappled leaf-light */}
      <div
        className="absolute -right-28 -top-24 h-[460px] w-[460px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(46,139,79,0.11), transparent)' }}
      />
      <div
        className="absolute -bottom-32 -left-28 h-[420px] w-[420px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(43,179,163,0.09), transparent)' }}
      />
      {/* topographic contours */}
      <svg
        className="absolute -right-16 -top-12 h-[480px] w-[480px]"
        viewBox="-50 -50 100 100"
        fill="none"
        stroke="rgba(34,48,31,0.07)"
        strokeWidth="0.5"
      >
        {[1, 0.78, 0.58, 0.4, 0.24].map((s, i) => (
          <path key={i} d={ring} transform={`scale(${s})`} />
        ))}
      </svg>
      <svg
        className="absolute -bottom-20 -left-16 h-[420px] w-[420px]"
        viewBox="-50 -50 100 100"
        fill="none"
        stroke="rgba(34,48,31,0.06)"
        strokeWidth="0.5"
      >
        {[1, 0.74, 0.5, 0.28].map((s, i) => (
          <path key={i} d={ring} transform={`scale(${s}) rotate(18)`} />
        ))}
      </svg>
    </div>
  )
}

function TrailSpine() {
  return (
    <svg
      className="pointer-events-none absolute inset-y-1 left-0 w-16 sm:w-[5.5rem]"
      viewBox="0 0 88 1000"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="trailFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9a6233" stopOpacity="0" />
          <stop offset="0.07" stopColor="#9a6233" stopOpacity="0.6" />
          <stop offset="0.55" stopColor="#2bb3a3" stopOpacity="0.55" />
          <stop offset="0.95" stopColor="#2e8b4f" stopOpacity="0.5" />
          <stop offset="1" stopColor="#2e8b4f" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="trailDraw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2e8b4f" />
          <stop offset="0.5" stopColor="#2bb3a3" />
          <stop offset="1" stopColor="#2e8b4f" />
        </linearGradient>
      </defs>
      <path
        d="M44 0 C 34 160, 54 330, 44 480 C 34 620, 54 800, 44 1000"
        stroke="url(#trailFade)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="2 11"
      />
      {/* Solid overlay that "draws" along the trail as you scroll (progress). */}
      <path
        data-trail-draw
        d="M44 0 C 34 160, 54 330, 44 480 C 34 620, 54 800, 44 1000"
        pathLength={1}
        stroke="url(#trailDraw)"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
      />
    </svg>
  )
}

export function Promise() {
  const trailRef = useRef<HTMLOListElement>(null)

  useGSAP(
    () => {
      const root = trailRef.current
      if (!root) return
      const stops = gsap.utils.toArray<HTMLElement>('[data-stop]', root)
      const contents = stops.map((s) => s.querySelector('[data-content]') as HTMLElement)
      const rings = stops.map((s) => s.querySelector('[data-ring]') as HTMLElement)
      const draw = root.querySelector('[data-trail-draw]') as SVGPathElement | null

      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        // Fade only the text — never the marker, which masks the vine behind it.
        gsap.set(stops, { transformOrigin: 'left center' })
        gsap.set(contents, { opacity: 0.55 })
        gsap.set(rings, { autoAlpha: 0 })
        if (draw) gsap.set(draw, { strokeDashoffset: 1 })

        // The trail draws itself as you move through the section.
        if (draw) {
          gsap.to(draw, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: { trigger: root, start: 'top 70%', end: 'bottom 60%', scrub: true },
          })
        }

        // Spotlight: the point you're currently on grows and is full-strength;
        // every other point sits slightly faded. (The trail fill carries progress.)
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
            start: 'top 65%',
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

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (draw) gsap.set(draw, { strokeDashoffset: 0 })
      })
    },
    { scope: trailRef },
  )

  return (
    <section className="relative overflow-hidden bg-cream text-forest">
      <JungleDivider from="#123420" to="#fbf3dc" />
      <TopoBackdrop />

      <Container className="relative py-20 sm:py-28">
        <Reveal className="max-w-2xl">
          <span className="font-mono text-[0.82rem] tracking-[0.06em] text-leaf">
            <span className="opacity-55">//</span> the troop playbook
          </span>
          <h2 className="font-display mt-4 text-4xl text-forest sm:text-5xl">
            Built by engineers. <span className="text-leaf">Accelerated by AI.</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-forest-soft">
            Brillarix is a <b className="font-semibold text-forest">full-stack product studio
            first</b>. We use AI and rapid-build tooling where they help products move faster or
            operate better — but architecture, system design, and major technical decisions stay
            with the team.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white/55 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-forest/55">
            <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
            engineer-led · ai-assisted
          </div>
        </Reveal>

        {/* The trail — three stops along Brillarix's build philosophy */}
        <ol ref={trailRef} className="relative mt-14 space-y-12 sm:mt-16 sm:space-y-16">
          <TrailSpine />
          {STOPS.map((s) => (
            <li
              key={s.n}
              data-stop
              className="relative grid grid-cols-[4rem_1fr] gap-x-4 sm:grid-cols-[5.5rem_1fr] sm:gap-x-8"
            >
              {/* waypoint marker */}
              <div className="flex justify-center">
                <span
                  data-marker
                  className={`relative z-10 flex items-center justify-center rounded-full font-display ${
                    s.primary
                      ? 'h-14 w-14 text-2xl text-cream sm:h-[4.5rem] sm:w-[4.5rem] sm:text-[1.75rem]'
                      : s.muted
                        ? 'h-11 w-11 text-sm sm:h-12 sm:w-12 sm:text-base'
                        : 'h-12 w-12 text-base sm:h-14 sm:w-14 sm:text-xl'
                  }`}
                  style={
                    s.primary
                      ? {
                          background: s.tone,
                          boxShadow: `0 0 0 6px var(--color-cream), 0 0 0 8px ${s.tone}33`,
                        }
                      : {
                          background: 'var(--color-cream)',
                          color: s.tone,
                          boxShadow: `inset 0 0 0 2.5px ${s.tone}, 0 0 0 6px var(--color-cream)`,
                        }
                  }
                >
                  <span
                    data-ring
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-full opacity-0"
                    style={{ boxShadow: `0 0 0 4px ${s.tone}33, 0 0 22px ${s.tone}` }}
                  />
                  {s.n}
                </span>
              </div>

              {/* field-guide note */}
              <div data-content className={s.primary ? '' : 'pt-1'}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.18em]"
                    style={{ color: s.tone }}
                  >
                    Rule {s.n}
                  </span>
                  <span
                    className="rounded-full border px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em]"
                    style={{ borderColor: `${s.tone}55`, color: s.tone }}
                  >
                    {s.tag}
                  </span>
                </div>
                <h3
                  className={`font-display mt-2 ${
                    s.muted
                      ? 'text-lg text-forest/80 sm:text-xl'
                      : 'text-2xl text-forest sm:text-[1.7rem]'
                  }`}
                >
                  {s.title}
                </h3>
                <p
                  className={`mt-2.5 max-w-xl leading-relaxed text-forest-soft ${
                    s.primary ? 'text-base sm:text-lg' : 'text-[15px]'
                  }`}
                >
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
