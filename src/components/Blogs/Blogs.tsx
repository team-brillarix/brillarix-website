"use client";

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide, Navigation, Autoplay, Pagination, type SwiperType } from '@/lib/swiper';
import { Section } from '@/components/ui/Section';
import { blogPosts } from '@/constants/blogs';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { BlogCard } from './BlogCard';

const buttonClassName = "absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-gray-dark-2 text-gray-light-1 flex items-center justify-center hover:bg-gray-dark-2 transition opacity-80 hover:opacity-100 cursor-pointer";

export default function Blogs() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isReady, setIsReady] = useState(false);

  return (
    <Section
      title="Blogs"
    >
      <div className="w-full relative">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          loop={blogPosts.length > 3}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsReady(true);
          }}
          className="blogs-swiper"
        >
          {blogPosts.map((blog) => (
            <SwiperSlide key={blog.id} style={{ height: 'auto' }}>
              <BlogCard blog={blog} />
            </SwiperSlide>
          ))}
        </Swiper>

        {isReady && (
          <>
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className={`${buttonClassName} -left-14`}
              aria-label="Previous slide"
            >
              <FiChevronLeft className="w-5 h-5 -ms-1" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className={`${buttonClassName} -right-14`}
              aria-label="Next slide"
            >
              <FiChevronRight className="w-5 h-5 -me-1" />
            </button>
          </>
        )}
      </div>
    </Section>
  );
}

