'use client';

import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import Script from 'next/script';
import { CONTACT_INFO } from '@/constants/contact';

declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export default function GetAQuotePage() {
  const handleCalendlyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: CONTACT_INFO.calendly.url
      });
    }
    return false;
  };

  return (
    <>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <div className="min-h-[calc(100vh-120px)] bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <Heading variant="h1" align="center">
            Get a Quote
          </Heading>
          <Button
            variant="primary"
            size="lg"
            onClick={handleCalendlyClick}
            href="#"
          >
            Book Discovery Call with Brillarix
          </Button>
        </div>
      </div>
    </>
  );
}

