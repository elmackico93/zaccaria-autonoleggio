#!/bin/bash

# Zaccaria NCC Logo Integration Script
# This script organizes existing logo files and updates the codebase to use them

# Set colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Zaccaria NCC Logo Integration Tool ===${NC}"
echo "This script will organize your logo files and update code references"

# Check if the current directory contains the expected logo files
# First count how many of the expected files we can find
FILE_COUNT=$(ls favicon_*.png logo-*.png main_*.png favicon-*.ico 2>/dev/null | wc -l)

if [ "$FILE_COUNT" -lt 15 ]; then
  echo -e "${RED}Error: Not all required logo files found in current directory${NC}"
  echo "Please run this script from the directory containing all logo files"
  echo "Expected files include: favicon_*.png, logo-*.png, main_*.png, and favicon-*.ico"
  exit 1
fi

echo -e "${GREEN}Found logo files in current directory${NC}"

# Create required directories
echo "Creating directory structure..."
mkdir -p public/images/logo
mkdir -p public/images/favicons

# Move favicon files to the favicons directory
echo "Moving favicon files..."
mv favicon_16x16-transparent.png public/images/favicons/favicon-16.png
mv favicon_32x32-transparent.png public/images/favicons/favicon-32.png
mv favicon_48x48-transparent.png public/images/favicons/favicon-48.png
mv favicon_64x64-transparent.png public/images/favicons/favicon-64.png
mv favicon_96x96-transparent.png public/images/favicons/favicon-96.png
mv favicon_128x128-transparent.png public/images/favicons/favicon-128.png
mv favicon_144x144-transparent.png public/images/favicons/favicon-144.png
mv favicon_180x180-transparent.png public/images/favicons/apple-touch-icon.png
mv favicon_192x192-transparent.png public/images/favicons/favicon-192.png
mv favicon_512x512-transparent.png public/images/favicons/favicon-512.png
mv favicon-transparent.ico public/favicon.ico

# Move main logo files to the logo directory
echo "Moving main logo files..."
mv main_32x32-transparent.png public/images/logo/logo-32.png
mv main_64x64-transparent.png public/images/logo/logo-64.png
mv main_128x128-transparent.png public/images/logo/logo-128.png
mv main_180x180-transparent.png public/images/logo/logo-180.png
mv main_256x256-transparent.png public/images/logo/logo-256.png
mv logo-dark-transparent.png public/images/logo/logo-dark.png
mv logo-light-transparent.png public/images/logo/logo-light.png

# Generate WebP versions of all PNG files
echo "Generating WebP versions of all images..."

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo -e "${YELLOW}Warning: cwebp not found. Skipping WebP conversion.${NC}"
    echo "To install WebP tools:"
    echo "  - On macOS: brew install webp"
    echo "  - On Ubuntu/Debian: sudo apt-get install webp"
    echo "  - On Windows with chocolatey: choco install webp"
    echo "You can manually convert the PNG files to WebP later."
else
    # Convert favicon PNGs to WebP
    find public/images/favicons -name "*.png" -exec bash -c 'cwebp -q 90 "$0" -o "${0%.png}.webp"' {} \;
    
    # Convert logo PNGs to WebP
    find public/images/logo -name "*.png" -exec bash -c 'cwebp -q 90 "$0" -o "${0%.png}.webp"' {} \;
    
    echo -e "${GREEN}Successfully generated WebP versions of all images${NC}"
fi

