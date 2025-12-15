import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.brillarix.com';
const quoteUrl = `${baseUrl}/get-quote`;

export const metadata: Metadata = {
  title: 'Get a Quote - Request a Discovery Call',
  description: 'Book a discovery call with Brillarix to discuss your web application needs. Get a custom quote for low-code and custom development solutions.',
  alternates: {
    canonical: quoteUrl,
  },
  openGraph: {
    type: 'website',
    title: 'Get a Quote - Request a Discovery Call | Brillarix',
    description: 'Book a discovery call with Brillarix to discuss your web application needs.',
    url: quoteUrl,
    images: [
      {
        url: `${baseUrl}/logos/Twitter_Image.png`,
        width: 1200,
        height: 630,
        alt: 'Get a Quote - Brillarix',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get a Quote - Request a Discovery Call | Brillarix',
    description: 'Book a discovery call with Brillarix to discuss your web application needs.',
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

