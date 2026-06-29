import { Container, Reveal, RevealStagger } from './ui'

const EXPLORE = [
  { label: 'What We Build', href: '#services' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Shipped', href: '#work' },
  { label: 'Build System', href: '#process' },
  { label: 'The Troop', href: '#troop' },
]

const SOCIAL = [
  { label: 'X', href: '#', handle: '@brillarixtech' },
  { label: 'LinkedIn', href: '#', handle: 'Brillarix' },
  { label: 'Instagram', href: '#', handle: '@brillarixtech' },
]

export function Footer() {
  return (
    <footer className="bg-[#081a10] text-milk-soft">
      <Container className="py-16">
        <RevealStagger className="flex flex-wrap justify-between gap-10" stagger={0.1} y={22}>
          <div className="max-w-xs">
            <a className="logo-j" href="#top">
              <span className="mark">🐒</span>Brilla<b>rix</b>
            </a>
            <p className="mt-3 text-sm leading-relaxed">
              A troop of seven building the software companies actually run on — from
              validated idea to production-grade platform.
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-milk-soft/70">
              Jaipur, India · Est. 2023
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-lime">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-banana">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-lime">Connect</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:contact@brillarix.com"
                  className="transition-colors hover:text-banana"
                >
                  contact@brillarix.com
                </a>
              </li>
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-banana"
                  >
                    <span>{s.label}</span>
                    <span className="text-milk-soft/55">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </RevealStagger>

        <Reveal
          start="top bottom"
          className="mt-12 flex flex-col gap-3 border-t border-lime/15 pt-6 font-mono text-xs sm:flex-row sm:items-center sm:justify-between"
        >
          <p>© 2026 Brillarix. Seven monkeys, zero monkey business.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-banana">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-banana">
              Terms
            </a>
          </div>
        </Reveal>
      </Container>
    </footer>
  )
}
