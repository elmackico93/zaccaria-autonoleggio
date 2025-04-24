import Link from 'next/link';

/**
 * FooterLinksSEO Component
 * Displays SEO-optimized links in the footer
 */
export default function FooterLinksSEO() {
  return (
    <div className="mt-8 pt-6 border-t border-dark-silver">
      <div className="text-center mt-4">
        <Link href="/servizi-puglia" className="text-sm text-silver-metallic hover:text-white transition-colors inline-flex items-center">
          Vedi tutti i servizi 
          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}