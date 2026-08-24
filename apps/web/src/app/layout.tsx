import type { Metadata } from 'next';
import { SiteCursor } from '@/components/site-cursor';
import { SmoothScroll } from '@/components/smooth-scroll';
import './globals.css';

export const metadata: Metadata = {
  title: 'Brillarix — Digital experiences with intent',
  description: 'Brillarix creates bold digital experiences for ambitious brands.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SmoothScroll /><SiteCursor />{children}</body></html>;
}
