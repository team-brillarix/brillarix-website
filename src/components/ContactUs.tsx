"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Dropdown } from '@/components/ui/Dropdown';
import { Button } from '@/components/ui/Button';
import { Toast, ToastType } from '@/components/ui/Toast';
import { FiPhone, FiMail } from 'react-icons/fi';
import { CONTACT_AREA_OF_INTEREST_OPTIONS } from '@/constants/dropdownOptions';
import { MovingBorderContainer } from '@/components/ui/MovingBorder';
import { CONTACT_INFO } from '@/constants/contact';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        areaOfInterest: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{
        type: ToastType;
        message: string;
    } | null>(null);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        e.preventDefault();

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setToast({
                type: 'success',
                message: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.',
            });

            setFormData({
                name: '',
                email: '',
                areaOfInterest: '',
                message: '',
            });

            form.reset();
        } catch (error) {
            setToast({
                type: 'error',
                message: error instanceof Error ? error.message : 'An error occurred. Please try again later.',
            });
        } finally {
            setIsSubmitting(false);
        }
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
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
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
                                innerClassName="bg-gray-dark-2 p-6 flex items-center justify-between gap-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border border-gray-dark-4">
                                        <Image
                                            src="/BookMeeting.svg"
                                            alt="Book a Meeting"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <span className="text-gray-light-1 font-medium">{CONTACT_INFO.calendly.label}</span>
                                </div>

                                <a href={CONTACT_INFO.calendly.url} target="_blank" className="bg-gray-light-2 py-3 px-4 flex items-center justify-center rounded-xl">
                                    <Image
                                        src="/tech-icons/Calendly.png"
                                        alt="Calendly"
                                        width={135}
                                        height={32}
                                    />
                                </a>

                            </MovingBorderContainer>

                            <div className="flex flex-row gap-6 lg:gap-8 w-full">
                                <MovingBorderContainer
                                    borderRadius="1rem"
                                    duration={28000}
                                    containerClassName="w-full"
                                    innerClassName="bg-gray-dark-2 p-6 flex gap-4 items-center"
                                >
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border border-gray-dark-4">
                                        <FiPhone className="w-5 h-5 text-gray-light-1" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-gray-light-1 font-medium">{CONTACT_INFO.phone.label}</span>
                                        <p className="text-gray-light-5">
                                            Office : {CONTACT_INFO.phone.office}
                                        </p>
                                    </div>

                                </MovingBorderContainer>

                                <MovingBorderContainer
                                    borderRadius="1rem"
                                    duration={32000}
                                    containerClassName="w-full"
                                    innerClassName="bg-gray-dark-2 p-6 flex gap-3 items-center"
                                >
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border border-gray-dark-4">
                                        <FiMail className="w-5 h-5 text-gray-light-1" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-gray-light-1 font-medium">{CONTACT_INFO.email.label}</span>
                                        <p className="text-gray-light-5">
                                            {CONTACT_INFO.email.address}
                                        </p>
                                    </div>
                                </MovingBorderContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toast
                message={toast?.message || ''}
                type={toast?.type || 'success'}
                isVisible={!!toast}
                onClose={() => setToast(null)}
            />
        </Section>
    );
}

