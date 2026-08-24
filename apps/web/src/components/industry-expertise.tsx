'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  ArrowUpRight,
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Layers3,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react';
import { Fragment } from 'react';

type Industry = {
  name: string;
  promise: string;
  description: string;
  cta: string;
  icon: LucideIcon;
  accent: 'violet' | 'coral' | 'lime' | 'blue' | 'amber' | 'rose';
};

const industries: Industry[] = [
  {
    name: 'Finance',
    promise: 'Secure Financial Products Built to Scale',
    description:
      'Build real-time dashboards, payment and reporting workflows, risk controls, and data platforms designed for reliability, auditability, and growth.',
    cta: 'Discuss fintech product',
    icon: Layers3,
    accent: 'violet',
  },
  {
    name: 'Education',
    promise: 'Learning Platforms Built for Engagement',
    description:
      'Create accessible learning experiences, content workflows, assessments, and analytics that help educators operate efficiently and learners make measurable progress.',
    cta: 'Plan learning platform',
    icon: GraduationCap,
    accent: 'coral',
  },
  {
    name: 'Manufacturing',
    promise: 'Operational Software That Reduces Friction',
    description:
      'Connect workflows, automate repetitive tasks, surface production data, and improve maintenance and supply-chain decisions across teams and facilities.',
    cta: 'Explore automation',
    icon: Factory,
    accent: 'lime',
  },
  {
    name: 'Retail',
    promise: 'Commerce Experiences Built to Convert',
    description:
      'Unify storefronts, payments, inventory, personalization, and customer data to reduce friction and improve conversion across the buying journey.',
    cta: 'Improve commerce',
    icon: ShoppingCart,
    accent: 'blue',
  },
  {
    name: 'Healthcare',
    promise: 'Secure Workflows for Better Care Delivery',
    description:
      'Build secure clinical and operational platforms that reduce manual work, improve collaboration, and protect sensitive product and patient data.',
    cta: 'Build healthcare product',
    icon: HeartPulse,
    accent: 'amber',
  },
  {
    name: 'Real Estate',
    promise: 'Property Platforms That Move Work Forward',
    description:
      'Streamline listings, lead management, document workflows, property operations, and customer communication in one scalable digital product.',
    cta: 'Plan property platform',
    icon: Building2,
    accent: 'rose',
  },
];

const industryHeading = 'Industry Expertise Tailored Solutions for Every Sector';
const industryCopy =
  'From secure healthcare workflows to commerce platforms and operational tools, we design software around the regulations, users, data, and growth constraints that shape each sector.';

const industryHeadingWords = industryHeading.split(' ');
const industryCopyWords = industryCopy.split(' ');

const industryHeadingVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const industryCopyVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.075 } },
};

const industryHeadingWordVariants: Variants = {
  hidden: { y: '145%' },
  visible: {
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const industryCopyWordVariants: Variants = {
  hidden: { opacity: 0, y: '145%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
  },
};

export function IndustryExpertise() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="industry" className="industry-expertise-section" aria-labelledby="industry-title">
      <header className="industry-expertise-intro">
        <motion.h2
          id="industry-title"
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.55 }}
          variants={industryHeadingVariants}
        >
          {industryHeadingWords.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span className="viewport-heading-word-mask">
                <motion.span className="viewport-heading-word" variants={industryHeadingWordVariants}>
                  {word}
                </motion.span>
              </span>
              {index < industryHeadingWords.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </motion.h2>
        <motion.p
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.55 }}
          variants={industryCopyVariants}
        >
          {industryCopyWords.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span className="viewport-copy-word-mask">
                <motion.span className="viewport-copy-word" variants={industryCopyWordVariants}>
                  {word}
                </motion.span>
              </span>
              {index < industryCopyWords.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </motion.p>
      </header>

      <div className="industry-expertise-grid">
        {industries.map((industry) => {
          const Icon = industry.icon;

          return (
            <article
              key={industry.name}
              className={`industry-expertise-card industry-expertise-card--${industry.accent}`}
            >
              <div className="industry-expertise-card-inner">
                <div className="industry-expertise-icon" aria-hidden="true">
                  <Icon strokeWidth={1.8} />
                </div>
                <h3>{industry.name}</h3>
                <span className="industry-expertise-rule" aria-hidden="true" />
                <p className="industry-expertise-promise">{industry.promise}</p>
                <p className="industry-expertise-description">{industry.description}</p>
                <a href="#contact" aria-label={`${industry.cta} — ${industry.name} solutions`}>
                  <span>{industry.cta}</span>
                  <ArrowUpRight aria-hidden="true" strokeWidth={1.8} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
