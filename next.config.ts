import type { NextConfig } from 'next';
import type { RemotePattern } from 'next/dist/shared/lib/image-config';

export const remotePatterns: RemotePattern[] = [
  {
    hostname: 'cdn.sanity.io',
    protocol: 'https',
  },
];

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: 'frame-ancestors \'none\';',
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        headers: securityHeaders,
        source: '/:path*',
      },
    ];
  },

  images: {
    deviceSizes: [ 360, 414, 640, 768, 800, 828, 1080, 1280, 1366, 1440, 1536, 1600, 1920, 2560, 3840 ],
    imageSizes: [ 48, 96, 128, 192, 256, 320, 480, 600, 720, 960, 1200 ],

    formats: [ 'image/webp' ],
    remotePatterns,
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  async rewrites() {
    const beforeFiles = [];
    if (process.env.NEXT_PUBLIC_POSTHOG_PATH && process.env.NEXT_PUBLIC_POSTHOG_REGION) {
      beforeFiles.push(
        {
          destination: `https://${process.env.NEXT_PUBLIC_POSTHOG_REGION}-assets.i.posthog.com/static/:path*`,
          source: `${process.env.NEXT_PUBLIC_POSTHOG_PATH}static/:path*`,
        },
        {
          destination: `https://${process.env.NEXT_PUBLIC_POSTHOG_REGION}.i.posthog.com/:path*`,
          source: `${process.env.NEXT_PUBLIC_POSTHOG_PATH}:path*`,
        },
      );
    }

    return {
      afterFiles: [
        {
          destination: '/studio',
          source: '/studio/:tool*',
        },
      ],
      beforeFiles,
    };
  },

  sassOptions: {
    implementation: 'sass-embedded',
  },

  // Required to support PostHog trailing slash API requests; keeping trailing slash for public paths with middleware
  skipTrailingSlashRedirect: true,

  typedRoutes: true,

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
