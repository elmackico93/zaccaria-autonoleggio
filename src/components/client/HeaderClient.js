'use client';

import { Suspense } from 'react';
import Header from '@/components/layout/Header';

/**
 * Client component wrapper for Header
 * This ensures that any client-side functionality in the header
 * is properly isolated and wrapped in Suspense
 */
export default function HeaderClient({ initialSection }) {
  return (
    <Suspense fallback={<div className="h-20 bg-black"/>}>
      <Header initialSection={initialSection} />
    </Suspense>
  );
}
