import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brillarix.com";
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
    telephone: false,
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
        url: `${baseUrl}/logos/Twitter-Image.png`,
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
    images: [`${baseUrl}/logos/Twitter-Image.png`],
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
        color: "#000000",
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
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
    "color-scheme": "dark light",
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/logos/Brillarix-White-Mode.svg`,
    description: defaultDescription,
    sameAs: [
      // Add your social media profiles here
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: baseUrl,
    description: defaultDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Web Development & Low-Code Solutions",
    provider: {
      "@type": "Organization",
      name: siteName,
    },
    areaServed: "Worldwide",
    description: defaultDescription,
    offers: {
      "@type": "Offer",
      description: "Custom web application development and low-code solutions",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <link rel="canonical" href={baseUrl} />
      </head>
      <body
        className={`${geist.variable} antialiased`}
      >
        <div className="w-full max-w-[1440px] mx-auto flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
