/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com'
      },
      {
        protocol: 'https',
        hostname: 's3-symbol-logo.tradingview.com',
        pathname: '/*', // allows all paths on the domain
      },
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
