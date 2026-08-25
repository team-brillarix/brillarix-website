'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 32);

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  // Hold the page still and keep Tab inside the panel while it is open.
  useEffect(() => {
    if (!isMenuOpen) return;

    const menuButton = menuButtonRef.current;
    window.dispatchEvent(new Event('brillarix:scroll-lock'));
    document.documentElement.dataset.menuOpen = 'true';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === menuButton)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      delete document.documentElement.dataset.menuOpen;
      window.dispatchEvent(new Event('brillarix:scroll-unlock'));
      menuButton?.focus();
    };
  }, [isMenuOpen, closeMenu]);

  // Resizing up into the desktop nav should not leave the panel stranded open.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1121px)');
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false);
    };

    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return (
    <header
      className="site-header"
      data-intro-ready={introReady === undefined ? undefined : introReady}
      data-menu-open={isMenuOpen}
      data-scrolled={isScrolled}
    >
      <Link className="site-wordmark" href="/" data-cursor aria-label="Brillarix home">
        <Image
          className="site-brand-mark"
          src="/brillarix-mark.png"
          alt=""
          width={1256}
          height={1256}
          sizes="48px"
          priority
        />
        <span className="site-wordmark-text">brillarix</span>
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

      <button
        className="mobile-menu"
        type="button"
        data-cursor
        aria-controls="mobile-navigation"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setIsMenuOpen((open) => !open)}
        ref={menuButtonRef}
      >
        {isMenuOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
      </button>

      {/* Closed state is `visibility: hidden`, which already takes the links out
          of the tab order and the accessibility tree — no `inert` needed. */}
      <div
        className="mobile-navigation"
        id="mobile-navigation"
        data-open={isMenuOpen}
        ref={panelRef}
      >
        <nav className="mobile-navigation-list" aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              style={{ '--nav-index': index } as React.CSSProperties}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          className="mobile-navigation-cta"
          href="/#contact"
          onClick={closeMenu}
          style={{ '--nav-index': navigation.length } as React.CSSProperties}
        >
          Start a project
        </Link>
      </div>
    </header>
  );
}
