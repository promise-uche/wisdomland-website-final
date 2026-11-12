// Generates public/sitemap.xml and public/robots.txt from VITE_SITE_URL (runs before every build).
import fs from 'node:fs';
import path from 'node:path';

let site = process.env.VITE_SITE_URL;
if (!site && fs.existsSync('.env')) {
  const m = fs.readFileSync('.env', 'utf8').match(/^VITE_SITE_URL=(.+)$/m);
  if (m) site = m[1].trim();
}
site = (site || 'https://www.wisdomlandschools.com.ng').replace(/\/+$/, '');

const pages = [
  ['/', 1.0], ['/about', 0.9], ['/academics', 0.9],
  ['/academics/nursery-primary', 0.8], ['/academics/junior-secondary', 0.8],
  ['/academics/senior-secondary', 0.8], ['/academics/pre-university', 0.8],
  ['/admissions', 0.9], ['/student-life', 0.7], ['/contact', 0.8],
];
const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([p, pr]) => `  <url><loc>${site}${p}</loc><lastmod>${today}</lastmod><priority>${pr}</priority></url>`).join('\n')}
</urlset>
`;
fs.mkdirSync('public', { recursive: true });
fs.writeFileSync(path.join('public', 'sitemap.xml'), xml);
fs.writeFileSync(path.join('public', 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
console.log('SEO files generated for', site);
