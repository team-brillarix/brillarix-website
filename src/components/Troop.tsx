import { useRef } from 'react'
import { Container, Reveal } from './ui'
import { JungleDivider } from './JungleDivider'
import { EASE, MOTION_OK, gsap, useGSAP } from '../lib/gsap'

// The troop, ordered as an idea's journey: from the client's spark to a shipped
// product. `contribution` is what each monkey adds to the idea on the way down;
// `bio` is the personality shown in the roster cards below the journey.
const TROOP = [
  {
    emoji: '🤔',
    name: 'The Thinker',
    role: 'product strategy',
    contribution: 'Pressure-tests the idea — should it exist, and for whom?',
    bio: 'Will not let a feature into the jungle without a reason to exist.',
    c: '#2BB3A3',
  },
  {
    emoji: '😂',
    name: 'The Client Whisperer',
    role: 'founder & partnerships',
    contribution: 'Turns the founder’s vision into a plan the troop can swing at.',
    bio: 'Translates founder dreams into tickets the troop can actually swing at.',
    c: '#FFC53D',
  },
  {
    emoji: '🍌',
    name: 'The Banana Architect',
    role: 'backend & databases',
    contribution: 'Lays the backend and data spine the whole thing hangs from.',
    bio: 'Designs schemas the way he peels bananas: cleanly, from the right end.',
    c: '#FF6F61',
  },
  {
    emoji: '🙃',
    name: 'The Upside-Down One',
    role: 'frontend & ui',
    contribution: 'Brings the screens to life — UI that holds up in the wild.',
    bio: 'Writes CSS while hanging upside down. Somehow, everything still aligns perfectly.',
    c: '#FFC53D',
  },
  {
    emoji: '📱',
    name: 'The Side-Swinger',
    role: 'mobile',
    contribution: 'Swings it into pockets — mobile and cross-platform.',
    bio: 'iOS, Android, React Native, Flutter — one codebase, zero fear of heights.',
    c: '#A4E866',
  },
  {
    emoji: '🚀',
    name: 'The Jumper',
    role: 'devops & infra',
    contribution: 'Leaps it to production and keeps it standing.',
    bio: 'Leaps between branches and environments without dropping a single request.',
    c: '#A4E866',
  },
  {
    emoji: '🙌',
    name: 'The Celebrator',
    role: 'qa & testing',
    contribution: 'Hunts bugs joyfully, then throws both hands up at launch.',
    bio: 'Throws both hands up for every passing test. Finds bugs joyfully.',
    c: '#FF6F61',
  },
]

/* -------------------------------------------------------------------------- */
/* The idea-journey — a vine the client's idea slides down (scroll-scrubbed),  */
/* catching on each monkey before it lands on "Shipped".                       */
/* Center-alternating on md+, a left rail on mobile. Reduced-motion shows the   */
/* whole vine and every stop statically (no token, no scrub).                  */
/* -------------------------------------------------------------------------- */

