'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { MovingBorderContainer } from '@/components/ui/MovingBorder';
import { techStackData } from '@/constants/techStack';

export default function TechStack() {
  return (
    <Section
      title="Cutting-Edge Technologies for Scalable Solutions"
      subtitle="We use the latest AI, no-code, and full-stack tools to deliver efficient, scalable results."
      headingVariant="h2"
      headingWeight="semibold"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        {techStackData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="flex flex-col gap-4 sm:gap-5 md:gap-6">
            <Heading
              variant="h6"
              as="h6"
              align="center"
              weight="semibold"
            >
              {category.title}
            </Heading>

            <MovingBorderContainer
              borderRadius="1.5rem"
              duration={categoryIndex === 0 ? 6000 : categoryIndex === 1 ? 8000 : 10000}
              blobClassName="h-20 w-20 bg-gray-dark-7"
              innerClassName="grid grid-cols-3 gap-6 bg-gray-dark-1 p-5 sm:p-6 md:p-8"
            >
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="border-gradient rounded-lg w-20 h-20 mt-[0.7]"
                >
                  <motion.div
                    className="flex flex-col items-center justify-center gap-1 rounded-lg bg-gray-dark-2 p-2 cursor-pointer"
                    whileHover={{ margin: '4px' }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <Image
                      src={item.image}
                      alt={`${item.name} logo`}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain"
                    />
                    <p className="text-xs text-gray-light-3 text-center leading-tight">
                      {item.name}
                    </p>
                  </motion.div>
                </div>
              ))}
            </MovingBorderContainer>
          </div>
        ))}
      </div>
    </Section>
  );
}
