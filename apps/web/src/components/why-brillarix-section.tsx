'use client';

import { BadgeCheck, Orbit, Star } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { Fragment } from 'react';
import { ProcessDivider } from '@/components/process-benefits';

const whyHeadingWords = 'Why Brillarix'.split(' ');

const whyHeadingVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const whyHeadingWordVariants: Variants = {
  hidden: { y: '145%' },
  visible: {
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const whyCardGridVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.06, staggerChildren: 0.075 } },
};

const whyCardVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0.9, scaleY: 0.62, y: 24 },
  visible: {
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    y: 0,
    transition: { duration: 0.78, ease: [0.18, 0.89, 0.32, 1.28] },
  },
};

export function WhyBrillarixSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="why-brillarix-section" aria-labelledby="why-brillarix-heading">
      <div className="why-brillarix-shell">
        <ProcessDivider className="why-brillarix-divider" />
        <div className="why-brillarix-intro">
          <motion.h2
            id="why-brillarix-heading"
            className="why-brillarix-label"
            initial={shouldReduceMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.65 }}
            variants={whyHeadingVariants}
          >
            {whyHeadingWords.map((word, index) => (
              <Fragment key={word}>
                <span className="why-heading-word-mask">
                  <motion.span className="why-heading-word" variants={whyHeadingWordVariants}>
                    {word}
                  </motion.span>
                </span>
                {index < whyHeadingWords.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </motion.h2>
          <motion.p
            className="why-brillarix-copy"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ delay: 0.28, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Founders choose Brillarix to reach useful product decisions sooner without trading away engineering rigor. One accountable team owns discovery, product design, full-stack development, and launch—so every decision stays connected and every product is built to grow.
          </motion.p>
        </div>

        <motion.div
          className="why-brillarix-grid"
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={whyCardGridVariants}
        >
          <motion.article className="recognition-card why-pop-card is-aqua" variants={whyCardVariants}>
            <div className="recognition-brand recognition-bubble">
              <Image src="/recognition/bubble-logo-user.jpg" alt="Bubble" width={200} height={200} />
            </div>
            <p className="recognition-caption">Silver Agency Partner <BadgeCheck aria-hidden="true" /></p>
          </motion.article>

          <motion.article className="recognition-card recognition-reviews-card why-pop-card is-lavender" variants={whyCardVariants}>
            <Star aria-hidden="true" strokeWidth={1.55} />
            <div className="recognition-reviews-stat">
              <strong>40+</strong>
              <span>Reviews</span>
            </div>
          </motion.article>

          <motion.article className="recognition-card why-pop-card is-aqua" variants={whyCardVariants}>
            <div className="recognition-brand recognition-upwork" aria-label="Upwork Top Rated Plus">
              <span className="recognition-upwork-icon" aria-hidden="true">
                <Image src="/recognition/upwork-top-rated-plus.png" alt="" width={272} height={82} />
              </span>
              <span className="recognition-upwork-text">Top Rated Plus</span>
            </div>
            <p className="recognition-caption">Top Rated Plus on Upwork <BadgeCheck aria-hidden="true" /></p>
          </motion.article>

          <motion.article className="recognition-card why-pop-card is-lavender" variants={whyCardVariants}>
            <div className="recognition-brand recognition-contra">
              <Image src="/recognition/contra-logo-user.jpg" alt="Contra" width={200} height={200} />
              <span>contra</span>
            </div>
            <p className="recognition-caption"><span>Featured on <strong>Contra</strong></span> <BadgeCheck aria-hidden="true" /></p>
          </motion.article>

          <motion.article
            className="why-brillarix-card why-brillarix-kept-card why-pop-card is-lavender"
            variants={whyCardVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
          >
            <Orbit aria-hidden="true" strokeWidth={1.55} />
            <p className="why-brillarix-card-copy">One accountable team from product strategy to production</p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
