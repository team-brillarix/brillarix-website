export type ProjectCategory = 'AI Platforms' | 'Applications' | 'Websites';

export type ProjectResult = {
  label: string;
  prefix?: string;
  value: string;
};

export type ProjectLink = {
  href: string;
  label: string;
};

/** A labelled prose block — the label sits in the left column, body on the right. */
export type ProjectSection = {
  body: string[];
  label: string;
};

export type ProjectTestimonial = {
  name: string;
  quote: string;
};

export type Project = {
  slug: string;
  /** Card + hero eyebrow. */
  name: string;
  /** Sits after the name on the grid card, exactly like the reference listing. */
  tagline: string;
  category: Exclude<ProjectCategory, 'All Projects'>;
  /** Split into words for the masked line reveal on the detail hero. */
  heroTitle: string;
  poster: string;
  /** Native pixel size of the poster, so Next/Image reserves the right box. */
  posterWidth: number;
  posterHeight: number;
  /** Omitted where the only asset is a still, which the card and hero fall back to. */
  video?: string;
  challenge: string[];
  /** Further labelled blocks after the challenge, in the order given. */
  sections?: ProjectSection[];
  links: ProjectLink[];
  results?: ProjectResult[];
  outcomeLabel?: string;
  outcomeTitle?: string;
  outcomeCopy?: string;
  testimonial?: ProjectTestimonial;
};

export const projectFilters = ['All Projects', 'AI Platforms', 'Applications', 'Websites'] as const;

export type ProjectFilter = (typeof projectFilters)[number];

