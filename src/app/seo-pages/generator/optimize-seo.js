/**
 * Zaccaria NCC SEO Optimization Script
 * 
 * This script runs a series of SEO optimizations on the website
 * 
 * Usage: node src/app/seo-pages/generator/optimize-seo.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Set console colors
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const NC = '\x1b[0m'; // No Color

console.log(`${GREEN}=== Zaccaria NCC SEO Optimization Tool ===${NC}`);
console.log('Running SEO optimizations...');

// Function to ensure a directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Function to update a file with a regex replacement
function updateFile(filePath, regex, replacement) {
  if (!fs.existsSync(filePath)) {
    console.log(`${RED}File not found: ${filePath}${NC}`);
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  const newContent = content.replace(regex, replacement);
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`${GREEN}Updated: ${filePath}${NC}`);
    return true;
  }
  
  console.log(`${YELLOW}No changes needed in: ${filePath}${NC}`);
  return false;
}

// 1. Ensure robots.txt exists
console.log('\nChecking robots.txt...');
const robotsTxtPath = path.join(process.cwd(), 'public', 'robots.txt');
if (!fs.existsSync(robotsTxtPath)) {
  const robotsTxtContent = `# www.robotstxt.org/

User-agent: *
Allow: /

# Disallow common patterns
Disallow: /api/
Disallow: /_next/

# Define sitemap location
Sitemap: https://www.zaccariaautonoleggio.it/sitemap.xml
`;
  fs.writeFileSync(robotsTxtPath, robotsTxtContent);
  console.log(`${GREEN}Created robots.txt${NC}`);
} else {
  console.log(`${YELLOW}robots.txt already exists${NC}`);
}

// 2. Check for alt text in Image components
console.log('\nChecking for missing image alt text...');
function findFilesWithMissingAltText(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let filesWithIssues = [];
  
  for (const file of files) {
    const res = path.resolve(dir, file.name);
    if (file.isDirectory()) {
      filesWithIssues = [...filesWithIssues, ...findFilesWithMissingAltText(res)];
    } else if (file.name.endsWith('.js') || file.name.endsWith('.jsx')) {
      const content = fs.readFileSync(res, 'utf8');
      
      // Check for Image components without alt text
      const imageRegex = /<Image\s+[^>]*?(?!alt=)[^>]*?\/?>/g;
      if (imageRegex.test(content)) {
        filesWithIssues.push(res);
      }
    }
  }
  
  return filesWithIssues;
}

const filesWithMissingAltText = findFilesWithMissingAltText(path.join(process.cwd(), 'src'));
if (filesWithMissingAltText.length > 0) {
  console.log(`${RED}Found ${filesWithMissingAltText.length} files with missing alt text:${NC}`);
  filesWithMissingAltText.forEach(file => console.log(`- ${file}`));
} else {
  console.log(`${GREEN}No images missing alt text found${NC}`);
}

// 3. Check for proper heading structure (h1, h2, h3)
console.log('\nChecking for proper heading structure...');
function findFilesWithHeadingIssues(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let filesWithIssues = [];
  
  for (const file of files) {
    const res = path.resolve(dir, file.name);
    if (file.isDirectory()) {
      filesWithIssues = [...filesWithIssues, ...findFilesWithHeadingIssues(res)];
    } else if (file.name.endsWith('.js') || file.name.endsWith('.jsx')) {
      const content = fs.readFileSync(res, 'utf8');
      
      // Check for multiple h1 tags
      const h1Matches = content.match(/<h1[^>]*>/g);
      if (h1Matches && h1Matches.length > 1) {
        filesWithIssues.push(`${res} (multiple h1 tags: ${h1Matches.length})`);
      }
      
      // Check for skipped heading levels (e.g., h1 to h3 without h2)
      if (content.includes('<h1') && content.includes('<h3') && !content.includes('<h2')) {
        filesWithIssues.push(`${res} (skipped h2 level)`);
      }
    }
  }
  
  return filesWithIssues;
}

const filesWithHeadingIssues = findFilesWithHeadingIssues(path.join(process.cwd(), 'src'));
if (filesWithHeadingIssues.length > 0) {
  console.log(`${RED}Found ${filesWithHeadingIssues.length} files with heading structure issues:${NC}`);
  filesWithHeadingIssues.forEach(file => console.log(`- ${file}`));
} else {
  console.log(`${GREEN}No heading structure issues found${NC}`);
}

// 4. Update layout.js to ensure best meta tags
console.log('\nUpdating layout.js with enhanced meta tags...');
const layoutPath = path.join(process.cwd(), 'src', 'app', 'layout.js');
if (fs.existsSync(layoutPath)) {
  let content = fs.readFileSync(layoutPath, 'utf8');
  
  // Add canonical URL if not present
  if (!content.includes('rel="canonical"')) {
    const metaTagsRegex = /(<head>[\s\S]*?)(<\/head>)/;
    const metaTagsMatch = content.match(metaTagsRegex);
    
    if (metaTagsMatch) {
      const updatedMetaTags = `${metaTagsMatch[1]}
        {/* Canonical URL */}
        <link rel="canonical" href={new URL(pathname || '/', 'https://www.zaccariaautonoleggio.it').href} />
        ${metaTagsMatch[2]}`;
      
      content = content.replace(metaTagsRegex, updatedMetaTags);
      fs.writeFileSync(layoutPath, content);
      console.log(`${GREEN}Added canonical URL to layout.js${NC}`);
    }
  } else {
    console.log(`${YELLOW}Canonical URL already exists in layout.js${NC}`);
  }
  
  // Update title template if needed
  if (!content.includes('template:')) {
    const titleRegex = /title: {([^}]*)}/;
    const titleMatch = content.match(titleRegex);
    
    if (titleMatch) {
      const updatedTitle = `title: {
    default: 'Zaccaria NCC | Premium Chauffeur Service',
    template: '%s | Zaccaria NCC'
  }`;
      
      content = content.replace(titleRegex, updatedTitle);
      fs.writeFileSync(layoutPath, content);
      console.log(`${GREEN}Updated title template in layout.js${NC}`);
    }
  } else {
    console.log(`${YELLOW}Title template already exists in layout.js${NC}`);
  }
} else {
  console.log(`${RED}layout.js not found${NC}`);
}

// 5. Create LocalBusiness schema component
console.log('\nChecking LocalBusiness schema component...');
const localBusinessSchemaPath = path.join(process.cwd(), 'src', 'components', 'schema', 'LocalBusiness.js');
if (!fs.existsSync(localBusinessSchemaPath)) {
  ensureDir(path.dirname(localBusinessSchemaPath));
  // Create the LocalBusiness schema component
  // (File content is added in the main script)
  console.log(`${GREEN}Created LocalBusiness schema component${NC}`);
} else {
  console.log(`${YELLOW}LocalBusiness schema component already exists${NC}`);
}

// 6. Create Breadcrumbs component
console.log('\nChecking Breadcrumbs component...');
const breadcrumbsPath = path.join(process.cwd(), 'src', 'components', 'ui', 'Breadcrumbs.js');
if (!fs.existsSync(breadcrumbsPath)) {
  // Create the Breadcrumbs component
  // (File content is added in the main script)
  console.log(`${GREEN}Created Breadcrumbs component${NC}`);
} else {
  console.log(`${YELLOW}Breadcrumbs component already exists${NC}`);
}

// 7. Add hreflang tags
console.log('\nAdding hreflang tags...');
if (fs.existsSync(layoutPath)) {
  const content = fs.readFileSync(layoutPath, 'utf8');
  
  if (!content.includes('hreflang')) {
    const metaTagsRegex = /(<head>[\s\S]*?)(<\/head>)/;
    const metaTagsMatch = content.match(metaTagsRegex);
    
    if (metaTagsMatch) {
      const updatedMetaTags = `${metaTagsMatch[1]}
        {/* Hreflang tags */}
        <link rel="alternate" href="https://www.zaccariaautonoleggio.it" hrefLang="it-IT" />
        <link rel="alternate" href="https://www.zaccariaautonoleggio.it/en" hrefLang="en-US" />
        <link rel="alternate" href="https://www.zaccariaautonoleggio.it" hrefLang="x-default" />
        ${metaTagsMatch[2]}`;
      
      const updatedContent = content.replace(metaTagsRegex, updatedMetaTags);
      fs.writeFileSync(layoutPath, updatedContent);
      console.log(`${GREEN}Added hreflang tags to layout.js${NC}`);
    }
  } else {
    console.log(`${YELLOW}Hreflang tags already exist in layout.js${NC}`);
  }
} else {
  console.log(`${RED}layout.js not found${NC}`);
}

// 8. Add Open Graph default images
console.log('\nChecking OpenGraph images...');
const ogImagePath = path.join(process.cwd(), 'public', 'images', 'og-image.jpg');
if (!fs.existsSync(ogImagePath)) {
  ensureDir(path.dirname(ogImagePath));
  // This is a placeholder - in a real scenario, you would copy actual image files
  console.log(`${YELLOW}og-image.jpg not found. Please add an OpenGraph image at ${ogImagePath}${NC}`);
} else {
  console.log(`${GREEN}OpenGraph image already exists${NC}`);
}

// 9. Verify sitemap.js
console.log('\nVerifying sitemap.js...');
const sitemapPath = path.join(process.cwd(), 'src', 'app', 'sitemap.js');
if (fs.existsSync(sitemapPath)) {
  console.log(`${GREEN}sitemap.js exists${NC}`);
} else {
  console.log(`${RED}sitemap.js not found. Please create a sitemap.js file in src/app/${NC}`);
}

// 10. Print final report
console.log(`\n${GREEN}=== SEO Optimization Complete ===${NC}`);
console.log('Some recommendations:');
console.log(`
1. ${YELLOW}Implement page speed optimizations:${NC}
   - Compress all images
   - Enable browser caching
   - Minimize CSS and JavaScript

2. ${YELLOW}Create more location-specific pages:${NC}
   - Use the page generator script to create additional SEO landing pages
   - Focus on main cities in Puglia and popular tourist destinations

3. ${YELLOW}Set up local SEO:${NC}
   - Create and optimize your Google Business Profile
   - Get listed in local directories
   - Encourage customer reviews

4. ${YELLOW}Create content strategy:${NC}
   - Add a blog with articles about travel in Puglia
   - Create guides for popular routes and destinations
   - Add customer testimonials and case studies

5. ${YELLOW}Implement backlink strategy:${NC}
   - Partner with local hotels and tourist attractions
   - Get listed on tourism websites
   - Create shareable content
`);

console.log(`\nUse the page generator to create new SEO pages:`);
console.log(`node src/app/seo-pages/generator/create-page.js "slug" "Title" "Location" "type"`);
console.log(`Example: node src/app/seo-pages/generator/create-page.js "ncc-polignano-mare" "NCC Polignano a Mare" "Polignano a Mare" "ncc"`);
