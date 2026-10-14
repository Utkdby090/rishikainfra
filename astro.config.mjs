// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://rishikainfra.com',
  output: 'static',
  security: {
    // Emits a per-page CSP <meta> with hashes for Astro's scripts.
    // Styles keep 'unsafe-inline' because React islands use inline style attributes.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https://images.unsplash.com https://*.google-analytics.com https://*.googletagmanager.com",
        "media-src 'self'",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://api.web3forms.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self' https://api.web3forms.com",
      ],
      scriptDirective: {
        resources: ["'self'", 'https://www.googletagmanager.com'],
      },
      styleDirective: {
        resources: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      },
    },
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    react(),
    sitemap()
  ]
});
