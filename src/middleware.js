import { NextResponse } from 'next/server';

// Define valid sections and SEO slugs for your site
const VALID_SECTIONS = [
  'offers',
  'services',
  'fleet',
  'tour',
  'rental',
  'about',
  'testimonials',
  'contact'
];

// SEO page slugs that should be handled by the seo-pages directory
const SEO_SLUGS = [
  'servizi-puglia',
  'ncc-ostuni',
  'ncc-bari',
  'ncc-salento',
  'transfer-aeroporto-brindisi',
  'autonoleggio-con-conducente-alberobello',
  'tour-autista-privato-puglia',
  'transfer-bari-ostuni'
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if this is a SEO page route
  if (SEO_SLUGS.some(slug => pathname === `/${slug}`)) {
    // IMPORTANT: Use rewrite instead of redirect to maintain the original URL
    const slug = pathname.slice(1); // Remove the leading slash
    return NextResponse.rewrite(new URL(`/seo-pages/${slug}`, request.url));
  }
  
  // Check if URL is a direct section route (e.g., /contact, /services)
  if (pathname.startsWith('/') && pathname.split('/').length === 2) {
    const section = pathname.slice(1);
    
    if (VALID_SECTIONS.includes(section)) {
      // Instead of redirecting, use rewrite to maintain the URL but serve the section page
      return NextResponse.rewrite(new URL(`/section/${section}`, request.url));
    }
  }
  
  return NextResponse.next();
}

// Specify which paths this middleware should run for
export const config = {
  matcher: [
    // Match all routes except static files, api routes, etc.
    '/((?!_next/static|_next/image|favicon.ico|images|icons|api).*)',
  ],
};
