import type { NextConfig } from 'next';

// next dev/build run from apps/web, so this is the config Next actually loads.
// The identical file at the repo root was never being read — the headers and
// image rules below had no effect until they were moved here.
const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
