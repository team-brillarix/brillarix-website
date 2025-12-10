'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { FaAngleRight } from 'react-icons/fa';
import Image from 'next/image';
import {
  sidebarItems,
  noCodeFeatures,
  animationSequence,
  overlayVariants,
  sidebarVariants,
  imagePositionVariants,
  imagePositionVariants2,
  imagePositionVariants3,
  imagePositionVariants4,
  imagePositionVariantsMobile,
  imagePositionVariants2Mobile,
  imagePositionVariants3Mobile,
  imagePositionVariants4Mobile,
} from '../constants/InnovativeSolutions';

export default function InnovativeSolutions() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(animationSequence[0]);
  const [isParentInView, setIsParentInView] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let sequenceIndex = 0;

    const interval = setInterval(() => {
      sequenceIndex = (sequenceIndex + 1) % animationSequence.length;
      setActiveFeatureIndex(animationSequence[sequenceIndex]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updateCursorPosition = () => {
      const activeRef = featureRefs.current[activeFeatureIndex];
      const container = containerRef.current;

      if (activeRef && container) {
        const featureRect = activeRef.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const top = featureRect.top - containerRect.top + featureRect.height / 2;
        const left = featureRect.left - containerRect.left + featureRect.width / 2;

        setCursorPosition({
          top: (top / containerRect.height) * 100,
          left: (left / containerRect.width) * 100,
        });
      }
    };

    const rafId = requestAnimationFrame(() => {
      updateCursorPosition();
    });

    window.addEventListener('resize', updateCursorPosition);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateCursorPosition);
    };
  }, [activeFeatureIndex]);

  return (
    <Section
      title="Innovative Solutions Tailored to Your Needs"
      subtitle="Empowering Your Business with AI, No-Code, and Full-Stack Development."
      headingVariant="h2"
      headingAlign="center"
      className="bg-background"
      id="our-services"
    >
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col py-12 gap-6 sm:gap-8">
          <Heading
            variant="h4"
            as="h3"
            align="left"
            className="text-gray-light-1"
            subtitle="Our expert team builds custom, fully integrated websites that drive engagement and growth. 
              Whether it's e-commerce, SaaS, or custom solutions, we ensure your site is optimized for 
              performance, security, and scalability."
            subtitleAs='p'
            subtitleClassName="text-base sm:text-lg text-gray-light-5 font-normal leading-relaxed max-w-4xl"
            children="End-to-End Full-Stack Development"
          />
          <motion.div
            className="group relative min-h-75 max-w-7xl md:h-182 self-center rounded-3xl overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onViewportEnter={() => setIsParentInView(true)}
            onViewportLeave={() => setIsParentInView(false)}
          >
            <motion.div
              className={`absolute z-16 w-7xl h-182 rounded-3xl overflow-hidden ${!isParentInView ? 'bg-linear-to-b from-[#000000]/0 to-[#08090A]' : ''}`}
              initial={{ opacity: 1 }}
              animate={{ opacity: isParentInView ? 0 : 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.div
              className="hidden sm:flex flex-col gap-1.5 md:gap-4 space-between absolute z-12 max-w-70 top-[2%] sm:top-[5%] md:top-54 left-[2%] sm:left-[3%] md:left-10 h-auto max-h-[96%] md:h-120 overflow-y-auto"
              variants={sidebarVariants}
              initial="hidden"
              animate={isParentInView ? "visible" : "hidden"}
            >
              {sidebarItems.map((item) => (
                <div
                  key={item}
                  className="h-auto min-h-7 md:h-10 rounded-lg py-1.5 sm:py-2 md:py-3 px-2 sm:px-3 md:px-4 bg-[#D1D1D1]/10 backdrop-blur-sm corner-border shrink-0"
                >
                  <p className="text-[10px] md:text-xs text-gray-light-1 font-normal whitespace-nowrap">{item}</p>
                </div>
              ))}
            </motion.div>
            <motion.div
              className="absolute z-20 max-w-7xl h-182 rounded-3xl overflow-hidden bg-linear-to-b from-[#000000]/0 to-[#08090A]"
              variants={overlayVariants}
              initial="hidden"
              animate={isParentInView ? "visible" : "hidden"}
            />
            <Image src="/innovative-solutions/bg-style-left.png" alt="Background Style" width={1000} height={1000} className="object-cover w-full h-full opacity-10" />
            <div className="w-full h-full overflow-hidden">
              <motion.div
                className="absolute z-13 max-w-50 max-h-107"
                variants={isMobile ? imagePositionVariantsMobile : imagePositionVariants}
                initial="hidden"
                animate={isParentInView ? "visible" : "hidden"}
              >
                <Image
                  src="/innovative-solutions/IS-3.png"
                  alt="Web Application Screenshot"
                  width={200}
                  height={428}
                  className="w-full h-full object-cover rounded-xl shadow-[0_6px_28px_0_rgba(72,72,72,0.5)]"
                  style={{ transform: 'matrix(0.98, -0.17, 0.5, 0.87, 0, 0)' }}
                />
              </motion.div>
              <motion.div
                className="absolute z-14 max-w-38 max-h-87"
                variants={isMobile ? imagePositionVariants2Mobile : imagePositionVariants2}
                initial="hidden"
                animate={isParentInView ? "visible" : "hidden"}
              >
                <Image
                  src="/innovative-solutions/IS-4.png"
                  alt="Web Application Screenshot"
                  width={152}
                  height={350}
                  className="w-full h-full object-cover rounded-xl shadow-[0_6px_28px_0_rgba(72,72,72,0.5)]"
                  style={{ transform: 'matrix(0.98, -0.17, 0.5, 0.87, 0, 0)' }}
                />
              </motion.div>
              <motion.div
                className="absolute z-10 max-w-185 max-h-150"
                variants={isMobile ? imagePositionVariants3Mobile : imagePositionVariants3}
                initial="hidden"
                animate={isParentInView ? "visible" : "hidden"}
              >
                <Image
                  src="/innovative-solutions/IS-1.png"
                  alt="Web Application Screenshot"
                  width={740}
                  height={602}
                  className="w-full h-full object-cover rounded-3xl shadow-[0_6px_28px_0_rgba(72,72,72,0.5)]"
                  style={{ transform: 'matrix(0.98, -0.17, 0.5, 0.87, 0, 0)' }}
                />
              </motion.div>
              <motion.div
                className="absolute z-11 max-w-185 max-h-138"
                variants={isMobile ? imagePositionVariants4Mobile : imagePositionVariants4}
                initial="hidden"
                animate={isParentInView ? "visible" : "hidden"}
              >
                <Image
                  src="/innovative-solutions/IS-2.png"
                  alt="Web Application Screenshot"
                  width={740}
                  height={553}
                  className="w-full h-full object-cover rounded-3xl shadow-[0_6px_28px_0_rgba(72,72,72,0.5)]"
                  style={{ transform: 'matrix(0.98, -0.17, 0.5, 0.87, 0, 0)' }}
                />
              </motion.div>
            </div>
          </motion.div>
          {/* Mobile sidebar - shown below sm breakpoint */}
          <div className="flex justify-center sm:hidden flex-col gap-3 w-full">
            {sidebarItems.map((item) => (
              <div
                key={item}
                className="flex h-auto items-center justify-center min-h-10 rounded-lg py-1.5 px-2 bg-[#D1D1D1]/10 backdrop-blur-sm corner-border shrink-0"
              >
                <p className="text-xs text-gray-light-1 font-normal whitespace-nowrap">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <Button
          variant="secondary"
          href="/get-quote"
          className="w-fit"
          rightImage={<FaAngleRight size={16} />}
        >
          Build Your Digital Presence
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 z-0 border-y border-gray-dark-4">
        <div className="flex flex-col gap-8 py-12 md:pr-12 hover:icon-hover border-t-diamond-gradient">
          <div className="flex flex-col gap-4 sm:gap-6">
            <Heading
              variant="h4"
              as="h3"
              align="left"
              className="text-gray-light-1"
              subtitle="Bring your ideas to life with rapid prototyping and MVP development powered by AI and no-code tools. Save time and costs with automation, seamless database integrations, and scalable solutions — all with zero code required."
              subtitleAs="p"
              subtitleClassName="text-sm sm:text-base text-gray-light-3 leading-relaxed"
            >
              Build Faster with AI-Powered No-Code Solutions
            </Heading>
          </div>

          <div className="relative rounded-3xl overflow-visible sm:overflow-hidden p-4 sm:p-6 md:p-8 lg:p-10 flex-1 min-h-0">
            <div className="absolute inset-0 -z-10 rounded-3xl overflow-hidden">
              <Image
                src="/innovative-solutions/bg-style-left.png"
                alt="background style left"
                height={1000}
                width={1000}
                priority
                className="object-cover w-full h-full opacity-25"
              />
            </div>
            <div ref={containerRef} className="relative z-10 h-fit lg:h-full flex items-center justify-center">
              <div className="grid grid-cols-1 items-center sm:grid-cols-2 auto-rows-auto sm:grid-rows-3 gap-3 sm:gap-5 w-full">
                {noCodeFeatures.map((feature, index) => {
                  const isActive = index === activeFeatureIndex;

                  return (
                    <div
                      key={feature.text}
                      ref={(el) => {
                        featureRefs.current[index] = el;
                      }}
                      className={`relative flex items-center justify-center h-10 text-xs text-gray-light-1 backdrop-blur-sm corner-border px-2 md:px-3 lg:px-4 rounded-lg bg-[#D1D1D1]/10 hover:shadow-[0_0_14px_0_rgba(249,249,249,0.25)] transition-shadow duration-300 overflow-hidden ${isActive ? 'shadow-[0_0_14px_0_rgba(249,249,249,0.25)]' : ''}`}
                    >
                      <p className="text-center max-w-full line-clamp-2 sm:line-clamp-3 wrap-break-words">
                        {feature.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {activeFeatureIndex !== null && cursorPosition.top > 0 && (
                <motion.div
                  layoutId="no-code-cursor"
                  className="pointer-events-none absolute z-9999 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    top: `${cursorPosition.top}%`,
                    left: `${cursorPosition.left}%`,
                  }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                >
                  <Image
                    src="/innovative-solutions/cursor-icon.svg"
                    alt="cursor icon"
                    height={28}
                    width={28}
                    priority
                    className="object-contain w-[clamp(20px,3vw,28px)] h-[clamp(20px,3vw,28px)]"
                  />
                </motion.div>
              )}
            </div>
          </div>

          <Button
            variant="secondary"
            href="/get-quote"
            className="w-fit"
            rightImage={<FaAngleRight size={16} />}
          >
            Start Building with AI
          </Button>
        </div>

        <div className="flex flex-col lg-border-l-diamond-gradient gap-12 sm:gap-8 py-12 lg:pl-12 border-b-diamond-gradient">
          <div className="flex flex-col gap-4 sm:gap-6 pr-20">
            <Heading
              variant="h4"
              as="h3"
              align="left"
              className="text-gray-light-1"
              subtitle="Bring your mobile app ideas to life with our cross-platform development expertise. From design to deployment, we ensure your app is intuitive, scalable, and optimized for both iOS and Android devices."
              subtitleAs="p"
              subtitleClassName="text-sm sm:text-base text-gray-light-3 leading-relaxed"
            >
              Cross-Platform Mobile Apps That Scale
            </Heading>
          </div>

          <div className="relative rounded-3xl overflow-hidden lg:mx-0 flex-1">
            <div className="absolute inset-0 -z-10">
              <Image
                src="/innovative-solutions/bg-style-left.png"
                alt="background style right"
                height={1000}
                width={1000}
                priority
                unoptimized
                className="w-full h-full object-cover opacity-25"
              />
            </div>

            <div className="relative flex items-center justify-center h-full">
              <div className="max-w-132">
                <Image
                  src="/innovative-solutions/bg-mobile.png"
                  alt="mobile app screenshot"
                  height={1000}
                  width={1000}
                  priority
                  unoptimized
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            href="/get-quote"
            className="w-fit"
            rightImage={<FaAngleRight size={16} />}
          >
            Launch Your App
          </Button>
        </div>
      </div>
    </Section>
  );
}