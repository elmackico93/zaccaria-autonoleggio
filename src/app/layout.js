import './globals.css'
import { Montserrat } from 'next/font/google'
import SchemaOrg from '@/components/SchemaOrg'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'

// Try multiple import paths to handle different configurations
let config;
try {
  // First try the path alias
  config = require('@config');
} catch (e) {
  try {
    // Then try the direct path
    config = require('@/lib/config');
  } catch (e2) {
    // Fallback to relative path
    config = require('../../config');
  }
}

// Optimize font loading with display swap and preload
const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
})

// Get metadata from configuration
const businessName = config.business.name;
const businessDescription = config.business.description;
const metaTitle = config.seo.global.metaTitle;
const metaDescription = config.seo.global.metaDescription;
const keywords = config.seo.global.keywords.join(', ');
const siteUrl = config.business.siteUrl;

// Metadata for SEO optimization
export const metadata = {
  title: {
    default: metaTitle,
    template: `%s | ${businessName}`
  },
  description: metaDescription,
  keywords,
  authors: [{ name: businessName }],
  creator: businessName,
  publisher: businessName,
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  alternateNames: [config.business.legalName],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
    languages: {
      'it-IT': '/',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: metaTitle,
    description: businessDescription,
    url: siteUrl,
    siteName: businessName,
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${businessName} Premium Chauffeur Service`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: businessDescription,
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/favicons/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicons/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/favicons/apple-touch-icon.png' },
    ],
  },
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'transportation',
}

export default function RootLayout({ children }) {
  // Get Google Analytics ID from config
  const gaId = config.business.googleAnalyticsId;
  
  return (
    <html lang="it" className={`scroll-smooth ${montserrat.variable}`}>
      <head>
        {/* Preconnect to required origins for resource prioritization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Font Awesome with optimized loading */}
        <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" as="style" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/favicons/favicon-16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/images/favicons/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/images/favicons/favicon-48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/images/favicons/favicon-64.png" type="image/png" sizes="64x64" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/images/favicons/apple-touch-icon.png" />
        
        {/* WebP favicons with PNG fallback */}
        <link rel="icon" type="image/webp" sizes="16x16" href="/images/favicons/favicon-16.webp" />
        <link rel="icon" type="image/webp" sizes="32x32" href="/images/favicons/favicon-32.webp" />
        <link rel="icon" type="image/webp" sizes="192x192" href="/images/favicons/favicon-192.webp" />
        
        {/* Web Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#0A0A0A" />
        <meta name="msapplication-TileImage" content="/images/favicons/favicon-144.png" />
        <meta name="theme-color" content="#0A0A0A" />
        
        {/* Hreflang tags */}
        <link rel="alternate" href={siteUrl} hrefLang="it-IT" />
        <link rel="alternate" href={`${siteUrl}/en`} hrefLang="en-US" />
        <link rel="alternate" href={siteUrl} hrefLang="x-default" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={siteUrl} />
      </head>
      <body className={montserrat.className}>
        <SchemaOrg />
        <GoogleAnalytics GA_MEASUREMENT_ID={gaId} />
        {children}
        
        {/* Add noscript tag for GTM */}
        <noscript>
          <iframe 
            src={`https://www.googletagmanager.com/ns.html?id=${gaId}`}
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }} 
            title="Google Tag Manager"
          />
        </noscript>
      </body>
    </html>
  )
}
