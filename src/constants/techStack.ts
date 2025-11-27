import { TechCategory } from '@/types/techStack';

export const techStackData: TechCategory[] = [
    {
        title: "Full-Stack Web Development",
        items: [
            { name: "React", image: "/tech-icons/React.svg" },
            { name: "Next.js", image: "/tech-icons/Next.svg" },
            { name: "HTML5", image: "/tech-icons/HTML.svg" },
            { name: "Node.js", image: "/tech-icons/Node.svg" },
            { name: "Stripe", image: "/tech-icons/Stripe.svg" },
            { name: "MongoDB", image: "/tech-icons/Mongo.svg" },
        ],
    },
    {
        title: "No-Code Development",
        items: [
            { name: "Bubble.io", image: "/tech-icons/Bubble.svg" },
            { name: "Webflow", image: "/tech-icons/webflow.svg" },
            { name: "WordPress", image: "/tech-icons/WordPress.svg" },
            { name: "Xano", image: "/tech-icons/Xano.svg" },
            { name: "Wix", image: "/tech-icons/Wix.svg" },
            { name: "Zapier", image: "/tech-icons/Zapier.svg" },
        ],
    },
    {
        title: "Mobile App Development",
        items: [
            { name: "FlutterFlow", image: "/tech-icons/FlutterFlow.svg" },
            { name: "App Store", image: "/tech-icons/AppStore.svg" },
            { name: "Play Store", image: "/tech-icons/PlayStore.svg" },
            { name: "Framer", image: "/tech-icons/Framer.svg" },
            { name: "Figma", image: "/tech-icons/Figma.svg" },
            { name: "Twilio", image: "/tech-icons/Twilio.svg" },
        ],
    },
];

