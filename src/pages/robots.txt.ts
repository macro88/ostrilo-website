import type { APIRoute } from 'astro';
import { page } from '../data/site';

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL(page('sitemap.xml'), site)}\n`, {
    headers: { 'Content-Type': 'text/plain' },
  });
