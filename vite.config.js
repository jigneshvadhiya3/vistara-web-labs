import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ─── SEO ─────────────────────────────────────────────────────────────────────
// Set this to your live address (no trailing slash) once the domain is ready,
// e.g. 'https://vistara.is-a.dev'. It adds a canonical URL, absolute social
// preview images and a sitemap.xml. You can also pass SITE_URL as an env var.
const SITE_URL = (process.env.SITE_URL || '').replace(/\/$/, '');

function seo() {
  return {
    name: 'vistara-seo',
    transformIndexHtml(html) {
      const abs = (path) => (SITE_URL ? `${SITE_URL}/${path}` : path);
      return html
        .replaceAll('%OG_IMAGE%', abs('og-image.png'))
        .replace('<!--CANONICAL-->', SITE_URL ? `<link rel="canonical" href="${SITE_URL}/" />\n    <meta property="og:url" content="${SITE_URL}/" />` : '');
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${SITE_URL ? `\nSitemap: ${SITE_URL}/sitemap.xml\n` : ''}`,
      });
      if (SITE_URL) {
        const today = new Date().toISOString().slice(0, 10);
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${SITE_URL}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
        });
      }
    },
  };
}

// Relative asset paths: the build works on GitHub Pages, Vercel, Netlify or any sub-folder.
export default defineConfig({
  plugins: [react(), seo()],
  base: './',
  build: { assetsInlineLimit: 0 },
});
