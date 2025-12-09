'use client';

import { ProcessStep as ProcessStepType } from '@/types/process';
import Image from 'next/image';
import { Heading } from '@/components/ui/Heading';
import { motion } from 'motion/react';

interface ProcessStepProps {
    step: ProcessStepType;
}

export function ProcessStep({ step }: ProcessStepProps) {
    const iconPath = `/process/${step.id}.svg`;

    return (
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 lg:gap-8 w-full min-h-56 py-4 md:py-0">
            <div className="shrink-0 bg-gray-dark-1 w-full md:w-auto md:self-stretch flex flex-col items-center justify-center gap-1 py-3 md:py-2 px-4 md:px-6 -m-px rounded-lg md:rounded-none">
                <p className="text-gray-light-3 text-xs">Time Saved</p>
                <p className="text-base md:text-lg lg:text-xl font-semibold text-gray-light-1">
                    {step.timeSaved}
                </p>
            </div>

            <div className="shrink-0 border-gradient rounded-3xl w-16 h-16 md:w-28 md:h-28 lg:w-34 lg:h-34 self-center">
                <motion.div
                    className="flex items-center justify-center rounded-3xl bg-[linear-gradient(180deg,#1D1D1D_0%,#0D0D0D_100%)] relative overflow-hidden cursor-pointer h-full w-full"
                    whileHover={{ margin: '4px' }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                    <Image
                        src={iconPath}
                        alt={step.title}
                        fill
                        className='object-contain'
                    />
                </motion.div>
            </div>

            <div className="shrink-0 w-full md:w-48 lg:w-64 flex flex-col gap-1 px-2 md:px-0">
                <Heading
                    variant="h5"
                    as="h3"
                    align="left"
                >
                    {step.title}
                </Heading>
                <p className="text-xs sm:text-sm md:text-base text-gray-light-3">
                    ({step.subtitle})
                </p>
            </div>

            <div className="flex-1 flex flex-col gap-2 md:gap-3 min-w-0 w-full md:w-auto px-2 md:px-0">
                <Heading
                    variant="h6"
                    as="h4"
                    align="left"
                >
                    {step.descriptionTitle}
                </Heading>
                <p className="text-xs sm:text-sm md:text-base text-gray-light-5 leading-relaxed">
                    {step.description}
                </p>
            </div>
        </div>
    );
}

