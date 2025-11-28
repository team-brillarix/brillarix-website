"use client";

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Section } from '@/components/ui/Section';
import { impactProjects } from '@/constants/impact';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { ImpactCard } from './ImpactCard';

import 'swiper/css';
import 'swiper/css/pagination';

export default function OurImpact() {
    const swiperRef = useRef<SwiperType | null>(null);
    const hasMultipleProjects = impactProjects.length > 1;

    return (
        <Section
            title="Our Impact"
            subtitle="Brillarix turns ideas into results, delivering fast, scalable, and innovative solutions that drive growth and efficiency."
            headingVariant="h2"
            headingWeight="semibold"
            className="bg-gray-dark-1 py-16 md:py-20 px-0"
        >
            <div
                className="w-screen overflow-hidden relative pb-12"
                style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}
                aria-label="Customer success stories carousel"
                role="region"
            >
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={32}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 24 },
                        768: { slidesPerView: 2, spaceBetween: 28 },
                        1024: { slidesPerView: 2, spaceBetween: 32 },
                        1280: { slidesPerView: 3, spaceBetween: 36 },
                    }}
                    autoplay={
                        hasMultipleProjects
                            ? { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }
                            : false
                    }
                    pagination={
                        hasMultipleProjects
                            ? {
                                clickable: true,
                                bulletClass: 'swiper-pagination-bullet-white',
                                bulletActiveClass: 'swiper-pagination-bullet-active-white',
                            }
                            : false
                    }
                    loop={hasMultipleProjects}
                    loopAdditionalSlides={2}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    speed={700}
                    allowTouchMove={false}
                    grabCursor={false}
                    allowSlidePrev={true}
                    allowSlideNext={true}
                    className="impact-swiper"
                >
                    {impactProjects.map((project) => (
                        <SwiperSlide key={project.id} style={{ height: 'auto' }}>
                            <ImpactCard project={project} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {hasMultipleProjects && (
                    <>
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-gray-dark-3 text-gray-light-1 flex items-center justify-center hover:bg-gray-dark-4 transition-colors opacity-80 hover:opacity-100"
                            aria-label="Previous slide"
                        >
                            <IoChevronBack className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-gray-dark-3 text-gray-light-1 flex items-center justify-center hover:bg-gray-dark-4 transition-colors opacity-80 hover:opacity-100"
                            aria-label="Next slide"
                        >
                            <IoChevronForward className="w-5 h-5" />
                        </button>
                    </>
                )}
            </div>
        </Section>
    );
}

