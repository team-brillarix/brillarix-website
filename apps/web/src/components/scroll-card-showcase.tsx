'use client';

import Image from 'next/image';
import {
  BrainCircuit,
  Cloud,
  Code2,
  PenTool,
  Settings,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion';
import { Fragment, useRef } from 'react';

type Technology = {
  name: string;
  logo: string;
};

type ShowcaseCard = {
  title: string;
  description: string;
  technologies: Technology[];
  categoryIcon: LucideIcon;
  accent: 'teal' | 'purple' | 'green' | 'orange' | 'blue' | 'coral';
  tone: 'aqua' | 'lavender';
};

type CardMotion = {
  x: [string, string, string, string, string];
  y: [string, string, string, string, string];
  rotate: [number, number, number, number, number];
  rotateX: [number, number, number, number, number];
  rotateY: [number, number, number, number, number];
  scale: [number, number, number, number, number];
};

const technology = (name: string, logo: string): Technology => ({
  name,
  logo: `/technology/${logo}.svg`,
});

const cards: ShowcaseCard[] = [
  {
    title: 'Core Engineering',
    description: 'Fast interfaces, reliable APIs, and data foundations built to evolve.',
    technologies: [
      technology('Next.js', 'nextdotjs'),
      technology('FastAPI', 'fastapi'),
      technology('NestJS', 'nestjs'),
      technology('Node.js', 'nodedotjs'),
      technology('PostgreSQL', 'postgresql'),
      technology('GraphQL', 'graphql'),
    ],
    categoryIcon: Code2,
    accent: 'teal',
    tone: 'aqua',
  },
  {
    title: 'AI, LLMs & Orchestration',
    description: 'Production AI with retrieval, evaluation, orchestration, and human oversight.',
    technologies: [
      technology('Gemini', 'googlegemini'),
      technology('OpenAI', 'openai'),
      technology('Claude', 'claude'),
      technology('LangChain', 'langchain'),
      technology('Pinecone', 'pinecone'),
      technology('Hugging Face', 'huggingface'),
    ],
    categoryIcon: BrainCircuit,
    accent: 'purple',
    tone: 'lavender',
  },
  {
    title: 'Low-Code & Rapid Prototyping',
    description: 'Test demand and automate workflows before committing to a larger build.',
    technologies: [
      technology('Bubble.io', 'bubble'),
      technology('Webflow', 'webflow'),
      technology('Framer', 'framer'),
      technology('Xano', 'xano'),
      technology('Retool', 'retool'),
      technology('Lovable', 'lovable'),
    ],
    categoryIcon: PenTool,
    accent: 'green',
    tone: 'aqua',
  },
  {
    title: 'Mobile & Cross-Platform',
    description: 'One product experience across iOS and Android without duplicating effort.',
    technologies: [
      technology('React Native', 'react'),
      technology('Flutter', 'flutter'),
      technology('Swift', 'swift'),
      technology('Kotlin', 'kotlin'),
      technology('FlutterFlow', 'flutterflow'),
      technology('Capacitor', 'capacitor'),
    ],
    categoryIcon: Smartphone,
    accent: 'orange',
    tone: 'lavender',
  },
  {
    title: 'Cloud, DevOps & Infrastructure',
    description: 'Secure delivery pipelines, observable systems, and infrastructure ready to scale.',
    technologies: [
      technology('AWS', 'aws'),
      technology('GCP', 'googlecloud'),
      technology('Vercel', 'vercel'),
      technology('Supabase', 'supabase'),
      technology('Docker', 'docker'),
      technology('LambdaTest', 'lambdatest-mark'),
    ],
    categoryIcon: Cloud,
    accent: 'blue',
    tone: 'aqua',
  },
  {
    title: 'Automation & Data Operations',
    description: 'Connect operations, remove repetitive work, and turn product data into decisions.',
    technologies: [
      technology('Make', 'make'),
      technology('n8n', 'n8n'),
      technology('Zapier', 'zapier'),
      technology('Twilio', 'twilio'),
      technology('Mixpanel', 'mixpanel'),
      technology('Sentry', 'sentry'),
    ],
    categoryIcon: Settings,
    accent: 'coral',
    tone: 'lavender',
  },
];

const cardMotions: CardMotion[] = [
  {
    x: ['-48vw', '-26vw', '-5vw', '0vw', '0vw'],
    y: ['-18vh', '-11vh', '-2vh', '0vh', '0vh'],
    rotate: [-9, -5, -1.5, 0, 0],
    rotateX: [-4, -3, -1, 0, 0],
    rotateY: [12, 8, 2, 0, 0],
    scale: [0.62, 0.72, 0.94, 1, 1],
  },
  {
    x: ['1vw', '-6vw', '-1vw', '0vw', '0vw'],
    y: ['-58vh', '-28vh', '-5vh', '0vh', '0vh'],
    rotate: [5, 3.5, 1, 0, 0],
    rotateX: [11, 7, 2, 0, 0],
    rotateY: [-4, -3, -1, 0, 0],
    scale: [0.48, 0.66, 0.92, 1, 1],
  },
  {
    x: ['36vw', '22vw', '5vw', '0vw', '0vw'],
    y: ['-31vh', '-17vh', '-3vh', '0vh', '0vh'],
    rotate: [11, 7, 2, 0, 0],
    rotateX: [-4, -3, -1, 0, 0],
    rotateY: [-13, -9, -3, 0, 0],
    scale: [0.56, 0.7, 0.93, 1, 1],
  },
  {
    x: ['-31vw', '-22vw', '-5vw', '0vw', '0vw'],
    y: ['46vh', '24vh', '4vh', '0vh', '0vh'],
    rotate: [-12, -7, -2, 0, 0],
    rotateX: [-9, -6, -2, 0, 0],
    rotateY: [13, 9, 3, 0, 0],
    scale: [0.58, 0.72, 0.93, 1, 1],
  },
  {
    x: ['10vw', '16vw', '3vw', '0vw', '0vw'],
    y: ['62vh', '29vh', '5vh', '0vh', '0vh'],
    rotate: [10, 7, 2, 0, 0],
    rotateX: [-11, -7, -2, 0, 0],
    rotateY: [-6, -4, -1, 0, 0],
    scale: [0.46, 0.64, 0.91, 1, 1],
  },
  {
    x: ['39vw', '27vw', '6vw', '0vw', '0vw'],
    y: ['48vh', '22vh', '4vh', '0vh', '0vh'],
    rotate: [12, 8, 2, 0, 0],
    rotateX: [-9, -6, -2, 0, 0],
    rotateY: [-13, -9, -3, 0, 0],
    scale: [0.56, 0.7, 0.92, 1, 1],
  },
];

// Assemble during the first two-thirds of the pinned scene, then keep the
// complete grid still while the remaining scroll distance is consumed.
const progressStops = [0, 0.082, 0.491, 0.671, 1];

const technologyHeadingWords = 'Cutting-Edge Technologies for Scalable Solutions'.split(' ');

const technologyHeadingVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const technologyHeadingWordVariants: Variants = {
  hidden: { y: '145%' },
  visible: {
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

function ScrollRevealCard({
  card,
  index,
  progress,
}: {
  card: ShowcaseCard;
  index: number;
  progress: MotionValue<number>;
}) {
  const shouldReduceMotion = useReducedMotion();
  const motionSettings = cardMotions[index];
  const x = useTransform(progress, progressStops, motionSettings.x);
  const y = useTransform(progress, progressStops, motionSettings.y);
  const rotate = useTransform(progress, progressStops, motionSettings.rotate);
  const rotateX = useTransform(progress, progressStops, motionSettings.rotateX);
  const rotateY = useTransform(progress, progressStops, motionSettings.rotateY);
  const scale = useTransform(progress, progressStops, motionSettings.scale);
  const titleId = `technology-card-${index + 1}`;
  const CategoryIcon = card.categoryIcon;

  return (
    <motion.article
      aria-labelledby={titleId}
      className={`scroll-showcase-card is-${card.tone} accent-${card.accent}`}
      style={
        shouldReduceMotion
          ? { zIndex: 10 - index }
          : { x, y, rotate, rotateX, rotateY, scale, zIndex: 10 - index }
      }
    >
      <header className="scroll-showcase-card-header">
        <div className="scroll-showcase-category-icon" aria-hidden="true">
          <CategoryIcon strokeWidth={1.8} />
        </div>
        <div className="scroll-showcase-card-heading">
          <h3 id={titleId}>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      </header>

      <ul className="scroll-showcase-tech-grid" aria-label={`${card.title} technologies`}>
        {card.technologies.map((item) => (
          <li key={item.name} className="scroll-showcase-tech">
            <Image
              src={item.logo}
              alt=""
              aria-hidden="true"
              width={30}
              height={30}
              loading="eager"
              draggable={false}
            />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export function ScrollCardShowcase() {
  const motionSectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: motionSectionRef,
    offset: ['start start', 'end end'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 64,
    damping: 27,
    mass: 0.86,
    restDelta: 0.0005,
  });

  return (
    <section id="tools" className="scroll-card-showcase" aria-labelledby="technology-showcase-title">
      <header className="scroll-showcase-intro">
        <motion.h2
          id="technology-showcase-title"
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.55 }}
          variants={technologyHeadingVariants}
        >
          {technologyHeadingWords.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span className="viewport-heading-word-mask">
                <motion.span className="viewport-heading-word" variants={technologyHeadingWordVariants}>
                  {word}
                </motion.span>
              </span>
              {index < technologyHeadingWords.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </motion.h2>
        <p>
          Every tool earns its place. We choose technologies around product goals, security, maintainability, and scale—not trends—so your team inherits a platform it can operate and extend.
        </p>
      </header>

      <div ref={motionSectionRef} className="scroll-card-motion">
        <div className="scroll-card-stage">
          <div className="scroll-card-shell">
            <div className="scroll-card-grid">
              {cards.map((card, index) => (
                <ScrollRevealCard key={card.title} card={card} index={index} progress={smoothProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
