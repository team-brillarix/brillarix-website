import { ArrowUpRight, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const footerNavigation = [
  { label: 'Services', href: '/services' },
  { label: 'Our impact', href: '/#impact' },
  { label: 'Contact us', href: '/#contact' },
  { label: 'Our process', href: '/#process' },
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

export function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Brillarix footer">
      <div className="site-footer-shell">
        <div className="site-footer-primary">
          <Link className="site-footer-wordmark" href="/#top" aria-label="Brillarix home" data-cursor>
            <Image
              className="site-footer-brand-mark"
              src="/brillarix-mark.png"
              alt=""
              width={1256}
              height={1256}
              sizes="48px"
            />
            <span>brillarix</span>
          </Link>

          <nav className="site-footer-navigation" aria-label="Footer navigation">
            {footerNavigation.map((item) => (
              <Link key={item.label} href={item.href} aria-label={item.label} data-cursor data-roll>
                <RollingText>{item.label}</RollingText>
              </Link>
            ))}
          </nav>
        </div>

        <div className="site-footer-secondary">
          <div className="site-footer-socials" aria-label="Brillarix social media">
            <span className="site-footer-social" aria-label="Brillarix on X" title="X profile link coming soon">
              <span className="site-footer-x" aria-hidden="true">X</span>
            </span>
            <span className="site-footer-social" aria-label="Brillarix on Instagram" title="Instagram profile link coming soon">
              <Instagram aria-hidden="true" />
            </span>
            <a
              className="site-footer-social"
              href="https://in.linkedin.com/company/brillarixtech"
              target="_blank"
              rel="noreferrer"
              aria-label="Brillarix on LinkedIn"
              data-cursor
            >
              <Linkedin aria-hidden="true" />
            </a>
          </div>

          <div className="site-footer-legal" aria-label="Legal information">
            <Link href="/privacy-policy" data-cursor>Privacy Policy</Link>
            <i aria-hidden="true" />
            <Link href="/terms-of-service" data-cursor>Terms of Service</Link>
          </div>
        </div>

        <div className="site-footer-copyright">
          <span>© {new Date().getFullYear()} Brillarix</span>
          <a href="#top" aria-label="Back to top" data-cursor>
            Back to top <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
