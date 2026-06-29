import { Container, Reveal, RevealStagger } from './ui'

// Client wordmarks — swap for real logos when ready.
const CLIENTS = ['Trialynx', 'Signm', 'MDL', 'Visionary Clouds', 'KW Fitness', 'Gym Builder']

export function TrustStrip() {
  return (
    <section className="border-t border-lime/10 bg-canopy-2 py-10">
      <Container>
        <Reveal>
          <p className="text-center font-mono text-xs uppercase tracking-[0.15em] text-milk-soft">
            Bubble.io Silver Partner · Upwork Top Rated Plus · 50+ five-star reviews
          </p>
        </Reveal>
        <RevealStagger
          className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          stagger={0.06}
        >
          {CLIENTS.map((c) => (
            <span
              key={c}
              className="font-display text-xl text-milk/50 transition-colors hover:text-lime"
            >
              {c}
            </span>
          ))}
        </RevealStagger>
      </Container>
    </section>
  )
}
