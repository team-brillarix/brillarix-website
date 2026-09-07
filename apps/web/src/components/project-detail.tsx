'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Fragment, useEffect, useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ContactSection } from '@/components/contact-section';
import { ElasticDivider } from '@/components/elastic-divider';
import { projects, type Project } from '@/constants/projects';

// Tighter per-word cadence than the home page's four-word headings: these run
// to a full sentence, and 0.18s a word would still be arriving three seconds in.
const sectionHeadingVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};

const sectionHeadingWordVariants: Variants = {
  hidden: { y: '145%' },
  visible: { y: 0, transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] } },
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
};

const labelVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

// Long prose reveals a line at a time; per-word masking on a 60-word quote
// would still be arriving long after it had been read.
const lineVariants: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

function MaskedHeading({ id, text, className }: { id?: string; text: string; className: string }) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  return (
    <motion.h2
      className={className}
      id={id}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={sectionHeadingVariants}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="project-heading-word-mask">
            <motion.span className="project-heading-word" variants={sectionHeadingWordVariants}>
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </motion.h2>
  );
}

// The plucked string from the home and services pages, held to this page's
// narrower measure so it lines up with the prose above and below it.
function Divider() {
  return (
    <div className="project-divider">
      <ElasticDivider />
    </div>
  );
}

/** Label left, paragraphs right — the reference's two-column prose block. */
function ProseBlock({
  label,
  body,
  labelId,
  children,
}: {
  label: string;
  body: string[];
  labelId?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="project-prose" aria-labelledby={labelId}>
      <motion.p
        className="project-section-label"
        id={labelId}
        variants={labelVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        {label}
      </motion.p>
      <div className="project-prose-body">
        {body.map((paragraph, index) => (
          <motion.p
            key={index}
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08 }}
          >
            {paragraph}
          </motion.p>
        ))}
        {children}
      </div>
    </section>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  const [pageReady, setPageReady] = useState(false);
  const heroWords = project.heroTitle.split(' ');

  // Same load handshake as the home page: hold the eased scroller still for a
  // frame so the entrance stagger starts from the top of the document.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const frame = window.requestAnimationFrame(() => setPageReady(true));
      return () => window.cancelAnimationFrame(frame);
    }

    window.dispatchEvent(new Event('brillarix:load-motion-stop'));
    const timer = window.setTimeout(() => {
      setPageReady(true);
      window.dispatchEvent(new Event('brillarix:load-motion-start'));
    }, 80);

    return () => {
      window.clearTimeout(timer);
      window.dispatchEvent(new Event('brillarix:load-motion-start'));
    };
  }, []);

  const next = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length];
  const results = project.results ?? [];
  const hasOutcome = Boolean(project.outcomeTitle && project.outcomeCopy && project.outcomeLabel);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="project-page overflow-x-clip"
      data-project-ready={pageReady}
    >
      <div className="home-load-veil" aria-hidden="true" />
      <SiteHeader introReady={pageReady} />

      <section id="top" className="project-hero">
        <p className="project-hero-eyebrow">{project.name}</p>
        <h1 className="project-hero-title">
          {heroWords.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span className="project-hero-word-mask">
                <span
                  className="project-hero-word"
                  style={{ animationDelay: `${0.16 + index * 0.055}s` }}
                >
                  {word}
                </span>
              </span>
              {index < heroWords.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </h1>
        <p className="project-hero-tagline">{project.tagline}</p>

        <div className="project-hero-media">
          {project.video ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={project.poster}
              preload="metadata"
              aria-label={`${project.name} product walkthrough`}
              src={project.video}
            />
          ) : (
            <Image
              src={project.poster}
              alt={`${project.name} interface`}
              width={project.posterWidth}
              height={project.posterHeight}
              sizes="(max-width: 900px) 92vw, 1180px"
              priority
            />
          )}
        </div>
      </section>

      <Divider />

      <ProseBlock label="The challenge" body={project.challenge} labelId="project-challenge-label">
        <div className="project-challenge-links">
          {project.links.map((link) => (
            <a key={link.label} href={link.href} data-cursor>
              {link.label}
            </a>
          ))}
        </div>
      </ProseBlock>

      <Divider />

      {project.sections?.map((section) => (
        <Fragment key={section.label}>
          <ProseBlock label={section.label} body={section.body} />
          <Divider />
        </Fragment>
      ))}

      {results.length > 0 ? (
        <Fragment>
          <section className="project-results" aria-label={`${project.name} results`}>
            <ul>
              {results.map((result, index) => (
                <motion.li
                  key={result.label}
                  variants={riseVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: index * 0.09 }}
                >
                  {result.prefix ? <span className="project-result-prefix">{result.prefix}</span> : null}
                  <strong>{result.value}</strong>
                  <span className="project-result-label">{result.label}</span>
                </motion.li>
              ))}
            </ul>
          </section>
          <Divider />
        </Fragment>
      ) : null}

      {hasOutcome ? (
        <Fragment>
          <section className="project-outcome" aria-labelledby="project-outcome-title">
            <MaskedHeading
              id="project-outcome-title"
              text={project.outcomeTitle as string}
              className="project-outcome-title"
            />
            <div className="project-outcome-body">
              <motion.p
                className="project-section-label"
                variants={labelVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
              >
                {project.outcomeLabel}
              </motion.p>
              <motion.p
                className="project-outcome-copy"
                variants={lineVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                {project.outcomeCopy}
              </motion.p>
            </div>
          </section>
          <Divider />
        </Fragment>
      ) : null}

      {project.testimonial ? (
        <Fragment>
          <section className="project-testimonial" aria-labelledby="project-testimonial-label">
            <motion.p
              className="project-section-label"
              id="project-testimonial-label"
              variants={labelVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
            >
              Feedback from client
            </motion.p>
            <figure>
              <motion.blockquote
                variants={lineVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                {`“${project.testimonial.quote}”`}
              </motion.blockquote>
              <motion.figcaption
                variants={riseVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.12 }}
              >
                {project.testimonial.name}
              </motion.figcaption>
            </figure>
          </section>
          <Divider />
        </Fragment>
      ) : null}

      <nav className="project-pager" aria-label="Project navigation">
        <Link className="project-pager-back" href="/#impact" data-cursor>
          <ArrowLeft size={18} strokeWidth={1.8} aria-hidden="true" />
          All projects
        </Link>
        <Link className="project-pager-next" href={`/projects/${next.slug}`} data-cursor data-cursor-arrow>
          <span className="project-pager-next-label">Next project</span>
          <span className="project-pager-next-name">
            {next.name}
            <ArrowUpRight size={28} strokeWidth={1.6} aria-hidden="true" />
          </span>
        </Link>
      </nav>

      <ContactSection />
      <SiteFooter />
    </main>
  );
}
