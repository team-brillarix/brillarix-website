'use client';

import { useEffect, useRef } from 'react';
import { Section } from '@/components/ui/Section';
import { InnovatorCard } from './InnovatorCard';
import { innovatorsData } from '@/constants/innovators';
import { Swiper, SwiperSlide, Autoplay, type SwiperType } from '@/lib/swiper';
import Image from 'next/image';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brillarix.com';

export default function TrustedByInnovators() {
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const duplicatedData = Array(4).fill(innovatorsData).flat();

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Brillarix',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: innovatorsData.length.toString(),
      bestRating: '5',
      worstRating: '5',
    },
    review: innovatorsData.map((innovator) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: innovator.name,
        jobTitle: innovator.position,
      },
      reviewBody: innovator.testimonialText,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '5',
      },
      itemReviewed: {
        '@type': 'Service',
        name: 'Web Development & Low-Code Solutions',
        provider: {
          '@type': 'Organization',
          name: 'Brillarix',
        },
      },
    })),
  };

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div ref={sectionRef}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewSchema),
        }}
      />
      <Section
        className="bg-background py-16 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden"
        title="Trusted by Innovators to Deliver Exceptional Results"
        subtitle="Don't just take our word for it. Hear from the businesses we've empowered with smarter, faster solutions."
        headingVariant="h3"
        headingWeight="bold"
        headingAlign="center"
      >
        <div className="absolute z-0 top-42 md:top-58 lg:top-46 pointer-events-none">
          <Image
            src="/trusted-by-innovators/background.png"
            alt="Background Pattern"
            width={450}
            height={450}
            className="opacity-60 object-cover"
          />
        </div>

        <div
          className="w-full max-w-7xl mx-auto relative z-10"
          aria-label="Trusted by Innovators"
          role="region"
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={false}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 12,
                centeredSlides: false
              },
              768: {
                slidesPerView: 1.5,
                spaceBetween: 16,
                centeredSlides: false
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: false
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            loopAdditionalSlides={Math.max(innovatorsData.length, 2)}
            speed={2000}
            allowTouchMove={true}
            grabCursor={true}
            watchSlidesProgress={true}
            className="overflow-hidden! py-4"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;

              if (sectionRef.current) {
                if (observerRef.current) {
                  observerRef.current.disconnect();
                }

                observerRef.current = new IntersectionObserver(
                  (entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting && swiperRef.current?.autoplay) {
                        swiperRef.current.autoplay.start();
                      } else if (swiperRef.current?.autoplay) {
                        swiperRef.current.autoplay.stop();
                      }
                    });
                  },
                  {
                    threshold: 0.1,
                    rootMargin: '50px',
                  }
                );

                observerRef.current.observe(sectionRef.current);
              }
            }}
          >
            {duplicatedData.map((innovator, index) => (
              <SwiperSlide key={`${innovator.id}-${index}`} className="h-auto!">
                <div className="h-full">
                  <InnovatorCard innovator={innovator} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Section>
    </div>
  );
}