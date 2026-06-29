import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Container, CountUp, Reveal } from './ui'
import { CASE_STUDIES } from '../data/caseStudies'
import { CaseStudyModal } from './CaseStudyModal'

/*
 * Capability showcase, jungle-styled. Each card is a teaser; clicking opens the
 * full impact story (CaseStudyModal) from ../data/caseStudies.ts.
 * Impact-led — what we built and what it changed, never the stack.
 */

function OverlayTrigger({
  id,
  name,
  onOpen,
}: {
  id: string
  name: string
  onOpen: (id: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(id)}
      aria-label={`View the ${name} case study`}
      className="absolute inset-0 z-20 rounded-[18px]"
    />
  )
}

function ViewCue({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <span
      className={`mt-6 inline-flex items-center gap-1.5 font-display text-sm tracking-wide ${
        tone === 'dark' ? 'text-lime' : 'text-leaf'
      }`}
    >
      View case study
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5"
        strokeWidth={2.5}
      />
    </span>
  )
}

export function CaseStudies() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const open = (id: string) => setSelectedId(id)

  return (
    <section id="work" className="relative bg-cream text-forest">
      <Container className="py-20 sm:py-28">
        <Reveal className="max-w-2xl">
          <span className="font-mono text-[0.82rem] tracking-[0.06em] text-leaf">
            <span className="opacity-55">//</span> shipped from the treetops 🚀
          </span>
          <h2 className="font-display mt-4 text-4xl text-forest sm:text-5xl">
            Software in production, not slideware.
          </h2>
          <p className="mt-4 text-lg text-forest-soft">
            Real platforms running real businesses — our clients&rsquo; and our own. No
            coconuts were exaggerated. Tap any card for the full story.
          </p>
        </Reveal>

        {/* ── Feature 01 — MDL ──────────────────────────────────────────── */}
        <Reveal className="mt-12">
          <article className="feat-card group relative cursor-pointer p-8 sm:p-10">
            <OverlayTrigger id="mdl" name="MDL" onOpen={open} />
            <div className="flex flex-wrap items-center gap-3">
              <span className="tag-j lime">AI · Lending CRM</span>
              <span className="tag-j lime">Bubble → production</span>
            </div>
            <h3 className="font-display mt-5 text-3xl text-banana sm:text-4xl">
              MDL — Modern Day Lending
            </h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-milk-soft">
              Modern Day Lending{' '}
              <b className="font-semibold text-milk">outgrew its no-code Bubble app</b> — so
              we re-engineered its entire business onto a platform we built, own, and run:
              CRM, AI follow-up, call routing, marketing automation, and deep Encompass
              (LOS) integration.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-12 gap-y-5">
              <div>
                <div className="metric-j banana tnum text-4xl sm:text-5xl">
                  <CountUp prefix="~" value={250} suffix="K+" />
                </div>
                <div className="metric-lbl-j mt-2 text-milk-soft">lines of production code</div>
              </div>
              <div>
                <div className="metric-j banana tnum text-4xl sm:text-5xl">
                  <CountUp prefix="~" value={15} />
                </div>
                <div className="metric-lbl-j mt-2 text-milk-soft">SaaS tools replaced</div>
              </div>
              <div>
                <div className="metric-j banana text-4xl sm:text-5xl">1</div>
                <div className="metric-lbl-j mt-2 text-milk-soft">platform, built to own</div>
              </div>
            </div>
            <ViewCue tone="dark" />
          </article>
        </Reveal>

        {/* ── Feature 02 — Meddstaff (our own product) ──────────────────── */}
        <Reveal className="mt-6">
          <article className="feat-card group relative cursor-pointer p-8 sm:p-10">
            <OverlayTrigger id="meddstaff" name="Meddstaff" onOpen={open} />
            <div className="flex flex-wrap items-center gap-3">
              <span className="tag-j lime">Healthcare · Marketplace</span>
              <span className="rounded-full bg-banana px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-forest">
                Our own product
              </span>
            </div>
            <h3 className="font-display mt-5 text-3xl text-banana sm:text-4xl">
              Meddstaff
            </h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-milk-soft">
              A two-sided medical staffing marketplace we designed, built, and own.
              Hospitals fill open clinical shifts in minutes; doctors find paid per-shift
              work nearby; last-minute cancellations get covered on their own — so wards
              are never left short-staffed.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {['Shifts filled in minutes', 'Cancellations auto-covered', 'Trusted both ways'].map(
                (o) => (
                  <span
                    key={o}
                    className="rounded-full border border-lime/30 bg-white/[0.05] px-3.5 py-1.5 text-sm text-milk"
                  >
                    {o}
                  </span>
                ),
              )}
            </div>
            <ViewCue tone="dark" />
          </article>
        </Reveal>

        {/* ── Supporting — Trialynx + Signm ─────────────────────────────── */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="pop-card group relative flex h-full cursor-pointer flex-col p-8 sm:p-9">
              <OverlayTrigger id="trialynx" name="Trialynx" onOpen={open} />
              <span className="tag-j self-start">AI · Healthcare</span>
              <h3 className="font-display mt-4 text-2xl text-forest">Trialynx</h3>
              <p className="mt-2 leading-relaxed text-forest-soft">
                Less paperwork between medicine and patient. We built the AI platform that
                turns months of clinical-trial documentation into days — so new treatments
                reach the patients waiting on them instead of stalling in review.
              </p>
              <div className="mt-auto pt-7">
                <div className="metric-j text-3xl sm:text-4xl">
                  Months <span className="text-cream-2">→</span> Days
                </div>
                <div className="metric-lbl-j mt-2 text-forest-soft">
                  to document a clinical trial
                </div>
                <ViewCue />
              </div>
            </article>
          </Reveal>

          <Reveal delay={90}>
            <article className="pop-card group relative flex h-full cursor-pointer flex-col p-8 sm:p-9">
              <OverlayTrigger id="signm" name="Signm" onOpen={open} />
              <span className="tag-j self-start">AI · Fintech</span>
              <h3 className="font-display mt-4 text-2xl text-forest">Signm</h3>
              <p className="mt-2 leading-relaxed text-forest-soft">
                Stock analysis anyone can act on. We built the AI platform behind their
                stock-analysis SaaS — turning raw market data into clear calls investors
                come back for.
              </p>
              <div className="mt-auto flex gap-10 pt-7">
                <div>
                  <div className="metric-j tnum text-3xl sm:text-4xl">
                    <CountUp value={1000} suffix="+" />
                  </div>
                  <div className="metric-lbl-j mt-2 text-forest-soft">paying customers</div>
                </div>
                <div>
                  <div className="metric-j tnum text-3xl sm:text-4xl">
                    <CountUp value={4000} suffix="+" />
                  </div>
                  <div className="metric-lbl-j mt-2 text-forest-soft">active users</div>
                </div>
              </div>
              <ViewCue />
            </article>
          </Reveal>
        </div>
      </Container>

      <CaseStudyModal
        study={selectedId ? CASE_STUDIES[selectedId] : null}
        onClose={() => setSelectedId(null)}
      />
    </section>
  )
}
