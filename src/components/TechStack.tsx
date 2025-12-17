'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { MovingBorderContainer } from '@/components/ui/MovingBorder';
import { techStackData } from '@/constants/techStack';
import { FaTimes } from 'react-icons/fa';

export default function TechStack() {
  const borderDurations = [12000, 16000, 20000, 14000, 18000, 24000];
  const [selectedItem, setSelectedItem] = useState<{ categoryIndex: number; itemIndex: number } | null>(null);

  return (
    <Section
      title="Cutting-Edge Technologies for Scalable Solutions"
      subtitle="We use the latest AI, no-code, and full-stack tools to deliver efficient, scalable results."
      headingVariant="h2"
      headingWeight="bold"
      headingAlign="center"
      id="tools"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-12">
        {techStackData.map((category, categoryIndex) => {
          const isSelected = selectedItem?.categoryIndex === categoryIndex;
          const selectedItemData = isSelected && selectedItem ? category.items[selectedItem.itemIndex] : null;

          return (
            <div key={categoryIndex} className="flex flex-col gap-4 sm:gap-5 md:gap-6">
              <Heading
                variant="h6"
                as="h3"
                align="center"
                className='whitespace-nowrap overflow-hidden text-ellipsis flex-1 min-w-0 text-base'
                subtitle={category.description}
                subtitleClassName='text-gray-light-3 text-xs text-center'
              >
                {category.title}
              </Heading>
              <MovingBorderContainer
                borderRadius="1.5rem"
                duration={borderDurations[categoryIndex] || 10000}
                innerClassName="flex flex-col gap-4 sm:gap-5 md:gap-6 bg-gray-dark-1 p-5 sm:p-6 md:p-8 relative overflow-hidden"
              >
                <div className="grid grid-cols-3 gap-6 self-center">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="border-gradient rounded-lg w-22.5 h-22.5"
                  >
                    <motion.div
                      className="flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-dark-2 p-2 cursor-pointer h-full"
                      whileHover={{ margin: '4px' }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const isSameItem = selectedItem?.categoryIndex === categoryIndex && selectedItem?.itemIndex === itemIndex;
                        if (isSameItem) {
                          setSelectedItem(null);
                        } else {
                          setSelectedItem({ categoryIndex, itemIndex });
                        }
                      }}
                      tabIndex={0}
                    >
                      <Image
                        src={item.image}
                        alt={`${item.name} logo`}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-contain rounded-md"
                      />
                      <p className="text-xs text-gray-light-3 text-center leading-tight">
                        {item.name}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
              
              <AnimatePresence initial={false}>
                {isSelected && selectedItemData && (
                  <motion.div
                    key={`overlay-${categoryIndex}-${selectedItem.itemIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      opacity: { duration: 0.1, ease: 'easeInOut' }
                    }}
                    className="absolute inset-0 rounded-3xl bg-gray-dark-1/50 backdrop-blur-lg z-10 flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 p-5 sm:p-6 md:p-8 pointer-events-auto"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(null);
                      }}
                      className="absolute top-4 right-4 w-5 h-5 flex items-center justify-center rounded-full bg-gray-dark-2 hover:bg-gray-dark-3 text-gray-light-3 hover:text-gray-light-1 transition-colors duration-200 z-20"
                      aria-label="Close overlay"
                    >
                      <FaTimes className="w-3 h-3 cursor-pointer" />
                    </button>
                    <div className="flex flex-col items-center justify-center gap-5 md:gap-6">
                      <Image
                        src={selectedItemData.image}
                        alt={`${selectedItemData.name} logo`}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain rounded-md"
                      />
                      <Heading variant="h5" as="h4" align="center" className='text-gray-light-1' subtitle={selectedItemData.description} subtitleClassName='text-gray-light-3 text-xs md:text-sm text-center'>
                        {selectedItemData.name}
                      </Heading>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </MovingBorderContainer>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
