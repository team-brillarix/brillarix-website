'use client';

import { useEffect, useRef, useState } from 'react';

const services = [
  {
    number: '01',
    title: 'MVP Development & Validation',
    description: 'Turn an early-stage idea into a testable product in weeks. We combine product strategy, AI-assisted research, and rapid prototyping to validate demand before you commit to full development.',
  },
  {
    number: '02',
    title: 'Custom Software Development',
    description: 'Build secure, scalable web applications and SaaS platforms designed for long-term growth. We handle user experience, backend systems, APIs, data, cloud infrastructure, and deployment.',
  },
  {
    number: '03',
    title: 'Product Strategy & UX',
    description: 'Define the right product before development begins. We align user needs, commercial goals, and technical feasibility through discovery, roadmapping, UX research, and interface design.',
  },
];

export function ServiceFocusList() {
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeIndexRef = useRef<number | null>(null);
  const lastCommittedScrollYRef = useRef(0);
  const lastScrollYRef = useRef(0);

  const setFocusedIndex = (nextIndex: number | null) => {
    if (activeIndexRef.current === nextIndex) return;
    activeIndexRef.current = nextIndex;
    lastCommittedScrollYRef.current = window.scrollY;
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    let frame = 0;
    lastScrollYRef.current = window.scrollY;

    const updateFocus = () => {
      frame = 0;
      const scrollY = window.scrollY;
      const scrollDelta = scrollY - lastScrollYRef.current;
      const scrollDirection = scrollDelta > 2 ? 1 : scrollDelta < -2 ? -1 : 0;
      lastScrollYRef.current = scrollY;
      const viewportCenter = window.innerHeight / 2;
      const items = itemRefs.current
        .map((element, index) => {
          if (!element) return null;
          const rect = element.getBoundingClientRect();
          return { index, rect, distance: Math.abs(rect.top + rect.height / 2 - viewportCenter) };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

      const closest = [...items].sort((a, b) => a.distance - b.distance)[0];
      if (!closest) return;

      const currentIndex = activeIndexRef.current;
      const current = items.find((item) => item.index === currentIndex);
      const activationBand = Math.max(145, window.innerHeight * 0.22);
      const switchHysteresis = Math.max(110, window.innerHeight * 0.16);
      const minimumScrollTravel = Math.max(220, window.innerHeight * 0.32);

      if (currentIndex === null) {
        if (closest.distance < activationBand) setFocusedIndex(closest.index);
        return;
      }

      if (!current || current.rect.bottom < 0 || current.rect.top > window.innerHeight) {
        setFocusedIndex(null);
        return;
      }

      const isMovingTowardCandidate = scrollDirection !== 0 && Math.sign(closest.index - currentIndex) === scrollDirection;
      const hasMovedFarEnough = Math.abs(scrollY - lastCommittedScrollYRef.current) >= minimumScrollTravel;

      if (
        closest.index !== currentIndex
        && isMovingTowardCandidate
        && hasMovedFarEnough
        && closest.distance < activationBand
        && closest.distance + switchHysteresis < current.distance
      ) {
        setFocusedIndex(closest.index);
      }
    };

    const requestFocusUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateFocus);
    };

    requestFocusUpdate();
    window.addEventListener('scroll', requestFocusUpdate, { passive: true });
    window.addEventListener('resize', requestFocusUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestFocusUpdate);
      window.removeEventListener('resize', requestFocusUpdate);
    };
  }, []);

  return (
    <section id="services" className="service-focus-section" aria-label="Services">
      <div className="service-focus-list">
        {services.map((service, index) => {
          const isActive = activeIndex === index;
          return (
            <article
              key={service.number}
              ref={(element) => { itemRefs.current[index] = element; }}
              className={`service-focus-item${isActive ? ' is-active' : ''}`}
              data-service-index={index}
            >
              <button className="service-focus-panel" type="button" onClick={() => setFocusedIndex(index)}>
                <span className="service-focus-visual" aria-hidden="true" />
                <span className="service-focus-heading">{service.title}</span>
                <span className="service-focus-number">{service.number}</span>
                <span className="service-focus-copy">
                  {service.description}
                </span>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
