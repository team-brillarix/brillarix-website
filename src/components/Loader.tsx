"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Loader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            setIsLoading(false);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{
                        duration: 0.8,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                    className="fixed inset-0 z-9999 bg-background flex items-center justify-center"
                >
                    <Image
                        src="/logos/Brillarix-Dark-Mode.png"
                        alt="Brillarix Logo"
                        width={160}
                        height={40}
                        className="w-auto h-16 lg:h-20"
                        priority
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

