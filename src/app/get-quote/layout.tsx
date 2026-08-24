import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.brillarix.com';
const quoteUrl = `${baseUrl}/get-quote`;

export const metadata: Metadata = {
  title: 'Partner With Us - Request a Discovery Call',
  description: 'Book a discovery call with Brillarix to discuss your product vision. Partner with us to build scalable, AI-powered solutions.',
  alternates: {
    canonical: quoteUrl,
  },
  openGraph: {
    type: 'website',
    title: 'Partner With Us - Request a Discovery Call | Brillarix',
    description: 'Book a discovery call with Brillarix to discuss your product vision.',
    url: quoteUrl,
    images: [
      {
        url: `${baseUrl}/logos/Twitter_Image.png`,
        width: 1200,
        height: 630,
        alt: 'Partner With Us - Brillarix',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner With Us - Request a Discovery Call | Brillarix',
    description: 'Book a discovery call with Brillarix to discuss your product vision.',
    images: [`${baseUrl}/logos/Twitter_Image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GetQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

