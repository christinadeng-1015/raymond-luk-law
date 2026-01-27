const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

// Define your routes
const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/services', changefreq: 'weekly', priority: 0.8 },
  { url: '/team', changefreq: 'weekly', priority: 0.8 },
  { url: '/resources', changefreq: 'weekly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.6 },
  { url: '/careers', changefreq: 'monthly', priority: 0.5 },
  // Law pages
  { url: '/real-estate-law', changefreq: 'monthly', priority: 0.6 },
  { url: '/family-law', changefreq: 'monthly', priority: 0.6 },
  { url: '/personal-injury-law', changefreq: 'monthly', priority: 0.6 },
  { url: '/wills-and-estates', changefreq: 'monthly', priority: 0.6 },
  { url: '/corporate-law', changefreq: 'monthly', priority: 0.6 },
  { url: '/immigration-law', changefreq: 'monthly', priority: 0.6 },
  { url: '/other-services', changefreq: 'monthly', priority: 0.6 },
  { url: '/landlord-tenant-board', changefreq: 'monthly', priority: 0.6 },
  { url: '/small-claims-court', changefreq: 'monthly', priority: 0.6 },
];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: 'https://www.luklaw.ca' });

  routes.forEach((route) => {
    sitemap.write(route);
  });

  sitemap.end();

  const sitemapPath = path.join(__dirname, '..', 'build', 'sitemap.xml');
  const writeStream = createWriteStream(sitemapPath);

  sitemap.pipe(writeStream);

  await streamToPromise(sitemap);
  console.log('Sitemap generated at build/sitemap.xml');
}

generateSitemap().catch(console.error);
