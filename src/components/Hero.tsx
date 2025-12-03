'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { FiLayers, FiZap } from 'react-icons/fi';

const DotIcon = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-2 h-2 dot-shadow"
    aria-hidden="true"
  >
    <circle cx="4" cy="4" r="4" fill="currentColor" />
  </svg>
);

export default function Hero() {
  const [activeSegment, setActiveSegment] = useState<'first' | 'second'>('first');

  return (
    <Section
      className="pt-5 sm:pt-10 md:pt-20 bg-background">
      <div className="h-33 w-366 opacity-30 absolute top-0 left-0 bg-gray-light-9 origin-[717.457px_427.206px] rotate-[28.4742deg] blur-[73px] z-100">

      </div>
      <div className="w-full flex flex-col items-center gap-6 sm:gap-10 md:gap-12">
        <div className="flex flex-col hero-hex-bg gap-15 -mx-[calc((100vw-100%)/2)] px-[calc((100vw-100%)/2)] -mt-[40px] sm:-mt-[60px] md:-mt-[100px] lg:-mt-[120px] pt-[40px] sm:pt-[60px] md:pt-[100px] lg:pt-[120px]">
          <Heading
            variant="h1"
            weight="medium"
            align="center"
            children="Skip the delays. Our AI-driven team designs
            &amp; builds at startup speed."
            subtitle="Brillarix blends cutting-edge AI, no-code platforms, and full-stack development to bring your product vision to life faster than traditional teams."
            subtitleAs="p"
            subtitleClassName="font-normal text-gray-light-3"
          />
          <div className="flex flex-col items-center justify-center w-full gap-12">
            {/* cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 px-15 sm:px-25 md:px-35 gap-5">
              <div className="flex flex-col gap-5 h-full">
                <div className="flex flex-col bg-gray-dark-1/70 rounded-3xl h-120 p-1 border border-gray-dark-3 gap-2">
                  <div className="flex flex-col h-118 p-6 rounded-3xl gap-4 surface-gradient-with-noise relative">
                    <div className="flex flex-row gap-4 items-center justify-start relative z-10">
                      <div className="flex w-17.5 h-17.5 items-center justify-center rounded-full border border-gray-light-6 bg-background">
                        <FiZap size={20} color="gray-light-1" />
                      </div>
                      <div className="flex flex-col gap-2 w-50">
                        <Heading
                          variant="h6"
                          as="h3"
                          align="left"
                          weight="semibold"
                          scale="compact"
                          className="text-gray-light-1 font-medium"
                          children="AI + No-Code Prototyping"
                          subtitle="Build, test, and iterate at lightning speed with AI-powered no-code solutions."
                          subtitleAs="p"
                          subtitleClassName="text-xs font-normal text-gray-light-5"
                        />
                      </div>
                    </div>
                    <div className="relative w-full flex-1 min-h-0 overflow-hidden">
                      <div className="grid grid-cols-7 grid-rows-6 gap-0 w-full h-full">
                        {Array.from({ length: 42 }).map((_, index) => (
                          <div
                            key={index}
                            className="border border-gray-dark-2"
                          />
                        ))}
                      </div>

                      <div className="absolute inset-0 pointer-events-none">
                        <svg
                          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                          style={{ overflow: 'visible' }}
                        >
                          <defs>
                            <style>{`
                            .connection-line {
                                stroke: rgba(255, 255, 255, 0.3);
                                stroke-width: 0.20;
                                stroke-dasharray: 0.6 0.6;
                                fill: none;
                            }
                            .animated-segment {
                                stroke: rgba(255, 255, 255, 0.9);
                                stroke-width: 0.5;
                                fill: none;
                                filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.8));
                            }
                            `}</style>
                          </defs>
                          {/* Base connection lines */}
                          <path
                            className="connection-line"
                            d="M 15 22 V 38 Q 15 48 25 48 H 46"
                          />
                          <path
                            className="connection-line"
                            d="M 50 50 V 72 Q 50 82 60 82 H 80"
                          />
                          {/* Animated bright segments */}
                          {activeSegment === 'first' && (
                            <motion.path
                              key="first-segment"
                              className="animated-segment"
                              d="M 15 22 V 38 Q 15 48 25 48 H 46"
                              strokeDasharray="5 10000"
                              initial={{ strokeDashoffset: 0 }}
                              animate={{ strokeDashoffset: -50 }}
                              transition={{
                                duration: 2.5,
                                ease: "linear"
                              }}
                              onAnimationComplete={() => setActiveSegment('second')}
                            />
                          )}
                          {activeSegment === 'second' && (
                            <motion.path
                              key="second-segment"
                              className="animated-segment"
                              d="M 50 55 V 72 Q 50 82 60 82 H 80"
                              strokeDasharray="5 10000"
                              initial={{ strokeDashoffset: 0 }}
                              animate={{ strokeDashoffset: -50 }}
                              transition={{
                                duration: 2.5,
                                ease: "linear"
                              }}
                              onAnimationComplete={() => setActiveSegment('first')}
                            />
                          )}
                        </svg>

                        <div className="absolute top-[7%] left-[7%] z-20 pointer-events-auto">
                          <Image
                            src="/hero-icons/Bulb.svg"
                            alt="Bulb"
                            width={48}
                            height={48}
                            className="object-contain transition-all duration-300 hover:scale-125 icon-hover"
                          />
                        </div>

                        <div className="absolute border border-gray-dark-2 flex items-center justify-center rounded-full h-22 w-22 top-[5%] right-[3%] z-20">
                          <div className="absolute border border-gray-dark-4 flex items-center justify-center rounded-full h-19 w-19">
                            <div className="absolute border border-gray-dark-4 flex items-center justify-center rounded-full h-16 w-16">
                              <div className="absolute border bg-gray-dark-3 h-12 w-12 flex items-center justify-center rounded-full">
                                <Image
                                  src="/hero-icons/Speedtest.svg"
                                  alt="Speedtest"
                                  width={22}
                                  height={19}
                                  className="object-contain"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="group absolute flex items-center justify-center top-1/2 bg-gray-dark-2 rounded-lg h-12 w-12 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto hover:bg-gray-dark-5">
                          <Image
                            src="/hero-icons/Arcticons.svg"
                            alt="Arcticons"
                            width={30}
                            height={16}
                            className="object-contain transition-all duration-300 group-hover:scale-125 hover:scale-125 icon-hover"
                          />
                        </div>

                        <div className="absolute bottom-[7%] right-[5%] z-20 pointer-events-auto">
                          <Image
                            src="/hero-icons/Developer.svg"
                            alt="Developer"
                            width={56}
                            height={56}
                            className="object-contain transition-all duration-300 hover:scale-125 icon-hover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row text-xs items-center justify-start font-normal text-gray-light-1 gap-4 rounded-3xl bg-gray-dark-2 p-6 surface-gradient-with-noise relative">
                  <DotIcon />
                  <p>
                    Get your product to market faster, without the traditional delays.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5 h-full">
                <div className="flex flex-col bg-gray-dark-1/70 rounded-3xl h-145 p-1 border border-gray-dark-3 gap-2">
                  <div className="flex flex-col justify-between p-6 rounded-3xl gap-4 h-143 surface-gradient-with-noise relative">
                    <div className="flex flex-row gap-4 items-center justify-start relative z-10">
                      <div className="flex w-17.5 h-17.5 items-center justify-center rounded-full border border-gray-light-6 bg-background">
                        <FiLayers size={20} color="gray-light-1" />
                      </div>
                      <div className="flex flex-col gap-2 w-50">
                        <Heading
                          variant="h6"
                          as="h3"
                          align="left"
                          weight="semibold"
                          scale="compact"
                          className="text-gray-light-1 font-medium text-base"
                          children="Full-Stack Development"
                          subtitle="Seamless integration across front-end and back-end, built to scale."
                          subtitleAs="p"
                          subtitleClassName="text-xs font-normal text-gray-light-5"
                        />
                      </div>
                    </div>
                    <Image
                      src="/hero-icons/full-stack-development.webp"
                      alt="Full Stack Development Animation"
                      width={250}
                      height={250}
                      className="w-full rounded-2xl object-contain"
                      priority
                    />
                    <div className="flex flex-row text-xs items-center justify-start font-normal text-gray-light-1 gap-4 rounded-3xl bg-gray-dark-2 p-6 relative shadow-[0_4px_4px_0_rgba(0,0,0,0.05)]">
                      <DotIcon />
                      <p>
                        Custom solutions that grow with your business.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5 h-full">
                <div className="flex flex-row text-xs items-center justify-start font-normal text-gray-light-1 gap-4 rounded-3xl bg-gray-dark-2 p-6 surface-gradient-with-noise relative">
                  <DotIcon />
                  <p>
                    Brand and product consulting that aligns with your business goals.
                  </p>
                </div>
                <div className="flex flex-col bg-gray-dark-1/70 rounded-3xl h-120 p-1 border border-gray-dark-3 gap-2">
                  <div className="flex flex-col bg-[#020202] h-118 p-6 rounded-3xl gap-4">
                    <div className="flex flex-row gap-4 items-center justify-start">
                      <div className="flex w-17.5 h-17.5 items-center justify-center rounded-full border border-gray-light-6 bg-background">
                        <Image src="/hero-icons/Target.svg" alt="Target" width={20} height={20} />
                      </div>
                      <div className="flex flex-col gap-2 w-50">
                        <Heading
                          variant="h6"
                          as="h3"
                          align="left"
                          weight="semibold"
                          scale="compact"
                          className="text-gray-light-1 font-medium text-base"
                          children="Strategy-Driven Consulting"
                          subtitle="Position your product for long-term success with a strategy that works."
                          subtitleAs="p"
                          subtitleClassName="text-xs font-normal text-gray-light-5"
                        />
                      </div>
                    </div>
                    <Image
                      src="/hero-icons/strategy-driven-consulting.webp"
                      alt="Strategy Driven Consulting Animation"
                      width={250}
                      height={250}
                      className="w-full rounded-2xl object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 sm:gap-10 md:gap-12 bg-background z-10 w-full">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Button
              variant="primary"
              href="/get-quote"
              children="Start Your Project"
            />
            <Button
              variant="secondary"
              href="#process"
              children="See Our Process"
            />
          </div>

          <div className="flex flex-col gap-12 w-206 items-center justify-center">
            <div className="flex border-t-diamond-gradient border-b-diamond-gradient w-full items-center justify-center py-2">
              <p className="text-xs sm:text-sm text-gray-light-4 text-center max-w-2xl">
                Trusted by innovators, startups, and enterprises to deliver scalable,
                AI-powered solutions.
              </p>
            </div>

            <div className="grid grid-cols-4 w-190 border-t-diamond-gradient">
              <div className="flex flex-col items-center gap-2 text-gray-light-4 border-r-diamond-gradient px-12 py-8 text-xs sm:text-sm">
                <div className="h-25 w-25 rounded-full bg-gray-dark-1 border border-gray-dark-3 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/hero-icons/Bubble.svg"
                    alt="Bubble logo"
                    width={68}
                    height={18}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-row py-1 px-2 items-center gap-2.5">
                  <p className="whitespace-nowrap">Silver Agency</p>
                  <Image src="/hero-icons/Verified.svg" alt="Verified Tick" width={24} height={24} className="object-contain" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 text-gray-light-4 border-r-diamond-gradient px-12 py-8 text-xs sm:text-sm">
                <div className="h-25 w-25 rounded-full bg-gray-dark-1 border border-gray-dark-3 flex items-center justify-center overflow-hidden">
                  <Heading variant="h5" weight="bold" children="50+" subtitle="Reviews" subtitleClassName="text-sm font-medium" />
                </div>
                <div className="flex justify-center flex-row py-1 px-2 h-8 items-center gap-2.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Image key={index} src="/hero-icons/Star.svg" alt="Star" width={24} height={24} className="object-contain" />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 text-gray-light-4 border-r-diamond-gradient px-12 py-8 text-xs sm:text-sm">
                <div className="h-25 w-25 rounded-full bg-gray-dark-1 border border-gray-dark-3 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/hero-icons/Upwork.svg"
                    alt="Upwork logo"
                    width={68}
                    height={18}
                    className="object-contain"
                  />
                </div>
                <div className="flex justify-center flex-row py-1 px-2 items-center gap-2.5">
                  <p className="whitespace-nowrap">Upwork</p>
                  <Image src="/hero-icons/Verified.svg" alt="Verified Tick" width={24} height={24} className="object-contain" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 text-gray-light-4 px-12 py-8 text-xs sm:text-sm">
                <div className="h-25 w-25 rounded-full bg-gray-dark-1 border border-gray-dark-3 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/hero-icons/Contra.svg"
                    alt="Contra"
                    width={68}
                    height={18}
                    className="object-contain"
                  />
                </div>
                <div className="flex justify-center flex-row py-1 px-2 items-center gap-2.5">
                  <p className="whitespace-nowrap">Features on</p>
                  <Image src="/hero-icons/Verified.svg" alt="Verified Tick" width={24} height={24} className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
