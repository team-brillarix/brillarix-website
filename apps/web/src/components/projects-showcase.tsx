'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Fragment, useCallback, useRef, useState } from 'react';
import { projectFilters, projects, type ProjectFilter, type Project } from '@/constants/projects';

const headingWords = 'Our projects'.split(' ');

const headingVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const headingWordVariants: Variants = {
  hidden: { y: '145%' },
  visible: { y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 64 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] } },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // The poster carries the card until a pointer arrives; only then is the clip
  // worth the bandwidth, so it stays `preload="none"` until the first hover.
  // Projects with only a still have no video element to drive at all.
  const playPreview = useCallback(() => {
    const video = videoRef.current;
    if (!video || shouldReduceMotion) return;
    video.play().catch(() => {});
  }, [shouldReduceMotion]);

  const pausePreview = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }, []);

  return (
    <motion.article
      className="project-card"
      variants={shouldReduceMotion ? undefined : cardVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.24 }}
    >
      <Link
        className="project-card-link"
        href={`/projects/${project.slug}`}
        data-cursor
        data-cursor-arrow
        onPointerEnter={playPreview}
        onPointerLeave={pausePreview}
        onFocus={playPreview}
        onBlur={pausePreview}
      >
        <span className="project-card-media">
          <Image
            className="project-card-poster"
            src={project.poster}
            alt=""
            width={project.posterWidth}
            height={project.posterHeight}
            sizes="(max-width: 900px) 92vw, 44vw"
            priority={index < 2}
          />
          {project.video ? (
            <video
              className="project-card-video"
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              tabIndex={-1}
              aria-hidden="true"
              src={project.video}
            />
          ) : null}
        </span>
        <span className="project-card-caption">
          <strong>{project.name}</strong>
          <span className="project-card-dash" aria-hidden="true"> – </span>
          {project.tagline}
        </span>
      </Link>
    </motion.article>
  );
}

export function ProjectsShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<ProjectFilter>('All Projects');

  const visible =
    filter === 'All Projects' ? projects : projects.filter((project) => project.category === filter);

  return (
    <section id="impact" className="projects-showcase" aria-labelledby="projects-showcase-title">
      <header className="projects-showcase-intro">
        <motion.h2
          id="projects-showcase-title"
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.55 }}
          variants={headingVariants}
        >
          {headingWords.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span className="projects-heading-word-mask">
                <motion.span className="projects-heading-word" variants={headingWordVariants}>
                  {word}
                </motion.span>
              </span>
              {index < headingWords.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </motion.h2>
        <p>We help bring ideas to life and create digital products that work.</p>

        <div className="projects-filter" role="tablist" aria-label="Filter projects by type">
          {projectFilters.map((option) => (
            <button
              key={option}
              className="projects-filter-tab"
              type="button"
              role="tab"
              data-cursor
              aria-selected={filter === option}
              onClick={() => setFilter(option)}
            >
              {option}
              {filter === option ? (
                <motion.span
                  className="projects-filter-underline"
                  layoutId="projects-filter-underline"
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              ) : null}
            </button>
          ))}
        </div>
      </header>

      <div className="projects-grid">
        {visible.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
