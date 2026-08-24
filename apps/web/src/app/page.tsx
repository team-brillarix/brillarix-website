'use client';

import { Fragment, useEffect, useState } from 'react';
import { ServiceFocusList } from '@/components/service-focus-list';
import { ProcessBenefits } from '@/components/process-benefits';
import { ClientTrustSection } from '@/components/client-trust-section';
import { WhyBrillarixSection } from '@/components/why-brillarix-section';
import { ScrollCardShowcase } from '@/components/scroll-card-showcase';
import { IndustryExpertise } from '@/components/industry-expertise';
import { FaqSection } from '@/components/faq-section';
import { ContactSection } from '@/components/contact-section';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { AiNativeExplainer } from '@/components/ai-native-explainer';

const heroTitleLines = [
  { words: ['The', 'AI-Native', 'Product', 'Studio'], startDelay: 0.03 },
  { words: ['for', 'Modern', 'Founders.'], startDelay: 0.27 },
];

const heroCopyWords = 'Brillarix is an AI product development and custom software studio helping founders launch scalable MVPs, web applications, and digital platforms—faster, with AI-assisted strategy, design, and engineering.'.split(' ');

export default function Home() {
  const [pageReady, setPageReady] = useState(false);

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

  return (
    <main className="home-page overflow-x-clip bg-[var(--paper)]" data-home-ready={pageReady}>
      <div className="home-load-veil" aria-hidden="true" />
      <SiteHeader introReady={pageReady} />
      <section id="top" className="reference-hero">
        <h1 className="reference-hero-title">
          {heroTitleLines.map((line, lineIndex) => (
            <span className="reference-hero-line" key={lineIndex}>
              {line.words.map((word, wordIndex) => (
                <Fragment key={word}>
                  <span className="reference-hero-word-mask">
                    <span
                      className="reference-hero-word"
                      style={{ animationDelay: `${line.startDelay + wordIndex * 0.09}s` }}
                    >
                      {word}
                    </span>
                  </span>
                  {wordIndex < line.words.length - 1 ? ' ' : null}
                </Fragment>
              ))}
            </span>
          ))}
        </h1>
        <div className="reference-hero-copy-mask">
          <p className="reference-hero-copy">
            {heroCopyWords.map((word, wordIndex) => (
              <Fragment key={`${word}-${wordIndex}`}>
                <span className="reference-hero-copy-word-wrap">
                  <span
                    className="reference-hero-copy-word"
                    style={{ animationDelay: `${0.3 + wordIndex * 0.022}s` }}
                  >
                    {word}
                  </span>
                </span>
                {wordIndex < heroCopyWords.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </p>
        </div>
        <div className="reference-hero-actions">
          <a className="reference-hero-cta reference-hero-cta--primary" href="#contact">
            Discuss your product
          </a>
          <a className="reference-hero-cta reference-hero-cta--secondary" href="#impact">
            See client results
          </a>
        </div>
      </section>

      <ServiceFocusList />

      <AiNativeExplainer />

      <ProcessBenefits />

      <ClientTrustSection />
      <WhyBrillarixSection />
      <ScrollCardShowcase />
      <IndustryExpertise />
      <FaqSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
