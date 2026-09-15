'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Fragment, useEffect, useRef, useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ContactSection } from '@/components/contact-section';
import { ElasticDivider } from '@/components/elastic-divider';
import { projects, type Project, type ProjectImage } from '@/constants/projects';

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

// Deliberately slighter than the prose reveal: a short rise and a fade, so the
// stills settle rather than announce themselves.
const galleryVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
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

/** A gallery tile that runs a clip rather than holding a still. It keeps its own
    element so it can be handed to the same keep-playing hook the hero reel uses:
    a tile that stalled the moment it scrolled past would sit frozen beside a
    live one, which is worse than not moving at all. */
function GalleryClip({
  height,
  label,
  src,
  width,
}: {
  height: number;
  label: string;
  src: string;
  width: number;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useKeepPlaying(videoRef);

  return (
    <video
      ref={videoRef}
      src={src}
      width={width}
      height={height}
      aria-label={label}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
    />
  );
}

/** Two up and staggered, the way the reference sets a pair of stills below a
    block of copy: the second column starts lower so the pair reads as one
    arrangement rather than two boxes in a row. */
function SectionGallery({
  images,
  layout,
}: {
  images: ProjectImage[];
  layout?: 'masonry' | 'aligned';
}) {
  const shouldReduceMotion = useReducedMotion();
  // Magnifying from the centre only ever shows the middle. Tracking the pointer
  // lets any corner of a dense screenshot be brought up and read.
  //
  // Each still asks for a source matched to how far it is actually magnified.
  // Fetching far more than the zoom can show only hands the compositor a bigger
  // bitmap to move on every frame, which is what makes the heavier device shots
  // feel rougher than the flat screenshots beside them.
  const slot = images.length === 1 ? 1392 : 672;
  const sizesFor = (zoom: number) => {
    const wanted = Math.round(slot * zoom);
    return images.length === 1
      ? `(max-width: 900px) ${Math.round(92 * zoom)}vw, (max-width: 1488px) ${Math.round(100 * zoom)}vw, ${wanted}px`
      : `(max-width: 900px) ${Math.round(92 * zoom)}vw, (max-width: 1488px) ${Math.round(46 * zoom)}vw, ${wanted}px`;
  };

  // Writing on every pointermove restyles far more often than the screen
  // refreshes, which is what made this judder. One write per frame, from the
  // latest position, is both smoother and cheaper. The origin itself is never
  // transitioned: easing it means the image chases the cursor a beat behind and
  // re-animates on every move, which reads as the stutter rather than the ease.
  const pending = useRef<{ frame: HTMLElement; x: number; y: number } | null>(null);
  const frameRequest = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (frameRequest.current !== null) window.cancelAnimationFrame(frameRequest.current);
    },
    [],
  );

  const trackPointer = (event: React.PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;

    const frame = event.currentTarget;
    const box = frame.getBoundingClientRect();
    pending.current = {
      frame,
      x: ((event.clientX - box.left) / box.width) * 100,
      y: ((event.clientY - box.top) / box.height) * 100,
    };

    if (frameRequest.current !== null) return;
    frameRequest.current = window.requestAnimationFrame(() => {
      frameRequest.current = null;
      const next = pending.current;
      if (!next) return;
      next.frame.style.setProperty('--zoom-x', `${next.x.toFixed(2)}%`);
      next.frame.style.setProperty('--zoom-y', `${next.y.toFixed(2)}%`);
    });
  };

  const releasePointer = (event: React.PointerEvent<HTMLElement>) => {
    pending.current = null;
    event.currentTarget.style.removeProperty('--zoom-x');
    event.currentTarget.style.removeProperty('--zoom-y');
  };

  // Two real columns rather than a grid. A grid lines its rows up, so once there
  // are more than two stills the taller one in a row pushes the next row down
  // and the columns end up with different gaps in them -- which is the opposite
  // of masonry. Splitting the stills by parity lets each column pack tightly.
  // A lone still takes one column, which is the whole measure: split into two and
  // it would sit at half width with an empty column beside it.
  const columns: ProjectImage[][] = images.length === 1 ? [images] : [[], []];
  if (images.length > 1) images.forEach((image, index) => columns[index % 2].push(image));

  const renderImage = (image: ProjectImage, index: number) => {
    const zoom = image.zoom ?? 1.35;

    return (
        <motion.figure
          className="project-gallery-item"
          key={image.src}
          variants={shouldReduceMotion ? undefined : galleryVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: index * 0.09 }}
          data-title-above={image.titleAbove ? true : undefined}
        >
          {image.titleAbove && image.caption ? <figcaption>{image.caption}</figcaption> : null}
          <span
            className="project-gallery-frame"
            data-frame={image.frame}
            data-cursor
            style={{ '--gallery-zoom': zoom } as React.CSSProperties}
            onPointerMove={trackPointer}
            onPointerLeave={releasePointer}
          >
            {image.clip ? (
              <GalleryClip
                src={image.src}
                label={image.alt}
                width={image.width}
                height={image.height}
              />
            ) : (
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={sizesFor(zoom)}
              />
            )}
          </span>
          {!image.titleAbove && image.caption ? <figcaption>{image.caption}</figcaption> : null}
        </motion.figure>
    );
  };

  return (
    <div className="project-gallery" data-layout={layout ?? 'masonry'}>
      {columns.map((column, columnIndex) => (
        <div className="project-gallery-column" key={columnIndex}>
          {column.map((image, rowIndex) => renderImage(image, rowIndex * 2 + columnIndex))}
        </div>
      ))}
    </div>
  );
}

