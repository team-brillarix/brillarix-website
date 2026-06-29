import { Container, Reveal } from './ui'
import { JungleDivider } from './JungleDivider'

const QUOTES = [
  {
    quote:
      'Their platform was the catalyst for our expansion into four countries, accelerating our medical writing speed by 90%.',
    name: 'Angie Schwab',
    role: 'CEO, Trialynx',
    color: '#2BB3A3',
  },
  {
    quote:
      'Over 4,000 users have since engaged with the platform — a testament to the system’s robustness.',
    name: 'Daniel S.',
    role: 'CEO, Signm',
    color: '#FF6F61',
  },
  {
    quote:
      'They transformed my vision into a clean, powerful platform with flawless execution and communication.',
    name: 'Kevin Webb',
    role: 'KW Fitness',
    color: '#FFC53D',
  },
  {
    quote:
      'The team understood exactly what I needed and delivered flawless design and functionality.',
    name: 'Kapil Meena',
    role: 'Visionary Clouds',
    color: '#A4E866',
  },
]

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export function Testimonials() {
  return (
    <section className="relative bg-cream text-forest">
      <JungleDivider from="#123420" to="#fbf3dc" />
      <Container className="py-20 sm:py-28">
        <Reveal className="max-w-2xl">
          <span className="font-mono text-[0.82rem] tracking-[0.06em] text-leaf">
            <span className="opacity-55">//</span> happy humans
          </span>
          <h2 className="font-display mt-4 text-4xl text-forest sm:text-5xl">
            Founders, in their words 💬
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={(i % 2) * 90}>
              <figure className="pop-card flex h-full flex-col p-8">
                <div className="font-display text-5xl leading-[0.4] text-banana" aria-hidden="true">
                  &ldquo;
                </div>
                <blockquote className="mt-4 flex-1 text-[1.05rem] leading-relaxed text-forest">
                  {q.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[2.5px] border-forest font-display text-white"
                    style={{ background: q.color }}
                  >
                    {initials(q.name)}
                  </span>
                  <span>
                    <span className="block font-bold text-forest">{q.name}</span>
                    <span className="block font-mono text-xs text-forest-soft">{q.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
