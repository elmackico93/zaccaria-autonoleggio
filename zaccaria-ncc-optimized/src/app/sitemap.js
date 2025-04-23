/**
 * Dynamic sitemap generation for SEO optimization
 * This file is a server component that generates a sitemap.xml on-demand
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

export default async function sitemap() {
    const baseUrl = 'https://www.zaccariaautonoleggio.it';
    
    // Define all dynamic and static routes
    const routes = [
      // Homepage (highest priority)
      {
        url: `${baseUrl}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      
      // Main section routes
      {
        url: `${baseUrl}/services`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/fleet`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/tour`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9, // Increased priority for tours based on SEO analysis
      },
      {
        url: `${baseUrl}/rental`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/testimonials`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
      },
      
      // Specific service pages
      {
        url: `${baseUrl}/services/transfer-aeroporto-brindisi`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/services/transfer-aeroporto-bari`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/services/noleggio-con-conducente-matrimoni`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      
      // Specific tour pages
      {
        url: `${baseUrl}/tour/valle-itria`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/tour/enogastronomico-puglia`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/tour/citta-arte-puglia`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      
      // Location-based pages
      {
        url: `${baseUrl}/locations/ostuni`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/locations/brindisi`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/locations/bari`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/locations/lecce`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/locations/alberobello`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      
      // FAQ, Terms, Privacy
      {
        url: `${baseUrl}/faq`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${baseUrl}/privacy`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
    ];
    
    return routes;
  }