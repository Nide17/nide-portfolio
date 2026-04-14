const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  future: {
    webpack5: true,
  },
  optimizeFonts: false, // disables Automatic Webpack 5 Font Optimization
};

module.exports = nextConfig;