export const projects: Project[] = [
  {
    slug: 'ystar-edu',
    name: 'YStar Edu',
    tagline: 'Timetable, prepaid balances and tutor pay, moved off spreadsheets and into a system the owner runs',
    category: 'Applications',
    heroTitle: 'One-to-one tutoring for families across Canada',
    poster: '/projects/YStarEdu.png',
    posterWidth: 1672,
    posterHeight: 941,
    challenge: [
      'YStar Edu tutors families across Canada, most of them Chinese-speaking, towards Ontario and BC diplomas and the international and English-language exams. Its tutors work from Canada, India and China, so one lesson can be booked in Toronto, taught from Kolkata and paid for from Shanghai, and its time has to be right for each of them. The business had outgrown the way it was run: the timetable lived in a shared calendar, prepaid balances in a spreadsheet updated by hand after each lesson, and tutor pay was reassembled every month from a lesson log.',
      'YStar Edu asked us to move all three into one system that kept every clock straight. The task was less about building software and more about moving a running business without stopping it, then handing over a system the owner could run without us.',
    ],
    sections: [
      {
        label: 'Product overview',
        body: [
          'YStar Edu sells one-to-one and small-group tutoring, billed in Canadian dollars, paid mostly by Interac e-Transfer and taught over Microsoft Teams. A family tops up once, books straight into a tutor’s open hours, joins a classroom that built itself, and reads the tutor’s feedback from a private link, in whichever of the three languages they read.',
          'Six kinds of people sign in: owner, coordinator, HR, finance, tutor and student. Each one sees a different product.',
        ],
      },
      {
        label: 'Diary notes',
        body: [
          'Halfway through, the billing model changed. Between 18 and 26 June hourly billing came out and prepaid credits went in: eight days, five structural changes, on a database that was already live. Because a family’s balance had always been the sum of an itemised history rather than a number somebody edits, the pivot was a conversion, not a rewrite.',
        ],
      },
    ],
    links: [{ href: '#contact', label: 'Discuss a build like this' }],
    testimonial: {
      name: 'Stella',
      quote:
        'Working with the team was a great experience from start to finish. They took the time to understand my requirements, suggested practical solutions, and delivered the project with great attention to detail. Communication was smooth, timelines were handled professionally, and any feedback I shared was quickly addressed. I’m really happy with the final product and would definitely recommend them to anyone looking for a reliable software development partner.',
    },
  },
  {
    slug: 'signm',
    name: 'Signm',
    tagline: 'An investing edge built on AI, monitoring millions of market conversations in real time',
    category: 'AI Platforms',
    heroTitle: 'Millions of market signals, read in real time',
    poster: '/projects/Signm.png',
    video: '/projects/Signm.mp4',
    posterWidth: 3024,
    posterHeight: 1714,
    challenge: [
      'Retail investors are drowning in market chatter. The signal exists — it is simply spread across millions of daily posts, filings and headlines that no individual can read, let alone weigh.',
      'Signm ingests that firehose and turns it into AI-powered stock analysis: sentiment, momentum and anomaly detection surfaced as something a person can actually act on. We delivered the full stack — custom APIs, the analysis pipeline, and a GCP and MongoDB infrastructure that stays stable under millions of events a day.',
    ],
    links: [{ href: '#contact', label: 'Discuss a build like this' }],
    results: [
      { prefix: 'More than', value: '1,000', label: 'Paid customers' },
      { prefix: 'Over', value: '4,000', label: 'Users on the platform' },
      { prefix: 'Supporting', value: 'Millions', label: 'Of daily events' },
    ],
    outcomeLabel: 'Infrastructure that holds',
    outcomeTitle: 'Full-stack delivery and an infrastructure built to stay up',
    outcomeCopy:
      'Several years of continuous partnership: full-stack development, custom APIs, and a stable GCP and MongoDB infrastructure supporting millions of daily events. Over four thousand users have since engaged with the platform — a fair test of how robust the system turned out to be.',
  },
  {
    slug: 'gym-builder',
    name: 'Gym Builder',
    tagline: 'Real-time intelligence for gym owners — dashboards and AI analytics that drive retention',
    category: 'Applications',
    heroTitle: 'Retention, made visible to the people who own it',
    poster: '/projects/GymBuilder.png',
    video: '/projects/GymBuilder.mp4',
    posterWidth: 1916,
    posterHeight: 1074,
    challenge: [
      'Gym owners sit on more data than they can use. Attendance, class bookings, lapsed memberships and lead enquiries all live in separate tools, which means the churn signal only becomes obvious once the member has already gone.',
      'We built Gym Builder as a single operating view: custom dashboards fed by the systems owners already run, with AI analytics that flag at-risk members and stalled leads early enough to do something about them.',
    ],
    links: [{ href: '#contact', label: 'Discuss a build like this' }],
    results: [
      { prefix: 'Conversion rate up', value: '8–10%', label: 'Across the funnel' },
      { prefix: 'One view for', value: 'Retention', label: 'Leads and attendance' },
      { prefix: 'Insight in', value: 'Real time', label: 'Not month-end reports' },
    ],
    outcomeLabel: 'Effortless growth',
    outcomeTitle: 'Analytics that owners actually open',
    outcomeCopy:
      'The measure of an internal tool is whether anyone uses it on a Tuesday morning. Gym Builder was designed around that: the numbers an owner needs are on the first screen, and the actions they imply are one click away.',
  },
  {
    slug: 'pt-metrics',
    name: 'PT Metrics',
    tagline: 'A personal training studio taken from idea to a live MVP in two weeks',
    category: 'Applications',
    heroTitle: 'Idea to a working MVP in two weeks',
    poster: '/projects/PTMetric.png',
    video: '/projects/PTMetric.mp4',
    posterWidth: 1920,
    posterHeight: 1080,
    challenge: [
      'PT Metrics runs personal training studios in Vestal, Fayetteville and Cicero, NY, serving Greater Binghamton and Syracuse with personalised workout and nutrition plans. They needed to be in market fast — before committing budget to a larger build.',
      'We scoped the smallest product that could prove demand, then shipped it: plan delivery, client onboarding and the booking path, live in two weeks. Everything that could wait, waited.',
    ],
    links: [{ href: '#contact', label: 'Discuss a build like this' }],
    results: [
      { prefix: 'Idea to MVP in', value: '2 weeks', label: 'Live and taking clients' },
      { prefix: 'Across', value: '3', label: 'Studio locations' },
      { prefix: 'Built for', value: 'Two regions', label: 'Binghamton and Syracuse' },
    ],
    outcomeLabel: 'Proof before scale',
    outcomeTitle: 'Ship the smallest thing that answers the real question',
    outcomeCopy:
      'A two-week MVP is not a smaller version of the full product — it is the part of it that settles the open question. For PT Metrics that was whether clients would book and stay through a digital plan. They did, and the roadmap after that was informed rather than guessed.',
  },
  {
    slug: 'visionary-clouds',
    name: 'Visionary Clouds',
    tagline: 'Commercial film and photography, given a site that sells the work as well as the work does',
    category: 'Websites',
    heroTitle: 'A studio site that moves like the films it sells',
    poster: '/projects/VisionaryClouds.png',
    video: '/projects/VisionaryClouds.mp4',
    posterWidth: 3024,
    posterHeight: 1714,
    challenge: [
      'Visionary Clouds produces premium commercial film and photography. Their previous site loaded slowly and flattened the work into thumbnails — the exact opposite of what a visual studio needs from its shopfront.',
      'We rebuilt it around the reel: full-bleed motion, a considered load sequence, and performance work so the heaviest media on the page still arrives fast. The brief was to make the site feel like a piece of their portfolio rather than a catalogue of it.',
    ],
    links: [{ href: '#contact', label: 'Discuss a build like this' }],
    results: [
      { prefix: 'Client acquisition up', value: '80%', label: 'Since launch' },
      { prefix: 'Built for', value: 'Motion', label: 'Full-bleed reel first' },
      { prefix: 'Measured on', value: 'Engagement', label: 'And conversion' },
    ],
    outcomeLabel: 'Design and functionality',
    outcomeTitle: 'A stunning, high-performing site that lifted conversions',
    outcomeCopy:
      'Brillarix built a site that exceeded expectations on both counts — the team understood exactly what was needed and delivered flawless design and functionality, with a strong measurable boost in engagement and conversions.',
  },
];

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
