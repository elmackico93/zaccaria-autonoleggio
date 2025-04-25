import './globals.css'
import { Montserrat } from 'next/font/google'
import SchemaOrg from '@/components/SchemaOrg'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'

// Optimize font loading with display swap and preload
const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
})

// Metadata for SEO optimization
export const metadata = {
  title: {
    default: 'Zaccaria NCC | Premium Chauffeur Service',
    template: '%s | Zaccaria NCC'
  },
  description: 'Servizio di noleggio con conducente a Ostuni. Transfer con Mercedes, tour guidati in Puglia e autonoleggio senza conducente. Prenota ora per un servizio di alta qualità.',
  keywords: ['noleggio con conducente Ostuni', 'tour Puglia', 'autonoleggio', 'servizio NCC Brindisi', 'transfer aeroporto Brindisi'],
  authors: [{ name: 'Zaccaria NCC' }],
  creator: 'Zaccaria NCC',
  publisher: 'Zaccaria NCC',
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  alternateNames: ["Autonoleggio Zaccaria Ostuni - Rent a Car - Noleggio Auto"],
  metadataBase: new URL('https://www.zaccariaautonoleggio.it'),
  alternates: {
    canonical: '/',
    languages: {
      'it-IT': '/',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'Zaccaria NCC | Luxury Chauffeur Service',
    description: 'Il servizio di noleggio con conducente che ridefinisce la qualità nel trasporto di lusso. Transfer, tour guidati e autonoleggio.',
    url: 'https://www.zaccariaautonoleggio.it',
    siteName: 'Zaccaria NCC',
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zaccaria NCC Premium Chauffeur Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaccaria NCC | Luxury Chauffeur Service',
    description: 'Il servizio di noleggio con conducente che ridefinisce la qualità nel trasporto di lusso. Transfer, tour guidati e autonoleggio.',
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
      </head>
      <body className={montserrat.className}>
        <SchemaOrg />
        <GoogleAnalytics />
        {children}
        
        {/* Add noscript tag for GTM */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"
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