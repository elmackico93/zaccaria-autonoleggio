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
