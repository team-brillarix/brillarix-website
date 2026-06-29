export type CaseStudyResult = { value: string; label: string }
export type CaseStudyQuote = { text: string; name: string; role: string }

export type CaseStudy = {
  id: string
  name: string
  category: string
  badge?: string
  /** Short pre-launch / status note shown in the detail view. */
  note?: string
  overview: string
  challenge: string
  /** Product capabilities — what we shipped, in plain terms (not the stack). */
  whatWeBuilt: string[]
  /** Outcomes for the business and the people who use it. */
  impact: string[]
  /** Supporting numbers — shown as evidence, never as the headline result. */
  results?: CaseStudyResult[]
  quote?: CaseStudyQuote
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  mdl: {
    id: 'mdl',
    name: 'MDL — Modern Day Lending',
    category: 'Lending operating system · Built, owned & run by Brillarix',
    badge: 'Bubble → production',
    overview:
      'Modern Day Lending is a US mortgage brokerage. Its entire operation — from first lead to funded loan — runs on a platform we designed, built, own, and operate.',
    challenge:
      'MDL had outgrown its no-code Bubble app and was running the business across roughly 15 disconnected SaaS tools. Data was scattered, nothing was joined up, and the prototype couldn’t scale to how the company actually worked.',
    whatWeBuilt: [
      'A CRM that tracks every borrower from lead to qualification, pre-approval, underwriting, and funded loan',
      'AI follow-up that works leads automatically so none go cold',
      'Built-in telephony with call routing, recording, and AI call summaries',
      'A unified inbox — SMS, iMessage, and email in one thread per borrower',
      'Marketing automation and outbound message sequences',
      'Deep Encompass (LOS) integration for live closing and processor data',
      'A public appointment-booking app for borrowers',
    ],
    impact: [
      'One owned platform replaced ~15 rented, disconnected SaaS tools',
      'The whole business now runs on software MDL controls — not tools it can outgrow',
      'AI follow-up keeps every lead worked, lifting conversion without adding headcount',
      'A no-code prototype became a production system with the same team — no migration to a new vendor',
    ],
    results: [
      { value: '~250K+', label: 'lines of production code' },
      { value: '~15', label: 'SaaS tools replaced' },
      { value: '1', label: 'platform, built to own' },
    ],
  },

  meddstaff: {
    id: 'meddstaff',
    name: 'Meddstaff',
    category: 'Two-sided medical staffing marketplace · Our own product',
    badge: 'Our own product',
    note: 'Currently pre-launch — designed, built, and owned by Brillarix.',
    overview:
      'Meddstaff is a medical staffing marketplace we’re building and own — connecting hospitals that need to fill clinical shifts with doctors looking for per-shift, locum work.',
    challenge:
      'Filling clinical shifts is slow, manual, and leans on expensive agencies. When a doctor cancels at the last minute, wards can be left dangerously short-staffed.',
    whatWeBuilt: [
      'A marketplace where hospitals post open shifts and doctors apply or get invited',
      'Smart matching that surfaces the right doctors by specialty and how close they are',
      'Automatic backfill that finds a replacement the moment someone cancels',
      'Verified, on-site check-in so hospitals know the right doctor actually showed up',
      'Two-way ratings that build a reputation both sides can trust',
    ],
    impact: [
      'Hospitals fill open shifts in minutes instead of days',
      'Doctors find paid work matched to who they are and where they are',
      'Last-minute cancellations get covered automatically — wards stay staffed',
      'Better-staffed wards ultimately mean better care for patients',
    ],
  },

  trialynx: {
    id: 'trialynx',
    name: 'Trialynx',
    category: 'AI clinical-trial platform',
    overview:
      'Trialynx is an AI platform that streamlines how clinical trials are designed and documented — used by research sponsors, CROs, pharma teams, and research sites.',
    challenge:
      'Setting up a clinical trial means months of manual, error-prone documentation — protocols, consent forms, study plans. Every delay in that paperwork delays the trial, and a delayed trial means patients wait longer for the treatment it’s testing.',
    whatWeBuilt: [
      'AI that generates aligned protocols, consent forms, and 25+ study documents without duplication',
      'Auto-drafted study plans for statistical, safety, and clinical monitoring',
      'Early detection of operational risks while the trial is still being designed',
      'A shared workspace that captures every design decision and keeps documents in sync',
    ],
    impact: [
      'Months of trial documentation collapse into days',
      'First drafts come back near-final, needing only light edits',
      'Trials clear ethics review faster, with far fewer resubmissions',
      'The real payoff: treatments reach the patients waiting on them sooner, instead of stalling behind paperwork',
    ],
    results: [
      { value: '~90%', label: 'first drafts come back near-final' },
      { value: '50%', label: 'fewer IRB resubmissions' },
      { value: '48h', label: 'to deliver 40 custom protocols' },
    ],
    quote: {
      text: 'Their platform was the catalyst for our expansion into four countries, accelerating our medical writing speed by 90%.',
      name: 'Angie Schwab',
      role: 'CEO, Trialynx',
    },
  },

  signm: {
    id: 'signm',
    name: 'Signm',
    category: 'AI stock-analysis SaaS',
    overview:
      'Signm is an AI stock-analysis product that turns raw market data into clear, actionable insight for everyday investors.',
    challenge:
      'Most investors don’t have the time or tools to analyze markets like a professional — they’re left guessing, or paying for analysis they can’t interpret.',
    whatWeBuilt: [
      'An AI engine that turns market data into clear, plain-language analysis',
      'A product investors can act on without a finance background',
      'The full SaaS around it — accounts, subscriptions, and billing',
    ],
    impact: [
      'Thousands of investors get professional-grade analysis they can actually use',
      'A platform robust enough that users keep coming back',
      'A real, paying customer base — not just signups',
    ],
    results: [
      { value: '1,000+', label: 'paying customers' },
      { value: '4,000+', label: 'active users' },
    ],
    quote: {
      text: 'Over 4,000 users have since engaged with the platform — a testament to the system’s robustness.',
      name: 'Daniel S.',
      role: 'CEO, Signm',
    },
  },
}
