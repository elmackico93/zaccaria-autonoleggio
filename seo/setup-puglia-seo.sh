#!/bin/bash

# ============================================================================
# Puglia SEO Generator Setup Script
# ============================================================================
# This script organizes SEO generator files from the root/seo/ directory
# into their proper project locations.
#
# Usage: bash setup-puglia-seo.sh
# ============================================================================

# Text colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Source directory where all the files are initially placed
SOURCE_DIR="seo"

# Print banner
echo -e "${CYAN}"
echo "=========================================================="
echo "  Puglia Locations SEO Generator - Setup Script"
echo "=========================================================="
echo -e "${NC}"
echo "This script will organize all SEO generator files from"
echo "the root/seo/ directory to their correct locations in"
echo "your Next.js project structure."
echo ""

# Check if we're in the project root (look for package.json)
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found!${NC}"
    echo "Please run this script from the root of your Next.js project."
    exit 1
fi

# Check if the source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}Error: '$SOURCE_DIR' directory not found!${NC}"
    echo "Please make sure you've created a '$SOURCE_DIR' directory in your project root"
    echo "and placed all the SEO generator files there."
    exit 1
fi

# Create all needed directories
echo -e "${YELLOW}Creating directory structure...${NC}"

mkdir -p src/app/servizi-puglia
mkdir -p src/components/locations
mkdir -p src/components/seo
mkdir -p src/components/templates
mkdir -p src/components/ui
mkdir -p src/data
mkdir -p src/lib/types
mkdir -p src/scripts
mkdir -p src/templates

echo -e "${GREEN}✓ Directory structure created${NC}"

# Define files that need to be moved and their destinations
echo -e "${YELLOW}Moving files to their proper locations...${NC}"

# Check for each expected file and move it
declare -A files=(
    ["enhanced-generator.js"]="src/scripts/generate-puglia-locations.js"
    ["location-data.ts"]="src/data/puglia-locations.ts"
    ["location-page-template.tsx"]="src/components/templates/LocationPageTemplate.tsx"
    ["supporting-components.tsx"]="src/components/locations/LocationComponents.tsx"
    ["template-files.tsx"]="src/templates/components.template.tsx"
    ["package-json.json"]="package.json.new"
    ["documentation.md"]="docs/puglia-seo-generator.md"
)

# Move each file if it exists in the source directory
filesMoved=0
for srcFile in "${!files[@]}"; do
    destFile="${files[$srcFile]}"
    if [ -f "$SOURCE_DIR/$srcFile" ]; then
        # Create the target directory if it doesn't exist
        mkdir -p "$(dirname "$destFile")"
        
        # Move the file
        cp "$SOURCE_DIR/$srcFile" "$destFile"
        echo -e "${GREEN}✓ Copied${NC} $SOURCE_DIR/$srcFile → $destFile"
        ((filesMoved++))
    else
        echo -e "${YELLOW}⚠ File not found:${NC} $SOURCE_DIR/$srcFile"
    fi
done

