/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io'],
    remotePatterns: [
      {
        hostname: 'img.freepik.com',
        protocol: 'https'
      }
    ]
  },
  webpack(config) {
    config.resolve.fallback = {
      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,

      fs: false // the solution
    };

    return config;
  }
};

module.exports = nextConfig;
