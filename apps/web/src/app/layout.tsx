import type { Metadata, Viewport } from 'next';
import { SiteCursor } from '@/components/site-cursor';
import { SmoothScroll } from '@/components/smooth-scroll';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.brillarix.com';
const siteName = 'Brillarix';
const siteTitle = 'Brillarix — Digital experiences with intent';
const siteDescription = 'Brillarix creates bold digital experiences for ambitious brands.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | Brillarix',
  },
  description: siteDescription,
  applicationName: siteName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: 'en_US',
    images: [{ url: '/brillarix-mark.png', width: 1256, height: 1256, alt: siteName }],
  },
  twitter: {
    card: 'summary',
    title: siteTitle,
    description: siteDescription,
    images: ['/brillarix-mark.png'],
  },
  icons: {
    icon: '/brillarix-mark.png',
    apple: '/brillarix-mark.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport: Viewport = {
  themeColor: '#F2EFE8',
  colorScheme: 'light',
};

// Facts here are all already stated elsewhere on the site (footer, terms page,
// contact section) — this only makes them machine-readable.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/brillarix-mark.png`,
  description: siteDescription,
  email: 'contact@brillarix.com',
  sameAs: ['https://in.linkedin.com/company/brillarixtech'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SmoothScroll />
        <SiteCursor />
        {children}
        <div className="site-grain" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
