"use client";

import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Dropdown } from '@/components/ui/Dropdown';
import { Button } from '@/components/ui/Button';
import { FiPhone, FiMail } from 'react-icons/fi';
import { CONTACT_AREA_OF_INTEREST_OPTIONS } from '@/constants/dropdownOptions';
import { MovingBorderContainer } from '@/components/ui/MovingBorder';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        areaOfInterest: '',
        message: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <Section title="Contact us" subtitle="Have questions or need assistance? Our team is ready to support you with anything you need." headingAlign="left" headingFullWidth>
            <div className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                    <div className="flex flex-col gap-6">
                        <MovingBorderContainer
                            borderRadius="1.5rem"
                            duration={20000}
                            innerClassName="bg-gray-dark-1 p-6 md:p-8 flex flex-col gap-6"
                        >
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <Input
                                    label="NAME"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Enter your name"
                                    required
                                />

                                <Input
                                    label="EMAIL"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />

                                <Dropdown
                                    label="AREA OF INTEREST"
                                    options={CONTACT_AREA_OF_INTEREST_OPTIONS}
                                    value={formData.areaOfInterest}
                                    onChange={(value) => handleInputChange('areaOfInterest', value)}
                                    placeholder="Select an area of interest"
                                    required
                                />

                                <Textarea
                                    label="MESSAGE"
                                    value={formData.message}
                                    onChange={(e) => handleInputChange('message', e.target.value)}
                                    minHeight="120px"
                                    placeholder="Enter your message"
                                    required
                                />

                                <Button
                                    type="submit"
                                    variant="primary"
                                    fullWidth
                                >
                                    Send Message
                                </Button>
                            </form>
                        </MovingBorderContainer>
                    </div>

                    <div className="flex flex-col gap-6 justify-between">
                        <div className="flex flex-col gap-4">
                            <Heading
                                variant="h5"
                                as="h3"
                                align="left"
                            >
                                What Can We Assist You With Today?
                            </Heading>

                            <ol className="flex flex-col gap-3 text-gray-light-5 leading-relaxed list-decimal list-inside">
                                <li>Need help exploring our offerings?</li>
                                <li>Experiencing a technical problem or issue?</li>
                                <li>Want to learn more about a specific service or feature?</li>
                                <li>We value your feedback and suggestions to improve!</li>
                            </ol>
                        </div>

                        <div className="flex flex-col gap-6 lg:gap-8">
                            <MovingBorderContainer
                                borderRadius="1rem"
                                duration={24000}
                                innerClassName="bg-gray-dark-2 p-6"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#1E3A5F] flex items-center justify-center shrink-0">
                                            <span className="text-white font-bold text-lg">M</span>
                                        </div>
                                        <span className="text-gray-light-1 font-medium text-base">Book a Meeting</span>
                                    </div>
                                    <Button
                                        href="https://calendly.com"
                                        target="_blank"
                                        variant="primary"
                                        size="sm"
                                        className="bg-white text-gray-dark-1 hover:bg-gray-light-1"
                                    >
                                        <span className="text-sm font-semibold">Calendly</span>
                                    </Button>
                                </div>
                            </MovingBorderContainer>

                            <div className="flex flex-row gap-6 lg:gap-8 w-full">
                                <MovingBorderContainer
                                    borderRadius="1rem"
                                    duration={28000}
                                    containerClassName="w-full"
                                    innerClassName="bg-gray-dark-2 p-6 flex flex-col gap-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <FiPhone className="w-6 h-6 text-gray-light-1" />
                                        <span className="text-gray-light-1 font-medium text-base">Phone</span>
                                    </div>
                                    <p className="text-gray-light-3 text-sm ml-9">
                                        Office : 6232 1151 2211
                                    </p>
                                </MovingBorderContainer>

                                <MovingBorderContainer
                                    borderRadius="1rem"
                                    duration={32000}
                                    containerClassName="w-full"
                                    innerClassName="bg-gray-dark-2 p-6 flex flex-col gap-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <FiMail className="w-6 h-6 text-gray-light-1" />
                                        <span className="text-gray-light-1 font-medium text-base">Email</span>
                                    </div>
                                    <p className="text-gray-light-3 text-sm ml-9">
                                        contact@brillarix.com
                                    </p>
                                </MovingBorderContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}

