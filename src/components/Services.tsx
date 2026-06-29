import { Rocket, Boxes, Sparkles, Check, type LucideIcon } from 'lucide-react'
import { Container, Reveal } from './ui'
import { JungleDivider } from './JungleDivider'

type Service = {
  icon: LucideIcon
  title: string
  accent: string
  core?: boolean
  lead: string
  rest: string
  points: string[]
}

// Three modes Brillarix plugs in — Build (full-stack core) is the center of gravity.
const SERVICES: Service[] = [
  {
    icon: Rocket,
    title: 'Launch',
    accent: '#a4e866', // lime
    lead: 'Get a real v1 into users’ hands fast.',
    rest: 'An MVP, internal tool, portal, or workflow system — built to keep, not throw away.',
    points: [
      'First release in weeks, not months',
      'Engineer-led, AI-assisted execution',
      'Rapid-build systems where they fit',
      'Built to evolve, not restart later',
    ],
  },
  {
    icon: Boxes,
    title: 'Build',
    accent: '#ffc53d', // banana — the core lane
    core: true,
    lead: 'Build the software your company runs on.',
    rest: 'From SaaS platforms and internal tools to backend-heavy systems, mobile apps, and operational workflows.',
    points: [
      'Full-stack web and mobile products',
      'APIs, integrations, and backend systems',
      'Product architecture and database design',
      'Platforms built to scale after launch',
    ],
  },
  {
    icon: Sparkles,
    title: 'Add AI',
    accent: '#2bb3a3', // teal
    lead: 'Add real AI capability — to the product or the business.',
    rest: 'Copilots, RAG systems, automation flows, internal AI tools, and workflow layers that do useful work.',
    points: [
      'LLM agents and retrieval systems',
      'Workflow automation and copilots',
      'AI features inside existing products',
      'Guardrails for real business data',
    ],
  },
]

export function Services() {
  return (
    <section id="services" className="relative bg-canopy-2 text-milk">
      <JungleDivider from="#fbf3dc" to="#123420" />
      <Container className="py-20 sm:py-28">
        <Reveal className="max-w-2xl">
          <span className="eyebrow-j">what we build</span>
          <h2 className="font-display mt-4 text-4xl text-milk sm:text-5xl">
            What we actually build
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-milk-soft">
            From first release to production-grade platforms and AI systems, Brillarix plugs in
            where your product needs speed, engineering depth, or operational leverage.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-stretch">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.title} delay={i * 90}>
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border-2 bg-canopy-3 p-8 transition-all duration-200 hover:-translate-y-1.5 ${
                    s.core
                      ? 'border-banana/55 shadow-[0_26px_64px_-30px_rgba(255,197,61,0.4)] md:-mt-3 md:pb-11 md:pt-11'
                      : 'border-lime/20 hover:border-lime'
                  }`}
                >
                  {s.core && (
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(420px 220px at 50% -10%, rgba(255,197,61,0.14), transparent 65%)',
                      }}
                      aria-hidden="true"
                    />
                  )}

                  <div className="relative flex items-start justify-between">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{
                        background: `${s.accent}1f`,
                        boxShadow: `inset 0 0 0 1px ${s.accent}55`,
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: s.accent }} strokeWidth={2} />
                    </span>
                    {s.core && (
                      <span className="rounded-full border border-banana/45 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-banana/90">
                        our core
                      </span>
                    )}
                  </div>

                  <h3 className="font-display relative mt-5 text-2xl text-banana">{s.title}</h3>
                  <p className="relative mt-2 leading-relaxed text-milk-soft">
                    <b className="font-semibold text-milk">{s.lead}</b> {s.rest}
                  </p>

                  <ul className="relative mt-6 space-y-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-milk">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" strokeWidth={2.75} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
