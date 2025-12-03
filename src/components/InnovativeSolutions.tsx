'use client';

import { useEffect, useState } from 'react';
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
} from '../constants/InnovativeSolutions.constants';

export default function InnovativeSolutions() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(animationSequence[0]);
  const [isParentInView, setIsParentInView] = useState(false);

  useEffect(() => {
    let sequenceIndex = 0;

    const interval = setInterval(() => {
      sequenceIndex = (sequenceIndex + 1) % animationSequence.length;
      setActiveFeatureIndex(animationSequence[sequenceIndex]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section
      title="Innovative Solutions Tailored to Your Needs"
      subtitle="Empowering Your Business with AI, No-Code, and Full-Stack Development."
      headingVariant="h2"
      headingAlign="center"
      className="bg-background"
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
            className="group relative w-7xl h-182 rounded-3xl overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
            onViewportEnter={() => setIsParentInView(true)}
            onViewportLeave={() => setIsParentInView(false)}
          >
            <motion.div
              className="flex flex-col gap-4 space-between absolute z-12 w-55 h-120 top-54 left-10"
              variants={sidebarVariants}
              initial="hidden"
              animate={isParentInView ? "visible" : "hidden"}
            >
              {sidebarItems.map((item) => (
                <div
                  key={item}
                  className="h-10 rounded-lg py-3 px-4 bg-[#D1D1D1]/10 backdrop-blur-sm corner-border"
                >
                  <p className="text-xs text-gray-light-1 font-normal whitespace-nowrap">{item}</p>
                </div>
              ))}
            </motion.div>
            <motion.div
              className="absolute z-20 w-7xl h-182 rounded-3xl overflow-hidden bg-linear-to-b from-[#000000]/0 to-[#08090A]"
              variants={overlayVariants}
              initial="hidden"
              animate={isParentInView ? "visible" : "hidden"}
            />
            <Image src="/innovative-solutions/bg-style-left.png" alt="Background Style" width={1000} height={1000} className="object-cover w-full h-full opacity-10" />
            <div className="w-full h-full overflow-hidden">
              <motion.div
                className="absolute z-13 w-50 h-107"
                variants={imagePositionVariants}
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
                className="absolute z-14 w-38 h-87"
                variants={imagePositionVariants2}
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
                className="absolute z-10 w-185 h-150"
                variants={imagePositionVariants3}
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
                className="absolute z-11 w-185 h-138"
                variants={imagePositionVariants4}
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
          <div className="flex flex-col gap-6 sm:gap-8 py-12 pr-12 hover:icon-hover border-t-diamond-gradient">
            <div className="flex flex-col gap-4 sm:gap-6">
              <Heading
                variant="h4"
                as="h3"
                align="left"
                className="text-gray-light-1"
                subtitle="Bring your ideas to life with rapid prototyping and MVP development powered by AI and no-code tools. Save time and costs with automation, seamless database integrations, and scalable solutions – all with zero code required."
                subtitleAs="p"
                subtitleClassName="text-sm sm:text-base text-gray-light-3 leading-relaxed"
              >
                Build Faster with AI-Powered No-Code Solutions
              </Heading>
            </div>

            <div className="relative grid grid-cols-2 grid-rows-3 gap-x-17 gap-y-13 p-10 rounded-3xl h-76 overflow-hidden gap-4">
              <div className="absolute inset-0 -z-10">
                <Image
                  src="/innovative-solutions/bg-style-left.png"
                  alt="background style left"
                  height={1000}
                  width={1000}
                  priority
                  className="object-cover w-full h-full opacity-25"
                />
              </div>
              {noCodeFeatures.map((feature, index) => {
                const isActive = index === activeFeatureIndex;

                return (
                  <div
                    key={feature.text}
                    className={`absolute z-10 h-10 whitespace-nowrap w-fit text-xs font-medium text-gray-light-1 backdrop-blur-sm corner-border ${feature.top} ${feature.left} py-3 px-4 rounded-lg bg-[#D1D1D1]/10 hover:shadow-[0_0_14px_0_rgba(249,249,249,0.25)] transition-shadow duration-300 ${isActive ? 'shadow-[0_0_14px_0_rgba(249,249,249,0.25)]' : ''}`}
                  >
                    {feature.text}

                    {isActive && (
                      <motion.div
                        layoutId="no-code-cursor"
                        className="pointer-events-none absolute top-5 -right-8 z-50"
                        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                      >
                        <Image
                          src="/innovative-solutions/cursor-icon.svg"
                          alt="cursor icon"
                          height={34}
                          width={34}
                          priority
                          className="object-cover"
                        />
                      </motion.div>
                    )}
                  </div>
                );
              })}
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

          <div className="flex flex-col border-l-diamond-gradient gap-6 sm:gap-8 py-12 pl-12 border-b-diamond-gradient">
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

            <div className="relative h-76 rounded-3xl overflow-hidden lg:mx-0">
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
                <div className="w-132 h-full">
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