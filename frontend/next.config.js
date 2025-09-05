/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'nextmodeo.sitefy.pl',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'modeo.pl',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'wordpress',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        pathname: '/avatar/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    qualities: [75, 85, 90, 95, 100],
  },
  async rewrites() {
    // Only use proxy in development
    if (process.env.NODE_ENV === 'development') {
      return [
        // Proxy do WordPress API
        {
          source: '/wp-json/:path*',
          destination: 'http://localhost:8080/wp-json/:path*',
        },
      ];
    }
    return [];
  },
};

module.exports = nextConfig;
