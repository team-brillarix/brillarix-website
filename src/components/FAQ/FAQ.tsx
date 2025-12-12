"use client";

import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { FAQItem } from './FAQItem';
import { faqs } from '@/constants/faqs';
import Image from 'next/image';
import SchemaScript from '@/components/SchemaScript';
import { generateFAQPageSchema } from '@/lib/schema';

export default function FAQ() {
    const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
    const faqSchema = generateFAQPageSchema(faqs);

    const handleToggle = (id: string) => {
        setOpenId(prevId => prevId === id ? null : id);
    };

    return (
        <Section
        >
            <SchemaScript schema={faqSchema} id="faq-schema" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                {/* Left */}
                <div className="flex flex-col gap-6">
                    <Heading
                        variant="h2"
                        as="h2"
                        align="left"
                        subtitle="Our FAQ section offers quick answers to common questions, helping you find information easily."
                    >
                        FAQs
                    </Heading>

                    <div className="relative w-full h-72">
                        <Image src="/faq.svg" alt="FAQ" fill className="object-contain" />
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-col gap-4">
                    {faqs.map((faq) => (
                        <FAQItem
                            key={faq.id}
                            faq={faq}
                            isOpen={openId === faq.id}
                            onToggle={() => handleToggle(faq.id)}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
}

