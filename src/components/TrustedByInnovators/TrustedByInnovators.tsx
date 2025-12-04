'use client';

import { useEffect, useRef } from 'react';
import { Section } from '@/components/ui/Section';
import { InnovatorCard } from './InnovatorCard';
import { innovatorsData } from '@/constants/innovators';
import { Swiper, SwiperSlide, Autoplay, type SwiperType } from '@/lib/swiper';
import Image from 'next/image';

export default function TrustedByInnovators() {
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !swiperRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            swiperRef.current?.autoplay?.start();
          } else {
            swiperRef.current?.autoplay?.stop();
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={sectionRef}>
      <Section
        className="bg-background md:px-20 relative overflow-hidden"
        title="Trusted by Innovators to Deliver Exceptional Results"
        subtitle="Don't just take our word for it. Hear from the businesses we've empowered with smarter, faster solutions."
        headingVariant="h3"
        headingWeight="bold"
        headingAlign="center"
      >
        <div className="absolute z-5 md:top-58 lg:top-46">
          <Image src="/trusted-by-innovators/background.png" alt="Background Pattern" width={450} height={450} className="opacaty-60 z-5 object-cover" />
        </div>
        {/* Content */}
        <div className="relative w-full z-10">
          {/* Cards Container - Swiper */}
          <div className="w-full">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView="auto"
              breakpoints={{
                640: {
                  spaceBetween: 12,
                },
                768: {
                  spaceBetween: 16,
                },
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={innovatorsData.length > 1}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              className="trusted-innovators-swiper"
            >
              {innovatorsData.map((innovator) => (
                <SwiperSlide key={innovator.id} style={{ width: 'auto' }}>
                  <InnovatorCard innovator={innovator} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Section>
    </div>
  );
}

