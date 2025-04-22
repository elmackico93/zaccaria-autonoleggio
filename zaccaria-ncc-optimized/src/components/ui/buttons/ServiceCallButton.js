'use client';

import { trackPhoneClick } from '@/lib/animations';

export default function ServiceCallButton({ location }) {
  return (
    <a 
      href="tel:+39123456789" 
      className="group text-sm font-medium underline-offset-4 hover:underline text-silver hover:text-white transition-colors flex items-center"
      onClick={() => {
        // Dynamically import to reduce bundle size
        import('@/lib/animations').then(module => {
          module.trackPhoneClick(location);
        });
      }}
    >
      <span>PRENOTA</span>
      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
      </svg>
    </a>
  );
}
