'use client';

import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { MovingBorderContainer } from '@/components/ui/MovingBorder';
import { FiArrowRight, FiLayers, FiZap} from 'react-icons/fi';

const trustLogos = [
  {
    name: 'Bubble',
    src: '/tech-icons/Bubble.svg',
  },
  {
    name: 'Upwork',
    src: '/logos/Logo-White-Mode.png',
  },
  {
    name: 'Clutch',
    src: '/logos/Logo-White-Mode.png',
  },
];

export default function Hero() {
  return (
    <Section
      headingVariant="h1"
      headingWeight="medium"
      headingAlign="center"
      title={
        <>
          Skip the delays. Our AI-driven team designs
          <br className="hidden md:inline" />
          &amp; builds at startup speed.
        </>
      }
      subtitle="Brillarix blends cutting-edge AI, no-code platforms, and full-stack development to bring your product vision to life faster than traditional teams."
      className="pt-5 sm:pt-10 md:pt-20"
    >
      <div className="w-full flex flex-col gap-6 pb-12 sm:gap-10 md:gap-12">
        {/* Service cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 px-15 sm:px-25 md:px-35 gap-5">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col bg-gray-dark-1/70 rounded-3xl h-111 p-1 border border-gray-dark-3 gap-2">
                <div className='flex flex-col h-109 p-6 rounded-3xl gap-4'>
                    <div className='flex flex-row gap-4 items-center justify-start'>
                        <div className='flex w-17.5 h-17.5 items-center justify-center rounded-full border border-gray-light-6 bg-background'>
                            <FiZap size={20} color='gray-light-1' />
                        </div>
                        <div className='flex flex-col gap-2 w-58'>
                            <Heading
                            variant="h6"
                            as="h3"
                            align="left"
                            weight="semibold"
                            scale="compact"
                            className="text-gray-light-1 font-medium text-base"
                            children="AI + No-Code Prototyping"
                            subtitle="Build, test, and iterate at lightning speed with AI-powered no-code solutions."
                            subtitleAs="p"
                            subtitleClassName="text-xs font-normal text-gray-light-5"
                            />
                        </div>
                    </div>
                </div>
              </div>
                <div className="flex flex-row text-xs items-center justify-start font-normal text-gray-light-1 gap-4 rounded-3xl bg-gray-dark-2 p-6">
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
            <div className="flex flex-col gap-5">
              <div className="flex flex-col bg-gray-dark-1/70 rounded-3xl h-136 p-1 border border-gray-dark-3 gap-2">
                <div className='flex flex-col justify-between h-136 p-6 rounded-3xl gap-4'>
                    <div className='flex flex-row gap-4 items-center justify-start'>
                        <div className='flex w-17.5 h-17.5 items-center justify-center rounded-full border border-gray-light-6 bg-background'>
                            <FiLayers size={20} color='gray-light-1' />
                        </div>
                        <div className='flex flex-col gap-2 w-58'>
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
                    <div className="flex flex-row text-xs items-center justify-start font-normal text-gray-light-1 gap-4 rounded-3xl bg-gray-dark-2 p-6">
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
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-row text-xs items-center justify-start font-normal text-gray-light-1 gap-4 rounded-3xl bg-gray-dark-2 p-6">
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
              <div className="flex flex-col bg-gray-dark-1/70 rounded-3xl h-111 p-1 border border-gray-dark-3 gap-2">
                <div className='flex flex-col h-109 p-6 rounded-3xl gap-4'>
                    <div className='flex flex-row gap-4 items-center justify-start'>
                        <div className='flex w-17.5 h-17.5 items-center justify-center rounded-full border border-gray-light-6 bg-background'>
                            <Image src="/hero-icons/Target.svg" alt="Target" width={20} height={20} />
                        </div>
                        <div className='flex flex-col gap-2 w-58'>
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
                </div>
              </div>
            </div>
        </div>

        {/* Primary actions */}
        <div className="flex flex-col items-center gap-4 sm:gap-5">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              size="lg"
              variant="primary"
              rightImage={<FiArrowRight className="w-4 h-4" />}
              href="/get-quote"
            >
              Start Your Project
            </Button>
            <Button
              size="lg"
              variant="secondary"
              rightImage={<FiArrowRight className="w-4 h-4" />}
              href="#process"
            >
              See Our Process
            </Button>
          </div>

          <p className="text-xs sm:text-sm text-gray-light-4 text-center max-w-2xl">
            Trusted by innovators, startups, and enterprises to deliver scalable,
            AI-powered solutions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 pt-1">
            {trustLogos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center gap-2 text-gray-light-4 text-xs sm:text-sm"
              >
                <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gray-dark-4 flex items-center justify-center overflow-hidden">
                  <Image
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    width={32}
                    height={32}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <span className="whitespace-nowrap">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}


