'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { FaAngleRight } from 'react-icons/fa';
import Image from 'next/image';

export default function InnovativeSolutions() {
  const noCodeFeatures = [
    {
      text: 'Rapid Prototyping & MVPs',
      top: 'top-12.5',
      left: 'left-9',
    },
    {
      text: 'Scalable No-Code App Solutions',
      top: 'top-12.5',
      left: 'left-92',
    },
    {
      text: 'AI-Driven Automation & Workflows',
      top: 'top-34',
      left: 'left-9',
    },
    {
      text: 'Low-Code Deployment for Speed',
      top: 'top-34',
      left: 'left-92',
    },
    {
      text: 'Seamless Database & Backend Integrations',
      top: 'top-55',
      left: 'left-9',
    },
    {
      text: 'Custom AI Chatbots & Automations',
      top: 'top-55',
      left: 'left-92',
    },
  ];

  // Animation path for the cursor icon:
  const animationSequence = [2, 1, 5, 2];

  const [activeFeatureIndex, setActiveFeatureIndex] = useState(animationSequence[0]);

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
      headingWeight="bold"
      headingAlign="center"
      className="bg-background"
    >
      <div className="w-full flex flex-col">
        {/* End-to-End Full-Stack Development Section */}
        <div className="w-full flex flex-col py-12 gap-6 sm:gap-8">
            <Heading
              variant="h4"
              as="h2"
              align="left"
              weight="bold"
              className="text-gray-light-1"
              subtitle="Our expert team builds custom, fully integrated websites that drive engagement and growth. 
              Whether it's e-commerce, SaaS, or custom solutions, we ensure your site is optimized for 
              performance, security, and scalability."
              subtitleAs='p'
              subtitleClassName="text-base sm:text-lg text-gray-light-5 font-normal leading-relaxed max-w-4xl"
              children="End-to-End Full-Stack Development"
            />
          
          {/* Web Application Screenshot Placeholder */}
          <div className="relative w-7xl h-182 overflow-hidden">
            <div className="absolute z-20 w-7xl h-182 rounded-3xl overflow-hidden bg-linear-to-b from-[#000000]/0 to-[#08090A]"></div>
            <Image src="/innovative-solutions/bg-style-left.png" alt="Background Style" width={1000} height={1000} className="object-cover w-full h-full opacity-10" />
            <div className="w-full h-full overflow-hidden -top-[.33px]">
              <div 
                  className="absolute z-13 w-50 h-107 top-76 left-259 -rotate-z-10"
                >
                  <Image src="/innovative-solutions/IS-3.png" alt="Web Application Screenshot" width={200} height={428} className="object-cover" />
              </div>
              <div 
                  className="absolute z-14 w-38 h-87 top-18 left-267 -rotate-z-10"
                >
                  <Image src="/innovative-solutions/IS-4.png" alt="Web Application Screenshot" width={152} height={350} className="object-cover" />
              </div>
              <div className="absolute z-12 w-339 h-full top-[.33px]">
                <div 
                  className="absolute z-10 w-185 h-150 top-6 -left-5 -rotate-z-10"
                >
                  <Image src="/innovative-solutions/IS-1.png" alt="Web Application Screenshot" width={740} height={602} className="object-cover" />
                </div>
                <div 
                  className="absolute z-11 w-185 h-138 top-37 left-94 -rotate-z-10"
                >
                  <Image src="/innovative-solutions/IS-2.png" alt="Web Application Screenshot" width={740} height={553} className="object-cover" />
                </div>
              </div>
            </div>
          </div>
          </div>
          <Button
            variant="primary"
            href="/get-quote"
            className="w-fit"
            rightImage={<FaAngleRight size={16} />}
          >
            Build Your Digital Presence
          </Button>
        </div>

        {/* Two Column Layout for No-Code and Mobile Apps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 z-0 border-y border-gray-dark-4">
          {/* Build Faster with AI-Powered No-Code Solutions */}
          <div className="flex flex-col gap-6 sm:gap-8 py-12 pr-12 hover:icon-hover">
            <div className="flex flex-col gap-4 sm:gap-6">
              <Heading
                variant="h4"
                as="h2"
                align="left"
                weight="bold"
                className="text-gray-light-1"
                subtitle="Bring your ideas to life with rapid prototyping and MVP development powered by AI and no-code tools. Save time and costs with automation, seamless database integrations, and scalable solutions – all with zero code required."
                subtitleAs="p"
                subtitleClassName="text-sm sm:text-base text-gray-light-3 leading-relaxed"
              >
                Build Faster with AI-Powered No-Code Solutions
              </Heading>
            </div>
            
            {/* Feature Buttons Grid */}
            <div className="relative grid grid-cols-2 grid-rows-3 gap-x-17 gap-y-13 p-10 rounded-3xl h-76 w-2xl overflow-hidden gap-4">
              {/* Background image with rounded corners clipped by parent */}
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
                    className={`absolute z-10 h-10 whitespace-nowrap w-fit text-xs font-medium leading-5 text-gray-light-1 ${feature.top} ${feature.left} py-3 px-4 rounded-lg bg-[#D1D1D1]/10 hover:shadow-[0_0_14px_0_rgba(249,249,249,0.25)] transition-shadow duration-300 ${isActive ? 'shadow-[0_0_14px_0_rgba(249,249,249,0.25)]' : ''}`}
                  >
                    {feature.text}

                    {isActive && (
                      <motion.div
                        layoutId="no-code-cursor"
                        className="pointer-events-none absolute top-5 -right-8 z-50"
                        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
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
              variant="primary"
              href="/get-quote"
              className="w-fit"
              rightImage={<FaAngleRight size={16} />}
            >
              Start Building with AI
            </Button>
          </div>

          {/* Cross-Platform Mobile Apps That Scale */}
          <div className="flex flex-col md:border-l md:border-gray-dark-4 gap-6 sm:gap-8 py-12 pl-12">
            <div className="flex flex-col gap-4 sm:gap-6 pr-20">
              <Heading
                variant="h4"
                as="h2"
                align="left"
                weight="bold"
                className="text-gray-light-1"
                subtitle="Bring your mobile app ideas to life with our cross-platform development expertise. From design to deployment, we ensure your app is intuitive, scalable, and optimized for both iOS and Android devices."
                subtitleAs="p"
                subtitleClassName="text-sm sm:text-base text-gray-light-3 leading-relaxed"
              >
                Cross-Platform Mobile Apps That Scale
              </Heading>
            </div>
            
            {/* Mobile App Screenshot */}
            <div className="relative w-2xl h-76 rounded-3xl overflow-hidden lg:mx-0">
              {/* Background pattern behind the phone */}
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

              {/* Phone screenshot centered inside the card */}
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
              variant="primary"
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

