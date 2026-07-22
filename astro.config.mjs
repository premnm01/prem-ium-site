import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// Static output: `astro build` emits a plain folder of HTML/CSS/JS. React
// components with Framer Motion hydrate only where used (islands), so JS
// stays lean. Stylesheets are inlined where small to keep requests down.
export default defineConfig({
  output: 'static',
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  build: { inlineStylesheets: 'auto' },
  site: process.env.SITE_URL || 'https://example.com',
});
