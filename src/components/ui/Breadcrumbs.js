'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Breadcrumbs component for SEO optimization and improved navigation
 */
export default function Breadcrumbs() {
  const pathname = usePathname();
  const [crumbs, setCrumbs] = useState([]);

  useEffect(() => {
    // Skip rendering on homepage
    if (pathname === '/') return;

    // Parse URL path into breadcrumb segments
    const segments = pathname.split('/').filter(Boolean);
    
    // Build breadcrumbs array with formatted labels
    const formattedCrumbs = segments.map((segment, index) => {
      // Format segment name (replace hyphens with spaces, capitalize)
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Build path for this breadcrumb
      const path = '/' + segments.slice(0, index + 1).join('/');
      
      return { name, path };
    });
    
    setCrumbs(formattedCrumbs);
  }, [pathname]);

  // Don't render on homepage or if no breadcrumbs
  if (pathname === '/' || crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-6 py-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.zaccariaautonoleggio.it"
              },
              ...crumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": crumb.name,
                "item": `https://www.zaccariaautonoleggio.it${crumb.path}`
              }))
            ]
          })
        }}
      />
      
      <ol className="flex flex-wrap items-center text-sm text-silver-metallic">
        <li className="flex items-center">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <svg className="w-4 h-4 mx-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </li>
        
        {crumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            {index === crumbs.length - 1 ? (
              <span className="text-white font-medium">{crumb.name}</span>
            ) : (
              <>
                <Link href={crumb.path} className="hover:text-white transition-colors">
                  {crumb.name}
                </Link>
                <svg className="w-4 h-4 mx-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
