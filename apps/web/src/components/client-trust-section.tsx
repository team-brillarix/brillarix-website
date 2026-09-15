'use client';

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion';
import { Fragment } from 'react';

type Review = {
  company: string;
  id: string;
  name: string;
  role: string;
  text: string;
  title: string;
};

const reviews: Review[] = [
  {
    company: 'Visionary Clouds',
    id: 'review-01',
    name: 'Kapil Meena',
    role: 'Founder',
    text: 'BRILLARIX built a stunning, high-performing website that exceeded my expectations. The team understood exactly what I needed and delivered flawless design and functionality. I’ve already seen a strong boost in engagement and conversions.',
    title: 'Website Transformation',
  },
  {
    company: 'Streamlined Media',
    id: 'review-02',
    name: 'Kevin Mills',
    role: 'Founder',
    text: 'Our experience with Brillarix was exceptional. They adeptly facilitated the development of several intricate internal processes for our company, all while leveraging no-code technology to ensure accessibility and usability across our entire team.',
    title: 'Simplifying Complex Processes',
  },
  {
    company: 'Cleeri',
    id: 'review-03',
    name: 'Jeff Gottschalk',
    role: 'Founder',
    text: 'Brillarix has been an integral partner in our product development journey. Their clear communication and attention to detail set them apart. From low-code foundations to a full-stack transition, their versatility, consistency, and empathy made the process seamless. We highly recommend the Brillarix team.',
    title: 'Seamless Product Development Partnership',
  },
  {
    company: 'Signm',
    id: 'review-04',
    name: 'Daniel S.',
    role: 'CEO',
    text: 'I’ve worked with Brillarix for several years on the build and ongoing development of my company, SIGNM. They delivered full-stack development, custom APIs, and a stable GCP + MongoDB infrastructure supporting millions of daily events. Over 4,000 users have since engaged with the platform, a testament to the system’s robustness.',
    title: 'Exceptional Service',
  },
  {
    company: 'KW Fitness',
    id: 'review-05',
    name: 'Kevin Webb',
    role: 'Founder',
    text: 'Working with Brillarix on PT Metrics was exceptional. They transformed my vision into a clean, powerful platform with flawless execution and communication. Their partnership and creative problem-solving helped build a product that will truly elevate our business.',
    title: 'Ideas to Reality',
  },
  {
    company: 'Trialynx',
    id: 'review-06',
    name: 'Angie Schwab',
    role: 'CEO',
    text: 'In under a year, Brillarix helped us transform our initial concept into a fully operational business with a recurring client base. Their platform was the catalyst for our expansion into four countries, accelerating our medical writing speed by 90% and enabling the launch of over 50 clinical trials.',
    title: 'Empowered Efficiency',
  },
];

const fanX = [180, 0, -150, 180, 0, -180];
// Each resting offset carries +131px: the deck reserves its opened grid's
// 1220px, the fan fills 958px of it, and this centres the fan in the rest, so
// it opens outward in both directions rather than leaving a void beneath it.
const fanY = [211, 131, 211, -209, -249, -209];
const fanRotation = [-10, 0, 10, -18, 0, 18];
const fanStack = [1, 3, 2, 4, 6, 5];
const trustHeadingWords = 'Trusted by our clients'.split(' ');

const trustHeadingVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const trustHeadingWordVariants: Variants = {
  hidden: { y: '145%' },
  visible: {
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

function Testimonial({ review, index, wrap }: { review: Review; index: number; wrap: MotionValue<number> }) {
  const x = useTransform(wrap, [0, 1], [0, fanX[index]]);
  const y = useTransform(wrap, [0, 1], [0, fanY[index]]);
  const rotate = useTransform(wrap, [0, 1], [0, fanRotation[index]]);
  const borderRadius = useTransform(wrap, [0, 1], ['0px', '20px']);

  return (
    <motion.article
      className="review-card"
      style={{ x, y, rotate, borderRadius, zIndex: fanStack[index] }}
    >
      <span className="review-quote-mark" aria-hidden="true">“</span>
      <h3 className="review-card-title">{review.title}</h3>
      <p className="review-card-copy">“{review.text}”</p>
      <span className="review-card-label">
        <strong>{review.name}</strong>
        <span>{review.company} · {review.role}</span>
      </span>
    </motion.article>
  );
}

function ReviewDeck() {
  const wrap = useMotionValue(1);

  const openDeck = () => {
    wrap.stop();
    animate(wrap, 0, { duration: 0.72, ease: [0.16, 1, 0.3, 1] });
  };

  const closeDeck = () => {
    wrap.stop();
    animate(wrap, 1, { duration: 0.78, ease: [0.16, 1, 0.3, 1] });
  };

  return (
    <div className="review-deck" onPointerEnter={openDeck} onPointerLeave={closeDeck}>
      {reviews.map((review, index) => (
        <Testimonial key={review.id} review={review} index={index} wrap={wrap} />
      ))}
    </div>
  );
}

export function ClientTrustSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="clients" className="client-trust-section" aria-labelledby="client-trust-heading">
      <div className="client-trust-shell">
        <motion.h2
          id="client-trust-heading"
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.55 }}
          variants={trustHeadingVariants}
        >
          {trustHeadingWords.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span className="trust-heading-word-mask">
                <motion.span className="trust-heading-word" variants={trustHeadingWordVariants}>
                  {word}
                </motion.span>
              </span>
              {index < trustHeadingWords.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </motion.h2>

        <ReviewDeck />
      </div>
    </section>
  );
}
