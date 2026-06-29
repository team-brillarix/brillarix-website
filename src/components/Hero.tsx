import { useRef } from 'react'
import { ArrowRight, Bot, Check, Rocket, Wrench, type LucideIcon } from 'lucide-react'
import { EASE, MOTION_OK, gsap, useGSAP } from '../lib/gsap'

const ACTIVE_TRAILS: { icon: LucideIcon; label: string; note: string }[] = [
  { icon: Rocket, label: 'Launch an MVP', note: '2–6 week first release' },
  { icon: Wrench, label: 'Re-engineer for scale', note: 'Legacy app → production platform' },
  { icon: Bot, label: 'Automate with AI', note: 'Internal systems, copilots, workflow automation' },
]

const ADVANTAGES = ['Full-stack depth', 'AI-native by default', 'Rapid where it fits', 'Senior execution']

const TRUST = [
  { label: 'Top Rated Plus', dot: 'bg-lime' },
  { label: '50+ reviews', dot: 'bg-banana' },
  { label: 'Bubble Silver Agency Partner', dot: 'bg-blossom' },
]

// The "Shipment Ledger" — what's moved through the troop lately. Real shipments, not categories.
const LEDGER = [
  'Medical staffing marketplace MVP',
  'Lending CRM + AI follow-up',
  'Clinical-trial doc automation',
  'AI stock-analysis SaaS',
  'Internal approvals + ops dashboard',
  'AI sales copilot for outreach',
  'Workflow automation for lead routing',
  'Service booking platform rebuild',
  'RAG knowledge assistant',
  'Call routing + telephony system',
  'Marketing automation pipeline',
  'Cross-platform mobile app',
]

