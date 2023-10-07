const nextConfig = {
  experimental: {
    appDir: true,
    images: {
      allowFutureImage: true
    },
    future: {
      webpack5: true,
    },
    optimizeFonts: false, // disables Automatic Webpack 5 Font Optimization
  },
};