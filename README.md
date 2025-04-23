# Zaccaria NCC - Optimized Next.js Project

A highly optimized Next.js implementation of the Zaccaria NCC chauffeur service website, focused on maximizing SSR capabilities and achieving 100% performance scores.

## Performance Optimizations

This project implements numerous performance optimizations:

### Server-Side Rendering
- Uses Next.js App Router with Server Components
- Minimizes client JavaScript bundle size
- Implements Suspense for streaming and progressive rendering
- Uses server components for static content

### Image Optimization
- Next.js Image component with automatic optimization
- Responsive images with appropriate sizes
- AVIF and WebP support with fallbacks
- Lazy loading with blur placeholders
- Proper image sizing and dimensions

### JavaScript Optimization
- Code splitting and lazy loading
- Dynamic imports for non-critical functionality
- Client components only where necessary
- Reduced client-side JavaScript

### CSS Optimization
- Tailwind JIT for minimal CSS
- Component-level CSS organization
- Critical CSS inlining
- CSS nano for production builds

### Font Optimization
- Font display swap
- Preloading and preconnecting
- Self-hosted fonts with proper subsetting
- Variable fonts where appropriate

### SEO Optimization
- Comprehensive metadata
- Schema.org structured data
- Social media metadata
- Canonical URLs and alternates

### User Experience
- Progressive enhancement
- Core Web Vitals optimization
- Reduced layout shifts
- Fast load and response times

## Getting Started

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Analyzing Bundle Size

```bash
npm run analyze
# or
yarn analyze
```

## Performance Testing

After deployment, you can test the site's performance using:

1. [PageSpeed Insights](https://pagespeed.web.dev/)
2. [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
3. [WebPageTest](https://www.webpagetest.org/)

## Technology Stack

- Next.js 14+
- React Server Components
- Tailwind CSS
- GSAP for animations (client-side only)
