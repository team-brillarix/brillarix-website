'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { ConnectionPaths, ConnectionPath } from '@/components/ui/ConnectionPaths';
import { FiLayers, FiZap } from 'react-icons/fi';
import { motion } from 'motion/react';

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
  const [activeIcons, setActiveIcons] = useState<Set<string>>(new Set());

  const iconPositions = [
    { id: 'bulb', gridX: 1, gridY: 1, radius: 2.5 },
    { id: 'arcticons', gridX: 3.5, gridY: 3, radius: 2.5 },
    { id: 'developer', gridX: 6.01, gridY: 5.01, radius: 2.5 },
  ];

  const connectionPaths: ConnectionPath[] = [
    {
      id: 'bulb-to-arcticons-to-developer',
      d: 'M 14.29 18.67 V 45 Q 14.29 50 19.29 50 H 46 V 78 Q 50 83 55 83 H 87',
      startPoint: { x: 14.29, y: 18.67 },
      endPoint: { x: 87, y: 83 },
      gridStartPoint: { x: 1, y: 1 },
      gridEndPoint: { x: 6.01, y: 5.01 },
      gridWaypoints: [
        { x: 1, y: 2.7, type: 'vertical' },
        {
          x: 1,
          y: 3,
          type: 'quadratic',
          controlPoint: { x: 1, y: 3 },
          curveEndPoint: { x: 1.35, y: 3 },
        },
        { x: 3.22, y: 3, type: 'horizontal' },
        { x: 3.5, y: 3, type: 'horizontal' },
        { x: 3.5, y: 4.68, type: 'vertical' },
        {
          x: 3.5,
          y: 5,
          type: 'quadratic',
          controlPoint: { x: 3.5, y: 5 },
          curveEndPoint: { x: 3.85, y: 5 },
        },
        { x: 6.01, y: 5.01, type: 'horizontal' },
      ],
    },
  ];

  return (
    <Section
      className="pt-5 sm:pt-10 md:pt-20 bg-background">
      <div className="absolute left-0 right-0 top-0 pointer-events-none z-10 overflow-hidden w-screen">
        <div className="relative w-full h-full overflow-hidden" style={{ minHeight: '500px' }}>
          <div
            className="absolute bg-gray-light-9 opacity-30 blur-[36.75px] w-366 h-33 left-144 top-7.5 -translate-x-1/2 rotate-[28.4742deg] origin-center rounded-full"
          />
        </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 px-4 sm:px-16 md:px-20 lg:px-6 xl:px-8 gap-4 sm:gap-5 w-full max-w-7xl items-stretch auto-rows-fr">
              <div className="flex flex-col gap-4 sm:gap-5 h-full">
                <div className="flex flex-col bg-gray-dark-1/70 rounded-3xl flex-1 min-h-[320px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-[480px] xl:min-h-[500px] p-1 border border-gray-dark-3 gap-2">
                  <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6 rounded-3xl gap-3 sm:gap-4 surface-gradient-with-noise relative min-h-0">
                    <div className="flex flex-row gap-3 sm:gap-4 items-center justify-start relative z-10 shrink-0">
                      <div className="flex w-14 h-14 sm:w-16 sm:h-16 md:w-17.5 md:h-17.5 items-center justify-center rounded-full border border-gray-light-6 bg-background shrink-0">
                        <FiZap size={20} color="gray-light-1" className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex flex-col gap-1 sm:gap-2 flex-1 min-w-0">
                        <Heading
                          variant="h6"
                          as="h3"
                          align="left"
                          weight="semibold"
                          scale="compact"
                          className="text-gray-light-1 font-medium text-sm sm:text-base"
                          children="AI + No-Code Prototyping"
                          subtitle="Build, test, and iterate at lightning speed with AI-powered no-code solutions."
                          subtitleAs="p"
                          subtitleClassName="text-xs font-normal text-gray-light-5"
                        />
                      </div>
                    </div>
                    <div className="relative w-full flex-1 min-h-[200px] sm:min-h-[220px] md:min-h-[240px] overflow-hidden rounded-2xl">
                      <div className="grid grid-cols-7 grid-rows-6 gap-0 w-full h-full">
                        {Array.from({ length: 42 }).map((_, index) => (
                          <div
                            key={index}
                            className="border border-gray-dark-2"
                          />
                        ))}
                      </div>

                      <div className="absolute inset-0 pointer-events-none" style={{
                        '--grid-col-width': 'calc(100% / 7)',
                        '--grid-row-height': 'calc(100% / 6)',
                      } as React.CSSProperties}>
                        <ConnectionPaths 
                          paths={connectionPaths} 
                          gridCols={7} 
                          gridRows={6}
                          iconPositions={iconPositions}
                          onIconActiveChange={setActiveIcons}
                        />

                        <div
                          className="absolute z-20 pointer-events-auto"
                          style={{
                            left: 'calc(var(--grid-col-width) * 0 + var(--grid-col-width))',
                            top: 'calc(var(--grid-row-height) * 0 + var(--grid-row-height))',
                            transform: 'translate(-50%, -50%)',
                          }}
                        >
                          <Image
                            src="/hero-icons/Bulb.svg"
                            alt="Bulb"
                            width={48}
                            height={48}
                            className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain transition-all duration-300 hover:scale-125 icon-hover ${
                              activeIcons.has('bulb') ? 'scale-125' : ''
                            }`}
                            style={{
                              filter: activeIcons.has('bulb') 
                                ? 'brightness(0) saturate(100%) invert(84%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                                : 'none',
                            }}
                          />
                        </div>

                        <div
                          className="absolute border border-gray-dark-2 flex items-center justify-center rounded-full h-16 w-16 sm:h-18 sm:w-18 md:h-22 md:w-22 z-20"
                          style={{
                            left: 'calc(var(--grid-col-width) * 6 - var(--grid-col-width)*.5)',
                            top: 'calc(var(--grid-row-height) * 0 + var(--grid-row-height))',
                            transform: 'translate(-50%, -50%)',
                          }}
                        >
                          <motion.div 
                            className="absolute border border-gray-dark-4 rounded-full h-[85%] w-[85%]"
                            initial={{ scale: 0.6, opacity: 1 }}
                            animate={{ scale: 1.2, opacity: 0 }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              ease: 'easeOut',
                              delay: 0
                            }}
                          />
                          <motion.div 
                            className="absolute border border-gray-dark-4 rounded-full h-[75%] w-[75%]"
                            initial={{ scale: 0.6, opacity: 1 }}
                            animate={{ scale: 1.3, opacity: 0 }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              ease: 'easeOut',
                              delay: 0.4
                            }}
                          />
                          <motion.div 
                            className="absolute border border-gray-dark-4 rounded-full h-[60%] w-[60%]"
                            initial={{ scale: 0.6, opacity: 1 }}
                            animate={{ scale: 1.2, opacity: 0 }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              ease: 'easeOut',
                              delay: 0.8
                            }}
                          />
                            <Image
                              src="/hero-icons/Speedtest.svg"
                              alt="Speedtest"
                              width={22}
                              height={19}
                              className="w-4 h-3.5 sm:w-5 sm:h-4.5 md:w-5.5 md:h-5 object-contain"
                            />
                        </div>


                        <div
                          className={`group absolute flex items-center justify-center bg-gray-dark-2 rounded-lg h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 z-20 pointer-events-auto hover:bg-gray-dark-5 transition-all duration-300 ${
                            activeIcons.has('arcticons') ? 'bg-gray-dark-5' : ''
                          }`}
                          style={{
                            left: 'calc(var(--grid-col-width) * 3.5)',
                            top: 'calc(var(--grid-row-height) * 3)',
                            transform: 'translate(-50%, -50%)',
                          }}
                        >
                          <Image
                            src="/hero-icons/Arcticons.svg"
                            alt="Arcticons"
                            width={30}
                            height={16}
                            className={`w-6 h-3 sm:w-7 sm:h-4 md:w-7.5 md:h-4 object-contain transition-all duration-300 group-hover:scale-125 hover:scale-125 icon-hover ${
                              activeIcons.has('arcticons') ? 'scale-125' : ''
                            }`}
                            style={{
                              filter: activeIcons.has('arcticons') 
                                ? 'brightness(0) saturate(100%) invert(84%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                                : 'none',
                            }}
                          />
                        </div>

                        <div
                          className="absolute z-20 pointer-events-auto"
                          style={{
                            left: 'calc(var(--grid-col-width) * 6 + var(--grid-col-width) * 0.01)',
                            top: 'calc(var(--grid-row-height) * 5 + var(--grid-row-height) * 0.01)',
                            transform: 'translate(-50%, -50%)',
                          }}
                        >
                          <Image
                            src="/hero-icons/Developer.svg"
                            alt="Developer"
                            width={56}
                            height={56}
                            className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain transition-all duration-300 hover:scale-125 icon-hover ${
                              activeIcons.has('developer') ? 'scale-125' : ''
                            }`}
                            style={{
                              filter: activeIcons.has('developer') 
                                ? 'brightness(0) saturate(100%) invert(84%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                                : 'none',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row text-xs items-center justify-start font-normal text-gray-light-1 gap-3 sm:gap-4 rounded-3xl bg-gray-dark-2 p-4 sm:p-5 md:p-6 surface-gradient-with-noise relative">
                  <DotIcon />
                  <p className="flex-1">
                    Get your product to market faster, without the traditional delays.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:gap-5 h-full">
                <div className="flex flex-col bg-gray-dark-1/70 rounded-3xl flex-1 min-h-[320px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-[480px] xl:min-h-[500px] p-1 border border-gray-dark-3 gap-2">
                  <div className="flex flex-col justify-between flex-1 p-4 sm:p-5 md:p-6 rounded-3xl gap-3 sm:gap-4 surface-gradient-with-noise relative min-h-0">
                    <div className="flex flex-row gap-3 sm:gap-4 items-center justify-start relative z-10 shrink-0">
                      <div className="flex w-14 h-14 sm:w-16 sm:h-16 md:w-17.5 md:h-17.5 items-center justify-center rounded-full border border-gray-light-6 bg-background shrink-0">
                        <FiLayers size={20} color="gray-light-1" className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex flex-col gap-1 sm:gap-2 flex-1 min-w-0">
                        <Heading
                          variant="h6"
                          as="h3"
                          align="left"
                          weight="semibold"
                          scale="compact"
                          className="text-gray-light-1 font-medium text-sm sm:text-base"
                          children="Full-Stack Development"
                          subtitle="Seamless integration across front-end and back-end, built to scale."
                          subtitleAs="p"
                          subtitleClassName="text-xs font-normal text-gray-light-5"
                        />
                      </div>
                    </div>
                    <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
                      <Image
                        src="/hero-icons/full-stack-development.webp"
                        alt="Full Stack Development Animation"
                        width={250}
                        height={250}
                        className="w-full h-auto max-w-full object-contain rounded-2xl"
                        style={{ aspectRatio: '1 / 1' }}
                        priority
                      />
                    </div>
                    <div className="flex flex-row text-xs items-center justify-start font-normal text-gray-light-1 gap-3 sm:gap-4 rounded-3xl bg-gray-dark-2 p-4 sm:p-5 md:p-6 relative shadow-[0_4px_4px_0_rgba(0,0,0,0.05)] shrink-0">
                      <DotIcon />
                      <p className="flex-1">
                        Custom solutions that grow with your business.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:gap-5 h-full">
                <div className="flex flex-row text-xs items-center justify-start font-normal text-gray-light-1 gap-3 sm:gap-4 rounded-3xl bg-gray-dark-2 p-4 sm:p-5 md:p-6 surface-gradient-with-noise relative">
                  <DotIcon />
                  <p className="flex-1">
                    Brand and product consulting that aligns with your business goals.
                  </p>
                </div>
                <div className="flex flex-col bg-gray-dark-1/70 rounded-3xl flex-1 min-h-[320px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-[480px] xl:min-h-[500px] p-1 border border-gray-dark-3 gap-2">
                  <div className="flex flex-col flex-1 bg-[#020202] p-4 sm:p-5 md:p-6 rounded-3xl gap-3 sm:gap-4 min-h-0">
                    <div className="flex flex-row gap-3 sm:gap-4 items-center justify-start shrink-0">
                      <div className="flex w-14 h-14 sm:w-16 sm:h-16 md:w-17.5 md:h-17.5 items-center justify-center rounded-full border border-gray-light-6 bg-background shrink-0">
                        <Image src="/hero-icons/Target.svg" alt="Target" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex flex-col gap-1 sm:gap-2 flex-1 min-w-0">
                        <Heading
                          variant="h6"
                          as="h3"
                          align="left"
                          weight="semibold"
                          scale="compact"
                          className="text-gray-light-1 font-medium text-sm sm:text-base"
                          children="Strategy-Driven Consulting"
                          subtitle="Position your product for long-term success with a strategy that works."
                          subtitleAs="p"
                          subtitleClassName="text-xs font-normal text-gray-light-5"
                        />
                      </div>
                    </div>
                    <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
                      <Image
                        src="/hero-icons/strategy-driven-consulting.webp"
                        alt="Strategy Driven Consulting Animation"
                        width={250}
                        height={250}
                        className="w-full h-auto max-w-full object-contain rounded-2xl"
                        style={{ aspectRatio: '1 / 1' }}
                        priority
                      />
                    </div>
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

          <div className="flex flex-col gap-12 w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 items-center justify-center">
            <div className="flex border-t-diamond-gradient border-b-diamond-gradient w-full items-center justify-center py-2">
              <p className="text-xs sm:text-sm text-gray-light-4 text-center max-w-2xl">
                Trusted by innovators, startups, and enterprises to deliver scalable,
                AI-powered solutions.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 w-full border-t-diamond-gradient">
              <div className="flex flex-col items-center gap-2 text-gray-light-4 border-b-diamond-gradient border-r-diamond-gradient no-md-bottom-diamond-gradient px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 text-xs sm:text-sm">
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
              <div className="flex flex-col items-center gap-2 text-gray-light-4 border-b-diamond-gradient no-md-bottom-diamond-gradient md-border-r-diamond-gradient px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 text-xs sm:text-sm">
                <div className="h-25 w-25 rounded-full bg-gray-dark-1 border border-gray-dark-3 flex items-center justify-center overflow-hidden">
                  <div className="flex flex-col items-center justify-center font-bold gap-2">
                    <h5 className="text-2xl leading-none">50+</h5>
                    <span className="text-sm font-medium leading-none">Reviews</span>
                  </div>
                </div>
                <div className="flex justify-center flex-row py-1 px-2 h-8 items-center gap-2.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Image key={index} src="/hero-icons/Star.svg" alt="Star" width={24} height={24} className="object-contain" />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 text-gray-light-4 border-r-diamond-gradient px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 text-xs sm:text-sm">
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
              <div className="flex flex-col items-center gap-2 text-gray-light-4 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 text-xs sm:text-sm">
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
