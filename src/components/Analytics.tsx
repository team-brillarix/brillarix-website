'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { useEffect } from 'react';
import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';
import type { Metric } from 'web-vitals';

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        non_interaction?: boolean;
      }
    ) => void;
  }
}

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (!gaId || typeof window === 'undefined') {
      return;
    }

    const sendToAnalytics = (metric: Metric) => {
      if (!window.gtag) {
        return;
      }

      try {
        const value = Math.round(
          metric.name === 'CLS' ? metric.value * 1000 : metric.value
        );

        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value,
          non_interaction: true,
        });
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Failed to send Web Vitals to Analytics:', error);
        }
      }
    };

    const timeoutId = setTimeout(() => {
      onCLS(sendToAnalytics);
      onFCP(sendToAnalytics);
      onLCP(sendToAnalytics);
      onTTFB(sendToAnalytics);
      onINP(sendToAnalytics);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [gaId]);

  if (!gaId) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}

