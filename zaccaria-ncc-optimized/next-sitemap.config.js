/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.zaccariaautonoleggio.it',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.zaccariaautonoleggio.it/server-sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
  },
  exclude: ['/admin/*', '/api/*', '/404', '/500'],
  alternateRefs: [
    {
      href: 'https://www.zaccariaautonoleggio.it',
      hreflang: 'it',
    },
    {
      href: 'https://www.zaccariaautonoleggio.it/en',
      hreflang: 'en',
    },
  ],
  priority: 0.7,
  changefreq: 'weekly',
  transform: async (config, path) => {
    // Customizza priorità e frequenza di cambio in base al percorso
    let priority = config.priority;
    let changefreq = config.changefreq;
    
    // Pagine principali
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.includes('/services/transfer-aeroporto-brindisi')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.includes('/tour/')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.includes('/services/')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.includes('/fleet')) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
}
