import type { Metadata } from "next";
import { Space_Grotesk, Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Analytics from "@/components/Analytics";
import SchemaScript from "@/components/SchemaScript";
import ScrollRestoration from "@/components/ScrollRestoration";
import { CONTACT_INFO } from "@/constants/contact";
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  generateServiceSchema,
} from "@/lib/schema";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.brillarix.com";
const siteName = "Brillarix";
const defaultTitle = "Brillarix: AI native product studio";
const defaultDescription = "Brillarix is an AI native product studio building web, mobile, and SaaS products that scale. Product strategy, world class design, and production grade engineering from MVP to enterprise.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "Next.js",
    "FastAPI",
    "NestJS",
    "Node.js",
    "PostgreSQL",
    "GraphQL",
    "React",
    "TypeScript",
    "JavaScript",
    "AI development",
    "AI-native",
    "AI-powered development",
    "LLM integration",
    "Gemini AI",
    "OpenAI",
    "Claude AI",
    "LangChain",
    "Pinecone",
    "HuggingFace",
    "vector database",
    "RAG",
    "retrieval augmented generation",
    "AI orchestration",
    "machine learning",
    "low-code development",
    "no-code development",
    "Bubble.io",
    "Bubble.io development",
    "Webflow",
    "Framer",
    "Xano",
    "Retool",
    "Lovable",
    "low-code platform",
    "no-code solutions",
    "visual programming",
    "rapid prototyping",
    "MVP development",
    "React Native",
    "Flutter",
    "FlutterFlow",
    "Swift",
    "Kotlin",
    "Capacitor",
    "mobile app development",
    "cross-platform development",
    "iOS development",
    "Android development",
    "native mobile apps",
    "AWS",
    "Google Cloud Platform",
    "GCP",
    "Vercel",
    "Supabase",
    "Docker",
    "containerization",
    "cloud infrastructure",
    "DevOps",
    "CI/CD",
    "deployment automation",
    "LambdaTest",
    "cross-browser testing",
    "Make automation",
    "n8n",
    "Zapier",
    "workflow automation",
    "Twilio",
    "SMS integration",
    "WhatsApp integration",
    "Mixpanel",
    "product analytics",
    "Sentry",
    "error tracking",
    "monitoring",
    "custom web applications",
    "web development",
    "full-stack development",
    "backend development",
    "frontend development",
    "API development",
    "API integration",
    "database architecture",
    "microservices",
    "scalable applications",
    "enterprise solutions",
    "web app development",
    "web application development",
    "custom software",
    "software development",
    "digital transformation",
    "digital innovation",
    "startup development",
    "SaaS development",
    "e-commerce development",
    "enterprise software",
    "scalable architecture",
    "performance optimization",
    "UX design",
    "UI design",
    "conversion optimization",
    "real-time databases",
    "serverless",
    "edge computing",
    "progressive web apps",
    "PWA",
    "responsive design",
    "SEO optimization",
  ],
  authors: [
    {
      name: "Brillarix",
      url: baseUrl,
    },
  ],
  creator: "Brillarix",
  publisher: "Brillarix",
  formatDetection: {
    email: false,
    address: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${baseUrl}/logos/Twitter_Image.png`,
        width: 1200,
        height: 630,
        alt: "Brillarix - Powering Digital Innovation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [`${baseUrl}/logos/Twitter_Image.png`],
    creator: "@brillarixtech",
    site: "@brillarixtech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logos/Logo-Dark-Mode.png", sizes: "any" },
      { url: "/logos/Logo-Dark-Mode.png", sizes: "16x16", type: "image/png" },
      { url: "/logos/Logo-Dark-Mode.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/logos/Logo-Dark-Mode.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/logos/Logo-Dark-Mode.png",
        color: "#08090A",
      },
    ],
  },
  manifest: "/manifest.json",
  category: "technology",
  classification: "Business",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": siteName,
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#08090A",
    "theme-color": "#08090A",
    "color-scheme": "dark",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationId = `${baseUrl}#organization`;
  const websiteId = `${baseUrl}#website`;
  const primaryServiceId = `${baseUrl}#primary-service`;

  const organizationSchema = generateOrganizationSchema(siteName, baseUrl, {
    id: organizationId,
    logo: `${baseUrl}/logos/Brillarix-White-Mode.png`,
    description: defaultDescription,
    sameAs: [
      "https://twitter.com/brillarixtech",
      "https://instagram.com/brillarixtech",
      "https://www.linkedin.com/company/brillarixtech",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: CONTACT_INFO.email.address,
      availableLanguage: "English",
    },
    founder: {
      name: "Manish Khakhal",
      jobTitle: "Founder",
      url: baseUrl,
      sameAs: [
        "https://www.linkedin.com/in/manishkhakhal",
        "https://www.upwork.com/freelancers/manishkhakhal",
      ],
    },
  });

  const localBusinessSchema = generateLocalBusinessSchema({
    id: organizationId,
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/logos/Brillarix-White-Mode.png`,
    description: defaultDescription,
    sameAs: [
      "https://twitter.com/brillarixtech",
      "https://instagram.com/brillarixtech",
      "https://www.linkedin.com/company/brillarixtech",
    ],
    email: CONTACT_INFO.email.address,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Vardhman Nagar-A, Gopalpura Bypass Rd, near 200 Feet Bypass Road, Patrakar Colony",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302019",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: CONTACT_INFO.email.address,
      availableLanguage: "English",
    },
    parentOrganizationId: organizationId,
    areaServed: "Worldwide",
  });

  const websiteSchema = generateWebSiteSchema(siteName, baseUrl, {
    id: websiteId,
    description: defaultDescription,
    publisher: { "@id": organizationId },
  });

  const serviceSchema = generateServiceSchema(
    "Web Development & Low-Code Solutions",
    { "@id": organizationId },
    {
      id: primaryServiceId,
      areaServed: "Worldwide",
      description: defaultDescription,
      offerDescription: "Custom web application development and low-code solutions",
    }
  );

  return (
    <html lang="en" data-theme="dark">
      <head>
        <SchemaScript schema={organizationSchema} id="organization-schema" />
        <SchemaScript schema={localBusinessSchema} id="local-business-schema" />
        <SchemaScript schema={websiteSchema} id="website-schema" />
        <SchemaScript schema={serviceSchema} id="service-schema" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <link rel="preload" href="/logos/Brillarix-Dark-Mode.png" as="image" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${rubik.variable} antialiased`}
      >
        <Loader />
        <ScrollRestoration />
        <div className="w-full max-w-[1440px] mx-auto flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
