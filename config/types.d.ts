/**
 * TypeScript type definitions for configuration
 * This provides type checking and autocompletion in IDEs
 */

declare module '@/config' {
  export interface Business {
    name: string;
    legalName: string;
    description: string;
    foundingYear: number;
    contact: {
      phone: string;
      phoneFormatted: string;
      email: string;
      whatsapp: string;
    };
    address: {
      street: string;
      city: string;
      province: string;
      postalCode: string;
      country: string;
      googleMapsUrl: string;
    };
    social: {
      facebook: string;
      instagram: string;
    };
    vatNumber: string;
    businessHours: string;
    languages: string[];
    defaultLanguage: string;
    siteUrl: string;
    googleAnalyticsId: string;
    ratings: {
      average: number;
      count: number;
    };
  }

  export interface Section {
    id: string;
    title: string;
    titleEn: string;
    shortTitle: string;
    shortTitleEn: string;
    description: string;
    descriptionEn: string;
    metaTitle: string;
    metaDescription: string;
  }

  export interface ServiceItem {
    id: string;
    icon: string;
    number: string;
    title: string;
    titleEn: string;
    description: string;
    descriptionEn: string;
  }

  export interface Services {
    sections: Section[];
    serviceItems: ServiceItem[];
  }

  export interface Vehicle {
    id: string;
    name: string;
    nameEn: string;
    description: string;
    descriptionEn: string;
    features: string[];
    image: string;
    category: string;
  }

  export interface Fleet {
    vehicles: Vehicle[];
    rentalVehicles: Vehicle[];
  }

  export interface Tour {
    id: string;
    icon: string;
    title: string;
    titleEn: string;
    description: string;
    descriptionEn: string;
    duration: string;
    durationEn: string;
    price: number;
    discountedPrice: number;
    discount: string;
    locations: string[];
    image: string;
    popular?: boolean;
  }

  export interface Tours {
    tours: Tour[];
  }

  export interface Offer {
    id: string;
    title: string;
    titleEn: string;
    description: string;
    descriptionEn: string;
    image: string;
    price: number;
    discountedPrice: number;
    discount: string;
    duration: string;
    durationEn: string;
    validUntil: string;
    tags: string[];
    tagsEn: string[];
    cta: string;
    ctaEn: string;
    popular?: boolean;
  }

  export interface Offers {
    offers: Offer[];
  }

  export interface Testimonial {
    id: number;
    name: string;
    company: string;
    position: string;
    text: string;
    textEn: string;
    image: string;
    rating: number;
  }

  export interface Testimonials {
    testimonials: Testimonial[];
  }

  export interface SEOPage {
    slug: string;
    title: string;
    description: string;
  }

  export interface Location {
    name: string;
    province: string;
    region: string;
    description: string;
    highlights: string[];
  }

  export interface FAQ {
    question: string;
    answer: string;
    category: string;
  }

  export interface SEO {
    global: {
      keywords: string[];
      metaTitle: string;
      metaDescription: string;
    };
    seoPages: SEOPage[];
    locations: Location[];
    faqs: FAQ[];
  }

  export interface Paths {
    images: {
      logo: string;
      favicons: string;
      fleet: string;
      tour: string;
      rental: string;
      offers: string;
      testimonials: string;
      hero: string;
      backgrounds: string;
    };
    assets: {
      fonts: string;
      videos: string;
      documents: string;
    };
    api: {
      placeholder: string;
      contact: string;
      booking: string;
    };
    sections: string[];
    seoPages: string[];
  }

  export interface ColorScheme {
    colors: {
      white: string;
      whiteSmoke: string;
      lightSilver: string;
      silver: string;
      silverMetallic: string;
      darkSilver: string;
      gunmetal: string;
      charcoal: string;
      black: string;
    };
    gradients: {
      chrome: string;
      steel: string;
    };
    shadows: {
      chromeGlow: string;
      buttonShadow: string;
      buttonShadowHover: string;
      cardShadow: string;
      cardShadowHover: string;
    };
    transitions: {
      slow: string;
      normal: string;
      fast: string;
    };
    fontFamily: {
      primary: string;
    };
    ui: {
      buttonHighlight: string;
      buttonHighlightHover: string;
      cardBackground: string;
      formFieldBackground: string;
      formFieldBorder: string;
      formFieldBorderFocus: string;
    };
  }

  export interface Config {
    business: Business;
    services: Services;
    fleet: Fleet;
    tours: Tours;
    offers: Offers;
    testimonials: Testimonials;
    seo: SEO;
    paths: Paths;
    colorScheme: ColorScheme;
  }

  export function getConfig(path: string, defaultValue?: any): any;
  export function getLocalizedContent(obj: any, language?: string): any;

  const config: Config;
  export default config;
}
