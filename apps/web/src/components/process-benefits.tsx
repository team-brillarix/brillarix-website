'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Fragment, useEffect, useRef } from 'react';

const dividerY = 100;

function stringPath(width: number, x = width / 2, y = dividerY) {
  return `M0,${dividerY} Q${x.toFixed(1)},${y.toFixed(1)} ${width.toFixed(1)},${dividerY}`;
}

type DividerMotion = {
  frame: number | null;
  hovering: boolean;
  targetX: number;
  targetY: number;
  velocityX: number;
  velocityY: number;
  width: number;
  x: number;
  y: number;
};

export function ProcessDivider({ className = '' }: { className?: string }) {
  const dividerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const motionRef = useRef<DividerMotion>({
    frame: null,
    hovering: false,
    targetX: 0,
    targetY: dividerY,
    velocityX: 0,
    velocityY: 0,
    width: 0,
    x: 0,
    y: dividerY,
  });

  const drawFrame = () => {
    const state = motionRef.current;
    if (!state.width) {
      state.frame = null;
      return;
    }

    if (state.hovering) {
      // Gentle interpolation keeps the curve visually connected to the
      // pointer even during rapid movement across the divider.
      state.x += (state.targetX - state.x) * 0.075;
      state.y += (state.targetY - state.y) * 0.075;
      state.velocityX = 0;
      state.velocityY = 0;
    } else {
      // The release is a slow, critically damped return to the resting line.
      state.velocityX += (state.width / 2 - state.x) * 0.011;
      state.velocityY += (dividerY - state.y) * 0.018;
      state.velocityX *= 0.89;
      state.velocityY *= 0.88;
      state.x += state.velocityX;
      state.y += state.velocityY;
    }

    pathRef.current?.setAttribute('d', stringPath(state.width, state.x, state.y));

    const hasSettled =
      !state.hovering &&
      Math.abs(state.x - state.width / 2) < 0.08 &&
      Math.abs(state.y - dividerY) < 0.08 &&
      Math.abs(state.velocityX) < 0.08 &&
      Math.abs(state.velocityY) < 0.08;

    if (hasSettled) {
      state.x = state.width / 2;
      state.y = dividerY;
      state.frame = null;
      pathRef.current?.setAttribute('d', stringPath(state.width));
      return;
    }

    state.frame = window.requestAnimationFrame(drawFrame);
  };

  const startMotion = () => {
    const state = motionRef.current;
    if (state.frame === null) {
      state.frame = window.requestAnimationFrame(drawFrame);
    }
  };

  useEffect(() => {
    const element = dividerRef.current;
    if (!element) return;
    const motionState = motionRef.current;

    const measure = () => {
      const nextWidth = element.getBoundingClientRect().width;
      motionState.width = nextWidth;
      motionState.x = nextWidth / 2;
      motionState.y = dividerY;
      motionState.targetX = nextWidth / 2;
      motionState.targetY = dividerY;
      pathRef.current?.setAttribute('d', stringPath(nextWidth));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => {
      observer.disconnect();
      const frame = motionState.frame;
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const state = motionRef.current;
    if (!state.width) return;
    const x = Math.max(0, Math.min(state.width, event.clientX - bounds.left));
    const pointerOffset = event.clientY - bounds.top - bounds.height / 2;
    // Preserve the original 200px SVG-motion range while only listening in
    // the slim, visible line band.
    const y = Math.max(58, Math.min(142, dividerY + pointerOffset * 6.25));
    state.hovering = true;
    state.targetX = x;
    state.targetY = y;
    startMotion();
  };

  return (
    <div
      className={`process-divider ${className}`.trim()}
      ref={dividerRef}
      onPointerMove={move}
      onPointerLeave={() => {
        motionRef.current.hovering = false;
        startMotion();
      }}
    >
      <motion.svg
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.75 }}
        transition={{ duration: 0.25 }}
      >
        <motion.path
          ref={pathRef}
          d="M0,100 Q0,100 0,100"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.75 }}
          transition={{ pathLength: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
        />
      </motion.svg>
    </div>
  );
}

const benefits = [
  {
    icon: '/process-icons/1.svg',
    title: 'Discovery & Product Strategy',
    label: 'Validate the opportunity before committing to build.',
    text: 'We align business goals, user needs, market evidence, and technical constraints. The outcome is a focused product brief, a prioritized roadmap, and a measurable definition of success.',
  },
  {
    icon: '/process-icons/2.svg',
    title: 'Rapid Prototyping & UX Design',
    label: 'Test the experience before full development.',
    text: 'AI-assisted research and rapid prototypes help us explore flows, test assumptions, and collect useful feedback early. You see how the product works before investing in a production build.',
  },
  {
    icon: '/process-icons/3.svg',
    title: 'Full-Stack Product Development',
    label: 'Build a secure foundation that can grow.',
    text: 'Our engineers turn validated product flows into production software, connecting frontend experiences, APIs, data, and cloud infrastructure. Architecture, security, and maintainability are considered from the first release.',
  },
  {
    icon: '/process-icons/4.svg',
    title: 'Quality Assurance & Optimization',
    label: 'Verify reliability, usability, and performance.',
    text: 'Automated and manual testing cover critical workflows, devices, integrations, accessibility, and performance. We resolve issues before launch and use evidence—not assumptions—to refine the experience.',
  },
  {
    icon: '/process-icons/5.svg',
    title: 'Launch, Measurement & Iteration',
    label: 'Release confidently and improve with evidence.',
    text: 'We prepare deployment, monitoring, analytics, and continuous delivery so your team can launch with visibility. After release, real usage and feedback guide the next product decisions.',
  },
];

const processHeadingWords = 'Our Process From Concept to Launch, Faster Than Ever'.split(' ');
const processIntroWords = 'A five-stage, AI-assisted product development process that turns uncertainty into validated decisions, production-ready software, and a confident launch.'.split(' ');

const headingGroupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const headingWordVariants: Variants = {
  hidden: { y: '118%' },
  visible: {
    y: 0,
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
  },
};

const introGroupVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.3, staggerChildren: 0.022 } },
};

const introWordVariants: Variants = {
  hidden: { opacity: 0, y: '110%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ProcessBenefits() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="process" className="process-benefits" aria-labelledby="process-benefits-heading">
      <div className="process-benefits-shell">
        <motion.h2
          id="process-benefits-heading"
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.55 }}
          variants={headingGroupVariants}
        >
          {processHeadingWords.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span className="process-heading-word-mask">
                <motion.span className="process-heading-word" variants={headingWordVariants}>
                  {word}
                </motion.span>
              </span>
              {index < processHeadingWords.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </motion.h2>
        <motion.p
          className="process-benefits-intro"
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={introGroupVariants}
        >
          {processIntroWords.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span className="process-intro-word-mask">
                <motion.span className="process-intro-word" variants={introWordVariants}>
                  {word}
                </motion.span>
              </span>
              {index < processIntroWords.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </motion.p>
        <div className="process-benefit-list">
          {benefits.map((benefit, index) => (
              <motion.article
                className="process-benefit"
                key={benefit.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProcessDivider />
                <div className="process-benefit-content">
                  <span className="process-benefit-icon-shell" aria-hidden="true">
                    <img className="process-benefit-icon" src={benefit.icon} alt="" />
                  </span>
                  <p className="process-benefit-title">{benefit.title}</p>
                  <div className="process-benefit-copy">
                    <p className="process-benefit-label">{benefit.label}</p>
                    <p>{benefit.text}</p>
                  </div>
                </div>
              </motion.article>
            ))}
        </div>
      </div>
    </section>
  );
}
