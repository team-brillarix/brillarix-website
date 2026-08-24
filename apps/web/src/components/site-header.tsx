'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const navigation = [
  { label: 'Our impact', href: '/#impact' },
  { label: 'Tools', href: '/#tools' },
  { label: 'Our services', href: '/services' },
  { label: 'Our process', href: '/#process' },
  { label: 'Industry', href: '/#industry' },
  { label: 'Contact us', href: '/#contact' },
];

function RollingText({ children }: { children: string }) {
  return (
    <span className="rolling-label" aria-hidden="true">
      <span className="rolling-label-track">
        <span className="rolling-label-copy">{children}</span>
        <span className="rolling-label-copy">{children}</span>
      </span>
    </span>
  );
}

export function SiteHeader({ introReady }: { introReady?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 32);

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  return (
    <header className="site-header" data-intro-ready={introReady === undefined ? undefined : introReady} data-scrolled={isScrolled}>
      <Link className="site-wordmark" href="/" data-cursor aria-label="Brillarix home">
        brillarix
      </Link>

      <nav className="desktop-navigation" aria-label="Main navigation">
        {navigation.map((item) => (
          item.href.startsWith('/') ? (
            <Link key={item.label} href={item.href} data-cursor data-roll aria-label={item.label}>
              <RollingText>{item.label}</RollingText>
            </Link>
          ) : (
            <a key={item.label} href={item.href} data-cursor data-roll aria-label={item.label}>
              <RollingText>{item.label}</RollingText>
            </a>
          )
        ))}
        <Link className="partner-cta" href="/#contact" data-cursor>
          Start a project
        </Link>
      </nav>

      <button className="mobile-menu" type="button" data-cursor aria-label="Open menu">
        <Menu size={22} strokeWidth={1.8} />
      </button>
    </header>
  );
}
