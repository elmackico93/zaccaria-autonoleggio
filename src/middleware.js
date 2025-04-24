import { NextResponse } from 'next/server';

// Define valid sections for your site
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

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if URL is a direct section route
  // Pattern: /section-name
  if (pathname.startsWith('/') && pathname.split('/').length === 2) {
    const section = pathname.slice(1);
    
    if (VALID_SECTIONS.includes(section)) {
      // This is a valid section, but we should redirect to the home page
      // with the hash for better static generation and cache sharing
      const url = request.nextUrl.clone();
      url.pathname = '/';
      url.hash = section;
      return NextResponse.redirect(url);
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