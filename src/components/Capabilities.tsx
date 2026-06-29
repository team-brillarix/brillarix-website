import {
  AppWindow,
  ArrowLeftRight,
  Gauge,
  Sparkles,
  Workflow,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'
import { Container, Reveal } from './ui'
import { JungleDivider } from './JungleDivider'

// What the troop can build — by product type, framed as outcomes, never frameworks.
const TYPES: { icon: LucideIcon; accent: string; name: string; body: string }[] = [
  {
    icon: AppWindow,
    accent: '#2e8b4f',
    name: 'SaaS platforms',
    body: 'Products your customers log into every day — accounts, billing, dashboards, the whole thing.',
  },
  {
    icon: ArrowLeftRight,
    accent: '#2bb3a3',
    name: 'Marketplaces & networks',
    body: 'Two-sided platforms that match supply with demand — and the operations to back them up.',
  },
  {
    icon: Gauge,
    accent: '#e09f0f',
    name: 'Internal tools & ops',
    body: 'The dashboards and workflows your team actually runs the business on.',
  },
  {
    icon: Sparkles,
    accent: '#ff6f61',
    name: 'AI copilots & automation',
    body: 'Assistants and automations that do real operational work — not chat-box demos.',
  },
  {
    icon: Workflow,
    accent: '#6b4226',
    name: 'CRMs & business systems',
    body: 'Pipelines, messaging, scheduling, and the glue that ties them all together.',
  },
  {
    icon: Smartphone,
    accent: '#2e8b4f',
    name: 'Customer & mobile apps',
    body: 'Products that live beyond the browser — in pockets and out in the field.',
  },
]

const DOMAINS = ['Lending', 'Healthcare', 'Clinical research', 'Staffing', 'Sales', 'Fitness', 'Operations']

export function Capabilities() {
  return (
    <section id="capabilities" className="relative bg-cream text-forest">
      <JungleDivider from="#123420" to="#fbf3dc" />
      <Container className="py-20 sm:py-28">
        <Reveal className="max-w-2xl">
          <span className="font-mono text-[0.82rem] tracking-[0.06em] text-leaf">
            <span className="opacity-55">//</span> what we can take on
          </span>
          <h2 className="font-display mt-4 text-4xl text-forest sm:text-5xl">
            If it runs a business, the troop can build it.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-forest-soft">
            From a quick first release to the platform an entire company runs on, the troop builds
            across industries and product types. Whatever you&rsquo;re building, we&rsquo;ve
            probably cut a trail through something like it.
          </p>
        </Reveal>

        {/* Product types — outcome-framed, not a stack list */}
        <div className="mt-12 grid gap-x-9 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {TYPES.map((t, i) => {
            const Icon = t.icon
            return (
              <Reveal key={t.name} delay={(i % 3) * 70}>
                <div className="flex gap-4">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${t.accent}1f`, boxShadow: `inset 0 0 0 1px ${t.accent}45` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: t.accent }} strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-forest">{t.name}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-forest-soft">{t.body}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Breadth of domains — the "solve anything" proof, bridging into the case studies */}
        <Reveal className="mt-14">
          <div className="rounded-2xl border border-forest/10 bg-white/60 p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-7">
            <div>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-forest/45">
                Shipped across
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {DOMAINS.map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-cream px-3 py-1 text-[13px] font-medium text-forest/80"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-forest-soft sm:mt-0 sm:shrink-0 sm:text-right">
              Different problems, one troop — and most of them are{' '}
              <b className="font-semibold text-forest">live, not demos</b>.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
