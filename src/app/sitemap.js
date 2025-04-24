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
      {
        url: `${baseUrl}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      // Section routes
      {
        url: `${baseUrl}/services`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/fleet`,
     {
      url: `${baseUrl}/offers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
     },
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/tour`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
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
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
      },
    ];
    
    // In a real application, you might fetch these dynamically from a CMS or API
    // For example, to add individual tour pages:
    /*
    const tours = await fetchTours();
    const tourRoutes = tours.map(tour => ({
      url: `${baseUrl}/tour/${tour.slug}`,
      lastModified: tour.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
    
    return [...routes, ...tourRoutes];
    */
    // SEO Landing Page - ncc-ostuni
    {
      url: `${baseUrl}/ncc-ostuni`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // SEO Landing Page - transfer-aeroporto-brindisi
    {
      url: `${baseUrl}/transfer-aeroporto-brindisi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // SEO Landing Page - autonoleggio-con-conducente-alberobello
    {
      url: `${baseUrl}/autonoleggio-con-conducente-alberobello`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // SEO Landing Page - tour-autista-privato-puglia
    {
      url: `${baseUrl}/tour-autista-privato-puglia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // SEO Landing Page - transfer-bari-ostuni
    {
      url: `${baseUrl}/transfer-bari-ostuni`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    
    
    
        // SEO Landing Page - servizi-puglia
    {
      url: `${baseUrl}/servizi-puglia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    
    return routes;
  }