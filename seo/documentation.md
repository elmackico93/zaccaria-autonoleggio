# Puglia Locations SEO Generator Documentation

## Overview

The Puglia Locations SEO Generator is a tailored solution for Zaccaria NCC that creates optimized location pages for services in the Puglia region. This system follows Next.js App Router best practices and generates fully functional, TypeScript-based pages with structured data for improved search engine visibility.

## Features

- **Production-Ready TypeScript**: Full TypeScript support for type safety
- **Next.js App Router Integration**: Modern page generation following App Router patterns
- **Schema.org Implementation**: Automatic JSON-LD generation for rich search results
- **Modular Components**: Reusable, isolated components for maintainability
- **Optimized File Structure**: Clean organization following Next.js best practices
- **Auto-Updates**: Automatic middleware and sitemap integration
- **SEO Best Practices**: Metadata, Open Graph, canonical links, and internal linking

## Project Structure

After installation, your project will have this structure:

```
src/
├── app/                  # App Router pages
│   ├── [location]/       # Dynamic location pages
│   └── servizi-puglia/   # Main locations index page
├── components/
│   ├── locations/        # Location-specific components
│   ├── seo/              # SEO components like JsonLd
│   ├── templates/        # Page templates
│   └── ui/               # UI components like FooterLinksSEO
├── data/
│   └── puglia-locations.ts  # Location data and helpers
├── lib/
│   ├── seo.ts            # SEO utility functions
│   └── types/            # TypeScript type definitions
└── scripts/
    └── generate-puglia-locations.js  # Generator script
```

## Installation

### Prerequisites

- Node.js 16.x or higher
- Next.js 13.4 or higher with App Router
- TypeScript configured in your project

### Setup Process

1. **Create SEO Directory**:
   ```bash
   mkdir -p root/seo
   ```

2. **Download All Files**: Place all the required files in the `/root/seo` directory:
   - `enhanced-generator.js`
   - `location-page-template.tsx`
   - `supporting-components.tsx`
   - `template-files.tsx`
   - `location-data.ts`
   - `package-json.json`
   - `documentation.md`
   - `setup-puglia-seo.sh`

3. **Run Setup Script**:
   ```bash
   bash setup-puglia-seo.sh
   ```

4. **Update package.json**: 
   ```bash
   # Add the location generator script
   npm pkg set scripts.generate:locations="node src/scripts/generate-puglia-locations.js"
   
   # Install dependencies
   npm install chalk nanospinner
   ```

5. **Generate the Pages**:
   ```bash
   npm run generate:locations
   ```

## Usage

### Generating Pages

Run the generator script to create all location pages:

```bash
npm run generate:locations
```

This will:
1. Process all locations in `src/data/puglia-locations.ts`
2. Create pages for each location and service type
3. Update the sitemap and middleware
4. Generate the footer component with location links

### Modifying Locations

To add or modify locations:

1. Edit `src/data/puglia-locations.ts`
2. Add or modify entries in the appropriate category
3. Run the generator script to update all pages

Example of adding a new location:

```typescript
// Add to the appropriate category
coastalTowns: [
  // Existing entries...
  { name: 'Porto Cesareo', description: 'Splendida località balneare con lunghe spiagge sabbiose e acque cristalline.', province: 'LE' }
]
```

### Adding Images

For location images:

1. Create a directory for each province: `/public/images/locations/[province]`
2. Add images with slugified names: `/public/images/locations/le/porto-cesareo.jpg`
3. Images will automatically be used in location cards and pages

## Customization

### Service Types

The generator creates pages for three service types:
- **NCC** (Noleggio Con Conducente) - `/ncc-[location]`
- **Transfer** - `/transfer-[location]`
- **Tour** - `/tour-[location]`

To modify service descriptions, edit the `SEO_CONFIG.services` section in `src/data/puglia-locations.ts`.

### Page Templates

The page template in `src/components/templates/LocationPageTemplate.tsx` can be customized to change the appearance of all location pages. Changes to this file will affect all generated pages.

### Components

Individual components can be modified to change specific UI elements:
- `LocationFAQs.tsx` - For FAQs display
- `ServiceFeatures.tsx` - For service features list
- `ServiceAdvantages.tsx` - For advantage cards
- `FooterLinksSEO.tsx` - For SEO-optimized footer links

## Technical Details

### Schema.org Implementation

All pages include two Schema.org structured data blocks:
1. **Service Schema** - Describes the transportation service offered
2. **FAQ Schema** - Encodes FAQs for rich search results

### SEO Optimizations

Each page includes:
- **Canonical Links** - To prevent duplicate content issues
- **Open Graph Tags** - For rich social media sharing
- **Meta Descriptions** - Unique to each location and service
- **Internal Linking** - Comprehensive footer links for SEO benefit
- **Sitemap Integration** - Automatic sitemap updates

### TypeScript Support

All components and data structures are fully typed with TypeScript interfaces:

```typescript
interface LocationData {
  name: string;
  description: string;
  province: string;
  isProvince?: boolean;
  location?: string;
  category?: string;
}
```

## Troubleshooting

### Common Issues

**Page Not Found After Generation**
- Check if the middleware.ts file was properly updated
- Ensure the slugs in the middleware match the generated pages

**Images Not Displaying**
- Verify image paths at `/public/images/locations/[province]/[slug].jpg`
- Check that image slugs match location slugs (use `generateSlug` function)

**Type Errors**
- Run `npm run build` to check for TypeScript errors
- Ensure interfaces in `types/locations.ts` match your data structure

### Error Resolution

If the generator produces errors:

1. Check the console output for specific error messages
2. Make sure all supporting components are in place
3. Verify directory permissions
4. Check that TypeScript and Next.js configurations are compatible

## Best Practices

1. **Run Regularly**: Generate pages when new locations are added
2. **Check Generated Output**: Verify page quality after generation
3. **Update Content**: Refresh descriptions and FAQs for better SEO
4. **Add Images**: Provide high-quality location images
5. **Monitor Performance**: Track search visibility in Google Search Console

## Further Support

For additional assistance or to report issues, please contact the development team.

---

© 2024 Zaccaria NCC - All rights reserved.