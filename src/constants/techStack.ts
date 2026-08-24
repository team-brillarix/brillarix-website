import React from 'react';
import { TechCategory } from '@/types/techStack';
import { FaCode, FaBrain, FaRocket, FaMobileAlt, FaCloud, FaCogs } from 'react-icons/fa';

export const techStackData: TechCategory[] = [
    {
        title: "Core Engineering",
        description: "Robust, scalable architectures built for high-growth products.",
        icon: React.createElement(FaCode, { className: "w-5 h-5 text-gray-light-4" }),
        items: [
            { 
                name: "Next.js", 
                image: "/tech-icons/Next.svg",
                description: "The industry standard for high-performance, SEO-ready React applications."
            },
            { 
                name: "FastAPI", 
                image: "/tech-icons/FastAPI.svg",
                description: "High-speed backend logic, optimized for heavy data processing and AI integration."
            },
            { 
                name: "NestJS", 
                image: "/tech-icons/NestJS.svg",
                description: "The ultimate framework for building server-side applications with TypeScript."
            },
            { 
                name: "Node.js", 
                image: "/tech-icons/Node.svg",
                description: "Enterprise-grade server-side framework for building efficient, scalable microservices."
            },
            { 
                name: "PostgreSQL", 
                image: "/tech-icons/Postgres.svg",
                description: "The world's most advanced open-source relational database for complex, secure data storage."
            },
            { 
                name: "GraphQL", 
                image: "/tech-icons/GraphQL.svg",
                description: "Flexible API query language that prevents over-fetching and speeds up frontend performance."
            },
        ],
    },
    {
        title: "AI, LLMs & Orchestration",
        description: "State-of-the-art intelligence models and reasoning engines.",
        icon: React.createElement(FaBrain, { className: "w-5 h-5 text-gray-light-4" }),
        items: [
            { 
                name: "Gemini", 
                image: "/tech-icons/Gemini.svg",
                description: "Massive context-window AI for deep analysis of large codebases, video, and multimodal data."
            },
            { 
                name: "OpenAI", 
                image: "/tech-icons/OpenAI.svg",
                description: "The gold standard for general-purpose reasoning, creative generation, and speed."
            },
            { 
                name: "Claude", 
                image: "/tech-icons/Claude.svg",
                description: "The top-performing model for complex coding tasks and nuanced instruction following."
            },
            { 
                name: "LangChain", 
                image: "/tech-icons/LangChain.svg",
                description: "The critical infrastructure for chaining LLMs together to build autonomous agents."
            },
            { 
                name: "Pinecone", 
                image: "/tech-icons/Pinecone.svg",
                description: "High-performance vector database enabling AI to \"remember\" and search your custom data (RAG)."
            },
            { 
                name: "HuggingFace", 
                image: "/tech-icons/HuggingFace.svg",
                description: "Access to open-source models (Llama, Mistral) for privacy-focused, self-hosted AI solutions."
            },
        ],
    },
    {
        title: "Low-Code & Rapid Prototyping",
        description: "Validate ideas and launch MVPs in weeks, not months.",
        icon: React.createElement(FaRocket, { className: "w-5 h-5 text-gray-light-4" }),
        items: [
            { 
                name: "Bubble.io", 
                image: "/tech-icons/Bubble.svg",
                description: "Full-stack visual programming for building complex, data-driven web apps without code."
            },
            { 
                name: "Webflow", 
                image: "/tech-icons/Webflow.svg",
                description: "The premier tool for pixel-perfect, high-performance marketing sites and CMS."
            },
            { 
                name: "Framer", 
                image: "/tech-icons/Framer.svg",
                description: "Design-centric builder for shipping stunning, high-fidelity landing pages instantly."
            },
            { 
                name: "Xano", 
                image: "/tech-icons/Xano.svg",
                description: "Industrial-grade no-code backend that scales to millions of records."
            },
            { 
                name: "Retool", 
                image: "/tech-icons/Retool.svg",
                description: "The fastest way to build powerful internal tools, admin panels, and dashboards."
            },
            { 
                name: "Lovable", 
                image: "/tech-icons/Lovable.svg",
                description: "Next-gen AI coding partner for rapid full-stack iteration and UI generation."
            },
        ],
    },
    {
        title: "Mobile & Cross-Platform",
        description: "Native performance with the efficiency of a single codebase.",
        icon: React.createElement(FaMobileAlt, { className: "w-5 h-5 text-gray-light-4" }),
        items: [
            { 
                name: "React Native", 
                image: "/tech-icons/React.svg",
                description: "Build iOS and Android apps simultaneously using a single, robust JavaScript codebase."
            },
            { 
                name: "Flutter", 
                image: "/tech-icons/Flutter.svg",
                description: "Google's UI toolkit for crafting beautiful, natively compiled applications from one source."
            },
            { 
                name: "Swift", 
                image: "/tech-icons/Swift.svg",
                description: "Native languages for deep system integration and high-performance modules when required."
            },
            { 
                name: "Kotlin", 
                image: "/tech-icons/Kotlin.svg",
                description: "Native languages for deep system integration and high-performance modules when required."
            },
            { 
                name: "FlutterFlow", 
                image: "/tech-icons/FlutterFlow.svg",
                description: "Low-code visual builder for generating clean Flutter code and shipping mobile apps fast."
            },
            { 
                name: "Capacitor", 
                image: "/tech-icons/Capacitor.svg",
                description: "Turn modern web applications into native mobile apps with full device access."
            },
        ],
    },
    {
        title: "Cloud, DevOps & Infrastructure",
        description: "Enterprise-grade security, uptime, and global scaling.",
        icon: React.createElement(FaCloud, { className: "w-5 h-5 text-gray-light-4" }),
        items: [
            { 
                name: "AWS", 
                image: "/tech-icons/AWS.svg",
                description: "The backbone of the modern internet. Infinite scalability and enterprise compliance."
            },
            { 
                name: "GCP", 
                image: "/tech-icons/GCP.svg",
                description: "The backbone of the modern internet. Infinite scalability and enterprise compliance."
            },
            { 
                name: "Vercel", 
                image: "/tech-icons/Vercel.svg",
                description: "The optimal deployment platform for frontend speed, edge functions, and global content delivery."
            },
            { 
                name: "Supabase", 
                image: "/tech-icons/Supabase.svg",
                description: "The open-source Firebase alternative providing instant APIs, auth, and real-time databases."
            },
            { 
                name: "Docker", 
                image: "/tech-icons/Docker.svg",
                description: "Containerization technology ensuring your app runs consistently across any environment."
            },
            { 
                name: "LambdaTest", 
                image: "/tech-icons/LambdaTest.svg",
                description: "Cloud-based cross-browser testing platform for ensuring app compatibility across devices and browsers."
            },
        ],
    },
    {
        title: "Automation & Data Operations",
        description: "Connecting systems and measuring product success.",
        icon: React.createElement(FaCogs, { className: "w-5 h-5 text-gray-light-4" }),
        items: [
            { 
                name: "Make", 
                image: "/tech-icons/Make.svg",
                description: "Advanced visual automation for connecting apps and handling complex logic flows."
            },
            { 
                name: "n8n", 
                image: "/tech-icons/N8N.svg",
                description: "Workflow automation that can be self-hosted for maximum data privacy and flexibility."
            },
            { 
                name: "Zapier", 
                image: "/tech-icons/Zapier.svg",
                description: "The universal connector that instantly links thousands of apps to automate daily tasks."
            },
            { 
                name: "Twilio", 
                image: "/tech-icons/Twilio.svg",
                description: "Reliable infrastructure for transactional SMS, WhatsApp, and email delivery."
            },
            { 
                name: "Mixpanel", 
                image: "/tech-icons/Mixpanel.svg",
                description: "Deep product analytics to track user behavior, retention, and conversion funnels."
            },
            { 
                name: "Sentry", 
                image: "/tech-icons/Sentry.svg",
                description: "Real-time error tracking that helps us fix bugs before your users even notice them."
            },
        ],
    },
];

