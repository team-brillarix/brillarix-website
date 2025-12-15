"use client";

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, animate } from 'motion/react';
import { Section } from '@/components/ui/Section';
import { clientsData } from '@/constants/clients';

export default function OurClients() {
    const duplicatedClients = Array(6).fill(clientsData).flat();
    const firstSetRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<any>(null);
    const [oneSetWidth, setOneSetWidth] = useState(0);
    const x = useMotionValue(0);

    useEffect(() => {
        const updateWidth = () => {
            if (firstSetRef.current) {
                const width = firstSetRef.current.offsetWidth;
                setOneSetWidth(width);
            }
        };

        requestAnimationFrame(updateWidth);
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    useEffect(() => {
        if (oneSetWidth > 0) {
            x.set(0);

            if (animationRef.current) {
                animationRef.current.stop();
            }

            animationRef.current = animate(x, -oneSetWidth, {
                duration: 30,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
            });

            return () => {
                if (animationRef.current) {
                    animationRef.current.stop();
                }
            };
        }
    }, [oneSetWidth, x]);

    return (
        <Section
            title="Our Clients"
            className="px-0"
        >
            <div className="w-screen overflow-hidden relative" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
                <div className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-12" ref={firstSetRef} style={{ width: 'max-content', visibility: 'hidden', position: 'absolute', pointerEvents: 'none' }}>
                    {clientsData.map((client, index) => (
                        <div
                            key={`measure-${index}`}
                            className="border-gradient rounded-3xl shrink-0"
                        >
                            <div className="bg-gray-dark-2 px-4 py-6 flex items-center justify-center rounded-3xl w-[200px] h-24">
                                <Image
                                    src={client.image}
                                    alt={`${client.name} logo`}
                                    width={120}
                                    height={64}
                                    className={`object-contain max-w-full h-16 ${client.filter ? 'brightness-0 invert' : ''}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <motion.div
                    className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-12"
                    style={{ x, width: 'max-content', willChange: 'transform' }}
                >
                    {duplicatedClients.map((client, index) => (
                        <div
                            key={index}
                            className="border-gradient rounded-3xl shrink-0"
                        >
                            <div className="bg-gray-dark-2 px-4 py-6 flex items-center justify-center rounded-3xl w-[200px] h-24">
                                <Image
                                    src={client.image}
                                    alt={`${client.name} logo`}
                                    width={120}
                                    height={64}
                                    className={`object-contain max-w-full h-16 ${client.filter ? 'brightness-0 invert' : ''}`}
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
}

