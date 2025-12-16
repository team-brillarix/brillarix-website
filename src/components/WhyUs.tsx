'use client';

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { MovingBorderContainer } from '@/components/ui/MovingBorder';
import { motion } from 'motion/react';
import { whyUsData } from '@/constants/whyUs';

export default function WhyUs() {
  const features = whyUsData;

  return (
    <Section
      title="More Than Code"
      subtitle="We don't just build what you ask for. We own the outcome and act as your technical co-founder."
      headingVariant="h2"
      headingWeight="bold"
      headingAlign="center"
      className="spotlight-bg relative overflow-hidden why-us-grid-bg"
      id="why-us"
      contentClassName="relative z-10"
    >

      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 sm:gap-12 relative z-10">
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
            <Heading
              variant="h5"
              as="h2"
              align="center"
              children="We Take Ownership Beyond Execution"
              className="text-gray-light-1 leading-relaxed max-w-4xl mx-auto"
              subtitle="From challenging assumptions to optimizing conversion and architecting scalable systems, ownership is built into everything we do."
            />

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
                      <div className="flex w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 items-center justify-center rounded-full border border-gray-light-9 bg-gray-dark-1 shrink-0">
                        <IconComponent size={20} className="w-5 h-5 sm:w-6 sm:h-6 text-gray-light-4" />
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
