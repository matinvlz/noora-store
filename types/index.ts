// Core content types shared between Sanity schemas, GROQ query results,
// and React components. Keep this file as the single source of truth.

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
}

export type ProductBadge = "پرچم‌دار" | "میان‌رده" | "ارزان" | "5G" | null;

export type ProductCategory = "all" | "flagship" | "midrange" | "budget" | "5g";

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  logo?: SanityImage;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  brand: Brand;
  image: SanityImage;
  imageVariant?: "gradient" | "studio"; // matches the two card art styles in the design
  badge: ProductBadge;
  category: ProductCategory[];
  rating: number; // e.g. 4.9
  price: number; // current/sale price, Toman
  originalPrice?: number; // shown struck-through when on discount
  stock: number; // units available; 0 = out of stock
  dealEndsAt?: string; // ISO datetime — drives the offers countdown timer
  gallery?: SanityImage[]; // additional product shots for the detail gallery
  description?: string; // long-form description for the detail page
  specs?: ProductSpec[]; // key/value technical specifications
  isBestSeller?: boolean;
  order?: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Feature {
  _id: string;
  title: string;
  description: string;
  icon: "shield" | "truck" | "headset" | "credit-card" | "rotate-ccw";
}

export interface Testimonial {
  _id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: SanityImage;
  rating: number;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  coverImage: SanityImage;
  // Portable Text blocks from Sanity; only populated on the single-post query.
  body?: any[];
}

export interface SiteSettings {
  _id: string;
  siteName: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: SanityImage;
  ratingValue: number;
  ratingCount: number;
}
