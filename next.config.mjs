import { i18n } from './src/i18n/config.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    defaultLocale: i18n.defaultLocale,
    locales: i18n.locales,
    localeDetection: true,
  },
};

export default nextConfig;