# Split supporting-components.tsx into individual files
if [ -f "src/components/locations/LocationComponents.tsx" ]; then
    echo -e "${YELLOW}Splitting components file into individual component files...${NC}"
    
    # Extract and create LocationFAQs.tsx
    grep -A 20 "// LocationFAQs.tsx" "src/components/locations/LocationComponents.tsx" | sed '1s/^/\/\/ LocationFAQs.tsx - Auto-generated\n/' > "src/components/locations/LocationFAQs.tsx"
    echo -e "${GREEN}✓ Created${NC} src/components/locations/LocationFAQs.tsx"
    
    # Extract and create ServiceFeatures.tsx
    grep -A 20 "// ServiceFeatures.tsx" "src/components/locations/LocationComponents.tsx" | sed '1s/^/\/\/ ServiceFeatures.tsx - Auto-generated\n/' > "src/components/locations/ServiceFeatures.tsx"
    echo -e "${GREEN}✓ Created${NC} src/components/locations/ServiceFeatures.tsx"
    
    # Extract and create ServiceAdvantages.tsx
    grep -A 20 "// ServiceAdvantages.tsx" "src/components/locations/LocationComponents.tsx" | sed '1s/^/\/\/ ServiceAdvantages.tsx - Auto-generated\n/' > "src/components/locations/ServiceAdvantages.tsx"
    echo -e "${GREEN}✓ Created${NC} src/components/locations/ServiceAdvantages.tsx"
    
    # Extract and create JsonLd.tsx
    grep -A 10 "// JsonLd.tsx" "src/components/locations/LocationComponents.tsx" | sed '1s/^/\/\/ JsonLd.tsx - Auto-generated\n/' > "src/components/seo/JsonLd.tsx"
    echo -e "${GREEN}✓ Created${NC} src/components/seo/JsonLd.tsx"
    
    # Extract and create LocationCard.tsx
    grep -A 50 "// LocationCard.tsx" "src/components/locations/LocationComponents.tsx" | sed '1s/^/\/\/ LocationCard.tsx - Auto-generated\n/' > "src/components/locations/LocationCard.tsx"
    echo -e "${GREEN}✓ Created${NC} src/components/locations/LocationCard.tsx"
    
    # Extract and create LocationsGrid.tsx
    grep -A 50 "// LocationsGrid.tsx" "src/components/locations/LocationComponents.tsx" | sed '1s/^/\/\/ LocationsGrid.tsx - Auto-generated\n/' > "src/components/locations/LocationsGrid.tsx"
    echo -e "${GREEN}✓ Created${NC} src/components/locations/LocationsGrid.tsx"
    
    # Extract and create LocationsFilter.tsx
    grep -A 60 "// LocationsFilter.tsx" "src/components/locations/LocationComponents.tsx" | sed '1s/^/\/\/ LocationsFilter.tsx - Auto-generated\n/' > "src/components/locations/LocationsFilter.tsx"
    echo -e "${GREEN}✓ Created${NC} src/components/locations/LocationsFilter.tsx"
    
    # Extract and create ProvinceTabs.tsx
    grep -A 30 "// ProvinceTab.tsx" "src/components/locations/LocationComponents.tsx" | sed '1s/^/\/\/ ProvinceTabs.tsx - Auto-generated\n/' > "src/components/locations/ProvinceTabs.tsx"
    echo -e "${GREEN}✓ Created${NC} src/components/locations/ProvinceTabs.tsx"
    
    # Extract and create FooterLinksSEO.tsx
    grep -A 70 "// FooterLinksSEO.tsx" "src/components/locations/LocationComponents.tsx" | sed '1s/^/\/\/ FooterLinksSEO.tsx - Auto-generated\n/' > "src/components/ui/FooterLinksSEO.tsx"
    echo -e "${GREEN}✓ Created${NC} src/components/ui/FooterLinksSEO.tsx"
    
    # Remove the original combined file
    rm "src/components/locations/LocationComponents.tsx"
    echo -e "${GREEN}✓ Removed${NC} original combined components file"
fi

