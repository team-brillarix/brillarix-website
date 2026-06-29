import { useState, type FormEvent } from 'react'
import { Container, Reveal } from './ui'
import { JungleDivider } from './JungleDivider'
import { BananaCatchGame } from './BananaCatchGame'

const fieldCls =
  'w-full rounded-xl border border-lime/15 bg-canopy/60 px-4 py-3 text-[15px] text-milk placeholder:text-milk-soft/40 outline-none transition-colors focus:border-lime'

export function FinalCTA() {
  const [gameOpen, setGameOpen] = useState(false)
  const [gameName, setGameName] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const nm = (form.elements.namedItem('name') as HTMLInputElement | null)?.value ?? ''
    setGameName(nm)
    // TODO: deliver the message — POST these fields to a form endpoint (Formspree/backend).
    setGameOpen(true)
    form.reset()
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-canopy text-milk">
      <JungleDivider from="#123420" to="#0c2417" />
      <Container className="py-24 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,27rem)] lg:gap-16">
          {/* Pitch + primary booking path */}
          <Reveal>
            <span className="text-5xl" aria-hidden="true">
              🍌
            </span>
            <h2 className="font-display mt-5 max-w-xl text-4xl leading-tight text-milk sm:text-5xl">
              Have an idea — or a product that&rsquo;s outgrown its tools?
            </h2>
            <p className="mt-5 max-w-md text-lg text-milk-soft">
              Let&rsquo;s build the version that scales. Toss us a banana and we&rsquo;ll swing
              into action.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a className="btn-j banana" href="#calendly">
                Book a build call 🍌
              </a>
              <a
                href="mailto:contact@brillarix.com"
                className="font-mono text-sm text-milk-soft underline-offset-4 transition-colors hover:text-lime hover:underline"
              >
                or email contact@brillarix.com
              </a>
            </div>
          </Reveal>

          {/* Contact form — submit launches the banana game */}
          <Reveal delay={90}>
            <form
              onSubmit={handleSubmit}
              className="rounded-[26px] border-2 border-lime/20 bg-canopy-2/70 p-6 sm:p-8"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-lime">
                <span className="opacity-55">//</span> tell us what you&rsquo;re building
              </p>
              <div className="mt-5 space-y-3.5">
                <div>
                  <label htmlFor="cf-name" className="sr-only">
                    Your name
                  </label>
                  <input id="cf-name" name="name" required placeholder="Your name" className={fieldCls} />
                </div>
                <div>
                  <label htmlFor="cf-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className={fieldCls}
                  />
                </div>
                <div>
                  <label htmlFor="cf-msg" className="sr-only">
                    What are you building?
                  </label>
                  <textarea
                    id="cf-msg"
                    name="message"
                    rows={3}
                    required
                    placeholder="What are you building?"
                    className={`${fieldCls} resize-none`}
                  />
                </div>
              </div>
              <button type="submit" className="btn-j banana mt-5 w-full justify-center">
                Send it over 🍌
              </button>
              <p className="mt-3 text-center font-mono text-[11px] text-milk-soft/50">
                We swing back within a day.
              </p>
            </form>
          </Reveal>
        </div>
      </Container>

      <BananaCatchGame open={gameOpen} name={gameName} onClose={() => setGameOpen(false)} />
    </section>
  )
}