export function Hero() {
  const scope = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const ledgerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // Entrance — manifesto cascades up, board slides in, ledger follows.
        const tl = gsap.timeline({ defaults: { ease: EASE } })
        const left = leftRef.current
        if (left) {
          tl.from(Array.from(left.children), {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
          })
        }
        tl.from(boardRef.current, { y: 40, opacity: 0, duration: 0.9 }, '-=0.5').from(
          ledgerRef.current,
          { y: 26, opacity: 0, duration: 0.7 },
          '-=0.45',
        )

        // Ambient glow drifts on scroll for a touch of depth.
        gsap.to(bgRef.current, {
          yPercent: 16,
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    },
    { scope },
  )

  return (
    <header ref={scope} id="top" className="relative overflow-hidden bg-canopy text-milk">
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 500px at 82% -8%, rgba(164,232,102,0.10), transparent 60%), radial-gradient(820px 460px at 8% 112%, rgba(43,179,163,0.09), transparent 60%)',
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1180px] px-6 pb-14 pt-28 sm:px-8 lg:pt-32">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* LEFT — manifesto */}
          <div ref={leftRef} className="max-w-2xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] sm:text-xs">
              <span className="text-lime">Brillarix Troop HQ</span>
              <span className="mx-2 text-milk-soft/40">//</span>
              <span className="text-milk-soft">
                AI-native product studio for founders who want to ship
              </span>
            </div>

            <h1 className="font-display mt-6 text-5xl leading-[0.96] sm:text-6xl">
              Seven monkeys.
              <br />
              <span className="text-banana">Zero monkey</span>{' '}
              <span className="text-lime">business.</span>
            </h1>

            <div className="mt-7 max-w-xl">
              <p className="text-2xl font-semibold leading-snug text-milk sm:text-[1.7rem]">
                We build the products companies actually run on.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-milk-soft sm:text-base">
                MVPs, SaaS platforms, internal tools, and AI systems — built fast where
                speed matters, and deep where scale matters.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a className="btn-j banana" href="#calendly">
                Book a build call 🍌
              </a>
              <a className="btn-j ghost" href="#work">
                See what we&rsquo;ve shipped
              </a>
            </div>
          </div>

          {/* RIGHT — the troop's build board (pinned, modular, hand-arranged) */}
          <div
            ref={boardRef}
            className="relative rounded-[22px] border border-lime/12 bg-canopy-3/35 p-5 sm:p-6"
            style={{
              backgroundImage: 'radial-gradient(rgba(164,232,102,0.07) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime/80">
                Troop Ops Wall
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-milk-soft/65">
                <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_8px_var(--color-lime)]" />
                updated this week
              </span>
            </div>

            {/* Block A — Active Trails: the primary, pinned field card */}
            <div className="relative -ml-1 -rotate-1 rounded-2xl border-2 border-lime/25 bg-canopy-2 p-4 shadow-[0_8px_0_rgba(0,0,0,0.28)]">
              <span className="absolute -top-3.5 right-5 rotate-[14deg] text-xl" aria-hidden="true">
                📌
              </span>
              <div className="mb-3 flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime/70">
                  Active Trails
                </span>
                <span className="font-mono text-[10px] text-milk-soft/45">3 open</span>
              </div>
              <div className="space-y-0.5">
                {ACTIVE_TRAILS.map((t) => (
                  <a
                    key={t.label}
                    href="#services"
                    className="group flex items-start gap-3 rounded-lg px-1.5 py-2 transition-colors hover:bg-white/[0.05]"
                  >
                    <t.icon className="mt-0.5 h-5 w-5 shrink-0 text-lime" strokeWidth={2} />
                    <span className="min-w-0">
                      <span className="block text-[15px] font-semibold leading-tight text-milk">
                        {t.label}
                      </span>
                      <span className="mt-0.5 block font-mono text-[11px] leading-snug text-milk-soft/55">
                        {t.note}
                      </span>
                    </span>
                    <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-milk-soft/30 transition-transform group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Block B — Troop Advantages: a small supporting field note, pinned askew */}
            <div className="relative ml-auto mt-5 w-[82%] rotate-[1.5deg] rounded-[5px] bg-[#e6d8a6] px-3.5 py-3 text-forest shadow-[0_10px_22px_rgba(0,0,0,0.32)]">
              <span
                className="absolute -top-2.5 left-6 h-5 w-16 -rotate-6 rounded-[2px] bg-banana/75 shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                aria-hidden="true"
              />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-forest-soft">
                Troop advantages
              </span>
              <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
                {ADVANTAGES.map((a) => (
                  <span
                    key={a}
                    className="flex items-center gap-1.5 text-[12px] font-medium text-forest"
                  >
                    <Check className="h-3 w-3 shrink-0 text-leaf" strokeWidth={3} />
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Block C — Trust: pinned stamps */}
            <div className="ml-1 mt-7 flex flex-wrap items-center gap-2.5">
              {TRUST.map((t, i) => (
                <span
                  key={t.label}
                  className={`inline-flex items-center gap-2 rounded-full border border-lime/20 bg-canopy-2/70 px-3 py-1.5 text-[12px] text-milk-soft ${
                    i === 1 ? '-rotate-2' : i === 2 ? 'rotate-2' : ''
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SHIPMENT LEDGER */}
        <div
          ref={ledgerRef}
          className="mt-12 overflow-hidden rounded-[20px] border border-lime/10 bg-canopy-2/60"
        >
          <div className="flex items-center gap-3 px-5 pt-3.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime/80">
              Shipment Ledger
            </span>
            <span className="font-mono text-[11px] text-milk-soft/45">what&rsquo;s shipped lately</span>
          </div>
          <div className="mt-2 overflow-hidden py-3.5">
            <div className="flex w-max animate-[marquee_60s_linear_infinite] motion-reduce:animate-none">
              {[0, 1].map((seq) => (
                <div key={seq} className="flex shrink-0" aria-hidden={seq === 1}>
                  {LEDGER.map((item) => (
                    <span key={item} className="inline-flex items-center gap-3 pr-16">
                      <span className="text-[9px] text-lime/60">◆</span>
                      <span className="font-mono text-[13px] tracking-wide text-milk-soft">
                        {item}
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
