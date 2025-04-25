/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure local modules are transpiled
  transpilePackages: [],

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
  
  // Updated experimental features for current Next.js version
  experimental: {
    // Enable modern optimization features
    optimizePackageImports: ['react-icons', 'lucide-react', 'date-fns'],
    // For better memory usage
    optimizeServerReact: true,
    // Note: fontLoaders option removed as it's not supported in this version
  },
  
  // Enable bundle analyzer in analyze mode
  webpack: (config, { isServer, dev, webpack }) => {
    // Add bundle analyzer plugin in analyze mode
    if (process.env.ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      );
    }
    
    // Add custom webpack optimizations
    if (!dev) {
      // Use deterministic chunk and module ids for better caching
      config.optimization.moduleIds = 'deterministic';
      
      // Enable React optimization for production
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        })
      );
    }
    
    return config;
  },
  
  // Remove powered by header for security
  poweredByHeader: false,
  
  // Set specific output options
  output: 'standalone',
  
  // Enable source maps in production for better error tracking (optional)
  productionBrowserSourceMaps: true,
  
  // Trailing slashes for URL consistency
  trailingSlash: false,
  
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
