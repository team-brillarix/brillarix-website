'use client';

import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { FiLayers, FiZap} from 'react-icons/fi';

export default function Hero() {
  return (
    <Section
      className="pt-5 sm:pt-10 md:pt-20 bg-background hero-hex-bg"
    >
      <div className="w-full flex flex-col items-center gap-6 pb-12 sm:gap-10 md:gap-12">
        {/* Hero section with hexagonal background */}
        <div className="flex flex-col items-center justify-center w-full gap-15">
          <Heading
            variant="h1"
            align="center"
            weight="medium"
            subtitle="Brillarix blends cutting-edge AI, no-code platforms, and full-stack development to bring your product vision to life faster than traditional teams."
          >
            Skip the delays. Our AI-driven team designs
            <br className="hidden md:inline" />
            &amp; builds at startup speed.
          </Heading>
          
          {/* Service cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 px-15 sm:px-25 md:px-35 gap-5">
            <div className="flex flex-col gap-5 h-full">
              <div className="flex flex-col bg-gray-dark-1/70 rounded-3xl h-120 p-1 border border-gray-dark-3 gap-2">
                <div className='flex flex-col h-118 p-6 rounded-3xl gap-4 surface-gradient-with-noise relative'>
                    <div className='flex flex-row gap-4 items-center justify-start relative z-10'>
                        <div className='flex w-17.5 h-17.5 items-center justify-center rounded-full border border-gray-light-6 bg-background'>
                            <FiZap size={20} color='gray-light-1' />
                        </div>
                        <div className='flex flex-col gap-2 w-50'>
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
                </div>
              </div>
                <div className="flex flex-row text-xs items-center justify-start font-normal h-20 text-gray-light-1 gap-4 rounded-3xl bg-gray-dark-2 p-6 surface-gradient-with-noise relative">
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
                    <p>
                        Get your product to market faster, without the traditional delays.
                    </p>
              </div>
            </div>
            <div className="flex flex-col gap-5 h-full">
              <div className="flex flex-row text-xs h-20 items-center justify-start font-normal text-gray-light-1 gap-4 rounded-3xl bg-gray-dark-2 p-6 surface-gradient-with-noise relative">
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
                <p>
                    Custom solutions that grow with your business.
                </p>
            </div>
              <div className="flex flex-col bg-gray-dark-1/70 rounded-3xl h-120 p-1 border border-gray-dark-3 gap-2">
                <div className='flex flex-col justify-between h-118 p-6 rounded-3xl gap-4 surface-gradient-with-noise relative'>
                    <div className='flex flex-row gap-4 items-center justify-start relative z-10'>
                        <div className='flex w-17.5 h-17.5 items-center justify-center rounded-full border border-gray-light-6 bg-background'>
                            <FiLayers size={20} color='gray-light-1' />
                        </div>
                        <div className='flex flex-col gap-2 w-50'>
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
                      src="/hero-icons/full-stack-development.gif" 
                      alt="Full Stack Development Animation" 
                      width={250} 
                      height={250}
                      className="w-full rounded-2xl object-contain"
                      priority
                      unoptimized
                    />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 h-full">
              <div className="flex flex-col bg-gray-dark-1/70 rounded-3xl h-120 p-1 border border-gray-dark-3 gap-2">
                <div className='flex flex-col bg-[#020202] h-118 p-6 rounded-3xl gap-4'>
                    <div className='flex flex-row gap-4 items-center justify-start'>
                        <div className='flex w-17.5 h-17.5 items-center justify-center rounded-full border border-gray-light-6 bg-background'>
                            <Image src="/hero-icons/Target.svg" alt="Target" width={20} height={20} />
                        </div>
                        <div className='flex flex-col gap-2 w-50'>
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
                      src="/hero-icons/strategy-driven-consulting.gif" 
                      alt="Strategy Driven Consulting Animation" 
                      width={250} 
                      height={250}
                      className="w-full rounded-2xl object-contain"
                      priority
                      unoptimized
                    />
                </div>
              </div>
              <div className="flex flex-row text-xs items-center h-20 justify-start font-normal text-gray-light-1 gap-4 rounded-3xl bg-gray-dark-2 p-6 surface-gradient-with-noise relative">
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
                    <p>
                        Brand and product consulting that aligns with your business goals.
                    </p>
              </div>
            </div>
        </div>
        </div>

        {/* Primary actions */}
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
            <div className="flex border-y w-full items-center justify-center border-gray-dark-3 py-2">
                <p className="text-xs sm:text-sm text-gray-light-4 text-center max-w-2xl">
                    Trusted by innovators, startups, and enterprises to deliver scalable,
                    AI-powered solutions.
                </p>
            </div>

            <div className="grid grid-cols-4 w-190 border-t border-gray-dark-3">
                <div className="flex flex-col items-center gap-2 text-gray-light-4 border-r border-gray-dark-3 px-12 py-8 text-xs sm:text-sm">
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
                <div className="flex flex-col items-center gap-2 text-gray-light-4 border-r border-gray-dark-3 px-12 py-8 text-xs sm:text-sm">
                    <div className="h-25 w-25 rounded-full bg-gray-dark-1 border border-gray-dark-3 flex items-center justify-center overflow-hidden">
                        <Heading variant="h5" weight="bold" children="50+" subtitle="Reviews" subtitleClassName="text-sm font-medium" />
                    </div>
                    <div className="flex justify-center flex-row py-1 px-2 h-8 items-center gap-2.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Image key={index} src="/hero-icons/Star.svg" alt="Star" width={24} height={24} className="object-contain" />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2 text-gray-light-4 border-r border-gray-dark-3 px-12 py-8 text-xs sm:text-sm">
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
    </Section>
  );
}