/**
 * Keeps a muted, looping clip running for as long as the page itself is on
 * screen. Scrolling past it is not a reason to stop -- only the tab going away
 * is -- and browsers pause background media on their own, so the clip is taken
 * back the moment the page comes back.
 */
function useKeepPlaying(videoRef: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const resume = () => {
      // While the tab is away, leave it paused: the browser stopped it for good
      // reason and fighting that would only waste the visitor's battery.
      if (document.visibilityState !== 'visible') return;
      video.play().catch(() => {});
    };

    resume();
    document.addEventListener('visibilitychange', resume);
    window.addEventListener('focus', resume);
    video.addEventListener('canplay', resume);
    video.addEventListener('pause', resume);

    return () => {
      document.removeEventListener('visibilitychange', resume);
      window.removeEventListener('focus', resume);
      video.removeEventListener('canplay', resume);
      video.removeEventListener('pause', resume);
    };
  }, [videoRef]);
}

/**
 * The band that closes a case study. A line of "Next project" marches across it,
 * and hovering opens a circular window onto the next project's reel, centred on
 * the pointer.
 *
 * Two details carry the effect. The lettering is white under
 * `mix-blend-mode: difference`, so it resolves to black against the paper and
 * inverts wherever the reel passes behind it, rather than being punched out.
 * And the video is mounted and running the whole time the band is on screen --
 * only the circle around it moves -- so sweeping the pointer across the words
 * shows one continuous clip instead of restarting it on every entry.
 */
