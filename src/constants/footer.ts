import { FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";

export const footerNavigationLinks = [
    { href: "#our-services", label: "Services" },
    { href: "#our-impact", label: "Our Impact" },
    { href: "#contact-us", label: "Contact Us" },
    { href: "/get-quote", label: "Get a Quote" },
] as const;

export const footerSocialLinks = [
    {
        href: "https://twitter.com/brillarixtech",
        label: "X (Twitter)",
        icon: FaXTwitter,
    },
    {
        href: "https://instagram.com/brillarixtech",
        label: "Instagram",
        icon: FaInstagram,
    },
    {
        href: "https://www.linkedin.com/company/brillarixtech",
        label: "LinkedIn",
        icon: FaLinkedinIn,
    },
] as const;

export const footerLegalLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
] as const;