function TroopJourney() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const tokenRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const wrap = wrapRef.current
      if (!wrap) return

      const stops = gsap.utils.toArray<HTMLElement>('[data-stop]', wrap)
      const nodes = stops.map((s) => s.querySelector('[data-node]') as HTMLElement)
      const cards = stops.map((s) => s.querySelector('[data-card]') as HTMLElement)
      const rings = stops.map((s) => s.querySelector('[data-ring]') as HTMLElement)

      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        const track = trackRef.current

        // Where each monkey sits along the vine (0–1). Measured before hiding them so
        // each "kick in" can fire the instant the idea token reaches that monkey.
        let arrivals: number[] = []
        const measure = () => {
          if (!track) return
          const top = track.getBoundingClientRect().top
          const denom = (track.offsetHeight || 1) - 26
          arrivals = nodes.map((n) => {
            const r = n.getBoundingClientRect()
            return gsap.utils.clamp(0, 1, (r.top - top + r.height / 2) / denom)
          })
        }
        measure()

        // Hidden start states (JS-only, so reduced-motion users never see them).
        gsap.set(fillRef.current, { scaleY: 0, transformOrigin: 'top' })
        gsap.set(tokenRef.current, { autoAlpha: 1, y: 0 })
        gsap.set(nodes, { scale: 0.3, rotate: -12, autoAlpha: 0 })
        gsap.set(cards, { autoAlpha: 0, y: 18 })

        // The hand-off: when the idea reaches a monkey, their speciality kicks in —
        // the node swings in with a spark in their colour, then the card slides out.
        const activated = stops.map(() => false)
        const kickIn = (i: number) => {
          if (activated[i]) return
          activated[i] = true
          const tl = gsap.timeline()
          tl.to(nodes[i], { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.5, ease: 'back.out(2)' }, 0)
          if (rings[i]) {
            tl.fromTo(
              rings[i],
              { scale: 0.7, autoAlpha: 0.9 },
              { scale: 2.3, autoAlpha: 0, duration: 0.7, ease: 'power2.out' },
              0,
            )
          }
          tl.to(cards[i], { autoAlpha: 1, y: 0, duration: 0.5, ease: EASE }, 0.08)
        }

        // Vine grows + the idea token rides its tip, locked to scroll; each monkey
        // activates exactly as the token passes them — a relay, strictly in order.
        const scrub = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: 'top 68%',
            end: 'bottom 82%',
            scrub: true,
            invalidateOnRefresh: true,
            onRefresh: measure,
            onUpdate: (self) => {
              const p = self.progress
              for (let i = 0; i < nodes.length; i++) {
                if (p >= arrivals[i]) kickIn(i)
              }
            },
          },
        })
        scrub
          .to(fillRef.current, { scaleY: 1, ease: 'none', duration: 1 }, 0)
          .fromTo(
            tokenRef.current,
            { y: 0 },
            { y: () => (trackRef.current?.offsetHeight ?? 0) - 26, ease: 'none', duration: 1 },
            0,
          )
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        // Static: full vine, no travelling token, everything visible.
        gsap.set(fillRef.current, { scaleY: 1, transformOrigin: 'top' })
        gsap.set(tokenRef.current, { autoAlpha: 0 })
      })
    },
    { scope: wrapRef },
  )

  return (
    <div ref={wrapRef} className="relative mx-auto mt-14 max-w-3xl pb-24 pt-24 md:pb-28 md:pt-28">
      {/* Vine: dim track + bright growing fill */}
      <div
        ref={trackRef}
        className="pointer-events-none absolute inset-y-0 left-6 w-[3px] -translate-x-1/2 md:left-1/2"
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-full bg-leaf/20" />
        <div
          ref={fillRef}
          className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-lime via-leaf to-lime"
        />
      </div>

      {/* The idea, travelling down the vine */}
      <div
        ref={tokenRef}
        className="pointer-events-none absolute left-6 top-0 z-20 -translate-x-1/2 md:left-1/2"
        aria-hidden="true"
      >
        <span className="relative flex h-7 w-7 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-banana/25 blur-[3px]" />
          <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-banana text-[11px] shadow-[0_0_12px_var(--color-banana)]">
            💡
          </span>
        </span>
      </div>

      {/* IDEA endcap */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-3 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:flex-col md:gap-2 md:text-center">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-banana bg-canopy-2 text-2xl shadow-[0_0_0_5px_#123420]">
          💡
        </span>
        <div className="leading-tight">
          <div className="font-display text-base text-banana">Your idea</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-milk-soft/70">
            the client’s spark
          </div>
        </div>
      </div>

      {/* STOPS */}
      <ol className="relative space-y-11 md:space-y-16">
        {TROOP.map((m, i) => {
          const right = i % 2 === 0
          return (
            <li
              key={m.name}
              data-stop
              className="relative grid grid-cols-[3rem_1fr] items-center gap-x-4 md:grid-cols-[1fr_3rem_1fr] md:gap-x-6"
            >
              {/* node (on the vine) */}
              <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
                <span
                  data-node
                  className="relative flex h-12 w-12 items-center justify-center rounded-full border-[3px] bg-canopy-2 text-2xl shadow-[0_0_0_5px_#123420]"
                  style={{ borderColor: m.c }}
                >
                  <span
                    data-ring
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-1 rounded-full border-2 opacity-0"
                    style={{ borderColor: m.c }}
                  />
                  {m.emoji}
                </span>
              </div>

              {/* contribution card (alternates side on md+) */}
              <div
                className={`col-start-2 row-start-1 ${
                  right ? 'md:col-start-3 md:text-left' : 'md:col-start-1 md:text-right'
                }`}
              >
                <div
                  data-card
                  className={`w-full max-w-sm rounded-2xl border-2 bg-canopy-3/55 p-4 backdrop-blur-sm md:w-auto md:max-w-[20rem] ${
                    right ? 'md:mr-auto' : 'md:ml-auto'
                  }`}
                  style={{ borderColor: `${m.c}55` }}
                >
                  <div
                    className={`flex items-center gap-2 ${right ? '' : 'md:flex-row-reverse'}`}
                  >
                    <span
                      className="font-mono text-[11px] font-bold"
                      style={{ color: m.c }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-lg text-banana">{m.name}</h3>
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-lime/80">
                    {m.role}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-milk-soft">
                    {m.contribution}
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ol>

      {/* SHIPPED endcap */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-3 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:flex-col md:gap-2 md:text-center">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-forest bg-banana text-2xl shadow-[0_0_0_5px_#123420]">
          🚀
        </span>
        <div className="leading-tight">
          <div className="font-display text-base text-lime">Shipped</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-milk-soft/70">
            live &amp; running
          </div>
        </div>
      </div>
    </div>
  )
}

export function Troop() {
  return (
    <section id="troop" className="relative bg-canopy-2 text-milk">
      <JungleDivider from="#fbf3dc" to="#123420" />
      <Container className="py-20 sm:py-28">
        <Reveal className="max-w-2xl">
          <span className="eyebrow-j">the troop</span>
          <h2 className="font-display mt-4 text-4xl text-milk sm:text-5xl">
            Meet the seven who ship 🍌
          </h2>
          <p className="mt-4 text-lg text-milk-soft">
            Every great jungle has a troop. Here’s how an idea moves through ours — from your
            first message to a product running in production.
          </p>
        </Reveal>

        {/* The journey: idea → seven monkeys → shipped */}
        <TroopJourney />

        {/* The roster: the same seven, off the clock */}
        <Reveal className="mt-20 max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-lime/80">
            <span className="opacity-55">//</span> the same seven, off the clock
          </span>
          <p className="mt-3 text-milk-soft">
            They write production code, argue about tabs vs. spaces, and occasionally fall out of
            a tree mid-standup.
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <figure className="relative mx-auto max-w-3xl rotate-[-1.2deg]">
            <span
              className="absolute -top-3.5 left-1/2 z-10 h-8 w-28 -translate-x-1/2 rotate-2 rounded-[2px] bg-banana/85 shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
              aria-hidden="true"
            />
            <div className="relative rounded-[8px] border border-forest/10 bg-white p-4 pb-12 shadow-[0_24px_60px_rgba(8,28,16,0.35)]">
              <img
                src="/team-photo.png"
                alt="The Brillarix troop — seven monkeys in Hawaiian shirts working on laptops in the jungle"
                className="w-full rounded-[4px]"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-4 text-center font-mono text-xs text-forest-soft">
                // the_troop.jpg — annual offsite, somewhere in the canopy
              </figcaption>
            </div>
          </figure>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TROOP.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 70}>
              <article className="pop-card relative h-full p-7">
                <span className="absolute -top-3 right-5 rotate-12 text-2xl" aria-hidden="true">
                  📌
                </span>
                <div
                  className="flex h-[74px] w-[74px] items-center justify-center rounded-full border-[3px] border-forest text-4xl"
                  style={{ background: m.c }}
                >
                  {m.emoji}
                </div>
                <h3 className="font-display mt-4 text-xl text-forest">{m.name}</h3>
                <p className="mt-1 font-mono text-[0.72rem] text-leaf">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-forest-soft">{m.bio}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
