import type { APIRoute } from 'astro';
import { page } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const paths = ['', 'security/', 'roadmap/', 'developers/', 'start/', 'privacy/'];
  const urls = paths.map((path) => `<url><loc>${new URL(page(path), site)}</loc></url>`).join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
