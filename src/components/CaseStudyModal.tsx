import { useEffect, useRef, type ReactNode } from 'react'
import { Check, X } from 'lucide-react'
import type { CaseStudy } from '../data/caseStudies'

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="mt-8 first:mt-0">
      <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-leaf">{label}</h3>
      <div className="mt-3">{children}</div>
    </section>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-forest">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" strokeWidth={2.5} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function CaseStudyModal({
  study,
  onClose,
}: {
  study: CaseStudy | null
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dlg = ref.current
    if (!dlg) return
    if (study && !dlg.open) {
      dlg.showModal()
      document.body.style.overflow = 'hidden'
    } else if (!study && dlg.open) {
      dlg.close()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [study])

  useEffect(() => {
    const dlg = ref.current
    if (!dlg) return
    const handle = () => onClose()
    dlg.addEventListener('close', handle)
    return () => dlg.removeEventListener('close', handle)
  }, [onClose])

  return (
    <dialog
      ref={ref}
      className="case-modal"
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close()
      }}
    >
      {study && (
        <div className="max-h-[88vh] overflow-y-auto rounded-[20px] border-[3px] border-forest bg-cream text-forest shadow-[0_28px_70px_rgba(8,28,16,0.5)]">
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b-2 border-forest/15 bg-cream/95 px-6 py-5 backdrop-blur-sm sm:px-8">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="font-display text-2xl text-forest sm:text-3xl">{study.name}</h2>
                {study.badge && (
                  <span className="rounded-full bg-banana px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-forest">
                    {study.badge}
                  </span>
                )}
              </div>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-leaf">
                {study.category}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="-mr-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-forest-soft transition-colors hover:bg-forest/10 hover:text-forest"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-6 py-7 sm:px-8 sm:py-8">
            <div className="flex aspect-[16/9] w-full items-center justify-center rounded-[12px] border-2 border-dashed border-forest/25 bg-cream-2 font-mono text-xs uppercase tracking-[0.14em] text-forest-soft">
              Product screenshot — 16:9
            </div>

            <Section label="Overview">
              <p className="text-[15px] leading-relaxed text-forest-soft">{study.overview}</p>
            </Section>

            <Section label="The challenge">
              <p className="text-[15px] leading-relaxed text-forest-soft">{study.challenge}</p>
            </Section>

            <Section label="What we built">
              <CheckList items={study.whatWeBuilt} />
            </Section>

            <Section label="The impact">
              <CheckList items={study.impact} />
            </Section>

            {study.results && (
              <Section label="By the numbers">
                <div className="grid grid-cols-3 gap-4 rounded-[14px] border-2 border-forest/10 bg-white p-6">
                  {study.results.map((r) => (
                    <div key={r.label}>
                      <p className="font-display text-2xl leading-none text-blossom sm:text-3xl">
                        {r.value}
                      </p>
                      <p className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.05em] text-forest-soft">
                        {r.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {study.quote && (
              <figure className="mt-8 rounded-[14px] border-2 border-forest/10 bg-white p-6">
                <div className="font-display text-4xl leading-[0.3] text-banana" aria-hidden="true">
                  &ldquo;
                </div>
                <blockquote className="mt-3 text-[15px] leading-relaxed text-forest">
                  {study.quote.text}
                </blockquote>
                <figcaption className="mt-3 text-sm">
                  <span className="font-bold text-forest">{study.quote.name}</span>
                  <span className="font-mono text-xs text-forest-soft"> — {study.quote.role}</span>
                </figcaption>
              </figure>
            )}

            {study.note && (
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-leaf">
                {study.note}
              </p>
            )}

            <div className="mt-8 flex flex-col items-start gap-4 border-t-2 border-forest/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-forest-soft">Want something like this built?</p>
              <a href="#calendly" onClick={onClose} className="btn-j banana">
                Book a build call 🍌
              </a>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
