/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Use SWC minification for faster builds
  swcMinify: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Optimize fonts
  optimizeFonts: true,
  
  // Compress responses for improved performance
  compress: true,
  
  // Advanced optimizations
  experimental: {
    // Enable modern optimization features
    optimizePackageImports: ['react-icons', 'lucide-react', 'date-fns'],
    // For better memory usage
    optimizeServerReact: true,
    // Use server actions (Next.js 14+ feature)
    serverActions: true,
  },
  
  // Remove powered by header for security
  poweredByHeader: false,
  
  // Set specific output options
  output: 'standalone',
  
  // Add rewrites to support section pages and SEO pages
  async rewrites() {
    return {
      beforeFiles: [
        // Handle section routes like /fleet
        {
          source: '/:section(services|fleet|tour|rental|about|testimonials|contact|offers)',
          destination: '/section/:section'
        },
        // Handle SEO page routes
        {
          source: '/:slug(servizi-puglia|ncc-ostuni|ncc-bari|ncc-salento|transfer-aeroporto-brindisi|autonoleggio-con-conducente-alberobello|tour-autista-privato-puglia|transfer-bari-ostuni)',
          destination: '/seo-pages/:slug'
        }
      ]
    };
  },
  
  // Configure headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
