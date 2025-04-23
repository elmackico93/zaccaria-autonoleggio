'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * Logo component that uses PNG with WebP fallback for optimal performance
 * Selects the appropriate size based on the requested height
 * 
 * @param {Object} props
 * @param {string} props.className - Additional class names
 * @param {number} props.height - Height of the logo in pixels
 * @param {boolean} props.darkMode - Whether to use dark mode variant
 * @param {boolean} props.priority - Whether to prioritize loading (for above-the-fold content)
 * @returns {JSX.Element}
 */
export default function Logo({ 
  className = '',
  height = 40,
  darkMode = false,
  priority = false,
}) {
  // Calculate which logo size to use based on requested height and device pixel ratio
  const [logoSize, setLogoSize] = useState(getSizeForHeight(height));
  
  // Handle resize events for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setLogoSize(getSizeForHeight(height));
    };
    
    // Set initial size
    handleResize();
    
    // Add listener for window resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [height]);
  
  // Determine what variant to use (light/dark vs size-specific)
  const logoSrc = darkMode 
    ? '/images/logo/logo-dark' 
    : height > 200 
      ? '/images/logo/logo-256' 
      : `/images/logo/logo-${logoSize}`;
  
  return (
    <div className={`inline-block relative ${className}`} style={{ height: `${height}px`, width: `${height * 1.2}px` }}>
      {/* Use only PNG to avoid hydration errors */}
      <Image 
        src={`${logoSrc}.png`} 
        alt="Zaccaria NCC Logo"
        fill
        quality={90}
        priority={priority}
        sizes={`${height * 1.2}px`}
        className="object-contain"
      />
    </div>
  );
}

/**
 * Helper function to determine the appropriate logo size based on requested height
 * Considers device pixel ratio to ensure crisp images on high-DPI displays
 */
function getSizeForHeight(height) {
  // Get device pixel ratio (default to 1 for SSR)
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  
  // Calculate the effective height needed (accounting for device pixel ratio)
  const effectiveHeight = height * dpr;
  
  // Available logo sizes
  const availableSizes = [32, 64, 128, 180, 256];
  
  // Find the smallest size that's at least as large as what we need
  for (const size of availableSizes) {
    if (size >= effectiveHeight) {
      return size;
    }
  }
  
  // If we need something larger than our largest available size, use the largest
  return availableSizes[availableSizes.length - 1];
}