# Create site.webmanifest file
echo "Creating site.webmanifest file..."
cat > "public/site.webmanifest" << EOF
{
  "name": "Zaccaria NCC | Premium Chauffeur Service",
  "short_name": "Zaccaria NCC",
  "icons": [
    {
      "src": "/images/favicons/favicon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/images/favicons/favicon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#0A0A0A",
  "background_color": "#0A0A0A",
  "display": "standalone"
}
EOF

# Create Logo component
echo "Creating Logo component..."
mkdir -p src/components/ui

cat > "src/components/ui/Logo.js" << 'EOF'
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
      <picture>
        {/* Add WebP source if available */}
        {typeof window !== 'undefined' && 'createImageBitmap' in window && <source srcSet={`${logoSrc}.webp`} type="image/webp" />}
        <Image 
          src={`${logoSrc}.png`}
          alt="Zaccaria NCC Logo"
          fill
          quality={90}
          priority={priority}
          sizes={`${height * 1.2}px`}
          className="object-contain"
        />
      </picture>
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
EOF

# Create a file with favicon meta tags that users can include in their layout.js
echo "Creating favicon meta tags snippet..."
cat > "favicon-meta-tags.txt" << 'EOF'
{/* Favicon tags for layout.js - Copy these tags into your <head> section */}

{/* Basic Favicons */}
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
EOF

echo -e "${GREEN}Logo component created at src/components/ui/Logo.js${NC}"
echo -e "${YELLOW}Favicon meta tags created at favicon-meta-tags.txt${NC}"
echo "Please add these tags to your layout.js file"

# Create integration guide
echo "Creating integration guide..."
cat > "logo-integration-guide.md" << 'EOF'
# Zaccaria NCC Logo Integration Guide

This guide explains how to use the logo files that have been organized by the integration script.

## Directory Structure

The script has organized your logo files into the following structure:

```
public/
├── favicon.ico
├── site.webmanifest
├── images/
│   ├── favicons/
│   │   ├── favicon-16.png
│   │   ├── favicon-16.webp
│   │   ├── favicon-32.png
│   │   ├── favicon-32.webp
│   │   ├── ...
│   │   ├── apple-touch-icon.png
│   │   └── ...
│   └── logo/
│       ├── logo-32.png
│       ├── logo-32.webp
│       ├── logo-64.png
│       ├── logo-64.webp
│       ├── ...
│       ├── logo-dark.png
│       └── logo-light.png
src/
└── components/
    └── ui/
        └── Logo.js
```

## Integration Steps

### 1. Add Favicon Meta Tags

Open your `layout.js` file and add the favicon meta tags from the `favicon-meta-tags.txt` file to the `<head>` section.

### 2. Use the Logo Component

Import and use the Logo component in your components:

```jsx
import Logo from '@/components/ui/Logo';

// In your component:
<Logo height={40} priority={true} />
```

### 3. Update Header Component

Update your Header component to use the Logo component:

```jsx
import Logo from '@/components/ui/Logo';

// In your Header component:
<Link href="/" className="flex items-center">
  <Logo height={40} priority={true} />
</Link>
```

### 4. Update Footer Component

Update your Footer component to use a larger version of the logo:

```jsx
import Logo from '@/components/ui/Logo';

// In your Footer component:
<div className="mb-6">
  <Logo height={80} />
</div>
```

### 5. Update Mobile Menu

Update your mobile menu to use the logo:

```jsx
<Logo height={64} />
```

## Logo Component Props

The Logo component accepts the following props:

- `height` (number): Height of the logo in pixels (default: 40)
- `className` (string): Additional CSS classes
- `darkMode` (boolean): Whether to use the dark mode variant
- `priority` (boolean): Whether to prioritize loading (for above-the-fold content)

## WebP Support

The Logo component will automatically use WebP images with PNG fallbacks for browsers that don't support WebP.
EOF

echo -e "${GREEN}Integration guide created at logo-integration-guide.md${NC}"
echo "Follow the steps in this guide to complete the integration"

# Final message
echo -e "${GREEN}=== Logo Integration Complete ===${NC}"
echo "Your logo files have been organized and the necessary components have been created."
echo "To complete the integration:"
echo "1. Add the favicon meta tags to your layout.js file"
echo "2. Update your Header, Footer, and Mobile Menu components to use the Logo component"
echo "3. Follow the integration guide for more details"