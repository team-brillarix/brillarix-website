'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      <SpeedInsights />
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </>
  );
}

