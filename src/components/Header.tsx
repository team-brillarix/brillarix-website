"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";
import { navigationLinks } from "@/constants/navigation";
import { useMenu } from "@/hooks/useMenu";
import { Button } from "@/components/ui/Button";

export default function Header() {
    const { isMenuOpen, toggleMenu, closeMenu, menuRef } = useMenu();

    return (
        <header className="w-full py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 sticky top-0 z-30">
            <nav className="bg-[#41414180] rounded-full px-4 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 flex items-center justify-between gap-2 sm:gap-4 md:gap-6 lg:gap-8 backdrop-blur-sm border border-gray-dark-6">
                {/* Logo Section */}
                <Link
                    href="/"
                    className="flex items-center gap-2 shrink-0"
                    aria-label="Brillarix Home"
                >
                    {/* Logo for smaller screens */}
                    <Image
                        src="/logos/Logo-Dark-Mode.png"
                        alt="Brillarix Logo"
                        width={160}
                        height={40}
                        className="h-8 sm:h-9 md:h-10 w-auto md:hidden"
                        priority
                    />
                    {/* Logo for larger screens */}
                    <Image
                        src="/logos/Brillarix-Dark-Mode.png"
                        alt="Brillarix Logo"
                        width={160}
                        height={40}
                        className="h-8 sm:h-9 md:h-10 w-auto hidden md:block"
                        priority
                    />
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1 justify-center max-w-4xl">
                    {navigationLinks.map((link) => (
                        <Button
                            key={link.href}
                            href={link.href}
                            variant="tertiary"
                        >
                            {link.label}
                        </Button>
                    ))}
                </div>

                {/* Right Side: Get a Quote Button + Hamburger */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    {/* Get a Quote Button */}
                    {/*<Button
                        href="/get-quote"
                        variant="primary"
                        rightImage={
                            <FiChevronRight className="w-3 h-3 shrink-0" />
                        }
                    >
                        Get a Quote
                    </Button>*/}

                    {/* Hamburger Icon */}
                    <div className="relative lg:hidden flex items-center justify-center" ref={menuRef}>
                        <motion.button
                            onClick={toggleMenu}
                            className="text-white hover:text-gray-dark-10 transition-colors shrink-0"
                            aria-label="Toggle menu"
                            whileTap={{ scale: 0.95 }}
                        >
                            <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.svg
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
                                    >
                                        <path
                                            d="M18 6L6 18M6 6L18 18"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </motion.svg>
                                ) : (
                                    <motion.svg
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
                                    >
                                        <path
                                            d="M3 12H21M3 6H21M3 18H21"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </motion.svg>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Mobile Menu */}
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute right-0 top-full mt-4 w-48 bg-gray-dark-3 rounded-xl border border-gray-dark-5 shadow-2xl z-50 overflow-hidden"
                                >
                                    <div className="p-2">
                                        {/* Navigation Links */}
                                        {navigationLinks.map((link, index) => (
                                            <motion.div
                                                key={link.href}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: index * 0.03,
                                                    duration: 0.2,
                                                }}
                                            >
                                                <Button
                                                    href={link.href}
                                                    onClick={closeMenu}
                                                    variant="tertiary"
                                                >
                                                    {link.label}
                                                </Button>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </nav>
        </header>
    );
}

