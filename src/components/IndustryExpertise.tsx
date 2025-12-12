import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { MovingBorderContainer } from '@/components/ui/MovingBorder';
import { industries } from '@/constants/industries';
import { FaAngleRight } from 'react-icons/fa';

export default function IndustryExpertise() {
    const borderDurations = [16000, 20000, 24000, 18000, 28000, 26000];

    return (
        <Section
            title="Industry Expertise Tailored Solutions for Every Sector"
            subtitle="Brillarix powers businesses across industries with AI-driven, no-code solutions that deliver results faster, smarter, and more efficiently."
            id="industry"
        >
            {/* Industry Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {industries.map((industry, index) => {
                    return (
                        <MovingBorderContainer
                            key={industry.id}
                            borderRadius="1.5rem"
                            duration={borderDurations[index]}
                            innerClassName="bg-surface-gradient p-6 flex flex-col gap-4 justify-between"
                        >
                            {/* Header */}
                            <div className='flex p-3 gap-4 border-b border-gray-dark-3 items-center'>
                                {/* Icon */}
                                <div className="w-12 h-12 md:w-15 md:h-15 flex items-center justify-center bg-gray-dark-1 rounded-full border border-gray-dark-9 shrink-0">
                                    <Image
                                        src={industry.icon}
                                        alt={industry.title}
                                        width={24}
                                        height={24}
                                        className="w-6 h-6"
                                    />
                                </div>

                                {/* Title */}
                                <Heading
                                    variant="h5"
                                    align="left"
                                    className="whitespace-nowrap overflow-hidden text-ellipsis flex-1 min-w-0"
                                >
                                    {industry.title}
                                </Heading>
                            </div>

                            {/* Body */}
                            <div className='flex flex-col gap-2'>
                                {/* Headline */}
                                <p className="text-sm md:text-base text-gray-light-3 leading-relaxed flex-1 font-medium">
                                    {industry.headline}
                                </p>

                                {/* Description */}
                                <p className="text-sm md:text-base text-gray-light-5 leading-relaxed flex-1">
                                    {industry.description}
                                </p>
                            </div>

                            {/* Action Button */}
                            <div className="pt-2">
                                <Button
                                    variant="secondary"
                                    href="#contact-us"
                                    className="w-fit"
                                    rightImage={<FaAngleRight size={16} />}
                                >
                                    {industry.buttonText}
                                </Button>
                            </div>
                        </MovingBorderContainer>
                    );
                })}
            </div>
        </Section>
    );
}