function NextProject({ next }: { next: Project }) {
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pending = useRef<{ x: number; y: number } | null>(null);
  const frameRequest = useRef<number | null>(null);

  useKeepPlaying(videoRef);

  useEffect(
    () => () => {
      if (frameRequest.current !== null) window.cancelAnimationFrame(frameRequest.current);
    },
    [],
  );

  const trackPointer = (event: React.PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;

    const band = event.currentTarget;
    const box = band.getBoundingClientRect();

    // The band clips its overflow, so a centre that strays within one radius of
    // an edge leaves a circle sliced flat against it. Holding the centre a full
    // radius inside every edge keeps it whole; where the band is shorter than
    // the circle there is no room to move at all, so it simply sits centred.
    const disc = band.querySelector('.project-next-reveal-inner') as HTMLElement | null;
    const radius = disc ? disc.offsetWidth / 2 : 0;
    const hold = (value: number, extent: number) =>
      extent < radius * 2 ? extent / 2 : Math.min(Math.max(value, radius), extent - radius);

    pending.current = {
      x: hold(event.clientX - box.left, box.width),
      y: hold(event.clientY - box.top, box.height),
    };

    if (frameRequest.current !== null) return;
    frameRequest.current = window.requestAnimationFrame(() => {
      frameRequest.current = null;
      const next = pending.current;
      if (!next) return;
      band.style.setProperty('--next-x', `${next.x.toFixed(1)}px`);
      band.style.setProperty('--next-y', `${next.y.toFixed(1)}px`);
    });
  };

  return (
    <Link
      className="project-next"
      href={`/projects/${next.slug}`}
      aria-label={`Next project: ${next.name}`}
      /* Deliberately no `data-cursor`/`data-cursor-arrow`: those grow the site
         cursor to 40px and 74px, and a disc that size sits over the circular
         reveal and hides the very thing the hover is opening. Left at its 8px
         resting dot, the reveal itself is the affordance. */
      onPointerMove={trackPointer}
    >
      {/* Two elements, because the two motions want different speeds: the outer
          one carries the position and follows the pointer almost immediately,
          the inner one carries the scale and takes its time opening and closing.
          Sharing one transform would force the follow to crawl at the closing
          speed, or the close to snap at the following speed. */}
      <span className="project-next-reveal" aria-hidden="true">
        <span className="project-next-reveal-inner">
          {next.video ? (
            <video ref={videoRef} autoPlay loop muted playsInline preload="auto" src={next.video} />
          ) : next.poster ? (
            <Image src={next.poster} alt="" width={next.posterWidth} height={next.posterHeight} sizes="460px" />
          ) : null}
        </span>
      </span>

      <span className="project-next-marquee" aria-hidden="true">
        <span className="project-next-track">
          {[0, 1].map((group) => (
            <span className="project-next-group" key={group}>
              {[0, 1, 2].map((item) => (
                <span key={item}>Next project</span>
              ))}
            </span>
          ))}
        </span>
      </span>
    </Link>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  const [pageReady, setPageReady] = useState(false);
  // Kept false until the hero video has enough data to run, so it never fades
  // up on a frame the browser has not decoded yet.
  const [videoReady, setVideoReady] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  useKeepPlaying(heroVideoRef);
  const heroWords = project.heroTitle.split(' ');
  const heroLink = project.projectLink;
  const heroLinkIsExternal = Boolean(heroLink && /^https?:/i.test(heroLink.href));

  // A cached video can be ready before React has attached its handlers, so an
  // onCanPlay prop alone loses the race and leaves the still up for good. Read
  // the state we may already have missed, then listen for the rest.
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    // Assigning rather than only raising it also clears the flag when routing
    // between two project pages reuses this component with a fresh src.
    const markReady = () => setVideoReady(true);
    setVideoReady(video.readyState >= 3);
    video.addEventListener('canplay', markReady);
    return () => video.removeEventListener('canplay', markReady);
  }, [project.slug]);

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
        {/* Heading left, project pill flush right and level with the foot of
            the last line -- the reference's hero row. */}
        <div className="project-hero-headline">
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
          {heroLink ? (
            // The wrap carries the entrance animation, which ends on
            // `clip-path: inset(0)` and holds it. Its padding gives the hover
            // lift and the focus ring room inside that clip; the matching
            // negative margin takes the padding back out, so the pill still
            // sits flush with the measure and level with the heading.
            <span className="project-hero-link-wrap">
              <a
                className="project-hero-link roll-button"
                data-cursor
                href={heroLink.href}
                rel={heroLinkIsExternal ? 'noreferrer' : undefined}
                target={heroLinkIsExternal ? '_blank' : undefined}
              >
                <span className="roll-label">{heroLink.label}</span>
                <ArrowUpRight aria-hidden="true" strokeWidth={2.2} />
              </a>
            </span>
          ) : null}
        </div>
        <p className="project-hero-tagline">{project.tagline}</p>

        <div className="project-hero-media" data-placeholder={project.poster || project.video ? undefined : true}>
          {/* The still is the first paint either way, and it goes through
              next/image so it arrives as a sized AVIF/WebP rather than the
              full-weight PNG a bare `poster` attribute would fetch. The video
              lies over it and is only revealed once it can actually play, so a
              slow connection holds the still instead of a blank frame. */}
          {project.poster ? (
            <Image
              className="project-hero-poster"
              src={project.poster}
              alt={project.video ? '' : `${project.name} interface`}
              aria-hidden={project.video ? true : undefined}
              width={project.posterWidth}
              height={project.posterHeight}
              sizes="(max-width: 1488px) calc(100vw - 48px), 1440px"
              priority
            />
          ) : null}
          {project.video ? (
            <video
              className="project-hero-video"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              data-ready={videoReady}
              aria-label={`${project.name} product walkthrough`}
              ref={heroVideoRef}
              src={project.video}
            />
          ) : null}
        </div>
      </section>

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

      {project.sections?.map((section) => {
        const gallery = section.gallery?.length ? section.gallery : null;

        return (
          <Fragment key={section.label}>
            <ProseBlock label={section.label} body={section.body} />
            {gallery ? <SectionGallery images={gallery} layout={section.galleryLayout} /> : null}
            {/* A block that ends in stills already reads as closed, so it takes
                the gap on its own rather than a rule under the images too. */}
            {gallery ? null : <Divider />}
          </Fragment>
        );
      })}

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
      </nav>

      <NextProject next={next} />

      <ContactSection />
      <SiteFooter />
    </main>
  );
}
