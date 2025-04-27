/**
 * Sitemap configuration for Next.js
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

export default function sitemap() {
  // Base URL for your website
  const baseUrl = 'https://zaccaria-autonoleggio.it'
  
  const routes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/fleet',
    '/booking',
    '/testimonials',
    '/locations',
    '/faq',
  ]

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...routes.map((route) => ({
      url: baseUrl + route,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ]
}