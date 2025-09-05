/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'modeo.pl',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  // Nie potrzebujesz rewrites w produkcji - reverse proxy załatwi routing
};

module.exports = nextConfig;