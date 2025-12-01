'use client';

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';

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
      headingVariant="h1"
      headingWeight="medium"
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
              weight="semibold"
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
          >
            Build Your Digital Presence &gt;
          </Button>
        </div>

        {/* Two Column Layout for No-Code and Mobile Apps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20">
          {/* Build Faster with AI-Powered No-Code Solutions */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col gap-4 sm:gap-6">
              <Heading
                variant="h3"
                as="h2"
                align="left"
                weight="semibold"
                className="text-gray-light-1"
              >
                Build Faster with AI-Powered No-Code Solutions
              </Heading>
              <p className="text-base sm:text-lg text-gray-light-3 leading-relaxed">
                Bring your ideas to life with rapid prototyping and MVP development powered by AI and 
                no-code tools. Save time and costs with automation, seamless database integrations, and 
                scalable solutions – all with zero code required.
              </p>
            </div>
            
            {/* Feature Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {noCodeFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-dark-2 border border-gray-dark-3 rounded-lg px-4 py-3 text-sm text-gray-light-1 hover:bg-gray-dark-3 transition-colors cursor-pointer"
                >
                  {feature}
                </div>
              ))}
            </div>
            
            <Button
              variant="primary"
              href="/get-quote"
              className="w-fit"
            >
              Start Building with AI &gt;
            </Button>
          </div>

          {/* Cross-Platform Mobile Apps That Scale */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col gap-4 sm:gap-6">
              <Heading
                variant="h3"
                as="h2"
                align="left"
                weight="semibold"
                className="text-gray-light-1"
              >
                Cross-Platform Mobile Apps That Scale
              </Heading>
              <p className="text-base sm:text-lg text-gray-light-3 leading-relaxed">
                Bring your mobile app ideas to life with our cross-platform development expertise. 
                From design to deployment, we ensure your app is intuitive, scalable, and optimized 
                for both iOS and Android devices.
              </p>
            </div>
            
            {/* Mobile App Screenshot Placeholder */}
            <div className="relative w-full max-w-xs mx-auto lg:mx-0">
              <div 
                className="aspect-9/19 bg-gray-dark-1 border border-gray-dark-3 rounded-[2.5rem] p-2"
                style={{ transform: 'rotate(3deg)' }}
              >
                <div className="w-full h-full bg-gray-dark-2 rounded-4xl flex items-center justify-center">
                  <div className="text-gray-light-5 text-sm text-center px-4">Mobile App Screenshot</div>
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

