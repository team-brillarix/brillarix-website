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

/** One still in a section's gallery, sized so next/image can reserve its box. */
export type ProjectImage = {
  alt: string;
  caption?: string;
  height: number;
  src: string;
  width: number;
  /**
   * Frames the still to a shape its own file does not have, filling the box and
   * cropping the overflow. Left off, the source's native ratio is kept.
   */
  frame?: 'portrait' | 'landscape';
  /**
   * How far hovering magnifies this still. Device shots hold their subject
   * further from the lens, so they need less of it than a flat screenshot does.
   * Also sets how large a source is fetched, so it stays sharp without asking
   * the compositor to push a bitmap bigger than the zoom can show.
   */
  zoom?: number;
  /** Sets the title above the still rather than under it, and a size up. */
  titleAbove?: boolean;
  /**
   * Runs `src` as a looping clip instead of holding it as a still. It plays for
   * as long as the page is on screen rather than waiting for a pointer, so the
   * tile is never a frozen frame sitting next to a live one.
   */
  clip?: boolean;
};

/** A labelled prose block — the label sits in the left column, body on the right. */
export type ProjectSection = {
  body: string[];
  label: string;
  /** Stills shown directly beneath this block. */
  gallery?: ProjectImage[];
  /**
   * 'masonry' (the default) lets each still keep its own height and drops the
   * second one below the first. 'aligned' sets them level and to one shared
   * frame, so a pair reads as a matched set rather than an arrangement.
   */
  galleryLayout?: 'masonry' | 'aligned';
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
  /**
   * Omitted while a project is still waiting on its artwork. The card and the
   * hero then hold their frame at the right ratio rather than reserving nothing,
   * so the layout does not move when the still finally lands.
   */
  poster?: string;
  /** Native pixel size of the poster, so Next/Image reserves the right box. */
  posterWidth?: number;
  posterHeight?: number;
  /** Omitted where the only asset is a still, which the card and hero fall back to. */
  video?: string;
  /**
   * The clip the listing card runs, where the case study's own reel is the
   * wrong thing at that size -- too long to loop, or opening on a frame that
   * says nothing at a glance. Falls back to `video`.
   */
  cardVideo?: string;
  /** Set where the listing card reads better on the still than on the reel. */
  cardStillOnly?: boolean;
  /**
   * Runs the card's clip from the outset rather than on hover, even though a
   * still exists to carry the card. For a project whose reel is the thing worth
   * seeing, a tile that only moves once a pointer finds it moves for nobody.
   */
  cardClipAlways?: boolean;
  challenge: string[];
  /** Further labelled blocks after the challenge, in the order given. */
  sections?: ProjectSection[];
  links: ProjectLink[];
  /**
   * The pill that sits at the foot of the hero heading, flush right. Only the
   * projects with somewhere public to send people carry one; the rest leave it
   * off and the heading keeps the row to itself.
   */
  projectLink?: ProjectLink;
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
    video: '/projects/YStarEdu.mp4',
    cardStillOnly: true,
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
        gallery: [
          {
            src: '/projects/YStarEdu-billing-split.png',
            alt: 'Billing and credits: invoice states from draft to paid, beside a per-student credit ledger',
            caption: 'Invoice states from draft to paid, over a per-student credit ledger',
            width: 4000,
            height: 4000,
          },
          {
            src: '/projects/YStarEdu-mobile.png',
            alt: 'The workspace sign-in and the marketing site, shown on two phones',
            width: 1254,
            height: 1254,
          },
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
    slug: 'meddstaff',
    name: 'Meddstaff',
    tagline: 'A per-shift marketplace for hospitals and doctors, with no agency standing in between',
    category: 'Applications',
    heroTitle: 'Open shifts filled in minutes',
    video: '/projects/Meddstaff.mp4',
    cardVideo: '/projects/Meddstaff-intro.mp4',
    challenge: [
      'Hospitals fill open shifts through phone trees and agency middlemen. A cancellation at 6am is somebody’s morning spent dialling, and the agency that finally finds cover takes its cut from both sides. Doctors on the other side want per-shift work without a middleman standing between them and the ward.',
      'Meddstaff is not a client project. We are building it, we will run it, and we answer for it when it goes wrong. That is a different kind of brief: every decision on the product was made by the people who will take the call at six in the morning.',
    ],
    sections: [
      {
        label: 'Product overview',
        body: [
          'A hospital posts a shift and it fills in minutes. Matching handles the fit, a last-minute cancellation backfills on its own, and attendance is verified on site rather than assumed. For a doctor it is one app: see the shifts that suit you, take one, turn up, and get paid per shift with nobody taking a cut in between.',
          'Shifts, match, verify, wards, alerts, billing: six jobs, one system',
          'One Flutter codebase for Android and iOS.',
        ],
        gallery: [
          {
            src: '/projects/Meddstaff-screens.png',
            alt: 'Posting a shift, from choosing its type through to an emergency broadcast, over a week of the hospital staffing matrix',
            caption: 'Regular or emergency shift postings.',
            width: 4044,
            height: 3030,
          },
          {
            src: '/projects/Meddstaff-checkout.png',
            alt: 'The hospital web app showing a facility pin, its twenty metre radius, and an alert raised when a doctor steps outside it',
            caption: 'On-site Check-out, verified by location',
            width: 3840,
            height: 2280,
          },
          {
            src: '/projects/Meddstaff-doctor-app.png',
            alt: 'Three phones showing the doctor app: earnings and the next shift, a booking in detail, and the list of past bookings',
            caption: 'Verified hospitals, rated doctors, every shift paid.',
            zoom: 1.15,
            width: 4096,
            height: 3846,
          },
          {
            src: '/projects/Meddstaff-booking.png',
            alt: 'Two phones showing the doctor app home screen beside a booking with its payout, role and status timeline',
            caption: 'Full booking, right through to OR check-in.',
            zoom: 1.15,
            width: 2728,
            height: 2048,
          },
        ],
      },
      {
        label: 'Diary notes',
        body: [
          'We shipped the doctor side before the hospital side on purpose. A marketplace with no doctors on it is a form, and hospitals do not post shifts into a form. Android went first because that is where the doctors are; iOS follows.',
        ],
        gallery: [
          {
            src: '/projects/Meddstaff-responsive.png',
            alt: 'The hospital web app on a desk display beside the doctor app on a phone, showing the same booking from both sides',
            caption: 'Responsive mobile experience designed for meddstaff.',
            width: 2880,
            height: 2880,
            zoom: 1.15,
            // Square as supplied, which stands nearly twice as tall as the reel
            // at full measure. Held to the reel's own 16/9 instead: the crop
            // comes off the empty sky at the top and the foot of the phone,
            // keeping both screens' headings.
            frame: 'landscape',
            titleAbove: true,
          },
        ],
      },
    ],
    links: [{ href: '#contact', label: 'Discuss a build like this' }],
    // TODO: swap in the live Meddstaff URL once it is public. Held on the
    // contact section meanwhile so the pill never lands on a dead anchor.
    projectLink: { href: '#contact', label: 'Project' },
  },
  {
    slug: 'french-practice',
    name: 'FrenchPractice',
    tagline: 'TCF Canada preparation shaped, timed and scored like the real exam',
    category: 'Applications',
    // Non-breaking space: "TCF Canada" is one name and should never wrap apart.
    heroTitle: 'Four abilities, one clock, and a plan for the TCF\u00A0Canada',
    video: '/projects/FrenchPractice.mp4',
    challenge: [
      'Permanent residency in Canada is hard to get, and French makes it easier. Canadian immigration programmes score French ability through the TCF Canada, one exam that tests four things: listening, reading, writing and speaking, each with its own clock, its own question count and its own NCLC threshold. Most candidates prepare from scattered material that looks nothing like the paper they will sit, and find out on the day what the timing feels like.',
      'FrenchPractice asked us to build the opposite: a platform where every practice task is shaped like the exam, timed like the exam and scored on the exam’s scale. The difficult part was the two productive skills. Listening and reading can be marked by a machine; a written task and a spoken answer need structured review, and they had to get it without a tutor in the loop.',
    ],
    sections: [
      {
        label: 'Product overview',
        body: [
          'One test. Four abilities. A focused preparation plan. FrenchPractice takes a candidate through the TCF Canada the way the exam is built: thirty-nine listening questions in about thirty-five minutes, thirty-nine reading questions in sixty, three written tasks in sixty, three spoken tasks in twelve. Start with a free assessment, no card needed, and the platform tells you which ability to work on first.',
          'Forty reading tests and forty listening tests, each with the real question count and the real clock. The writing simulator runs the three written tasks against a timer and returns structured review. The speaking module gives realistic prompts with the exam’s preparation time, lets the candidate record and keep their answers, and puts a model answer beside each one. Nobody meets the format for the first time in the exam hall.',
          'Thirty-nine questions, thirty-five minutes, exactly as on the day',
          'Three written tasks, timed, with structured review',
        ],
        gallery: [
          {
            src: '/projects/FrenchPractice-devices.png',
            alt: 'The FrenchPractice reading-comprehension dashboard on a laptop, beside the phone app counting down twenty days to the exam',
            width: 3600,
            height: 2700,
            zoom: 1.15,
          },
          {
            src: '/projects/FrenchPractice-canada-pr.png',
            alt: 'Two phones showing the FrenchPractice site, the four TCF Canada abilities on one and a free account sign-up on the other, beside a Canada PR badge',
            width: 2894,
            height: 2174,
            zoom: 1.15,
          },
        ],
      },
      {
        label: 'Notes',
        body: [
          'A conversion table maps TCF Canada scores to NCLC levels, ability by ability, and the platform links to the official IRCC and test-body resources rather than paraphrasing them. The candidate can see what their practice score means for their application before they book the real exam.',
          'TCF score to NCLC level, per ability',
        ],
      },
    ],
    links: [{ href: '#contact', label: 'Discuss a build like this' }],
    projectLink: { href: 'https://frenchpractice.de/', label: 'Project' },
  },
  {
    slug: 'gym-builder',
    name: 'Gym Builder',
    tagline: 'Real-time intelligence for gym owners — dashboards and AI analytics that drive retention',
    category: 'Applications',
    heroTitle: 'Retention, made visible to the people who own it',
    // Same treatment as the KW Fitness reel: the still is the reel's own first
    // frame, so the hero's swap from one to the other is invisible.
    poster: '/projects/GymBuilder-poster.jpg',
    video: '/projects/GymBuilder-showcase.mp4',
    posterWidth: 1920,
    posterHeight: 1080,
    cardClipAlways: true,
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
    testimonial: {
      name: 'Evan Lindsay, Founder, Gym Builder',
      quote:
        'The platform built by Brillarix has been a game-changer for our visibility. We can isolate issues in minutes, and gyms using it consistently see 8–10%+ jumps in conversions. It’s strengthened our operations, boosted retention, and helped us deliver better client results.',
    },
  },
  {
    slug: 'trialynx',
    name: 'Trialynx',
    tagline: 'One study entered once, and twenty-five trial documents that cannot disagree with each other',
    category: 'AI Platforms',
    heroTitle: 'Less paperwork between medicine and the patient waiting on it',
    poster: '/projects/Trialynx.png',
    posterWidth: 1920,
    posterHeight: 1080,
    video: '/projects/Trialynx-showcase.mp4',
    cardClipAlways: true,
    challenge: [
      'A clinical trial cannot start until its documentation does. The protocol, the consent form, the investigator brochure and two dozen more study documents all have to say the same thing in different registers, for different readers, and every one of them has to agree with the others. Medical writers spend months restating the same facts, and every inconsistency between documents is another IRB resubmission and another month before a patient is enrolled.',
      'Trialynx asked us to build the engine underneath that: a platform that drafts the whole set from one source, so the documents cannot disagree. The hard part was not generating text. It was generating text a regulator would accept, and keeping twenty-five documents in step when any one of them changes.',
    ],
    sections: [
      {
        label: 'Product overview',
        body: [
          'Successful clinical trials start here. Trialynx is the intelligent infrastructure for launching trials that are scientifically sound, operationally feasible and financially responsible. Enter the study once, and the protocol, consent, investigator brochure, schedule of activities, statistical analysis plan, monitoring plans and the site forms come out of the same source, aligned, ready for review rather than written from a blank page.',
          'One platform, every document, aligned',
          'Protocol, consent and investigator brochure from a single input',
        ],
        gallery: [
          {
            src: '/projects/Trialynx-devices.png',
            alt: 'The Trialynx site on a laptop beside the platform’s security and privacy overview on a tablet',
            caption: '40 custom protocols in 48 hours',
            // Supplied square, which stands as tall as the measure is wide at
            // full width. Cropped to the reel's own 16/9 around the two
            // devices, so the desk and the light go rather than the hardware.
            width: 1254,
            height: 705,
            zoom: 1.15,
          },
          {
            src: '/projects/Trialynx-scene.mp4',
            alt: 'The Trialynx platform running on a laptop, the screen reflecting the room around it',
            clip: true,
            width: 1600,
            height: 1200,
            zoom: 1.15,
          },
        ],
      },
      {
        label: 'One source of truth, twenty-five documents',
        body: [
          'AI agents generate the protocol and 25 or more study documents from a single source of truth, so consent language cannot drift from the protocol it describes. Change a dose, a visit or an endpoint once and every document that mentions it follows. Nobody on a trial is paid to type the same fact twenty-five times, and now nobody does.',
          'Consent language that cannot drift from the protocol',
        ],
      },
      {
        label: 'Near-final, not blank',
        body: [
          'Reviewers open a draft that is about 90 percent complete instead of an empty template, and spend their time on judgement rather than transcription. Trials go through two fewer revision rounds and half as many IRB resubmissions, because the documents agreed with each other before anyone read them.',
          'First drafts around 90 percent complete',
          'Half as many IRB resubmissions',
        ],
      },
    ],
    links: [{ href: '#contact', label: 'Discuss a build like this' }],
    testimonial: {
      name: 'Angie Schwab, CEO, Trialynx',
      quote:
        'In under a year, Brillarix helped us transform our initial concept into a fully operational business with a recurring client base. Their platform was the catalyst for our expansion into four countries, accelerating our medical writing speed by 90% and enabling the launch of over 50 clinical trials.',
    },
  },
  {
    slug: 'visionary-clouds',
    name: 'Visionary Clouds',
    tagline: 'Commercial film and photography, given a site that sells the work as well as the work does',
    category: 'Websites',
    heroTitle: 'A studio site that moves like the films it sells',
    // The site on a cinema camera's monitor. The still is the designer's own
    // frame of the same shot: the reel opens on five frames of dark monitor,
    // then shows exactly this, so the hero's fade-in swallows the difference.
    poster: '/projects/VisionaryClouds-camera-poster.jpg',
    video: '/projects/VisionaryClouds-camera.mp4',
    posterWidth: 1920,
    posterHeight: 1080,
    cardClipAlways: true,
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
    testimonial: {
      name: 'Kapil Meena, Founder, Visionary Clouds',
      quote:
        'BRILLARIX built a stunning, high-performing website that exceeded my expectations. The team understood exactly what I needed and delivered flawless design and functionality. I’ve already seen a strong boost in engagement and conversions.',
    },
  },
  {
    slug: 'pt-metrics',
    name: 'PT Metrics',
    tagline: 'A personal training studio taken from idea to a live MVP in two weeks',
    category: 'Applications',
    heroTitle: 'Idea to a working MVP in two weeks',
    // The KW Fitness build. The still is the reel's own first frame, so the
    // hero's swap from one to the other is invisible.
    poster: '/projects/KWFitness-poster.jpg',
    video: '/projects/KWFitness-showcase.mp4',
    posterWidth: 1920,
    posterHeight: 1080,
    cardClipAlways: true,
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
    testimonial: {
      name: 'Kevin Webb, Founder, KW Fitness',
      quote:
        'Working with Brillarix on PT Metrics was exceptional. They transformed my vision into a clean, powerful platform with flawless execution and communication. Their partnership and creative problem-solving helped build a product that will truly elevate our business.',
    },
  },
];

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
