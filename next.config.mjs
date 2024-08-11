const nextConfig = (phase) => {
  /**
   * @type {import('next').NextConfig}
   */
  const _nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    swcMinify: true,
    poweredByHeader: false,
    compress: true,
    optimizeFonts: true,
    // Enable etags to allow caches to be more efficient and saves bandwidth
    // https://en.wikipedia.org/wiki/HTTP_ETag
    generateEtags: true,
    // When the productionBrowserSourceMaps option is enabled,
    // the source maps will be output in the same directory as the JavaScript files.
    // Next.js will automatically serve these files when requested.
    productionBrowserSourceMaps: true,
    experimental: {
      optimizePackageImports: [
        //@mui/icons-material, @mui/material, lodash are already optimized by default
        '@mui/lab',
        '@mui/styles',
      ],
    },
    env: {},
    // uncomment to enable image optimization
    // images: {
    //   remotePatterns: [
    //     {
    //       protocol: "https",
    //       hostname: "s3.amazonaws.com",
    //       pathname: "/**",
    //     },
    //   ],
    //   minimumCacheTTL: 86400,
    // },
    compiler: {
      // ssr and displayName are configured by default
      styledComponents: true,
      removeConsole:
        phase === 'phase-development-server'
          ? false
          : {
              exclude: ['error', 'debug'],
            },
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
            {
              key: 'X-DNS-Prefetch-Control',
              value: 'on',
            },
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=31536000; includeSubDomains; preload',
            },
          ],
        },
      ];
    },
  };
  return _nextConfig;
};
export default nextConfig;
