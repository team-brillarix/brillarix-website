'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Fragment, useState } from 'react';

import { ProcessDivider } from './process-benefits';

const faqs = [
  {
    question: 'How quickly can we launch a product with Brillarix?',
    answer:
      'We offer rapid prototyping and development, so you can get your product to market weeks faster than traditional development teams.',
  },
  {
    question: 'Can Brillarix scale with our business growth?',
    answer:
      "Absolutely. Our solutions are built with scalability in mind from day one. We design architectures that can grow with your business, whether you're starting with a small user base or planning to scale to millions of users.",
  },
  {
    question: 'Do you offer API development and integrations?',
    answer:
      'Yes, we specialize in API development and seamless integrations with third-party services. We can help you connect your application with payment processors, analytics tools, communication platforms, and any other services your business needs.',
  },
  {
    question: 'How can I contact Brillarix?',
    answer:
      'You can reach us through our contact form on the website, email us directly, or schedule a consultation call. We typically respond within 24 hours during business days.',
  },
  {
    question: 'What types of web applications do you build?',
    answer:
      'We build a wide variety of web applications including e-commerce platforms, SaaS applications, content management systems, dashboards and analytics tools, social platforms, and custom business solutions tailored to your specific needs.',
  },
  {
    question: 'How long does it take to build a web app?',
    answer:
      "The timeline depends on the complexity and scope of your project. Simple applications can be completed in 4-8 weeks, while more complex platforms may take 3-6 months. We'll provide a detailed timeline after understanding your requirements.",
  },
];

const faqHeadingWords = 'FAQ'.split(' ');

const faqHeadingVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const faqHeadingWordVariants: Variants = {
  hidden: { y: '145%' },
  visible: {
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-heading">
      <div className="faq-shell">
        <motion.h2
          id="faq-heading"
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.55 }}
          variants={faqHeadingVariants}
        >
          {faqHeadingWords.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span className="viewport-heading-word-mask">
                <motion.span className="viewport-heading-word" variants={faqHeadingWordVariants}>
                  {word}
                </motion.span>
              </span>
              {index < faqHeadingWords.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </motion.h2>

        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const triggerId = `faq-trigger-${index + 1}`;
            const answerId = `faq-answer-${index + 1}`;

            return (
              <div className="faq-item" key={item.question}>
                <ProcessDivider className="faq-divider" />
                <div className={`faq-drawer${isOpen ? ' is-open' : ''}`}>
                  <button
                    aria-controls={answerId}
                    aria-expanded={isOpen}
                    className="faq-trigger"
                    id={triggerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    type="button"
                  >
                    <span>{item.question}</span>
                    <span className="faq-toggle" aria-hidden="true" />
                  </button>
                  <div
                    aria-hidden={!isOpen}
                    aria-labelledby={triggerId}
                    className="faq-answer"
                    id={answerId}
                    role="region"
                  >
                    <div className="faq-answer-inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <ProcessDivider className="faq-divider" />
        </div>
      </div>
    </section>
  );
}
