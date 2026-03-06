import { defineConfig } from 'next';

export default defineConfig({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  transpilePackages: ['@supabase/supabase-js'],
  images: {
    domains: ['yourdomain.com'], // Add your approved image domains here
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  },
});