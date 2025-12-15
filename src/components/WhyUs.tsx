'use client';

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { MovingBorderContainer } from '@/components/ui/MovingBorder';
import { motion } from 'motion/react';
import { FiCode, FiTarget, FiZap } from 'react-icons/fi';

export default function WhyUs() {
  const features = [
    {
      icon: FiTarget,
      title: 'Validate Before Build',
      description: 'We validate product-market fit through market research and user testing before writing code.',
    },
    {
      icon: FiCode,
      title: 'Design for Conversion',
      description: 'Every design decision is data-driven to maximize engagement and revenue.',
    },
    {
      icon: FiZap,
      title: 'Build to Scale',
      description: 'We architect systems that grow with you from startup to enterprise.',
    },
  ];


  return (
    <Section
      title="More Than Code"
      subtitle="We don't just build what you ask for. We own the outcome and act as your technical co-founder."
      headingVariant="h2"
      headingWeight="bold"
      headingAlign="center"
      className="bg-background"
      id="why-us"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 sm:gap-12">
        {/* Main Premium Card */}
        <MovingBorderContainer
          borderRadius="1.5rem"
          duration={22000}
          innerClassName="bg-surface-gradient p-6 sm:p-8 md:p-10 lg:p-12 flex gap-6 sm:gap-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 sm:gap-8"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-light-1 leading-relaxed text-center font-medium max-w-4xl mx-auto">
              We challenge assumptions, optimize for conversion, and architect for scale. Your success is our responsibility.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-2">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="border-gradient rounded-xl"
                  >
                    <motion.div
                      className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-6 rounded-lg bg-gray-dark-2 cursor-pointer m-1"
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      <div className="flex w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 items-center justify-center rounded-full border border-gray-light-6 bg-background shrink-0">
                        <IconComponent size={20} color="gray-light-1" className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Heading
                          variant="h6"
                          as="h4"
                          align="left"
                          weight="semibold"
                          className="text-gray-light-1"
                        >
                          {feature.title}
                        </Heading>
                        <p className="text-sm sm:text-base text-gray-light-4 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </MovingBorderContainer>
      </div>
    </Section>
  );
}
