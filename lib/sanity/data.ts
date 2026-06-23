import { sanityClient } from "./client";
import {
  SITE_SETTINGS_QUERY,
  BRANDS_QUERY,
  PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_SLUGS_QUERY,
  BEST_SELLERS_QUERY,
  DEALS_QUERY,
  FEATURES_QUERY,
  TESTIMONIALS_QUERY,
  BLOG_POSTS_QUERY,
  ALL_BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
} from "./queries";
import {
  FALLBACK_SITE_SETTINGS,
  FALLBACK_BRANDS,
  FALLBACK_PRODUCTS,
  FALLBACK_FEATURES,
  FALLBACK_TESTIMONIALS,
  FALLBACK_BLOG_POSTS,
} from "./fallback-data";
import type {
  SiteSettings,
  Brand,
  Product,
  Feature,
  Testimonial,
  BlogPost,
} from "@/types";

const isSanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

// Only warn once per process so an unreachable/empty dataset (e.g. a brand-new
// project, a private dataset without a read token, or a 403) doesn't flood the
// build/server logs. The storefront keeps working on fallback data regardless.
let warnedAboutFetch = false;
function warnOnce(reason: string) {
  if (warnedAboutFetch) return;
  warnedAboutFetch = true;
  console.warn(
    `[sanity] Live content unavailable (${reason}). Serving bundled fallback ` +
      `data. Set NEXT_PUBLIC_SANITY_PROJECT_ID and, for private datasets, ` +
      `SANITY_API_READ_TOKEN to enable live reads.`
  );
}

/**
 * Generic safe-fetch wrapper: tries Sanity first, falls back to bundled mock
 * data when Sanity isn't configured yet, the dataset is empty/freshly seeded,
 * or the request fails (network error, 403 on a private dataset, etc.). This
 * keeps the storefront fully functional and never lets a CMS hiccup crash or
 * block a page render.
 */
async function safeFetch<T>(query: string, fallback: T): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    const result = await sanityClient.fetch<T>(query);
    // Treat an empty array or null/undefined as "not seeded yet" → fallback.
    if (
      result == null ||
      (Array.isArray(result) && result.length === 0)
    ) {
      return fallback;
    }
    return result;
  } catch (error) {
    const status =
      (error as { statusCode?: number })?.statusCode ?? "network error";
    warnOnce(`HTTP ${status}`);
    return fallback;
  }
}

export const getSiteSettings = () =>
  safeFetch<SiteSettings>(SITE_SETTINGS_QUERY, FALLBACK_SITE_SETTINGS);

export const getBrands = () =>
  safeFetch<Brand[]>(BRANDS_QUERY, FALLBACK_BRANDS);

export const getProducts = () =>
  safeFetch<Product[]>(PRODUCTS_QUERY, FALLBACK_PRODUCTS);

export async function getProduct(slug: string): Promise<Product | null> {
  const fallback = FALLBACK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  if (!isSanityConfigured) return fallback;
  try {
    const result = await sanityClient.fetch<Product | null>(
      PRODUCT_BY_SLUG_QUERY,
      { slug }
    );
    return result ?? fallback;
  } catch (error) {
    const status =
      (error as { statusCode?: number })?.statusCode ?? "network error";
    warnOnce(`HTTP ${status}`);
    return fallback;
  }
}

export const getProductSlugs = () =>
  safeFetch<string[]>(
    PRODUCT_SLUGS_QUERY,
    FALLBACK_PRODUCTS.map((p) => p.slug)
  );

export const getBestSellers = () =>
  safeFetch<Product[]>(
    BEST_SELLERS_QUERY,
    FALLBACK_PRODUCTS.filter((p) => p.isBestSeller)
  );

export const getFeatures = () =>
  safeFetch<Feature[]>(FEATURES_QUERY, FALLBACK_FEATURES);

export const getTestimonials = () =>
  safeFetch<Testimonial[]>(TESTIMONIALS_QUERY, FALLBACK_TESTIMONIALS);

export const getDeals = () =>
  safeFetch<Product[]>(
    DEALS_QUERY,
    FALLBACK_PRODUCTS.filter(
      (p) => p.dealEndsAt && new Date(p.dealEndsAt) > new Date()
    )
  );

export const getBlogPosts = () =>
  safeFetch<BlogPost[]>(BLOG_POSTS_QUERY, FALLBACK_BLOG_POSTS);

export const getAllBlogPosts = () =>
  safeFetch<BlogPost[]>(ALL_BLOG_POSTS_QUERY, FALLBACK_BLOG_POSTS);

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const fallback =
    FALLBACK_BLOG_POSTS.find((p) => p.slug === slug) ?? null;
  if (!isSanityConfigured) return fallback;
  try {
    const result = await sanityClient.fetch<BlogPost | null>(
      BLOG_POST_BY_SLUG_QUERY,
      { slug }
    );
    return result ?? fallback;
  } catch (error) {
    const status =
      (error as { statusCode?: number })?.statusCode ?? "network error";
    warnOnce(`HTTP ${status}`);
    return fallback;
  }
}
