/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Production images config
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'modeo.pl',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'nextmodeo.sitefy.pl',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'wordpress',
        pathname: '/wp-content/uploads/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Security headers (additional to Caddy)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
        ],
      },
    ];
  },

  // Production environment variables
  env: {
    NEXT_PUBLIC_API_URL: 'https://modeo.pl',
    NEXT_PUBLIC_WP_URL: 'https://modeo.pl',
  },
};

module.exports = nextConfig;