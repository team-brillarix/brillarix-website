import type { Metadata } from "next";
import { Space_Grotesk, Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Analytics from "@/components/Analytics";
import SchemaScript from "@/components/SchemaScript";
import { CONTACT_INFO } from "@/constants/contact";
import {
  generateOrganizationSchema,
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
const defaultTitle = "Brillarix: Powering Digital Innovation with Low-Code & Custom Solutions";
const defaultDescription = "Brillarix transforms ideas into high-performance web applications. Specializing in low-code platforms like Bubble.io, we blend code and no-code to create scalable, secure, and efficient digital solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "low-code development",
    "Bubble.io",
    "custom web applications",
    "no-code solutions",
    "web development",
    "digital transformation",
    "software development",
    "scalable applications",
    "enterprise solutions",
    "web app development",
    "Bubble.io development",
    "low-code platform",
    "custom software",
    "digital innovation",
    "web application development",
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
  const organizationSchema = generateOrganizationSchema(siteName, baseUrl, {
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
  });

  const websiteSchema = generateWebSiteSchema(siteName, baseUrl, {
    description: defaultDescription,
    publisher: organizationSchema,
  });

  const serviceSchema = generateServiceSchema(
    "Web Development & Low-Code Solutions",
    siteName,
    {
      areaServed: "Worldwide",
      description: defaultDescription,
      offerDescription: "Custom web application development and low-code solutions",
    }
  );

  return (
    <html lang="en" data-theme="dark">
      <head>
        <SchemaScript schema={organizationSchema} id="organization-schema" />
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
