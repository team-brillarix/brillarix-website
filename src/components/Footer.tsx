import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { footerNavigationLinks, footerSocialLinks, footerLegalLinks } from "@/constants/footer";

export default function Footer() {

    return (
        <footer className="w-full py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 flex flex-col gap-20">
            {/* Top */}
            <div className="rounded-t-3xl bg-linear-gradient-footer">
                <div className="p-5 sm:p-6 md:p-10 lg:p-12">
                    {/* Logo and Links */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
                        {/* Logo and Brand Name */}
                        <Link
                            href="/"
                            className="flex items-center gap-2 shrink-0"
                            aria-label="Brillarix Home"
                        >
                            <Image
                                src="/logos/Brillarix-Dark-Mode.png"
                                alt="Brillarix Logo"
                                width={160}
                                height={40}
                                className="h-8 sm:h-9 md:h-10 w-auto"
                                priority
                            />
                        </Link>

                        {/* Navigation Links */}
                        <nav className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8">
                            {footerNavigationLinks.map((link) => (
                                <Button
                                    key={link.href}
                                    href={link.href}
                                    variant="tertiary"
                                    aria-label={link.label}
                                >
                                    {link.label}
                                </Button>
                            ))}
                        </nav>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gray-light-3 mt-8 sm:mt-10"></div>

                    {/* Social Media and Legal Links */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-4 pt-6 sm:pt-8">
                        {/* Social Media Icons */}
                        <div className="flex items-center gap-4">
                            {footerSocialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <Button
                                        key={social.href}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="tertiary"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </Button>
                                );
                            })}
                        </div>

                        {/* Legal Links */}
                        <div className="flex items-center gap-4 sm:gap-6">
                            {footerLegalLinks.map((link, index) => (
                                <React.Fragment key={link.href}>
                                    <Button
                                        href={link.href}
                                        variant="tertiary"
                                        aria-label={link.label}
                                    >
                                        {link.label}
                                    </Button>
                                    {index < footerLegalLinks.length - 1 && (
                                        <span className="text-white text-sm sm:text-base">•</span>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="bg-gray-light-2 rounded-b-3xl">
                <div className="px-4 sm:px-4 md:px-6 py-4 sm:py-5">
                    <p className="text-center text-gray-dark-10 text-sm sm:text-base font-medium">
                        ©2025 Brillarix.com
                    </p>
                </div>
            </div>
        </footer>
    );
}

