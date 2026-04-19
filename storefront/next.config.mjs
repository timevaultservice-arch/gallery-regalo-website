import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lint runs via `npm run lint` locally / in CI — don't let stylistic
  // rules block production deploys on Vercel.
  eslint: { ignoreDuringBuilds: true },
  // Same for types — `npm run typecheck` is the enforcement point.
  // Prevents third-party type regressions (e.g. framer-motion under
  // React 19) from blocking a deploy.
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: '*.medusajs.app' }
    ]
  }
};

export default withNextIntl(nextConfig);
