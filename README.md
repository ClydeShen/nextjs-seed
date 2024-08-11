# Nextjs - seed

## commands

`npx create-next-app@latest ./ --use-pnpm`

`pnpm add @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-date-pickers @mui/system @mui/utils`

`pnpm add dayjs notistack lodash next-auth axios react-hook-form zod react-number-format`

`pnpm add -D @types/lodash @hookform/resolvers`

run dev

`pnpm run dev`

clean up

`rm -rf .next`

## Setup

### Create app in current folder

run terminal

`npx create-next-app@latest ./ --use-pnpm`

```
Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … No
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the default import alias (@/*)? … No
```

Edit `next.config.mjs`

```
const nextConfig = {
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
      process.env.STAGE === 'dev'
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
```

Create folders

```
/src
  /components
  /hooks
  /utils
  /theme
```

Edit tsconfig

```
  "paths": {
      "@components/*": ["./src/components/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@utils/*": ["./src/utils/*"],
      "@theme": ["./src/theme"]
    }
```

### Install Libs

`pnpm add dayjs notistack lodash next-auth axios react-hook-form zod react-number-format`

`pnpm add -D @types/lodash`

config dayjs date time format
`src/libs/dayjs/index.ts`

config notistack
`src/libs/notistack/config.ts`

config nextauth
`src/libs/nextauth/index.ts`

setup ENV file
`.env`

### Install MUI

Install MUI and Icons

`pnpm add @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-date-pickers @mui/system @mui/utils`

Install font: Edit layout.tsx

```
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});
```

config theme
`src/theme/ThemeProvider.tsx`

setup useAlert
`src/hooks/useAlert/index.tsx`

setup useConfirm
`src/hooks/useConfirm/index.tsx`

### Install Next-auth

setup `app/api/auth/[...nextauth]/auth.ts`

setup `app/api/auth/[...nextauth]/route.ts`

create /signin page

create /signout page

setup `src/hooks/useAuth/index.tsx`