# Process template files
if [ -f "src/templates/components.template.tsx" ]; then
    echo -e "${YELLOW}Processing template files...${NC}"
    
    # Create the JsonLd.template.tsx
    grep -A 20 "// templates/JsonLd.template.tsx" "src/templates/components.template.tsx" | sed '1s/^/\/\/ JsonLd.template.tsx - Auto-generated\n/' > "src/templates/JsonLd.template.tsx"
    echo -e "${GREEN}✓ Created${NC} src/templates/JsonLd.template.tsx"
    
    # Create the LocationFAQs.template.tsx
    grep -A 20 "// templates/LocationFAQs.template.tsx" "src/templates/components.template.tsx" | sed '1s/^/\/\/ LocationFAQs.template.tsx - Auto-generated\n/' > "src/templates/LocationFAQs.template.tsx"
    echo -e "${GREEN}✓ Created${NC} src/templates/LocationFAQs.template.tsx"
    
    # Create the ServiceFeatures.template.tsx
    grep -A 20 "// templates/ServiceFeatures.template.tsx" "src/templates/components.template.tsx" | sed '1s/^/\/\/ ServiceFeatures.template.tsx - Auto-generated\n/' > "src/templates/ServiceFeatures.template.tsx"
    echo -e "${GREEN}✓ Created${NC} src/templates/ServiceFeatures.template.tsx"
    
    # Create the ServiceAdvantages.template.tsx
    grep -A 20 "// templates/ServiceAdvantages.template.tsx" "src/templates/components.template.tsx" | sed '1s/^/\/\/ ServiceAdvantages.template.tsx - Auto-generated\n/' > "src/templates/ServiceAdvantages.template.tsx"
    echo -e "${GREEN}✓ Created${NC} src/templates/ServiceAdvantages.template.tsx"
    
    # Create the seo.template.ts
    grep -A 80 "// templates/seo.template.ts" "src/templates/components.template.tsx" | sed '1s/^/\/\/ seo.template.ts - Auto-generated\n/' > "src/templates/seo.template.ts"
    echo -e "${GREEN}✓ Created${NC} src/templates/seo.template.ts"
    
    # Create the FooterLinksSEO.template.tsx
    grep -A 60 "// templates/FooterLinksSEO.template.tsx" "src/templates/components.template.tsx" | sed '1s/^/\/\/ FooterLinksSEO.template.tsx - Auto-generated\n/' > "src/templates/FooterLinksSEO.template.tsx"
    echo -e "${GREEN}✓ Created${NC} src/templates/FooterLinksSEO.template.tsx"
    
    # Create the LocationPageTemplate.template.tsx
    grep -A 150 "// templates/LocationPageTemplate.template.tsx" "src/templates/components.template.tsx" | sed '1s/^/\/\/ LocationPageTemplate.template.tsx - Auto-generated\n/' > "src/templates/LocationPageTemplate.template.tsx"
    echo -e "${GREEN}✓ Created${NC} src/templates/LocationPageTemplate.template.tsx"
    
    # Create the ProvinceTabs.template.tsx
    grep -A 50 "// templates/ProvinceTabs.template.tsx" "src/templates/components.template.tsx" | sed '1s/^/\/\/ ProvinceTabs.template.tsx - Auto-generated\n/' > "src/templates/ProvinceTabs.template.tsx"
    echo -e "${GREEN}✓ Created${NC} src/templates/ProvinceTabs.template.tsx"
    
    # Create the LocationsGrid.template.tsx
    grep -A 100 "// templates/LocationsGrid.template.tsx" "src/templates/components.template.tsx" | sed '1s/^/\/\/ LocationsGrid.template.tsx - Auto-generated\n/' > "src/templates/LocationsGrid.template.tsx"
    echo -e "${GREEN}✓ Created${NC} src/templates/LocationsGrid.template.tsx"
    
    # Remove the original combined file
    rm "src/templates/components.template.tsx"
    echo -e "${GREEN}✓ Removed${NC} original combined template file"
fi

# Extract types from data file to types directory
if [ -f "src/data/puglia-locations.ts" ]; then
    echo -e "${YELLOW}Extracting type definitions...${NC}"
    
    # Extract interfaces to types file
    grep -A 25 "export interface LocationData" "src/data/puglia-locations.ts" | sed '1s/^/\/\/ Auto-generated type definitions for Puglia Locations\n\n/' > "src/lib/types/locations.ts"
    echo -e "${GREEN}✓ Created${NC} src/lib/types/locations.ts"
fi

# Create SEO utilities file
if [ ! -f "src/lib/seo.ts" ] && [ -f "src/templates/seo.template.ts" ]; then
    echo -e "${YELLOW}Creating SEO utilities...${NC}"
    
    cp "src/templates/seo.template.ts" "src/lib/seo.ts"
    echo -e "${GREEN}✓ Created${NC} src/lib/seo.ts"
fi

# Make the generator script executable
if [ -f "src/scripts/generate-puglia-locations.js" ]; then
    chmod +x "src/scripts/generate-puglia-locations.js"
    echo -e "${GREEN}✓ Made generate-puglia-locations.js executable${NC}"
fi

# Create docs directory if it doesn't exist
mkdir -p docs
if [ -f "$SOURCE_DIR/documentation.md" ]; then
    cp "$SOURCE_DIR/documentation.md" "docs/puglia-seo-generator.md"
    echo -e "${GREEN}✓ Copied${NC} documentation to docs/puglia-seo-generator.md"
fi

# Save the setup script itself to the project for future use
if [ -f "$0" ]; then
    mkdir -p "scripts"
    cp "$0" "scripts/setup-puglia-seo.sh"
    chmod +x "scripts/setup-puglia-seo.sh"
    echo -e "${GREEN}✓ Saved${NC} setup script to scripts/setup-puglia-seo.sh"
fi

echo ""
echo -e "${GREEN}Done! ${filesMoved} files were processed.${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Review your package.json and merge the new dependencies from package.json.new"
echo "   You can do this with: diff package.json package.json.new"
echo "2. Run 'npm install chalk nanospinner' to install required dependencies"
echo "3. Run 'npm run generate:locations' to generate SEO pages"
echo ""
echo -e "For full documentation, see: ${BLUE}docs/puglia-seo-generator.md${NC}"
echo ""