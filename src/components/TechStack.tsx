'use client';

import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { MovingBorderContainer } from '@/components/ui/MovingBorder';

interface TechItem {
  name: string;
  image: string;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

interface TechStackProps {
  categories: TechCategory[];
  title?: string;
  subtitle?: string;
}

export default function TechStack({
  categories,
  title = "Cutting-Edge Technologies for Scalable Solutions",
  subtitle = "We use the latest AI, no-code, and full-stack tools to deliver efficient, scalable results."
}: TechStackProps) {
  return (
    <Section
      title={title}
      subtitle={subtitle}
      headingVariant="h2"
      headingWeight="semibold"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        {categories.map((category, categoryIndex) => (
          <MovingBorderContainer
            key={categoryIndex}
            borderRadius="0.75rem"
            duration={8000}
            blobClassName="h-20 w-20 bg-gray-dark-7"
            innerClassName="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8 h-full w-full"
          >
            <div>
              <Heading
                variant="h6"
                as="h6"
                align="center"
                weight="semibold"
              >
                {category.title}
              </Heading>

              <div className="grid grid-cols-3 gap-4 sm:gap-5 md:gap-6 px-6 sm:px-8 pb-6 sm:pb-8">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex flex-col items-center gap-3 sm:gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-dark-4 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg p-2 sm:p-3">
                      <Image
                        src={item.image}
                        alt={`${item.name} logo`}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-gray-light-2 font-medium text-center">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </MovingBorderContainer>
        ))}
      </div>
    </Section>
  );
}
