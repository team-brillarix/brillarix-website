"use client";

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Section } from '@/components/ui/Section';
import { impactProjects } from '@/constants/impact';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { ImpactCard } from './ImpactCard';

import 'swiper/css';
import 'swiper/css/pagination';

const buttonClassName = "absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-gray-dark-3 text-gray-light-1 flex items-center justify-center hover:bg-gray-dark-4 transition-colors opacity-80 hover:opacity-100";

export default function OurImpact() {
    const swiperRef = useRef<SwiperType | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Section
            title="Our Impact"
            subtitle="Brillarix turns ideas into results, delivering fast, scalable, and innovative solutions that drive growth and efficiency."
            headingVariant="h2"
            headingWeight="semibold"
            className="py-16 md:py-20 px-0"
        >
            <div
                className="w-screen overflow-hidden relative pb-16"
                style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}
                aria-label="Customer success stories carousel"
                role="region"
            >
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={32}
                    slidesPerView={1.2}
                    centeredSlides={true}
                    breakpoints={{
                        768: { slidesPerView: 1.5, spaceBetween: 28 },
                        1024: { slidesPerView: 1.5, spaceBetween: 32 },
                        1280: { slidesPerView: 1.5, spaceBetween: 36 },
                    }}
                    autoplay={{ delay: 10000, disableOnInteraction: false, pauseOnMouseEnter: false }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: false
                    }}
                    loop
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        swiper.update();
                        setActiveIndex(swiper.realIndex ?? 0);
                        setIsReady(true);
                    }}
                    onSlideChange={(swiper) => {
                        setActiveIndex(swiper.realIndex);
                    }}
                    speed={2000}
                    allowTouchMove={false}
                    grabCursor={false}
                    className={`impact-swiper transition-opacity duration-300 ${isReady ? 'opacity-100' : 'opacity-0'}`}
                >
                    {impactProjects.map((project, index) => (
                        <SwiperSlide key={project.id} style={{ height: 'auto' }}>
                            <ImpactCard project={project} isActive={index === activeIndex} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <>
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className={`${buttonClassName} left-4`}
                        aria-label="Previous slide"
                    >
                        <IoChevronBack className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className={`${buttonClassName} right-4`}
                        aria-label="Next slide"
                    >
                        <IoChevronForward className="w-5 h-5" />
                    </button>
                </>
            </div>
        </Section>
    );
}

