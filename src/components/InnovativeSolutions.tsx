'use client';

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { FaAngleRight } from 'react-icons/fa';
import Image from 'next/image';

export default function InnovativeSolutions() {
  const noCodeFeatures = [
    'Rapid Prototyping & MVPs',
    'Scalable No-Code App Solutions',
    'AI-Driven Automation & Workflows',
    'Low-Code Deployment for Speed',
    'Seamless Database & Backend Integrations',
    'Custom AI Chatbots & Automations',
  ];

  return (
    <Section
      title="Innovative Solutions Tailored to Your Needs"
      subtitle="Empowering Your Business with AI, No-Code, and Full-Stack Development."
      headingVariant="h2"
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
            className="text-gray-light-1"
            subtitle="Our expert team builds custom, fully integrated websites that drive engagement and growth. 
              Whether it's e-commerce, SaaS, or custom solutions, we ensure your site is optimized for 
              performance, security, and scalability."
            subtitleAs='p'
            subtitleClassName="text-base sm:text-lg text-gray-light-5 font-normal leading-relaxed max-w-4xl"
            children="End-to-End Full-Stack Development"
          />

          {/* Web Application Screenshot Placeholder */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-gray-dark-1 border border-gray-dark-3">
            <div
              className="aspect-video bg-gray-dark-2 flex items-center justify-center"
              style={{ transform: 'rotate(-2deg) scale(1.05)' }}
            >
              <div className="text-gray-light-5 text-sm">Web Application Screenshot</div>
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
          <div className="flex flex-col gap-6 sm:gap-8 py-12 pr-12">
            <div className="flex flex-col gap-4 sm:gap-6">
              <Heading
                variant="h4"
                as="h2"
                align="left"
                className="text-gray-light-1"
                subtitle="Bring your ideas to life with rapid prototyping and MVP development powered by AI and no-code tools. Save time and costs with automation, seamless database integrations, and scalable solutions – all with zero code required."
                subtitleAs="p"
                subtitleClassName="text-sm sm:text-base text-gray-light-3 leading-relaxed"
              >
                Build Faster with AI-Powered No-Code Solutions
              </Heading>
            </div>

            {/* Feature Buttons Grid */}
            <div className="relative grid grid-cols-2 grid-rows-3 gap-x-17 gap-y-13 p-10 rounded-3xl overflow-hidden gap-4">
              {/* Background image with rounded corners clipped by parent */}
              <div className="absolute inset-0 -z-10">
                <Image
                  src="/innovative-solutions/bg-style-left.png"
                  alt="background style left"
                  height={1000}
                  width={1000}
                  priority
                  className="object-cover w-full h-full"
                />
              </div>
              {noCodeFeatures.map((feature, index) => (
                <Button key={index} className="whitespace-nowrap text-xs">
                  {feature}
                </Button>
              ))}
              <div>
                <Image src="/innovative-solutions/cursor-icon.svg" alt="background style left" height={30} width={30} priority className="absolute z-50 top-43 left-66 object-cover" />
              </div>
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
          <div className="flex flex-col gap-6 sm:gap-8 py-12 pl-12">
            <div className="flex flex-col gap-4 sm:gap-6">
              <Heading
                variant="h4"
                as="h2"
                align="left"
                weight="semibold"
                className="text-gray-light-1"
                subtitle="Bring your mobile app ideas to life with our cross-platform development expertise. From design to deployment, we ensure your app is intuitive, scalable, and optimized for both iOS and Android devices."
                subtitleAs="p"
                subtitleClassName="text-sm sm:text-base text-gray-light-3 leading-relaxed"
              >
                Cross-Platform Mobile Apps That Scale chv jhvjh hjhbjhb
              </Heading>
            </div>

            {/* Mobile App Screenshot */}
            <div className="relative w-full rounded-3xl h-80.5 overflow-hidden lg:mx-0">
              {/* Background pattern behind the phone */}
              <div className="absolute inset-0 -z-10">
                <Image
                  src="/innovative-solutions/bg-style-left.png"
                  alt="background style right"
                  height={1000}
                  width={1000}
                  priority
                  unoptimized
                  className="w-full h-full object-cover"
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
            >
              Launch Your App &gt;
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

