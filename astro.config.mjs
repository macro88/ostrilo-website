import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://ostrilo.com',
  base: process.env.SITE_BASE ?? '/',
  trailingSlash: 'always',
  output: 'static',
  integrations: [react()],
  vite: { build: { sourcemap: false } },
});
